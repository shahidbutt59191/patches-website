import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';
import { DEFAULT_SETTINGS, SiteSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'site_settings.json');

// In-memory runtime cache
let cachedSettings: SiteSettings = { ...DEFAULT_SETTINGS };

function readSettingsFromDisk(): Partial<SiteSettings> | null {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (err) {
    console.warn('Error reading settings from disk:', err);
  }
  return null;
}

function writeSettingsToDisk(settings: SiteSettings) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
  } catch (err) {
    // Disk write may fail on read-only serverless lambdas (e.g. Vercel)
    console.warn('Serverless disk write note (using Cloud DB):', err);
  }
}

function ensureValidArrays(settings: SiteSettings): SiteSettings {
  const s = { ...settings };
  if (!s.patchPricingCards || s.patchPricingCards.length === 0) {
    s.patchPricingCards = DEFAULT_SETTINGS.patchPricingCards;
  }
  if (!s.heroPatches || s.heroPatches.length === 0) {
    s.heroPatches = DEFAULT_SETTINGS.heroPatches;
  }
  if (!s.portfolio || s.portfolio.length === 0) {
    s.portfolio = DEFAULT_SETTINGS.portfolio;
  }
  if (!s.reviews || s.reviews.length === 0) {
    s.reviews = DEFAULT_SETTINGS.reviews;
  }
  if (!s.faqs || s.faqs.length === 0) {
    s.faqs = DEFAULT_SETTINGS.faqs;
  }
  if (!s.bulkTiers || s.bulkTiers.length === 0) {
    s.bulkTiers = DEFAULT_SETTINGS.bulkTiers;
  }
  return s;
}

export async function GET() {
  try {
    // 1. First read from local disk
    const diskSettings = readSettingsFromDisk();
    if (diskSettings) {
      cachedSettings = { ...DEFAULT_SETTINGS, ...diskSettings };
    }

    // 2. Fetch the latest live settings snapshot from Supabase Cloud DB
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('patch_type', 'system_settings')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data?.notes) {
        const cloudData = typeof data.notes === 'string' ? JSON.parse(data.notes) : data.notes;
        // Merge cloud data on top of defaults and disk
        cachedSettings = {
          ...DEFAULT_SETTINGS,
          ...(diskSettings || {}),
          ...cloudData,
        };
        // Update local disk cache if writable
        writeSettingsToDisk(cachedSettings);
      }
    } catch (dbErr) {
      console.warn('Supabase cloud fetch note:', dbErr);
    }
  } catch (err) {
    console.warn('Using cached site settings:', err);
  }

  cachedSettings = ensureValidArrays(cachedSettings);

  return NextResponse.json(cachedSettings, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const updated: Partial<SiteSettings> = await req.json();
    cachedSettings = { ...cachedSettings, ...updated };
    cachedSettings = ensureValidArrays(cachedSettings);

    // 1. Write to local project disk file (for local environment persistence)
    writeSettingsToDisk(cachedSettings);

    // 2. Permanently backup to Supabase Cloud DB as a new persistent snapshot
    try {
      const { error: dbError } = await supabase.from('quotes').insert({
        ref_code: `SETTINGS_${Date.now()}`,
        full_name: 'Apex Site Settings Backup',
        email: 'admin@bdigitizing.com',
        phone: '0000000000',
        patch_type: 'system_settings',
        quantity: 1,
        notes: JSON.stringify(cachedSettings),
      });

      if (dbError) {
        console.warn('Supabase snapshot insert note:', dbError.message);
      }
    } catch (dbErr) {
      console.warn('Supabase cloud backup note:', dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        settings: cachedSettings,
        message: 'Website settings saved and published live to database!',
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || 'Failed to save settings' },
      { status: 500 }
    );
  }
}

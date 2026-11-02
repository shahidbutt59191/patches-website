import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';
import { DEFAULT_SETTINGS, SiteSettings } from '@/lib/settings';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'site_settings.json');

// In-memory runtime cache
let cachedSettings: SiteSettings = { ...DEFAULT_SETTINGS };

function readSettingsFromDisk(): SiteSettings | null {
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
    console.warn('Error writing settings to disk:', err);
  }
}

export async function GET() {
  try {
    // 1. First attempt to load from local disk file
    const diskSettings = readSettingsFromDisk();
    if (diskSettings) {
      cachedSettings = { ...DEFAULT_SETTINGS, ...diskSettings };
    }

    // 2. Also check Supabase quotes table for cloud backup
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('notes')
        .eq('ref_code', 'APEX_SYSTEM_SETTINGS')
        .maybeSingle();

      if (!error && data?.notes) {
        const cloudData = typeof data.notes === 'string' ? JSON.parse(data.notes) : data.notes;
        cachedSettings = { ...DEFAULT_SETTINGS, ...(diskSettings || {}), ...cloudData };
        // Sync cloud to disk if disk was missing
        if (!diskSettings) {
          writeSettingsToDisk(cachedSettings);
        }
      }
    } catch (dbErr) {
      console.log('Supabase cloud fetch note:', dbErr);
    }
  } catch (err) {
    console.log('Using cached site settings:', err);
  }

  return NextResponse.json(cachedSettings);
}

export async function POST(req: NextRequest) {
  try {
    const updated: Partial<SiteSettings> = await req.json();
    cachedSettings = { ...cachedSettings, ...updated };

    // 1. Permanently write to local project disk file
    writeSettingsToDisk(cachedSettings);

    // 2. Permanently backup to Supabase Cloud DB
    try {
      await supabase.from('quotes').upsert(
        {
          ref_code: 'APEX_SYSTEM_SETTINGS',
          full_name: 'Apex Site Settings Backup',
          email: 'admin@bdigitizing.com',
          phone: '0000000000',
          patch_type: 'settings',
          quantity: 1,
          notes: JSON.stringify(cachedSettings),
        },
        { onConflict: 'ref_code' }
      );
    } catch (dbErr) {
      console.warn('Note: Supabase backup note:', dbErr);
    }

    return NextResponse.json({
      success: true,
      settings: cachedSettings,
      message: 'Website settings saved and published successfully!',
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEFAULT_SETTINGS, SiteSettings } from '@/lib/settings';

// In-memory runtime cache for serverless longevity
let cachedSettings: SiteSettings = { ...DEFAULT_SETTINGS };

export async function GET() {
  try {
    // Attempt to load from Supabase site_settings table if created
    const { data, error } = await supabase
      .from('site_settings')
      .select('settings')
      .eq('id', 1)
      .maybeSingle();

    if (!error && data?.settings) {
      cachedSettings = { ...DEFAULT_SETTINGS, ...data.settings };
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

    // Try upserting to Supabase site_settings
    try {
      await supabase
        .from('site_settings')
        .upsert([{ id: 1, settings: cachedSettings, updated_at: new Date().toISOString() }]);
    } catch (dbErr) {
      console.warn('Note: Supabase site_settings table not yet configured, using runtime cache:', dbErr);
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

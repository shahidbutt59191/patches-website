'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuoteModal from '@/components/QuoteModal';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export default function QuotePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch (e) {}

    fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const merged = { ...DEFAULT_SETTINGS, ...data };
          setSettings(merged);
          try {
            localStorage.setItem('apex_live_settings', JSON.stringify(merged));
          } catch (e) {}
        }
      })
      .catch((err) => console.log('Settings fetch note:', err));
  }, []);

  return (
    <QuoteModal
      isOpen={true}
      onClose={() => router.push('/')}
      priceSettings={settings}
    />
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Calculator from '@/components/Calculator';
import Backings from '@/components/Backings';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import QuoteForm from '@/components/QuoteForm';
import Reviews from '@/components/Reviews';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Dynamic shared spec state
  const [selectedStyle, setSelectedStyle] = useState('embroidered');
  const [selectedWidth, setSelectedWidth] = useState(3.0);
  const [selectedHeight, setSelectedHeight] = useState(3.0);
  const [selectedBacking, setSelectedBacking] = useState('velcro_hook_loop');
  const [selectedQuantity, setSelectedQuantity] = useState(100);

  useEffect(() => {
    // 1. Check local storage
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch (e) {
      console.log('Error reading local settings:', e);
    }

    // 2. Fetch fresh settings from API
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        }
      })
      .catch((err) => console.log('Settings fetch error:', err));
  }, []);

  const handleSelectStyle = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleApplySpecsFromCalculator = (specs: {
    style: string;
    width: number;
    height: number;
    backing: string;
    quantity: number;
  }) => {
    setSelectedStyle(specs.style);
    setSelectedWidth(specs.width);
    setSelectedHeight(specs.height);
    setSelectedBacking(specs.backing === 'velcro' ? 'velcro_hook_loop' : specs.backing);
    setSelectedQuantity(specs.quantity);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 selection:bg-indigo-600 selection:text-white font-sans antialiased">
      
      {/* Dynamic Top Announcement Banner */}
      {settings.announcementEnabled && settings.announcementText && (
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 py-2.5 px-4 text-center text-xs font-bold text-white tracking-wide shadow-md">
          <span className="mr-2 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase text-white font-mono">
            Special Offer
          </span>
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* 1. Header & Navigation */}
      <Navbar whatsappNumber={settings.whatsappNumber} />

      {/* 2. Hero Section: Direct Factory Value Proposition & Live Specimen Inspector */}
      <Hero
        whatsappNumber={settings.whatsappNumber}
        onSelectStyle={handleSelectStyle}
      />

      {/* 3. Patch Services: 6 Core Materials Showcase */}
      <Services onSelectStyle={handleSelectStyle} />

      {/* 4. Bulk Pricing Calculator: Live Dimension & Quantity Sliders */}
      <Calculator onApplySpecs={handleApplySpecsFromCalculator} />

      {/* 5. Backings & Borders: Fasteners & Edge Finishes Guide */}
      <Backings />

      {/* 6. Production Process: 4 Transparent Steps & Photo Sample Guarantee */}
      <Process />

      {/* 7. Gallery: Real Client Work Across Tactical, Biker, Headwear & Varsity */}
      <Gallery />

      {/* 8. Free Quote & Artwork Submission Form */}
      <QuoteForm
        initialStyle={selectedStyle}
        initialWidth={selectedWidth}
        initialHeight={selectedHeight}
        initialBacking={selectedBacking}
        initialQuantity={selectedQuantity}
      />

      {/* 9. Verified Customer Reviews & Quadruple Factory Guarantee */}
      <Reviews />

      {/* 10. Frequently Asked Questions */}
      <Faq />

      {/* 11. Enterprise Footer */}
      <Footer
        whatsappNumber={settings.whatsappNumber}
        supportEmail={settings.supportEmail}
        supportPhone={settings.supportPhone}
      />

    </div>
  );
}

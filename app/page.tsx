'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import StandardsSection from '@/components/StandardsSection';
import ServicesSection from '@/components/ServicesSection';
import PatchCustomizerStudio from '@/components/PatchCustomizerStudio';
import BulkPricingCalculator from '@/components/BulkPricingCalculator';
import BackingsGuide from '@/components/BackingsGuide';
import PortfolioSection from '@/components/PortfolioSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import OrderForm from '@/components/OrderForm';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // 1. Check local storage for instant reactivity
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

      {/* Sticky EmbroidPro Header */}
      <Navbar whatsappNumber={settings.whatsappNumber} />

      {/* Hero Section (Connected to Admin Portal Live Settings) */}
      <HeroSection
        heroBadge={settings.heroBadge}
        heroHeadline={settings.heroHeadline}
        heroSubheadline={settings.heroSubheadline}
        heroCtaText={settings.heroCtaText}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Section 0: Simple, Upfront Pricing Tiers */}
      <PricingSection />

      {/* Section 1: The EmbroidPro Standard (01 - 04 Numbered Cards) */}
      <StandardsSection />

      {/* Section 2: Everything Your Shop Needs (6 Material Cards) */}
      <ServicesSection />

      {/* Interactive 3D Patch Customizer Studio */}
      <PatchCustomizerStudio />

      {/* Instant Bulk Wholesale Volume Calculator */}
      <BulkPricingCalculator />

      {/* Industrial Fasteners & Backings Comparison Guide */}
      <BackingsGuide />

      {/* Section 3: Digitizing & Custom Patches Gallery */}
      <PortfolioSection />

      {/* Section 4 & 5: Clear Process from Artwork to Finished Patches */}
      <HowItWorksSection />

      {/* Section 6: Quadruple Factory Guarantee */}
      <GuaranteeSection />

      {/* Verified Customer Reviews & Social Proof */}
      <TestimonialsSection />

      {/* Direct Factory Order & Artwork Submission Section */}
      <section id="order-form-section" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-2.5 text-center items-center mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Instant Factory Order
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
              Configure Specs & Submit Your Order
            </h2>
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
              Select your patch dimensions, backing type, and quantity. Upload your artwork to receive a 100% free digital stitch proof within 6 hours.
            </p>
          </div>

          <OrderForm />
        </div>
      </section>

      {/* Section 7: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 8: Final Call-To-Action Banner */}
      <CtaSection whatsappNumber={settings.whatsappNumber} />

      {/* Enterprise Multi-Column Footer */}
      <Footer whatsappNumber={settings.whatsappNumber} />

    </div>
  );
}

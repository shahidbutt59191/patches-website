'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PricingCards from '@/components/PricingCards';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import LivePatchStudio from '@/components/LivePatchStudio';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Reviews from '@/components/Reviews';
import FaqAndCta from '@/components/FaqAndCta';
import Footer from '@/components/Footer';
import FloatingAssistants from '@/components/FloatingAssistants';
import QuoteModal from '@/components/QuoteModal';
import VideoModal from '@/components/VideoModal';
import SearchModal from '@/components/SearchModal';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Active specs for quote modal
  const [activePatchStyle, setActivePatchStyle] = useState('embroidered');
  const [activeWidth, setActiveWidth] = useState(3.0);
  const [activeHeight, setActiveHeight] = useState(3.0);
  const [activeBacking, setActiveBacking] = useState('iron_on');
  const [activeQuantity, setActiveQuantity] = useState(100);

  // Load live site settings from API or LocalStorage
  useEffect(() => {
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch (e) {
      console.log('Local settings note:', e);
    }

    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        }
      })
      .catch((err) => console.log('Settings fetch note:', err));
  }, []);

  const handleOpenQuote = (styleId?: string) => {
    if (styleId) {
      setActivePatchStyle(styleId);
    }
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithSpecs = (specs: {
    style: string;
    width: number;
    height: number;
    backing: string;
    quantity: number;
  }) => {
    setActivePatchStyle(specs.style);
    setActiveWidth(specs.width);
    setActiveHeight(specs.height);
    setActiveBacking(specs.backing);
    setActiveQuantity(specs.quantity);
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  const handleOpenVideo = () => {
    setVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. Header: Top Bar + Brand Navbar with Dynamic Announcements */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={handleOpenSearch}
        announcementText={settings.announcementText}
        announcementEnabled={settings.announcementEnabled}
        supportEmail={settings.supportEmail}
        turnaroundTime={settings.turnaroundTime}
      />

      <main>
        {/* 2. Hero Section: Badge, Title, Bullets, CTA Buttons & Realistic Patch Cluster */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenVideo={handleOpenVideo}
          badge={settings.heroBadge}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          patches={settings.heroPatches}
        />

        {/* 3. Our Patch Services: All 8 Custom Patch Styles */}
        <Services onOpenQuote={handleOpenQuote} />

        {/* 4. Transparent Batch Volume & Material Pricing Cards */}
        <PricingCards
          onOpenQuote={handleOpenQuote}
          onOpenQuoteWithSpecs={handleOpenQuoteWithSpecs}
          settings={settings}
        />

        {/* 5. Interactive Vector-to-Stitch Digitizing Before & After Slider */}
        <BeforeAfterSlider
          onOpenQuote={() => handleOpenQuote()}
          beforeImage={settings.sliderBeforeImage}
          afterImage={settings.sliderAfterImage}
          beforeLabel={settings.sliderBeforeLabel}
          afterLabel={settings.sliderAfterLabel}
          title={settings.sliderTitle}
          subtitle={settings.sliderSubtitle}
          badge={settings.sliderBadge}
        />

        {/* 5. Interactive Live Patch Studio & Real-Time Price Estimator */}
        <LivePatchStudio
          onOpenQuoteWithSpecs={handleOpenQuoteWithSpecs}
          basePrice={settings.priceEmbroidered}
          velcroFee={settings.velcroFee}
          ironOnFee={settings.ironOnFee}
          peelStickFee={settings.peelStickFee}
        />

        {/* 6. Why Choose BDigitizing?: 4 Feature Icons + Stats + Stitched "CUSTOM PATCHES" Banner */}
        <WhyChooseUs
          statsData={{
            patchesSewn: settings.statPatchesSewn,
            onTimeDelivery: settings.statOnTimeDelivery,
            proofSpeed: settings.statProofSpeed,
            countriesShipped: settings.statCountriesShipped,
          }}
        />

        {/* 9. Simple Ordering Process: 4 Connected Numbered Steps with Timing Badges */}
        <Process onOpenQuote={() => handleOpenQuote()} />

        {/* 10. Real Client Production Portfolio with Rich Photography & Lightbox Zoom */}
        <Portfolio
          onOpenQuote={handleOpenQuote}
          items={settings.portfolio}
        />

        {/* 11. What Our Customers Say: Dark Luxury Section with 5-Star Reviews & Order Tags */}
        <Reviews items={settings.reviews} />

        {/* 12. Frequently Asked Questions + Vibrant Orange CTA Box with Discount Code */}
        <FaqAndCta
          onOpenQuote={() => handleOpenQuote()}
          promoCode={settings.promoCode}
          discountRate={settings.discountRate}
          items={settings.faqs}
        />
      </main>

      {/* 13. Dark Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        socialInstagram={settings.socialInstagram}
        socialFacebook={settings.socialFacebook}
        socialYoutube={settings.socialYoutube}
        socialLinkedin={settings.socialLinkedin}
        supportEmail={settings.supportEmail}
        supportPhone={settings.supportPhone}
        companyAddress={settings.companyAddress}
      />

      {/* Floating Assistants: Live Order Social Proof Toast & 24/7 WhatsApp Desk */}
      <FloatingAssistants
        whatsappNumber={settings.whatsappNumber}
        onOpenQuote={() => handleOpenQuote()}
        socialProofEnabled={settings.socialProofEnabled}
      />

      {/* Global Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        defaultStyle={activePatchStyle}
        initialWidth={activeWidth}
        initialHeight={activeHeight}
        initialBacking={activeBacking}
        initialQuantity={activeQuantity}
        priceSettings={settings}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={handleCloseVideo}
        onOpenQuote={() => handleOpenQuote()}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={handleCloseSearch}
        onSelectService={(id) => handleOpenQuote(id)}
      />

    </div>
  );
}

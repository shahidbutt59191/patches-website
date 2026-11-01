'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import LivePatchStudio from '@/components/LivePatchStudio';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import FaqAndCta from '@/components/FaqAndCta';
import Footer from '@/components/Footer';
import FloatingAssistants from '@/components/FloatingAssistants';
import QuoteModal from '@/components/QuoteModal';
import VideoModal from '@/components/VideoModal';
import SearchModal from '@/components/SearchModal';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Active specs for quote modal
  const [activePatchStyle, setActivePatchStyle] = useState('embroidered');
  const [activeWidth, setActiveWidth] = useState(3.0);
  const [activeHeight, setActiveHeight] = useState(3.0);
  const [activeBacking, setActiveBacking] = useState('iron_on');
  const [activeQuantity, setActiveQuantity] = useState(100);

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
      
      {/* 1. Header: Top Bar + Brand Navbar */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={handleOpenSearch}
      />

      <main>
        {/* 2. Hero Section: Badge, Title, Bullets, CTA Buttons & Realistic Patch Cluster */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenVideo={handleOpenVideo}
        />

        {/* 3. Our Patch Services: 5 Cards (Embroidered, Iron-On, Velcro, Woven, Leather) */}
        <Services onOpenQuote={handleOpenQuote} />

        {/* 4. Interactive Live Patch Studio & Real-Time Price Estimator */}
        <LivePatchStudio onOpenQuoteWithSpecs={handleOpenQuoteWithSpecs} />

        {/* 5. Why Choose BDigitizing?: 4 Feature Icons + Stats + Stitched "CUSTOM PATCHES" Banner */}
        <WhyChooseUs />

        {/* 6. Simple Ordering Process: 4 Connected Numbered Steps with Timing Badges */}
        <Process onOpenQuote={() => handleOpenQuote()} />

        {/* 7. What Our Customers Say: Dark Luxury Section with 5-Star Reviews & Order Tags */}
        <Reviews />

        {/* 8. Frequently Asked Questions + Vibrant Orange CTA Box with Discount Code */}
        <FaqAndCta onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* 9. Dark Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Floating Assistants: Live Order Social Proof Toast & 24/7 WhatsApp Desk */}
      <FloatingAssistants
        whatsappNumber="18005557282"
        onOpenQuote={() => handleOpenQuote()}
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

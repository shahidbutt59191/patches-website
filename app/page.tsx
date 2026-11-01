'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import FaqAndCta from '@/components/FaqAndCta';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import VideoModal from '@/components/VideoModal';
import SearchModal from '@/components/SearchModal';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activePatchStyle, setActivePatchStyle] = useState('embroidered');

  const handleOpenQuote = (styleId?: string) => {
    if (styleId) {
      setActivePatchStyle(styleId);
    }
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

        {/* 4. Why Choose BDigitizing?: 4 Feature Icons + Stitched "CUSTOM PATCHES" Banner */}
        <WhyChooseUs />

        {/* 5. Simple Ordering Process: 4 Connected Numbered Steps */}
        <Process onOpenQuote={() => handleOpenQuote()} />

        {/* 6. What Our Customers Say: Dark Luxury Section with 5-Star Reviews */}
        <Reviews />

        {/* 7. Frequently Asked Questions + Vibrant Orange CTA Box */}
        <FaqAndCta onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* 8. Dark Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Global Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        defaultStyle={activePatchStyle}
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

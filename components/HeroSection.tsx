'use client';

import React, { useState } from 'react';

const HERO_SLIDES = [
  {
    id: 'embroidered',
    title: '100% Tajima High-Density Embroidery',
    badge: 'Industry Gold Standard',
    specs: '100% Madeira Thread • Merrowed Overlock • 5-7 Days Turnaround',
    dimensions: '3.5" Shield Crest',
    icon: '🧵',
    tagline: 'Deep 3D stitch texture with zero thread fraying or puckering.',
  },
  {
    id: 'pvc',
    title: 'Mil-Spec 3D Soft PVC Rubber',
    badge: 'Tactical Waterproof',
    specs: 'Molded Liquid PVC • Recessed Canal • Tactical Velcro Standard',
    dimensions: '3.25" Morale Round',
    icon: '🛡️',
    tagline: 'Impervious to mud, rain, salt water, and extreme combat abrasion.',
  },
  {
    id: 'chenille',
    title: 'Vintage Varsity Wool Chenille',
    badge: 'Athletic Heritage',
    specs: 'Fluffy Looped Yarn • Double Stiff Felt • Heat-Seal Iron-On',
    dimensions: '4.5" Varsity Letter',
    icon: '🏆',
    tagline: 'Iconic collegiate moss stitch for varsity letterman jackets.',
  },
  {
    id: 'leatherette',
    title: 'Laser-Cut Debossed Leatherette',
    badge: 'Premium Lifestyle',
    specs: 'CO2 Laser Etched • Caramel Faux Leather • 3M Heavy Adhesive',
    dimensions: '2.75" Hexagon Badge',
    icon: '🏷️',
    tagline: 'High-contrast fiber laser debossing for snapbacks & workwear beanies.',
  },
];

interface HeroProps {
  heroBadge?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  whatsappNumber?: string;
}

export default function HeroSection({
  heroBadge = 'Direct Factory Facility • 100% Machine Calibrated Custom Patches',
  heroHeadline = 'Professional Custom Patches & Commercial Machine Looming',
  heroSubheadline = 'Commercial Tajima multi-head embroidery, military-spec 3D PVC rubber, laser-cut leatherette, and vintage varsity chenille. Guaranteed 6-hour digital proofs, instant bulk discounts, and free shipping.',
  heroCtaText = 'Start Your Patch Order',
  whatsappNumber = '18005557282',
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = HERO_SLIDES[activeSlide];

  return (
    <header className="relative isolate border-b border-white/10 overflow-hidden bg-[#070913] pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      
      {/* Background Dot Matrix & Glowing Orbs matching EmbroidPro */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 dot-pattern"
          style={{
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)',
          }}
        />
        <div className="absolute -top-32 left-[8%] w-[560px] h-[460px] bg-[#5448ea]/15 rounded-full blur-[130px]" />
        <div className="absolute top-10 right-[4%] w-[420px] h-[380px] bg-[#7c3aed]/12 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <span className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-[#5448ea]/10 border border-[#5448ea]/30 text-xs font-semibold text-indigo-300 font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5448ea] animate-pulse" />
              <span>{heroBadge}</span>
            </span>

            {/* Main H1 Headline with Gradient Text */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-white leading-[1.12]">
              {heroHeadline}
            </h1>

            {/* Sub-headline Description */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300/90 max-w-2xl">
              {heroSubheadline}
            </p>

            {/* Dual CTAs + WhatsApp */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 font-bold tracking-tight text-white rounded-xl px-7 py-3.5 text-sm sm:text-base btn-primary-gradient cursor-pointer shadow-lg w-full sm:w-auto text-center"
              >
                <span>{heroCtaText}</span>
                <span>→</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 font-semibold tracking-tight text-slate-200 rounded-xl px-6 py-3.5 text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto text-center"
              >
                Explore Styles & Pricing
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I need a custom patch quote!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-emerald-400 rounded-xl px-4 py-3.5 text-xs sm:text-sm bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all w-full sm:w-auto text-center"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp Instant Proof</span>
              </a>
            </div>

            {/* Quick Guarantees Bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">✓</span>
                <span>6-Hour Free Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">✓</span>
                <span>100% Tajima Density</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">✓</span>
                <span>Mil-Spec Velcro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">✓</span>
                <span>Worldwide Express</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Patch Showcase Card */}
          <div className="relative w-full">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#5448ea]/30 to-[#7c3aed]/30 blur-xl opacity-70" />

            <div className="relative rounded-3xl border border-white/15 bg-[#0e1326]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Top Selector Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  ✦ LIVE PRODUCTION SAMPLE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  QC Passed
                </span>
              </div>

              {/* Slide Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      activeSlide === idx
                        ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold shadow-xs'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-base">{s.icon}</div>
                    <div className="text-[10px] truncate mt-1">{s.title.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              {/* Active Patch Display Card */}
              <div className="rounded-2xl border border-white/10 bg-[#070913]/80 p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-5xl shadow-inner">
                  {slide.icon}
                </div>

                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 mb-1">
                    {slide.badge}
                  </span>
                  <h3 className="text-xl font-black text-white">{slide.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-sm">
                    {slide.tagline}
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-left font-mono text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">SPECS:</span>
                    <span className="font-semibold text-white">{slide.specs}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">DIMENSIONS:</span>
                    <span className="font-semibold text-indigo-400">{slide.dimensions}</span>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Want this exact specification?</span>
                <a
                  href="#order"
                  className="font-bold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Configure This Patch ↗
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, MessageSquare, Flame } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'embroidered',
    title: '100% Tajima High-Density Embroidery',
    badge: 'Industry Benchmark Standard',
    tagline: 'Deep 3D stitch texture with zero thread fraying, calibrated on 15-needle Tajima multi-head looms.',
    thread: 'Madeira Polyneon 100% Polyester',
    stitches: '22,480 Stitches',
    dimensions: '3.5" Shield Crest',
    backing: 'Mil-Spec Velcro or Iron-On',
    border: 'Merrowed 1/8" Overlock',
    icon: '🧵',
    accent: 'from-indigo-600/30 to-blue-600/10 border-indigo-500/40',
  },
  {
    id: 'pvc',
    title: 'Mil-Spec 3D Soft Molded PVC Rubber',
    badge: 'Tactical Waterproof Grade',
    tagline: 'Impervious to torrential mud, salt water, heavy rain, and extreme combat abrasion. Won’t crack or peel.',
    thread: 'Liquid Soft Vulcanized PVC Polymer',
    stitches: 'Sculpted Multi-Tier 3D Relief',
    dimensions: '3.25" Morale Round',
    backing: 'Pre-sewn Recessed Hook Velcro',
    border: 'Recessed Sewing Perimeter Canal',
    icon: '🛡️',
    accent: 'from-emerald-600/30 to-teal-600/10 border-emerald-500/40',
  },
  {
    id: 'leatherette',
    title: 'Laser-Debossed Caramel Leatherette',
    badge: 'Premium Lifestyle Headwear',
    tagline: 'Fiber laser engraved with deep contrast debossing. The gold standard for trucker snapbacks and beanies.',
    thread: 'Heavyweight Synthetic Full-Grain',
    stitches: 'CO2 Laser Vaporized Deboss',
    dimensions: '2.75" Hexagon Badge',
    backing: '3M Industrial Thermal Adhesive',
    border: 'Laser-Cut Sealed Perimeter',
    icon: '🏷️',
    accent: 'from-amber-600/30 to-orange-600/10 border-amber-500/40',
  },
  {
    id: 'chenille',
    title: 'Vintage Varsity Wool Chenille',
    badge: 'Authentic Collegiate Heritage',
    tagline: 'Plush, high-pile looped moss-stitch yarn on dual-layer stiff wool felt. Iconic letterman jacket look.',
    thread: 'Plush Acrylic Yarn + Double Felt',
    stitches: 'High-Pile Moss Stitch Looming',
    dimensions: '4.5" Varsity Monogram',
    backing: 'Reinforced Heat-Seal Iron-On',
    border: 'Double-Layer Stiff Felt Trim',
    icon: '🏆',
    accent: 'from-yellow-600/30 to-amber-600/10 border-yellow-500/40',
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
  heroBadge = 'Direct Factory Facility • Zero Middleman Broker Markups',
  heroHeadline = 'World-Class Custom Patches — Loomed to Perfection.',
  heroSubheadline = 'Commercial Tajima multi-head embroidery, mil-spec 3D soft PVC rubber, laser-debossed leatherette, and vintage varsity chenille. Guaranteed 6-hour digital proofs, real machine sample photo approvals, and direct wholesale pricing up to 52% off.',
  heroCtaText = 'Start Your Patch Order',
  whatsappNumber = '18005557282',
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative isolate border-b border-white/10 overflow-hidden bg-[#070913] pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-28">
      
      {/* Background Ambient Lighting & Grids */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 dot-pattern opacity-80" />
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Copy & CTAs */}
          <div className="flex flex-col items-start text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 pl-2.5 pr-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-white leading-[1.12]">
              {heroHeadline}
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300/90 max-w-2xl">
              {heroSubheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 font-bold tracking-tight text-white rounded-xl px-7 py-4 text-sm sm:text-base btn-primary-gradient cursor-pointer shadow-xl w-full sm:w-auto text-center"
              >
                <span>{heroCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 font-semibold text-slate-200 rounded-xl px-6 py-4 text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all w-full sm:w-auto text-center"
              >
                <span>Explore 6 Styles</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello ApexPatches, I need a fast custom patch quote!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-emerald-400 rounded-xl px-5 py-4 text-xs sm:text-sm bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Proof</span>
              </a>
            </div>

            {/* Trust Badges & Verified Reviews */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5 Rating</span>
                <span className="text-slate-500">(3,800+ Reviews)</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>10-Pc Low MOQ</span>
                </span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free 6-Hr Proof</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Remake Guarantee</span>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Industrial Specimen Showcase */}
          <div className="relative w-full">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-amber-500/30 blur-2xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl border border-white/15 bg-[#0d1124]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Top Selector Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider">
                    PRODUCTION SPECIMEN INSPECTOR
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  ✓ Machine Calibrated
                </span>
              </div>

              {/* Material Tab Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-lg">{s.icon}</div>
                    <div className="text-[10px] truncate mt-1">{s.title.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              {/* Active Patch Display Card */}
              <div className="rounded-2xl border border-white/10 bg-[#070914] p-6 flex flex-col items-center text-center space-y-4 relative overflow-hidden">
                
                {/* Background stitch border pattern */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400/40 flex items-center justify-center text-5xl shadow-inner relative">
                  {slide.icon}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-black">
                    ✓
                  </div>
                </div>

                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-1.5">
                    {slide.badge}
                  </span>
                  <h3 className="text-xl font-black text-white">{slide.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm">
                    {slide.tagline}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="w-full pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-left font-mono text-[11px] text-slate-300">
                  <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">MATERIAL COMPOSITION</span>
                    <span className="font-semibold text-white text-[11px] truncate block">{slide.thread}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/5 text-right">
                    <span className="text-slate-500 block text-[9px] uppercase">DENSITY / RESOLUTION</span>
                    <span className="font-semibold text-indigo-400 text-[11px] truncate block">{slide.stitches}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">ATTACHMENT BACKING</span>
                    <span className="font-semibold text-slate-200 text-[11px] truncate block">{slide.backing}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 border border-white/5 text-right">
                    <span className="text-slate-500 block text-[9px] uppercase">EDGE OVERLOCK</span>
                    <span className="font-semibold text-amber-400 text-[11px] truncate block">{slide.border}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Need this exact specification?</span>
                <a
                  href="#order"
                  className="font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                >
                  <span>Auto-Fill in Order Form</span>
                  <span>↗</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Play, Sparkles, Shield, Zap, Eye, Tag } from 'lucide-react';
import { HeroPatchItem, DEFAULT_HERO_PATCHES } from '@/lib/settings';

interface HeroProps {
  onOpenQuote?: (styleId?: string) => void;
  onOpenVideo?: () => void;
  badge?: string;
  headline?: string;
  subheadline?: string;
  patches?: HeroPatchItem[];
}

export default function Hero({
  onOpenQuote,
  onOpenVideo,
  badge = 'Premium Quality • Worldwide Shipping',
  headline,
  subheadline = 'High-quality embroidered, woven and custom patches with premium finishing. Perfect for businesses, teams & more.',
  patches,
}: HeroProps) {
  const [activeHoveredPatch, setActiveHoveredPatch] = useState<HeroPatchItem | null>(null);

  const heroPatchList = patches && patches.length >= 5 ? patches : DEFAULT_HERO_PATCHES;
  const p1 = heroPatchList[0]; // Top-Left: Embroidered Shield
  const p2 = heroPatchList[1]; // Top-Right: Debossed Leather
  const p3 = heroPatchList[2]; // Center Focal: 3D Soft PVC
  const p4 = heroPatchList[3]; // Lower-Center: Micro-Woven Tab
  const p5 = heroPatchList[4]; // Bottom-Right: Varsity Chenille

  const handlePatchClick = (styleId?: string) => {
    if (onOpenQuote) {
      onOpenQuote(styleId || 'embroidered');
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-12 lg:pb-22">
      
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      {/* Subtle Warm Gradient Glow Behind Hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs (6 Columns) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* 1. Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/90 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-xs hover:border-orange-300 transition-colors">
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] animate-pulse">
                ★
              </span>
              <span>{badge}</span>
            </div>

            {/* 2. Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight leading-[1.08]">
              {headline ? (
                <span>{headline}</span>
              ) : (
                <>
                  Custom Patches <br />
                  for <span className="text-orange-500 relative inline-block">
                    Your Brand
                    {/* Hand-drawn stitched underline effect */}
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-400/60" viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M0,7 Q50,0 100,7" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5 3" />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {subheadline}
            </p>

            {/* 4. Three Bullet Checkmarks */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-50" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-50" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-50" />
                <span>Worldwide Shipping</span>
              </div>
            </div>

            {/* 5. Dual Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handlePatchClick('embroidered')}
                className="btn-orange px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2.5 shadow-lg hover:shadow-orange-500/30 cursor-pointer"
              >
                <span>Order Custom Patches</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVideo}
                className="px-6 py-3.5 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-bold flex items-center gap-2 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] group-hover:bg-orange-500 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Factory Trust Metrics Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Free 6-Hour Digital Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Tajima 1,200 SPM Looms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Unlimited Free Edits</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Patch Showcase Stage (6 Columns) */}
          <div className="lg:col-span-6 relative">
            
            {/* Dynamic Angled Orange Slash Backdrop Container */}
            <div className="relative mx-auto max-w-[540px] h-[480px] sm:h-[530px] rounded-3xl overflow-hidden shadow-2xl bg-[#141720] border border-slate-800/90">
              
              {/* Textured Fabric Weave Background */}
              <div className="absolute inset-0 bg-fabric-pattern opacity-95" />

              {/* Diagonal Radiant Orange Energy Slash */}
              <div
                className="absolute -top-16 -right-16 w-80 h-96 bg-gradient-to-bl from-orange-400 via-orange-500 to-amber-600 opacity-90 transform rotate-12 blur-xs rounded-full"
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Thread Gleam Sweep Effect */}
              <div className="absolute inset-0 animate-thread-gleam pointer-events-none" />

              {/* Live Hover Specimen Tooltip overlay */}
              {activeHoveredPatch && (
                <div className="absolute top-4 left-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md border border-orange-500/50 rounded-2xl p-3 text-white flex items-center justify-between shadow-2xl animate-in fade-in duration-150">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{activeHoveredPatch.name}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          {activeHoveredPatch.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5 line-clamp-1">
                        {activeHoveredPatch.specs}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePatchClick(activeHoveredPatch.style)}
                    className="text-[10px] font-bold text-orange-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-orange-500 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ml-2 shadow-sm"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* ======================================================== */}
              {/* PATCH 1: Top-Left Tajima High-Density Embroidered Shield */}
              {/* ======================================================== */}
              <div
                onMouseEnter={() => setActiveHoveredPatch(p1)}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                onClick={() => handlePatchClick(p1.style)}
                className="absolute top-6 left-5 sm:left-8 z-20 transform -rotate-6 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-300 cursor-pointer group"
                title={`${p1.name} — Click to Quote`}
              >
                <div className="relative w-36 h-44 sm:w-44 sm:h-52 drop-shadow-2xl">
                  {/* Outer Merrowed Stitch Border Frame */}
                  <div className="w-full h-full rounded-[2.5rem] p-1.5 bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-300 shadow-2xl border border-orange-400/80">
                    <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-slate-950 relative border-2 border-dashed border-orange-300/40">
                      <img
                        src={p1.image}
                        alt={p1.name}
                        className="w-full h-full object-cover object-center filter contrast-105 saturate-110 group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Realistic Thread Texture Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/10 pointer-events-none" />
                      
                      {/* Floating Badge Tag */}
                      <div className="absolute bottom-2 inset-x-2 text-center">
                        <span className="inline-block text-[9px] font-mono font-black uppercase tracking-wider bg-slate-900/90 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/40 shadow-sm backdrop-blur-xs">
                          {p1.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* PATCH 2: Top-Right Artisan Laser-Debossed Leather Circle  */}
              {/* ======================================================== */}
              <div
                onMouseEnter={() => setActiveHoveredPatch(p2)}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                onClick={() => handlePatchClick(p2.style)}
                className="absolute top-8 right-5 sm:right-8 z-20 transform rotate-8 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-300 cursor-pointer group"
                title={`${p2.name} — Click to Quote`}
              >
                <div className="relative w-32 h-32 sm:w-38 sm:h-38 drop-shadow-2xl">
                  <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-amber-800 via-amber-600 to-amber-400 shadow-2xl border border-amber-600/70">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative border-2 border-dashed border-amber-300/50">
                      <img
                        src={p2.image}
                        alt={p2.name}
                        className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-amber-200/10 pointer-events-none" />
                      
                      {/* Badge Pill */}
                      <div className="absolute bottom-2 inset-x-2 text-center">
                        <span className="inline-block text-[8px] font-mono font-black uppercase tracking-wider bg-slate-900/90 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 shadow-sm backdrop-blur-xs">
                          {p2.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* PATCH 3: Center Stage 3D Soft Molded PVC Tactical Morale */}
              {/* ======================================================== */}
              <div
                onMouseEnter={() => setActiveHoveredPatch(p3)}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                onClick={() => handlePatchClick(p3.style)}
                className="absolute top-36 left-12 sm:left-20 z-30 transform hover:scale-110 hover:z-40 transition-all duration-300 cursor-pointer animate-float-gentle group"
                title={`${p3.name} — Click to Quote`}
              >
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl">
                  <div className="w-full h-full rounded-3xl p-2 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl border-2 border-orange-500/80">
                    {/* Recessed Sewing Canal Groove */}
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 relative border-2 border-slate-700 shadow-inner">
                      <img
                        src={p3.image}
                        alt={p3.name}
                        className="w-full h-full object-cover object-center filter contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/15 pointer-events-none" />
                      
                      {/* PVC 3D Bezel Tag */}
                      <div className="absolute bottom-2.5 inset-x-2 text-center">
                        <span className="inline-block text-[9px] font-mono font-black uppercase tracking-wider bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow-md">
                          {p3.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* PATCH 4: Lower Center Jacquard Micro-Woven Tactical Tab   */}
              {/* ======================================================== */}
              <div
                onMouseEnter={() => setActiveHoveredPatch(p4)}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                onClick={() => handlePatchClick(p4.style)}
                className="absolute bottom-8 right-8 sm:right-16 z-25 transform -rotate-3 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-300 cursor-pointer group"
                title={`${p4.name} — Click to Quote`}
              >
                <div className="relative w-44 h-22 sm:w-52 sm:h-24 drop-shadow-2xl">
                  <div className="w-full h-full rounded-2xl p-1 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-500 shadow-xl border border-purple-400/60">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950 relative border border-dashed border-purple-300/40">
                      <img
                        src={p4.image}
                        alt={p4.name}
                        className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60 pointer-events-none" />
                      
                      {/* Title & Badge */}
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider drop-shadow-md">
                          {p4.badge}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-400/40">
                          0.5mm Damask
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* PATCH 5: Far Right Vintage Collegiate Varsity Chenille     */}
              {/* ======================================================== */}
              <div
                onMouseEnter={() => setActiveHoveredPatch(p5)}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                onClick={() => handlePatchClick(p5.style)}
                className="absolute bottom-22 -right-3 sm:right-2 z-20 transform rotate-12 hover:rotate-6 hover:scale-105 hover:z-40 transition-all duration-300 cursor-pointer group"
                title={`${p5.name} — Click to Quote`}
              >
                <div className="relative w-30 h-28 sm:w-36 sm:h-32 drop-shadow-2xl">
                  <div className="w-full h-full rounded-3xl p-1.5 bg-gradient-to-tr from-yellow-600 via-amber-400 to-yellow-200 shadow-2xl border border-yellow-400/80">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 relative border-2 border-dashed border-yellow-300/60">
                      <img
                        src={p5.image}
                        alt={p5.name}
                        className="w-full h-full object-cover object-center filter contrast-110 saturate-120 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-yellow-200/20 pointer-events-none" />
                      
                      <div className="absolute bottom-1.5 inset-x-1.5 text-center">
                        <span className="inline-block text-[8px] font-mono font-black uppercase tracking-wider bg-slate-950/90 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/40 shadow-sm backdrop-blur-xs">
                          {p5.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Micro-hint */}
              <div className="absolute bottom-3 left-4 z-20 text-[10px] text-slate-400 font-mono flex items-center gap-1.5 opacity-80 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-800">
                <Eye className="w-3 h-3 text-orange-400" />
                <span>Hover patches to inspect material detail • Click to Quote</span>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* Verified Brand Trust & Client Strip                       */}
        {/* ======================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 font-sans flex items-center gap-1.5">
                <span>4.9 / 5.0 Rating</span>
                <span className="text-[10px] text-slate-400 font-mono font-normal">• 2,400+ Verified Runs</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Trusted by military units, motorcycle clubs, and global apparel teams.
              </p>
            </div>
          </div>

          {/* Logo Brands Carousel / Ribbon */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 text-slate-400 font-mono text-xs font-black tracking-wider opacity-75">
            <span className="hover:text-slate-900 transition-colors">APEX TACTICAL</span>
            <span className="text-slate-300">•</span>
            <span className="hover:text-slate-900 transition-colors">IRON HORSE MC</span>
            <span className="text-slate-300">•</span>
            <span className="hover:text-slate-900 transition-colors">METRO SWAT</span>
            <span className="text-slate-300">•</span>
            <span className="hover:text-slate-900 transition-colors">TIMBER & BEAN</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hover:text-slate-900 transition-colors hidden sm:inline">ALPINE EXPEDITIONS</span>
          </div>
        </div>

      </div>

    </section>
  );
}

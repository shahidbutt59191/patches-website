'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Play, Sparkles, Shield, Zap, Eye } from 'lucide-react';
import {
  MountainShieldPatch,
  ExploreMorePatch,
  FierceTigerPatch,
  BarEmbroideredPatch,
  GoldenCrownPatch,
} from './PatchVisuals';

interface HeroProps {
  onOpenQuote?: () => void;
  onOpenVideo?: () => void;
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export default function Hero({
  onOpenQuote,
  onOpenVideo,
  badge = 'Premium Quality • Worldwide Shipping',
  headline,
  subheadline = 'High-quality embroidered, woven and custom patches with premium finishing. Perfect for businesses, teams & more.',
}: HeroProps) {
  const [activeHoveredPatch, setActiveHoveredPatch] = useState<string | null>(null);

  const patchDetails: Record<string, { title: string; specs: string }> = {
    mountain: {
      title: 'Alpine Shield Patch',
      specs: '100% Madeira Polyester • 22,480 Stitches • Merrowed Border',
    },
    explore: {
      title: 'Explore More Circular Patch',
      specs: 'High-Density Duck Twill • Heat-Seal Backing • 8 Thread Colors',
    },
    tiger: {
      title: 'Snarling Tiger Head Patch',
      specs: '3D Puffy Embroidery • 14 Custom Thread Shades • Zero Puckering',
    },
    bar: {
      title: 'DRPLORE MORE Tactical Bar',
      specs: 'Heavyweight Black Twill • Mil-Spec Hook & Loop Backing',
    },
    crown: {
      title: 'Royal Crown Heritage Patch',
      specs: 'Metallic Gold Thread • Velvet Cushion Base • Gem Studs',
    },
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
                    {/* Subtle hand-drawn stitched underline effect */}
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
                onClick={onOpenQuote}
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

          {/* Right Column: Realistic Patch Cluster & Fabric Stage (6 Columns) */}
          <div className="lg:col-span-6 relative">
            
            {/* Dynamic Angled Orange Slash Backdrop */}
            <div className="relative mx-auto max-w-[540px] h-[450px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-[#141720] border border-slate-800/80">
              
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
              {activeHoveredPatch && patchDetails[activeHoveredPatch] && (
                <div className="absolute top-4 left-4 right-4 z-40 bg-slate-900/90 backdrop-blur-md border border-orange-500/40 rounded-xl px-4 py-2.5 text-white flex items-center justify-between shadow-xl animate-in fade-in duration-150">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {patchDetails[activeHoveredPatch].title}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        {patchDetails[activeHoveredPatch].specs}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="text-[10px] font-bold text-orange-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Patch 1: Top-Left Mountain Shield ("YOUR LOGO") */}
              <div
                onMouseEnter={() => setActiveHoveredPatch('mountain')}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                className="absolute top-8 left-6 sm:left-10 z-20 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <MountainShieldPatch className="w-36 h-44 sm:w-44 sm:h-52" />
              </div>

              {/* Patch 2: Top-Right "EXPLORE MORE" Round Patch */}
              <div
                onMouseEnter={() => setActiveHoveredPatch('explore')}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                className="absolute top-10 right-6 sm:right-10 z-20 transform rotate-8 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <ExploreMorePatch className="w-32 h-32 sm:w-38 sm:h-38" />
              </div>

              {/* Patch 3: Center Tiger Embroidered Patch (Snarling, Focal Point) */}
              <div
                onMouseEnter={() => setActiveHoveredPatch('tiger')}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                className="absolute top-36 left-12 sm:left-20 z-30 transform hover:scale-110 transition-all duration-300 cursor-pointer animate-float-gentle"
              >
                <FierceTigerPatch className="w-40 h-40 sm:w-48 sm:h-48" />
              </div>

              {/* Patch 4: Lower-Right Embroidered Bar ("DRPLORE MORE") */}
              <div
                onMouseEnter={() => setActiveHoveredPatch('bar')}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                className="absolute bottom-10 right-10 sm:right-16 z-25 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <BarEmbroideredPatch className="w-40 h-20 sm:w-48 sm:h-24" />
              </div>

              {/* Patch 5: Far Right Gold Royal Crown Patch */}
              <div
                onMouseEnter={() => setActiveHoveredPatch('crown')}
                onMouseLeave={() => setActiveHoveredPatch(null)}
                className="absolute bottom-24 -right-4 sm:right-2 z-20 transform rotate-12 hover:rotate-6 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <GoldenCrownPatch className="w-28 h-24 sm:w-36 sm:h-28" />
              </div>

              {/* Bottom Micro-hint */}
              <div className="absolute bottom-3 left-4 z-20 text-[10px] text-slate-400 font-mono flex items-center gap-1.5 opacity-70">
                <Eye className="w-3 h-3 text-orange-400" />
                <span>Hover patches to inspect stitch detail</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

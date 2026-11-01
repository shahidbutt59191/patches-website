'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, Play, Sparkles } from 'lucide-react';
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
}

export default function Hero({ onOpenQuote, onOpenVideo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs (5.5 Columns) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* 1. Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/90 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-xs">
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                ★
              </span>
              <span>Premium Quality • Worldwide Shipping</span>
            </div>

            {/* 2. Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Custom Patches <br />
              for <span className="text-orange-500">Your Brand</span>
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              High-quality embroidered, woven and custom patches with premium finishing. Perfect for businesses, teams &amp; more.
            </p>

            {/* 4. Three Bullet Checkmarks */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 fill-orange-50" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 fill-orange-50" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 fill-orange-50" />
                <span>Worldwide Shipping</span>
              </div>
            </div>

            {/* 5. Dual Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenQuote}
                className="btn-orange px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2.5 shadow-lg cursor-pointer"
              >
                <span>Order Custom Patches</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVideo}
                className="px-6 py-3.5 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-bold flex items-center gap-2 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

          </div>

          {/* Right Column: Realistic Patch Cluster & Fabric Stage (6.5 Columns) */}
          <div className="lg:col-span-6 relative">
            
            {/* Dynamic Angled Orange Slash Backdrop */}
            <div className="relative mx-auto max-w-[540px] h-[440px] sm:h-[490px] rounded-3xl overflow-hidden shadow-2xl bg-[#141720]">
              
              {/* Textured Fabric Weave Background */}
              <div className="absolute inset-0 bg-fabric-pattern opacity-90" />

              {/* Diagonal Radiant Orange Energy Slash */}
              <div
                className="absolute -top-16 -right-16 w-80 h-96 bg-gradient-to-bl from-orange-400 via-orange-500 to-amber-600 opacity-90 transform rotate-12 blur-xs rounded-full"
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Patch 1: Top-Left Mountain Shield ("YOUR LOGO") */}
              <div className="absolute top-4 left-6 sm:left-10 z-20 transform -rotate-6 hover:rotate-0 transition-transform">
                <MountainShieldPatch className="w-36 h-44 sm:w-44 sm:h-52" />
              </div>

              {/* Patch 2: Top-Right "EXPLORE MORE" Round Patch */}
              <div className="absolute top-6 right-6 sm:right-10 z-20 transform rotate-8 hover:rotate-0 transition-transform">
                <ExploreMorePatch className="w-32 h-32 sm:w-38 sm:h-38" />
              </div>

              {/* Patch 3: Center Tiger Embroidered Patch (Snarling, Focal Point) */}
              <div className="absolute top-36 left-12 sm:left-20 z-30 transform hover:scale-105 transition-transform">
                <FierceTigerPatch className="w-40 h-40 sm:w-48 sm:h-48" />
              </div>

              {/* Patch 4: Lower-Right Embroidered Bar ("DRPLORE MORE") */}
              <div className="absolute bottom-10 right-10 sm:right-16 z-25 transform -rotate-3 hover:rotate-0 transition-transform">
                <BarEmbroideredPatch className="w-40 h-20 sm:w-48 sm:h-24" />
              </div>

              {/* Patch 5: Far Right Gold Royal Crown Patch */}
              <div className="absolute bottom-24 -right-4 sm:right-2 z-20 transform rotate-12 hover:rotate-6 transition-transform">
                <GoldenCrownPatch className="w-28 h-24 sm:w-36 sm:h-28" />
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

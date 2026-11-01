'use client';

import React, { useState } from 'react';
import { Gem, Zap, Globe, Headphones, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const [macroTab, setMacroTab] = useState<'threads' | 'backing' | 'border'>('threads');

  const features = [
    {
      icon: <Gem className="w-8 h-8 text-orange-500" />,
      title: 'Premium Quality',
      subtitle: 'Stitching',
      detail: 'Tajima industrial multi-head looms with 100% Madeira Polyneon thread.',
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: '10-14 Days',
      subtitle: 'Turnaround',
      detail: 'Reliable fast turnaround with rush 5-7 business day expedites available.',
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: 'Worldwide',
      subtitle: 'Shipping',
      detail: '100% free tracked delivery to North America, Europe, Asia, and Oceania.',
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-500" />,
      title: '24/7 Customer',
      subtitle: 'Support',
      detail: 'Dedicated patch digitizing artists on live chat and WhatsApp desk.',
    },
  ];

  const stats = [
    { value: '1.8M+', label: 'Patches Sewn' },
    { value: '99.8%', label: 'On-Time Delivery' },
    { value: '6 Hours', label: 'Digital Proof Speed' },
    { value: '50+', label: 'Countries Shipped Free' },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-22 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Direct Factory Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Choose BDigitizing?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              We are committed to delivering the best patch solutions for your business with zero middlemen.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center px-2">
                <div className="text-lg sm:text-xl font-black text-orange-600 font-mono">
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Columns: Left 4 Features, Right Custom Patches Fabric Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 4 Features (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-start hover:border-orange-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="mb-4 p-3 rounded-2xl bg-orange-50 text-orange-600 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title} <span className="text-slate-400 font-normal">/ {item.subtitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Realistic "CUSTOM PATCHES" Stitched Fabric Banner (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative h-80 rounded-3xl overflow-hidden bg-[#12141a] shadow-2xl flex flex-col justify-between p-6 border border-slate-800">
              
              {/* Textured Black Denim Weave */}
              <div className="absolute inset-0 bg-fabric-pattern opacity-95" />

              {/* Radiant Warm Flare */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top Banner Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Direct Loom Embroidery
                </span>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  Madeira 100% Polyneon
                </span>
              </div>

              {/* Center: Angled Dimensionally Embroidered "CUSTOM PATCHES" Patch */}
              <div className="relative z-10 my-auto flex justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500 filter drop-shadow-2xl">
                <svg viewBox="0 0 320 140" className="w-72 sm:w-80 h-auto">
                  <defs>
                    <linearGradient id="whyOrangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#ea580c" />
                      <stop offset="100%" stopColor="#c2410c" />
                    </linearGradient>
                    <filter id="textStitchShadow">
                      <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
                    </filter>
                  </defs>

                  {/* Dark Twill Patch Base */}
                  <rect
                    x="10"
                    y="10"
                    width="300"
                    height="120"
                    rx="16"
                    fill="#181b22"
                    stroke="url(#whyOrangeBorder)"
                    strokeWidth="8"
                  />

                  {/* Inner Stitched Dash Line */}
                  <rect
                    x="18"
                    y="18"
                    width="284"
                    height="104"
                    rx="10"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />

                  {/* Bold Embroidered Letters: CUSTOM PATCHES */}
                  <text
                    x="160"
                    y="60"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="Impact, Arial Black, sans-serif"
                    fontWeight="900"
                    fontSize="30"
                    letterSpacing="3"
                    filter="url(#textStitchShadow)"
                  >
                    CUSTOM
                  </text>
                  <text
                    x="160"
                    y="100"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="Impact, Arial Black, sans-serif"
                    fontWeight="900"
                    fontSize="32"
                    letterSpacing="3.5"
                    filter="url(#textStitchShadow)"
                  >
                    PATCHES
                  </text>
                </svg>
              </div>

              {/* Bottom Guarantee Strip */}
              <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Puckering Guarantee
                </span>
                <span className="text-slate-400">100% Machine Washable</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Gem, Zap, Globe, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Gem className="w-8 h-8 text-orange-500" />,
      title: 'Premium Quality',
      subtitle: 'Stitching',
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: '10-14 Days',
      subtitle: 'Turnaround',
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: 'Worldwide',
      subtitle: 'Shipping',
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-500" />,
      title: '24/7 Customer',
      subtitle: 'Support',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose BDigitizing?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            We are committed to delivering the best patch solutions for your business.
          </p>
        </div>

        {/* 2 Columns: Left 4 Features, Right Custom Patches Fabric Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 4 Features in 4-col or 2x2 grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start border-l-2 border-orange-100 pl-4 py-2 hover:border-orange-500 transition-colors"
              >
                <div className="mb-4 p-2 rounded-xl bg-orange-50/80">
                  {item.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Realistic "CUSTOM PATCHES" Stitched Fabric Banner (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-[#12141a] shadow-xl flex items-center justify-center p-6 border border-slate-800">
              
              {/* Textured Black Denim Weave */}
              <div className="absolute inset-0 bg-fabric-pattern opacity-95" />

              {/* Radiant Warm Flare */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl" />

              {/* Angled Dimensionally Embroidered "CUSTOM PATCHES" Patch */}
              <div className="relative transform -rotate-12 hover:rotate-0 transition-transform duration-500 filter drop-shadow-2xl">
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

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

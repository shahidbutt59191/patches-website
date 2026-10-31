'use client';

import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Upload Artwork & Select Specs',
    desc: 'Submit your logo, sketch, or vector file in any format (PNG, JPG, PDF, AI, SVG). Choose your dimensions, backing type, and quantity.',
    icon: '📤',
  },
  {
    step: '02',
    title: '6-Hour Free Digital Proof',
    desc: 'Our master digitizers hand-plot your design and send an exact high-res stitch simulation showing thread colors, border trim, and dimensions within 6 hours.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'Industrial Loom Production',
    desc: 'Once approved, your patches run on computerized Tajima multi-head looms or micro-injection PVC molding lines. Backings and overlock borders are attached.',
    icon: '🧵',
  },
  {
    step: '04',
    title: 'Quality Check & Express Dispatch',
    desc: 'Every single patch undergoes 100% manual inspection for thread tension, border cleanliness, and adhesion before priority express delivery to your door.',
    icon: '✈️',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-[#5448ea]/10 text-indigo-300 border-[#5448ea]/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Clear & Streamlined Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            A clear process from artwork to finished patches
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            How It Works: 4 straightforward production steps engineered for speed, transparency, and perfection.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#0c1020] border border-white/10 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    STEP {s.step}
                  </span>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-indigo-400 flex items-center gap-1.5">
                <span>✓ Step Completed</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

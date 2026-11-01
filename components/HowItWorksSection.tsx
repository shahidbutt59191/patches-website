'use client';

import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Upload Artwork & Configure Specs',
    desc: 'Submit your logo, sketch, or vector file in any format (PNG, JPG, PDF, AI, SVG). Choose your dimensions, backing type, and quantity in our calculator.',
    icon: '📤',
    guarantee: 'Accepts sketches & low-res art',
  },
  {
    step: '02',
    title: '6-Hour Free Digital Stitch Proof',
    desc: 'Our master digitizers hand-plot your design and send an exact millimeter-calibrated 3D stitch simulation showing thread sheen and borders with unlimited free revisions.',
    icon: '🔍',
    guarantee: '100% Free with Unlimited Edits',
  },
  {
    step: '03',
    title: 'Real Machine Sample Photo Approval',
    desc: 'Before the full batch runs, our machine operators stitch out the first physical sample and email high-resolution macro studio photos for your 100% final green light.',
    icon: '📸',
    guarantee: 'Zero Risk • Final Sign-Off',
  },
  {
    step: '04',
    title: 'Precision Loom Run & Express Dispatch',
    desc: 'Approved patches run on computerized Tajima multi-head looms, undergo 100% manual quality inspection for thread tension, and dispatch via tracked express delivery.',
    icon: '✈️',
    guarantee: 'Tracked Doorstep Delivery',
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
            Clear &amp; Streamlined Factory Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            From Your Sketch to Finished Physical Patches
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            4 transparent production milestones engineered for speed, absolute precision, and zero-risk customer approval.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#0c1020] border border-white/10 flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    STEP {s.step}
                  </span>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span>✓ {s.guarantee}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';

const GUARANTEES = [
  {
    title: '100% Machine Calibrated by Masters',
    desc: 'Every stitch path, underlay angle, and pull-compensation tolerance is manually plotted by master digitizers for clean, production-speed commercial sew-outs.',
    icon: '🧵',
  },
  {
    title: 'Free Proofing & Unlimited Revisions',
    desc: 'We send an exact digital stitch simulation within 6 hours. You receive unlimited free design revisions until you are 100% satisfied before we run looms.',
    icon: '✨',
  },
  {
    title: 'Exact Thread & Pantone PMS Matching',
    desc: 'We match your brand colors to genuine Madeira poly/rayon thread numbers and Pantone solid coated PMS formulas with zero color distortion.',
    icon: '🎨',
  },
  {
    title: 'Zero-Defect Replacement Guarantee',
    desc: 'If any patch in your batch has broken threads, misaligned borders, or defective backing, we remanufacture and rush deliver replacements 100% free of charge.',
    icon: '🛡️',
  },
];

export default function GuaranteeSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Zero-Risk Manufacturing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            We Stand Behind Every Single Patch
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            Commercial production cannot afford downtime or flawed items. That is why every custom patch is protected by our quadruple factory guarantee.
          </p>
        </div>

        {/* 4 Guarantees Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GUARANTEES.map((g, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0c1020] border border-white/10 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {g.icon}
                </div>

                <h3 className="font-extrabold text-base text-white mb-2">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {g.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span>✓ 100% Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

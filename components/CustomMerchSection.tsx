'use client';

import React from 'react';
import { Award, KeyRound, Disc, FileCode, PenTool, Sparkles, ArrowRight } from 'lucide-react';

const MERCH_ITEMS = [
  {
    id: 'pins',
    title: 'Custom Enamel Lapel Pins',
    category: 'Merchandise',
    desc: 'Jewelry-grade hard enamel (cloisonné smooth finish) and textured soft enamel. Premium butterfly clutch or magnetic fasteners.',
    startingPrice: 'From $1.25 / ea',
    minOrder: 'Min 50 pcs',
    icon: Award,
    badge: 'Jewelry Finish',
    accent: 'from-amber-500/20 to-yellow-600/10 border-amber-500/30 text-amber-400',
    tags: ['Hard Enamel', 'Soft Enamel', 'Die Struck Gold/Nickel'],
  },
  {
    id: 'keychains',
    title: 'Embroidered Flight Tags & Jet Rings',
    category: 'Accessories',
    desc: 'Double-sided heavy woven or embroidered keyrings with reinforced merrowed border and stainless steel eyelet with split ring.',
    startingPrice: 'From $1.15 / ea',
    minOrder: 'Min 25 pcs',
    icon: KeyRound,
    badge: 'Popular Streetwear',
    accent: 'from-rose-500/20 to-red-600/10 border-rose-500/30 text-rose-400',
    tags: ['Double-Sided Stitch', 'Merrowed Rim', 'Heavy Steel Ring'],
  },
  {
    id: 'coins',
    title: 'Solid Die-Cast Challenge Coins',
    category: 'Military & Honors',
    desc: 'Heavyweight brass and zinc alloy challenge coins. Deep 3D reliefs, antique patina, diamond-cut reeded edges, and dual-metal electroplating.',
    startingPrice: 'From $2.85 / ea',
    minOrder: 'Min 25 pcs',
    icon: Disc,
    badge: 'Heavyweight Metal',
    accent: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400',
    tags: ['Dual-Plating', 'Reeded Edges', 'Velvet Gift Boxes'],
  },
  {
    id: 'digitizing',
    title: 'Commercial Embroidery Digitizing',
    category: 'Digital Service',
    desc: 'Machine-calibrated DST, EMB, PES files plotted for zero thread-breaks and optimal stitch sequencing. Tested on Tajima & Barudan multi-heads.',
    startingPrice: '$12 Flat Fee',
    minOrder: '6-Hour Turnaround',
    icon: FileCode,
    badge: 'Shop Pro Standard',
    accent: 'from-indigo-500/20 to-purple-600/10 border-indigo-500/30 text-indigo-400',
    tags: ['Tajima DST / Wilcom EMB', 'Min Jump Stitches', 'Free Edits'],
  },
  {
    id: 'vector',
    title: 'Precision Vector Art Recreation',
    category: 'Digital Service',
    desc: 'Transform low-resolution camera photos, sketches, or blurry bitmaps into clean, print-ready vector lines (AI, SVG, EPS, high-res PDF).',
    startingPrice: '$8 Flat Fee',
    minOrder: '4-Hour Turnaround',
    icon: PenTool,
    badge: 'Infinite Resolution',
    accent: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400',
    tags: ['Clean Anchor Points', 'CMYK & Pantone Match', 'Layered Vector'],
  },
];

export default function CustomMerchSection() {
  return (
    <section id="merchandise" className="py-20 sm:py-28 bg-[#0a0d1e]/60 border-b border-white/10 relative scroll-mt-20">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM MERCHANDISE &amp; DIGITAL LAB</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white mt-2">
              Expand Beyond Patches
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Equip your brand with matching custom enamel pins, challenge coins, double-sided flight tags, and industrial embroidery digitizing.
            </p>
          </div>

          <a
            href="#order"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-indigo-500/50 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-all group shrink-0"
          >
            <span>Quote Custom Merch</span>
            <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>

        {/* Merch & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MERCH_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative rounded-3xl bg-[#0c1020] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-[#0f1428] transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} border flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Feature Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & Link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-white font-bold block">{item.startingPrice}</span>
                    <span className="text-[10px] text-slate-500">{item.minOrder}</span>
                  </div>

                  <a
                    href="#order"
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold group-hover:translate-x-1 transition-all"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

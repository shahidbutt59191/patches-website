'use client';

import React, { useState } from 'react';

const SAMPLES = [
  {
    id: 1,
    title: 'Tactical Recon Skull Morale Badge',
    category: 'pvc',
    badge: '3D Soft PVC Rubber',
    icon: '🛡️',
    specs: '3.25" × 3.0" • Pantone 418C Coyote • Mil-Spec Hook Velcro',
    batch: '500 pcs',
    desc: 'Deep multi-layer 3D liquid PVC casting with recessed border stitching canal and glow pigment.',
  },
  {
    id: 2,
    title: 'Metro SWAT Special Operations Crest',
    category: 'embroidered',
    badge: '100% Tajima Embroidery',
    icon: '🧵',
    specs: '3.75" × 3.25" • 100% Madeira Thread • Merrowed Gold Border',
    batch: '250 pcs',
    desc: 'High-density polyester stitch coverage calibrated for extreme abrasion resistance on plate carriers.',
  },
  {
    id: 3,
    title: 'State Championship Gold Varsity "E"',
    category: 'chenille',
    badge: 'Vintage Chenille',
    icon: '🏆',
    specs: '4.5" × 4.0" • Loop Yarn Stitch • Double Stiff Wool Felt Base',
    batch: '150 pcs',
    desc: 'Traditional collegiate letterman jacket patch with heavy loop pile and thermal iron-on film.',
  },
  {
    id: 4,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'leather',
    badge: 'Laser-Cut Leatherette',
    icon: '🏷️',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    batch: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail for trucker snapbacks and beanies.',
  },
  {
    id: 5,
    title: 'Iron Horse MC Top Rocker Arch',
    category: 'embroidered',
    badge: 'Heavy Twill Embroidered',
    icon: '🦅',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    batch: '100 sets',
    desc: 'Arch rocker patches engineered to withstand highway wind, rain, and motorcycle leather cut wear.',
  },
  {
    id: 6,
    title: 'Apex Esports League Tournament Emblem',
    category: 'woven',
    badge: 'Micro-Woven Damask',
    icon: '🎮',
    specs: '2.5" × 2.5" • 50-Denier Micro Thread • Laser Sealed Edge',
    batch: '1,000 pcs',
    desc: 'Flat high-density woven damask capturing tiny typography and vibrant neon color gradients.',
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'embroidered' | 'pvc' | 'chenille' | 'leather' | 'woven'>('all');

  const filtered = activeCategory === 'all'
    ? SAMPLES
    : SAMPLES.filter((s) => s.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching EmbroidPro */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-[#5448ea]/10 text-indigo-300 border-[#5448ea]/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Proof of Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Digitizing &amp; Custom Patches Gallery
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            Recent physical production runs across tactical squads, corporate apparel, high school athletics, and motorcycle clubs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          {[
            { id: 'all', label: 'All Portfolio' },
            { id: 'embroidered', label: '🧵 Embroidered Patches' },
            { id: 'pvc', label: '🛡️ 3D PVC Rubber' },
            { id: 'chenille', label: '🏆 Varsity Chenille' },
            { id: 'leather', label: '🏷️ Laser Leatherette' },
            { id: 'woven', label: '🎮 Micro-Woven' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveCategory(btn.id as any)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                activeCategory === btn.id
                  ? 'btn-primary-gradient text-white font-bold shadow-md'
                  : 'border-white/10 bg-[#0c1020] text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-white/10 bg-[#0c1020] p-6 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{item.batch} Batch</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">{item.specs}</div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">✓ 100% Quality Inspected</span>
                <a
                  href="#order"
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline"
                >
                  Request Similar Style ↗
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

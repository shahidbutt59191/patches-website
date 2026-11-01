'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, Check, ArrowRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Tactical Recon Skull Morale Badge',
    category: 'tactical',
    badge: '3D Soft Molded PVC',
    icon: '🛡️',
    specs: '3.25" × 3.0" • Pantone 418C Coyote • Mil-Spec Hook Velcro',
    batch: '500 pcs',
    desc: 'Multi-tiered 3D liquid PVC casting with recessed perimeter stitching canal and glow-in-the-dark pigment.',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 2,
    title: 'Metro SWAT Special Operations Crest',
    category: 'tactical',
    badge: '100% Tajima High Density',
    icon: '🧵',
    specs: '3.75" × 3.25" • 100% Madeira Thread • Merrowed Gold Border',
    batch: '250 pcs',
    desc: 'High-density polyester stitch coverage calibrated for extreme abrasion resistance on heavy plate carriers.',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 3,
    title: 'State Championship Gold Varsity "E"',
    category: 'varsity',
    badge: 'Vintage Chenille',
    icon: '🏆',
    specs: '4.5" × 4.0" • Loop Yarn Stitch • Double Stiff Wool Felt Base',
    batch: '150 pcs',
    desc: 'Traditional collegiate letterman jacket patch with heavy high-pile loop yarn and thermal iron-on film.',
    colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  {
    id: 4,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'headwear',
    badge: 'Laser-Debossed Leatherette',
    icon: '🏷️',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    batch: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail for trucker snapbacks and beanies.',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 5,
    title: 'Iron Horse MC Top Rocker Arch',
    category: 'biker',
    badge: 'Heavy Twill Embroidered',
    icon: '🦅',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    batch: '100 sets',
    desc: 'Arch rocker patches engineered to withstand 80mph highway wind, rain, and motorcycle leather cut wear.',
    colorClass: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 6,
    title: 'Apex Flight Squadron Jet Tag',
    category: 'corporate',
    badge: 'Double-Sided Embroidered',
    icon: '✈️',
    specs: '5.0" × 1.25" • Heavy Merrowed Rim • Steel Eyelet & Ring',
    batch: '500 pcs',
    desc: 'Heavy duty aviation flight keytag with high-tension embroidered typography on both faces.',
    colorClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'tactical', label: 'Tactical & Military' },
  { id: 'biker', label: 'Biker MC Rockers' },
  { id: 'headwear', label: 'Caps & Beanies' },
  { id: 'varsity', label: 'Varsity & Streetwear' },
  { id: 'corporate', label: 'Corporate & Aviation' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>FACTORY PRODUCTION GALLERY</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 mt-2">
              Recent Client Production Runs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Inspect real technical sew-outs and production batches manufactured on our multi-head Tajima and micro-molding lines.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.colorClass}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {item.batch}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-mono">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">TECHNICAL SPECS:</span>
                  <span className="text-slate-800 font-semibold">{item.specs}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">100% Machine Sew-Out</span>
                <a
                  href="#quote"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Quote Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

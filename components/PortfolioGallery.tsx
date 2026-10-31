'use client';

import React, { useState } from 'react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Ghost Recon Task Force Skull',
    category: 'tactical',
    badge: '3D PVC Rubber',
    icon: '🛡️',
    specs: '3.25" × 3.0" • Coyote Brown PMS • Tactical Hook Velcro',
    units: '500 pcs',
    desc: 'Deep 3D sculpted liquid PVC with recessed sewing canal and glow-in-the-dark eyes.',
  },
  {
    id: 2,
    title: 'Metro SWAT Special Operations Shield',
    category: 'police',
    badge: '100% Tajima Embroidery',
    icon: '🧵',
    specs: '3.75" × 3.25" • 100% Stitch Coverage • Merrowed Gold Border',
    units: '250 pcs',
    desc: 'Dense Madeira polyester thread construction resistant to abrasion and heavy field use.',
  },
  {
    id: 3,
    title: 'State Championship Gold Varsity "E"',
    category: 'varsity',
    badge: 'Vintage Chenille',
    icon: '🏆',
    specs: '4.5" × 4.0" • Toweling Loop Stitch • Double Stiff Felt Border',
    units: '150 pcs',
    desc: 'Authentic collegiate varsity jacket letterman patch with industrial iron-on film.',
  },
  {
    id: 4,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'streetwear',
    badge: 'Laser-Cut Leatherette',
    icon: '🏷️',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    units: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail for trucker snapbacks.',
  },
  {
    id: 5,
    title: 'Iron Horse MC Top Rocker Crest',
    category: 'biker',
    badge: 'Heavy Twill Embroidered',
    icon: '🦅',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    units: '100 sets',
    desc: 'Arch rocker patches engineered to withstand highway wind, rain, and motorcycle leathers.',
  },
  {
    id: 6,
    title: 'Apex Esports League Tournament Crest',
    category: 'streetwear',
    badge: 'Micro-Woven Damask',
    icon: '🎮',
    specs: '2.5" × 2.5" • 50-Denier Micro Thread • Laser Sealed Edge',
    units: '1,000 pcs',
    desc: 'Flat high-density woven patch capturing tiny typography and vibrant neon gradients.',
  },
];

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<'all' | 'tactical' | 'police' | 'varsity' | 'biker' | 'streetwear'>('all');

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery-section" className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-3">
            <span>Real Production Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Factory Production Portfolio
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Explore recent custom batches produced for military units, police departments, biker clubs, and luxury streetwear brands.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          {[
            { id: 'all', label: 'All Showcase' },
            { id: 'tactical', label: '🛡️ Military & Tactical' },
            { id: 'police', label: '🚨 Police & First Responders' },
            { id: 'varsity', label: '🏆 High School & Varsity' },
            { id: 'biker', label: '🦅 Biker & Motorcycle Clubs' },
            { id: 'streetwear', label: '👕 Streetwear & Apparel' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === btn.id
                  ? 'border-amber-500 bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-700'
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
              className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{item.units} Batch</div>
                  </div>
                </div>

                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">{item.specs}</div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">✓ 100% Inspected</span>
                <a
                  href="#order-form"
                  className="text-amber-400 hover:text-amber-300 font-bold underline"
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

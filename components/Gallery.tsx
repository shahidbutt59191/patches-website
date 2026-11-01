'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, Check, ArrowRight } from 'lucide-react';

interface GalleryProps {
  onOpenQuote?: () => void;
}

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
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    id: 3,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'headwear',
    badge: 'Laser-Debossed Leatherette',
    icon: '🏷️',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    batch: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail for trucker snapbacks and beanies.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 4,
    title: 'Iron Horse MC Top Rocker Arch',
    category: 'biker',
    badge: 'Heavy Twill Embroidered',
    icon: '🦅',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    batch: '100 sets',
    desc: 'Arch rocker patches engineered to withstand 80mph highway wind, rain, and motorcycle leather cut wear.',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 5,
    title: 'State Championship Gold Varsity "E"',
    category: 'varsity',
    badge: 'Vintage Chenille',
    icon: '🏆',
    specs: '4.5" × 4.0" • Loop Yarn Stitch • Double Stiff Wool Felt Base',
    batch: '150 pcs',
    desc: 'Traditional collegiate letterman jacket patch with heavy high-pile loop yarn and thermal iron-on film.',
    badgeClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  {
    id: 6,
    title: 'Apex Esports Micro-Detail Crest',
    category: 'headwear',
    badge: 'Jacquard Micro-Woven',
    icon: '🎮',
    specs: '2.5" × 2.5" • 50-Denier Damask • Laser Hot-Cut Edge',
    batch: '400 pcs',
    desc: 'Damask weaving machine running 50-denier micro-threads to resolve 0.5mm small text without thread fuzzing.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

export default function Gallery({ onOpenQuote }: GalleryProps) {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-16 sm:py-22 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Factory Runs Completed for Real Clients
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Inspect actual client production specimens across tactical units, lifestyle headwear, varsity jackets, and biker clubs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Portfolio' },
              { id: 'tactical', label: 'Tactical Units' },
              { id: 'headwear', label: 'Caps & Beanies' },
              { id: 'biker', label: 'Biker MC' },
              { id: 'varsity', label: 'Varsity Athletics' },
            ].map((f) => (
              <button
                type="button"
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-orange-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {item.batch}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1.5">
                  {item.title}
                </h3>
                <div className="text-[11px] font-mono text-orange-600 font-semibold mb-3">
                  {item.specs}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 100% Approved Proof
                </span>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, Check, ArrowRight, Eye, X, Layers, ExternalLink } from 'lucide-react';

import { PortfolioItem } from '@/lib/settings';

interface PortfolioProps {
  onOpenQuote?: (styleId?: string) => void;
  items?: PortfolioItem[];
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Tactical Recon Skull Morale Badge',
    category: 'tactical',
    styleId: 'velcro',
    badge: '3D Soft Molded PVC',
    specs: '3.25" × 3.0" • Pantone 418C Coyote • Mil-Spec Hook Velcro',
    batch: '500 pcs',
    desc: 'Multi-tiered 3D liquid PVC casting with recessed perimeter stitching canal, waterproof polymer, and subdued tactical coloring.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80',
    altText: 'Tactical Recon Skull 3D PVC Morale Patch on plate carrier',
  },
  {
    id: 2,
    title: 'Metro SWAT Special Operations Crest',
    category: 'tactical',
    styleId: 'embroidered',
    badge: '100% Tajima High Density',
    specs: '3.75" × 3.25" • 100% Madeira Thread • Merrowed Gold Border',
    batch: '250 pcs',
    desc: 'Full-density polyester thread coverage calibrated for extreme abrasion resistance on heavy tactical uniforms with zero fraying.',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
    altText: 'Metro SWAT High Density Embroidered Shield Patch with Gold Merrowed Border',
  },
  {
    id: 3,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'headwear',
    styleId: 'leather',
    badge: 'Laser-Debossed Leatherette',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    batch: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail and perimeter stitch channel for trucker snapbacks and winter beanies.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    altText: 'Artisan Laser Debossed Leather Patch on Trucker Snapback Cap',
  },
  {
    id: 4,
    title: 'Iron Horse MC Top Rocker Arch',
    category: 'biker',
    styleId: 'embroidered',
    badge: 'Heavy Twill Embroidered',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    batch: '100 sets',
    desc: 'Arch rocker patches engineered to withstand 80mph highway wind, rain, and motorcycle leather cut abrasion without puckering.',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    altText: 'Biker Motorcycle Club Heavy Twill Embroidered Rocker Cut',
  },
  {
    id: 5,
    title: 'State Championship Gold Varsity "E"',
    category: 'varsity',
    styleId: 'embroidered',
    badge: 'Vintage Chenille',
    specs: '4.5" × 4.0" • Loop Yarn Stitch • Double Stiff Wool Felt Base',
    batch: '150 pcs',
    desc: 'Traditional collegiate letterman jacket patch with heavy high-pile loop yarn, gold towel moss stitch, and thermal iron-on film.',
    badgeClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
    altText: 'Vintage Varsity Collegiate Chenille Letter Patch on Letterman Bomber Jacket',
  },
  {
    id: 6,
    title: 'Apex Esports Micro-Detail Tournament Crest',
    category: 'headwear',
    styleId: 'woven',
    badge: 'Jacquard Micro-Woven',
    specs: '2.5" × 2.5" • 50-Denier Damask • Laser Hot-Cut Edge',
    batch: '400 pcs',
    desc: 'Damask weaving machine running 50-denier micro-threads to resolve 0.5mm small text and intricate geometric lines impossible with embroidery.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    altText: 'Jacquard Micro-Woven Tournament Crest Patch on Streetwear Hoodie',
  },
];

export default function Portfolio({ onOpenQuote, items }: PortfolioProps) {
  const [filter, setFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const displayItems = items && items.length > 0 ? items : PORTFOLIO_ITEMS;

  const filteredItems = filter === 'all'
    ? displayItems
    : displayItems.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Custom Patch Portfolio
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
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-[#1dbf73] text-white shadow-sm'
                    : 'bg-[#f7f7f7] border border-[#e4e5e7] text-[#404145] hover:text-[#222325]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 1. Large High-Resolution Product Image Banner */}
                <div className="relative h-60 sm:h-64 w-full bg-[#141722] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.altText}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback gradient if external image network fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle Dark Vignette & Texture */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md border ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                      {item.batch}
                    </span>
                  </div>

                  {/* Zoom Lightbox Trigger Button on Hover */}
                  <button
                    type="button"
                    onClick={() => setLightboxItem(item)}
                    aria-label={`View enlarged photo of ${item.title}`}
                    className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-orange-500 text-slate-800 hover:text-white shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Title Overlay in Image Base */}
                  <div className="absolute bottom-4 left-4 z-10 pr-14">
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* 2. Card Content & Specs */}
                <div className="p-6 space-y-3">
                  <div className="text-xs font-mono font-bold text-orange-600 bg-orange-50/80 p-2 rounded-xl border border-orange-200/60">
                    {item.specs}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* 3. Card Footer Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Approved Proof</span>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote(item.styleId)}
                  className="px-4 py-2 rounded-lg border border-[#1dbf73] text-[#1dbf73] hover:bg-[#1dbf73] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Order Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full-Resolution Image Inspection */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-[#111318] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-[#161820]">
              <div>
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">
                  {lightboxItem.badge} • {lightboxItem.batch}
                </span>
                <h4 className="text-base font-bold text-white">
                  {lightboxItem.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image View */}
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.altText}
                className="max-h-[60vh] w-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#161820] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-300 font-mono">
                {lightboxItem.specs}
              </div>
              <button
                type="button"
                onClick={() => {
                  const styleId = lightboxItem.styleId;
                  setLightboxItem(null);
                  if (onOpenQuote) onOpenQuote(styleId);
                }}
                className="btn-orange px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
              >
                Order This Patch Style
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

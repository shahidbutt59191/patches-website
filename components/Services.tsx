'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Star, Award, Check } from 'lucide-react';

interface ServicesProps {
  onOpenQuote?: (styleId?: string) => void;
}

export interface PatchServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  rating: string;
  ordersCount: string;
  category: string[];
  startingPrice: string;
  desc: string;
  image: string;
  badgeLabel?: string;
}

export const SERVICES_LIST: PatchServiceItem[] = [
  {
    id: 'embroidered',
    title: 'Custom Embroidered Patches',
    subtitle: 'Classic 100% Thread Coverage',
    tag: 'Top Rated',
    rating: '4.9',
    ordersCount: '2,420+',
    category: ['all', 'tactical', 'apparel'],
    startingPrice: '$0.85',
    desc: 'Dense Madeira polyester thread woven into heavy duck twill base. Durable merrowed overlock borders.',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Pro Factory Choice',
  },
  {
    id: 'pvc',
    title: '3D Molded PVC Rubber Patches',
    subtitle: '100% Waterproof & Rugged',
    tag: 'Combat Grade',
    rating: '5.0',
    ordersCount: '1,890+',
    category: ['all', 'tactical', 'lifestyle'],
    startingPrice: '$1.25',
    desc: 'Multi-tiered flexible rubber PVC with sculpted 3D relief depth and recessed sewing channel. Mud & water proof.',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Mil-Spec Standard',
  },
  {
    id: 'leather',
    title: 'Laser Debossed Leather Patches',
    subtitle: 'Rustic Caramel & Roast Leather',
    tag: 'Luxury Finish',
    rating: '4.9',
    ordersCount: '1,450+',
    category: ['all', 'lifestyle', 'apparel'],
    startingPrice: '$1.45',
    desc: 'Caramel & dark roast synthetic/genuine leather etched with precision fiber lasers. Ideal for trucker snapbacks.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Hat Maker Preferred',
  },
  {
    id: 'woven',
    title: 'High-Density Micro Woven Patches',
    subtitle: 'Razor Sharp 0.5mm Typography',
    tag: 'Ultra Precision',
    rating: '4.8',
    ordersCount: '980+',
    category: ['all', 'apparel', 'lifestyle'],
    startingPrice: '$0.75',
    desc: 'Thin micro-threads loomed from scratch for razor-sharp typography, gradients, and fine details down to 0.5mm.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Fine Micro-Weave',
  },
  {
    id: 'chenille',
    title: 'Vintage Varsity Chenille Patches',
    subtitle: 'Plush Loop Varsity Letterman',
    tag: 'Varsity Style',
    rating: '4.9',
    ordersCount: '840+',
    category: ['all', 'apparel'],
    startingPrice: '$1.65',
    desc: 'Thick plush towel-loop stitching on double-stiffened felt backing with chainstitch borders. Timeless collegiate look.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Collegiate Letterman',
  },
  {
    id: 'iron-on',
    title: 'Heat-Seal Thermal Iron-On Patches',
    subtitle: 'Permanent 30-Second Press',
    tag: 'Quick Apply',
    rating: '4.9',
    ordersCount: '1,650+',
    category: ['all', 'apparel', 'lifestyle'],
    startingPrice: '$0.95',
    desc: 'Pre-coated with industrial heat-seal adhesive. Bonds permanently to denim, canvas, hoodies, and jackets.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Thermal Bond Glue',
  },
  {
    id: 'velcro',
    title: 'Tactical Mil-Spec Velcro Patches',
    subtitle: 'Dual-Perimeter Lock-Stitched',
    tag: 'Combat Grade',
    rating: '5.0',
    ordersCount: '2,100+',
    category: ['all', 'tactical'],
    startingPrice: '$1.15',
    desc: 'Mil-spec hook & loop fasteners pre-attached with double lock-stitching. Built for plate carriers and uniforms.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Hook & Loop Included',
  },
  {
    id: 'sublimated',
    title: 'Photo Sublimated Printed Patches',
    subtitle: '1200 DPI Photographic Colors',
    tag: 'Full Gradient',
    rating: '4.8',
    ordersCount: '720+',
    category: ['all', 'lifestyle', 'apparel'],
    startingPrice: '$0.80',
    desc: 'Full photographic dye-sublimation on high-density poly-canvas twill framed with merrowed edges. Infinite gradients.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    badgeLabel: '1200 DPI HD',
  },
];

export default function Services({ onOpenQuote }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { id: 'all', label: 'All Patch Services' },
    { id: 'tactical', label: 'Tactical & Uniforms' },
    { id: 'apparel', label: 'Apparel & Headwear' },
    { id: 'lifestyle', label: 'Lifestyle & Brands' },
  ];

  const filteredServices = SERVICES_LIST.filter(
    (item) => activeCategory === 'all' || item.category.includes(activeCategory)
  );

  const checkScrollability = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filters (Fiverr Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#109655] border border-emerald-200 text-xs font-bold mb-2.5">
              <Award className="w-3.5 h-3.5" />
              <span>Commercial Factory Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#222325] tracking-tight">
              Popular Custom Patch Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#62646a] max-w-xl">
              Browse verified commercial patch techniques crafted directly on Japanese Tajima computerized looms.
            </p>
          </div>

          {/* Category Tabs & Carousel Arrows */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-1.5 bg-[#f7f7f7] p-1.5 rounded-xl border border-[#e4e5e7] overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-white text-[#222325] shadow-xs font-black'
                      : 'text-[#62646a] hover:text-[#222325]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Carousel Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full bg-white border border-[#e4e5e7] text-slate-700 hover:border-[#1dbf73] hover:text-[#1dbf73] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full bg-white border border-[#e4e5e7] text-slate-700 hover:border-[#1dbf73] hover:text-[#1dbf73] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fiverr-Style Gig Cards Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth py-3 px-1 -mx-4 sm:mx-0 snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenQuote?.(service.id)}
              className="w-[82vw] max-w-[290px] sm:w-[310px] shrink-0 snap-start bg-white rounded-2xl border border-[#e4e5e7] p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[#1dbf73] transition-all duration-300 group cursor-pointer relative"
            >
              <div>
                {/* Image Frame with Badge */}
                <div className="w-full h-44 rounded-xl overflow-hidden relative mb-3 bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {service.tag}
                  </div>
                  {service.badgeLabel && (
                    <div className="absolute bottom-2.5 left-2.5 bg-[#1dbf73] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {service.badgeLabel}
                    </div>
                  )}
                </div>

                {/* Seller & Rating Bar */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#74767e] text-[11px] truncate max-w-[170px]">
                    {service.subtitle}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-[#222325]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating}</span>
                    <span className="text-slate-400 text-[10px]">({service.ordersCount})</span>
                  </div>
                </div>

                {/* Gig Title */}
                <h3 className="text-sm font-bold text-[#222325] group-hover:text-[#1dbf73] transition-colors line-clamp-1 mb-1.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#62646a] line-clamp-2 leading-relaxed mb-3">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Price & CTA */}
              <div className="pt-3 border-t border-[#e4e5e7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    From
                  </span>
                  <span className="text-base font-black text-[#222325]">
                    {service.startingPrice} <span className="text-[11px] font-normal text-slate-500">/ pc</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQuote?.(service.id);
                  }}
                  className="btn-fiverr px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Select</span>
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

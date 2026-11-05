'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';

interface ServicesProps {
  onOpenQuote?: (styleId?: string) => void;
}

export interface PatchServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  category: string[];
  stitchMetric: string;
  desc: string;
  image: string;
  badgeLabel?: string;
}

export const SERVICES_LIST: PatchServiceItem[] = [
  {
    id: 'embroidered',
    title: 'Embroidered Patches',
    subtitle: 'Classic & Durable',
    tag: 'Most Popular',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-200',
    category: ['all', 'tactical', 'apparel'],
    stitchMetric: '22,000+ Stitches',
    desc: 'Dense Madeira polyester thread construction woven into heavy duck twill base. Rolled merrowed overlock borders.',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
    badgeLabel: '100% Tajima Thread',
  },
  {
    id: 'iron-on',
    title: 'Iron-On Patches',
    subtitle: 'Easy to Apply',
    tag: 'Fast Heat Seal',
    tagColor: 'bg-blue-50 text-blue-600 border-blue-200',
    category: ['all', 'apparel', 'lifestyle'],
    stitchMetric: '30-Sec Press',
    desc: 'Pre-coated with industrial heat-seal backing. Bonds permanently to denim, canvas, cotton, jackets, and hats.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Heat-Activated Poly',
  },
  {
    id: 'velcro',
    title: 'Velcro Patches',
    subtitle: 'Strong & Reusable',
    tag: 'Combat Grade',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    category: ['all', 'tactical', 'lifestyle'],
    stitchMetric: '5,000+ Peels',
    desc: 'Mil-spec hook & loop fasteners pre-attached with double perimeter lock-stitching. Built for tactical uniforms & vests.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Mil-Spec Hook & Loop',
  },
  {
    id: 'woven',
    title: 'Woven Patches',
    subtitle: 'Smooth & Detailed',
    tag: 'Micro Precision',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-200',
    category: ['all', 'apparel', 'lifestyle'],
    stitchMetric: '50-Denier Thread',
    desc: 'Thin micro-threads loomed from scratch for razor-sharp typography, gradients, and intricate line artwork down to 0.5mm.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Damask Micro-Weave',
  },
  {
    id: 'leather',
    title: 'Leather Patches',
    subtitle: 'Stylish & Elegant',
    tag: 'Luxury Debossed',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    category: ['all', 'lifestyle', 'apparel', 'tactical'],
    stitchMetric: 'Laser Vaporized',
    desc: 'Rich caramel and dark roast synthetic leather debossed with precision fiber lasers. The premier choice for trucker caps.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Caramel Debossed',
  },
  {
    id: 'pvc',
    title: '3D Molded PVC Patches',
    subtitle: 'Weatherproof & Rugged',
    tag: '100% Waterproof',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
    category: ['all', 'tactical', 'lifestyle'],
    stitchMetric: '3D Sculpted Depth',
    desc: 'Multi-tiered flexible rubber PVC with sculpted 3D relief depth and recessed sewing channel. Impervious to mud and water.',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80',
    badgeLabel: '3D Flexible Rubber',
  },
  {
    id: 'chenille',
    title: 'Vintage Chenille Patches',
    subtitle: 'Textured & Collegiate',
    tag: 'Varsity Letterman',
    tagColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    category: ['all', 'apparel', 'lifestyle'],
    stitchMetric: 'Plush Moss Loop',
    desc: 'Thick plush moss towel loop stitching on double stiff wool felt with metallic chainstitch border. The letterman jacket icon.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
    badgeLabel: 'Plush Towel Loop',
  },
  {
    id: 'sublimated',
    title: 'Sublimated Printed Patches',
    subtitle: 'Infinite Color Gradients',
    tag: 'Photo Realism',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    category: ['all', 'apparel', 'lifestyle'],
    stitchMetric: '1200 DPI Fidelity',
    desc: 'Full photographic dye-sublimation on high-density poly-satin framed with merrowed embroidery. Handles intricate art & photos.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    badgeLabel: '1200 DPI Photo Silk',
  },
];

export default function Services({ onOpenQuote }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category.includes(activeCategory));

  // Check scroll boundary to update button states
  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScrollBounds();
      el.addEventListener('scroll', checkScrollBounds);
      return () => el.removeEventListener('scroll', checkScrollBounds);
    }
  }, [filteredServices]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-16 sm:py-22 bg-slate-50/70 border-t border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row: Title & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Industrial Tajima Multi-Head Embroidery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Patch Services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Choose from a variety of custom patch styles. Side-scroll to explore each high-density material specification.
            </p>
          </div>

          {/* Navigation Controls: Filter Tabs + Side-Scroll Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Pills */}
            <div className="inline-flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-full border border-slate-200/90 shadow-2xs">
              {[
                { id: 'all', label: `All Styles (${SERVICES_LIST.length})` },
                { id: 'tactical', label: 'Tactical' },
                { id: 'apparel', label: 'Apparel' },
                { id: 'lifestyle', label: 'Lifestyle' },
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-orange-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Left / Right Carousel Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-xs transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-xs transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Side-Scrolling Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="w-[285px] sm:w-[325px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200/90 p-5 flex flex-col shadow-xs hover:shadow-xl hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Badges Bar */}
              <div className="w-full flex justify-between items-center mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${service.tagColor}`}>
                  {service.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  {service.stitchMetric}
                </span>
              </div>

              {/* Realistic Patch Image Frame */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative mb-4 bg-slate-900 border border-slate-100/80 shadow-inner group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag */}
                {service.badgeLabel && (
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>{service.badgeLabel}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 mb-2 font-medium">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-5">
                {service.desc}
              </p>

              {/* Action Button: Get a Quote */}
              <button
                type="button"
                onClick={() => onOpenQuote && onOpenQuote(service.id)}
                className="mt-auto w-full py-2.5 px-4 rounded-xl border border-orange-500 text-orange-600 font-bold text-xs hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-md cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1 text-[11px] text-slate-400 mt-4 font-medium">
          <span>← Swipe horizontally to see all patch styles →</span>
        </div>

      </div>
    </section>
  );
}

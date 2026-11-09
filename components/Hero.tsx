'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  Shield,
  Zap,
  Search,
  Star,
  Award,
  Truck,
  Clock,
  Layers,
} from 'lucide-react';
import { HeroPatchItem, DEFAULT_HERO_PATCHES } from '@/lib/settings';

interface HeroProps {
  onOpenQuote?: (styleId?: string) => void;
  onOpenVideo?: () => void;
  badge?: string;
  headline?: string;
  subheadline?: string;
  patches?: HeroPatchItem[];
}

export default function Hero({
  onOpenQuote,
  onOpenVideo,
  badge = 'Pro Factory Verified • Free Worldwide Tracked Delivery',
  headline,
  subheadline = 'Work directly with expert Tajima digitizing artists & computerized looms. Get a free 6-hour digital proof, low 10-piece minimums, and free tracked delivery.',
  patches,
}: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = [
    { label: 'Embroidered', id: 'embroidered' },
    { label: '3D PVC Rubber', id: 'pvc' },
    { label: 'Debossed Leather', id: 'leather' },
    { label: 'Tactical Velcro', id: 'velcro' },
    { label: 'Micro Woven', id: 'woven' },
    { label: 'Varsity Chenille', id: 'chenille' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenQuote) {
      onOpenQuote(searchQuery ? 'embroidered' : undefined);
    }
  };

  const handleTagClick = (styleId: string) => {
    if (onOpenQuote) {
      onOpenQuote(styleId);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#e4e5e7]">
      
      {/* Background Subtle Gradient & Dot Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Fiverr-Style Value Headline & Search (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* 1. Pro Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-1.5 text-xs font-bold text-[#109655] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1dbf73] animate-ping" />
              <span className="font-sans">{badge}</span>
            </div>

            {/* 2. Main Heading (Fiverr style punchy, bold) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#222325] tracking-tight leading-[1.1]">
              Find the perfect <br />
              <span className="text-[#1dbf73] underline decoration-[#bbf7d0] decoration-wavy decoration-2">
                custom patches
              </span>{' '}
              for your brand.
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-[#62646a] font-normal leading-relaxed max-w-xl">
              {subheadline}
            </p>

            {/* 4. Fiverr-Style Interactive Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl flex items-center bg-white rounded-xl border-2 border-[#e4e5e7] hover:border-[#222325] focus-within:border-[#1dbf73] shadow-md transition-all p-1.5"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try 'Tactical Velcro Patches' or 'Debossed Leather'..."
                className="w-full px-3 py-2 text-sm text-[#222325] placeholder-slate-400 focus:outline-none font-medium bg-transparent"
              />
              <button
                type="submit"
                className="btn-fiverr px-6 py-3 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* 5. Popular Tags (Just like Fiverr) */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="font-bold text-[#74767e]">Popular:</span>
              {popularTags.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTagClick(t.id)}
                  className="px-3 py-1 rounded-full border border-[#e4e5e7] hover:border-[#1dbf73] hover:text-[#1dbf73] text-[#404145] font-semibold transition-all bg-white hover:bg-emerald-50/50 cursor-pointer"
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 6. Four Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-semibold text-[#404145] border-t border-[#e4e5e7]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1dbf73] shrink-0" />
                <span>6-Hour Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1dbf73] shrink-0" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1dbf73] shrink-0" />
                <span>Min. 10 Pcs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1dbf73] shrink-0" />
                <span>Zero Setup Fees</span>
              </div>
            </div>

          </div>

          {/* Right Column: Fiverr-Style Featured Pro Gig Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-[#e4e5e7] shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
              
              {/* Image Frame */}
              <div className="w-full h-64 sm:h-72 overflow-hidden relative bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1000&auto=format&fit=crop&q=80"
                  alt="Custom Embroidered Patches Craftsmanship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Pro Badge Overlay */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="bg-[#1dbf73] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Pro Factory Choice</span>
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 z-10 bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-white/20">
                  ⚡ 6-Hour Digital Stitch Proof
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-5 space-y-3.5">
                
                {/* Seller / Factory Profile */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#222325] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      B
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#222325] flex items-center gap-1">
                        <span>BDigitizing Looms Studio</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1dbf73]" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">Top Rated Factory Partner</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs font-bold text-[#222325]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                    <span className="text-slate-400 font-normal">(2,850+)</span>
                  </div>
                </div>

                {/* Gig Title */}
                <h3 className="text-base font-bold text-[#222325] group-hover:text-[#1dbf73] transition-colors leading-snug">
                  Custom Embroidered &amp; 3D PVC Patches with Free Tajima Stitch Setup
                </h3>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5 text-[11px] text-[#62646a]">
                  <span className="bg-[#f7f7f7] px-2 py-0.5 rounded font-medium">100% Madeira Thread</span>
                  <span className="bg-[#f7f7f7] px-2 py-0.5 rounded font-medium">Merrowed Overlock</span>
                  <span className="bg-[#f7f7f7] px-2 py-0.5 rounded font-medium">Tactical Velcro / Iron-On</span>
                </div>

                {/* Card Footer: Starting Price & CTA */}
                <div className="pt-3 border-t border-[#e4e5e7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Starting At
                    </span>
                    <span className="text-lg font-black text-[#222325] font-sans">
                      $0.85 <span className="text-xs font-normal text-slate-500">/ patch</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenQuote?.('embroidered')}
                    className="btn-fiverr px-5 py-2 rounded-lg text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 7. Fiverr-Style Client Trust Logo Ribbon */}
        <div className="mt-14 pt-8 border-t border-[#e4e5e7] flex flex-wrap items-center justify-between gap-6 text-xs text-[#74767e]">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Trusted by 5,000+ teams &amp; brands:
          </span>
          <div className="flex items-center flex-wrap gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all font-mono font-bold text-slate-700 text-sm">
            <span>HARLEY CLUBS</span>
            <span>POLICE SWAT</span>
            <span>TACTICAL AIRSOFT</span>
            <span>VARSITY ATHLETICS</span>
            <span>STREETWEAR MERCH</span>
          </div>
        </div>

      </div>
    </section>
  );
}

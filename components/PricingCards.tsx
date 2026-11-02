'use client';

import React, { useState } from 'react';
import {
  Tag,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Flame,
  Truck,
} from 'lucide-react';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

interface PricingCardsProps {
  onOpenQuote?: (styleId?: string) => void;
  onOpenQuoteWithSpecs?: (specs: {
    style: string;
    width: number;
    height: number;
    backing: string;
    quantity: number;
  }) => void;
  settings?: SiteSettings;
}

export default function PricingCards({
  onOpenQuote,
  onOpenQuoteWithSpecs,
  settings = DEFAULT_SETTINGS,
}: PricingCardsProps) {
  const [activeTab, setActiveTab] = useState<'quantity' | 'materials'>('quantity');

  // Dynamic base rates from settings
  const pEmbroidered = settings.priceEmbroidered ?? 1.85;
  const pVelcro = settings.priceVelcro ?? 2.35;
  const pLeather = settings.priceLeather ?? 2.45;

  const handleOrderPatch = (quantity: number, style: string = 'embroidered', backing: string = 'iron_on') => {
    if (onOpenQuoteWithSpecs) {
      onOpenQuoteWithSpecs({
        style,
        width: 3.0,
        height: 3.0,
        backing,
        quantity,
      });
    } else if (onOpenQuote) {
      onOpenQuote(style);
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Patch Factory Rates • Zero Setup or Mold Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Custom Patch Pricing Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            All packages include 100% free 6-hour digital proof scans, free vector artwork optimization, unlimited revisions, and free tracked worldwide delivery.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 mt-6 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('quantity')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'quantity'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>By Batch Volume (50, 100, 250+ Pcs)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('materials')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>By Patch Material Style (Embroidered, Velcro, Leather)</span>
            </button>
          </div>
        </div>

        {/* 1. THREE CARDS BY BATCH VOLUME (EXACT REFERENCE DESIGN) */}
        {activeTab === 'quantity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* CARD 1: 50 PCS SAMPLE RUN */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative pt-8 group">
              {/* Top Blue Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#0a58ca] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  SAMPLE RUN
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ff] border border-blue-100 flex items-center justify-center shrink-0 text-[#0a58ca]">
                    <Tag className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#0a58ca] font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Sample Batch (50 Pcs)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Low-minimum run perfect for small brands, clubs, prototypes, and team event samples.
                </p>

                {/* Light Blue Price Highlight Box */}
                <div className="bg-[#edf2fe] border border-[#d6e2ff] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#0a58ca] text-4xl font-black font-sans tracking-tight">
                      $3.50
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $4.00
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE ($175.00 TOTAL RUN)
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Low Minimum Order – Starting from 50 Pieces',
                    'Free 6-Hour Digital Stitch Proof & Mockup',
                    'Custom Embroidered, Woven or Heat-Seal Patches',
                    'Choice of Iron-On or Traditional Plain Sew-On',
                    'Up to 7 Madeira Polyester Thread Colors',
                    '100% Quality Inspection Before Courier Dispatch',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Turnaround Footer */}
              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(50, 'embroidered', 'iron_on')}
                  className="w-full bg-[#1a56db] hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Order Sample Run (50 Pcs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–12 Business Days</span>
                </div>
              </div>
            </div>

            {/* CARD 2: 100 PCS POPULAR SQUADRON */}
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-7 flex flex-col justify-between shadow-xl shadow-orange-500/10 transition-all duration-300 relative pt-8 group lg:-translate-y-2">
              {/* Top Orange Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>MOST POPULAR (100 PCS)</span>
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-orange-600">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-orange-600 font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Popular Squadron (100 Pcs)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  The gold standard for tactical units, streetwear lines, and corporate team uniforms.
                </p>

                {/* Light Orange Price Highlight Box */}
                <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-orange-600 text-4xl font-black font-sans tracking-tight">
                      ${pEmbroidered.toFixed(2)}
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $2.50
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE (SAVE 26% • ${(pEmbroidered * 100).toFixed(2)} TOTAL)
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Up to 9 Madeira High-Tensile Polyneon Colors',
                    'Choice of Mil-Spec Velcro, Iron-On, or Sew-On',
                    'Merrowed Overlock or Precision Laser-Cut Edge',
                    '100% Free 6-Hour Digital Proof Scan',
                    'Unlimited Free Proof Revisions Included',
                    'Free Tracked Courier Shipping Worldwide',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Turnaround Footer */}
              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(100, 'embroidered', 'velcro')}
                  className="w-full btn-orange font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <span>Order 100 Patches Run</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–12 Business Days</span>
                </div>
              </div>
            </div>

            {/* CARD 3: 250+ PCS WHOLESALE REGIMENT */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative pt-8 group">
              {/* Top Green Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#00875a] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  BEST VALUE (250+ PCS)
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f6ee] border border-emerald-100 flex items-center justify-center shrink-0 text-[#00875a]">
                    <Award className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#00875a] font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Regiment &amp; Wholesale (250+ Pcs)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  High-volume production tier with specialty threads, metallic accents, and priority looms.
                </p>

                {/* Light Green Price Highlight Box */}
                <div className="bg-[#ebf8f2] border border-[#c1ebd6] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#00875a] text-4xl font-black font-sans tracking-tight">
                      $1.35
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $2.00
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE (SAVE 40% • $337.50 TOTAL)
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Up to 12 Madeira Thread Colors + Metallic Gold/Silver',
                    'All Backings Available (Velcro, 3M Adhesive, Iron-On)',
                    'Priority Tajima Automated Loom Scheduling',
                    'Free Pre-Production Sew-Out Sample Proof Photo',
                    '100% Free 6-Hour Digital Proof Scan',
                    '100% Free Tracked Express Courier Worldwide',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Turnaround Footer */}
              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(250, 'embroidered', 'velcro')}
                  className="w-full bg-[#00875a] hover:bg-emerald-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Order Wholesale (250+ Pcs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 12–14 Business Days</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. THREE CARDS BY PATCH MATERIAL STYLE (ALL PATCHES) */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* MATERIAL 1: EMBROIDERED PATCHES */}
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-7 flex flex-col justify-between shadow-lg relative pt-8 group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-orange-500 text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  100% TAJIMA EMBROIDERED
                </span>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 text-orange-600">
                    <Layers className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-orange-600 font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Embroidered Patches
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Dense Madeira polyester thread construction on heavy duck twill with classic 3D sheen.
                </p>

                <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-orange-600 text-4xl font-black font-sans tracking-tight">
                      ${pEmbroidered.toFixed(2)}
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $2.50
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    STARTING AT / PIECE
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Classic 3D textured embroidered stitching',
                    'Heavy-duty non-woven twill fabric backing',
                    'Rolled merrowed overlock fray-proof border',
                    'Choice of Iron-On, Velcro, or Plain Sew-On',
                    'Withstands 100+ commercial wash cycles',
                    '100% Free 6-Hour Digital Proof Scan',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(100, 'embroidered', 'iron_on')}
                  className="w-full btn-orange font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Customize Embroidered Patches</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–12 Business Days</span>
                </div>
              </div>
            </div>

            {/* MATERIAL 2: TACTICAL VELCRO PATCHES */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative pt-8 group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#0a58ca] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  MIL-SPEC COMBAT GRADE
                </span>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ff] border border-blue-100 flex items-center justify-center shrink-0 text-[#0a58ca]">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#0a58ca] font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Tactical Velcro Patches
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Military-grade hook &amp; loop fasteners pre-attached with double lock-stitching for plate carriers.
                </p>

                <div className="bg-[#edf2fe] border border-[#d6e2ff] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#0a58ca] text-4xl font-black font-sans tracking-tight">
                      ${pVelcro.toFixed(2)}
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $2.95
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    STARTING AT / PIECE
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Pre-sewn military male hook fastener backing',
                    'Includes matching soft female loop swatch',
                    'Double perimeter lock-stitching for zero peel',
                    'Impervious to mud, rain, sand & combat gear wear',
                    'Tested for 5,000+ attachment peel cycles',
                    'Subdued tactical coyote & multi-cam thread match',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(100, 'velcro', 'velcro')}
                  className="w-full bg-[#1a56db] hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Customize Tactical Velcro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–12 Business Days</span>
                </div>
              </div>
            </div>

            {/* MATERIAL 3: LASER DEBOSSED LEATHERETTE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative pt-8 group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#00875a] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  RUSTIC LUXURY LEATHER
                </span>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f6ee] border border-emerald-100 flex items-center justify-center shrink-0 text-[#00875a]">
                    <Award className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#00875a] font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Debossed Leather Patches
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Rich caramel &amp; espresso leatherette etched with microscopic fiber laser precision for trucker caps.
                </p>

                <div className="bg-[#ebf8f2] border border-[#c1ebd6] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#00875a] text-4xl font-black font-sans tracking-tight">
                      ${pLeather.toFixed(2)}
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $3.20
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    STARTING AT / PIECE
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Rich caramel & dark scorched debossed relief',
                    'Ultra-strong 3M heavy pressure-sensitive adhesive',
                    'Perimeter stitch canal for cap sewing',
                    'Sweat-proof, waterproof & UV sun resistant',
                    'The benchmark for premium trucker snapbacks',
                    '100% Free Digital Layout Proof Scan',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleOrderPatch(100, 'leather', 'peel_stick')}
                  className="w-full bg-[#00875a] hover:bg-emerald-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Customize Leather Patches</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–14 Business Days</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Trust Guarantee Bar */}
        <div className="mt-14 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Best Price Guarantee
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Found a lower verified patch quote? We beat any legitimate factory price by 10%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Free 6-Hour Digital Proof Scan
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  High-definition digital embroidery scan sent in 6 hours with unlimited free revisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Free Worldwide Courier Delivery
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Fully tracked courier delivery straight to your doorstep worldwide with zero freight fees.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

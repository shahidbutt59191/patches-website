'use client';

import React, { useState } from 'react';
import {
  Layers,
  PenTool,
  Tag,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
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
  const [activeTab, setActiveTab] = useState<'core' | 'bulk'>('core');

  const handleOrder = (type: string, quantity: number = 100, price: number = 10.0) => {
    if (type === 'patches') {
      if (onOpenQuoteWithSpecs) {
        onOpenQuoteWithSpecs({
          style: 'embroidered',
          width: 3.0,
          height: 3.0,
          backing: 'iron_on',
          quantity: quantity,
        });
      } else if (onOpenQuote) {
        onOpenQuote('embroidered');
      }
    } else {
      if (onOpenQuote) {
        onOpenQuote(type);
      }
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0a58ca] text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Factory Direct Rates • 100% Guaranteed Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Transparent Pricing Plans
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Professional embroidery digitizing, precision vector conversion, and physical patch manufacturing with free digital proofing and rapid turnaround.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 mt-6 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('core')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Core Services (Digitizing, Vector &amp; Patches)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bulk')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bulk'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Volume Patch Tiers (100, 250, 500+ Pcs)</span>
            </button>
          </div>
        </div>

        {/* 1. CORE SERVICES EXACT 3-CARD LAYOUT (MATCHING USER'S SCREENSHOT) */}
        {activeTab === 'core' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* CARD 1: EMBROIDERY DIGITIZING */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative pt-8 group">
              {/* Top Blue Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#0a58ca] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  BASIC
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ff] border border-blue-100 flex items-center justify-center shrink-0 text-[#0a58ca]">
                    <Layers className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#0a58ca] font-mono font-black text-[11px] tracking-wider uppercase block">
                      EMBROIDERY DIGITIZING
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      BASIC
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Commercial stitch files for caps, polos, shirts &amp; jackets (.DST, .PES, .EMB)
                </p>

                {/* Light Blue Price Highlight Box */}
                <div className="bg-[#edf2fe] border border-[#d6e2ff] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#0a58ca] text-4xl font-black font-sans tracking-tight">
                      $10.00
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $15.00
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / DESIGN
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Up to 4" x 4" Dimensions',
                    'DST, PES, EMB & PDF File Formats',
                    '100% Manual Hand-Mapped Pathing (No Auto-Trace)',
                    'Cap Curved Profile Optimization',
                    'Optimized Stitch Pathing for Smooth Production',
                    'Production PDF Color Sequence Sheet Included',
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
                  onClick={() => handleOrder('digitizing', 1, 10.0)}
                  className="w-full bg-[#1a56db] hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Order Left Chest Logo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 4–12 Hours</span>
                </div>
              </div>
            </div>

            {/* CARD 2: VECTOR ART CONVERSION */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative pt-8 group">
              {/* Top Blue Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#0a58ca] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  BASIC
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ff] border border-blue-100 flex items-center justify-center shrink-0 text-[#0a58ca]">
                    <PenTool className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#0a58ca] font-mono font-black text-[11px] tracking-wider uppercase block">
                      VECTOR ART CONVERSION
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      BASIC
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Simple logos, text, symbols, and basic shapes.
                </p>

                {/* Light Blue Price Highlight Box */}
                <div className="bg-[#edf2fe] border border-[#d6e2ff] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#0a58ca] text-4xl font-black font-sans tracking-tight">
                      $10.00
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $15.00
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / DESIGN
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Professional Vector Redraw',
                    'Clean & Smooth Lines',
                    'Fully Scalable Without Quality Loss',
                    'AI, EPS, SVG & PDF Formats',
                    '100% Manual Hand Trace Tracing',
                    'Free Basic Revisions',
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
                  onClick={() => handleOrder('vector', 1, 10.0)}
                  className="w-full bg-[#1a56db] hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Order Simple Redraw</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 6–12 Hours</span>
                </div>
              </div>
            </div>

            {/* CARD 3: CUSTOM MANUFACTURED PATCHES */}
            <div className="bg-white border-2 border-[#00875a]/70 rounded-3xl p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative pt-8 group">
              {/* Top Green Pill Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#00875a] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  SAMPLE RUN
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f6ee] border border-emerald-100 flex items-center justify-center shrink-0 text-[#00875a]">
                    <Tag className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[#00875a] font-mono font-black text-[11px] tracking-wider uppercase block">
                      CUSTOM MANUFACTURED PATCHES
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Sample Batch (50+ Pcs)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Low-minimum run perfect for small brands, clubs, prototypes, and event samples.
                </p>

                {/* Light Green Price Highlight Box */}
                <div className="bg-[#ebf8f2] border border-[#c1ebd6] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#00875a] text-4xl font-black font-sans tracking-tight">
                      $3.50
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      $4.00
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {[
                    'Low Minimum Order – Starting from 50 Pieces',
                    'Free Digital Artwork & Mockup',
                    'Custom Embroidered, Woven or PVC Patches',
                    'Choice of Standard Backing Options',
                    'Quality Check Before Shipping',
                    '10–14 Business Days Production After Proof Approval',
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
                  onClick={() => handleOrder('patches', 50, 3.50)}
                  className="w-full bg-[#00875a] hover:bg-emerald-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Order Sample Run</span>
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

        {/* 2. VOLUME PATCH BATCH TIERS (100, 250, 500+ PCS) */}
        {activeTab === 'bulk' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* TIER 1: 100 PCS */}
            <div className="bg-white border-2 border-orange-500 rounded-3xl p-7 flex flex-col justify-between shadow-lg relative pt-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-orange-500 text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  POPULAR SQUADRON (100 PCS)
                </span>
              </div>

              <div>
                <span className="text-orange-600 font-mono font-black text-[11px] tracking-wider uppercase block">
                  BULK MANUFACTURED PATCHES
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">100 Pieces Batch</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  The standard run for military units, tactical teams, biker MCs, and brand merch.
                </p>

                <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-orange-600 text-4xl font-black font-sans">$1.85</span>
                    <span className="line-through text-slate-400 text-base font-bold">$2.50</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE ($185.00 TOTAL)
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Choice of Mil-Spec Velcro, Iron-On or Sew-On',
                    'Up to 9 Madeira Polyneon Thread Colors',
                    'Merrowed Overlock or Laser-Cut Die Edge',
                    '100% Free 6-Hour Digital Proof Scan',
                    'Unlimited Free Proof Revisions',
                    '100% Free Tracked Courier Shipping Worldwide',
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
                  onClick={() => handleOrder('patches', 100, 1.85)}
                  className="w-full btn-orange font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
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

            {/* TIER 2: 250 PCS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative pt-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-slate-900 text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  VOLUME TIER (250 PCS)
                </span>
              </div>

              <div>
                <span className="text-slate-700 font-mono font-black text-[11px] tracking-wider uppercase block">
                  REGIMENT APPAREL BATCH
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">250 Pieces Batch</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Larger volume with specialty metallic thread options and priority loom scheduling.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-slate-900 text-4xl font-black font-sans">$1.45</span>
                    <span className="line-through text-slate-400 text-base font-bold">$2.20</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE ($362.50 TOTAL)
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Up to 12 Madeira Thread Colors',
                    'Metallic Gold & Silver Thread Option',
                    'All Backings Available (Velcro, 3M, Iron-On)',
                    'Priority Tajima Automated Loom Scheduling',
                    '100% Free 6-Hour Digital Proof Scan',
                    '100% Free Tracked Courier Shipping Worldwide',
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
                  onClick={() => handleOrder('patches', 250, 1.45)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Order 250 Patches Run</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Express Delivery: 10–14 Business Days</span>
                </div>
              </div>
            </div>

            {/* TIER 3: 500+ PCS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all relative pt-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#00875a] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm">
                  MASTER WHOLESALE (500+ PCS)
                </span>
              </div>

              <div>
                <span className="text-[#00875a] font-mono font-black text-[11px] tracking-wider uppercase block">
                  FACTORY DIRECT WHOLESALE
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">500+ Pieces Batch</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Direct contract pricing for government departments, large outfitters, and brands.
                </p>

                <div className="bg-[#ebf8f2] border border-[#c1ebd6] rounded-2xl p-5 text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-[#00875a] text-4xl font-black font-sans">$0.99</span>
                    <span className="line-through text-slate-400 text-base font-bold">$1.85</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE ($495.00 TOTAL)
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    'Unlimited Thread Colors & Colorways',
                    'Free Pre-Production Sew-Out Sample Proof',
                    'Any Backing & Custom Die-Cut Border Shape',
                    'Dedicated Senior Tajima Master Digitizer',
                    'VIP Direct WhatsApp Production Coordinator',
                    '100% Free Express Courier Shipping Worldwide',
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
                  onClick={() => handleOrder('patches', 500, 0.99)}
                  className="w-full bg-[#00875a] hover:bg-emerald-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Order 500+ Wholesale</span>
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

      </div>
    </section>
  );
}

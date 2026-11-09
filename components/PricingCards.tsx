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
  Zap,
  Image as ImageIcon,
  Feather,
} from 'lucide-react';
import {
  SiteSettings,
  DEFAULT_SETTINGS,
  PatchPricingCardItem,
  DEFAULT_PATCH_PRICING_CARDS,
} from '@/lib/settings';

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
  const [filterCategory, setFilterCategory] = useState<'all' | 'popular' | 'tactical' | 'apparel'>('all');

  const cardsList: PatchPricingCardItem[] =
    settings?.patchPricingCards && settings.patchPricingCards.length > 0
      ? settings.patchPricingCards
      : DEFAULT_PATCH_PRICING_CARDS;

  const activeCards = cardsList.filter((c) => c.active !== false);

  const filteredCards =
    filterCategory === 'all'
      ? activeCards
      : activeCards.filter((p) => p.category && p.category.includes(filterCategory));

  const handleOrderPatch = (styleId: string, quantity: number = 100, backing: string = 'iron_on') => {
    if (onOpenQuoteWithSpecs) {
      onOpenQuoteWithSpecs({
        style: styleId,
        width: 3.0,
        height: 3.0,
        backing: styleId === 'velcro' ? 'velcro_hook_loop' : backing,
        quantity,
      });
    } else if (onOpenQuote) {
      onOpenQuote(styleId);
    }
  };

  const getIconForCard = (id: string) => {
    switch (id) {
      case 'embroidered':
        return <Layers className="w-5 h-5 stroke-[2.2]" />;
      case 'velcro':
        return <ShieldCheck className="w-5 h-5 stroke-[2.2]" />;
      case 'iron_on':
        return <Zap className="w-5 h-5 stroke-[2.2]" />;
      case 'woven':
        return <Tag className="w-5 h-5 stroke-[2.2]" />;
      case 'leather':
        return <Award className="w-5 h-5 stroke-[2.2]" />;
      case 'pvc':
        return <ShieldCheck className="w-5 h-5 stroke-[2.2]" />;
      case 'chenille':
        return <Feather className="w-5 h-5 stroke-[2.2]" />;
      case 'sublimated':
        return <ImageIcon className="w-5 h-5 stroke-[2.2]" />;
      default:
        return <Tag className="w-5 h-5 stroke-[2.2]" />;
    }
  };

  const getColorStyles = (color: string = 'blue') => {
    return {
      pill: 'bg-[#1dbf73] text-white',
      iconBox: 'bg-emerald-50 border-emerald-200 text-[#109655]',
      priceBox: 'bg-[#f7f7f7] border-[#e4e5e7]',
      priceText: 'text-[#222325]',
      btn: 'btn-fiverr shadow-sm',
    };
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#109655] text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Patch Factory Rates • Every Custom Patch Style</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222325] tracking-tight">
            Transparent Pricing &amp; Package Rates
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#62646a] leading-relaxed">
            Select your preferred patch material below. Every order includes a free 6-hour digital proof scan, free vector artwork optimization, zero setup fees, and free tracked worldwide delivery.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Patch Types' },
              { id: 'popular', label: '⭐ Top Rated' },
              { id: 'tactical', label: 'Tactical & Combat' },
              { id: 'apparel', label: 'Lifestyle & Merch' },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-[#1dbf73] text-white shadow-sm'
                    : 'bg-white border border-[#e4e5e7] text-[#404145] hover:text-[#222325] hover:border-[#1dbf73]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 8 PRICING CARDS IN EXACT REFERENCE IMAGE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {filteredCards.map((patch) => {
            const styles = getColorStyles(patch.pillColor);
            return (
              <div
                key={patch.id}
                className={`bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative pt-8 group ${
                  patch.featured
                    ? 'border-2 border-orange-500 shadow-xl shadow-orange-500/10'
                    : 'border border-slate-200 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Top Pill Badge (Overlapping Border) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm flex items-center gap-1 ${styles.pill}`}
                  >
                    {patch.featured && <Flame className="w-3.5 h-3.5 fill-current" />}
                    <span>{patch.badgePill}</span>
                  </span>
                </div>

                <div>
                  {/* Header: Icon + Category + Title */}
                  <div className="flex items-start gap-3 mb-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${styles.iconBox}`}
                    >
                      {getIconForCard(patch.id)}
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono font-black text-[10px] tracking-wider uppercase block">
                        CUSTOM MANUFACTURED PATCHES
                      </span>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                        {patch.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 min-h-[36px]">
                    {patch.desc}
                  </p>

                  {/* Tinted Highlight Price Box */}
                  <div className={`rounded-2xl p-5 text-center mb-6 border ${styles.priceBox}`}>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className={`text-4xl font-black font-sans tracking-tight ${styles.priceText}`}>
                        ${Number(patch.price).toFixed(2)}
                      </span>
                      <span className="line-through text-slate-400 text-base font-bold">
                        ${Number(patch.strikePrice || patch.price * 1.35).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                      / PIECE (STARTING RATE)
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3 mb-7">
                    {(patch.features || []).map((feat, idx) => (
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
                    onClick={() => handleOrderPatch(patch.id, 100, patch.id === 'velcro' ? 'velcro_hook_loop' : 'iron_on')}
                    className={`w-full font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer ${styles.btn}`}
                  >
                    <span>{patch.buttonText || `Order ${patch.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{patch.turnaround || 'Express Delivery: 10–12 Business Days'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
                  Found a lower verified quote for custom patches? We beat any legitimate factory price by 10%.
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
                  High-definition digital embroidery stitch scan sent in 6 hours with unlimited free revisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Free Worldwide Courier Delivery
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Fully tracked courier delivery straight to your doorstep worldwide with zero customs or freight surcharges.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

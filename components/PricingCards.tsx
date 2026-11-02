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
  Sliders,
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
  const [filterCategory, setFilterCategory] = useState<'all' | 'popular' | 'tactical' | 'apparel'>('all');

  // Dynamic base rates from settings
  const pEmbroidered = settings.priceEmbroidered ?? 1.85;
  const pIronOn = settings.priceIronOn ?? 1.95;
  const pVelcro = settings.priceVelcro ?? 2.35;
  const pWoven = settings.priceWoven ?? 1.65;
  const pLeather = settings.priceLeather ?? 2.45;
  const pPvc = settings.pricePvc ?? 2.55;

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

  // ALL 8 TYPES OF CUSTOM PATCHES THAT EXIST
  const allPatchTypes = [
    {
      id: 'embroidered',
      name: '100% Tajima Embroidered',
      category: ['all', 'popular', 'apparel'],
      badgePill: 'MOST POPULAR',
      pillClass: 'bg-orange-500 text-white',
      icon: <Layers className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-orange-50 border-orange-200 text-orange-600',
      desc: 'Classic thread sheen with high-density Madeira polyester threads woven into heavy twill backing.',
      price: pEmbroidered.toFixed(2),
      strikePrice: '2.50',
      priceBoxClass: 'bg-orange-50/70 border-orange-200/80',
      priceTextClass: 'text-orange-600',
      features: [
        'Classic 3D textured embroidery thread sheen',
        '100% Madeira Polyneon high-tensile threads',
        'Rolled merrowed overlock fray-proof border',
        'Withstands 100+ commercial wash cycles',
        'Free 6-Hour digital embroidery stitch proof',
        'Free vector setup & worldwide tracked delivery',
      ],
      buttonText: 'Order Embroidered Patches',
      buttonClass: 'btn-orange shadow-lg shadow-orange-500/20',
      turnaround: 'Express Delivery: 10–12 Business Days',
      featured: true,
    },
    {
      id: 'velcro',
      name: 'Tactical Mil-Spec Velcro',
      category: ['all', 'popular', 'tactical'],
      badgePill: 'COMBAT GRADE',
      pillClass: 'bg-[#0a58ca] text-white',
      icon: <ShieldCheck className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-[#eef3ff] border-blue-100 text-[#0a58ca]',
      desc: 'Military-specification hook fastener backing pre-sewn with double reinforced lock-stitching for combat vests.',
      price: pVelcro.toFixed(2),
      strikePrice: '2.95',
      priceBoxClass: 'bg-[#edf2fe] border-[#d6e2ff]',
      priceTextClass: 'text-[#0a58ca]',
      features: [
        'Pre-attached heavy-duty male hook backing',
        'Matching soft female loop fabric swatch included',
        'Double perimeter lock-stitching for zero peel',
        'Rated for 5,000+ tactical attachment peels',
        '100% weatherproof & mud/water impervious',
        'Free 6-Hour digital proof scan included',
      ],
      buttonText: 'Order Tactical Velcro',
      buttonClass: 'bg-[#1a56db] hover:bg-blue-700 text-white',
      turnaround: 'Express Delivery: 10–12 Business Days',
      featured: false,
    },
    {
      id: 'iron_on',
      name: 'Heat-Seal Thermal Iron-On',
      category: ['all', 'popular', 'apparel'],
      badgePill: 'EASIEST APPLICATION',
      pillClass: 'bg-[#00875a] text-white',
      icon: <Zap className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-[#e6f6ee] border-emerald-100 text-[#00875a]',
      desc: 'Commercial thermal adhesive coating. Fuses permanently to denim, cotton, jackets and polyester in 20 seconds.',
      price: pIronOn.toFixed(2),
      strikePrice: '2.60',
      priceBoxClass: 'bg-[#ebf8f2] border-[#c1ebd6]',
      priceTextClass: 'text-[#00875a]',
      features: [
        'Commercial-grade heat-activated glue backing',
        'Applies easily with household iron or heat press',
        'Permanently fuses at 320°F (160°C) with zero sewing',
        'Zero needle holes or garment puncture damage',
        'Flexible soft drape with permanent bond durability',
        'Free 6-Hour digital proof scan included',
      ],
      buttonText: 'Order Iron-On Patches',
      buttonClass: 'bg-[#00875a] hover:bg-emerald-800 text-white',
      turnaround: 'Express Delivery: 10–12 Business Days',
      featured: false,
    },
    {
      id: 'woven',
      name: 'Jacquard Micro-Woven',
      category: ['all', 'apparel'],
      badgePill: 'MICRO PRECISION',
      pillClass: 'bg-purple-700 text-white',
      icon: <Tag className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-purple-50 border-purple-100 text-purple-700',
      desc: 'Loomed from scratch using 50-denier micro-threads to resolve 0.5mm small text, thin outlines, and gradients.',
      price: pWoven.toFixed(2),
      strikePrice: '2.25',
      priceBoxClass: 'bg-purple-50/70 border-purple-200/80',
      priceTextClass: 'text-purple-700',
      features: [
        'Ultra-flat snag-free surface for streetwear merch',
        'Crystal-clear legibility down to 0.5mm micro text',
        'Precision laser hot-cut perimeter prevents fraying',
        'Lightweight & flexible on caps, beanies & sleeves',
        'Up to 12 vivid thread colors woven simultaneously',
        'Free 6-Hour digital woven layout proof scan',
      ],
      buttonText: 'Order Woven Patches',
      buttonClass: 'bg-purple-700 hover:bg-purple-800 text-white',
      turnaround: 'Express Delivery: 10–14 Business Days',
      featured: false,
    },
    {
      id: 'leather',
      name: 'Laser-Debossed Leather',
      category: ['all', 'apparel', 'tactical'],
      badgePill: 'RUSTIC LUXURY',
      pillClass: 'bg-amber-700 text-white',
      icon: <Award className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-amber-50 border-amber-100 text-amber-700',
      desc: 'Rich caramel and dark espresso synthetic leatherette debossed with microscopic precision fiber lasers.',
      price: pLeather.toFixed(2),
      strikePrice: '3.20',
      priceBoxClass: 'bg-amber-50/70 border-amber-200/80',
      priceTextClass: 'text-amber-700',
      features: [
        'Deep tone-on-tone scorch debossed branding',
        'Ultra-strong 3M heavy pressure-sensitive adhesive',
        'Perimeter recessed stitch canal for cap needle sewing',
        'Sweat-proof, waterproof & UV sun fade resistant',
        'The gold standard benchmark for trucker snapbacks',
        'Free digital laser layout artwork proofs',
      ],
      buttonText: 'Order Leather Patches',
      buttonClass: 'bg-amber-700 hover:bg-amber-800 text-white',
      turnaround: 'Express Delivery: 10–14 Business Days',
      featured: false,
    },
    {
      id: 'pvc',
      name: '3D Soft Molded PVC Rubber',
      category: ['all', 'tactical'],
      badgePill: '100% WATERPROOF',
      pillClass: 'bg-teal-700 text-white',
      icon: <ShieldCheck className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-teal-50 border-teal-100 text-teal-700',
      desc: 'Multi-tiered 3D liquid PVC casting with sculpted physical relief, recessed stitch canal, and waterproof rubber.',
      price: pPvc.toFixed(2),
      strikePrice: '3.40',
      priceBoxClass: 'bg-teal-50/70 border-teal-200/80',
      priceTextClass: 'text-teal-700',
      features: [
        'Multi-level 3D sculpted physical relief depth',
        '100% impervious to torrential rain, mud & salt water',
        'Glow-in-the-dark & fluorescent pigment options',
        'Embedded perimeter sewing channel for durability',
        'Mil-spec hook velcro or heat-seal film backing',
        'Free 3D mold digital proof rendering included',
      ],
      buttonText: 'Order 3D PVC Patches',
      buttonClass: 'bg-teal-700 hover:bg-teal-800 text-white',
      turnaround: 'Express Delivery: 12–14 Business Days',
      featured: false,
    },
    {
      id: 'chenille',
      name: 'Vintage Chenille (Letterman)',
      category: ['all', 'apparel'],
      badgePill: 'VINTAGE COLLEGIATE',
      pillClass: 'bg-yellow-600 text-white',
      icon: <Feather className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      desc: 'Traditional varsity collegiate letterman jacket patch with heavy plush towel loop yarn on double stiff felt.',
      price: '2.65',
      strikePrice: '3.50',
      priceBoxClass: 'bg-yellow-50/70 border-yellow-200/80',
      priceTextClass: 'text-yellow-700',
      features: [
        'High-pile plush loop yarn towel moss stitching',
        'Double-layer stiff wool blend felt foundation',
        'Gold & silver metallic chainstitch border accent',
        'Traditional varsity letterman jacket cut',
        'Choice of sew-on twill or heavy thermal film',
        'Free 6-Hour digital chenille layout proof scan',
      ],
      buttonText: 'Order Chenille Patches',
      buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      turnaround: 'Express Delivery: 12–14 Business Days',
      featured: false,
    },
    {
      id: 'sublimated',
      name: 'Sublimated Dye-Printed',
      category: ['all', 'apparel'],
      badgePill: 'PHOTO REALISM',
      pillClass: 'bg-indigo-700 text-white',
      icon: <ImageIcon className="w-5 h-5 stroke-[2.2]" />,
      iconBoxClass: 'bg-indigo-50 border-indigo-100 text-indigo-700',
      desc: 'Full-color photographic heat-sublimation on poly-satin with embroidered borders for complex photo art.',
      price: '1.75',
      strikePrice: '2.40',
      priceBoxClass: 'bg-indigo-50/70 border-indigo-200/80',
      priceTextClass: 'text-indigo-700',
      features: [
        'Photographic 1200 DPI edge-to-edge color fidelity',
        'Infinite color gradients, fine paintings & faces',
        'Merrowed overlock embroidered frame boundary',
        'Will not crack, peel, fade or scratch over time',
        'Choice of Iron-On, Velcro, or Plain Sew-On',
        'Free 6-Hour digital print & stitch proof scan',
      ],
      buttonText: 'Order Sublimated Patches',
      buttonClass: 'bg-indigo-700 hover:bg-indigo-800 text-white',
      turnaround: 'Express Delivery: 10–12 Business Days',
      featured: false,
    },
  ];

  const filteredCards = filterCategory === 'all'
    ? allPatchTypes
    : allPatchTypes.filter((p) => p.category.includes(filterCategory));

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Patch Factory Rates • Every Custom Patch Style</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Complete Custom Patch Pricing Cards
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Select your preferred patch material below. Every order includes a free 6-hour digital proof scan, free vector artwork optimization, zero setup fees, and free tracked worldwide delivery.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All 8 Patch Types' },
              { id: 'popular', label: '⭐ Most Popular' },
              { id: 'tactical', label: 'Tactical & Combat' },
              { id: 'apparel', label: 'Lifestyle & Headwear' },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 8 PRICING CARDS IN EXACT REFERENCE IMAGE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {filteredCards.map((patch) => (
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
                  className={`text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-sm flex items-center gap-1 ${patch.pillClass}`}
                >
                  {patch.featured && <Flame className="w-3.5 h-3.5 fill-current" />}
                  <span>{patch.badgePill}</span>
                </span>
              </div>

              <div>
                {/* Header: Icon + Category + Title */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${patch.iconBoxClass}`}
                  >
                    {patch.icon}
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
                <div className={`rounded-2xl p-5 text-center mb-6 border ${patch.priceBoxClass}`}>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className={`text-4xl font-black font-sans tracking-tight ${patch.priceTextClass}`}>
                      ${patch.price}
                    </span>
                    <span className="line-through text-slate-400 text-base font-bold">
                      ${patch.strikePrice}
                    </span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-mono mt-1">
                    / PIECE (STARTING RATE)
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-7">
                  {patch.features.map((feat, idx) => (
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
                  className={`w-full font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all cursor-pointer ${patch.buttonClass}`}
                >
                  <span>{patch.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium mt-3.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patch.turnaround}</span>
                </div>
              </div>
            </div>
          ))}
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

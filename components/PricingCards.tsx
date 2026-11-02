'use client';

import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Truck,
  Tag,
  Zap,
  Star,
  Award,
  Flame,
  Layers,
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
  const [pricingMode, setPricingMode] = useState<'tiers' | 'styles'>('tiers');

  // Dynamic base rates from settings
  const pEmbroidered = settings.priceEmbroidered ?? 1.85;
  const pIronOn = settings.priceIronOn ?? 1.95;
  const pVelcro = settings.priceVelcro ?? 2.35;
  const pWoven = settings.priceWoven ?? 1.65;
  const pLeather = settings.priceLeather ?? 2.45;
  const pPvc = settings.pricePvc ?? 2.55;

  const handleSelectTier = (qty: number, style: string = 'embroidered', backing: string = 'iron_on') => {
    if (onOpenQuoteWithSpecs) {
      onOpenQuoteWithSpecs({
        style,
        width: 3.0,
        height: 3.0,
        backing,
        quantity: qty,
      });
    } else if (onOpenQuote) {
      onOpenQuote(style);
    }
  };

  // Quantity Tier Packages
  const tierPackages = [
    {
      id: 'tier-50',
      name: 'Starter & Squad Trial',
      quantity: 50,
      badge: 'Testing & Prototypes',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      unitPrice: (pEmbroidered * 1.05).toFixed(2),
      totalPrice: ((pEmbroidered * 1.05) * 50).toFixed(2),
      savingsText: 'Low MOQ Entry',
      turnaround: '10-12 Days',
      popular: false,
      desc: 'Ideal for club tests, pilot squad batches, and artwork sample runs with zero setup charge.',
      features: [
        'Up to 7 Madeira Polyneon thread colors',
        'Heat-Seal Iron-On or Plain Sew-On',
        'Classic Merrowed Overlock border',
        '100% Free 6-Hour digital proof scan',
        'Free vector artwork conversion',
        'Free tracked courier shipping worldwide',
      ],
      buttonText: 'Order 50 Patches',
      buttonClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
    {
      id: 'tier-100',
      name: 'Popular Squadron & Brand',
      quantity: 100,
      badge: '⭐ MOST POPULAR • SAVE 20%',
      badgeClass: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-xs',
      unitPrice: (pEmbroidered * 0.85).toFixed(2),
      totalPrice: ((pEmbroidered * 0.85) * 100).toFixed(2),
      savingsText: 'Save 20% vs. Starter',
      turnaround: '10-12 Days',
      popular: true,
      desc: 'The gold benchmark for tactical units, streetwear brands, and corporate uniforms worldwide.',
      features: [
        'Up to 9 Madeira Polyneon thread colors',
        'Choice of Mil-Spec Velcro or Heat-Seal',
        'Merrowed or Precision Laser-Cut edge',
        '100% Free 6-Hour digital proof scan',
        'Unlimited free digital proof revisions',
        'High-density 100% Tajima thread coverage',
        'Free tracked courier shipping worldwide',
      ],
      buttonText: 'Order 100 Patches (Popular)',
      buttonClass: 'btn-orange shadow-lg shadow-orange-500/25',
    },
    {
      id: 'tier-250',
      name: 'Regiment & Apparel Batch',
      quantity: 250,
      badge: 'BEST VALUE • SAVE 32%',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      unitPrice: (pEmbroidered * 0.72).toFixed(2),
      totalPrice: ((pEmbroidered * 0.72) * 250).toFixed(2),
      savingsText: 'Save 32% Wholesale',
      turnaround: '10-14 Days',
      popular: false,
      desc: 'High-volume production tier with multi-thread specialty options and priority loom scheduling.',
      features: [
        'Up to 12 Madeira thread colors',
        'Metallic Gold & Silver thread option',
        'All backings available (Velcro, 3M, Iron-on)',
        'Priority Tajima automated loom scheduling',
        '100% Free 6-Hour digital proof scan',
        'Pre-production digital scan approval',
        'Free tracked courier shipping worldwide',
      ],
      buttonText: 'Order 250 Patches',
      buttonClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
    {
      id: 'tier-500',
      name: 'Master Wholesale Production',
      quantity: 500,
      badge: 'FACTORY DIRECT • 45% OFF',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      unitPrice: (pEmbroidered * 0.58).toFixed(2),
      totalPrice: ((pEmbroidered * 0.58) * 500).toFixed(2),
      savingsText: 'Maximum Factory Discount',
      turnaround: '12-14 Days',
      popular: false,
      desc: 'Complete wholesale factory contract pricing for government departments, large outfitters, and global brands.',
      features: [
        'Unlimited thread colors & colorways',
        'Free pre-production sew-out physical sample',
        'Any backing & custom die-cut border style',
        'Dedicated senior Tajima master digitizer',
        'VIP direct WhatsApp production desk',
        'Custom bulk polybagging & carton packing',
        'Free tracked express courier worldwide',
      ],
      buttonText: 'Order 500+ Wholesale',
      buttonClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
  ];

  // Material Style Cards
  const styleCards = [
    {
      id: 'embroidered',
      name: 'Embroidered Patches',
      startingPrice: pEmbroidered.toFixed(2),
      tag: 'Classic & Durable',
      badge: 'Most Popular',
      minOrder: '10 pcs',
      turnaround: '10-14 Days',
      desc: 'Heavy twill backing with 100% high-sheen Madeira polyester thread and rolled merrowed overlock borders.',
      features: [
        'Classic 3D textured thread sheen',
        'Heavy cotton/poly duck twill foundation',
        'Merrowed or laser-cut sealed border',
        'Withstands 100+ commercial wash cycles',
      ],
    },
    {
      id: 'velcro',
      name: 'Tactical Velcro Patches',
      startingPrice: pVelcro.toFixed(2),
      tag: 'Combat & Morale',
      badge: 'Mil-Spec Hook & Loop',
      minOrder: '10 pcs',
      turnaround: '10-14 Days',
      desc: 'Military-specification hook fastener backing pre-sewn with double reinforced lock-stitching around the entire perimeter.',
      features: [
        'Pre-attached male hook backing',
        'Includes matching soft female loop swatch',
        'Weatherproof & mud/water impervious',
        'Rated for 5,000+ attachment peels',
      ],
    },
    {
      id: 'iron-on',
      name: 'Heat-Seal Iron-On Patches',
      startingPrice: pIronOn.toFixed(2),
      tag: 'Zero Sewing Required',
      badge: 'Fast Thermal Film',
      minOrder: '10 pcs',
      turnaround: '10-14 Days',
      desc: 'Industrial thermal adhesive coating. Bonds permanently to denim, canvas, cotton, and polyester in 20 seconds.',
      features: [
        'Pre-coated commercial heat-seal glue',
        'Applies with household iron or heat press',
        'Permanently fuses at 320°F (160°C)',
        'Zero needle holes or sewing required',
      ],
    },
    {
      id: 'woven',
      name: 'Jacquard Micro-Woven',
      startingPrice: pWoven.toFixed(2),
      tag: 'Micro Detail & Text',
      badge: '50-Denier Damask',
      minOrder: '25 pcs',
      turnaround: '10-14 Days',
      desc: 'Loomed from scratch using 50-denier micro-threads to resolve 0.5mm lettering, crisp vector lines, and gradients.',
      features: [
        'Ultra-flat smooth snag-free surface',
        'Crisp readability down to 0.5mm text',
        'Laser hot-cut non-fraying perimeter',
        'Lightweight for sportswear & beanies',
      ],
    },
    {
      id: 'leather',
      name: 'Laser-Debossed Leather',
      startingPrice: pLeather.toFixed(2),
      tag: 'Rustic Luxury',
      badge: 'Fiber Laser Etched',
      minOrder: '25 pcs',
      turnaround: '10-14 Days',
      desc: 'Rich caramel and dark espresso synthetic leatherette debossed with microscopic precision fiber lasers.',
      features: [
        'Deep tone-on-tone scorch debossing',
        'Heavy-duty 3M adhesive or stitch channel',
        'Waterproof, sweat-proof & weather-resistant',
        'The gold standard for trucker snapbacks',
      ],
    },
    {
      id: 'pvc',
      name: '3D Soft Molded PVC',
      startingPrice: pPvc.toFixed(2),
      tag: 'Tactical & Outdoor',
      badge: '3D Sculpted Rubber',
      minOrder: '25 pcs',
      turnaround: '12-14 Days',
      desc: 'Multi-tiered 3D liquid PVC casting with recessed perimeter stitch canal and vibrant waterproof colors.',
      features: [
        'Multi-level 3D sculpted relief depth',
        '100% waterproof & mud/grit resistant',
        'Glow-in-the-dark pigment options',
        'Impervious to extreme weather & UV sun',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-xs font-bold mb-3 shadow-xs">
            <Tag className="w-3.5 h-3.5" />
            <span>Direct Factory Pricing • No Middleman Markups</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Transparent Pricing Built for Every Run
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Free 6-hour digital proof scan, free vector artwork optimization, zero digitizing setup fees, and 100% free tracked worldwide delivery on all custom orders.
          </p>

          {/* Toggle Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 mt-8 shadow-xs">
            <button
              type="button"
              onClick={() => setPricingMode('tiers')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                pricingMode === 'tiers'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>By Batch Volume (50, 100, 250, 500 pcs)</span>
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('styles')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                pricingMode === 'styles'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>By Patch Material Style</span>
            </button>
          </div>
        </div>

        {/* 1. BATCH VOLUME TIER PRICING CARDS */}
        {pricingMode === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tierPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-white border-2 border-orange-500 shadow-xl shadow-orange-500/10 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Pill */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>Most Popular Run</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Badge & Title */}
                  <div className="mb-4">
                    <span
                      className={`inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border mb-2 ${pkg.badgeClass}`}
                    >
                      {pkg.badge}
                    </span>
                    <h3 className="text-xl font-black text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pkg.desc}</p>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight">
                        ${pkg.unitPrice}
                      </span>
                      <span className="text-xs text-slate-500 font-bold font-mono">/ patch</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-xs font-mono">
                      <span className="text-slate-600 font-semibold">{pkg.quantity} Patches Total:</span>
                      <span className="font-black text-emerald-600">${pkg.totalPrice}</span>
                    </div>
                  </div>

                  {/* Turnaround Pill */}
                  <div className="flex items-center gap-4 text-xs text-slate-600 mb-6 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span>{pkg.turnaround}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-orange-500" />
                      <span>Free Shipping</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-mono uppercase font-bold text-slate-400">
                      Included with this package:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                        <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => handleSelectTier(pkg.quantity, 'embroidered', 'velcro')}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${pkg.buttonClass}`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 2. MATERIAL STYLE PRICING CARDS */}
        {pricingMode === 'styles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styleCards.map((sc) => (
              <div
                key={sc.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                        {sc.badge}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-2">{sc.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{sc.tag}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono block">From</span>
                      <span className="text-2xl font-black text-slate-950 font-mono">
                        ${sc.startingPrice}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">/ each</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {sc.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-mono mb-5">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Min Order</span>
                      <span className="font-bold text-slate-800">{sc.minOrder}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Turnaround</span>
                      <span className="font-bold text-slate-800">{sc.turnaround}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {sc.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote(sc.id)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-orange-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Customize {sc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Trust & Guarantee Bar */}
        <div className="mt-12 sm:mt-16 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Best Price Guarantee
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Found a lower verified quote? We beat any legitimate factory price by 10%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Free 6-Hour Digital Proof
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  High-definition digital stitch scan sent within 6 hours. Unlimited free revisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Zero Setup or Mold Fees
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Zero vector artwork setup, digitizing fees, or machine setup charges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900">
                  Free Worldwide Shipping
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Fully tracked courier delivery straight to your doorstep worldwide at $0 cost.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

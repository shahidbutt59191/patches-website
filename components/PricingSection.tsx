'use client';

import React from 'react';

const PRICING_TIERS = [
  {
    name: 'Small Squad & Samples',
    tagline: 'Ideal for tactical teams, squad runs, and test batches.',
    qty: '10 – 49 pcs',
    unitPrice: '$2.15',
    popular: false,
    badge: 'Low Minimum MOQ',
    features: [
      'Free Tajima digitizing ($45 value)',
      '6-hour digital proof simulation',
      'Up to 9 Madeira thread colors',
      'Merrowed or heat-cut edge included',
      'Velcro Hook & Loop or Iron-On ready',
      'Standard 5-7 business day dispatch',
    ],
    buttonText: 'Order Squad Batch',
  },
  {
    name: 'Wholesale Standard',
    tagline: 'The sweet spot for clothing brands, clubs, and agencies.',
    qty: '50 – 249 pcs',
    unitPrice: '$1.65',
    popular: true,
    badge: 'Most Popular for Brands',
    features: [
      '26% Wholesale Volume Discount',
      'Free 6-hour digital stitch proof',
      'Free Tajima digitizing & vector cleanup',
      'All 5 backing types available (Velcro, Iron-On, Peel&Stick)',
      'Custom laser-cut die-cut contours',
      'Dedicated multi-head loom queue',
      'Free domestic shipping included',
    ],
    buttonText: 'Order Wholesale Tier',
  },
  {
    name: 'Commercial Production',
    tagline: 'Engineered for high-volume corporate apparel & retailers.',
    qty: '250 – 999 pcs',
    unitPrice: '$1.25',
    popular: false,
    badge: '44% Bulk Discount',
    features: [
      '44% Bulk Production Discount',
      'Free Physical Sew-Out Sample Photo',
      'Custom Pantone PMS thread & PVC dye match',
      'Priority machine loom scheduling',
      'Individual poly bagging included',
      'Express DHL / FedEx delivery',
    ],
    buttonText: 'Order Commercial Batch',
  },
  {
    name: 'Factory Direct Contract',
    tagline: 'Government agencies, large corporations, and global distributors.',
    qty: '1,000+ pcs',
    unitPrice: '$0.95',
    popular: false,
    badge: '52% Max Discount',
    features: [
      '52% Maximum Factory Direct Rate',
      'Free 3D Steel Mold casting (PVC)',
      'Dedicated factory production line supervisor',
      'Pre-production physical sample mailed to you',
      'Net-30 B2B invoice terms available',
      'Guaranteed on-time SLA commitment',
    ],
    buttonText: 'Get Contract Quote',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#5448ea]/8 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching EmbroidPro */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-[#5448ea]/10 text-indigo-300 border-[#5448ea]/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Clear & Transparent
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Simple, upfront pricing
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            Transparent starting rates with volume savings, free digitizing, and active promotional discounts automatically applied.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#10152c] to-[#0a0d1e] border-2 border-[#5448ea] shadow-[0_20px_44px_-18px_rgba(84,72,234,0.45)] -translate-y-1.5'
                  : 'bg-[#0c1020]/90 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#5448ea] to-[#7c3aed] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md font-mono tracking-wider">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {!tier.popular && (
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-xl font-black text-white mt-2">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[36px] leading-relaxed">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
                    TIER: {tier.qty}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="text-4xl font-black text-white">{tier.unitPrice}</span>
                    <span className="text-xs text-slate-400">/patch</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <span className="text-[#5448ea] font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action CTA */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <a
                  href="#order"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                    tier.popular
                      ? 'btn-primary-gradient text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {tier.buttonText} →
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

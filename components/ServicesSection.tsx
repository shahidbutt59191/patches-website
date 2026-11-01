'use client';

import React from 'react';
import { ArrowRight, Sparkles, Check, SlidersHorizontal } from 'lucide-react';

const SERVICES = [
  {
    id: 'embroidered',
    title: 'Custom Embroidered Patches',
    subtitle: 'Classic 100% Tajima High Density',
    badge: 'Industry Gold Standard',
    desc: 'Dense Madeira polyester thread construction loomed into heavy duck twill base. Features traditional rolled merrowed overlock borders and up to 12 vivid thread colors.',
    startingPrice: 'From $1.65 / ea',
    leadTime: '5-7 Business Days',
    moq: '10 pcs',
    icon: '🧵',
    gradient: 'from-indigo-600 to-blue-700',
    accentBorder: 'hover:border-indigo-500/50',
    features: ['100% full stitch density', 'Merrowed or laser-cut edge', 'Twill fabric base', 'Zero puckering guarantee'],
  },
  {
    id: 'pvc',
    title: '3D Soft Molded PVC Rubber',
    subtitle: 'Tactical Morale & Waterproof Grade',
    badge: 'Mil-Spec Rugged',
    desc: 'Precision molded soft liquid PVC with multi-level 2D/3D sculpted reliefs. Completely impervious to torrential mud, salt water, heavy rain, and extreme combat abrasion.',
    startingPrice: 'From $2.15 / ea',
    leadTime: '7-9 Business Days',
    moq: '25 pcs',
    icon: '🛡️',
    gradient: 'from-emerald-600 to-teal-700',
    accentBorder: 'hover:border-emerald-500/50',
    features: ['100% waterproof & UV proof', 'Recessed perimeter stitch canal', 'Velcro Hook & Loop pre-attached', 'Glow-in-the-dark option'],
  },
  {
    id: 'chenille',
    title: 'Vintage Varsity Wool Chenille',
    subtitle: 'Authentic Collegiate High-Pile',
    badge: 'Retro Trend',
    desc: 'Plush, fluffy looped yarn crafted with vintage moss-stitch embroidery on double-layer stiff felt. The timeless collegiate look for varsity letterman jackets and streetwear.',
    startingPrice: 'From $2.45 / ea',
    leadTime: '6-8 Business Days',
    moq: '10 pcs',
    icon: '🏆',
    gradient: 'from-amber-500 to-yellow-600',
    accentBorder: 'hover:border-amber-500/50',
    features: ['Thick velvety 3D volume', 'Double-layer wool felt border', 'Heat-seal iron-on backing', 'Gold & metallic thread accents'],
  },
  {
    id: 'leatherette',
    title: 'Laser-Debossed Leatherette',
    subtitle: 'Rustic Luxury & Fiber Laser Etched',
    badge: 'Lifestyle Merch',
    desc: 'Rich caramel, dark roast, and charcoal synthetic leather etched with high-precision fiber lasers. Ideal for trucker snapbacks, beanies, and workwear jackets.',
    startingPrice: 'From $1.95 / ea',
    leadTime: '4-6 Business Days',
    moq: '10 pcs',
    icon: '🏷️',
    gradient: 'from-amber-700 to-orange-900',
    accentBorder: 'hover:border-orange-500/50',
    features: ['High-contrast dark etching', 'Clean perimeter stitch line', '3M heavy pressure adhesive', 'Ages with rich patina'],
  },
  {
    id: 'woven',
    title: 'Jacquard Micro-Thread Woven',
    subtitle: 'Razor-Sharp Micro Typography',
    badge: 'Ultra-Fine Detail',
    desc: 'Unlike embroidery that stitches on top of twill, woven patches weave thin 50-denier threads together from scratch, producing razor-sharp detail down to 1.5mm.',
    startingPrice: 'From $1.45 / ea',
    leadTime: '6-8 Business Days',
    moq: '50 pcs',
    icon: '🎮',
    gradient: 'from-cyan-600 to-blue-600',
    accentBorder: 'hover:border-cyan-500/50',
    features: ['Micro-text down to 1.5mm', 'Zero snagging flat surface', 'Lightweight & flexible drape', 'Clean laser-cut borders'],
  },
  {
    id: 'printed',
    title: 'Dye-Sublimated / Photographic',
    subtitle: 'Full Color Continuous Gradients',
    badge: 'Photo Real',
    desc: 'Full-color continuous tones infused directly into polyester twill fabric. Exact photographic reproduction of album art, gradients, and detailed portraits.',
    startingPrice: 'From $1.55 / ea',
    leadTime: '5-7 Business Days',
    moq: '25 pcs',
    icon: '🎨',
    gradient: 'from-rose-600 to-pink-600',
    accentBorder: 'hover:border-rose-500/50',
    features: ['Unlimited gradients & colors', 'Photographic reproduction', 'Does not crack or fade', 'Embroidered outer border'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/8 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FACTORY PRODUCTION LINEUP</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white mt-2">
              6 Industrial Patch Styles Loomed In-House
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Manufactured with machine-calibrated precision, mil-spec weatherproofing, and backed by our 100% pre-production physical photo guarantee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#customizer-studio"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open 3D Studio</span>
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-xl btn-primary-gradient transition-all shrink-0"
            >
              <span>Instant Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className={`group relative flex flex-col justify-between p-7 rounded-3xl bg-[#0c1020] border border-white/10 ${s.accentBorder} hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              {/* Glowing Top Border Accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-105 transition-transform`}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">{s.subtitle}</div>
                
                <p className="text-xs sm:text-sm text-slate-400 mt-3.5 leading-relaxed">
                  {s.desc}
                </p>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300 font-mono">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price, Turnaround & CTA Bar */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase">STARTING RATE</span>
                    <span className="font-bold text-white text-sm">{s.startingPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase">LEAD TIME</span>
                    <span className="font-bold text-indigo-400">{s.leadTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#customizer-studio"
                    className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center text-xs font-semibold text-slate-200 transition-colors"
                  >
                    3D Studio
                  </a>
                  <a
                    href="#order"
                    className="flex-1 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-center text-xs font-bold text-white transition-colors"
                  >
                    Quote This
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

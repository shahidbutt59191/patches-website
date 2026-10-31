'use client';

import React from 'react';

const SERVICES = [
  {
    title: 'Custom Embroidered Patches',
    subtitle: 'Classic 100% Tajima High Density',
    badge: 'Most Popular',
    desc: 'Dense Madeira polyester thread construction woven into heavy duck twill. Features traditional rolled merrowed overlock borders and up to 12 colors.',
    startingPrice: 'From $1.65 / ea',
    leadTime: '5-7 Business Days',
    icon: '🧵',
    gradient: 'from-blue-600 to-indigo-600',
    features: ['100% full stitch density', 'Merrowed or laser-cut edge', 'Twill fabric base', 'Zero puckering guarantee'],
  },
  {
    title: '3D Soft PVC Rubber Patches',
    subtitle: 'Tactical Morale & Waterproof',
    badge: 'Mil-Spec Rugged',
    desc: 'Precision molded soft liquid PVC with multi-level 2D/3D sculpting. Impervious to mud, rain, salt water, and extreme combat abrasion.',
    startingPrice: 'From $2.15 / ea',
    leadTime: '7-9 Business Days',
    icon: '🛡️',
    gradient: 'from-indigo-600 to-purple-600',
    features: ['100% waterproof & UV proof', 'Recessed perimeter stitch canal', 'Velcro Hook & Loop pre-attached', 'Glow-in-the-dark option'],
  },
  {
    title: 'Vintage Varsity Chenille Patches',
    subtitle: 'Authentic Collegiate High-Pile',
    badge: 'Retro Trend',
    desc: 'Plush, fluffy looped yarn crafted with vintage moss-stitch embroidery on double-layer stiff felt. The timeless look for varsity letterman jackets and streetwear.',
    startingPrice: 'From $2.45 / ea',
    leadTime: '6-8 Business Days',
    icon: '🏆',
    gradient: 'from-amber-500 to-yellow-600',
    features: ['Thick velvety 3D volume', 'Double-layer wool felt border', 'Heat-seal iron-on backing', 'Gold & metallic thread accents'],
  },
  {
    title: 'Laser-Cut Leatherette Patches',
    subtitle: 'Rustic Luxury & Fiber Laser Etched',
    badge: 'Lifestyle Merch',
    desc: 'Rich caramel, dark roast, and charcoal synthetic leather etched with high-precision fiber lasers. Ideal for trucker snapbacks, beanies, and workwear jackets.',
    startingPrice: 'From $1.95 / ea',
    leadTime: '4-6 Business Days',
    icon: '🏷️',
    gradient: 'from-amber-700 to-amber-900',
    features: ['High-contrast dark etching', 'Clean perimeter stitch line', '3M heavy pressure adhesive', 'Ages with rich patina'],
  },
  {
    title: 'Jacquard Micro-Thread Woven',
    subtitle: 'Razor-Sharp Micro Typography',
    badge: 'Ultra-Fine Detail',
    desc: 'Unlike embroidery that stitches on top of twill, woven patches weave thin 50-denier threads together from scratch, producing razor-sharp detail down to 1.5mm.',
    startingPrice: 'From $1.45 / ea',
    leadTime: '6-8 Business Days',
    icon: '🎮',
    gradient: 'from-cyan-600 to-blue-600',
    features: ['Micro-text down to 1.5mm', 'Zero snagging flat surface', 'Lightweight & flexible drape', 'Clean laser-cut borders'],
  },
  {
    title: 'Dye-Sublimated / Photographic',
    subtitle: 'Full Color Continuous Gradients',
    badge: 'Photo Real',
    desc: 'Full-color continuous tones infused directly into polyester twill fabric. Exact photographic reproduction of album art, gradients, and detailed portraits.',
    startingPrice: 'From $1.55 / ea',
    leadTime: '5-7 Business Days',
    icon: '🎨',
    gradient: 'from-rose-600 to-pink-600',
    features: ['Unlimited gradients & colors', 'Photographic reproduction', 'Does not crack or fade', 'Embroidered outer border'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching EmbroidPro */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5448ea]">
              ✦ COMPLETE MATERIAL LINEUP
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white mt-2">
              Everything your shop needs to stitch
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Industrial-grade custom physical patches tailored for speed, precision, and extreme durability.
            </p>
          </div>

          <a
            href="#order"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-indigo-300 hover:gap-2.5 transition-all shrink-0"
          >
            <span>Start an order</span>
            <span>→</span>
          </a>
        </div>

        {/* 6 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-[#0c1020] border border-white/10 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(84,72,234,0.4)] transition-all duration-300 overflow-hidden"
            >
              {/* Glowing Top Border Accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl text-white shadow-md group-hover:scale-105 transition-transform`}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">{s.subtitle}</div>
                
                <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                  {s.desc}
                </p>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-300 font-mono">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <span className="text-indigo-400">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Turnaround Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">STARTING AT:</span>
                  <span className="font-bold text-white">{s.startingPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">LEAD TIME:</span>
                  <span className="font-bold text-indigo-400">{s.leadTime}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

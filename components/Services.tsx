'use client';

import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export const PATCH_SERVICES = [
  {
    id: 'embroidered',
    title: 'Custom Embroidered Patches',
    subtitle: 'Classic 100% Tajima High Density',
    badge: 'Most Popular',
    desc: 'Dense Madeira polyester thread loomed into heavy duck twill base. Features traditional rolled merrowed overlock borders and up to 12 vivid thread colors with zero fraying.',
    bestFor: 'Uniforms, Tactical Vests, Biker MC Cuts, Caps, Workwear',
    leadTime: '5-7 Business Days',
    moq: '10 pcs',
    startingPrice: 'From $1.65 / ea',
    icon: '🧵',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-600 text-white',
    features: ['100% full stitch density', 'Merrowed or laser-cut edge', 'Twill fabric base', 'Zero puckering guarantee'],
  },
  {
    id: 'pvc_rubber',
    title: '3D Soft Molded PVC Rubber',
    subtitle: 'Tactical Morale & Waterproof Grade',
    badge: 'Mil-Spec Rugged',
    desc: 'Precision molded soft liquid PVC with multi-level 2D/3D sculpted reliefs. Completely impervious to torrential mud, salt water, heavy rain, and extreme combat abrasion.',
    bestFor: 'MOLLE Plate Carriers, Duty Bags, Extreme Outdoor Gear',
    leadTime: '7-9 Business Days',
    moq: '25 pcs',
    startingPrice: 'From $2.15 / ea',
    icon: '🛡️',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-600 text-white',
    features: ['100% waterproof & UV proof', 'Recessed perimeter stitch canal', 'Velcro Hook & Loop pre-attached', 'Glow-in-the-dark option'],
  },
  {
    id: 'leatherette',
    title: 'Laser-Debossed Leatherette',
    subtitle: 'Rustic Luxury & Fiber Laser Etched',
    badge: 'Lifestyle Headwear',
    desc: 'Rich caramel, dark roast, and charcoal synthetic leather etched with high-precision fiber lasers. Ideal for trucker snapbacks, beanies, and workwear jackets.',
    bestFor: 'Snapback Trucker Caps, Winter Beanies, Aprons, Denim',
    leadTime: '4-6 Business Days',
    moq: '10 pcs',
    startingPrice: 'From $1.95 / ea',
    icon: '🏷️',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
    iconBg: 'bg-amber-600 text-white',
    features: ['High-contrast dark etching', 'Clean perimeter stitch line', '3M heavy pressure adhesive', 'Ages with rich patina'],
  },
  {
    id: 'chenille',
    title: 'Vintage Varsity Wool Chenille',
    subtitle: 'Authentic Collegiate High-Pile',
    badge: 'Retro Trend',
    desc: 'Plush, fluffy looped yarn crafted with vintage moss-stitch embroidery on double-layer stiff felt. The timeless collegiate look for varsity letterman jackets and streetwear.',
    bestFor: 'Letterman Jackets, Streetwear Hoodies, Team Emblems',
    leadTime: '6-8 Business Days',
    moq: '10 pcs',
    startingPrice: 'From $2.45 / ea',
    icon: '🏆',
    colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    iconBg: 'bg-yellow-600 text-white',
    features: ['Thick velvety 3D volume', 'Double-layer wool felt border', 'Heat-seal iron-on backing', 'Gold & metallic thread accents'],
  },
  {
    id: 'woven',
    title: 'Jacquard Micro-Thread Woven',
    subtitle: 'Razor-Sharp Micro Typography',
    badge: 'Ultra-Fine Detail',
    desc: 'Unlike embroidery that stitches on top of twill, woven patches weave thin 50-denier threads together from scratch, producing razor-sharp detail down to 1.5mm.',
    bestFor: 'Complex Logos, Micro-Lettering, Small Crests, Sleeves',
    leadTime: '6-8 Business Days',
    moq: '50 pcs',
    startingPrice: 'From $1.45 / ea',
    icon: '🎮',
    colorClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    iconBg: 'bg-cyan-600 text-white',
    features: ['Micro-text down to 1.5mm', 'Zero snagging flat surface', 'Lightweight & flexible drape', 'Clean laser-cut borders'],
  },
  {
    id: 'sublimated_printed',
    title: 'Dye-Sublimated Photographic',
    subtitle: 'Full Color Continuous Gradients',
    badge: 'Photo Real',
    desc: 'Full-color continuous tones infused directly into polyester twill fabric. Exact photographic reproduction of album art, gradients, and detailed portraits.',
    bestFor: 'Album Art, Complex Gradients, Portraits, Commemoratives',
    leadTime: '5-7 Business Days',
    moq: '25 pcs',
    startingPrice: 'From $1.55 / ea',
    icon: '🎨',
    colorClass: 'bg-rose-50 text-rose-800 border-rose-200',
    iconBg: 'bg-rose-600 text-white',
    features: ['Unlimited gradients & colors', 'Photographic reproduction', 'Does not crack or fade', 'Embroidered outer border'],
  },
];

interface ServicesProps {
  onSelectStyle?: (styleId: string) => void;
}

export default function Services({ onSelectStyle }: ServicesProps) {
  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE MANUFACTURING SERVICES</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 mt-2">
              Our Custom Patch Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Choose from 6 specialized patch materials loomed on computerized Tajima multi-heads and liquid PVC molding presses.
            </p>
          </div>

          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-blue text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-md"
          >
            <span>Quote All Styles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {PATCH_SERVICES.map((s) => (
            <div
              key={s.id}
              className="group relative flex flex-col justify-between p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.colorClass}`}>
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-mono text-slate-500 mt-1">{s.subtitle}</div>
                
                <p className="text-xs sm:text-sm text-slate-600 mt-3.5 leading-relaxed">
                  {s.desc}
                </p>

                {/* Best For Tag */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">BEST APPLICATION:</span>
                  <span className="text-slate-900 font-semibold">{s.bestFor}</span>
                </div>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-mono">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 font-bold">
                        ✓
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price, Turnaround & CTA Bar */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">STARTING RATE</span>
                    <span className="font-bold text-slate-900 text-sm">{s.startingPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">LEAD TIME</span>
                    <span className="font-bold text-blue-600">{s.leadTime}</span>
                  </div>
                </div>

                <a
                  href="#quote"
                  onClick={() => onSelectStyle?.(s.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-center text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Select &amp; Get Free Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

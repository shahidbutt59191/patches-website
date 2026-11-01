'use client';

import React, { useState } from 'react';
import { Layers, Shield, Check } from 'lucide-react';

const BACKINGS = [
  {
    id: 'velcro',
    name: 'Mil-Spec Hook & Loop (Velcro)',
    badge: 'Tactical Standard',
    icon: '🛡️',
    desc: 'Pre-sewn military male hook backing with matching female loop swatch included. Ideal for tactical vests, combat uniforms, plate carriers, and gear packs.',
    extraCost: '+$0.50 / ea',
    pros: ['Instantly interchangeable', 'Impervious to mud and water', 'Includes free female loop fabric'],
    bestFor: 'Military, Law Enforcement, Airsoft, Tactical Gear',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'iron-on',
    name: 'Heat-Seal Thermal Iron-On',
    badge: 'Easiest Application',
    icon: '🔥',
    desc: 'Industrial-grade heat-activated glue backing. Bonds permanently to cotton, denim, twill, and polyester blends using a standard home iron or heat press machine.',
    extraCost: '+$0.25 / ea',
    pros: ['Permanent strong bond', 'Applies in 20 seconds at 320°F', 'Zero sewing required'],
    bestFor: 'Denim Jackets, Hoodies, Caps, Cotton Uniforms',
    colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'sew-on',
    name: 'Reinforced Plain Sew-On',
    badge: 'Maximum Durability',
    icon: '🧵',
    desc: 'Heavy-duty non-woven twill backing ready for needle stitching. Offers the strongest permanent attachment that withstands extreme industrial laundering.',
    extraCost: 'FREE (Included)',
    pros: ['Withstands 100+ industrial wash cycles', 'Flexible & soft drape', 'Traditional biker cut standard'],
    bestFor: 'Biker Leathers, Canvas Bags, Martial Arts Gis',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'peel-stick',
    name: '3M Industrial Peel & Stick',
    badge: 'Temporary & Events',
    icon: '🏷️',
    desc: 'Heavy-tack pressure-sensitive 3M adhesive backing with pull-tab liner. Bonds firmly without heat or sewing. Can also be sewn on later for permanence.',
    extraCost: '+$0.35 / ea',
    pros: ['Instant peel and stick', 'Ideal for trade shows & races', 'Adheres to wood, glass, metal & fabric'],
    bestFor: 'Conferences, Trade Shows, Hat Promos, Temporary Badges',
    colorClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'magnetic',
    name: 'Dual-Magnet Pinless Backing',
    badge: 'Zero Fabric Damage',
    icon: '🧲',
    desc: 'Powerful neodymium magnet bar securely clamps through clothing without puncturing delicate garments, luxury blazers, or silk lapels.',
    extraCost: '+$0.95 / ea',
    pros: ['Leaves zero holes or pin punctures', 'Ultra-strong neodymium hold', 'Instant removal'],
    bestFor: 'Corporate Blazers, Suits, Formal Regalia, Security Badges',
    colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

export default function Backings() {
  const [activeTab, setActiveTab] = useState<'backings' | 'borders'>('backings');

  return (
    <section id="backings" className="py-20 sm:py-28 bg-white border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>INDUSTRIAL HARDWARE &amp; BORDERS</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 mt-2">
              Backings &amp; Border Guide
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              From Mil-Spec hook &amp; loop velcro to permanent thermal iron-on film, select the exact attachment engineered for your garments.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-xs">
            <button
              onClick={() => setActiveTab('backings')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'backings' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Backings (5 Types)
            </button>
            <button
              onClick={() => setActiveTab('borders')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'borders' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Border Finishes (2 Types)
            </button>
          </div>
        </div>

        {activeTab === 'backings' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BACKINGS.map((b) => (
              <div
                key={b.id}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-7 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{b.icon}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${b.colorClass}`}>
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-1">{b.name}</h3>
                  <div className="text-xs font-mono text-blue-600 font-bold mb-3">{b.extraCost}</div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {b.desc}
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-600 mb-4">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">BEST APPLICATION:</span>
                    <span className="text-slate-900 font-semibold">{b.bestFor}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 font-mono">
                    {b.pros.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <a
                    href="#quote"
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-center text-xs font-bold text-slate-800 block transition-colors cursor-pointer"
                  >
                    Select in Quote Form
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider block mb-2">
                  Finish Option 01
                </span>
                <h3 className="text-2xl font-black text-slate-900">Classic Merrowed Overlock Border</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  A traditional rolled thread edge (approx. 1/8&quot; thick) that wraps completely from the front of the patch to the rear backing. Seals the twill fabric base completely and prevents any edge unraveling.
                </p>

                <div className="my-6 p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Traditional heavy look &amp; tactile border feel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Best for symmetrical shapes (Circles, Shields, Squares, Rectangles)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>100% fraying prevention guarantee</span>
                  </div>
                </div>
              </div>

              <a
                href="#quote"
                className="w-full py-3 rounded-xl btn-primary-blue text-center text-xs font-bold text-white block cursor-pointer"
              >
                Choose Merrowed Border
              </a>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-amber-600 tracking-wider block mb-2">
                  Finish Option 02
                </span>
                <h3 className="text-2xl font-black text-slate-900">Precision Laser-Cut Sealed Border</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Trimmed flush using an industrial fiber laser cutter. The intense focal heat instantly melts and seals the synthetic fibers, creating a razor-sharp, fray-free perimeter essential for custom die-cut contours.
                </p>

                <div className="my-6 p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Supports any complex custom die-cut outline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Flush edge matches Velcro backing perfectly without bulk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Zero fabric unraveling with heat-cauterized edge</span>
                  </div>
                </div>
              </div>

              <a
                href="#quote"
                className="w-full py-3 rounded-xl btn-primary-blue text-center text-xs font-bold text-white block cursor-pointer"
              >
                Choose Laser-Cut Border
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

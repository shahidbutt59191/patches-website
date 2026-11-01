'use client';

import React, { useState } from 'react';
import { Layers, Shield, Check, ArrowRight } from 'lucide-react';

interface BackingsProps {
  onOpenQuote?: () => void;
}

const BACKINGS = [
  {
    id: 'velcro',
    name: 'Mil-Spec Hook & Loop (Velcro)',
    badge: 'Tactical Standard',
    icon: '🛡️',
    desc: 'Pre-sewn military male hook backing with matching female loop swatch included. Ideal for tactical vests, combat uniforms, plate carriers, and gear packs.',
    extraCost: '+$0.45 / ea',
    pros: ['Instantly interchangeable', 'Impervious to torrential mud and water', 'Includes free matching female loop swatch'],
    bestFor: 'Military, Law Enforcement, Airsoft, Tactical Duty Bags',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'iron-on',
    name: 'Heat-Seal Thermal Iron-On',
    badge: 'Easiest Application',
    icon: '🔥',
    desc: 'Industrial-grade heat-activated glue backing. Bonds permanently to cotton, denim, twill, and polyester blends using a standard home iron or heat press machine.',
    extraCost: '+$0.20 / ea',
    pros: ['Permanent strong bond', 'Applies in 20 seconds at 320°F', 'Zero sewing required'],
    bestFor: 'Denim Jackets, Hoodies, Caps, Cotton Uniforms',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
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
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
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
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

export default function Backings({ onOpenQuote }: BackingsProps) {
  const [selectedBacking, setSelectedBacking] = useState('velcro');

  return (
    <section id="backings" className="py-16 sm:py-22 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Attachment &amp; Fasteners Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Fasteners &amp; Edge Finishes Engineered for Purpose
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Choose the ideal attachment backing and border style for your custom application.
          </p>
        </div>

        {/* 4 Backings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BACKINGS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBacking(item.id)}
              className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border bg-white ${
                selectedBacking === item.id
                  ? 'border-orange-500 shadow-lg ring-2 ring-orange-500/10 -translate-y-1'
                  : 'border-slate-200/80 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {item.name}
                </h3>
                <div className="text-xs font-mono font-bold text-orange-600 mb-3">
                  {item.extraCost}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {item.desc}
                </p>

                <ul className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                  {item.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[10px] font-mono text-slate-400">
                Best For: <strong className="text-slate-700">{item.bestFor}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Border Edge Finishes Comparison Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            <span>Border Edge Finishes: Merrowed vs. Laser Cut</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Merrowed Overlock */}
            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">Classic Merrowed Overlock Border</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white">
                  1/8&quot; Heavy Thread Roll
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Continuous heavy thread wrapped tightly around the perimeter edge. Traditional look for military emblems, police shields, and biker cuts. 100% fray proof.
              </p>
              <div className="text-[11px] font-semibold text-orange-700">
                ✓ Best for regular geometric shapes (Circles, Shields, Rectangles, Ovals).
              </div>
            </div>

            {/* Laser-Cut Smooth */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">Precision Laser-Cut Border</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  Custom Die-Cut Edge
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                High-precision CO2 laser vaporizes the fabric along complex organic curves. Thermally sealed edge prevents any thread unraveling.
              </p>
              <div className="text-[11px] font-semibold text-slate-700">
                ✓ Best for complex silhouette outlines, skull contours, sharp typography.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Check, X, Sparkles, ArrowRight, Table } from 'lucide-react';

interface ComparisonTableProps {
  onOpenQuote?: (styleId?: string) => void;
}

const COMPARISON_DATA = [
  {
    id: 'embroidered',
    name: '100% Tajima Embroidered',
    badge: 'Most Popular',
    badgeColor: 'bg-orange-50 text-orange-600 border-orange-200',
    waterproof: 'Water Resistant (Quick Dry)',
    microDetail: 'Down to 2.5mm text',
    texture: 'Classic Thread 3D Sheen',
    washCycles: '100+ Commercial Washes',
    bestApplication: 'Uniforms, Caps, Tactical, Biker MC Cuts',
    startingPrice: '$1.85 / ea',
  },
  {
    id: 'iron-on',
    name: 'Heat-Seal Iron-On',
    badge: 'Easiest Apply',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
    waterproof: 'High Water Resistance',
    microDetail: 'Down to 2.5mm text',
    texture: 'Pre-Coated Thermal Adhesive',
    washCycles: '60+ Standard Washes',
    bestApplication: 'Denim Jackets, Hoodies, Cotton Blends',
    startingPrice: '$1.95 / ea',
  },
  {
    id: 'velcro',
    name: 'Tactical Mil-Spec Velcro',
    badge: 'Combat Grade',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    waterproof: '100% Weather & Mud Proof',
    microDetail: 'Heavy Lock-Stitched Perimeter',
    texture: 'Recessed Hook & Loop Fastener',
    washCycles: '5,000+ Peel Cycles',
    bestApplication: 'MOLLE Plate Carriers, Duty Vests, Combat Gear',
    startingPrice: '$2.35 / ea',
  },
  {
    id: 'woven',
    name: 'Jacquard Micro-Woven',
    badge: 'Ultra Fine',
    badgeColor: 'bg-purple-50 text-purple-600 border-purple-200',
    waterproof: 'Water Resistant (Quick Dry)',
    microDetail: 'Razor-Sharp (<1.5mm Text)',
    texture: 'Flat, Smooth Zero-Snag Weave',
    washCycles: '80+ Machine Washes',
    bestApplication: 'Detailed Crests, Micro Lettering, Sleeves',
    startingPrice: '$1.65 / ea',
  },
  {
    id: 'leather',
    name: 'Laser-Debossed Leather',
    badge: 'Rustic Luxury',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    waterproof: 'Weatherproof & Sweat Proof',
    microDetail: 'Microscopic Laser Etch (<1mm)',
    texture: 'Deep Tone-on-Tone Deboss',
    washCycles: '50+ Washes (Ages with Patina)',
    bestApplication: 'Trucker Snapbacks, Beanies, Workwear',
    startingPrice: '$2.45 / ea',
  },
  {
    id: 'pvc',
    name: '3D Soft Molded PVC',
    badge: 'Mil-Spec Rubber',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    waterproof: '100% Impervious to Water & Mud',
    microDetail: 'Multi-Level 3D Sculpted Relief',
    texture: 'Tactile Rubber Polymer',
    washCycles: '100+ Extreme Combat Washes',
    bestApplication: 'Military, Marine, Outdoor & Hunting Gear',
    startingPrice: '$2.55 / ea',
  },
];

export default function ComparisonTable({ onOpenQuote }: ComparisonTableProps) {
  return (
    <section id="comparison" className="py-16 sm:py-22 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
            <Table className="w-3.5 h-3.5" />
            <span>Side-by-Side Materials Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Compare Patch Styles &amp; Specifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Find the perfect material for your uniform, apparel line, or team gear.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px]">
                <th className="py-4 px-5 font-bold uppercase tracking-wider">Patch Material</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider">Detail Resolution</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider">Waterproof / Wash</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider">Tactile Texture</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider">Best Use Case</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider">Base Rate</th>
                <th className="py-4 px-5 text-right font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {COMPARISON_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-orange-50/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900 text-sm">{row.name}</div>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.badgeColor}`}>
                      {row.badge}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono">
                    {row.microDetail}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-800 font-semibold">{row.waterproof}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{row.washCycles}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {row.texture}
                  </td>
                  <td className="py-4 px-4 text-slate-600 max-w-[200px]">
                    {row.bestApplication}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-orange-600 text-sm">
                    {row.startingPrice}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => onOpenQuote && onOpenQuote(row.id)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

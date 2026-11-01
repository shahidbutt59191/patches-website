'use client';

import React from 'react';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  onSelectStyle?: (styleId: string) => void;
}

const COMPARISON_DATA = [
  {
    id: 'embroidered',
    name: '100% Embroidered',
    waterproof: 'Water Resistant (Quick Dry)',
    microDetail: 'Down to 3.0mm text',
    texture: 'Classic Thread 3D Sheen',
    washCycles: '50+ Commercial Washes',
    bestApplication: 'Uniforms, Hats, Biker MC Cuts',
    startingPrice: '$1.65 / ea',
  },
  {
    id: 'pvc_rubber',
    name: '3D Soft Molded PVC',
    waterproof: '100% Fully Waterproof',
    microDetail: 'Sculpted Mold Geometry',
    texture: 'Multi-Level 3D Sculpted',
    washCycles: '100+ Extreme Combat Washes',
    bestApplication: 'MOLLE Plate Carriers, Outdoor Gear',
    startingPrice: '$2.15 / ea',
  },
  {
    id: 'leatherette',
    name: 'Laser-Debossed Leather',
    waterproof: 'Weatherproof & Sweat Proof',
    microDetail: 'Microscopic Laser Etch (<1mm)',
    texture: 'Deep Tone-on-Tone Deboss',
    washCycles: '40+ Machine Washes',
    bestApplication: 'Trucker Snapbacks, Beanies, Aprons',
    startingPrice: '$1.95 / ea',
  },
  {
    id: 'chenille',
    name: 'Vintage Varsity Chenille',
    waterproof: 'Dry Clean / Gentle Wash',
    microDetail: 'Bold Emblems & Monograms',
    texture: 'High-Pile Fuzzy 3D Moss Stitch',
    washCycles: '30+ Gentle Washes',
    bestApplication: 'Letterman Jackets, Streetwear Hoodies',
    startingPrice: '$2.45 / ea',
  },
  {
    id: 'woven',
    name: 'Jacquard Micro-Woven',
    waterproof: 'Water Resistant (Quick Dry)',
    microDetail: 'Razor-Sharp (<1.5mm Text)',
    texture: 'Flat, Smooth Zero-Snag',
    washCycles: '60+ Commercial Washes',
    bestApplication: 'Detailed Crests, Tiny Lettering, Sleeves',
    startingPrice: '$1.45 / ea',
  },
  {
    id: 'sublimated_printed',
    name: 'Dye-Sublimated Photo',
    waterproof: 'Permanent Non-Fade Twill',
    microDetail: 'Infinite Photographic Resolution',
    texture: 'Flat Infused with Stitched Edge',
    washCycles: '50+ Standard Washes',
    bestApplication: 'Album Art, Photo Portraits, Gradients',
    startingPrice: '$1.55 / ea',
  },
];

export default function ComparisonTable({ onSelectStyle }: ComparisonTableProps) {
  return (
    <section id="comparison" className="py-20 sm:py-28 bg-white border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-blue-50 text-blue-700 border-blue-200 font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Decision Guide
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.12]">
            Compare Patch Materials Side-by-Side
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Unsure which patch style fits your project? Compare waterproof capability, detail resolution, and best garment applications in our engineering matrix.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-md">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Material Style</th>
                <th className="py-4 px-6 font-bold">Waterproof Rating</th>
                <th className="py-4 px-6 font-bold">Micro Detail Resolution</th>
                <th className="py-4 px-6 font-bold">3D Feel &amp; Texture</th>
                <th className="py-4 px-6 font-bold">Best Application</th>
                <th className="py-4 px-6 font-bold text-right">Starting Rate</th>
                <th className="py-4 px-6 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {COMPARISON_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    {row.waterproof}
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    {row.microDetail}
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    {row.texture}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {row.bestApplication}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-blue-600 text-right whitespace-nowrap">
                    {row.startingPrice}
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <a
                      href="#quote"
                      onClick={() => onSelectStyle?.(row.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <span>Quote</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
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

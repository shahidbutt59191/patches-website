'use client';

import React, { useState } from 'react';
import { Star, Shield, ArrowRight, MessageSquare, CheckCircle2, Sparkles, Layers } from 'lucide-react';

const SPECIMENS = [
  {
    id: 'embroidered',
    name: 'Custom Embroidered Patches',
    badge: 'Classic 100% Tajima High Density',
    desc: 'Dense Madeira polyester thread construction woven into heavy duck twill base. Features traditional rolled merrowed overlock borders and up to 12 vivid thread colors.',
    material: 'Madeira Polyneon 100% Polyester',
    stitches: '22,480 Stitches (100% Coverage)',
    backing: 'Mil-Spec Velcro or Heat-Seal Iron-On',
    border: '1/8" Traditional Merrowed Overlock',
    turnaround: '5-7 Business Days',
    price: 'From $1.65 / ea',
    icon: '🧵',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'pvc_rubber',
    name: '3D Soft Molded PVC Rubber',
    badge: 'Tactical Morale & Waterproof',
    desc: 'Precision molded soft liquid PVC with multi-level 2D/3D sculpted reliefs. Completely impervious to torrential mud, salt water, heavy rain, and extreme combat abrasion.',
    material: 'Molded Soft Liquid PVC Polymer',
    stitches: 'Sculpted Multi-Tier 3D Relief',
    backing: 'Pre-sewn Recessed Hook Velcro',
    border: 'Recessed Sewing Perimeter Canal',
    turnaround: '7-9 Business Days',
    price: 'From $2.15 / ea',
    icon: '🛡️',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'leatherette',
    name: 'Laser-Debossed Leatherette',
    badge: 'Rustic Lifestyle Headwear',
    desc: 'Rich caramel, dark roast, and charcoal synthetic leather etched with high-precision fiber lasers. The benchmark standard for trucker snapbacks and workwear beanies.',
    material: 'Heavyweight Synthetic Full-Grain',
    stitches: 'CO2 Laser Vaporized Deboss',
    backing: '3M Industrial Thermal Adhesive',
    border: 'Laser-Cut Sealed Perimeter',
    turnaround: '4-6 Business Days',
    price: 'From $1.95 / ea',
    icon: '🏷️',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 'chenille',
    name: 'Vintage Varsity Wool Chenille',
    badge: 'Authentic Collegiate Heritage',
    desc: 'Plush, fluffy looped yarn crafted with vintage moss-stitch embroidery on double-layer stiff felt. The timeless look for varsity letterman jackets and streetwear.',
    material: 'Plush Acrylic Yarn + Double Felt',
    stitches: 'High-Pile Moss Stitch Looming',
    backing: 'Reinforced Heat-Seal Iron-On',
    border: 'Double-Layer Stiff Felt Edge',
    turnaround: '6-8 Business Days',
    price: 'From $2.45 / ea',
    icon: '🏆',
    colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  {
    id: 'woven',
    name: 'Jacquard Micro-Thread Woven',
    badge: 'Ultra-Fine Micro Detail',
    desc: 'Unlike embroidery that stitches on top of twill, woven patches weave thin 50-denier threads together from scratch, producing razor-sharp detail down to 1.5mm.',
    material: '50-Denier Micro-Weave Jacquard',
    stitches: 'Flat Non-Snag Micro Matrix',
    backing: 'Heat-Seal or Velcro Backing',
    border: 'Laser-Cut Heat-Sealed Edge',
    turnaround: '6-8 Business Days',
    price: 'From $1.45 / ea',
    icon: '🎮',
    colorClass: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
];

interface HeroProps {
  whatsappNumber?: string;
  onSelectStyle?: (style: string) => void;
}

export default function Hero({ whatsappNumber = '18005557282', onSelectStyle }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSpecimen = SPECIMENS[activeIdx];

  return (
    <section className="relative isolate border-b border-slate-200 overflow-hidden bg-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-dot-pattern opacity-60" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authoritative Copy & CTAs */}
          <div className="flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 font-mono mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Direct Loom Manufacturer • 10-Piece Low Minimums</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-slate-900 leading-[1.12]">
              Custom Patches Made Simple — <span className="text-blue-600">Factory-Direct Quality.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Commercial Tajima computerized embroidery, tactical 3D PVC rubber, laser-debossed leatherette, and vintage varsity chenille. We eliminate the guesswork with guaranteed 6-hour digital proofs, real machine sample photo approvals, and bulk factory pricing up to 52% off.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 font-bold tracking-tight text-white rounded-xl px-7 py-4 text-sm sm:text-base btn-primary-blue cursor-pointer shadow-lg w-full sm:w-auto text-center"
              >
                <span>Get Free Quote &amp; Digital Proof</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 font-semibold text-slate-700 rounded-xl px-6 py-4 text-sm bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-all w-full sm:w-auto text-center shadow-xs"
              >
                <span>Explore 6 Patch Services</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi ApexPatches, I need a custom patch quote!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-emerald-700 rounded-xl px-4 py-4 text-xs sm:text-sm bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="mt-10 pt-6 border-t border-slate-200 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="text-[11px] font-bold">10-Pc Low MOQ</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                <span className="text-[11px] font-bold">Free 6-Hr Proof</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600" />
                <span className="text-[11px] font-bold">Photo Approval</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                <span className="text-[11px] font-bold">Save Up to 52%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Production Specimen Switcher */}
          <div className="relative w-full">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">
                    PRODUCTION SPECIMEN INSPECTOR
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  ✓ Machine Verified
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {SPECIMENS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-2 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                      activeIdx === idx
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-base">{s.icon}</div>
                    <div className="text-[10px] truncate mt-1">{s.name.split(' ')[1] || s.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              {/* Specimen Details Display Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-4xl shadow-md">
                  {activeSpecimen.icon}
                </div>

                <div>
                  <span className={`inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border mb-1.5 ${activeSpecimen.colorClass}`}>
                    {activeSpecimen.badge}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{activeSpecimen.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-sm">
                    {activeSpecimen.desc}
                  </p>
                </div>

                {/* Technical Specs Breakdown Matrix */}
                <div className="w-full pt-4 border-t border-slate-200 grid grid-cols-2 gap-2.5 text-left font-mono text-[11px]">
                  <div className="bg-white rounded-xl p-2.5 border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">MATERIAL COMPOSITION</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate block">{activeSpecimen.material}</span>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-slate-200 text-right">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">DENSITY / RESOLUTION</span>
                    <span className="font-semibold text-blue-600 text-[11px] truncate block">{activeSpecimen.stitches}</span>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-slate-200">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">ATTACHMENT BACKING</span>
                    <span className="font-semibold text-slate-700 text-[11px] truncate block">{activeSpecimen.backing}</span>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-slate-200 text-right">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">STARTING RATE</span>
                    <span className="font-bold text-amber-600 text-[11px] truncate block">{activeSpecimen.price}</span>
                  </div>
                </div>

              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-500">Want this patch style?</span>
                <a
                  href="#quote"
                  onClick={() => onSelectStyle?.(activeSpecimen.id)}
                  className="font-bold text-blue-600 hover:text-blue-700 underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Select &amp; Quote This Style</span>
                  <span>→</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

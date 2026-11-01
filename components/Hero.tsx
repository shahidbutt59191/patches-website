'use client';

import React, { useState } from 'react';
import { Star, Shield, ArrowRight, MessageSquare, CheckCircle2, Sparkles, Sliders } from 'lucide-react';

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
  },
  {
    id: 'pvc',
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
    <section className="relative isolate border-b border-white/10 overflow-hidden bg-[#070913] pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 dot-pattern opacity-70" />
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 pl-2.5 pr-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300 font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Direct Factory Looms • 10-Piece Low MOQ</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] text-white leading-[1.12]">
              Custom Patches Made Easy — Factory-Direct Quality.
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              Commercial Tajima computerized embroidery, tactical 3D PVC rubber, debossed leatherette, and varsity chenille. We eliminate the guesswork with guaranteed 6-hour digital proofs, real machine sample photo approvals, and bulk factory pricing up to 52% off.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 font-bold tracking-tight text-white rounded-xl px-7 py-4 text-sm sm:text-base btn-primary-gradient cursor-pointer shadow-xl w-full sm:w-auto text-center"
              >
                <span>Get Free Quote &amp; Proof</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 font-semibold text-slate-200 rounded-xl px-6 py-4 text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all w-full sm:w-auto text-center"
              >
                <span>Explore 6 Patch Services</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi ApexPatches, I need a custom patch quote!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-emerald-400 rounded-xl px-4 py-4 text-xs sm:text-sm bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="mt-10 pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-[11px]">10-Pc Low MOQ</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-[11px]">Free 6-Hr Proof</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-[11px]">Photo Approval</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400" />
                <span className="text-[11px]">Save up to 52%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Production Specimen Switcher */}
          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-amber-500/30 blur-2xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl border border-white/15 bg-[#0d1124]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider">
                    LIVE SPECIMEN INSPECTOR
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
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
                        ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-base">{s.icon}</div>
                    <div className="text-[9px] truncate mt-1">{s.name.split(' ')[1] || s.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              {/* Specimen Details Card */}
              <div className="rounded-2xl border border-white/10 bg-[#070914] p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-amber-500/10 border-2 border-indigo-400/40 flex items-center justify-center text-4xl shadow-inner">
                  {activeSpecimen.icon}
                </div>

                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-1">
                    {activeSpecimen.badge}
                  </span>
                  <h3 className="text-xl font-black text-white">{activeSpecimen.name}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-sm">
                    {activeSpecimen.desc}
                  </p>
                </div>

                {/* Technical Specs Breakdown */}
                <div className="w-full pt-4 border-t border-white/10 grid grid-cols-2 gap-2.5 text-left font-mono text-[11px] text-slate-300">
                  <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">MATERIAL COMPOSITION</span>
                    <span className="font-semibold text-white text-[11px] truncate block">{activeSpecimen.material}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 text-right">
                    <span className="text-slate-500 block text-[9px] uppercase">DENSITY / RESOLUTION</span>
                    <span className="font-semibold text-indigo-400 text-[11px] truncate block">{activeSpecimen.stitches}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">ATTACHMENT BACKING</span>
                    <span className="font-semibold text-slate-200 text-[11px] truncate block">{activeSpecimen.backing}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 text-right">
                    <span className="text-slate-500 block text-[9px] uppercase">STARTING RATE</span>
                    <span className="font-bold text-amber-400 text-[11px] truncate block">{activeSpecimen.price}</span>
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Want this patch style?</span>
                <a
                  href="#quote"
                  onClick={() => onSelectStyle?.(activeSpecimen.id)}
                  className="font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                >
                  <span>Select &amp; Quote This Patch</span>
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

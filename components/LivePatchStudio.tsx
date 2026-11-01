'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Sparkles, ArrowRight, ShieldCheck, Check, Clock, Truck } from 'lucide-react';
import { MountainShieldPatch, ExploreMorePatch, BarEmbroideredPatch } from './PatchVisuals';

interface LivePatchStudioProps {
  onOpenQuoteWithSpecs?: (specs: {
    style: string;
    width: number;
    height: number;
    backing: string;
    quantity: number;
  }) => void;
  basePrice?: number;
  velcroFee?: number;
  ironOnFee?: number;
  peelStickFee?: number;
}

export default function LivePatchStudio({
  onOpenQuoteWithSpecs,
  basePrice = 1.85,
  velcroFee = 0.45,
  ironOnFee = 0.20,
  peelStickFee = 0.35,
}: LivePatchStudioProps) {
  const [shape, setShape] = useState<'shield' | 'circle' | 'rectangle'>('shield');
  const [size, setSize] = useState<number>(3.0);
  const [backing, setBacking] = useState<string>('velcro_hook_loop');
  const [quantity, setQuantity] = useState<number>(100);

  // Dynamic pricing calculation
  const calculations = useMemo(() => {
    let base = basePrice + (size - 2.0) * 0.55;

    // Backing addon
    if (backing === 'velcro_hook_loop') base += velcroFee;
    if (backing === 'iron_on') base += ironOnFee;
    if (backing === 'peel_stick') base += peelStickFee;

    // Wholesale discounts
    let discount = 0;
    let tierLabel = 'Standard Base';
    if (quantity >= 1000) {
      discount = 0.50;
      tierLabel = '50% OFF Wholesale Factory Tier';
    } else if (quantity >= 500) {
      discount = 0.40;
      tierLabel = '40% OFF Bulk Tier';
    } else if (quantity >= 250) {
      discount = 0.30;
      tierLabel = '30% OFF Volume Tier';
    } else if (quantity >= 100) {
      discount = 0.22;
      tierLabel = '22% OFF Popular Tier';
    } else if (quantity >= 50) {
      discount = 0.12;
      tierLabel = '12% OFF Starter Tier';
    }

    const unitPrice = Math.max(0.85, base * (1 - discount));
    const totalPrice = unitPrice * quantity;

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discountPercent: Math.round(discount * 100),
      tierLabel,
      turnaround: quantity >= 500 ? '12-14 Business Days' : '10-12 Business Days',
    };
  }, [size, backing, quantity]);

  const handleLaunchQuote = () => {
    if (onOpenQuoteWithSpecs) {
      onOpenQuoteWithSpecs({
        style: 'embroidered',
        width: size,
        height: size,
        backing,
        quantity,
      });
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Stitched Grid */}
      <div className="absolute inset-0 bg-fabric-pattern opacity-60 pointer-events-none" />

      {/* Radiant Orange Glow Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-xs font-bold text-orange-400 mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Patch Studio &amp; Live Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Design Your Custom Run in Real-Time
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Adjust your shape, dimensions, backing and quantity to see instant live factory pricing.
          </p>
        </div>

        {/* Customizer Box */}
        <div className="bg-[#181b22] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Controls (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Shape Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Patch Shape
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'shield', label: 'Tactical Shield' },
                  { id: 'circle', label: 'Explore Round' },
                  { id: 'rectangle', label: 'Bar Rectangle' },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setShape(s.id as any)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      shape === s.id
                        ? 'border-orange-500 bg-orange-500/15 text-white shadow-xs'
                        : 'border-slate-800 bg-[#12141a] text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dimensions Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  2. Patch Size (Diameter / Width)
                </span>
                <span className="text-orange-400 font-bold font-mono text-sm">
                  {size.toFixed(1)} inches ({Math.round(size * 25.4)} mm)
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="5.0"
                step="0.25"
                value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>2.0&quot; (Caps &amp; Collars)</span>
                <span>3.0&quot; (Most Popular Uniform Size)</span>
                <span>5.0&quot; (Jacket Back &amp; Vests)</span>
              </div>
            </div>

            {/* 3. Backing Attachment */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                3. Attachment Backing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'velcro_hook_loop', name: 'Velcro Hook' },
                  { id: 'iron_on', name: 'Heat Iron-On' },
                  { id: 'sew_on', name: 'Plain Sew-On' },
                  { id: 'peel_stick', name: '3M Adhesive' },
                ].map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => setBacking(b.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      backing === b.id
                        ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                        : 'border-slate-800 bg-[#12141a] text-slate-400 hover:text-white'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Quantity Tiers */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  4. Quantity
                </span>
                {calculations.discountPercent > 0 && (
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full text-[11px]">
                    {calculations.tierLabel}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {[25, 50, 100, 250, 500, 1000].map((qty) => (
                  <button
                    type="button"
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      quantity === qty
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-[#12141a] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {qty} pcs
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Specimen & Price Summary (5 Columns) */}
          <div className="lg:col-span-5 bg-[#12141a] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Visual Patch Preview */}
            <div className="relative h-44 flex items-center justify-center bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 overflow-hidden">
              <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
              
              <div className="transition-transform duration-300 transform hover:scale-105">
                {shape === 'shield' && <MountainShieldPatch className="w-28 h-32" />}
                {shape === 'circle' && <ExploreMorePatch className="w-28 h-28" />}
                {shape === 'rectangle' && <BarEmbroideredPatch className="w-36 h-20" />}
              </div>

              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                {size}&quot; × {size}&quot; • {backing.replace('_', ' ')}
              </div>
            </div>

            {/* Pricing Details */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Total for {quantity} Custom Patches</span>
                <span className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">
                  ${calculations.totalPrice}
                </span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Unit Price</span>
                <span className="font-mono text-white font-bold">${calculations.unitPrice} / patch</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Turnaround</span>
                <span className="font-mono text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-400" /> {calculations.turnaround}
                </span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Shipping</span>
                <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> 100% Free Tracked Worldwide
                </span>
              </div>
            </div>

            {/* Launch Quote Button */}
            <button
              type="button"
              onClick={handleLaunchQuote}
              className="w-full btn-orange py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Lock In This Spec &amp; Get Free Proof</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

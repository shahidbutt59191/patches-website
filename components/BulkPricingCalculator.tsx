'use client';

import React, { useState } from 'react';

export default function BulkPricingCalculator() {
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(3.0);
  const [quantity, setQuantity] = useState(100);
  const [patchType, setPatchType] = useState<'embroidered' | 'pvc' | 'leather' | 'chenille' | 'woven' | 'printed'>('embroidered');
  const [backing, setBacking] = useState<'sew-on' | 'velcro' | 'iron-on' | 'peel-stick' | 'magnetic'>('velcro');

  const sizeInch = (width + height) / 2;
  const areaSqIn = (width * height).toFixed(1);

  let baseUnitRate = 1.35 + sizeInch * 0.22;
  if (patchType === 'pvc') baseUnitRate *= 1.30;
  if (patchType === 'chenille') baseUnitRate *= 1.40;
  if (patchType === 'leather') baseUnitRate *= 1.25;
  if (patchType === 'woven') baseUnitRate *= 0.95;
  if (patchType === 'printed') baseUnitRate *= 0.90;

  let backingFee = 0;
  if (backing === 'velcro') backingFee = 0.50;
  if (backing === 'iron-on') backingFee = 0.25;
  if (backing === 'peel-stick') backingFee = 0.35;
  if (backing === 'magnetic') backingFee = 0.95;

  let discountPct = 0;
  if (quantity >= 1000) discountPct = 52;
  else if (quantity >= 500) discountPct = 44;
  else if (quantity >= 250) discountPct = 35;
  else if (quantity >= 100) discountPct = 26;
  else if (quantity >= 50) discountPct = 15;
  else if (quantity >= 25) discountPct = 8;

  const rawUnit = baseUnitRate + backingFee;
  const finalUnit = (rawUnit * (1 - discountPct / 100)).toFixed(2);
  const grandTotal = (Number(finalUnit) * quantity).toFixed(2);
  const savings = ((rawUnit - Number(finalUnit)) * quantity).toFixed(2);

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative overflow-hidden scroll-mt-20">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#5448ea]/8 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-[#5448ea]/10 text-indigo-300 border-[#5448ea]/30 font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Instant Wholesale Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12]">
            Bulk Pricing &amp; Dimension Calculator
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Slide width, height, and quantity to see live tier discounts up to 52% off with 100% transparent pricing.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Sliders & Options (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0c1020] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
            
            {/* Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Patch Dimensions (Inches)
                </label>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {width}&quot; W × {height}&quot; H ({areaSqIn} sq. in.)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#070913] p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">Width:</span>
                    <span className="text-white font-bold">{width}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 3.0)}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>1.5&quot;</span>
                    <span>3.5&quot;</span>
                    <span>6.0&quot;</span>
                  </div>
                </div>

                <div className="bg-[#070913] p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">Height:</span>
                    <span className="text-white font-bold">{height}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 3.0)}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>1.5&quot;</span>
                    <span>3.5&quot;</span>
                    <span>6.0&quot;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Order Quantity (Pieces)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {quantity} pcs ({discountPct > 0 ? `${discountPct}% Bulk Discount` : 'Retail Tier'})
                </span>
              </div>

              <div className="bg-[#070913] p-4 rounded-2xl border border-white/10 space-y-3">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 font-mono text-xs">
                  {[10, 25, 50, 100, 250, 500, 1000].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`py-1.5 rounded-lg border text-center transition-all ${
                        quantity === q
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold'
                          : 'border-white/10 bg-[#0e1326] text-slate-400 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Material Style */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Patch Material Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'embroidered', name: '🧵 Embroidered' },
                  { id: 'pvc', name: '🛡️ PVC Rubber' },
                  { id: 'leather', name: '🏷️ Leatherette' },
                  { id: 'chenille', name: '🏆 Chenille' },
                  { id: 'woven', name: '🎮 Micro-Woven' },
                  { id: 'printed', name: '🎨 Sublimated' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPatchType(p.id as any)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      patchType === p.id
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                        : 'border-white/10 bg-[#070913] text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Backing Hardware */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Attachment Backing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'velcro', name: '🧲 Velcro Hook&Loop', cost: '+$0.50' },
                  { id: 'iron-on', name: '🔥 Iron-On Film', cost: '+$0.25' },
                  { id: 'sew-on', name: '🧵 Plain Sew-On', cost: 'FREE' },
                  { id: 'peel-stick', name: '🏷️ 3M Adhesive', cost: '+$0.35' },
                  { id: 'magnetic', name: '🧲 Magnetic Pinless', cost: '+$0.95' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBacking(b.id as any)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                      backing === b.id
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                        : 'border-white/10 bg-[#070913] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{b.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{b.cost}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Quote Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#10152c] to-[#070913] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  LIVE PRODUCTION BREAKDOWN
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  Guaranteed Lock-In Rate
                </span>
              </div>

              <div className="py-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Patch Dimensions:</span>
                  <span className="text-white font-bold">{width}&quot; × {height}&quot;</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Batch Quantity:</span>
                  <span className="text-white font-bold">{quantity} pieces</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Selected Material:</span>
                  <span className="text-white font-bold capitalize">{patchType}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Backing Hardware:</span>
                  <span className="text-white font-bold capitalize">{backing.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Bulk Discount Applied:</span>
                  <span className="text-emerald-400 font-bold">-{discountPct}% OFF</span>
                </div>
                {Number(savings) > 0 && (
                  <div className="flex justify-between text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                    <span>You Save:</span>
                    <span className="font-bold">${savings}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">Unit Price:</span>
                  <div className="font-mono text-3xl font-black text-indigo-400">
                    ${finalUnit} <span className="text-xs text-slate-400 font-normal">/patch</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">Grand Total:</span>
                  <div className="font-mono text-3xl font-black text-white">
                    ${grandTotal}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="#order"
                className="w-full py-4 btn-primary-gradient text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl text-center block transition-all"
              >
                Lock In This Rate &amp; Configure Patch ↗
              </a>
              <div className="text-center text-[10px] font-mono text-slate-500">
                ✓ Free Tajima Digitizing ($45 Value) • Free Digital Proof in 6 Hours
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

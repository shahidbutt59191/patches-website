'use client';

import React, { useState } from 'react';
import { Calculator as CalcIcon, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface CalculatorProps {
  onApplySpecs?: (specs: {
    style: string;
    width: number;
    height: number;
    backing: string;
    quantity: number;
  }) => void;
}

export default function Calculator({ onApplySpecs }: CalculatorProps) {
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(3.0);
  const [quantity, setQuantity] = useState(100);
  const [patchType, setPatchType] = useState('embroidered');
  const [backing, setBacking] = useState('velcro');

  const sizeInch = (width + height) / 2;
  const areaSqIn = (width * height).toFixed(1);

  let baseUnitRate = 1.35 + sizeInch * 0.22;
  if (patchType === 'pvc_rubber') baseUnitRate *= 1.30;
  if (patchType === 'chenille') baseUnitRate *= 1.40;
  if (patchType === 'leatherette') baseUnitRate *= 1.25;
  if (patchType === 'woven') baseUnitRate *= 0.95;
  if (patchType === 'sublimated_printed') baseUnitRate *= 0.90;

  let backingFee = 0;
  if (backing === 'velcro') backingFee = 0.50;
  if (backing === 'iron_on') backingFee = 0.25;
  if (backing === 'peel_stick') backingFee = 0.35;
  if (backing === 'magnetic') backingFee = 0.95;

  let discountPct = 0;
  if (quantity >= 1000) discountPct = 52;
  else if (quantity >= 500) discountPct = 44;
  else if (quantity >= 250) discountPct = 35;
  else if (quantity >= 100) discountPct = 26;
  else if (quantity >= 50) discountPct = 15;
  else if (quantity >= 25) discountPct = 8;

  const rawUnit = baseUnitRate + backingFee;
  const finalUnit = Math.max(0.75, rawUnit * (1 - discountPct / 100)).toFixed(2);
  const grandTotal = (Number(finalUnit) * quantity).toFixed(2);
  const savings = ((rawUnit - Number(finalUnit)) * quantity).toFixed(2);

  const handleApply = () => {
    if (onApplySpecs) {
      onApplySpecs({
        style: patchType,
        width,
        height,
        backing,
        quantity,
      });
    }
  };

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-blue-50 text-blue-700 border-blue-200 font-mono mb-3">
            <CalcIcon className="w-3.5 h-3.5 text-blue-600" />
            Transparent Pricing Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.12]">
            Bulk Pricing &amp; Dimension Calculator
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Slide width, height, and quantity to see live tier discounts up to 52% off with 100% transparent factory rates.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Sliders & Options (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Patch Dimensions (Inches)
                </label>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {width}&quot; W × {height}&quot; H ({areaSqIn} sq. in.)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500">Width:</span>
                    <span className="text-slate-900 font-bold">{width}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 3.0)}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>1.5&quot;</span>
                    <span>3.5&quot;</span>
                    <span>6.0&quot;</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500">Height:</span>
                    <span className="text-slate-900 font-bold">{height}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 3.0)}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
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
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Order Quantity (Pieces)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {quantity} pcs ({discountPct > 0 ? `${discountPct}% Bulk Savings` : 'Base Tier'})
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 font-mono text-xs">
                  {[25, 50, 100, 250, 500, 1000].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                        quantity === q
                          ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {q} pcs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Material Style */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Patch Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'embroidered', name: '🧵 Embroidered' },
                  { id: 'pvc_rubber', name: '🛡️ PVC Rubber' },
                  { id: 'leatherette', name: '🏷️ Leatherette' },
                  { id: 'chenille', name: '🏆 Chenille' },
                  { id: 'woven', name: '🎮 Micro-Woven' },
                  { id: 'sublimated_printed', name: '🎨 Sublimated' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPatchType(p.id)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      patchType === p.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Backing Hardware */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                Attachment Backing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'velcro', name: '🧲 Velcro (Hook&Loop)', cost: '+$0.50' },
                  { id: 'iron_on', name: '🔥 Iron-On Film', cost: '+$0.25' },
                  { id: 'sew_on', name: '🧵 Plain Sew-On', cost: 'FREE' },
                  { id: 'peel_stick', name: '🏷️ 3M Adhesive', cost: '+$0.35' },
                  { id: 'magnetic', name: '🧲 Magnetic Pinless', cost: '+$0.95' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBacking(b.id)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      backing === b.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>{b.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{b.cost}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Live Quote Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  LIVE PRODUCTION BREAKDOWN
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Guaranteed Rate
                </span>
              </div>

              <div className="py-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Patch Dimensions:</span>
                  <span className="text-slate-900 font-bold">{width}&quot; × {height}&quot;</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Batch Quantity:</span>
                  <span className="text-slate-900 font-bold">{quantity} pieces</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Selected Material:</span>
                  <span className="text-slate-900 font-bold capitalize">{patchType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Backing Hardware:</span>
                  <span className="text-slate-900 font-bold capitalize">{backing.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Bulk Discount Applied:</span>
                  <span className="text-emerald-700 font-bold">-{discountPct}% OFF</span>
                </div>
                {Number(savings) > 0 && (
                  <div className="flex justify-between text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-bold">
                    <span>You Save:</span>
                    <span>${savings}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase font-bold">Unit Price:</span>
                  <div className="font-mono text-3xl font-black text-blue-600">
                    ${finalUnit} <span className="text-xs text-slate-500 font-normal">/patch</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase font-bold">Grand Total:</span>
                  <div className="font-mono text-3xl font-black text-slate-900">
                    ${grandTotal}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="#quote"
                onClick={handleApply}
                className="w-full py-4 btn-primary-blue text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md text-center block transition-all cursor-pointer"
              >
                Apply Specs to Free Quote Form ↗
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

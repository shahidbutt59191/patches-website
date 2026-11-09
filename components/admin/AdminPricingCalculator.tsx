'use client';

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Sliders,
  Sparkles,
  Zap,
  TrendingDown,
  Layers,
  Save,
  RotateCcw,
  CheckCircle2,
  Shield,
  Clock,
} from 'lucide-react';
import { SiteSettings, DEFAULT_BULK_TIERS, BulkTierItem } from '@/lib/settings';

interface AdminPricingCalculatorProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminPricingCalculator({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminPricingCalculatorProps) {
  // Simulator State
  const [simWidth, setSimWidth] = useState(3.0);
  const [simHeight, setSimHeight] = useState(3.0);
  const [simQty, setSimQty] = useState(100);
  const [simStyle, setSimStyle] = useState<
    'embroidered' | 'iron_on' | 'velcro' | 'woven' | 'leather' | 'pvc'
  >('embroidered');
  const [simBacking, setSimBacking] = useState<'velcro' | 'iron_on' | 'peel_stick' | 'sew_on'>('velcro');
  const [simBorder, setSimBorder] = useState<'merrowed' | 'laser_cut'>('merrowed');
  const [simRush, setSimRush] = useState(false);

  // Live Simulator Calculation
  const simCalc = useMemo(() => {
    const baseRates: Record<string, number> = {
      embroidered: settings.priceEmbroidered ?? 1.85,
      iron_on: settings.priceIronOn ?? 1.95,
      velcro: settings.priceVelcro ?? 2.35,
      woven: settings.priceWoven ?? 1.65,
      leather: settings.priceLeather ?? 2.45,
      pvc: settings.pricePvc ?? 2.55,
    };
    const backingFees: Record<string, number> = {
      velcro: settings.velcroFee ?? 0.45,
      iron_on: settings.ironOnFee ?? 0.20,
      peel_stick: settings.peelStickFee ?? 0.35,
      sew_on: settings.sewOnFee ?? 0.00,
    };
    const borderFee =
      simBorder === 'laser_cut'
        ? settings.laserCutFee ?? 0.15
        : settings.merrowedFee ?? 0.0;

    const base = baseRates[simStyle] || 1.85;
    const backing = backingFees[simBacking] || 0.0;
    const sizeFactor = Math.max(1.0, (simWidth + simHeight) / 2 / 3.0);

    // Matching Bulk Discount
    const tiers = settings.bulkTiers && settings.bulkTiers.length > 0 ? settings.bulkTiers : DEFAULT_BULK_TIERS;
    const matchingTier = [...tiers].reverse().find((t) => simQty >= t.qty);
    const discountPct = matchingTier ? matchingTier.discountPct : 0;

    let unit = (base + backing + borderFee) * sizeFactor;
    unit = unit * (1 - discountPct / 100);

    let total = unit * simQty;
    if (simRush) total += settings.rushOrderFee ?? 45.0;

    return {
      unitPrice: unit.toFixed(2),
      discountPct,
      subtotal: (unit * simQty).toFixed(2),
      total: total.toFixed(2),
      sizeFactor: sizeFactor.toFixed(2),
    };
  }, [simWidth, simHeight, simQty, simStyle, simBacking, simBorder, simRush, settings]);

  const handleFieldChange = (key: keyof SiteSettings, value: number) => {
    const newSettings = { ...settings, [key]: value };
    onUpdateSettings(newSettings);
  };

  const handleTierChange = (index: number, discountPct: number) => {
    const tiers = settings.bulkTiers && settings.bulkTiers.length > 0 ? [...settings.bulkTiers] : [...DEFAULT_BULK_TIERS];
    tiers[index] = { ...tiers[index], discountPct };
    const newSettings = { ...settings, bulkTiers: tiers };
    onUpdateSettings(newSettings);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Rates, Surcharges & Live Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure factory base rates, backing attachments, rush production fees, and test quotes in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSaveSettings()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save All Rates</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Base Rates by Patch Style */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                <span>Base Unit Rates (3.0" Standard Baseline)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Currency: USD ($)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { label: 'Embroidered Patches', key: 'priceEmbroidered', default: 1.85 },
                { label: 'Iron-On Patches', key: 'priceIronOn', default: 1.95 },
                { label: 'Velcro Morale Patches', key: 'priceVelcro', default: 2.35 },
                { label: 'Woven Micro-Thread', key: 'priceWoven', default: 1.65 },
                { label: 'Artisan Leatherette', key: 'priceLeather', default: 2.45 },
                { label: '3D Molded Soft PVC', key: 'pricePvc', default: 2.55 },
              ].map((style) => (
                <div key={style.key} className="space-y-1">
                  <label className="font-semibold text-slate-300 block">{style.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.05"
                      value={(settings as any)[style.key] ?? style.default}
                      onChange={(e) => handleFieldChange(style.key as any, parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl pl-8 pr-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachment Backing Surcharges */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Attachment Backing Fees (Per Patch)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { label: 'Velcro Hook/Loop', key: 'velcroFee', default: 0.45 },
                { label: 'Heat Iron-On', key: 'ironOnFee', default: 0.20 },
                { label: '3M Adhesive Stick', key: 'peelStickFee', default: 0.35 },
                { label: 'Sew-On Twill', key: 'sewOnFee', default: 0.00 },
              ].map((b) => (
                <div key={b.key} className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 block">{b.label}</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono">
                      +$
                    </span>
                    <input
                      type="number"
                      step="0.05"
                      value={(settings as any)[b.key] ?? b.default}
                      onChange={(e) => handleFieldChange(b.key as any, parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl pl-8 pr-2 py-2 text-white font-mono focus:outline-none text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finishing, Rush & Free Shipping */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Finishing, Rush Production & Logistics
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Laser Cut Border ($)</label>
                <input
                  type="number"
                  step="0.05"
                  value={settings.laserCutFee ?? 0.15}
                  onChange={(e) => handleFieldChange('laserCutFee', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Rush Turnaround Fee ($)</label>
                <input
                  type="number"
                  step="5.0"
                  value={settings.rushOrderFee ?? 45.0}
                  onChange={(e) => handleFieldChange('rushOrderFee', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Free Shipping Min ($)</label>
                <input
                  type="number"
                  step="10.0"
                  value={settings.freeShippingThreshold ?? 75.0}
                  onChange={(e) => handleFieldChange('freeShippingThreshold', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Bulk Discount Tiers Table */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Bulk Quantity Discount Tiers
              </span>
              <span className="text-[10px] text-orange-400 font-bold">Auto-applied in estimator</span>
            </div>

            <div className="space-y-2">
              {(settings.bulkTiers && settings.bulkTiers.length > 0 ? settings.bulkTiers : DEFAULT_BULK_TIERS).map((tier, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{tier.qty}+ pieces</span>
                    <span className="text-slate-500">({tier.label || 'Wholesale Tier'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono">Discount:</span>
                    <div className="relative w-20">
                      <input
                        type="number"
                        min="0"
                        max="90"
                        value={tier.discountPct}
                        onChange={(e) => handleTierChange(idx, parseInt(e.target.value, 10) || 0)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pr-6 pl-2 py-1 text-right text-orange-400 font-mono font-bold focus:outline-none focus:border-orange-500"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Floating Live Simulator (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900 via-[#10131d] to-slate-950 border border-orange-500/30 p-5 sm:p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">Live Simulator Card</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Real-Time
              </span>
            </div>

            {/* Simulator Controls */}
            <div className="space-y-4 text-xs">
              
              {/* Style */}
              <div>
                <label className="text-slate-400 font-medium block mb-1">Patch Material Style</label>
                <select
                  value={simStyle}
                  onChange={(e) => setSimStyle(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="embroidered">Embroidered</option>
                  <option value="iron_on">Iron-On</option>
                  <option value="velcro">Velcro</option>
                  <option value="woven">Woven</option>
                  <option value="leather">Leather</option>
                  <option value="pvc">3D Soft PVC</option>
                </select>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Width:</span>
                    <span className="text-white font-mono font-bold">{simWidth.toFixed(1)}"</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={simWidth}
                    onChange={(e) => setSimWidth(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Height:</span>
                    <span className="text-white font-mono font-bold">{simHeight.toFixed(1)}"</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.25"
                    value={simHeight}
                    onChange={(e) => setSimHeight(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Backing & Border */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Backing</label>
                  <select
                    value={simBacking}
                    onChange={(e) => setSimBacking(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none"
                  >
                    <option value="velcro">Velcro Hook/Loop</option>
                    <option value="iron_on">Heat Iron-On</option>
                    <option value="peel_stick">3M Adhesive</option>
                    <option value="sew_on">Sew-On Twill</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Border</label>
                  <select
                    value={simBorder}
                    onChange={(e) => setSimBorder(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none"
                  >
                    <option value="merrowed">Merrowed Overlock</option>
                    <option value="laser_cut">Laser Cut Smooth</option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Batch Quantity:</span>
                  <span className="text-orange-400 font-mono font-bold">{simQty} pcs</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="1500"
                  step="25"
                  value={simQty}
                  onChange={(e) => setSimQty(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Rush Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-300 font-medium">Rush 4-6 Day Delivery:</span>
                <input
                  type="checkbox"
                  checked={simRush}
                  onChange={(e) => setSimRush(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Calculated Output Display */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/40 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Unit Price:</span>
                <span className="text-white font-mono font-bold">${simCalc.unitPrice} / pc</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Applied Discount:</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {simCalc.discountPct > 0 ? `-${simCalc.discountPct}% OFF` : 'Standard Tier'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-white font-mono">${simCalc.subtotal}</span>
              </div>
              {simRush && (
                <div className="flex justify-between items-center text-xs text-orange-400">
                  <span>Rush Expedited Fee:</span>
                  <span className="font-mono font-bold">+${settings.rushOrderFee ?? 45.00}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Calculated Total</span>
                  <span className="text-[10px] text-slate-500 font-mono">{simQty} Custom Patches</span>
                </div>
                <div className="text-3xl font-black text-amber-400 font-mono tracking-tight">
                  ${simCalc.total}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

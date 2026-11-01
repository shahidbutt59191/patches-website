'use client';

import React, { useState, useMemo, ChangeEvent, FormEvent, useEffect } from 'react';
import { UploadCloud, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface QuoteFormProps {
  initialStyle?: string;
  initialWidth?: number;
  initialHeight?: number;
  initialBacking?: string;
  initialQuantity?: number;
}

const STYLE_MULTIPLIERS: Record<string, number> = {
  embroidered: 1.0,
  pvc_rubber: 1.25,
  leatherette: 1.15,
  chenille: 1.3,
  woven: 0.95,
  sublimated_printed: 0.9,
};

const BACKING_ADDONS: Record<string, number> = {
  iron_on: 0.25,
  velcro_hook_loop: 0.5,
  velcro: 0.5,
  sew_on: 0.0,
  peel_and_stick: 0.35,
  peel_stick: 0.35,
  magnetic: 0.95,
};

const QUANTITY_DISCOUNT_TIERS = [
  { min: 1000, discount: 0.52, label: '52% OFF (Wholesale Tier)' },
  { min: 500, discount: 0.44, label: '44% OFF' },
  { min: 250, discount: 0.35, label: '35% OFF' },
  { min: 100, discount: 0.26, label: '26% OFF' },
  { min: 50, discount: 0.15, label: '15% OFF' },
  { min: 25, discount: 0.08, label: '8% OFF' },
  { min: 10, discount: 0.0, label: 'Standard Base' },
];

export default function QuoteForm({
  initialStyle = 'embroidered',
  initialWidth = 3.0,
  initialHeight = 3.0,
  initialBacking = 'velcro_hook_loop',
  initialQuantity = 100,
}: QuoteFormProps) {
  const [style, setStyle] = useState(initialStyle);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [backing, setBacking] = useState(initialBacking);
  const [border, setBorder] = useState('merrowed');
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (initialStyle) setStyle(initialStyle);
  }, [initialStyle]);

  useEffect(() => {
    if (initialWidth) setWidth(initialWidth);
    if (initialHeight) setHeight(initialHeight);
  }, [initialWidth, initialHeight]);

  useEffect(() => {
    if (initialBacking) setBacking(initialBacking);
  }, [initialBacking]);

  useEffect(() => {
    if (initialQuantity) setQuantity(initialQuantity);
  }, [initialQuantity]);

  // Customer Contact State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessNumber, setOrderSuccessNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Industrial Price Calculation
  const pricing = useMemo(() => {
    const avgSize = (Number(width) + Number(height)) / 2;
    const baseFormulaPrice = 1.6 + avgSize * 0.55;
    const styleMultiplied = baseFormulaPrice * (STYLE_MULTIPLIERS[style] || 1.0);
    const withBacking = styleMultiplied + (BACKING_ADDONS[backing] || 0.0);

    const activeTier = QUANTITY_DISCOUNT_TIERS.find((t) => quantity >= t.min) || {
      discount: 0,
      label: 'Standard',
    };

    const discountedUnitPrice = Number((withBacking * (1 - activeTier.discount)).toFixed(2));
    const finalUnitPrice = Math.max(discountedUnitPrice, 0.75);
    const totalAmount = Number((finalUnitPrice * quantity).toFixed(2));
    const regularAmount = Number((withBacking * quantity).toFixed(2));
    const totalSavings = Number((regularAmount - totalAmount).toFixed(2));

    return {
      avgSize: avgSize.toFixed(2),
      unitPrice: finalUnitPrice,
      totalAmount,
      totalSavings,
      discountPercent: Math.round(activeTier.discount * 100),
      discountLabel: activeTier.label,
    };
  }, [style, width, height, backing, quantity]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArtworkFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('notes', notes);
      formData.append('style', style);
      formData.append('width', String(width));
      formData.append('height', String(height));
      formData.append('calculatedSize', pricing.avgSize);
      formData.append('backing', backing);
      formData.append('border', border);
      formData.append('quantity', String(quantity));
      formData.append('unitPrice', String(pricing.unitPrice));
      formData.append('totalAmount', String(pricing.totalAmount));
      formData.append('discountPercentage', String(pricing.discountPercent));

      if (artworkFile) {
        formData.append('artwork', artworkFile);
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setOrderSuccessNumber(data.orderNumber || 'AP-' + Math.floor(10000 + Math.random() * 90000));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccessNumber) {
    return (
      <section id="quote" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-500/40 bg-[#0c1020] p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Production Request Received
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Quote &amp; Artwork Confirmed!</h3>
            <p className="mt-2 text-sm text-slate-300">
              Your direct factory reference number is:
            </p>
            <div className="mx-auto my-4 max-w-xs rounded-xl border border-indigo-500/40 bg-[#070913] px-4 py-3 font-mono text-2xl font-black text-indigo-400">
              {orderSuccessNumber}
            </div>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-400">
              Our master digitizers are converting your design into an exact 3D stitch simulation. You will receive an email and WhatsApp message with your free digital proof within 6 hours. Zero payment is needed until you are 100% satisfied with the proof.
            </p>
            <button
              onClick={() => {
                setOrderSuccessNumber(null);
                setArtworkFile(null);
              }}
              className="mt-6 rounded-xl btn-primary-gradient px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer"
            >
              Submit Another Patch Specification
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Instant Factory Quote &amp; Free Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Configure Specs &amp; Submit Your Artwork
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            Choose your dimensions, backing type, and quantity. Upload your artwork to receive a 100% free digital stitch proof within 6 hours + real machine sample photo approval.
          </p>
        </div>

        {/* The Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#0c1020] p-6 shadow-2xl sm:p-10 backdrop-blur-md"
        >
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            
            {/* Left Column: Patch Specifications (7 Cols) */}
            <div className="space-y-8 lg:col-span-7">
              
              {/* 1. Style Selection */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
                  1. Select Patch Material
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {[
                    { id: 'embroidered', name: '🧵 Embroidered', badge: 'Most Popular' },
                    { id: 'pvc_rubber', name: '🛡️ PVC Rubber', badge: 'Tactical Mil-Spec' },
                    { id: 'leatherette', name: '🏷️ Leatherette', badge: 'Hats & Beanies' },
                    { id: 'chenille', name: '🏆 Chenille', badge: 'Varsity Jackets' },
                    { id: 'woven', name: '🎮 Micro-Woven', badge: 'Tiny Lettering' },
                    { id: 'sublimated_printed', name: '🎨 Sublimated', badge: 'Full Gradient' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setStyle(item.id)}
                      className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                        style === item.id
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-md'
                          : 'border-white/10 bg-[#070913] text-slate-400 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xs font-bold">{item.name}</span>
                      <span className="mt-1 text-[10px] font-mono text-indigo-400">{item.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Dimensions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    2. Dimensions (Inches)
                  </label>
                  <span className="font-mono text-xs text-indigo-400 font-bold">
                    Calculated Size: {pricing.avgSize}&quot;
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#070913] p-3.5 rounded-xl border border-white/10">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Width: {width}&quot;</span>
                    <input
                      type="range"
                      min="1.5"
                      max="6.0"
                      step="0.25"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                  <div className="bg-[#070913] p-3.5 rounded-xl border border-white/10">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Height: {height}&quot;</span>
                    <input
                      type="range"
                      min="1.5"
                      max="6.0"
                      step="0.25"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Backing & Border */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    3. Attachment Backing
                  </label>
                  <select
                    value={backing}
                    onChange={(e) => setBacking(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070913] px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-indigo-500"
                  >
                    <option value="velcro_hook_loop">Mil-Spec Hook &amp; Loop (Velcro) (+$0.50)</option>
                    <option value="iron_on">Heat-Seal Thermal Iron-On Film (+$0.25)</option>
                    <option value="sew_on">Heavy Duty Plain Sew-On Edge (+FREE)</option>
                    <option value="peel_and_stick">3M Heavy Peel &amp; Stick (+$0.35)</option>
                    <option value="magnetic">Dual-Plate Magnetic Backing (+$0.95)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    4. Border Edge Finish
                  </label>
                  <select
                    value={border}
                    onChange={(e) => setBorder(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070913] px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-indigo-500"
                  >
                    <option value="merrowed">Classic Overlocked Merrowed Border (1/8&quot; thick)</option>
                    <option value="laser_cut_heat_seal">Precision Laser-Cut Border (Complex Die-Cut)</option>
                  </select>
                </div>
              </div>

              {/* 4. Quantity & Wholesale Tiers */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    5. Quantity (Bulk Wholesale Tiers)
                  </label>
                  {pricing.discountPercent > 0 && (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                      {pricing.discountLabel}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {[25, 50, 100, 250, 500, 1000].map((qtyPreset) => (
                    <button
                      type="button"
                      key={qtyPreset}
                      onClick={() => setQuantity(qtyPreset)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                        quantity === qtyPreset
                          ? 'btn-primary-gradient text-white shadow-md'
                          : 'border border-white/10 bg-[#070913] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {qtyPreset} pcs
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min="10"
                  max="50000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                  className="w-full rounded-xl border border-white/10 bg-[#070913] px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* 5. Artwork Upload */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                  6. Upload Artwork, Sketch, or Logo
                </label>
                <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-[#070913]/60 p-6 transition-colors hover:border-indigo-500/40">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-8 w-8 text-indigo-400 mb-2" />
                    <div className="text-xs text-slate-300">
                      <label className="cursor-pointer font-bold text-indigo-400 hover:underline">
                        <span>Click to select artwork file</span>
                        <input
                          type="file"
                          accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>{' '}
                      or drag &amp; drop
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 font-mono">
                      Accepts AI, PDF, PNG, JPG, SVG, PSD, or phone photos (Max 25MB)
                    </p>
                    {artworkFile && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                        <span>✓ File Loaded: {artworkFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Customer Details & Live Pricing Summary (5 Cols) */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
              
              {/* Contact Information */}
              <div className="space-y-3.5 rounded-2xl border border-white/10 bg-[#070913] p-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Customer &amp; Shipping Contact
                </h4>
                
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Shipping Address (City, State, Postal Code)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Special instructions, thread colors, deadline..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0c1020] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-[#11162e] to-[#070913] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    SPECIFICATION BREAKDOWN
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                    Guaranteed Lock-In
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patch Type:</span>
                    <span className="text-white font-bold capitalize">{style.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dimensions:</span>
                    <span className="text-white font-bold">{width}&quot; × {height}&quot;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantity:</span>
                    <span className="text-white font-bold">{quantity} pieces</span>
                  </div>
                  {pricing.discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      <span>Volume Discount:</span>
                      <span className="font-bold">-{pricing.discountPercent}% OFF (Save ${pricing.totalSavings})</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">UNIT RATE</span>
                    <div className="text-2xl font-black text-indigo-400">${pricing.unitPrice} <span className="text-xs text-slate-500">/ea</span></div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">ESTIMATED TOTAL</span>
                    <div className="text-3xl font-black text-white">${pricing.totalAmount}</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 btn-primary-gradient text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Production Desk...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit for 6-Hour Free Proof</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] font-mono text-slate-400 space-y-1">
                  <div>✓ 100% Free Tajima Digitizing ($45 Value Included)</div>
                  <div>✓ Zero payment needed until you approve the proof</div>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>
    </section>
  );
}

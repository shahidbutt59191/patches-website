'use client';

import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';

// Pricing tiers and configuration rules
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
  sew_on: 0.0,
  peel_and_stick: 0.35,
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

export default function OrderForm() {
  // Spec state
  const [style, setStyle] = useState('embroidered');
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(3.0);
  const [backing, setBacking] = useState('velcro_hook_loop');
  const [border, setBorder] = useState('merrowed');
  const [quantity, setQuantity] = useState(100);

  // Customer info state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessNumber, setOrderSuccessNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Industrial Price Calculation
  // Standard Custom Patch Formula: Average Size = (Width + Height) / 2
  const pricing = useMemo(() => {
    const avgSize = (Number(width) + Number(height)) / 2;
    // Base formula per piece ($1.60 base + $0.55 per average size inch)
    const baseFormulaPrice = 1.6 + avgSize * 0.55;
    const styleMultiplied = baseFormulaPrice * (STYLE_MULTIPLIERS[style] || 1.0);
    const withBacking = styleMultiplied + (BACKING_ADDONS[backing] || 0.0);

    const activeTier = QUANTITY_DISCOUNT_TIERS.find((t) => quantity >= t.min) || {
      discount: 0,
      label: 'Standard',
    };

    const discountedUnitPrice = Number((withBacking * (1 - activeTier.discount)).toFixed(2));
    const finalUnitPrice = Math.max(discountedUnitPrice, 0.75); // Factory floor minimum
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
        throw new Error(data.error || 'Failed to submit order');
      }

      setOrderSuccessNumber(data.orderNumber);
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
      <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/90 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
          <svg className="h-8 w-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white">Order Successfully Submitted!</h3>
        <p className="mt-2 text-sm text-slate-300">
          Your factory reference number is:
        </p>
        <div className="mx-auto my-4 max-w-xs rounded-xl border border-amber-500/40 bg-slate-950 px-4 py-3 font-mono text-xl font-black text-amber-400">
          {orderSuccessNumber}
        </div>
        <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-400">
          Our Tajima digitizing team is preparing your free high-definition stitch proof. You will receive an email and WhatsApp message within 6 hours for proof approval before production begins.
        </p>
        <button
          onClick={() => {
            setOrderSuccessNumber(null);
            setArtworkFile(null);
          }}
          className="mt-6 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
        >
          Build Another Patch Order
        </button>
      </div>
    );
  }

  return (
    <form
      id="order-form"
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        
        {/* Left Column: Patch Specifications */}
        <div className="space-y-8 lg:col-span-7">
          
          {/* 1. Style Selection */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
              1. Choose Patch Material & Style
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                { id: 'embroidered', name: '100% Embroidered', badge: 'Most Popular' },
                { id: 'pvc_rubber', name: '3D PVC Rubber', badge: 'Tactical Mil-Spec' },
                { id: 'leatherette', name: 'Laser Leatherette', badge: 'Hats & Outerwear' },
                { id: 'chenille', name: 'Varsity Chenille', badge: 'Vintage Jackets' },
                { id: 'woven', name: 'Jacquard Woven', badge: 'Micro-Detail' },
                { id: 'sublimated_printed', name: 'Dye Sublimated', badge: 'Photo Real' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setStyle(item.id)}
                  className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                    style === item.id
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-md shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold">{item.name}</span>
                  <span className="mt-1 text-[10px] font-mono text-amber-400/80">{item.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dimensions */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                2. Dimensions (Inches)
              </label>
              <span className="font-mono text-xs text-amber-400">
                Calculated Size: {pricing.avgSize}&quot;
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Width: {width}&quot;</span>
                <input
                  type="range"
                  min="1.5"
                  max="6.0"
                  step="0.25"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-amber-500"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400">Height: {height}&quot;</span>
                <input
                  type="range"
                  min="1.5"
                  max="6.0"
                  step="0.25"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-amber-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Backing & Border */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                3. Backing Attachment
              </label>
              <select
                value={backing}
                onChange={(e) => setBacking(e.target.value)}
                className="mt-2.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-amber-500"
              >
                <option value="velcro_hook_loop">Mil-Spec Hook & Loop (Velcro) (+$0.50)</option>
                <option value="iron_on">Heat-Seal Iron-On Film (+$0.25)</option>
                <option value="sew_on">Heavy Duty Sew-On Edge (+FREE)</option>
                <option value="peel_and_stick">3M Peel & Stick Adhesive (+$0.35)</option>
                <option value="magnetic">Dual-Plate Magnetic Backing (+$0.95)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                4. Border Edge Finish
              </label>
              <select
                value={border}
                onChange={(e) => setBorder(e.target.value)}
                className="mt-2.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-amber-500"
              >
                <option value="merrowed">Classic Overlocked Merrowed Edge</option>
                <option value="laser_cut_heat_seal">Precision Laser-Cut Edge (Complex Shapes)</option>
              </select>
            </div>
          </div>

          {/* 4. Quantity & Volume Tier Quick Buttons */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                5. Quantity (Bulk Wholesale Tiers)
              </label>
              {pricing.discountPercent > 0 && (
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                  {pricing.discountLabel}
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {[25, 50, 100, 250, 500, 1000].map((qtyPreset) => (
                <button
                  type="button"
                  key={qtyPreset}
                  onClick={() => setQuantity(qtyPreset)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition-colors ${
                    quantity === qtyPreset
                      ? 'bg-amber-500 text-black'
                      : 'border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
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
              className="mt-3 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-amber-500"
            />
          </div>

          {/* 5. Artwork Upload */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
              6. Artwork / Logo Upload
            </label>
            <div className="mt-2.5 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/60 p-6 transition-colors hover:border-amber-500/40">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <div className="mt-2 text-xs text-slate-300">
                  <label className="cursor-pointer font-bold text-amber-400 hover:underline">
                    <span>Click to select file</span>
                    <input
                      type="file"
                      accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>{' '}
                  or drag and drop
                </div>
                <p className="mt-1 text-[10px] text-slate-500 font-mono">
                  Supported: AI, PDF, PNG, JPG, PSD, SVG (Max 25MB)
                </p>
                {artworkFile && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-mono text-amber-400">
                    <span>✓ Loaded: {artworkFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details & Live Pricing Summary */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
          
          {/* Customer Details Form */}
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer & Shipping Details
            </h4>
            
            <div>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="email"
                required
                placeholder="Work / Personal Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
              <input
                type="tel"
                required
                placeholder="Phone (WhatsApp/SMS) *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <textarea
                rows={2}
                required
                placeholder="Complete Shipping Address (Street, City, Zip, Country) *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Special Thread / PMS Color Codes / Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tajima Factory Price Breakdown
            </h4>

            <div className="mt-4 space-y-2 border-b border-slate-800 pb-4 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Unit Price ({quantity} pcs tier):</span>
                <span className="font-bold text-white">${pricing.unitPrice.toFixed(2)} / ea</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Size & Shape:</span>
                <span>{width}&quot; × {height}&quot; ({pricing.avgSize}&quot;)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tajima Digitizing Setup:</span>
                <span className="font-bold text-emerald-400">FREE ($45 Value)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Digital Sample Proof:</span>
                <span className="font-bold text-emerald-400">FREE in 6 Hours</span>
              </div>
              {pricing.totalSavings > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Bulk Discount Savings:</span>
                  <span>-${pricing.totalSavings.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase text-white">Total Order Value:</span>
              <span className="font-mono text-2xl font-black text-amber-400">
                ${pricing.totalAmount.toFixed(2)}
              </span>
            </div>

            {errorMessage && (
              <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-950/40 p-2.5 text-xs text-rose-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Processing Factory Order...</span>
                </>
              ) : (
                <span>Submit Order & Receive Digital Proof</span>
              )}
            </button>
            <p className="mt-2 text-center text-[10px] text-slate-500">
              No immediate charge. Pay only after approving your digital stitch proof.
            </p>
          </div>

        </div>
      </div>
    </form>
  );
}

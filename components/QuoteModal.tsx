'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import { X, UploadCloud, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStyle?: string;
  initialWidth?: number;
  initialHeight?: number;
  initialBacking?: string;
  initialQuantity?: number;
}

export default function QuoteModal({
  isOpen,
  onClose,
  defaultStyle = 'embroidered',
  initialWidth = 3.0,
  initialHeight = 3.0,
  initialBacking = 'iron_on',
  initialQuantity = 100,
}: QuoteModalProps) {
  const [style, setStyle] = useState(defaultStyle);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [backing, setBacking] = useState(initialBacking);
  const [quantity, setQuantity] = useState(initialQuantity);

  // Customer Contact
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    if (defaultStyle) setStyle(defaultStyle);
  }, [defaultStyle]);

  useEffect(() => {
    if (initialWidth) setWidth(initialWidth);
    if (initialHeight) setHeight(initialHeight);
    if (initialBacking) setBacking(initialBacking);
    if (initialQuantity) setQuantity(initialQuantity);
  }, [initialWidth, initialHeight, initialBacking, initialQuantity]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dynamic pricing calculation
  const pricing = useMemo(() => {
    const size = Math.max(1.5, (width + height) / 2);
    let base = 1.95 + size * 0.45;

    // Style adjustment
    if (style === 'pvc') base *= 1.25;
    if (style === 'leather') base *= 1.15;
    if (style === 'woven') base *= 0.95;
    if (style === 'velcro') base += 0.35;

    // Backing addon
    if (backing === 'velcro_hook_loop') base += 0.45;
    if (backing === 'iron_on') base += 0.20;

    // Quantity discounts
    let discount = 0;
    if (quantity >= 1000) discount = 0.50;
    else if (quantity >= 500) discount = 0.40;
    else if (quantity >= 250) discount = 0.30;
    else if (quantity >= 100) discount = 0.22;
    else if (quantity >= 50) discount = 0.12;

    const unitPrice = Math.max(0.95, base * (1 - discount));
    const totalPrice = unitPrice * quantity;

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discountPercent: Math.round(discount * 100),
    };
  }, [style, width, height, backing, quantity]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtworkFile(file);
      // Generate object URL for instant preview
      try {
        setArtworkPreviewUrl(URL.createObjectURL(file));
      } catch (err) {
        console.error('Error generating preview:', err);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', 'Free Courier Delivery (Confirmed upon digital proof)');
      formData.append('notes', notes);
      formData.append('style', style);
      formData.append('width', String(width));
      formData.append('height', String(height));
      formData.append('backing', backing);
      formData.append('border', 'merrowed');
      formData.append('quantity', String(quantity));
      formData.append('unitPrice', pricing.unitPrice);
      formData.append('totalAmount', pricing.totalPrice);
      formData.append('discountPercentage', String(pricing.discountPercent));

      if (artworkFile) {
        formData.append('artwork', artworkFile);
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit quote request');

      setOrderSuccess(data.order || { id: data.orderNumber, ref_code: data.orderNumber });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#111318] text-white px-6 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-base shadow-sm">
              B
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Get a Free Custom Patch Quote</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  ⚡ 6-Hour Proof
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                100% Free Digitizing • No Obligation • Factory Direct Pricing
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {orderSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">Quote Request Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your custom quote reference is{' '}
                <span className="font-mono font-bold text-orange-600">
                  #{orderSuccess.id?.slice(0, 8) || orderSuccess.ref_code || 'BD-CONFIRMED'}
                </span>
                . Our digitizers will prepare your 6-hour digital embroidery proof and contact you at{' '}
                <strong>{email}</strong>.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="btn-orange px-8 py-3 rounded-full text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
                <a
                  href={`https://wa.me/18005557282?text=Hi%20BDigitizing!%20I%20just%20submitted%20quote%20request%20%23${orderSuccess.id?.slice(0, 8) || orderSuccess.ref_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-emerald-500 text-emerald-700 bg-emerald-50 text-xs font-bold hover:bg-emerald-100 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Track on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Controls (7 Columns) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. Patch Style Selection */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Select Patch Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'embroidered', label: 'Embroidered' },
                      { id: 'iron-on', label: 'Iron-On' },
                      { id: 'velcro', label: 'Velcro Tactical' },
                      { id: 'woven', label: 'Woven Jacquard' },
                      { id: 'leather', label: 'Debossed Leather' },
                      { id: 'pvc', label: '3D Soft PVC' },
                    ].map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left cursor-pointer ${
                          style === s.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-2xs'
                            : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Dimensions & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                      <span>Width: {width}&quot;</span>
                      <span>Height: {height}&quot;</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.25"
                        min="1.5"
                        max="6.0"
                        value={width}
                        onChange={(e) => setWidth(parseFloat(e.target.value) || 3)}
                        className="w-1/2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-orange-500 outline-none"
                        placeholder="Width"
                      />
                      <input
                        type="number"
                        step="0.25"
                        min="1.5"
                        max="6.0"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 3)}
                        className="w-1/2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-orange-500 outline-none"
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                      <span>Quantity: {quantity} pcs</span>
                      {pricing.discountPercent > 0 && (
                        <span className="text-emerald-600 font-bold">{pricing.discountPercent}% OFF</span>
                      )}
                    </div>
                    <input
                      type="number"
                      min="10"
                      step="10"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                {/* 3. Backing */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    3. Attachment Backing
                  </label>
                  <select
                    value={backing}
                    onChange={(e) => setBacking(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:border-orange-500 outline-none"
                  >
                    <option value="iron_on">Heat-Seal Thermal Iron-On (Standard)</option>
                    <option value="velcro_hook_loop">Mil-Spec Velcro (Hook &amp; Loop) (+ $0.45)</option>
                    <option value="sew_on">Traditional Plain Sew-On Edge (Free)</option>
                    <option value="peel_stick">3M Pressure Sensitive Peel &amp; Stick</option>
                  </select>
                </div>

                {/* 4. Artwork Upload */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    4. Upload Logo / Artwork
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-orange-400 transition-colors bg-slate-50/50">
                    <UploadCloud className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                    <label className="cursor-pointer text-xs font-bold text-orange-600 hover:underline">
                      <span>Click to choose file</span>
                      <input
                        type="file"
                        accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <span className="text-xs text-slate-500"> or drag and drop</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Accepts PNG, JPG, PDF, SVG, AI, PSD (Max 25MB)
                    </p>
                    {artworkFile && (
                      <p className="text-xs font-bold text-emerald-600 mt-2">
                        ✓ Selected: {artworkFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none sm:col-span-2"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

              </div>

              {/* Right Column: Live Stitched Artwork Mockup & Price Summary (5 Columns) */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-6">
                
                {/* Simulated Stitched Patch Canvas */}
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                    <span>Live Patch Simulation</span>
                    <span className="text-[10px] font-mono text-orange-600 font-bold">
                      {width}&quot; × {height}&quot;
                    </span>
                  </div>

                  <div className="relative aspect-square max-w-[240px] mx-auto rounded-3xl bg-[#141720] border-4 border-orange-500 p-4 shadow-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-fabric-pattern opacity-95 pointer-events-none" />
                    
                    {artworkPreviewUrl ? (
                      <div className="relative z-10 text-center">
                        <img
                          src={artworkPreviewUrl}
                          alt="Artwork preview"
                          className="max-h-28 max-w-28 object-contain mx-auto filter drop-shadow-md"
                        />
                        <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mt-2">
                          Digital Stitched Proof
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 text-center space-y-2 text-slate-400">
                        <div className="w-12 h-12 rounded-full border border-dashed border-orange-400/50 flex items-center justify-center mx-auto text-orange-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-[11px] font-semibold text-slate-300">
                          Your Logo Stitched Here
                        </p>
                        <p className="text-[9px] text-slate-500">
                          Select a file to preview inside patch
                        </p>
                      </div>
                    )}

                    {/* Stitched Edge Detail */}
                    <div className="absolute inset-2 border-2 border-dashed border-orange-300/40 rounded-2xl pointer-events-none" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-600">Total ({quantity} patches)</span>
                    <span className="text-2xl font-black text-orange-600 font-mono">
                      ${pricing.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Price per patch</span>
                    <span className="font-mono font-bold text-slate-800">${pricing.unitPrice} / each</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Worldwide Shipping</span>
                    <span className="text-emerald-600 font-bold">100% Free Tracked Courier</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Digital Proof</span>
                    <span className="text-orange-600 font-bold">Free in 6 Hours</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-orange py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Your Quote...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

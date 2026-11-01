'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import { X, UploadCloud, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStyle?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultStyle = 'embroidered' }: QuoteModalProps) {
  const [style, setStyle] = useState(defaultStyle);
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(3.0);
  const [backing, setBacking] = useState('iron_on');
  const [quantity, setQuantity] = useState(100);

  // Customer Contact
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    if (defaultStyle) setStyle(defaultStyle);
  }, [defaultStyle]);

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
      setArtworkFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      let artworkUrl = '';

      // Upload artwork if present
      if (artworkFile) {
        const formData = new FormData();
        formData.append('file', artworkFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          artworkUrl = uploadData.url || '';
        }
      }

      // Submit Order
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          shippingAddress: 'Free Courier Delivery (Confirmed upon digital proof)',
          patchStyle: style,
          sizeWidth: width,
          sizeHeight: height,
          backing,
          border: 'merrowed',
          quantity,
          unitPrice: parseFloat(pricing.unitPrice),
          totalPrice: parseFloat(pricing.totalPrice),
          notes,
          artworkUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit quote request');

      setOrderSuccess(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#111318] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-sm">
              B
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Get a Free Instant Quote</h3>
              <p className="text-[11px] text-slate-400">100% Free Digital Proof • No Obligation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {orderSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">Quote Request Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your custom quote reference is{' '}
                <span className="font-mono font-bold text-orange-600">
                  #{orderSuccess.id?.slice(0, 8) || 'BD-CONFIRMED'}
                </span>
                . Our digitizers will prepare your 6-hour digital embroidery proof and contact you at{' '}
                <strong>{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="btn-orange px-8 py-3 rounded-full text-sm font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. Patch Style Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Select Patch Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                    <span>Patch Width: {width}&quot;</span>
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
                      className="w-1/2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                      placeholder="Width (inches)"
                    />
                    <input
                      type="number"
                      step="0.25"
                      min="1.5"
                      max="6.0"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 3)}
                      className="w-1/2 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                      placeholder="Height (inches)"
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
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* 3. Backing */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Backing Attachment
                </label>
                <select
                  value={backing}
                  onChange={(e) => setBacking(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
                >
                  <option value="iron_on">Heat-Seal Thermal Iron-On (Standard)</option>
                  <option value="velcro_hook_loop">Mil-Spec Velcro (Hook &amp; Loop) (+ $0.45)</option>
                  <option value="sew_on">Traditional Plain Sew-On Edge (Free)</option>
                  <option value="peel_stick">3M Pressure Sensitive Peel &amp; Stick</option>
                </select>
              </div>

              {/* 4. Artwork Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Upload Logo / Design
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-orange-400 transition-colors bg-slate-50/50">
                  <UploadCloud className="w-6 h-6 text-orange-500 mx-auto mb-1.5" />
                  <label className="cursor-pointer text-xs font-bold text-orange-600 hover:underline">
                    <span>Select artwork file</span>
                    <input
                      type="file"
                      accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    PNG, JPG, PDF, AI, PSD, SVG (Max 25MB)
                  </p>
                  {artworkFile && (
                    <p className="text-xs font-bold text-emerald-600 mt-2">
                      ✓ Selected: {artworkFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* 5. Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium sm:col-span-2"
                />
              </div>

              {/* Live Estimate Card */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-orange-700 font-bold">
                    Estimated Price ({quantity} pcs)
                  </div>
                  <div className="text-xs text-slate-500">
                    Includes Free Worldwide Courier Delivery
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-orange-600 font-mono">
                    ${pricing.totalPrice}
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono">
                    (${pricing.unitPrice} / each)
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-orange py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { X, PackageCheck, Check, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleKitModal({ isOpen, onClose }: SampleKitModalProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) {
      setError('Please provide your name, email, and full postal shipping address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          address,
          notes: `[SAMPLE KIT REQUEST] Company: ${company || 'N/A'}. Project Details: ${notes || 'None provided'}`,
          patchType: 'sample_kit',
          backing: 'all_swatches',
          border: 'mixed',
          width: 3.5,
          height: 3.5,
          quantity: 1,
          unitPrice: 0.0,
          totalAmount: 0.0,
          status: 'sample_kit_requested',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessId(data.orderNumber || 'SK-' + Math.floor(100000 + Math.random() * 900000));
      } else {
        setError(data.error || 'Failed to dispatch sample kit request. Please try again.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again or message via WhatsApp.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c1022] border border-white/20 p-6 sm:p-8 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {successId ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <PackageCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Sample Kit Dispatched for Processing
            </span>
            <h3 className="text-2xl font-black text-white">Your Swatch Box Is On Its Way!</h3>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
              We have received your postal address. Your reference number is{' '}
              <span className="font-mono font-bold text-indigo-400">{successId}</span>. Our fulfillment desk will notify you with the courier tracking code.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>For Brands, Outfitters &amp; Agencies</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Request a Physical Factory Swatch Box
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Feel thread density, test Velcro shear resistance, and compare materials in your hands before placing bulk production orders.
            </p>

            {/* What is inside the box */}
            <div className="my-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <div className="font-bold text-indigo-300 font-mono uppercase tracking-wider mb-2 text-[11px]">
                📦 What is inside your sample kit:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real 100% Tajima High-Density Patch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mil-Spec 3D Liquid PVC Morale Patch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Laser Debossed Caramel Leatherette</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Micro-Thread Jacquard Woven Patch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Complete 5-Backing Swatch Ring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Madeira Thread Color Reference Card</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Tactical Gear"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                  Full Postal Shipping Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, Suite/Unit, City, State/Province, Postal Code, Country"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase font-bold mb-1">
                  Upcoming Project Details (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Planning 500 PVC morale patches for Q3 product release"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching Request...</span>
                    </>
                  ) : (
                    <span>Ship My Sample Swatch Kit →</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

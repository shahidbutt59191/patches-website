'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Clock,
  Truck,
  RotateCcw,
  Check,
} from 'lucide-react';

import { SiteSettings } from '@/lib/settings';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStyle?: string;
  initialWidth?: number;
  initialHeight?: number;
  initialBacking?: string;
  initialQuantity?: number;
  priceSettings?: Partial<SiteSettings>;
}

const PATCH_STYLES = [
  { id: 'embroidered', label: '100% Embroidered', badge: 'Most Popular' },
  { id: 'iron-on', label: 'Heat-Seal Iron-On', badge: 'Fast Press' },
  { id: 'velcro', label: 'Tactical Velcro', badge: 'Combat Grade' },
  { id: 'woven', label: 'Micro Woven', badge: '0.5mm Precision' },
  { id: 'leather', label: 'Debossed Leather', badge: 'Rustic Luxury' },
  { id: 'pvc', label: '3D Soft PVC', badge: '100% Waterproof' },
  { id: 'chenille', label: 'Vintage Chenille', badge: 'Varsity Loop' },
  { id: 'sublimated', label: 'Photo Sublimated', badge: '1200 DPI HD' },
];

export default function QuoteModal({
  isOpen,
  onClose,
  defaultStyle = 'embroidered',
  initialWidth = 3.0,
  initialHeight = 3.0,
  initialBacking = 'iron_on',
  initialQuantity = 100,
  priceSettings,
}: QuoteModalProps) {
  const [style, setStyle] = useState(defaultStyle);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [backing, setBacking] = useState(initialBacking);
  const [quantity, setQuantity] = useState(initialQuantity);

  // Customer Contact & Details
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

  // Lock background scroll when full-page modal is open & add Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  // Dynamic pricing calculation across all 8 patch styles
  const pricing = useMemo(() => {
    const size = Math.max(1.5, (width + height) / 2);
    let base = (priceSettings?.priceEmbroidered ?? 1.85) + (size - 1.5) * 0.45;

    // Style adjustment using live admin priceSettings
    if (style === 'pvc') base = (priceSettings?.pricePvc ?? 2.55) + (size - 1.5) * 0.50;
    else if (style === 'leather') base = (priceSettings?.priceLeather ?? 2.45) + (size - 1.5) * 0.45;
    else if (style === 'woven') base = (priceSettings?.priceWoven ?? 1.65) + (size - 1.5) * 0.40;
    else if (style === 'velcro') base = (priceSettings?.priceVelcro ?? 2.35) + (size - 1.5) * 0.45;
    else if (style === 'iron-on' || style === 'iron_on') base = (priceSettings?.priceIronOn ?? 1.95) + (size - 1.5) * 0.45;
    else if (style === 'chenille') base = 2.65 + (size - 1.5) * 0.50;
    else if (style === 'sublimated') base = 1.75 + (size - 1.5) * 0.40;

    // Backing addon
    if (backing === 'velcro_hook_loop' || backing === 'velcro') base += (priceSettings?.velcroFee ?? 0.45);
    else if (backing === 'iron_on') base += (priceSettings?.ironOnFee ?? 0.20);
    else if (backing === 'peel_stick' || backing === 'peel_and_stick') base += (priceSettings?.peelStickFee ?? 0.35);

    // Quantity discounts
    let discount = 0;
    if (quantity >= 1000) discount = 0.50;
    else if (quantity >= 500) discount = 0.40;
    else if (quantity >= 250) discount = 0.30;
    else if (quantity >= 100) discount = 0.22;
    else if (quantity >= 50) discount = 0.12;

    const unitPrice = Math.max(0.75, base * (1 - discount));
    const totalPrice = unitPrice * quantity;

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discountPercent: Math.round(discount * 100),
    };
  }, [style, width, height, backing, quantity, priceSettings]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtworkFile(file);
      try {
        setArtworkPreviewUrl(URL.createObjectURL(file));
      } catch (err) {
        console.error('Error generating preview:', err);
      }
    }
  };

  const handleRemoveFile = () => {
    setArtworkFile(null);
    setArtworkPreviewUrl(null);
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
    <div className="fixed inset-0 z-50 bg-[#0c0e14] text-slate-900 overflow-y-auto flex flex-col w-full h-full min-h-screen animate-in fade-in duration-200">
      
      {/* 1. Full-Width Edge-to-Edge Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a] text-white px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-neutral-800 shadow-xl shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1dbf73] text-white flex items-center justify-center font-black text-lg shadow-md">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
                Get a Free Custom Patch Quote
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                ⚡ 6-Hour Proof
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              100% Free Digitizing Setup • No Obligation • Factory-Direct Wholesale Pricing
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/18005557282?text=Hi%20BDigitizing!%20I%20have%20a%20question%20about%20a%20custom%20patch%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-slate-700 shadow-sm"
            title="Close Quote Studio (Esc)"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Main Expansive Page Body */}
      <main className="flex-1 w-full bg-slate-50/70 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {orderSuccess ? (
            <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xl space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Quote Request Received!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Your custom quote reference is{' '}
                <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  #{orderSuccess.id?.slice(0, 8) || orderSuccess.ref_code || 'BD-CONFIRMED'}
                </span>
                . Our digitizers are reviewing your artwork and will email your 6-hour digital embroidery stitch proof to{' '}
                <strong className="text-slate-900">{email}</strong>.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="btn-orange px-8 py-3 rounded-xl text-xs font-bold cursor-pointer shadow-lg"
                >
                  Return to Website
                </button>
                <a
                  href={`https://wa.me/18005557282?text=Hi%20BDigitizing!%20I%20just%20submitted%20quote%20request%20%23${orderSuccess.id?.slice(0, 8) || orderSuccess.ref_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Track on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Comprehensive Quote Form (7 Columns) */}
              <div className="lg:col-span-7 xl:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                
                {/* 1. Patch Style Selection (All 8 Styles) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                      1. Select Patch Style
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      All 8 Commercial Specifications
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PATCH_STYLES.map((s) => {
                      const isSelected = style === s.id;
                      return (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setStyle(s.id)}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative group flex flex-col justify-between ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/70 text-orange-900 shadow-sm ring-2 ring-orange-500/20'
                              : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md bg-white/80 border border-slate-200/60 text-slate-500 group-hover:text-orange-600">
                              {s.badge}
                            </span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-orange-500" />
                            )}
                          </div>
                          <span className="text-xs font-bold leading-snug">
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Dimensions & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                  
                  {/* Dimensions */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
                      <label className="font-mono uppercase tracking-wider">
                        2. Dimensions (Inches)
                      </label>
                      <span className="text-orange-600 font-mono font-bold">
                        {width}&quot; × {height}&quot; (Ø {((width + height) / 2).toFixed(1)}&quot;)
                      </span>
                    </div>

                    <div className="flex gap-2.5 mb-2.5">
                      <div className="w-1/2 relative">
                        <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400 font-bold">W:</span>
                        <input
                          type="number"
                          step="0.25"
                          min="1.5"
                          max="6.0"
                          value={width}
                          onChange={(e) => setWidth(parseFloat(e.target.value) || 3)}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono focus:border-orange-500 outline-none bg-slate-50/40"
                          placeholder="Width"
                        />
                      </div>
                      <div className="w-1/2 relative">
                        <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400 font-bold">H:</span>
                        <input
                          type="number"
                          step="0.25"
                          min="1.5"
                          max="6.0"
                          value={height}
                          onChange={(e) => setHeight(parseFloat(e.target.value) || 3)}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono focus:border-orange-500 outline-none bg-slate-50/40"
                          placeholder="Height"
                        />
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-mono">Popular:</span>
                      {[
                        { w: 2.5, h: 2.5, label: '2.5"' },
                        { w: 3.0, h: 3.0, label: '3.0"' },
                        { w: 3.5, h: 3.5, label: '3.5"' },
                        { w: 4.0, h: 4.0, label: '4.0"' },
                      ].map((preset) => (
                        <button
                          type="button"
                          key={preset.label}
                          onClick={() => {
                            setWidth(preset.w);
                            setHeight(preset.h);
                          }}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                            width === preset.w && height === preset.h
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
                      <label className="font-mono uppercase tracking-wider">
                        Order Quantity (Pcs)
                      </label>
                      {pricing.discountPercent > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                          {pricing.discountPercent}% Bulk Discount Applied
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Min. 10 pcs</span>
                      )}
                    </div>

                    <div className="relative mb-2.5">
                      <input
                        type="number"
                        min="10"
                        step="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono focus:border-orange-500 outline-none bg-slate-50/40"
                      />
                    </div>

                    {/* Quick Quantity Presets */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-mono">Tiers:</span>
                      {[
                        { q: 50, label: '50' },
                        { q: 100, label: '100' },
                        { q: 250, label: '250' },
                        { q: 500, label: '500' },
                        { q: 1000, label: '1000+' },
                      ].map((tier) => (
                        <button
                          type="button"
                          key={tier.label}
                          onClick={() => setQuantity(tier.q)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                            quantity === tier.q
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 3. Attachment Backing Selection */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                    3. Attachment Backing &amp; Fastener
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'iron_on', label: 'Heat-Seal Thermal Iron-On', desc: 'Pre-coated thermal film, adheres in 20s (Free)', fee: 0 },
                      { id: 'velcro_hook_loop', label: 'Tactical Mil-Spec Velcro', desc: 'Pre-sewn hook & soft loop fabric (+ $0.45/ea)', fee: 0.45 },
                      { id: 'sew_on', label: 'Traditional Plain Sew-On', desc: 'Zero glue, perimeter sewing canal (Free)', fee: 0 },
                      { id: 'peel_stick', label: '3M Heavy Pressure Sensitive', desc: 'Peel & stick temporary application (+ $0.35/ea)', fee: 0.35 },
                    ].map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => setBacking(b.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          backing === b.id || (backing === 'velcro' && b.id === 'velcro_hook_loop')
                            ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-slate-900">{b.label}</span>
                          {(backing === b.id || (backing === 'velcro' && b.id === 'velcro_hook_loop')) && (
                            <Check className="w-3.5 h-3.5 text-orange-600" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block">{b.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Logo / Artwork Upload Zone */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-2">
                    4. Upload Logo / Artwork File
                  </label>
                  
                  {artworkFile ? (
                    <div className="border border-emerald-200 bg-emerald-50/60 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {artworkPreviewUrl && (
                          <img
                            src={artworkPreviewUrl}
                            alt="Uploaded artwork"
                            className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 p-1"
                          />
                        )}
                        <div>
                          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{artworkFile.name}</span>
                          </div>
                          <span className="text-[11px] text-emerald-700 font-mono">
                            {(artworkFile.size / 1024 / 1024).toFixed(2)} MB • Ready for Tajima digitizing
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 text-center hover:border-orange-500 transition-colors bg-slate-50/50 group">
                      <UploadCloud className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <label className="cursor-pointer text-xs font-bold text-orange-600 hover:underline">
                        <span>Click to browse your files</span>
                        <input
                          type="file"
                          accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg,.psd"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <span className="text-xs text-slate-500"> or drag and drop here</span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Accepts Vector (AI, EPS, PDF, SVG) &amp; High-Res Raster (PNG, JPG, PSD) up to 25MB
                      </p>
                    </div>
                  )}
                </div>

                {/* 5. Contact Information & Instructions */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    5. Contact &amp; Delivery Details
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none bg-slate-50/40"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address (For 6-Hour Proof) *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none bg-slate-50/40"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none bg-slate-50/40 sm:col-span-2"
                    />
                    <textarea
                      rows={2}
                      placeholder="Special instructions (e.g. metallic gold thread, specific Pantone shade, velcro side, deadline date)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-orange-500 outline-none bg-slate-50/40 sm:col-span-2"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

              </div>

              {/* Right Column: Sticky Live Simulation & Price Summary (5 Columns) */}
              <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6 lg:sticky lg:top-24">
                
                {/* Simulated Stitched Patch Canvas */}
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                    <span>Live Simulation</span>
                    <span className="text-[11px] font-mono text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {width}&quot; × {height}&quot;
                    </span>
                  </div>

                  <div className="relative aspect-square max-w-[260px] mx-auto rounded-3xl bg-[#141720] border-4 border-orange-500 p-4 shadow-xl flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-fabric-pattern opacity-95 pointer-events-none" />
                    
                    {artworkPreviewUrl ? (
                      <div className="relative z-10 text-center animate-in zoom-in-95">
                        <img
                          src={artworkPreviewUrl}
                          alt="Artwork preview"
                          className="max-h-32 max-w-32 object-contain mx-auto filter drop-shadow-lg"
                        />
                        <div className="text-[10px] text-orange-400 font-mono font-bold uppercase tracking-wider mt-2.5">
                          Tajima Digital Proof
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 text-center space-y-2 text-slate-400">
                        <div className="w-12 h-12 rounded-full border border-dashed border-orange-400/50 flex items-center justify-center mx-auto text-orange-400 bg-orange-500/10">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-200">
                          Your Logo Stitched Here
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Upload file on the left to preview inside patch
                        </p>
                      </div>
                    )}

                    {/* Stitched Edge Detail */}
                    <div className="absolute inset-2 border-2 border-dashed border-orange-400/40 rounded-2xl pointer-events-none" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Total Amount
                      </span>
                      <span className="text-[11px] text-slate-400">
                        All inclusive for {quantity} patches
                      </span>
                    </div>
                    <span className="text-3xl font-black text-[#109655] font-mono tracking-tight">
                      ${pricing.totalPrice}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Unit Price</span>
                      <span className="font-mono font-bold text-slate-900">${pricing.unitPrice} / each</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Worldwide Shipping</span>
                      <span className="text-[#109655] font-bold flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>100% Free Tracked</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Digital Proof</span>
                      <span className="text-[#1dbf73] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Free in 6 Hours</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-fiverr py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:scale-[1.01] transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Quote Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust Guarantees */}
                <div className="text-center space-y-1.5 pt-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>No Obligation • 100% Money-Back Quality Guarantee</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Questions? Chat directly with a factory master on{' '}
                    <a
                      href="https://wa.me/18005557282"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-bold hover:underline"
                    >
                      WhatsApp
                    </a>
                  </p>
                </div>

              </div>

            </form>
          )}

        </div>
      </main>

    </div>
  );
}

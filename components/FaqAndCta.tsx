'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, HelpCircle, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { FaqItem, DEFAULT_FAQS } from '@/lib/settings';

interface FaqAndCtaProps {
  onOpenQuote?: () => void;
  promoCode?: string;
  discountRate?: number;
  items?: FaqItem[];
}

export default function FaqAndCta({
  onOpenQuote,
  promoCode = 'BDIGITIZE15',
  discountRate = 15,
  items,
}: FaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const faqs = (items && items.length > 0 ? items : DEFAULT_FAQS).filter((f) => f.active !== false);

  const filteredFaqs = filterCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === filterCategory);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-22 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: FAQ Accordion (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#109655] text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Instant Answers</span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Find answers to common questions about our custom patch manufacturing process.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'ordering', label: 'Ordering & MOQ' },
                { id: 'turnaround', label: 'Turnaround' },
                { id: 'shipping', label: 'Shipping' },
                { id: 'artwork', label: 'Artwork & Colors' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    filterCategory === c.id
                      ? 'bg-[#1dbf73] text-white border-[#1dbf73]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Accordion Pills */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:border-[#1dbf73]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#1dbf73] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 text-slate-400 group-hover:text-[#1dbf73]">
                      {openIndex === idx ? (
                        <Minus className="w-4 h-4 text-[#1dbf73]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {openIndex === idx && (
                    <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Fiverr Dark CTA Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#222325] p-8 sm:p-10 text-white shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between border border-neutral-800">
              
              {/* Subtle Stitched Watermark in Bottom-Right */}
              <div className="absolute -bottom-6 -right-6 opacity-15 pointer-events-none transform rotate-12 text-[#1dbf73]">
                <svg className="w-56 h-48 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>

              {/* Top Promo Tag */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-[#1dbf73]/20 border border-[#1dbf73]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#1dbf73] mb-4">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Special Launch: {discountRate}% Off Code: {promoCode}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Ready to manufacture your custom patches?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                  Get a free instant quote today and bring your design to life with direct factory pricing!
                </p>
              </div>

              {/* Bullet perks inside CTA */}
              <div className="relative z-10 space-y-2 py-4 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1dbf73]" />
                  <span>Free 6-Hour Digital Scan Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1dbf73]" />
                  <span>Free Worldwide Express Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1dbf73]" />
                  <span>Zero Digitizing &amp; Setup Surcharges</span>
                </div>
              </div>

              {/* Green Action Button */}
              <div className="relative z-10 pt-2">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="btn-fiverr px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Get a Free Quote Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

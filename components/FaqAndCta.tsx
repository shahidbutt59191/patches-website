'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, HelpCircle, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { GoldenCrownPatch } from './PatchVisuals';

interface FaqAndCtaProps {
  onOpenQuote?: () => void;
}

export default function FaqAndCta({ onOpenQuote }: FaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const faqs = [
    {
      category: 'turnaround',
      q: 'What is the turnaround time?',
      a: 'Our standard production turnaround is 10 to 14 business days from digital proof approval. We also offer rush 5-7 business day service for urgent team or corporate event deadlines.',
    },
    {
      category: 'shipping',
      q: 'Do you offer free shipping?',
      a: 'Yes! We provide 100% free tracked courier delivery worldwide on all custom patch orders. You never pay unexpected customs or freight surcharges.',
    },
    {
      category: 'ordering',
      q: 'Can I get a sample before bulk order?',
      a: 'Absolutely. We send high-resolution digital embroidery scan proofs for every order with unlimited revisions. Pre-production physical sewn samples can also be manufactured and mailed for master verification.',
    },
    {
      category: 'ordering',
      q: 'What is your minimum order quantity (MOQ)?',
      a: 'Our minimum order is just 10 patches. For maximum value, our wholesale discount tiers unlock at 50, 100, 250, 500, and 1,000+ units.',
    },
    {
      category: 'artwork',
      q: 'What artwork formats do you accept?',
      a: 'We accept AI, EPS, PDF, SVG, PSD, PNG, and JPG. Even if you only have a rough sketch or smartphone photo, our in-house digitizers will vectorize and optimize it free of charge.',
    },
    {
      category: 'artwork',
      q: 'Will my colors match my brand guidelines?',
      a: 'Yes! We match Pantone (PMS) color codes using Madeira Polyneon threads with over 400 vivid standard thread colors available.',
    },
  ];

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold mb-2">
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
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
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
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:border-orange-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 text-slate-400 group-hover:text-orange-500">
                      {openIndex === idx ? (
                        <Minus className="w-4 h-4 text-orange-500" />
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

          {/* Right Column: Vibrant Orange CTA Card with Crown Watermark (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 p-8 sm:p-10 text-white shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between border border-orange-400/40">
              
              {/* Subtle Crown Watermark in Bottom-Right */}
              <div className="absolute -bottom-6 -right-6 opacity-25 pointer-events-none transform rotate-12">
                <GoldenCrownPatch className="w-64 h-52" />
              </div>

              {/* Diagonal Stitch Line Texture */}
              <div className="absolute inset-0 bg-fabric-pattern opacity-15 pointer-events-none" />

              {/* Top Promo Tag */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white mb-4 border border-white/20">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Limited Offer: 15% Off Code: BDIGITIZE15</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Ready to Create Your Custom Patches?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-orange-100 leading-relaxed max-w-sm">
                  Get a free quote today and bring your design to life with factory direct pricing!
                </p>
              </div>

              {/* Bullet perks inside CTA */}
              <div className="relative z-10 space-y-1.5 py-4 text-xs font-semibold text-white/90">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Free 6-Hour Digital Scan Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Free Worldwide Courier Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>No Setup or Digitizing Fees</span>
                </div>
              </div>

              {/* White Pill Action Button */}
              <div className="relative z-10 pt-2">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
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

'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'We accept custom patch orders starting as low as 10 pieces per design! Whether you need a small batch for your squad, motorcycle club, or corporate brand, or 25,000+ pieces for international retail apparel distribution, you get direct factory wholesale pricing with zero broker markups.',
  },
  {
    q: 'Can I see a real sample before mass production begins?',
    a: 'YES! We operate on a strict Zero-Surprise policy. First, you receive a free 6-hour digital 3D stitch proof with unlimited free revisions. Once approved, our technicians stitch out an actual physical sample directly on our Tajima multi-head machines and email high-resolution studio photos for your final sign-off before full production runs.',
  },
  {
    q: 'Can I iron on your patches, and how durable are they in the laundry?',
    a: 'Yes! Our Iron-On (Heat Seal) backings use industrial-grade thermal polyamide adhesive calibrated to activate at 320°F (160°C) with 15–20 seconds of firm pressure. Once cured, they withstand 50+ standard machine wash and dry cycles. For heavy workwear, denim, or leather, we always recommend adding a quick perimeter stitch for lifetime security.',
  },
  {
    q: 'What if I only have a low-resolution phone photo, sketch, or rough idea?',
    a: 'No problem at all! You do not need expensive vector files to get started. Upload your rough sketch, napkin drawing, or camera photo. Our in-house design lab will clean it up, vectorise it into high-definition geometry, and create a production-ready stitch simulation at zero extra charge.',
  },
  {
    q: 'What is the difference between Merrowed and Laser-Cut borders?',
    a: 'A Merrowed border is a traditional, heavy rolled overlock edge (approx. 1/8" thick) wrapped around standard symmetrical shapes like circles, shields, and rectangles. A Laser-Cut edge is trimmed flush with an industrial fiber laser, creating clean fray-free sealed edges essential for custom die-cut shapes and tactical velcro patches.',
  },
  {
    q: 'Which backing should I choose for my custom patches?',
    a: '• Hook & Loop (Velcro): Best for tactical vests, plate carriers, uniforms, and backpacks.\n• Iron-On (Heat Seal): Best for hoodies, denim jackets, and cotton fabrics using a heat press.\n• Plain Sew-On: Best for biker leathers, canvas bags, and items undergoing extreme washing.\n• 3M Peel & Stick: Perfect for events, trade shows, and temporary hat promo placement.\n• Magnetic Pinless: Zero fabric punctures, ideal for corporate blazers and formal suits.',
  },
  {
    q: 'What is the production and delivery turnaround time?',
    a: 'Digital proofs are delivered within 6 hours. Physical production takes 5 to 7 business days after proof approval. Express worldwide delivery via DHL / FedEx Priority takes 2 to 4 business days with end-to-end tracking.',
  },
  {
    q: 'What if I am not 100% satisfied with my custom patches?',
    a: 'Your peace of mind is guaranteed. Because every order requires both your digital proof approval and physical sample photo sign-off, errors are virtually eliminated. If your patches ever arrive with a manufacturing defect or fail to match your approved specification, we will immediately remake the order for free or issue a full refund.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-blue-50 text-blue-700 border-blue-200 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Answers &amp; Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.12]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 mx-auto">
            Everything you need to know about patch ordering, turnaround, backings, sample approvals, and factory guarantees.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono shrink-0 text-slate-700">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 whitespace-pre-line font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

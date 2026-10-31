'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'We accept custom patch orders starting as low as 10 pieces per design! Whether you need a small batch for your motorcycle club, tactical squad, or corporate team, or 50,000+ pieces for international apparel distribution, we provide direct factory pricing with zero penalty fees.',
  },
  {
    q: 'Do I have to pay before seeing a digital proof?',
    a: 'NO, 100% FREE! You simply upload your artwork, logo, or sketch. Our certified digitizers hand-plot the design and email you a high-definition 6-hour digital proof simulation showing exact thread colors, dimensions, and border trim. You only pay when you are 100% satisfied with the proof.',
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
    q: 'Can I see a physical sew-out sample before mass production?',
    a: 'Yes! For every order, you receive a free high-resolution digital stitch simulation. For volume orders of 250+ patches, we can also sew a real physical production sample patch and email you macro high-def photos before running the complete batch.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Answers & Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 mx-auto">
            Everything you need to know about patch ordering, turnaround, backings, and bulk discounts.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0c1020] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-indigo-300 transition-colors"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 whitespace-pre-line font-sans">
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

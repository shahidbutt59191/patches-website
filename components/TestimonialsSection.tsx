'use client';

import React from 'react';

const REVIEWS = [
  {
    name: 'Capt. David Miller',
    role: 'Logistics Commander',
    org: 'Task Force Apex Apparel',
    rating: 5,
    order: '500 pcs 3D PVC Morale Patches',
    text: 'EmbroidPatches exceeded our squadron standards. The 3D PVC mold precision is razor sharp, the coyote tan matches our OCP uniform specs flawlessly, and the hook-and-loop backing holds tight through combat training.',
  },
  {
    name: 'Marcus Vance',
    role: 'Athletics Coordinator',
    org: 'Eastbrook High School',
    rating: 5,
    order: '150 pcs Vintage Chenille Letters',
    text: 'Our varsity championship letterman patches arrived in just 6 business days. Thick fluffy loop pile, double-layer wool felt, and vibrant gold thread. The students and parents were blown away by the craftsmanship.',
  },
  {
    name: 'Elena Rostova',
    role: 'Creative Brand Director',
    org: 'Timber & Bean Roasters',
    rating: 5,
    order: '250 pcs Laser-Cut Leatherette',
    text: 'We had our coffee logo etched onto rustic caramel faux leather for trucker hats. The laser detail is unbelievable down to the finest line, and the 3M peel-and-stick adhesive stayed glued through repeat wash cycles.',
  },
  {
    name: 'Jesse "Ironhead" Thorne',
    role: 'Road Captain',
    org: 'Iron Horse Brotherhood MC',
    rating: 5,
    order: '50 sets Curved Embroidered Rockers',
    text: 'Toughest back patches we have ever ordered. Heavy twill background, thick merrowed border that does not fray at 80mph, and thread that does not fade under rain and sun. 10/10 factory direct service.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews-section" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            5.0★ Verified Customer Trust
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Backed by 420+ Verified Wholesale Buyers
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-2xl mx-auto">
            From tactical military units and emergency first responders to collegiate varsity teams and international streetwear brands.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-[#0c1020] p-7 flex flex-col justify-between shadow-xl relative hover:border-indigo-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {'★'.repeat(r.rating)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    ✓ Verified Production Run
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{r.role} • {r.org}</div>
                </div>
                <div className="text-right text-[10px] font-mono text-indigo-400 font-bold">
                  {r.order}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

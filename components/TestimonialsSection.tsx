'use client';

import React from 'react';

const REVIEWS = [
  {
    name: 'Capt. David Miller',
    role: 'Logistics Commander',
    org: 'Task Force Apex Apparel',
    rating: 5,
    order: '500 pcs 3D PVC Morale Patches',
    text: 'ApexPatches exceeded our squadron standards. The 3D PVC mold precision is razor sharp, the coyote tan matches our OCP uniform specs flawlessly, and the hook-and-loop backing holds tight through combat training.',
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
    <section id="reviews-section" className="py-24 bg-tactical-950/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-3">
            <span>5.0★ Verified Customer Trust</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Backed by 420+ Verified Wholesale Buyers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            From tactical military units and emergency first responders to collegiate varsity teams and international streetwear brands.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 flex flex-col justify-between shadow-xl relative"
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

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{r.role} • {r.org}</div>
                </div>
                <div className="text-right text-[10px] font-mono text-amber-400 font-bold">
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

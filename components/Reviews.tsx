'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Capt. David Miller',
    role: 'Logistics Commander',
    org: 'Task Force Apex Tactical',
    rating: 5,
    order: '500 pcs 3D PVC Morale Patches',
    text: 'The 3D PVC mold precision is razor sharp. The coyote tan matches our OCP combat uniform specs flawlessly, and the hook-and-loop backing holds rock-solid through live field operations.',
  },
  {
    name: 'Marcus Vance',
    role: 'Athletics Coordinator',
    org: 'Eastbrook Collegiate Athletics',
    rating: 5,
    order: '150 pcs Vintage Chenille Letters',
    text: 'Our varsity championship letterman patches arrived in just 6 business days. Thick fluffy loop pile, double-layer wool felt, and vibrant gold thread. Students and alumni were blown away.',
  },
  {
    name: 'Elena Rostova',
    role: 'Brand & Creative Director',
    org: 'Timber & Bean Roasters',
    rating: 5,
    order: '250 pcs Laser-Cut Leatherette',
    text: 'We had our logo etched onto rustic caramel synthetic leather for trucker snapbacks. The laser detail is unbelievable down to the finest lines, and the 3M adhesive stayed tight through repeat wash cycles.',
  },
  {
    name: 'Jesse "Ironhead" Thorne',
    role: 'Road Captain',
    org: 'Iron Horse MC Brotherhood',
    rating: 5,
    order: '50 sets Curved Embroidered Rockers',
    text: 'Toughest back patches we have ever run. Heavy twill background, thick merrowed border that does not fray at 80mph, and thread that does not fade under blistering sun and torrential rain. 10/10 factory service.',
  },
];

const GUARANTEES = [
  {
    title: '100% Machine Calibrated by Masters',
    desc: 'Every stitch path, underlay angle, and pull-compensation tolerance is manually plotted by master digitizers for clean, production-speed commercial sew-outs.',
    icon: '🧵',
  },
  {
    title: 'Free Proofing & Unlimited Revisions',
    desc: 'We send an exact digital stitch simulation within 6 hours. You receive unlimited free design revisions until you are 100% satisfied before we run looms.',
    icon: '✨',
  },
  {
    title: 'Exact Thread & Pantone PMS Matching',
    desc: 'We match your brand colors to genuine Madeira poly/rayon thread numbers and Pantone solid coated PMS formulas with zero color distortion.',
    icon: '🎨',
  },
  {
    title: 'Zero-Defect Replacement Guarantee',
    desc: 'If any patch in your batch has broken threads, misaligned borders, or defective backing, we remanufacture and rush deliver replacements 100% free of charge.',
    icon: '🛡️',
  },
];

export default function ReviewsAndGuarantees() {
  return (
    <section className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reviews Section Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            5.0★ Verified Customer Trust
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Trusted by 3,800+ Brands, Teams &amp; Armed Forces
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-2xl mx-auto">
            From tactical military units and first responders to collegiate varsity teams and international streetwear brands.
          </p>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-[#0c1020] p-7 flex flex-col justify-between shadow-xl relative hover:border-indigo-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    ✓ Verified Production Batch
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="font-bold text-white">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.role} • {r.org}</div>
                </div>
                <div className="text-right text-[10px] text-indigo-400">
                  {r.order}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quadruple Factory Guarantee Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#10152c] to-[#0a0d1e] border border-white/10 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
              ✦ ZERO RISK COMMITMENT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              The Quadruple Factory Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every single patch batch leaving our facility is protected by 4 non-negotiable manufacturing standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl block mb-3">{g.icon}</span>
                  <h4 className="font-bold text-sm text-white mb-1.5">{g.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{g.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Policy Backed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { UploadCloud, Search, Camera, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Upload Artwork & Configure Specs',
    desc: 'Submit your logo, sketch, or vector file in any format (PNG, JPG, PDF, AI, SVG). Choose your dimensions, backing type, and quantity in our calculator.',
    icon: UploadCloud,
    guarantee: 'Accepts napkin sketches & phone photos',
  },
  {
    step: '02',
    title: '6-Hour Free Digital Stitch Proof',
    desc: 'Our master digitizers hand-plot your design and send an exact millimeter-calibrated 3D stitch simulation showing thread sheen and borders with unlimited free revisions.',
    icon: Search,
    guarantee: '100% Free with Unlimited Edits',
  },
  {
    step: '03',
    title: 'Real Machine Sample Photo Approval',
    desc: 'Before the full batch runs, our machine operators stitch out the first physical sample and email high-resolution macro studio photos for your 100% final green light.',
    icon: Camera,
    guarantee: 'Zero Risk • Final Sign-Off',
  },
  {
    step: '04',
    title: 'Precision Loom Run & Express Dispatch',
    desc: 'Approved patches run on computerized Tajima multi-head looms, undergo 100% manual quality inspection for thread tension, and dispatch via tracked express delivery.',
    icon: Truck,
    guarantee: 'Tracked Doorstep Delivery',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-blue-50 text-blue-700 border-blue-200 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Clear &amp; Streamlined Factory Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.12] max-w-3xl">
            From Your Sketch to Finished Physical Patches
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-600 mx-auto">
            4 transparent production milestones engineered for speed, absolute precision, and zero-risk customer approval.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-3xl bg-white border border-slate-200/90 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      STEP {s.step}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{s.guarantee}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

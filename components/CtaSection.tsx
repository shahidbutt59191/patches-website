'use client';

import React from 'react';

interface CtaProps {
  whatsappNumber?: string;
}

export default function CtaSection({ whatsappNumber = '18005557282' }: CtaProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#070913] relative overflow-hidden border-b border-white/10">
      
      {/* Ambient Radial Gradient Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#5448ea]/20 to-[#7c3aed]/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#10152c] to-[#0a0d1e] border border-indigo-500/30 shadow-[0_20px_50px_rgba(84,72,234,0.25)] space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Fast 6-Hour Turnaround
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Ready to Manufacture Your Custom Patches?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload your artwork today and receive clean, 100% factory-calibrated digital stitch proof simulations with guaranteed wholesale rates and free revisions.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 font-extrabold tracking-tight text-indigo-950 bg-white hover:bg-slate-100 rounded-2xl px-8 py-4 text-sm sm:text-base shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
            >
              <span>Start Your Order</span>
              <span>→</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi EmbroidPatches, I need a quick custom patch quote!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold text-emerald-400 rounded-2xl px-6 py-4 text-sm bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all w-full sm:w-auto"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Direct Proof</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span>✓ No Setup Fees</span>
            <span>✓ Free Tajima Digitizing</span>
            <span>✓ Free Digital Proof</span>
            <span>✓ 10-Piece MOQ</span>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';

const STANDARDS = [
  {
    step: '01',
    title: 'Manual Node & Path Tracing',
    desc: 'Master digitizers hand-plot every single curve, bevel angle, and stitch density. We never use flawed auto-punch software that leads to needle jams or thread loops.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <path d="M8.12 8.12 12 12" />
        <path d="M20 4 8.12 15.88" />
        <circle cx="6" cy="18" r="3" />
        <path d="M14.8 14.8 20 20" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Fabric-Calibrated Underlays',
    desc: 'Tatami, edge-run, and zig-zag underlay stitching mapped specifically to your fabric backing (heavy twill, wool felt, PVC base) to create rigid foundation and prevent fabric sinking.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Precision Push-Pull Tuning',
    desc: 'Thread tension pushes along stitch paths and pulls perpendicular to them. Our master punchers calculate micro-tolerances so circles stay round and outlines align with zero gap.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12H3m18 0-4-4m4 4-4 4M3 12l4-4m-4 4 4 4" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Commercial High-Speed Looms',
    desc: 'Every patch file is formatted for commercial Tajima, Barudan, and Melco multi-head embroidery machines operating at 850+ stitches per minute with minimal color changes and zero trims.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function StandardsSection() {
  return (
    <section id="standards" className="py-20 sm:py-28 bg-[#0a0d1e]/50 border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-emerald-500/10 text-emerald-400 border-emerald-500/25 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Master Craftsman Manufacturing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            The EmbroidPro Standard: 100% Machine Calibrated
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
            Every custom patch is engineered with manual pathing, fabric-specific underlays, and custom pull compensation for production sew-outs.
          </p>
        </div>

        {/* 4 Standards Cards matching EmbroidPro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STANDARDS.map((s, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-[#0e1326] border border-white/10 shadow-sm hover:border-emerald-500/40 hover:shadow-[0_16px_40px_-16px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black font-mono text-slate-500">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span>✓ Factory Inspected</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

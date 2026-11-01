'use client';

import React from 'react';
import { ShieldCheck, Zap, Sliders, Camera, Sparkles, CheckCircle2 } from 'lucide-react';

interface ValuePillarsProps {
  onOpenSampleKit?: () => void;
}

export default function ValuePillarsSection({ onOpenSampleKit }: ValuePillarsProps) {
  const PILLARS = [
    {
      id: 'low-minimums',
      badge: 'Flexibility First',
      title: 'Low 10-Piece Minimums',
      description:
        'Whether you need a pilot batch of 10 custom patches for your tactical team or 15,000 for a global corporate rollout, we treat every order with identical aerospace precision.',
      icon: Sliders,
      highlight: 'Starting from 10 pcs',
      accentColor: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      tag: 'No Forced Over-Purchasing',
    },
    {
      id: 'factory-pricing',
      badge: 'Direct Manufacturer',
      title: 'Factory-Direct Wholesale',
      description:
        'We manufacture in-house on commercial Tajima multi-head looms and liquid PVC vulcanizing presses. Zero middleman markups, saving you up to 52% on volume runs.',
      icon: Zap,
      highlight: 'Save up to 52% in bulk',
      accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      tag: 'Best Price Promise',
    },
    {
      id: 'digital-proof',
      badge: 'Rapid Design Lab',
      title: 'Free 6-Hour Digital Proof',
      description:
        'Our senior digitizers convert your sketch, PNG, or vector into an exact millimeter-calibrated 3D stitch simulation showing thread sheen and edge overlocking with unlimited free revisions.',
      icon: Sparkles,
      highlight: 'Unlimited Free Revisions',
      accentColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      tag: '100% Free Before Order',
    },
    {
      id: 'photo-sample',
      badge: 'Zero Risk Guarantee',
      title: 'Real Machine Photo Proof',
      description:
        'Before mass production begins, our technicians run a single physical sample on the production line and email high-resolution studio photos for your final sign-off. Never receive surprises.',
      icon: Camera,
      highlight: 'Pre-Production Physical Proof',
      accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      tag: 'Approval Before Mass Run',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 bg-[#090c1a] border-b border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>The Apex Factory Commitment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Premier Brands &amp; Outfitters Choose Us
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Engineered from the ground up for speed, quality certainty, and zero risk. Experience true industrial manufacturing without the usual broker friction.
            </p>
          </div>

          {onOpenSampleKit && (
            <button
              onClick={onOpenSampleKit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-indigo-400/50 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-all group shrink-0"
            >
              <span>📦 Request Physical Swatch Kit</span>
              <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="relative rounded-2xl bg-[#0d1226]/80 border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 hover:bg-[#101730] transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.accentColor} border flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono">{pillar.highlight}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{pillar.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

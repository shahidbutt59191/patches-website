'use client';

import React from 'react';
import { Gem, Zap, Globe, Headphones, CheckCircle2, ShieldCheck, Award, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  statsData?: {
    patchesSewn?: string;
    onTimeDelivery?: string;
    proofSpeed?: string;
    countriesShipped?: string;
  };
}

export default function WhyChooseUs({ statsData }: WhyChooseUsProps) {
  const features = [
    {
      title: 'Direct Factory Advantage',
      subtitle: 'Zero Broker Fees',
      detail: 'Order directly from our computerized looms with transparent wholesale volume rates and zero hidden fees.',
    },
    {
      title: 'Free 6-Hour Digital Proof',
      subtitle: 'Unlimited Revisions',
      detail: 'Our master digitizers create exact high-definition Tajima stitch scans within 6 hours. Free edits until 100% satisfied.',
    },
    {
      title: '700+ Thread Shades',
      subtitle: 'Exact Pantone Matching',
      detail: 'Premium Madeira Polyneon threads, metallic gold/silver, and glow-in-the-dark calibrated for high-abrasion durability.',
    },
    {
      title: 'Free Tracked Delivery',
      subtitle: 'Fast Doorstep Express',
      detail: 'Every order ships with free worldwide tracking via FedEx, DHL, or UPS straight to your door.',
    },
  ];

  const stats = [
    { value: statsData?.patchesSewn || '1.8M+', label: 'Patches Manufactured' },
    { value: statsData?.onTimeDelivery || '99.8%', label: 'On-Time Delivery' },
    { value: statsData?.proofSpeed || '6 Hours', label: 'Digital Proof Speed' },
    { value: statsData?.countriesShipped || '50+', label: 'Countries Shipped Free' },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-22 bg-[#f7f7f7] border-b border-[#e4e5e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#109655] text-xs font-bold mb-2.5">
              <Award className="w-3.5 h-3.5" />
              <span>Pro Factory Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#222325] tracking-tight">
              A whole world of custom patch manufacturing at your fingertips
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#62646a] max-w-xl">
              From small boutique orders of 10 pieces to 50,000+ piece corporate wholesale runs, we guarantee perfection.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white border border-[#e4e5e7] rounded-2xl p-4 shadow-xs">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center px-2">
                <div className="text-lg sm:text-xl font-black text-[#109655] font-sans">
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Feature Columns in Fiverr Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#e4e5e7] p-6 flex flex-col justify-between hover:border-[#1dbf73] hover:shadow-lg transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1dbf73] flex items-center justify-center mb-4 group-hover:bg-[#1dbf73] group-hover:text-white transition-all shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#222325] mb-1 group-hover:text-[#1dbf73] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[#109655] block mb-2">
                  {item.subtitle}
                </span>
                <p className="text-xs text-[#62646a] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

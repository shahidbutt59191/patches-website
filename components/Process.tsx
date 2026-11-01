'use client';

import React, { useState } from 'react';
import { UploadCloud, Settings, ShoppingCart, Truck, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface ProcessProps {
  onOpenQuote?: () => void;
}

export default function Process({ onOpenQuote }: ProcessProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '1',
      icon: <UploadCloud className="w-7 h-7 text-slate-800" />,
      title: 'Upload Your Design',
      desc: 'Share your logo or idea',
      time: '~2 Minutes',
      details: 'Drop any image format — AI, PNG, PDF, or even a napkin sketch. Our digitizers handle the rest at zero extra charge.',
    },
    {
      number: '2',
      icon: <Settings className="w-7 h-7 text-slate-800" />,
      title: 'Choose Options',
      desc: 'Select style, size & quantity',
      time: 'Instant Selection',
      details: 'Customize patch style (embroidered, woven, leather, velcro), thread colors, and border edges to fit your budget.',
    },
    {
      number: '3',
      icon: <ShoppingCart className="w-7 h-7 text-slate-800" />,
      title: 'Place Your Order',
      desc: 'Confirm and make payment',
      time: '6-Hour Proof',
      details: 'Review high-resolution digital embroidery scan proof. We offer unlimited free revisions until you are 100% satisfied.',
    },
    {
      number: '4',
      icon: <Truck className="w-7 h-7 text-slate-800" />,
      title: 'Get Your Patches',
      desc: 'Delivered worldwide',
      time: '10-14 Days',
      details: 'Precision sewn on Tajima automated multi-heads, trimmed, inspected, and shipped with free tracked courier worldwide.',
    },
  ];

  return (
    <section className="py-16 sm:py-22 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Fast, Frictionless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Simple Ordering Process
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Get your custom patches in just a few easy steps.
          </p>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              
              {/* Step Card */}
              <div
                onClick={() => {
                  setActiveStep(idx);
                  if (onOpenQuote) onOpenQuote();
                }}
                className={`w-full bg-white rounded-2xl border p-6 flex flex-col items-center text-center shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  activeStep === idx ? 'border-orange-500 ring-2 ring-orange-500/10' : 'border-slate-200/80 hover:border-orange-300'
                }`}
              >
                
                {/* Header row with Numbered Badge & Timing */}
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-50 transition-all shadow-inner">
                  {step.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {step.desc}
                </p>

                {/* Step Subtext */}
                <p className="text-[11px] text-slate-400 leading-relaxed text-center mt-auto border-t border-slate-100 pt-3">
                  {step.details}
                </p>

              </div>

              {/* Connecting Orange Arrow (desktop only between items) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-orange-100 border border-orange-200 items-center justify-center text-orange-600 shadow-2xs group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

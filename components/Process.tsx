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
      icon: <UploadCloud className="w-6 h-6 text-[#1dbf73]" />,
      title: 'Submit Your Design',
      desc: 'Share your logo, sketch, or idea',
      time: '~2 Mins',
      details: 'Upload any file format — PNG, JPG, PDF, AI, PSD, or SVG. Our digitizers handle the vector preparation at zero extra charge.',
    },
    {
      number: '2',
      icon: <Settings className="w-6 h-6 text-[#1dbf73]" />,
      title: 'Select Specs & Backing',
      desc: 'Dimensions, quantity & attachment',
      time: 'Instant',
      details: 'Choose your patch style (embroidered, PVC, leather, woven), backing (iron-on, velcro, sew-on), and quantity (from 10 pcs).',
    },
    {
      number: '3',
      icon: <CheckCircle className="w-6 h-6 text-[#1dbf73]" />,
      title: 'Approve 6-Hour Proof',
      desc: 'Free digital stitch mockup',
      time: '6 Hours',
      details: 'Review high-resolution digital embroidery scan proof. We offer unlimited free revisions until you are 100% satisfied.',
    },
    {
      number: '4',
      icon: <Truck className="w-6 h-6 text-[#1dbf73]" />,
      title: 'Precision Production & Delivery',
      desc: 'Delivered to your door',
      time: '10–12 Days',
      details: 'Manufactured on Japanese Tajima computerized looms, hand-inspected by QC, and shipped worldwide with express tracking.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-22 bg-white border-b border-[#e4e5e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#109655] border border-emerald-200 text-xs font-bold mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Frictionless 4-Step Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#222325] tracking-tight">
            How Custom Patch Ordering Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#62646a]">
            Get your custom patches delivered from factory looms in 4 simple steps.
          </p>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveStep(idx);
                if (onOpenQuote) onOpenQuote();
              }}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                activeStep === idx
                  ? 'border-[#1dbf73] ring-2 ring-emerald-500/10'
                  : 'border-[#e4e5e7] hover:border-[#1dbf73]'
              }`}
            >
              <div>
                {/* Header: Step Number Pill & Timing */}
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#222325] text-white font-black text-xs flex items-center justify-center group-hover:bg-[#1dbf73] transition-colors">
                    {step.number}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-[#f7f7f7] px-2 py-0.5 rounded-md border border-[#e4e5e7]">
                    {step.time}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>

                {/* Title & Desc */}
                <h3 className="text-base font-bold text-[#222325] mb-1 group-hover:text-[#1dbf73] transition-colors">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#109655] block mb-2">
                  {step.desc}
                </span>
                <p className="text-xs text-[#62646a] leading-relaxed">
                  {step.details}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 mt-4 border-t border-[#e4e5e7] flex items-center gap-1 text-xs font-bold text-[#1dbf73] group-hover:text-[#19a463]">
                <span>Start Step {step.number}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { UploadCloud, Settings, ShoppingCart, Truck, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onOpenQuote?: () => void;
}

export default function Process({ onOpenQuote }: ProcessProps) {
  const steps = [
    {
      number: '1',
      icon: <UploadCloud className="w-7 h-7 text-slate-800" />,
      title: 'Upload Your Design',
      desc: 'Share your logo or idea',
    },
    {
      number: '2',
      icon: <Settings className="w-7 h-7 text-slate-800" />,
      title: 'Choose Options',
      desc: 'Select style, size & quantity',
    },
    {
      number: '3',
      icon: <ShoppingCart className="w-7 h-7 text-slate-800" />,
      title: 'Place Your Order',
      desc: 'Confirm and make payment',
    },
    {
      number: '4',
      icon: <Truck className="w-7 h-7 text-slate-800" />,
      title: 'Get Your Patches',
      desc: 'Delivered worldwide',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
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
                onClick={onOpenQuote}
                className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group"
              >
                
                {/* Numbered Orange Badge */}
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center mb-4 shadow-xs">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-50 transition-all">
                  {step.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Connecting Orange Arrow (desktop only between items) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-orange-100 border border-orange-200 items-center justify-center text-orange-600">
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

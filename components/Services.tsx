'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  MountainShieldPatch,
  IronOnPatchVisual,
  VelcroBackingVisual,
  EagleWovenPatch,
  LeatherDebossedPatch,
} from './PatchVisuals';

interface ServicesProps {
  onOpenQuote?: (styleId?: string) => void;
}

export const SERVICES_LIST = [
  {
    id: 'embroidered',
    title: 'Embroidered Patches',
    subtitle: 'Classic & Durable',
    visual: <MountainShieldPatch className="w-24 h-28 mx-auto" />,
  },
  {
    id: 'iron-on',
    title: 'Iron-On Patches',
    subtitle: 'Easy to Apply',
    visual: <IronOnPatchVisual className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'velcro',
    title: 'Velcro Patches',
    subtitle: 'Strong & Reusable',
    visual: <VelcroBackingVisual className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'woven',
    title: 'Woven Patches',
    subtitle: 'Smooth & Detailed',
    visual: <EagleWovenPatch className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'leather',
    title: 'Leather Patches',
    subtitle: 'Stylish & Elegant',
    visual: <LeatherDebossedPatch className="w-24 h-24 mx-auto" />,
  },
];

export default function Services({ onOpenQuote }: ServicesProps) {
  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50/70 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Patch Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Choose from a variety of patch styles to match your needs.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-300 group"
            >
              {/* Visual Container */}
              <div className="h-32 flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-300">
                {service.visual}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                {service.subtitle}
              </p>

              {/* Action Button: Get a Quote */}
              <button
                type="button"
                onClick={() => onOpenQuote && onOpenQuote(service.id)}
                className="mt-auto w-full py-2 px-4 rounded-full border border-orange-500 text-orange-600 font-bold text-xs hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Shield, Flame, Zap } from 'lucide-react';
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
    tag: 'Most Popular',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-200',
    category: ['all', 'tactical', 'apparel'],
    stitchMetric: '22,000+ Stitches',
    desc: 'Dense Madeira polyester thread construction woven into heavy duck twill base. Rolled merrowed overlock borders.',
    visual: <MountainShieldPatch className="w-24 h-28 mx-auto" />,
  },
  {
    id: 'iron-on',
    title: 'Iron-On Patches',
    subtitle: 'Easy to Apply',
    tag: 'Fast Heat Seal',
    tagColor: 'bg-blue-50 text-blue-600 border-blue-200',
    category: ['all', 'apparel'],
    stitchMetric: '30-Sec Press',
    desc: 'Pre-coated with industrial heat-seal backing. Bonds permanently to denim, canvas, cotton, and polyester.',
    visual: <IronOnPatchVisual className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'velcro',
    title: 'Velcro Patches',
    subtitle: 'Strong & Reusable',
    tag: 'Combat Grade',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    category: ['all', 'tactical'],
    stitchMetric: '5,000+ Peels',
    desc: 'Mil-spec hook & loop fasteners pre-attached with double perimeter lock-stitching. Ideal for tactical gear & vests.',
    visual: <VelcroBackingVisual className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'woven',
    title: 'Woven Patches',
    subtitle: 'Smooth & Detailed',
    tag: 'Micro Precision',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-200',
    category: ['all', 'apparel'],
    stitchMetric: '50-Denier Thread',
    desc: 'Thin micro-threads loomed from scratch for razor-sharp typography, gradients, and intricate line artwork down to 1.5mm.',
    visual: <EagleWovenPatch className="w-24 h-24 mx-auto" />,
  },
  {
    id: 'leather',
    title: 'Leather Patches',
    subtitle: 'Stylish & Elegant',
    tag: 'Luxury Debossed',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    category: ['all', 'lifestyle', 'apparel'],
    stitchMetric: 'Laser Vaporized',
    desc: 'Rich caramel and dark roast synthetic leather debossed with precision fiber lasers. The benchmark for trucker snapbacks.',
    visual: <LeatherDebossedPatch className="w-24 h-24 mx-auto" />,
  },
];

export default function Services({ onOpenQuote }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category.includes(activeCategory));

  return (
    <section id="services" className="py-16 sm:py-22 bg-slate-50/70 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-600 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Tajima Multi-Head Embroidery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Patch Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Choose from a variety of patch styles to match your needs.
          </p>

          {/* Creative Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Styles (5)' },
              { id: 'tactical', label: 'Tactical & Uniforms' },
              { id: 'apparel', label: 'Apparel & Headwear' },
              { id: 'lifestyle', label: 'Lifestyle & Bags' },
            ].map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-lg hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
            >
              
              {/* Badge */}
              <div className="w-full flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${service.tagColor}`}>
                  {service.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  {service.stitchMetric}
                </span>
              </div>

              {/* Visual Container */}
              <div className="h-32 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                {service.visual}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 mb-3 font-medium">
                {service.subtitle}
              </p>

              {/* Subtle feature pill */}
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-6 text-center">
                {service.desc}
              </p>

              {/* Action Button: Get a Quote */}
              <button
                type="button"
                onClick={() => onOpenQuote && onOpenQuote(service.id)}
                className="mt-auto w-full py-2.5 px-4 rounded-full border border-orange-500 text-orange-600 font-bold text-xs hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-md cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

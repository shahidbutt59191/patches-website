'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, CheckCircle2 } from 'lucide-react';
import { MountainShieldPatch } from './PatchVisuals';

interface BeforeAfterSliderProps {
  onOpenQuote?: () => void;
}

export default function BeforeAfterSlider({ onOpenQuote }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== 'click') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  return (
    <section className="py-16 sm:py-22 bg-white border-t border-b border-slate-100 relative overflow-hidden">
      
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Master Tajima Vector-to-Stitch Digitizing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            See Your 2D Artwork Turned into 3D Physical Stitches
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Drag the slider to see how our digitizers convert flat graphic files into high-density embroidered thread textures.
          </p>
        </div>

        {/* Before / After Interactive Canvas Box */}
        <div className="max-w-4xl mx-auto">
          
          <div
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={handleMouseMove}
            className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl cursor-ew-resize select-none border border-slate-800"
          >
            
            {/* 1. RIGHT SIDE: Physical 3D Tajima Embroidered Patch (Stitched) */}
            <div className="absolute inset-0 bg-[#12141c] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-fabric-pattern opacity-95" />
              
              <div className="relative z-10 flex flex-col items-center">
                <MountainShieldPatch className="w-52 h-64 sm:w-64 sm:h-76" />
                <div className="absolute top-4 right-4 bg-orange-500/90 text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>3D Physical Embroidery (Madeira Poly)</span>
                </div>
              </div>
            </div>

            {/* 2. LEFT SIDE: Flat 2D Graphic Vector Sketch (Clipped via sliderPos) */}
            <div
              className="absolute inset-0 bg-slate-100 flex items-center justify-center p-6 border-r-2 border-orange-500"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="absolute inset-0 bg-dot-pattern opacity-70" />
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Flat Vector SVG Simulation */}
                <div className="w-52 h-64 sm:w-64 sm:h-76 flex items-center justify-center">
                  <svg viewBox="0 0 240 280" className="w-full h-full filter drop-shadow-sm">
                    {/* Flat Vector Shield */}
                    <path
                      d="M 120 12 L 216 45 C 216 160 170 230 120 268 C 70 230 24 160 24 45 Z"
                      fill="#e2e8f0"
                      stroke="#0f172a"
                      strokeWidth="6"
                    />
                    {/* Flat Mountains */}
                    <polygon points="120,60 168,135 72,135" fill="#3b82f6" />
                    <polygon points="80,82 120,135 48,135" fill="#60a5fa" />
                    <polygon points="160,82 195,135 125,135" fill="#2563eb" />
                    {/* Flat Trees */}
                    <g fill="#10b981">
                      <polygon points="90,116 100,136 80,136" />
                      <polygon points="120,112 132,136 108,136" />
                      <polygon points="150,116 160,136 140,136" />
                    </g>
                    {/* Flat Vector Text */}
                    <text x="120" y="180" textAnchor="middle" fill="#0f172a" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
                      YOUR
                    </text>
                    <text x="120" y="212" textAnchor="middle" fill="#3b82f6" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="2.5">
                      LOGO
                    </text>
                  </svg>
                </div>

                <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full shadow-md">
                  Flat 2D Vector Artwork (Customer File)
                </div>
              </div>
            </div>

            {/* 3. Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-black">
                ⇄
              </div>
            </div>

          </div>

          {/* Bottom Perks Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60 flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Free $45 Tajima Digitizing Included</span>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60 flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Unlimited Digital Proof Revisions</span>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60 flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Exact Pantone Thread Matching</span>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onOpenQuote}
              className="btn-orange px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Upload Your Artwork for Free 6-Hour Proof</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

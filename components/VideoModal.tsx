'use client';

import React from 'react';
import { X, Play, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: () => void;
}

export default function VideoModal({ isOpen, onClose, onOpenQuote }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#111318] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-[#161820]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white">
              Behind the Scenes: Precision Patch Embroidery &amp; Digitizing
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Simulated Loom Factory Visual */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1200&auto=format&fit=crop&q=80')]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent" />

          <div className="relative z-10 text-center space-y-4 px-6">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <p className="text-sm sm:text-base font-bold text-white max-w-md mx-auto">
              Tajima Multi-Head Industrial Embroidery &amp; Laser Cutting in Action
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Madeira Polyneon Threads
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> 1,200 SPM Precision Stitches
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 bg-[#161820] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div>
            <div className="text-xs font-bold text-white">Need Custom Patches for Your Brand?</div>
            <div className="text-[11px] text-slate-400">Get free digital artwork rendering in 6 hours</div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenQuote) onOpenQuote();
            }}
            className="btn-orange px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
          >
            Request Free Quote
          </button>
        </div>

      </div>
    </div>
  );
}

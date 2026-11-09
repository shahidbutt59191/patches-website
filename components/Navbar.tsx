'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Truck,
  Clock,
  Search,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Phone,
  ShieldCheck,
  Star,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  onOpenQuote?: (styleId?: string) => void;
  onOpenSearch?: () => void;
  announcementText?: string;
  announcementEnabled?: boolean;
  supportEmail?: string;
  turnaroundTime?: string;
}

export default function Navbar({
  onOpenQuote,
  onOpenSearch,
  announcementText,
  announcementEnabled = true,
  supportEmail = 'support@bdigitizing.com',
  turnaroundTime = '10-14 Days Turnaround',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. Dark Charcoal Top Announcement & Trust Bar */}
      {announcementEnabled && (
        <div className="bg-[#0c0e14] text-slate-300 py-2 px-4 sm:px-6 text-xs border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs">
            
            {/* Left Trust Indicators */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 text-slate-300">
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-mono">{supportEmail}</span>
              </a>

              <span className="text-slate-700 hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orange-500" />
                <span>Free Worldwide Tracked Delivery</span>
              </div>

              <span className="text-slate-700 hidden md:inline">|</span>

              <div className="hidden md:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>{turnaroundTime}</span>
              </div>

              <span className="text-slate-700 hidden lg:inline">|</span>

              <div className="hidden lg:flex items-center gap-1 text-amber-400 font-semibold">
                <span>★ ★ ★ ★ ★</span>
                <span className="text-slate-300 font-mono text-[10px]">4.9/5 (2,400+ Reviews)</span>
              </div>
            </div>

            {/* Right: Announcement / Promo Code */}
            <div className="flex items-center gap-3">
              {announcementText ? (
                <div className="text-orange-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span>{announcementText}</span>
                </div>
              ) : (
                <div className="text-slate-400 text-[11px] font-mono">
                  <span>Direct Factory Production • Tajima Looms</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. Main Brand Navbar */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo: BDigitizing */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-500 text-white flex items-center justify-center font-black shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <line x1="6" y1="4" x2="6" y2="20" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-950 flex items-center gap-1 font-sans">
                <span className="text-orange-500">B</span>Digitizing
              </div>
              <div className="text-[10px] tracking-wider uppercase text-slate-500 font-bold">
                — Stitch Your Identity —
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <Link href="/" className="text-orange-600 transition-colors">
              Home
            </Link>

            {/* Custom Patches Dropdown Menu */}
            <div className="relative group py-2">
              <a
                href="#services"
                className="inline-flex items-center gap-1 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <span>Custom Patches</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:rotate-180 transition-transform" />
              </a>

              {/* Mega-Dropdown Panel */}
              <div className="absolute top-full -left-12 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'embroidered', name: 'Embroidered Patches', tag: 'Most Popular', icon: '🧵', desc: 'Classic 100% thread coverage' },
                    { id: 'pvc', name: '3D Molded PVC Rubber', tag: '100% Waterproof', icon: '🛡️', desc: 'Tactical sculpted relief depth' },
                    { id: 'leather', name: 'Debossed Leather', tag: 'Rustic Luxury', icon: '🪵', desc: 'Laser-etched & debossed finish' },
                    { id: 'woven', name: 'Micro Woven Patches', tag: '0.5mm Precision', icon: '🪡', desc: 'Ultra-fine typography & lines' },
                    { id: 'chenille', name: 'Vintage Chenille', tag: 'Varsity Loop', icon: '🏈', desc: 'Textured collegiate letterman' },
                    { id: 'iron-on', name: 'Heat-Seal Iron-On', tag: 'Fast Press', icon: '🔥', desc: 'Permanent thermal polymer' },
                    { id: 'velcro', name: 'Tactical Velcro Patches', tag: 'Combat Grade', icon: '🎖️', desc: 'Pre-sewn hook & loop fasteners' },
                    { id: 'sublimated', name: 'Photo Sublimated', tag: '1200 DPI HD', icon: '🎨', desc: 'Full gradient color spectrum' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (onOpenQuote) onOpenQuote(item.id);
                        else {
                          const el = document.getElementById('services');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="p-2.5 rounded-xl text-left hover:bg-orange-50/70 border border-transparent hover:border-orange-100 transition-all flex items-start gap-2.5 group/item cursor-pointer"
                    >
                      <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover/item:text-orange-600 transition-colors">
                          <span className="truncate">{item.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <span className="text-slate-600 font-medium">
                    ⚡ Free 6-hour Tajima digital stitch proof with every quote!
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenQuote && onOpenQuote()}
                    className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Instant Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <a href="#pricing" className="hover:text-orange-600 transition-colors">
              Pricing Cards
            </a>
            <a href="#portfolio" className="hover:text-orange-600 transition-colors">
              Portfolio
            </a>
            <a href="#why-us" className="hover:text-orange-600 transition-colors">
              About
            </a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search patches"
                className="p-2.5 rounded-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer border border-transparent hover:border-orange-200"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Primary CTA: Get a Quote */}
            <button
              type="button"
              onClick={() => onOpenQuote?.()}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white text-sm font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 shadow-xl">
            <div className="flex flex-col space-y-3 text-sm font-bold text-slate-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-orange-600 py-1"
              >
                Home
              </Link>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 py-1"
              >
                Custom Patches
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 py-1"
              >
                Pricing Cards
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 py-1"
              >
                Portfolio Gallery
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 py-1"
              >
                About Factory
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-600 py-1"
              >
                FAQs
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
}

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
      
      {/* 1. Fiverr-Style Dark Top Bar */}
      {announcementEnabled && (
        <div className="bg-[#1a1a1a] text-slate-300 py-2 px-4 sm:px-6 text-xs border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs">
            
            {/* Left Trust Indicators */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 text-slate-300">
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-1.5 hover:text-[#1dbf73] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#1dbf73]" />
                <span className="font-mono">{supportEmail}</span>
              </a>

              <span className="text-neutral-700 hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#1dbf73]" />
                <span>Free Worldwide Tracked Delivery</span>
              </div>

              <span className="text-neutral-700 hidden md:inline">|</span>

              <div className="hidden md:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1dbf73]" />
                <span>{turnaroundTime}</span>
              </div>

              <span className="text-neutral-700 hidden lg:inline">|</span>

              <div className="hidden lg:flex items-center gap-1 text-[#1dbf73] font-semibold">
                <span>★ ★ ★ ★ ★</span>
                <span className="text-slate-300 font-mono text-[10px]">4.9/5 (2,850+ Reviews)</span>
              </div>
            </div>

            {/* Right: Announcement / Promo Code */}
            <div className="flex items-center gap-3">
              {announcementText ? (
                <div className="text-[#1dbf73] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1dbf73] animate-pulse" />
                  <span>{announcementText}</span>
                </div>
              ) : (
                <div className="text-slate-400 text-[11px] font-mono">
                  <span>Pro Factory Certified • Tajima Looms</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. Main Brand Navbar (Fiverr Clean Style) */}
      <nav className="w-full bg-white border-b border-[#e4e5e7] shadow-xs">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo: BDigitizing. with iconic dot */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#222325] text-white flex items-center justify-center font-black shadow-md group-hover:bg-[#1dbf73] transition-colors">
              <span className="text-xl font-bold font-sans">B</span>
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-[#222325] flex items-center gap-0.5 font-sans">
                BDigitizing<span className="text-[#1dbf73] text-3xl leading-none">.</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200 ml-1.5">
                  PRO
                </span>
              </div>
              <div className="text-[10px] tracking-wider uppercase text-slate-500 font-bold">
                Custom Patches On-Demand
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#404145]">
            <Link href="/" className="text-[#1dbf73] font-bold transition-colors">
              Home
            </Link>

            {/* Custom Patches Dropdown Menu */}
            <div className="relative group py-2">
              <a
                href="#services"
                className="inline-flex items-center gap-1 hover:text-[#1dbf73] transition-colors cursor-pointer"
              >
                <span>Patch Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1dbf73] group-hover:rotate-180 transition-transform" />
              </a>

              {/* Mega-Dropdown Panel */}
              <div className="absolute top-full -left-12 w-[540px] bg-white rounded-2xl shadow-2xl border border-[#e4e5e7] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'embroidered', name: 'Embroidered Patches', tag: 'Top Rated', icon: '🧵', desc: 'Classic 100% thread coverage' },
                    { id: 'pvc', name: '3D Molded PVC Rubber', tag: 'Waterproof', icon: '🛡️', desc: 'Tactical sculpted relief depth' },
                    { id: 'leather', name: 'Debossed Leather', tag: 'Luxury', icon: '🪵', desc: 'Laser-etched & debossed finish' },
                    { id: 'woven', name: 'Micro Woven Patches', tag: '0.5mm Weave', icon: '🪡', desc: 'Ultra-fine typography & lines' },
                    { id: 'chenille', name: 'Vintage Chenille', tag: 'Varsity Loop', icon: '🏈', desc: 'Textured collegiate letterman' },
                    { id: 'iron-on', name: 'Heat-Seal Iron-On', tag: 'Quick Apply', icon: '🔥', desc: 'Permanent thermal polymer' },
                    { id: 'velcro', name: 'Tactical Velcro Patches', tag: 'Mil-Spec', icon: '🎖️', desc: 'Pre-sewn hook & loop fasteners' },
                    { id: 'sublimated', name: 'Photo Sublimated', tag: '1200 DPI', icon: '🎨', desc: 'Full gradient color spectrum' },
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
                      className="p-2.5 rounded-xl text-left hover:bg-emerald-50/70 border border-transparent hover:border-emerald-100 transition-all flex items-start gap-2.5 group/item cursor-pointer"
                    >
                      <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-bold text-[#222325] group-hover/item:text-[#1dbf73] transition-colors">
                          <span className="truncate">{item.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-[#e4e5e7] flex items-center justify-between text-xs bg-[#f7f7f7] -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <span className="text-slate-600 font-medium">
                    ⚡ Free 6-hour Tajima digital stitch proof included!
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenQuote && onOpenQuote()}
                    className="font-bold text-[#1dbf73] hover:text-[#19a463] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <a href="#pricing" className="hover:text-[#1dbf73] transition-colors">
              Pricing Packages
            </a>
            <a href="#how-it-works" className="hover:text-[#1dbf73] transition-colors">
              How It Works
            </a>
            <a href="#portfolio" className="hover:text-[#1dbf73] transition-colors">
              Showcase
            </a>
            <a href="#reviews" className="hover:text-[#1dbf73] transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-[#1dbf73] transition-colors">
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
                className="p-2.5 rounded-full text-slate-600 hover:text-[#1dbf73] hover:bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Primary CTA: Get a Quote (Fiverr Green) */}
            <button
              type="button"
              onClick={() => onOpenQuote?.()}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1dbf73] hover:bg-[#19a463] active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2.5 rounded-xl border border-[#e4e5e7] text-slate-700 hover:text-[#1dbf73] hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#e4e5e7] px-6 py-5 space-y-4 animate-in slide-in-from-top-2 shadow-xl">
            <div className="flex flex-col space-y-3 text-sm font-bold text-[#222325]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1dbf73] py-1"
              >
                Home
              </Link>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                Patch Categories
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                Pricing Packages
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                How It Works
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                Showcase
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                Customer Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#1dbf73] py-1"
              >
                FAQs
              </a>
            </div>

            <div className="pt-3 border-t border-[#e4e5e7] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
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

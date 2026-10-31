'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  whatsappNumber?: string;
}

export default function Navbar({ whatsappNumber = '18005557282' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070913]/90 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo matching EmbroidPro aesthetic */}
        <Link href="/" className="inline-flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5448ea] via-[#6366f1] to-[#7c3aed] p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#0a0d1e] rounded-[10px] flex items-center justify-center font-black text-indigo-400">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2.4">
                <circle cx="6" cy="6" r="3" />
                <path d="M8.12 8.12 12 12" />
                <path d="M20 4 8.12 15.88" />
                <circle cx="6" cy="18" r="3" />
                <path d="M14.8 14.8 20 20" />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 font-sans">
              EMBROID<span className="text-[#5448ea]">PATCHES</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              Custom Patch Manufacturer
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <a href="#services" className="hover:text-indigo-400 transition-colors">
            Patch Styles
          </a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">
            Pricing
          </a>
          <a href="#standards" className="hover:text-indigo-400 transition-colors">
            The Standard
          </a>
          <a href="#customizer-studio" className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span>3D Studio</span>
          </a>
          <a href="#portfolio" className="hover:text-indigo-400 transition-colors">
            Portfolio
          </a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">
            FAQ
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Portal Pill */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition-all shadow-xs"
            title="Executive Factory Operations Console"
          >
            <span>🔒</span>
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="sm:hidden">Admin</span>
          </Link>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello EmbroidPatches, I need a custom patch quote!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WhatsApp</span>
          </a>

          {/* Start Order Gradient CTA */}
          <a
            href="#order"
            className="inline-flex items-center justify-center gap-1.5 font-bold tracking-tight text-white rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm btn-primary-gradient cursor-pointer"
          >
            <span>Start Order</span>
            <span>→</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white lg:hidden"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#080b16] px-4 pt-3 pb-6 lg:hidden space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            🧵 Patch Styles & Materials
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            💲 Wholesale Pricing Plans
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            📐 The EmbroidPro Standard
          </a>
          <a
            href="#customizer-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-indigo-400"
          >
            ✨ 3D Interactive Patch Studio
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            🖼️ Production Gallery
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            🚀 How It Works
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
          >
            ❓ Frequently Asked Questions
          </a>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-center font-bold text-indigo-300 text-xs"
            >
              🔒 VIP Admin Portal (Operations Console)
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-xl bg-emerald-600 text-center font-bold text-white text-xs"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

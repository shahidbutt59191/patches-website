'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-black text-amber-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.2">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" strokeDasharray="3,1.5" />
                <circle cx="12" cy="12" r="3" fill="#f59e0b" />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-white">
              APEX<span className="text-amber-500">PATCHES</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Custom Industrial Studio
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          <a href="#order-form" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
            Instant Order Builder
          </a>
          <a href="#patch-types" className="hover:text-amber-400 transition-colors">
            Patch Types
          </a>
          <a href="#how-to-order" className="hover:text-amber-400 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">
            FAQ & Specs
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/18005557282?text=Hello%20ApexPatches,%20I%20need%20a%20custom%20patch%20quote!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-900/50 sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
            </svg>
            <span>Live Chat</span>
          </a>

          <a
            href="#order-form"
            className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:scale-105"
          >
            Start Order
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-6 py-6 space-y-4 md:hidden">
          <a
            href="#order-form"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-amber-400"
          >
            ⚡ Instant Order Builder
          </a>
          <a
            href="#patch-types"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white"
          >
            🧵 Patch Styles & Materials
          </a>
          <a
            href="#how-to-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white"
          >
            🚀 How To Order (3 Steps)
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-white"
          >
            ❓ Frequently Asked Questions
          </a>
        </div>
      )}
    </header>
  );
}

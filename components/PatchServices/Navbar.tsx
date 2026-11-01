'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Phone, MessageSquare, Menu, X, ArrowRight, Star, Lock } from 'lucide-react';

interface NavbarProps {
  whatsappNumber?: string;
}

export default function Navbar({ whatsappNumber = '18005557282' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* Top Trust & Hotline Ticker */}
      <div className="bg-[#05070d] border-b border-white/[0.07] py-1.5 px-4 text-xs font-mono text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9/5 Rating (3,800+ Verified Orders)</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-slate-300">
              ⚡ Free 6-Hour Digital Proof with Unlimited Revisions
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-emerald-400">
              ✓ Free Worldwide Delivery on Bulk Runs
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:inline">
              Loom Hotline: <strong className="text-white">+1 (800) 555-7282</strong>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full backdrop-blur-xl bg-[#080a14]/95 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex h-18 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0d1e] rounded-[10px] flex items-center justify-center font-black text-amber-400">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
                <span>APEX</span>
                <span className="text-indigo-400 font-extrabold">PATCHES</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                Custom Patch Manufacturing
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300 tracking-wide">
            <a href="#services" className="hover:text-indigo-400 transition-colors">
              Patch Services
            </a>
            <a href="#calculator" className="hover:text-indigo-400 transition-colors">
              Pricing Calculator
            </a>
            <a href="#backings" className="hover:text-indigo-400 transition-colors">
              Backings &amp; Borders
            </a>
            <a href="#process" className="hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#gallery" className="hover:text-indigo-400 transition-colors">
              Gallery
            </a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">
              FAQ
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-2 text-xs font-bold text-indigo-300 transition-all"
              title="Secure Factory Operations Portal"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 font-bold text-white rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm btn-primary-gradient cursor-pointer shadow-lg"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white lg:hidden rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-white/10 bg-[#080b18] px-4 pt-4 pb-6 lg:hidden space-y-3 animate-in fade-in duration-150">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              🧵 Patch Services &amp; Styles
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              🧮 Bulk Pricing Calculator
            </a>
            <a
              href="#backings"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              🧲 Fasteners &amp; Backings Guide
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              🚀 4-Step Ordering Process
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              🖼️ Client Work Gallery
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-300 hover:text-indigo-400"
            >
              ❓ Frequently Asked Questions
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 rounded-xl btn-primary-gradient text-center font-bold text-white text-xs"
              >
                Get Free Proof &amp; Quote
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-emerald-600 text-center font-bold text-white text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (24/7 Desk)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

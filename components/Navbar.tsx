'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Star, MessageSquare, Menu, X, ArrowRight, Lock, Phone } from 'lucide-react';

interface NavbarProps {
  whatsappNumber?: string;
}

export default function Navbar({ whatsappNumber = '18005557282' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* Top Trust & Hotline Ticker */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800 py-2 px-4 text-xs font-mono">
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
            <span className="hidden lg:inline text-emerald-400 font-semibold">
              ✓ Free Worldwide Delivery on Bulk Runs
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:inline">
              Direct Loom Hotline: <strong className="text-white font-mono">+1 (800) 555-7282</strong>
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Desk 24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full backdrop-blur-xl bg-white/95 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-blue-500 fill-blue-500/20" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-sans">
                <span>APEX</span>
                <span className="text-blue-600">PATCHES</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                Direct Custom Patch Manufacturer
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-7 text-xs font-semibold text-slate-700 tracking-wide">
            <a href="#services" className="hover:text-blue-600 transition-colors">
              Patch Services
            </a>
            <a href="#comparison" className="hover:text-blue-600 transition-colors">
              Compare Materials
            </a>
            <a href="#calculator" className="hover:text-blue-600 transition-colors">
              Bulk Calculator
            </a>
            <a href="#backings" className="hover:text-blue-600 transition-colors">
              Fasteners &amp; Borders
            </a>
            <a href="#process" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#gallery" className="hover:text-blue-600 transition-colors">
              Gallery
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-all"
              title="Secure Factory Operations Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 font-bold text-white rounded-xl px-5 py-2.5 text-xs sm:text-sm btn-primary-blue cursor-pointer shadow-md"
            >
              <span>Get Free Quote &amp; Proof</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 xl:hidden rounded-lg bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 pt-4 pb-6 xl:hidden space-y-3 shadow-lg animate-in fade-in duration-150">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              🧵 Patch Services &amp; Styles
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              📊 Compare Patch Materials
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              🧮 Bulk Pricing Calculator
            </a>
            <a
              href="#backings"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              🧲 Fasteners &amp; Backings Guide
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              🚀 4-Step Production Process
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              🖼️ Client Work Gallery
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-blue-600"
            >
              ❓ Frequently Asked Questions
            </a>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <a
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 rounded-xl btn-primary-blue text-center font-bold text-white text-xs"
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Truck, Clock, Search, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenQuote?: () => void;
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
      
      {/* 0. Top Dynamic Announcement Strip if enabled */}
      {announcementEnabled && announcementText && (
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white py-2 px-4 text-center text-xs font-bold tracking-wide shadow-xs flex items-center justify-center gap-2">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-black uppercase font-mono">
            Special Promo
          </span>
          <span>{announcementText}</span>
        </div>
      )}

      {/* 1. Dark Charcoal Top Announcement & Trust Bar */}
      <div className="bg-[#111318] text-slate-300 py-2 px-4 sm:px-6 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs">
          
          {/* Left Details */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-slate-300">
            <a
              href={`mailto:${supportEmail}`}
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-orange-500" />
              <span>{supportEmail}</span>
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Shipping Worldwide</span>
            </div>

            <span className="text-slate-600 hidden md:inline">|</span>

            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{turnaroundTime}</span>
            </div>
          </div>

          {/* Right Social Media Links */}
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main White Brand Navbar */}
      <nav className="w-full bg-white border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo: BDigitizing */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-500 text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
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
              <div className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold">
                — Stitch Your Identity —
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-orange-500 font-bold border-b-2 border-orange-500 pb-1">
              Home
            </Link>
            <a href="#services" className="hover:text-orange-500 transition-colors">
              Custom Patches
            </a>
            <a href="#pricing" className="hover:text-orange-500 transition-colors font-bold text-orange-600">
              Pricing Cards
            </a>
            <a href="#portfolio" className="hover:text-orange-500 transition-colors">
              Portfolio
            </a>
            <a href="#why-us" className="hover:text-orange-500 transition-colors">
              About
            </a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Action Icons & Quote CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 rounded-full text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onOpenQuote}
              className="btn-orange px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-orange-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slideout Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg animate-in fade-in">
            <div className="flex flex-col space-y-3 font-semibold text-slate-800 text-sm">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-orange-500 font-bold"
              >
                Home
              </Link>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500"
              >
                Custom Patches
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500 font-bold text-orange-600"
              >
                Pricing Cards
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500"
              >
                Portfolio
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500"
              >
                About Factory
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-orange-500"
              >
                FAQ
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="w-full btn-orange py-3 rounded-full text-center text-sm font-bold flex items-center justify-center gap-2"
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

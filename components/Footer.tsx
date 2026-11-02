'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenQuote?: () => void;
  socialInstagram?: string;
  socialFacebook?: string;
  socialYoutube?: string;
  socialLinkedin?: string;
  supportEmail?: string;
  supportPhone?: string;
  companyAddress?: string;
}

export default function Footer({
  onOpenQuote,
  socialInstagram = 'https://instagram.com/bdigitizing',
  socialFacebook = 'https://facebook.com/bdigitizing',
  socialYoutube = 'https://youtube.com/@bdigitizing',
  socialLinkedin = 'https://linkedin.com/company/bdigitizing',
  supportEmail = 'support@bdigitizing.com',
  supportPhone = '+1 (800) 555-7282',
  companyAddress = 'Suite 400, Industrial Arts District, Dallas, TX 75201, USA',
}: FooterProps) {
  return (
    <footer id="footer" className="bg-[#0e1015] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Row: Brand Logo, Nav Links, Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <line x1="6" y1="4" x2="6" y2="20" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                <span className="text-orange-500">B</span>Digitizing
              </div>
              <div className="text-[9px] tracking-wider uppercase text-slate-500 font-semibold">
                — Stitch Your Identity —
              </div>
            </div>
          </Link>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <a href="#services" className="hover:text-orange-400 transition-colors">
              Custom Patches
            </a>
            <a href="#portfolio" className="hover:text-orange-400 transition-colors">
              Portfolio
            </a>
            <a href="#why-us" className="hover:text-orange-400 transition-colors">
              About
            </a>
            <a href="#faq" className="hover:text-orange-400 transition-colors">
              FAQ
            </a>
            <button
              type="button"
              onClick={onOpenQuote}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={socialFacebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href={socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={socialYoutube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href={socialLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-orange-400 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-slate-500">
          <div>
            &copy; 2026 BDigitizing. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

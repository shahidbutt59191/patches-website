'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Award,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

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
    <footer id="footer" className="bg-[#0c0e14] text-slate-400 text-xs border-t border-slate-800">
      
      {/* 1. Trust & Quality Seals Strip */}
      <div className="border-b border-slate-800/80 bg-[#090b10] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Tajima Looms</div>
              <div className="text-[11px] text-slate-500">1,200 SPM Multi-Head</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Madeira Polyneon</div>
              <div className="text-[11px] text-slate-500">100% German Thread</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Free Tracked Courier</div>
              <div className="text-[11px] text-slate-500">Fast Global Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Proof Guarantee</div>
              <div className="text-[11px] text-slate-500">Unlimited Free Edits</div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main 4-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#222325] text-white flex items-center justify-center font-black shadow-md group-hover:bg-[#1dbf73] transition-colors">
                <span className="text-xl font-bold font-sans">B</span>
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white flex items-center gap-0.5 font-sans">
                  BDigitizing<span className="text-[#1dbf73] text-2xl leading-none">.</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#1dbf73] border border-emerald-500/30 ml-1.5">
                    PRO
                  </span>
                </div>
                <div className="text-[9px] tracking-wider uppercase text-slate-400 font-bold">
                  Custom Patches On-Demand
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Direct factory manufacturer of high-density embroidered, woven, 3D molded PVC, laser debossed leather, and custom tactical morale patches for global brands, teams, and uniform units.
            </p>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href={socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-colors"
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
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-colors"
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
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-colors"
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
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Custom Patch Styles (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Custom Patch Styles
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Embroidered Patches (Tajima Thread)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Velcro Morale Patches (Mil-Spec)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Heat-Seal Iron-On Patches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Jacquard Micro-Woven Patches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Laser Debossed Leather Patches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  3D Molded Soft PVC Patches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Vintage Chenille Letterman Patches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Dye-Sublimated Photo Patches
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Resources & Guides (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Guides &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pricing" className="hover:text-orange-400 transition-colors">
                  Bulk Pricing Tiers
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-orange-400 transition-colors">
                  Portfolio Gallery
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-orange-400 transition-colors">
                  Factory Advantage
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">
                  FAQ &amp; Help Desk
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-orange-400 hover:text-orange-300 font-bold">
                  Admin Command Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Contact & Live Proof CTA (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Factory Headquarters
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">{companyAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-mono">{supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-slate-300 font-mono">{supportPhone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                <span>Request Free Digital Proof</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. Bottom Legal & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 BDigitizing Inc. All rights reserved. Direct Manufacturer &amp; Custom Patch Studio.
          </div>

          {/* Payment Methods Badges */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">MASTERCARD</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">AMEX</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PAYPAL</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">APPLE PAY</span>
          </div>
        </div>

      </div>

    </footer>
  );
}

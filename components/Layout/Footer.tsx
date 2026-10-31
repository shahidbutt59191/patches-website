'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  supportEmail?: string;
  supportPhone?: string;
  whatsappNumber?: string;
}

export default function Footer({
  supportEmail = 'orders@apexpatches.com',
  supportPhone = '+1 (800) 555-7282',
  whatsappNumber = '18005557282',
}: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#060810] text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5448ea] to-[#7c3aed] flex items-center justify-center font-black text-white text-sm shadow-md">
                EP
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white font-sans">
                  EMBROID<span className="text-[#5448ea]">PATCHES</span>
                </div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-slate-500">
                  Commercial Patch Manufacturer
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industrial Tajima computerized embroidery, 3D soft PVC rubber molding, laser-cut leatherette, and varsity chenille patches. Direct factory facility with zero middlemen.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Looms Active: 24/6 Operation</span>
            </div>
          </div>

          {/* Col 2: Patch Styles */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Patch Styles
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Custom Embroidered</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">3D Soft PVC Rubber</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Vintage Varsity Chenille</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Laser-Cut Leatherette</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Micro-Woven Damask</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Dye-Sublimated Photo</a></li>
            </ul>
          </div>

          {/* Col 3: Backings & Hardware */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Attachment Backings
            </h4>
            <ul className="space-y-2">
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">Hook & Loop (Velcro)</a></li>
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">Heat-Seal Iron-On Film</a></li>
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">Reinforced Sew-On Twill</a></li>
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">3M Heavy Peel & Stick</a></li>
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">Dual-Magnet Pinless Bar</a></li>
              <li><a href="#backings" className="hover:text-indigo-400 transition-colors">Merrowed Overlock Edge</a></li>
            </ul>
          </div>

          {/* Col 4: Operations & Support */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Customer Desk
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>📧</span>
                <span className="truncate">{supportEmail}</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>📞</span>
                <span>{supportPhone}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
                >
                  <span>💬</span>
                  <span>WhatsApp 24/7 Desk</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 font-mono text-[11px] font-bold"
                >
                  <span>🔒</span>
                  <span>VIP Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © 2026 EmbroidPatches Manufacturing Co. All rights reserved. •{' '}
            <Link href="/admin" className="text-indigo-400 hover:underline font-bold">
              Operations Admin
            </Link>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>AMEX</span>
            <span>PAYPAL</span>
            <span>APPLE PAY</span>
            <span>NET-30 INVOICE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

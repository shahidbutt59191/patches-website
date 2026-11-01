'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, MessageSquare, Phone, Mail, Lock } from 'lucide-react';

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
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white font-sans">
                  APEX<span className="text-blue-500">PATCHES</span>
                </div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400">
                  Direct Custom Patch Factory
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industrial Tajima multi-head computerized embroidery, 3D soft PVC rubber molding, laser-cut leatherette, and vintage varsity chenille patches. Direct factory facility with zero middlemen.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Looms Active: 24/6 Operation</span>
            </div>
          </div>

          {/* Col 2: Patch Services */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Patch Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Custom Embroidered</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">3D Soft Molded PVC</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Laser-Cut Leatherette</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vintage Varsity Chenille</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Jacquard Micro-Woven</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dye-Sublimated Photo</a></li>
            </ul>
          </div>

          {/* Col 3: Backings & Specs */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Hardware &amp; Backings
            </h4>
            <ul className="space-y-2">
              <li><a href="#backings" className="hover:text-white transition-colors">Hook &amp; Loop (Velcro)</a></li>
              <li><a href="#backings" className="hover:text-white transition-colors">Thermal Iron-On Film</a></li>
              <li><a href="#backings" className="hover:text-white transition-colors">Reinforced Sew-On Edge</a></li>
              <li><a href="#backings" className="hover:text-white transition-colors">3M Heavy Peel &amp; Stick</a></li>
              <li><a href="#backings" className="hover:text-white transition-colors">Dual-Plate Magnetic Pinless</a></li>
              <li><a href="#backings" className="hover:text-white transition-colors">Merrowed Overlock Edges</a></li>
            </ul>
          </div>

          {/* Col 4: Operations & Support */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Customer Desk
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">{supportEmail}</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{supportPhone}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp 24/7 Desk</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white font-mono text-[11px] font-bold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>VIP Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © 2026 ApexPatches Manufacturing Co. All rights reserved. •{' '}
            <Link href="/admin" className="text-blue-400 hover:underline font-bold">
              Factory Admin
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

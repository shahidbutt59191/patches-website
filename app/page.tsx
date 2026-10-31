'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PatchCustomizerStudio from '@/components/PatchCustomizerStudio';
import BulkPricingCalculator from '@/components/BulkPricingCalculator';
import BackingsGuide from '@/components/BackingsGuide';
import PortfolioGallery from '@/components/PortfolioGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import OrderForm from '@/components/OrderForm';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // 1. Check local storage for instant reactivity
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch (e) {
      console.log('Error reading local settings:', e);
    }

    // 2. Fetch fresh settings from API
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setSettings({ ...DEFAULT_SETTINGS, ...data });
        }
      })
      .catch((err) => console.log('Settings fetch error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* Dynamic Top Announcement Banner */}
      {settings.announcementEnabled && settings.announcementText && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-2.5 px-4 text-center text-xs font-bold text-black tracking-wide shadow-md">
          <span className="mr-2 inline-block rounded-full bg-black px-2 py-0.5 text-[10px] font-black uppercase text-amber-400">
            Special Offer
          </span>
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* Dynamic Navbar */}
      <Navbar whatsappNumber={settings.whatsappNumber} />

      {/* Hero Section (Editable from Admin Portal) */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-amber-500/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{settings.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl sm:leading-tight">
              {settings.heroHeadline}
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg max-w-3xl mx-auto">
              {settings.heroSubheadline}
            </p>

            {/* Hero Action CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#customizer-studio"
                className="w-full rounded-2xl bg-amber-500 px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-xl shadow-amber-500/25 transition-all hover:bg-amber-400 hover:scale-105 sm:w-auto flex items-center justify-center gap-2"
              >
                <span>✨ Launch 3D Patch Studio</span>
              </a>
              <a
                href="#calculator-section"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-8 py-4 text-sm font-bold text-slate-200 transition-colors hover:border-amber-500 hover:text-white sm:w-auto"
              >
                Instant Pricing Calculator
              </a>
              <a
                href="#order-form"
                className="w-full rounded-2xl border border-amber-500/40 bg-amber-500/10 px-8 py-4 text-sm font-bold text-amber-400 transition-colors hover:bg-amber-500/20 sm:w-auto"
              >
                Direct Order Form ↓
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-14 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-4 text-xs font-mono text-slate-400">
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/50">⚡ 6-Hour Free Proof</div>
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/50">🧵 100% Madeira Thread</div>
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/50">🛡️ Mil-Spec Tactical Velcro</div>
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/50">✈️ Worldwide Express Air</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 1. INTERACTIVE 3D LIVE PATCH CUSTOMIZER STUDIO */}
      {/* ===================================================================== */}
      <PatchCustomizerStudio />

      {/* ===================================================================== */}
      {/* 2. INSTANT BULK PRICING CALCULATOR WITH SLIDERS */}
      {/* ===================================================================== */}
      <BulkPricingCalculator />

      {/* ===================================================================== */}
      {/* 3. TYPES OF PATCHES MATERIAL LINEUP */}
      {/* ===================================================================== */}
      <section id="patch-types" className="border-t border-slate-800/80 bg-slate-900/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-mono">
              Complete Material Lineup
            </h2>
            <h3 className="mt-2 text-3xl font-black text-white sm:text-5xl tracking-tight">
              Types of Custom Patches We Manufacture
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-400">
              Every style engineered to exact military, athletic, and streetwear specifications.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Custom Embroidered',
                badge: 'Industry Standard',
                desc: 'Classic raised thread texture woven with ultra-dense Tajima stitches. Ideal for uniforms, workwear, and biker cuts.',
                price: `From $${settings.basePrice.toFixed(2)} / ea`,
                features: ['Up to 12 Madeira thread colors', 'Merrowed or laser-cut edge', 'Twill fabric backing'],
              },
              {
                title: '3D Soft PVC Rubber',
                badge: 'Mil-Spec Waterproof',
                desc: 'Tactical rubber morale patches with sharp 2D/3D sculpting. Impervious to mud, rain, heat, and heavy combat wear.',
                price: `From $${(settings.basePrice * 1.25).toFixed(2)} / ea`,
                features: ['Washable & weatherproof', 'Recessed stitching channels', 'Hook & loop backing standard'],
              },
              {
                title: 'Laser Leatherette',
                badge: 'Premium Lifestyle',
                desc: 'Rich caramel and charcoal synthetic leather etched with high-precision fiber lasers. Ideal for trucker snapbacks and jackets.',
                price: `From $${(settings.basePrice * 1.15).toFixed(2)} / ea`,
                features: ['High-contrast dark etching', 'Clean stitch channel', 'Iron-on adhesive or sew-on'],
              },
              {
                title: 'Vintage Varsity Chenille',
                badge: 'Authentic High-Pile',
                desc: 'Thick, fluffy looped yarn chenille on heavy wool felt backing. Made for varsity letterman jackets and athletic awards.',
                price: `From $${(settings.basePrice * 1.3).toFixed(2)} / ea`,
                features: ['Thick 3D pile depth', 'Double-layer felt borders', 'Traditional chenille chainstitch'],
              },
              {
                title: 'Jacquard Woven',
                badge: 'Ultra-Fine Detail',
                desc: 'Thin thread count capable of rendering small lettering and intricate gradient graphics that embroidery cannot reproduce.',
                price: `From $${(settings.basePrice * 0.95).toFixed(2)} / ea`,
                features: ['Crisp small text down to 2mm', 'Flat modern profile', 'Zero snagging surface'],
              },
              {
                title: 'Dye Sublimated Print',
                badge: 'Full Color Photographic',
                desc: 'Full-color continuous tones infused directly into polyester twill fabric. Exact photographic rendering with unlimited colors.',
                price: `From $${(settings.basePrice * 0.9).toFixed(2)} / ea`,
                features: ['Unlimited gradients & colors', 'Merrowed embroidery edge', 'Fade-resistant pigment infusion'],
              },
            ].map((p, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {p.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300">{p.price}</span>
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.desc}</p>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-4">
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {p.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <span className="text-amber-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. BACKINGS & HARDWARE ATTACHMENT GUIDE */}
      {/* ===================================================================== */}
      <BackingsGuide />

      {/* ===================================================================== */}
      {/* 5. HOW TO ORDER IN 3 FAST STEPS */}
      {/* ===================================================================== */}
      <section id="how-to-order" className="py-24 border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-mono">
              Simple Production Pipeline
            </h2>
            <h3 className="mt-2 text-3xl font-black text-white sm:text-5xl tracking-tight">
              How To Order in 3 Fast Steps
            </h3>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Configure & Upload Artwork',
                desc: 'Select your size, backing, and quantity. Upload your artwork, sketch, or logo in any file format (AI, PDF, PNG, JPG).',
              },
              {
                step: '02',
                title: 'Review Free Digital Proof',
                desc: 'Within 6 hours, our master Tajima digitizers send you an exact stitch-count simulation showing thread colors and edge detail.',
              },
              {
                step: '03',
                title: 'Tajima Production & Delivery',
                desc: 'Once approved, your patches run on industrial computerized embroidery looms and ship express directly to your door.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center hover:border-slate-700 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 font-mono text-xl font-black text-amber-400 border border-amber-500/30">
                  {s.step}
                </div>
                <h4 className="text-base font-black text-white">{s.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. PRODUCTION PORTFOLIO SHOWCASE */}
      {/* ===================================================================== */}
      <PortfolioGallery />

      {/* ===================================================================== */}
      {/* 7. VERIFIED CUSTOMER REVIEWS (5.0★) */}
      {/* ===================================================================== */}
      <TestimonialsSection />

      {/* ===================================================================== */}
      {/* 8. INTERACTIVE ORDER & INSTANT QUOTE FORM */}
      {/* ===================================================================== */}
      <section id="order-form" className="border-t border-slate-800/80 bg-slate-900/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-mono">
              Instant Order Studio
            </h2>
            <h3 className="mt-2 text-3xl font-black text-white sm:text-5xl tracking-tight">
              Build Your Custom Patch Order
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Submit your patch specifications with artwork attachment. Free digital proof delivered in 6 hours.
            </p>
          </div>

          <OrderForm />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 9. FAQ SECTION */}
      {/* ===================================================================== */}
      <section id="faq" className="border-t border-slate-800/80 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-mono">
              Got Questions?
            </h2>
            <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the minimum order quantity (MOQ)?',
                a: 'Our factory minimum is 10 pieces per design. We provide deep wholesale volume discounts starting at 25, 50, 100, 250, 500, and 1,000+ pieces.',
              },
              {
                q: 'Do I have to pay before seeing a proof?',
                a: 'No! You submit your design and receive a digital Tajima stitch proof within 6 hours. You only pay when you are 100% satisfied with the proof.',
              },
              {
                q: 'What is the difference between Merrowed and Laser-Cut borders?',
                a: 'A Merrowed border is a traditional rounded overlocked border best for standard symmetrical shapes (circles, shields, rectangles). Laser-cut heat sealing is used for complex contour shapes with die-cut details.',
              },
              {
                q: 'What is the production turnaround time?',
                a: 'Digital proofs take 6 hours. Physical production takes 7-10 business days after proof approval. Express shipping delivers in 2-4 business days.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h4 className="text-sm font-bold text-white">{item.q}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Footer */}
      <Footer
        supportEmail={settings.supportEmail}
        supportPhone={settings.supportPhone}
        whatsappNumber={settings.whatsappNumber}
      />
    </div>
  );
}

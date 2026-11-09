'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  DollarSign,
  Image as ImageIcon,
  Star,
  HelpCircle,
  Settings,
  Users,
  Shield,
  Zap,
  Activity,
  X,
  ExternalLink,
} from 'lucide-react';

export type AdminTabId =
  | 'overview'
  | 'orders'
  | 'pricing_cards'
  | 'pricing'
  | 'portfolio'
  | 'reviews'
  | 'faqs'
  | 'settings'
  | 'b2b';

interface AdminSidebarProps {
  activeTab: AdminTabId;
  setActiveTab: (tab: AdminTabId) => void;
  ordersCount: number;
  pricingCardsCount: number;
  portfolioCount: number;
  reviewsCount: number;
  faqsCount: number;
  b2bCount: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  ordersCount,
  pricingCardsCount,
  portfolioCount,
  reviewsCount,
  faqsCount,
  b2bCount,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const navSections = [
    {
      title: 'Factory Operations',
      items: [
        {
          id: 'overview' as AdminTabId,
          label: 'Command Overview',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'orders' as AdminTabId,
          label: 'Quote Inquiries & Orders',
          icon: <ShoppingBag className="w-4 h-4" />,
          badge: ordersCount,
          badgeColor: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        },
        {
          id: 'b2b' as AdminTabId,
          label: 'Wholesale B2B Accounts',
          icon: <Users className="w-4 h-4" />,
          badge: b2bCount,
        },
      ],
    },
    {
      title: 'Catalog & Pricing',
      items: [
        {
          id: 'pricing_cards' as AdminTabId,
          label: 'Storefront Pricing Cards',
          icon: <Tag className="w-4 h-4" />,
          badge: pricingCardsCount,
        },
        {
          id: 'pricing' as AdminTabId,
          label: 'Rates, Surcharges & Simulator',
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          id: 'portfolio' as AdminTabId,
          label: 'Portfolio Showcase',
          icon: <ImageIcon className="w-4 h-4" />,
          badge: portfolioCount,
        },
      ],
    },
    {
      title: 'Content & Branding',
      items: [
        {
          id: 'reviews' as AdminTabId,
          label: 'Customer Reviews',
          icon: <Star className="w-4 h-4" />,
          badge: reviewsCount,
        },
        {
          id: 'faqs' as AdminTabId,
          label: 'FAQs & Help Desk',
          icon: <HelpCircle className="w-4 h-4" />,
          badge: faqsCount,
        },
        {
          id: 'settings' as AdminTabId,
          label: 'Website & Brand Settings',
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  const handleSelectTab = (id: AdminTabId) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#0c0e14] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out shrink-0 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & Factory OS Badge */}
        <div className="p-4 sm:p-5 border-b border-slate-800/70 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 text-white flex items-center justify-center font-black shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <span className="text-lg">B</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-white tracking-tight">
                  <span className="text-orange-500">B</span>Digitizing
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Master Factory Command OS
              </p>
            </div>
          </Link>

          {/* Close Button on Mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => handleSelectTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 ring-1 ring-orange-400/40'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-400'
                          }`}
                        >
                          {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                      </div>

                      {tab.badge !== undefined && (
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : tab.badgeColor || 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tajima Machine Telemetry Widget at Bottom */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#090b10]/80">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-2 relative overflow-hidden">
            {/* Subtle glow in widget */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-slate-200">Tajima Multi-Head</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1,200 SPM
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Operating automated multi-heads with Madeira 100% Polyneon threads.
            </p>

            <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800">
              <span>Telemetry: Online</span>
              <span className="text-emerald-400">Zero Jams</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

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
      title: 'Operations',
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
          badgeColor: 'bg-emerald-50 text-[#109655] border border-emerald-200',
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
      title: 'Content & Settings',
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
          label: 'Website & Security Settings',
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
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container (Clean White Surface) */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#e4e5e7] flex flex-col transition-transform duration-300 ease-in-out shrink-0 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand & Factory OS Badge */}
        <div className="p-4 sm:p-5 border-b border-[#e4e5e7] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#222325] text-white flex items-center justify-center font-black shadow-md group-hover:bg-[#1dbf73] transition-colors">
              <span className="text-lg">B</span>
            </div>
            <div>
              <div className="flex items-center gap-1 font-sans">
                <span className="text-base font-black text-[#222325] tracking-tight">
                  BDigitizing<span className="text-[#1dbf73] text-xl leading-none">.</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.2 rounded bg-emerald-50 text-[#109655] border border-emerald-200">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Seller Command Center
              </p>
            </div>
          </Link>

          {/* Close Button on Mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-[#222325] hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-[#f0fdf4] text-[#109655] shadow-xs border-r-3 border-[#1dbf73]'
                          : 'text-[#62646a] hover:text-[#222325] hover:bg-[#f7f7f7]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`transition-colors ${
                            isActive ? 'text-[#1dbf73]' : 'text-slate-400 group-hover:text-[#1dbf73]'
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
                              ? 'bg-[#1dbf73] text-white'
                              : tab.badgeColor || 'bg-[#f7f7f7] text-slate-600 border border-[#e4e5e7]'
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

        {/* Bottom Factory Info Footer */}
        <div className="p-3.5 border-t border-[#e4e5e7] bg-[#f7f7f7] text-[11px] text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1dbf73] animate-pulse" />
            <span className="font-bold text-[#222325]">Factory Looms: Active</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v2.4 Pro</span>
        </div>
      </aside>
    </>
  );
}

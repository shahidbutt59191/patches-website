'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  RefreshCw,
  Save,
  Eye,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle2,
  Database,
  Search,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { AdminTabId } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTabId;
  onRefresh: () => void;
  onSave: () => void;
  isSaving: boolean;
  onToggleMobileMenu: () => void;
  onSignOut?: () => void;
}

const TAB_TITLES: Record<AdminTabId, { title: string; subtitle: string }> = {
  overview: {
    title: 'Command Overview',
    subtitle: 'Live manufacturing metrics, quote requests, and order pipeline.',
  },
  orders: {
    title: 'Quote Inquiries & Orders',
    subtitle: 'Manage client proofs, production scheduling, courier tracking, and messaging.',
  },
  pricing_cards: {
    title: 'Storefront Pricing Cards',
    subtitle: 'Configure real-time pricing cards and features displayed on the main site.',
  },
  pricing: {
    title: 'Rates, Surcharges & Simulator',
    subtitle: 'Base rates, backing fees, size multipliers, and interactive price calculator.',
  },
  portfolio: {
    title: 'Portfolio Showcase',
    subtitle: 'Curate high-definition patch specimens displayed in the client gallery.',
  },
  reviews: {
    title: 'Customer Reviews',
    subtitle: 'Manage verified client ratings, testimonials, and brand endorsements.',
  },
  faqs: {
    title: 'FAQs & Help Desk',
    subtitle: 'Organize frequently asked questions for client onboarding.',
  },
  settings: {
    title: 'Website & Brand Settings',
    subtitle: 'Promo announcement banner, hero messaging, factory contact, and social proof.',
  },
  b2b: {
    title: 'Wholesale B2B Accounts',
    subtitle: 'Manage bulk accounts, corporate contract tiers, and wholesale discounts.',
  },
};

export default function AdminHeader({
  activeTab,
  onRefresh,
  onSave,
  isSaving,
  onToggleMobileMenu,
  onSignOut,
}: AdminHeaderProps) {
  const [timeStr, setTimeStr] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const meta = TAB_TITLES[activeTab] || TAB_TITLES.overview;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e4e5e7] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle + Breadcrumb & Section Name */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl bg-[#f7f7f7] border border-[#e4e5e7] text-slate-700 hover:text-[#1dbf73]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
              BDigitizing Pro
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <h1 className="text-base sm:text-lg font-black text-[#222325] tracking-tight flex items-center gap-2">
              <span>{meta.title}</span>
            </h1>
          </div>
          <p className="text-[11px] text-[#62646a] hidden md:block line-clamp-1">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Live Connection Pill + Clock + Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Cloud Database Connection Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#109655]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1dbf73]" />
          </span>
          <span>Supabase Connected</span>
        </div>

        {/* Live Digital Clock */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7f7f7] border border-[#e4e5e7] text-xs font-mono text-slate-700 font-bold">
          <Clock className="w-3.5 h-3.5 text-[#1dbf73]" />
          <span>{timeStr || '12:00:00'}</span>
        </div>

        {/* Refresh Database Button */}
        <button
          type="button"
          onClick={handleRefreshClick}
          title="Refresh database records"
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-slate-50 border border-[#e4e5e7] text-slate-700 hover:text-[#222325] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#1dbf73]' : ''}`} />
          <span className="hidden sm:inline text-xs font-bold">Refresh</span>
        </button>

        {/* View Live Store */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#222325] text-xs font-bold transition-all border border-[#e4e5e7] shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-[#1dbf73]" />
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Save & Publish All (Fiverr Green) */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 rounded-xl btn-fiverr text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
          <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
        </button>

        {/* Sign Out Button */}
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            title="Sign out of Admin Portal"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-rose-50 border border-[#e4e5e7] hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
}

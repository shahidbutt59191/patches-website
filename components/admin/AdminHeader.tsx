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
} from 'lucide-react';
import { AdminTabId } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTabId;
  onRefresh: () => void;
  onSave: () => void;
  isSaving: boolean;
  onToggleMobileMenu: () => void;
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
    title: 'Rates, Surcharges & Live Simulator',
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
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const meta = TAB_TITLES[activeTab] || TAB_TITLES.overview;

  return (
    <header className="sticky top-0 z-30 bg-[#0c0e14]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle + Breadcrumb & Section Name */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-400 hidden sm:inline">
              B-Digitizing OS
            </span>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>{meta.title}</span>
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block line-clamp-1">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Live Connection Pill + Clock + Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Cloud Database Connection Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-400">Database:</span>
          <span className="text-emerald-400 font-semibold">Supabase Connected</span>
        </div>

        {/* Live Digital Clock */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{timeStr || '12:00:00'}</span>
        </div>

        {/* Refresh Database Button */}
        <button
          type="button"
          onClick={handleRefreshClick}
          title="Refresh database records"
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-orange-400' : ''}`} />
          <span className="hidden sm:inline text-xs font-bold">Refresh</span>
        </button>

        {/* View Live Store */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-800 hover:border-slate-700"
        >
          <Eye className="w-3.5 h-3.5 text-orange-400" />
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </Link>

        {/* Save & Publish All */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
          <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
        </button>
      </div>
    </header>
  );
}

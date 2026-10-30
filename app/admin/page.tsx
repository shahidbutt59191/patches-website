'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

interface OrderItem {
  order_id: string;
  customer_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  subtotal: number;
  discount: number;
  total_amount: number;
  status: string;
  created_at: string;
}

interface QuoteItem {
  id: string;
  ref_code: string;
  full_name: string;
  email: string;
  phone: string;
  patch_type: string;
  quantity: number;
  dimensions?: string;
  notes?: string;
  artwork_url?: string;
  status: string;
  created_at: string;
}

export default function AdminPortalPage() {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'editor' | 'orders' | 'quotes' | 'analytics'>('editor');

  // Live Data State
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingProduction: 0,
    totalRevenue: '0.00',
    totalQuotes: 0,
  });

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [activePrintOrder, setActivePrintOrder] = useState<OrderItem | null>(null);

  // Check Session Auth on Mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('apex_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default VIP PIN: 1234 or apex2026
    if (passcode === '1234' || passcode === 'apex2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('apex_admin_auth', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid VIP Access Passcode. (Try default: 1234 or apex2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('apex_admin_auth');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch Settings and Orders Data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Load Settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        setSettings(sData);
      }

      // 2. Load Orders & Quotes
      const ordersRes = await fetch('/api/admin/orders');
      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        setOrders(oData.orders || []);
        setQuotes(oData.quotes || []);
        if (oData.stats) setStats(oData.stats);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // Save Settings to API & Supabase
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      // Also update localStorage so homepage immediately reacts
      localStorage.setItem('apex_live_settings', JSON.stringify(settings));
      showToast('✓ Homepage successfully updated and published live!');
    } catch (err: unknown) {
      const error = err as Error;
      showToast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Status in Supabase
  const handleUpdateStatus = async (type: 'order' | 'quote', id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status: newStatus }),
      });

      if (!res.ok) throw new Error('Status update failed');

      if (type === 'order') {
        setOrders((prev) => prev.map((o) => (o.order_id === id ? { ...o, status: newStatus } : o)));
      } else {
        setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
      }

      showToast(`Status updated to "${newStatus}"!`);
    } catch (err: unknown) {
      const error = err as Error;
      showToast(`Error: ${error.message}`);
    }
  };

  // Delete Order / Quote
  const handleDelete = async (type: 'order' | 'quote', id: string) => {
    if (!confirm('Are you sure you want to permanently delete this record?')) return;

    try {
      const res = await fetch(`/api/admin/orders?type=${type}&id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      if (type === 'order') {
        setOrders((prev) => prev.filter((o) => o.order_id !== id));
      } else {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
      }

      showToast('Record deleted successfully.');
    } catch (err: unknown) {
      const error = err as Error;
      showToast(`Error: ${error.message}`);
    }
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !orderSearch ||
        o.order_id?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer_name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.phone?.includes(orderSearch);

      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Filtered Quotes
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      return (
        !quoteSearch ||
        q.ref_code?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
        q.full_name?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
        q.email?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
        q.patch_type?.toLowerCase().includes(quoteSearch.toLowerCase())
      );
    });
  }, [quotes, quoteSearch]);

  // CSV Export
  const exportCSV = (type: 'orders' | 'quotes') => {
    let csvContent = '';
    let filename = '';

    if (type === 'orders') {
      const headers = ['OrderID,Customer,Email,Phone,Address,Amount,Status,Date'];
      const rows = orders.map((o) =>
        [
          `"${o.order_id}"`,
          `"${o.customer_name}"`,
          `"${o.email}"`,
          `"${o.phone}"`,
          `"${(o.shipping_address || '').replace(/"/g, '""')}"`,
          o.total_amount,
          o.status,
          `"${o.created_at}"`,
        ].join(',')
      );
      csvContent = [headers, ...rows].join('\n');
      filename = 'apex_orders_export.csv';
    } else {
      const headers = ['RefCode,Name,Email,Phone,Style,Qty,Dimensions,Status,Date'];
      const rows = quotes.map((q) =>
        [
          `"${q.ref_code}"`,
          `"${q.full_name}"`,
          `"${q.email}"`,
          `"${q.phone}"`,
          `"${q.patch_type}"`,
          q.quantity,
          `"${q.dimensions || ''}"`,
          q.status,
          `"${q.created_at}"`,
        ].join(',')
      );
      csvContent = [headers, ...rows].join('\n');
      filename = 'apex_quotes_export.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`${type.toUpperCase()} CSV Exported!`);
  };

  // =========================================================================
  // VIEW: AUTHENTICATION LOCK SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-[#1e293f] bg-[#0d1322] p-8 shadow-2xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#080c14] text-amber-400 font-black text-xl font-mono">
              AP
            </div>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight">ApexPatches VIP Portal</h2>
          <p className="mt-1 text-xs text-slate-400">Restricted Store Manager & Factory Operations</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter VIP Passcode (Default: 1234)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-3 text-center text-sm font-mono text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
              {passcodeError && <p className="mt-2 text-xs text-rose-400 font-mono">{passcodeError}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all hover:scale-[1.02]"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="mt-6 border-t border-[#1e293f] pt-4 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN VIP ADMIN PORTAL DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/95 px-5 py-3.5 text-xs font-mono font-bold text-emerald-200 shadow-2xl backdrop-blur-xl animate-fade-in">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP VIP HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#1e293f] bg-[#0d1322]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080c14] font-black text-amber-400 text-xs font-mono">
                AP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-white tracking-tight">
                APEX<span className="text-amber-500">PATCHES</span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-400 uppercase">
                  VIP Store Manager
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 font-mono text-[11px] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase Connected</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-[#1e293f] bg-[#121a2d] px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <span>View Live Website</span>
              <span>↗</span>
            </Link>

            <button
              onClick={loadData}
              disabled={isLoading}
              title="Refresh All Store Data"
              className="rounded-xl border border-[#1e293f] bg-[#121a2d] p-2 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            >
              🔄
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-900/40 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* KPI STATS BAR */}
      <section className="border-b border-[#1e293f] bg-[#0a0f1d]/60 py-6">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Orders</span>
              <p className="mt-1 font-mono text-2xl font-black text-amber-400">{stats.totalOrders}</p>
            </div>
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Tajima Queue / Pending</span>
              <p className="mt-1 font-mono text-2xl font-black text-emerald-400">{stats.pendingProduction}</p>
            </div>
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Value</span>
              <p className="mt-1 font-mono text-2xl font-black text-white">${stats.totalRevenue}</p>
            </div>
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Customer Quotes</span>
              <p className="mt-1 font-mono text-2xl font-black text-sky-400">{stats.totalQuotes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD BODY & TABS */}
      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1e293f] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'editor'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'border border-[#1e293f] bg-[#0d1322] text-slate-300 hover:text-white'
            }`}
          >
            <span>✏️ Live Homepage & Store Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'border border-[#1e293f] bg-[#0d1322] text-slate-300 hover:text-white'
            }`}
          >
            <span>📦 Orders & Tajima Queue</span>
            <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] font-bold">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'quotes'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'border border-[#1e293f] bg-[#0d1322] text-slate-300 hover:text-white'
            }`}
          >
            <span>🎨 Customer Quotes & Art</span>
            <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] font-bold">
              {quotes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'border border-[#1e293f] bg-[#0d1322] text-slate-300 hover:text-white'
            }`}
          >
            <span>📊 CSV Exports & Tools</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: LIVE HOMEPAGE & STORE SETTINGS EDITOR */}
        {/* =================================================================== */}
        {activeTab === 'editor' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
              <div>
                <h3 className="text-base font-black text-white">Live Storefront Content Manager</h3>
                <p className="text-xs text-amber-200/80 mt-1">
                  Any changes you save here instantly update the live customer homepage!
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-xl shadow-amber-500/25 hover:bg-amber-400 transition-all hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Save & Publish Live'}
              </button>
            </div>

            {/* Top Announcement Bar */}
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  1. Top Announcement Bar
                </h4>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                    className="accent-amber-500 h-4 w-4 rounded"
                  />
                  <span>Show on Website</span>
                </label>
              </div>

              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                placeholder="Announcement banner text..."
                className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
              />
            </div>

            {/* Hero Section */}
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                2. Hero Headline & Messaging
              </h4>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Top Badge Pill</label>
                <input
                  type="text"
                  value={settings.heroBadge}
                  onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Main Hero Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-sm font-bold text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={settings.heroSubheadline}
                  onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                  className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={settings.heroCtaText}
                  onChange={(e) => setSettings({ ...settings, heroCtaText: e.target.value })}
                  className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                3. Business Contact Channels (Updates all chat & call buttons)
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    WhatsApp Number (Digits Only)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="e.g. 923001234567"
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">No plus (+) sign</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Support Phone</label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Formula Rules */}
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                4. Calculator Pricing Rules ($)
              </h4>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Base Price / ea</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.basePrice}
                    onChange={(e) => setSettings({ ...settings, basePrice: parseFloat(e.target.value) || 1.85 })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Velcro Add-on</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.velcroFee}
                    onChange={(e) => setSettings({ ...settings, velcroFee: parseFloat(e.target.value) || 0.50 })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Iron-On Add-on</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.ironOnFee}
                    onChange={(e) => setSettings({ ...settings, ironOnFee: parseFloat(e.target.value) || 0.25 })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Magnetic Add-on</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.magneticFee}
                    onChange={(e) => setSettings({ ...settings, magneticFee: parseFloat(e.target.value) || 0.95 })}
                    className="w-full rounded-xl border border-[#1e293f] bg-[#080c14] px-4 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-amber-500 py-4 text-xs font-black uppercase tracking-wider text-black shadow-xl shadow-amber-500/25 hover:bg-amber-400 transition-all hover:scale-[1.01]"
            >
              {isLoading ? 'Saving Changes...' : 'Save & Publish All Homepage Changes'}
            </button>
          </form>
        )}

        {/* =================================================================== */}
        {/* TAB 2: ORDERS & TAJIMA PRODUCTION QUEUE */}
        {/* =================================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search Order ID, Customer, Phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full sm:w-80 rounded-xl border border-[#1e293f] bg-[#0d1322] px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 font-mono"
              />

              <div className="flex items-center gap-1.5 text-xs font-mono">
                {['all', 'pending', 'production', 'shipped', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`rounded-lg px-3 py-1.5 capitalize transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-amber-500 text-black font-bold'
                        : 'border border-[#1e293f] bg-[#0d1322] text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-12 text-center text-slate-400 font-mono text-xs">
                No orders match your filter criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((o) => {
                  const cleanPhone = (o.phone || '').replace(/[^0-9]/g, '');

                  return (
                    <div
                      key={o.order_id}
                      className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e293f] pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-base font-black text-amber-400">#{o.order_id}</span>
                            <span className="text-xs text-slate-500 font-mono">
                              • {new Date(o.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            <strong className="text-white">{o.customer_name}</strong> •{' '}
                            <span className="font-mono text-slate-400">{o.email}</span> •{' '}
                            <span className="font-mono text-slate-400">{o.phone}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xl font-black text-emerald-400">
                            ${(parseFloat(String(o.total_amount)) || 0).toFixed(2)}
                          </span>

                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateStatus('order', o.order_id, e.target.value)}
                            className="rounded-xl border border-[#1e293f] bg-[#080c14] px-3 py-1.5 text-xs font-mono font-bold text-amber-400 outline-none focus:border-amber-500"
                          >
                            <option value="pending">Pending Review</option>
                            <option value="digitizing">In Digitizing</option>
                            <option value="proof_approved">Proof Approved</option>
                            <option value="production">In Tajima Production</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                        <div className="truncate max-w-lg font-mono">
                          Ship To: <span className="text-slate-300">{o.shipping_address || 'Pending'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActivePrintOrder(o)}
                            className="rounded-lg border border-[#1e293f] bg-[#121a2d] px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                          >
                            🖨️ Print Work Order
                          </button>

                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hi ${o.customer_name}! Your ApexPatches order #${o.order_id} status is now: ${o.status.toUpperCase()}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-emerald-500/30 bg-emerald-950/80 px-3.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900 transition-colors"
                          >
                            WhatsApp Customer
                          </a>

                          <button
                            onClick={() => handleDelete('order', o.order_id)}
                            className="rounded-lg border border-rose-500/30 bg-rose-950/40 p-1.5 text-rose-400 hover:bg-rose-900/50"
                            title="Delete Order"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: CUSTOMER QUOTES & ARTWORKS */}
        {/* =================================================================== */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search reference, customer name, email..."
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                className="w-full sm:w-80 rounded-xl border border-[#1e293f] bg-[#0d1322] px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {filteredQuotes.length === 0 ? (
              <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-12 text-center text-slate-400 font-mono text-xs">
                No quote inquiries found.
              </div>
            ) : (
              <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#1e293f] bg-[#080c14] font-mono text-[11px] uppercase text-slate-400">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Style & Qty</th>
                      <th className="p-4">Artwork File</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293f] text-slate-300">
                    {filteredQuotes.map((q) => {
                      const cleanPhone = (q.phone || '').replace(/[^0-9]/g, '');

                      return (
                        <tr key={q.id} className="hover:bg-[#121a2d]/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-amber-400">
                            #{q.ref_code}
                            <span className="block text-[10px] text-slate-500 font-normal">
                              {new Date(q.created_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{q.full_name}</div>
                            <div className="font-mono text-[11px] text-slate-400">{q.email}</div>
                            <div className="font-mono text-[11px] text-slate-400">{q.phone}</div>
                          </td>
                          <td className="p-4 font-mono">
                            <span className="font-bold text-white capitalize">{q.patch_type}</span>
                            <span className="block text-slate-400 text-[11px]">
                              {q.quantity} pcs {q.dimensions ? `(${q.dimensions})` : ''}
                            </span>
                          </td>
                          <td className="p-4">
                            {q.artwork_url ? (
                              <a
                                href={q.artwork_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-bold text-amber-400 hover:bg-amber-500/20"
                              >
                                View File ↗
                              </a>
                            ) : (
                              <span className="font-mono text-[11px] text-slate-500">No upload</span>
                            )}
                          </td>
                          <td className="p-4">
                            <select
                              value={q.status}
                              onChange={(e) => handleUpdateStatus('quote', q.id, e.target.value)}
                              className="rounded-lg border border-[#1e293f] bg-[#080c14] px-2.5 py-1 text-xs font-mono font-bold text-white outline-none focus:border-amber-500"
                            >
                              <option value="new">New</option>
                              <option value="digitizing">In Digitizing</option>
                              <option value="proof_sent">Proof Sent</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hi ${q.full_name}! Regarding your custom patch inquiry #${q.ref_code} (${q.quantity} pcs of ${q.patch_type}), your digital Tajima stitch proof is ready!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-emerald-500/30 bg-emerald-950/80 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900 transition-colors inline-block"
                            >
                              WhatsApp Reply
                            </a>
                            <button
                              onClick={() => handleDelete('quote', q.id)}
                              className="rounded-lg border border-rose-500/30 bg-rose-950/40 p-1.5 text-rose-400 hover:bg-rose-900/50"
                              title="Delete Quote"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: EXPORTS & FACTORY TOOLS */}
        {/* =================================================================== */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl">
            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <h4 className="text-sm font-bold text-white">Export Order Book</h4>
              <p className="text-xs text-slate-400">
                Download all orders, customer shipping details, and revenue totals into a clean CSV spreadsheet.
              </p>
              <button
                onClick={() => exportCSV('orders')}
                className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
              >
                Download Orders CSV ({orders.length} Records)
              </button>
            </div>

            <div className="rounded-2xl border border-[#1e293f] bg-[#0d1322] p-6 space-y-4">
              <h4 className="text-sm font-bold text-white">Export Inquiries & Quotes</h4>
              <p className="text-xs text-slate-400">
                Download customer artwork inquiries and quotes with phone numbers for bulk marketing and WhatsApp outreach.
              </p>
              <button
                onClick={() => exportCSV('quotes')}
                className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 py-3 text-xs font-black uppercase tracking-wider text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                Download Quotes CSV ({quotes.length} Records)
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ===================================================================== */}
      {/* MODAL: PRINTABLE FACTORY WORK ORDER */}
      {/* ===================================================================== */}
      {activePrintOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-[#1e293f] bg-[#0d1322] p-8 shadow-2xl relative">
            <button
              onClick={() => setActivePrintOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 text-sm font-bold"
            >
              ✕ Close
            </button>

            <div className="font-mono text-xs text-slate-300 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-white font-sans">
                    APEX<span className="text-amber-500">PATCHES</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Factory Production Work Order Sheet</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-amber-400">#{activePrintOrder.order_id}</div>
                  <div className="text-[10px] text-slate-500">
                    {new Date(activePrintOrder.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#1e293f] bg-[#080c14] p-4 space-y-1">
                <div><strong>Customer:</strong> {activePrintOrder.customer_name} ({activePrintOrder.phone})</div>
                <div><strong>Email:</strong> {activePrintOrder.email}</div>
                <div><strong>Ship To:</strong> {activePrintOrder.shipping_address}</div>
                <div><strong>Production Status:</strong> <span className="uppercase text-amber-400 font-bold">{activePrintOrder.status}</span></div>
              </div>

              <div className="flex justify-between items-baseline border-t border-slate-800 pt-4 text-base font-bold text-white">
                <span>Total Work Order Amount:</span>
                <span className="font-mono text-xl text-amber-400">
                  ${(parseFloat(String(activePrintOrder.total_amount)) || 0).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 rounded-xl bg-amber-500 py-3 text-xs font-black uppercase text-black hover:bg-amber-400"
                >
                  Print Work Order
                </button>
                <button
                  onClick={() => setActivePrintOrder(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

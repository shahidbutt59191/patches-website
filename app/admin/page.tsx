'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  SiteSettings,
  DEFAULT_SETTINGS,
  DEFAULT_PATCH_PRICING_CARDS,
  DEFAULT_HERO_PATCHES,
  DEFAULT_PORTFOLIO,
  DEFAULT_REVIEWS,
  DEFAULT_FAQS,
  DEFAULT_BULK_TIERS,
} from '@/lib/settings';

import AdminSidebar, { AdminTabId } from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminOrderModal from '@/components/admin/AdminOrderModal';
import AdminPricingCards from '@/components/admin/AdminPricingCards';
import AdminPricingCalculator from '@/components/admin/AdminPricingCalculator';
import AdminPortfolio from '@/components/admin/AdminPortfolio';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminFaqs from '@/components/admin/AdminFaqs';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminB2B from '@/components/admin/AdminB2B';
import AdminLogin from '@/components/admin/AdminLogin';
import { PatchOrderItem, QuoteItem, B2BAccountItem } from '@/components/admin/types';

const INITIAL_B2B_ACCOUNTS: B2BAccountItem[] = [
  {
    id: 'b2b-1',
    name: 'Apex Tactical Outfitters LLC',
    contactPerson: 'David Miller',
    email: 'david@apextactical.com',
    phone: '+1 (800) 555-9201',
    tier: 'Platinum Tier (Wholesale)',
    discountPct: 35,
    totalOrders: 18,
    lifetimeSpend: 24850.0,
  },
  {
    id: 'b2b-2',
    name: 'Iron Horse MC National Chapter',
    contactPerson: 'Big Mike Henderson',
    email: 'treasurer@ironhorsemc.org',
    phone: '+1 (415) 555-8832',
    tier: 'Gold Tier (Club Master)',
    discountPct: 25,
    totalOrders: 12,
    lifetimeSpend: 16400.0,
  },
  {
    id: 'b2b-3',
    name: 'Wilderness Explorers Outdoor Brands',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@wildernessexplore.ca',
    phone: '+1 (604) 555-1982',
    tier: 'Silver Tier (Apparel)',
    discountPct: 20,
    totalOrders: 9,
    lifetimeSpend: 9800.0,
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // Live Settings
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Orders, Quotes & Accounts
  const [orders, setOrders] = useState<PatchOrderItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [b2bAccounts, setB2bAccounts] = useState<B2BAccountItem[]>(INITIAL_B2B_ACCOUNTS);

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState<PatchOrderItem | null>(null);

  // Helper to extract real quote pricing, backing, dimensions and specifications
  const parseQuoteDetails = (q: QuoteItem, priceSettings?: SiteSettings) => {
    const notesStr = q.notes || '';

    // 1. Extract Real Total Amount from notes string (e.g. "Total: $1662.50")
    let totalAmount = 0;
    const totalMatch = notesStr.match(/Total:\s*\$?([0-9,]+(?:\.[0-9]{1,2})?)/i);
    if (totalMatch && totalMatch[1]) {
      totalAmount = parseFloat(totalMatch[1].replace(/,/g, ''));
    }

    // 2. Extract Attachment Backing
    let backing = 'Standard Backing';
    const backingMatch = notesStr.match(/Backing:\s*([^,\)]+)/i);
    if (backingMatch && backingMatch[1]) {
      const rawB = backingMatch[1].trim();
      if (rawB.includes('velcro')) backing = 'Velcro Hook & Loop';
      else if (rawB.includes('iron')) backing = 'Heat-Seal Iron-On';
      else if (rawB.includes('peel') || rawB.includes('adhesive')) backing = '3M Peel & Stick Adhesive';
      else if (rawB.includes('sew')) backing = 'Plain Sew-On';
      else backing = rawB;
    }

    // 3. Extract Border Type
    let border = 'Merrowed Overlock';
    const borderMatch = notesStr.match(/Border:\s*([^,\)]+)/i);
    if (borderMatch && borderMatch[1]) {
      const rawBorder = borderMatch[1].trim();
      if (rawBorder.includes('laser')) border = 'Laser Cut Smooth';
      else if (rawBorder.includes('merrow')) border = 'Merrowed Overlock';
      else border = rawBorder;
    }

    // 4. Extract Shipping Address
    let address = 'Free Tracked Courier Delivery';
    const addressMatch = notesStr.match(/Address:\s*([^.]+)\./i);
    if (addressMatch && addressMatch[1] && addressMatch[1].trim().length > 1) {
      address = addressMatch[1].trim();
    }

    // 5. Extract Clean Customer Notes
    let cleanNotes = notesStr;
    const userNotesMatch = notesStr.match(/Notes:\s*(.*?)(?:\.\s*Total:|$)/i);
    if (userNotesMatch && userNotesMatch[1] && userNotesMatch[1].trim().length > 0) {
      cleanNotes = userNotesMatch[1].trim();
    }

    // 6. Dynamic Pricing Fallback calculation if not stored in notes
    const qty = Number(q.quantity) || 100;
    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      let width = 3.0;
      let height = 3.0;
      const dimMatch = (q.dimensions || '').match(/([0-9.]+)"?\s*[xX*]\s*([0-9.]+)/);
      if (dimMatch) {
        width = parseFloat(dimMatch[1]) || 3.0;
        height = parseFloat(dimMatch[2]) || 3.0;
      }
      const size = Math.max(1.5, (width + height) / 2);
      const style = (q.patch_type || 'embroidered').toLowerCase();
      let base = (priceSettings?.priceEmbroidered ?? 1.85) + (size - 1.5) * 0.45;
      if (style.includes('pvc')) base = (priceSettings?.pricePvc ?? 2.55) + (size - 1.5) * 0.50;
      else if (style.includes('leather')) base = (priceSettings?.priceLeather ?? 2.45) + (size - 1.5) * 0.45;
      else if (style.includes('woven')) base = (priceSettings?.priceWoven ?? 1.65) + (size - 1.5) * 0.40;
      else if (style.includes('velcro')) base = (priceSettings?.priceVelcro ?? 2.35) + (size - 1.5) * 0.45;
      else if (style.includes('iron')) base = (priceSettings?.priceIronOn ?? 1.95) + (size - 1.5) * 0.45;

      if (backing.toLowerCase().includes('velcro')) base += (priceSettings?.velcroFee ?? 0.45);
      else if (backing.toLowerCase().includes('iron')) base += (priceSettings?.ironOnFee ?? 0.20);
      else if (backing.toLowerCase().includes('peel') || backing.toLowerCase().includes('adhesive')) base += (priceSettings?.peelStickFee ?? 0.35);

      let discount = 0;
      if (qty >= 1000) discount = 0.50;
      else if (qty >= 500) discount = 0.40;
      else if (qty >= 250) discount = 0.30;
      else if (qty >= 100) discount = 0.22;
      else if (qty >= 50) discount = 0.12;

      const unitPrice = Math.max(0.75, base * (1 - discount));
      totalAmount = Number((unitPrice * qty).toFixed(2));
    }

    return {
      totalAmount,
      subtotal: totalAmount,
      backing,
      border,
      address,
      cleanNotes,
    };
  };

  // Fetch Settings & Quotes from API
  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch Settings
      const setRes = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
      let currentSettings = { ...DEFAULT_SETTINGS };
      if (setRes.ok) {
        const setData = await setRes.json();
        const merged = { ...DEFAULT_SETTINGS, ...setData };
        if (!merged.portfolio || merged.portfolio.length === 0) merged.portfolio = DEFAULT_SETTINGS.portfolio;
        if (!merged.reviews || merged.reviews.length === 0) merged.reviews = DEFAULT_SETTINGS.reviews;
        if (!merged.patchPricingCards || merged.patchPricingCards.length === 0) merged.patchPricingCards = DEFAULT_PATCH_PRICING_CARDS;
        if (!merged.heroPatches || merged.heroPatches.length === 0) merged.heroPatches = DEFAULT_HERO_PATCHES;
        if (!merged.faqs || merged.faqs.length === 0) merged.faqs = DEFAULT_SETTINGS.faqs;
        if (!merged.bulkTiers || merged.bulkTiers.length === 0) merged.bulkTiers = DEFAULT_SETTINGS.bulkTiers;
        currentSettings = merged;
        setSettings(merged);
        try {
          localStorage.setItem('apex_live_settings', JSON.stringify(merged));
        } catch (e) {}
      }

      // 2. Fetch Orders/Quotes
      const ordRes = await fetch(`/api/admin/orders?t=${Date.now()}`, { cache: 'no-store' });
      if (ordRes.ok) {
        const ordData = await ordRes.json();

        // Map quotes into orders view with REAL dynamic pricing and specs
        const mappedFromQuotes: PatchOrderItem[] = (ordData.quotes || []).map((q: QuoteItem) => {
          const parsed = parseQuoteDetails(q, currentSettings);
          const styleRaw = q.patch_type || 'Embroidered';
          const patchStyleFormatted = styleRaw.charAt(0).toUpperCase() + styleRaw.slice(1);

          let uiStatus: PatchOrderItem['status'] = 'proof_review';
          if (q.status === 'in_production' || q.status === 'mass_production' || q.status === 'production') {
            uiStatus = 'mass_production';
          } else if (q.status === 'mold_sampling') {
            uiStatus = 'mold_sampling';
          } else if (q.status === 'backing_qc') {
            uiStatus = 'backing_qc';
          } else if (q.status === 'shipped') {
            uiStatus = 'shipped';
          } else {
            uiStatus = 'proof_review';
          }

          return {
            order_id: q.ref_code || `BD-${q.id.slice(0, 5)}`,
            title: `Custom ${patchStyleFormatted} Patch Run`,
            patch_type: patchStyleFormatted,
            dimensions: q.dimensions || '3.0" x 3.0"',
            quantity: Number(q.quantity) || 100,
            backing: parsed.backing,
            border: parsed.border,
            customer_name: q.full_name || 'Direct Client',
            email: q.email || '',
            phone: q.phone || '',
            shipping_address: parsed.address,
            subtotal: parsed.subtotal,
            total_amount: parsed.totalAmount,
            paid: false,
            status: uiStatus,
            artwork_thumbnail: q.artwork_url,
            created_at: q.created_at || new Date().toISOString(),
            notes: parsed.cleanNotes || q.notes,
            courier: (q as any).courier || 'FedEx Express',
            tracking_number: (q as any).tracking_number || '',
          };
        });

        const mappedFromOrders: PatchOrderItem[] = (ordData.orders || []).map((o: any) => ({
          order_id: o.order_id || `ORD-${o.id}`,
          title: `Custom ${o.patch_type || 'Embroidered'} Patch Order`,
          patch_type: o.patch_type || 'Embroidered',
          dimensions: o.dimensions || '3.0" x 3.0"',
          quantity: Number(o.quantity) || 100,
          backing: o.backing || 'Standard Backing',
          border: o.border || 'Merrowed Overlock',
          customer_name: o.customer_name || 'Direct Client',
          email: o.email || '',
          phone: o.phone || '',
          shipping_address: o.shipping_address || 'Free Worldwide Tracked Delivery',
          subtotal: parseFloat(o.subtotal) || parseFloat(o.total_amount) || 185.0,
          total_amount: parseFloat(o.total_amount) || parseFloat(o.subtotal) || 185.0,
          paid: o.paid ?? false,
          status: o.status || 'proof_review',
          artwork_thumbnail: o.artwork_thumbnail,
          created_at: o.created_at || new Date().toISOString(),
          notes: o.notes,
          courier: o.courier || 'FedEx Express',
          tracking_number: o.tracking_number || '',
        }));

        if (ordData.quotes) setQuotes(ordData.quotes);
        const allRealOrders = [...mappedFromQuotes, ...mappedFromOrders];
        if (allRealOrders.length > 0) setOrders(allRealOrders);
      }
    } catch (err) {
      console.warn('Dashboard data fetch note:', err);
    }
  }, []);

  // Check admin session on mount
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem('bdigitizing_admin_session') ||
        sessionStorage.getItem('bdigitizing_admin_session');
      if (raw) {
        const sess = JSON.parse(raw);
        if (sess && sess.expiresAt && sess.expiresAt > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('bdigitizing_admin_session');
          sessionStorage.removeItem('bdigitizing_admin_session');
        }
      }
    } catch (e) {
      console.warn('Session check note:', e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem('bdigitizing_admin_session');
      sessionStorage.removeItem('bdigitizing_admin_session');
    } catch (e) {}
    setIsAuthenticated(false);
  };

  useEffect(() => {
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
    } catch (e) {}
    refreshData();
  }, [refreshData]);

  // Save Settings Function
  const handleSaveSettings = async (customSettings?: SiteSettings) => {
    const toSave = customSettings && typeof customSettings.priceEmbroidered === 'number' ? customSettings : settings;
    setIsSavingSettings(true);
    setSaveToast('');

    try {
      localStorage.setItem('apex_live_settings', JSON.stringify(toSave));
    } catch (e) {}

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      const data = await res.json();
      if (data?.settings) {
        setSettings(data.settings);
        try {
          localStorage.setItem('apex_live_settings', JSON.stringify(data.settings));
        } catch (e) {}
      }

      setSaveToast('✓ All settings published live to database!');
      setTimeout(() => setSaveToast(''), 3500);
    } catch (err: any) {
      setSaveToast(`Note: Saved locally. Sync: ${err.message || 'error'}`);
      setTimeout(() => setSaveToast(''), 3500);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Update Status with Backend Persistence
  const handleUpdateStatus = async (orderId: string, newStatus: PatchOrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.order_id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
    } catch (err) {
      console.warn('Status update sync error:', err);
    }
  };

  // Update Tracking Number & Courier with Backend Persistence
  const handleUpdateTracking = async (orderId: string, courier: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, courier, tracking_number: trackingNumber } : o
      )
    );
    if (selectedOrder && selectedOrder.order_id === orderId) {
      setSelectedOrder({ ...selectedOrder, courier, tracking_number: trackingNumber });
    }
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, courier, tracking_number: trackingNumber }),
      });
    } catch (err) {
      console.warn('Tracking update sync error:', err);
    }
  };

  // Export CSV
  const handleExportOrdersCSV = () => {
    const headers = [
      'Order ID',
      'Customer Name',
      'Email',
      'Phone',
      'Patch Type',
      'Quantity',
      'Dimensions',
      'Backing',
      'Status',
      'Total ($)',
      'Tracking Number',
      'Created At',
    ];
    const rows = orders.map((o) => [
      `"${o.order_id}"`,
      `"${o.customer_name}"`,
      `"${o.email}"`,
      `"${o.phone}"`,
      `"${o.patch_type}"`,
      o.quantity,
      `"${o.dimensions}"`,
      `"${o.backing}"`,
      `"${o.status}"`,
      o.total_amount?.toFixed(2) || '0.00',
      `"${o.tracking_number || ''}"`,
      `"${o.created_at}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BDigitizing_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Customer Communications
  const handleWhatsAppCustomer = (order: PatchOrderItem) => {
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
    const message = `Hello ${order.customer_name}, this is BDigitizing Factory regarding your custom patch order ${order.order_id} (${order.quantity} pcs ${order.patch_type}). Current Production Status: ${order.status.toUpperCase()}${
      order.tracking_number ? ` | Tracking: ${order.tracking_number}` : ''
    }. Please let us know if you need any assistance!`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmailCustomer = (order: PatchOrderItem) => {
    const subject = `Production Update: BDigitizing Custom Patch Order ${order.order_id}`;
    const body = `Hi ${order.customer_name},\n\nWe are pleased to inform you that your custom patch order ${order.order_id} (${order.quantity} pcs ${order.patch_type}) is now in: ${order.status.toUpperCase()}.\n\n${
      order.tracking_number ? `Courier: ${order.courier || 'Express'}\nTracking Number: ${order.tracking_number}\n\n` : ''
    }Thank you for your business!\n\nBest regards,\nBDigitizing Master Production Team\nsupport@bdigitizing.com`;
    window.open(`mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // KPIs
  const metrics = useMemo(() => {
    const totalOrdersCount = orders.length;
    const inProduction = orders.filter((o) => o.status === 'mass_production').length;
    const pendingProofs = orders.filter((o) => o.status === 'proof_review').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    return {
      totalOrdersCount,
      inProduction,
      pendingProofs,
      totalRevenue: totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 }),
    };
  }, [orders]);

  // 1. Initial Auth Check Spinner
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center text-slate-400 font-sans gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase text-slate-500">
          Verifying Admin Access...
        </span>
      </div>
    );
  }

  // 2. Unauthenticated: Render Cyber Login Screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        configuredPassword={settings.adminPassword}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. Sleek Sticky Header */}
      <AdminHeader
        activeTab={activeTab}
        onRefresh={refreshData}
        onSave={() => handleSaveSettings()}
        isSaving={isSavingSettings}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSignOut={handleSignOut}
      />

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-6 text-center shadow-lg animate-in slide-in-from-top-2">
          {saveToast}
        </div>
      )}

      {/* 2. Main Layout with Responsive Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar Nav */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ordersCount={orders.length}
          pricingCardsCount={(settings.patchPricingCards || DEFAULT_PATCH_PRICING_CARDS).length}
          portfolioCount={(settings.portfolio || DEFAULT_PORTFOLIO).length}
          reviewsCount={(settings.reviews || DEFAULT_REVIEWS).length}
          faqsCount={(settings.faqs || DEFAULT_FAQS).length}
          b2bCount={b2bAccounts.length}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
          {activeTab === 'overview' && (
            <AdminOverview
              orders={orders}
              metrics={metrics}
              onSelectTab={setActiveTab}
              onSelectOrder={setSelectedOrder}
              onExportCsv={handleExportOrdersCSV}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders
              orders={orders}
              onSelectOrder={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
              onWhatsApp={handleWhatsAppCustomer}
              onEmail={handleEmailCustomer}
              onExportCsv={handleExportOrdersCSV}
            />
          )}

          {activeTab === 'pricing_cards' && (
            <AdminPricingCards
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'pricing' && (
            <AdminPricingCalculator
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'portfolio' && (
            <AdminPortfolio
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'reviews' && (
            <AdminReviews
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'faqs' && (
            <AdminFaqs
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {activeTab === 'b2b' && (
            <AdminB2B
              accounts={b2bAccounts}
              onAddAccount={(acc) => setB2bAccounts([acc, ...b2bAccounts])}
              onDeleteAccount={(id) => setB2bAccounts(b2bAccounts.filter((a) => a.id !== id))}
            />
          )}
        </main>

      </div>

      {/* Redesigned Order Details Modal */}
      {selectedOrder && (
        <AdminOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateTracking={handleUpdateTracking}
          onWhatsApp={handleWhatsAppCustomer}
          onEmail={handleEmailCustomer}
        />
      )}

    </div>
  );
}

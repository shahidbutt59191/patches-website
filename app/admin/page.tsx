'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  DollarSign,
  Image as ImageIcon,
  ShoppingBag,
  MessageSquare,
  Settings,
  Star,
  Users,
  Search,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  Clock,
  Shield,
  RefreshCw,
  Save,
  ArrowRight,
  TrendingUp,
  Package,
  FileText,
  AlertCircle,
  Eye,
  Sliders,
  Phone,
  Mail,
  Truck,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { SiteSettings, DEFAULT_SETTINGS, PortfolioItem, CustomerReviewItem } from '@/lib/settings';

// Data Interfaces
export interface PatchOrderItem {
  order_id: string;
  title: string;
  patch_type: string;
  dimensions: string;
  quantity: number;
  backing: string;
  border?: string;
  customer_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  subtotal: number;
  total_amount: number;
  paid: boolean;
  status: 'proof_review' | 'mold_sampling' | 'mass_production' | 'backing_qc' | 'shipped';
  artwork_thumbnail?: string;
  created_at: string;
  notes?: string;
}

export interface QuoteItem {
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

export interface B2BAccountItem {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  tier: string;
  discountPct: number;
  totalOrders: number;
  lifetimeSpend: number;
}

// Sample Initial Orders
const INITIAL_ORDERS: PatchOrderItem[] = [
  {
    order_id: 'BD-84920',
    title: 'Custom Alpine Shield Embroidered Patches',
    patch_type: 'Embroidered',
    dimensions: '3.0" x 3.0"',
    quantity: 100,
    backing: 'Velcro Hook & Loop',
    border: 'Merrowed Overlock',
    customer_name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (512) 555-0199',
    shipping_address: 'Austin, TX 78701, USA',
    subtotal: 185.0,
    total_amount: 185.0,
    paid: true,
    status: 'mass_production',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Please match Pantone 1585C orange threads for the mountain peak outline.',
  },
  {
    order_id: 'BD-72190',
    title: 'Heritage Debossed Leather Trucker Hat Patches',
    patch_type: 'Leather',
    dimensions: '2.5" x 2.5"',
    quantity: 250,
    backing: '3M Adhesive',
    border: 'Laser Cut Smooth',
    customer_name: 'Elena Rostova',
    email: 'elena@roastercoffee.com',
    phone: '+1 (206) 555-9182',
    shipping_address: 'Seattle, WA 98101, USA',
    subtotal: 487.5,
    total_amount: 487.5,
    paid: false,
    status: 'proof_review',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    notes: 'Caramel brown leatherette with dark scorched deboss.',
  },
];

export default function AdminDashboardPage() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pricing' | 'portfolio' | 'slider' | 'orders' | 'reviews' | 'settings' | 'b2b'
  >('overview');

  // Live Settings
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Orders, Quotes & Portfolio Data
  const [orders, setOrders] = useState<PatchOrderItem[]>(INITIAL_ORDERS);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals & Forms
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'tactical',
    styleId: 'embroidered',
    badge: '100% Tajima High Density',
    specs: '3.0" × 3.0" • Madeira Thread • Merrowed Border',
    batch: '250 pcs',
    desc: 'Full-density polyester thread coverage calibrated for extreme abrasion resistance.',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
    basePrice: 1.85,
    active: true,
  });

  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState<Partial<CustomerReviewItem>>({
    author: '',
    company: '',
    country: 'USA',
    rating: 5,
    verifiedOrder: 'BD-Custom (100 pcs)',
    comment: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  });

  // Edit item states
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [editingReview, setEditingReview] = useState<CustomerReviewItem | null>(null);

  // Selected Order for Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<PatchOrderItem | null>(null);

  // Fetch Settings & Quotes from API
  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch Settings
      const setRes = await fetch('/api/settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        const merged = { ...DEFAULT_SETTINGS, ...setData };
        if (!merged.portfolio || merged.portfolio.length === 0) {
          merged.portfolio = DEFAULT_SETTINGS.portfolio;
        }
        if (!merged.reviews || merged.reviews.length === 0) {
          merged.reviews = DEFAULT_SETTINGS.reviews;
        }
        setSettings(merged);
        try {
          localStorage.setItem('apex_live_settings', JSON.stringify(merged));
        } catch (e) {}
      }

      // 2. Fetch Orders/Quotes
      const ordRes = await fetch('/api/admin/orders');
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        if (ordData.quotes && ordData.quotes.length > 0) {
          setQuotes(ordData.quotes);

          // Map quotes into orders view
          const mappedFromQuotes: PatchOrderItem[] = ordData.quotes.map((q: QuoteItem) => ({
            order_id: q.ref_code || `BD-${q.id.slice(0, 5)}`,
            title: `Custom ${q.patch_type || 'Embroidered'} Patch Run`,
            patch_type: q.patch_type || 'Embroidered',
            dimensions: q.dimensions || '3.0" x 3.0"',
            quantity: Number(q.quantity) || 100,
            backing: 'Customer Selected',
            customer_name: q.full_name || 'Direct Client',
            email: q.email || '',
            phone: q.phone || '',
            shipping_address: 'Free Tracked Courier Delivery',
            subtotal: 185.0,
            total_amount: 185.0,
            paid: false,
            status: (q.status as any) || 'proof_review',
            artwork_thumbnail: q.artwork_url,
            created_at: q.created_at || new Date().toISOString(),
            notes: q.notes,
          }));

          // Merge without duplicates
          setOrders((prev) => {
            const existingIds = new Set(prev.map((o) => o.order_id));
            const newOnes = mappedFromQuotes.filter((m) => !existingIds.has(m.order_id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch (err) {
      console.warn('Dashboard data fetch note:', err);
    }
  }, []);

  useEffect(() => {
    // 1. Instantly read local cache so there is no blank screen or reset flash
    try {
      const local = localStorage.getItem('apex_live_settings');
      if (local) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch (e) {}

    // 2. Fetch latest server/database data
    refreshData();
  }, [refreshData]);

  // Save Settings Function (Saves to LocalStorage immediately + server disk/DB)
  const handleSaveSettings = async (customSettings?: SiteSettings) => {
    const toSave = customSettings && typeof customSettings.priceEmbroidered === 'number' ? customSettings : settings;
    setIsSavingSettings(true);
    setSaveToast('');

    // Instant local save
    try {
      localStorage.setItem('apex_live_settings', JSON.stringify(toSave));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }

    // Server save to permanent project disk and cloud DB
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });

      if (!res.ok) throw new Error('Failed to save settings to server');

      setSaveToast('✓ All edits successfully saved and published live!');
      setTimeout(() => setSaveToast(''), 4000);
    } catch (err: any) {
      setSaveToast(`Note: Saved locally. Server sync: ${err.message || 'error'}`);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Update existing portfolio item
  const handleUpdatePortfolio = () => {
    if (!editingPortfolio || !editingPortfolio.title) return;
    const updated = (settings.portfolio || []).map((p) =>
      String(p.id) === String(editingPortfolio.id) ? editingPortfolio : p
    );
    const updatedSettings = { ...settings, portfolio: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setEditingPortfolio(null);
  };

  // Update existing review
  const handleUpdateReview = () => {
    if (!editingReview || !editingReview.author) return;
    const updated = (settings.reviews || []).map((r) =>
      String(r.id) === String(editingReview.id) ? editingReview : r
    );
    const updatedSettings = { ...settings, reviews: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setEditingReview(null);
  };

  // Update Status Function
  const handleUpdateStatus = async (orderId: string, newStatus: PatchOrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, status: newStatus } : o))
    );

    // Call API patch
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          id: orderId,
          status: newStatus,
        }),
      });
    } catch (e) {
      console.warn('API status patch note:', e);
    }
  };

  // Add Portfolio Item
  const handleAddPortfolio = () => {
    if (!newPortfolio.title) return;
    const item: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: newPortfolio.title,
      category: (newPortfolio.category as any) || 'tactical',
      styleId: newPortfolio.styleId || 'embroidered',
      badge: newPortfolio.badge || '100% Tajima High Density',
      specs: newPortfolio.specs || '3.0" × 3.0" • Madeira Thread • Merrowed Border',
      batch: newPortfolio.batch || '250 pcs',
      desc: newPortfolio.desc || 'Full-density polyester thread coverage calibrated for extreme abrasion resistance.',
      badgeClass:
        newPortfolio.category === 'tactical'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : newPortfolio.category === 'biker'
          ? 'bg-slate-100 text-slate-800 border-slate-300'
          : newPortfolio.category === 'varsity'
          ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
          : 'bg-purple-50 text-purple-700 border-purple-200',
      image: newPortfolio.image || 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
      altText: newPortfolio.title,
      basePrice: Number(newPortfolio.basePrice) || 1.85,
      active: true,
    };
    const updated = [item, ...(settings.portfolio || [])];
    const updatedSettings = { ...settings, portfolio: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setShowAddPortfolio(false);
    setNewPortfolio({
      title: '',
      category: 'tactical',
      styleId: 'embroidered',
      badge: '100% Tajima High Density',
      specs: '3.0" × 3.0" • Madeira Thread • Merrowed Border',
      batch: '250 pcs',
      desc: '',
      image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
      basePrice: 1.85,
      active: true,
    });
  };

  // Delete Portfolio Item
  const handleDeletePortfolio = (id: string | number) => {
    const updated = (settings.portfolio || []).filter((p) => String(p.id) !== String(id));
    const updatedSettings = { ...settings, portfolio: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Toggle Active on Portfolio Item
  const handleTogglePortfolioActive = (id: string | number) => {
    const updated = (settings.portfolio || []).map((p) =>
      String(p.id) === String(id) ? { ...p, active: p.active === false ? true : false } : p
    );
    const updatedSettings = { ...settings, portfolio: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Add Review
  const handleAddReview = () => {
    if (!newReview.author || !newReview.comment) return;
    const item: CustomerReviewItem = {
      id: `r-${Date.now()}`,
      author: newReview.author,
      company: newReview.company || 'Private Client',
      country: newReview.country || 'USA',
      rating: Number(newReview.rating) || 5,
      verifiedOrder: newReview.verifiedOrder || 'BD-Custom (100 pcs)',
      comment: newReview.comment,
      date: 'Just now',
      featured: true,
      avatar: newReview.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    };
    const updated = [item, ...(settings.reviews || [])];
    const updatedSettings = { ...settings, reviews: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setShowAddReview(false);
    setNewReview({
      author: '',
      company: '',
      country: 'USA',
      rating: 5,
      verifiedOrder: 'BD-Custom (100 pcs)',
      comment: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    });
  };

  // Delete Review
  const handleDeleteReview = (id: string) => {
    const updated = (settings.reviews || []).filter((r) => r.id !== id);
    const updatedSettings = { ...settings, reviews: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalOrdersCount = orders.length;
    const pendingProofs = orders.filter((o) => o.status === 'proof_review').length;
    const inProduction = orders.filter((o) => o.status === 'mass_production').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    return {
      totalOrdersCount,
      pendingProofs,
      inProduction,
      totalRevenue: totalRevenue.toFixed(2),
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.patch_type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-[#0e1017] text-slate-100 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* 1. Top Admin Bar */}
      <header className="bg-[#141722] border-b border-slate-800/80 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-lg shadow-md">
            B
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-white flex items-center gap-2">
              <span>BDigitizing</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold uppercase">
                Admin Console
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Factory Control, Pricing &amp; Portfolio Management
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshData}
            title="Refresh Data"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
          </Link>

          <button
            type="button"
            onClick={() => handleSaveSettings()}
            disabled={isSavingSettings}
            className="btn-orange px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSavingSettings ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>

      </header>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-6 text-center animate-in slide-in-from-top-2">
          {saveToast}
        </div>
      )}

      {/* 2. Main Dashboard Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#12141c] border-r border-slate-800/80 p-4 space-y-1 shrink-0">
          
          <div className="text-[10px] font-mono font-bold uppercase text-slate-500 px-3 py-2">
            Main Management
          </div>

          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'orders', label: 'Quote Requests & Orders', icon: <ShoppingBag className="w-4 h-4" />, badge: orders.length },
            { id: 'pricing', label: 'Pricing & Discounts', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'portfolio', label: 'Portfolio & Gallery', icon: <ImageIcon className="w-4 h-4" />, badge: (settings.portfolio || []).length },
            { id: 'slider', label: 'Before/After Slider', icon: <Wand2 className="w-4 h-4" /> },
            { id: 'reviews', label: 'Customer Reviews', icon: <Star className="w-4 h-4" />, badge: (settings.reviews || []).length },
            { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
            { id: 'b2b', label: 'Wholesale B2B Accounts', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}

          {/* Quick Loom Status Widget */}
          <div className="pt-8 px-3">
            <div className="p-3.5 rounded-2xl bg-[#171a25] border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tajima Looms: Active</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Operating 1,200 SPM automated embroidery multi-heads with Madeira 100% Polyneon threads.
              </p>
            </div>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Heading */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Factory Control Overview
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Monitor live patch proof requests, production statuses, and customer inquiries.
                </p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>Total Submissions</span>
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono mt-2">
                    {metrics.totalOrdersCount}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                    ✓ All processed through /api/orders
                  </div>
                </div>

                <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>Pending Proof Reviews</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-2">
                    {metrics.pendingProofs}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Needs 6-Hour Scan Proof
                  </div>
                </div>

                <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>In Mass Production</span>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-black text-blue-400 font-mono mt-2">
                    {metrics.inProduction}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    On Tajima Looms
                  </div>
                </div>

                <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>Estimated Pipeline</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-2">
                    ${metrics.totalRevenue}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Wholesale Order Pipeline
                  </div>
                </div>
              </div>

              {/* Recent Orders Quick Table */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span>Recent Quote Inquiries</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <span>View All Orders</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                        <th className="pb-3 font-bold">Order ID</th>
                        <th className="pb-3 font-bold">Client</th>
                        <th className="pb-3 font-bold">Patch Style</th>
                        <th className="pb-3 font-bold">Qty</th>
                        <th className="pb-3 font-bold">Total</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.order_id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 font-mono font-bold text-orange-400">
                            {order.order_id}
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-white">{order.customer_name}</div>
                            <div className="text-[10px] text-slate-400">{order.email}</div>
                          </td>
                          <td className="py-3 text-slate-300">
                            {order.patch_type} ({order.dimensions})
                          </td>
                          <td className="py-3 font-mono text-slate-300">{order.quantity} pcs</td>
                          <td className="py-3 font-mono font-bold text-white">
                            ${order.total_amount?.toFixed(2) || '185.00'}
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                                order.status === 'proof_review'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : order.status === 'mass_production'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              {order.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedOrder(order);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRICING & MATRIX */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Live Pricing &amp; Wholesale Discounts
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control the base rates for all 5 styles, backings, and wholesale tier percentages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Rates to Website</span>
                </button>
              </div>

              {/* Base Prices Grid */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-500" />
                  <span>Base Unit Rates (Per Patch at 100 pcs benchmark)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'priceEmbroidered', label: '1. Embroidered Patches Base', default: 1.85 },
                    { key: 'priceIronOn', label: '2. Iron-On Patches Base', default: 1.95 },
                    { key: 'priceVelcro', label: '3. Velcro Patches Base', default: 2.35 },
                    { key: 'priceWoven', label: '4. Woven Jacquard Patches Base', default: 1.65 },
                    { key: 'priceLeather', label: '5. Debossed Leather Patches Base', default: 2.45 },
                    { key: 'pricePvc', label: '6. 3D Soft PVC Rubber Base', default: 2.55 },
                  ].map((item) => (
                    <div key={item.key} className="bg-[#181b26] p-4 rounded-xl border border-slate-800/80">
                      <label className="block text-xs font-bold text-slate-300 mb-2">
                        {item.label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">$</span>
                        <input
                          type="number"
                          step="0.05"
                          value={(settings as any)[item.key] ?? item.default}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              [item.key]: parseFloat(e.target.value) || item.default,
                            })
                          }
                          className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm font-bold focus:border-orange-500 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachment Backing Addons */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-500" />
                  <span>Backing Attachment Fees</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Velcro (Hook &amp; Loop)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.velcroFee ?? 0.45}
                      onChange={(e) =>
                        setSettings({ ...settings, velcroFee: parseFloat(e.target.value) || 0.45 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Heat-Seal Iron-On Film
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.ironOnFee ?? 0.20}
                      onChange={(e) =>
                        setSettings({ ...settings, ironOnFee: parseFloat(e.target.value) || 0.20 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      3M Peel &amp; Stick
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.peelStickFee ?? 0.35}
                      onChange={(e) =>
                        setSettings({ ...settings, peelStickFee: parseFloat(e.target.value) || 0.35 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Traditional Plain Sew-On
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.sewOnFee ?? 0.00}
                      onChange={(e) =>
                        setSettings({ ...settings, sewOnFee: parseFloat(e.target.value) || 0.00 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Coupon Configuration */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Promo Code &amp; Instant Site Discount</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Promotional Coupon Code
                    </label>
                    <input
                      type="text"
                      value={settings.promoCode ?? 'BDIGITIZE15'}
                      onChange={(e) =>
                        setSettings({ ...settings, promoCode: e.target.value.toUpperCase() })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-orange-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={settings.discountRate ?? 15}
                      onChange={(e) =>
                        setSettings({ ...settings, discountRate: parseInt(e.target.value) || 15 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="btn-orange px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingSettings ? 'Publishing...' : 'Save & Publish All Pricing Changes'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PORTFOLIO & GALLERY */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Portfolio &amp; Showcase Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, or disable patch specimens shown on the public website with live high-res photography.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPortfolio(true)}
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Patch Specimen</span>
                </button>
              </div>

              {/* Add Modal */}
              {showAddPortfolio && (
                <div className="bg-[#141722] border-2 border-orange-500/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Add New Portfolio Specimen</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Patch Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Tactical Recon Skull Morale Badge"
                        value={newPortfolio.title}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Portfolio Category</label>
                      <select
                        value={newPortfolio.category}
                        onChange={(e) =>
                          setNewPortfolio({
                            ...newPortfolio,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      >
                        <option value="tactical">Tactical Units</option>
                        <option value="headwear">Caps &amp; Beanies</option>
                        <option value="biker">Biker MC</option>
                        <option value="varsity">Varsity Athletics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Patch Material Style</label>
                      <select
                        value={newPortfolio.styleId}
                        onChange={(e) =>
                          setNewPortfolio({
                            ...newPortfolio,
                            styleId: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      >
                        <option value="embroidered">Embroidered</option>
                        <option value="iron-on">Iron-On</option>
                        <option value="velcro">Velcro Hook &amp; Loop</option>
                        <option value="woven">Jacquard Woven</option>
                        <option value="leather">Debossed Leather</option>
                        <option value="pvc">3D Soft PVC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. 3D Soft Molded PVC"
                        value={newPortfolio.badge}
                        onChange={(e) =>
                          setNewPortfolio({ ...newPortfolio, badge: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Batch Run Size</label>
                      <input
                        type="text"
                        placeholder="e.g. 500 pcs"
                        value={newPortfolio.batch}
                        onChange={(e) =>
                          setNewPortfolio({ ...newPortfolio, batch: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Base Price ($)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={newPortfolio.basePrice}
                        onChange={(e) =>
                          setNewPortfolio({
                            ...newPortfolio,
                            basePrice: parseFloat(e.target.value) || 1.85,
                          })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Image URL (High-Res Photo)</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={newPortfolio.image}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, image: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Preview</label>
                      <div className="h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                        {newPortfolio.image ? (
                          <img src={newPortfolio.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-slate-500">No Image</span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Specifications Line</label>
                      <input
                        type="text"
                        placeholder='e.g. 3.25" × 3.0" • Pantone 418C Coyote • Mil-Spec Hook Velcro'
                        value={newPortfolio.specs}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, specs: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Describe stitch construction, thread type, and backing durability..."
                        value={newPortfolio.desc}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, desc: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPortfolio(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddPortfolio}
                      className="btn-orange px-5 py-2 rounded-lg text-xs font-bold"
                    >
                      Save &amp; Publish Specimen
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Portfolio Modal */}
              {editingPortfolio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border-2 border-orange-500/80 rounded-3xl max-w-2xl w-full p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-orange-500" />
                        <span>Edit Portfolio Specimen</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingPortfolio(null)}
                        className="text-slate-400 hover:text-white text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Patch Title</label>
                        <input
                          type="text"
                          value={editingPortfolio.title}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                        <select
                          value={editingPortfolio.category}
                          onChange={(e) =>
                            setEditingPortfolio({
                              ...editingPortfolio,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="tactical">Tactical Units</option>
                          <option value="headwear">Caps &amp; Beanies</option>
                          <option value="biker">Biker MC</option>
                          <option value="varsity">Varsity Athletics</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Base Price ($)</label>
                        <input
                          type="number"
                          step="0.05"
                          value={editingPortfolio.basePrice}
                          onChange={(e) =>
                            setEditingPortfolio({
                              ...editingPortfolio,
                              basePrice: parseFloat(e.target.value) || 1.85,
                            })
                          }
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={editingPortfolio.badge}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, badge: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Batch Size</label>
                        <input
                          type="text"
                          value={editingPortfolio.batch}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, batch: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Style ID</label>
                        <select
                          value={editingPortfolio.styleId}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, styleId: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="embroidered">Embroidered</option>
                          <option value="iron-on">Iron-On</option>
                          <option value="velcro">Velcro</option>
                          <option value="woven">Woven</option>
                          <option value="leather">Leather</option>
                          <option value="pvc">PVC</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Image URL (High-Res Photo)</label>
                        <input
                          type="text"
                          value={editingPortfolio.image}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Preview</label>
                        <div className="h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                          {editingPortfolio.image ? (
                            <img src={editingPortfolio.image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-500">No Image</span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Specifications</label>
                        <input
                          type="text"
                          value={editingPortfolio.specs}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, specs: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingPortfolio.desc}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, desc: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingPortfolio(null)}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdatePortfolio}
                        className="btn-orange px-6 py-2 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Update &amp; Save Specimen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(settings.portfolio || []).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#141722] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors group"
                  >
                    <div>
                      {/* Image Preview Header */}
                      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md border ${item.badgeClass || 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                            {item.badge}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                            {item.batch}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                            {item.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleTogglePortfolioActive(item.id)}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
                              item.active !== false
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {item.active !== false ? '● Live on Store' : '○ Hidden'}
                          </button>
                        </div>
                        <h4 className="text-base font-bold text-white leading-tight">{item.title}</h4>
                        <p className="text-xs text-slate-400 font-mono text-[11px]">{item.specs}</p>
                        <p className="text-xs text-slate-400 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-500 text-[10px] block">BASE PRICE</span>
                        <span className="text-white font-bold">${(item.basePrice || 1.85).toFixed(2)}/ea</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingPortfolio({ ...item })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Edit Patch Specimen"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          title="Delete Patch Specimen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: BEFORE/AFTER SLIDER MANAGEMENT */}
          {activeTab === 'slider' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Top Title & Save Button */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Wand2 className="w-6 h-6 text-orange-500" />
                    <span>Before &amp; After Digitizing Slider</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload or change the 2D Artwork image and 3D Embroidered Patch image shown in the interactive vector-to-stitch slider.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={isSavingSettings}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'Publishing...' : 'Publish Slider to Website'}</span>
                </button>
              </div>

              {/* Preset Quick Chooser Strip */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>1-Click High-Quality Presets</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Switch between verified photo pairs or enter your custom URLs below.
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...settings,
                        sliderBeforeImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80',
                        sliderAfterImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1000&auto=format&fit=crop&q=80',
                        sliderBeforeLabel: 'Flat 2D Vector Artwork (Customer File)',
                        sliderAfterLabel: '3D Physical Embroidery (Madeira Poly)',
                      };
                      setSettings(updated);
                      handleSaveSettings(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                  >
                    Preset 1: Alpine Shield
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...settings,
                        sliderBeforeImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
                        sliderAfterImage: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=1000&auto=format&fit=crop&q=80',
                        sliderBeforeLabel: '2D Digital Emblem Concept',
                        sliderAfterLabel: '3D High-Density Tactical Stitch',
                      };
                      setSettings(updated);
                      handleSaveSettings(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                  >
                    Preset 2: Tactical Skull Crest
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...settings,
                        sliderBeforeImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&auto=format&fit=crop&q=80',
                        sliderAfterImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80',
                        sliderBeforeLabel: 'Flat Motorcycle Club Artwork',
                        sliderAfterLabel: 'Heavy Twill Embroidered Cut',
                      };
                      setSettings(updated);
                      handleSaveSettings(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                  >
                    Preset 3: Biker MC Cut
                  </button>
                </div>
              </div>

              {/* 2 Two Side-by-Side Image Control Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* CARD 1: BEFORE IMAGE (Flat 2D Artwork) */}
                <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-slate-400" />
                      <h3 className="text-sm font-bold text-white">Left Side: Before (2D Graphic Artwork)</h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      Customer Vector File
                    </span>
                  </div>

                  {/* Image Preview Box */}
                  <div className="relative h-56 w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                    {settings.sliderBeforeImage ? (
                      <img
                        src={settings.sliderBeforeImage}
                        alt="Before Preview"
                        className="w-full h-full object-contain filter drop-shadow-md"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs text-slate-500">No Image Specified</span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {settings.sliderBeforeLabel || 'Flat 2D Vector Artwork'}
                    </span>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Before Image URL (2D Vector/Graphic File)
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={settings.sliderBeforeImage}
                      onChange={(e) =>
                        setSettings({ ...settings, sliderBeforeImage: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Label Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Before Pill Label Text
                    </label>
                    <input
                      type="text"
                      value={settings.sliderBeforeLabel}
                      onChange={(e) =>
                        setSettings({ ...settings, sliderBeforeLabel: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* CARD 2: AFTER IMAGE (3D Embroidered Patch) */}
                <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500" />
                      <h3 className="text-sm font-bold text-white">Right Side: After (3D Stitched Patch)</h3>
                    </div>
                    <span className="text-[10px] font-mono text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
                      Tajima Stitched Patch
                    </span>
                  </div>

                  {/* Image Preview Box */}
                  <div className="relative h-56 w-full rounded-xl bg-[#12141c] border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-fabric-pattern opacity-90" />
                    {settings.sliderAfterImage ? (
                      <img
                        src={settings.sliderAfterImage}
                        alt="After Preview"
                        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs text-slate-500 relative z-10">No Image Specified</span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-orange-500/95 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded z-20">
                      {settings.sliderAfterLabel || '3D Physical Embroidery'}
                    </span>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      After Image URL (3D Embroidered Patch Photo)
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={settings.sliderAfterImage}
                      onChange={(e) =>
                        setSettings({ ...settings, sliderAfterImage: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Label Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      After Pill Label Text
                    </label>
                    <input
                      type="text"
                      value={settings.sliderAfterLabel}
                      onChange={(e) =>
                        setSettings({ ...settings, sliderAfterLabel: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

              </div>

              {/* Section Headings & Explainer Content */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-500" />
                  <span>Section Titles &amp; Explainer Text</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Section Badge Text
                    </label>
                    <input
                      type="text"
                      value={settings.sliderBadge ?? 'Master Tajima Vector-to-Stitch Digitizing'}
                      onChange={(e) => setSettings({ ...settings, sliderBadge: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Main Heading Title
                    </label>
                    <input
                      type="text"
                      value={settings.sliderTitle ?? 'See Your 2D Artwork Turned into 3D Physical Stitches'}
                      onChange={(e) => setSettings({ ...settings, sliderTitle: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Subtitle Description
                    </label>
                    <textarea
                      rows={2}
                      value={settings.sliderSubtitle ?? 'Drag the slider to see how our digitizers convert flat graphic files into high-density embroidered thread textures.'}
                      onChange={(e) => setSettings({ ...settings, sliderSubtitle: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="btn-orange px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Slider Changes</span>
                  </button>
                </div>
              </div>

            </div>
          )}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Customer Quote Requests &amp; Orders
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage requests submitted via the quote modal and storefront forms.
                  </p>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap gap-3 items-center justify-between bg-[#141722] border border-slate-800 p-4 rounded-2xl">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                  />
                </div>

                {/* Status Chips */}
                <div className="flex gap-1.5 overflow-x-auto">
                  {['all', 'proof_review', 'mass_production', 'shipped'].map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

              </div>

              {/* Orders Table */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-[11px]">
                        <th className="p-4 font-bold">Order ID</th>
                        <th className="p-4 font-bold">Client Name</th>
                        <th className="p-4 font-bold">Patch Specs</th>
                        <th className="p-4 font-bold">Quantity</th>
                        <th className="p-4 font-bold">Total</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold">WhatsApp</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredOrders.map((order) => (
                        <tr key={order.order_id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono font-bold text-orange-400">
                            {order.order_id}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{order.customer_name}</div>
                            <div className="text-[10px] text-slate-400">{order.email}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{order.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200 font-semibold">{order.patch_type}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{order.dimensions}</div>
                          </td>
                          <td className="p-4 font-mono font-bold text-white">
                            {order.quantity} pcs
                          </td>
                          <td className="p-4 font-mono font-bold text-emerald-400">
                            ${order.total_amount?.toFixed(2) || '185.00'}
                          </td>
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateStatus(order.order_id, e.target.value as any)
                              }
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-orange-400 outline-none"
                            >
                              <option value="proof_review">Proof Review</option>
                              <option value="mold_sampling">Mold Sampling</option>
                              <option value="mass_production">Mass Production</option>
                              <option value="backing_qc">Backing QC</option>
                              <option value="shipped">Shipped</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <a
                              href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(order.customer_name)}!%20BDigitizing%20is%20processing%20your%20custom%20patch%20request%20%23${order.order_id}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors text-[10px] font-bold"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Chat</span>
                            </a>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 font-bold text-[11px] transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Customer Testimonials &amp; Reviews
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage testimonials and ratings shown on the homepage luxury dark carousel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddReview(true)}
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Customer Review</span>
                </button>
              </div>

              {/* Add Review Form */}
              {showAddReview && (
                <div className="bg-[#141722] border-2 border-orange-500/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Add Customer Review</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Author Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Captain David Miller"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Tactical Gear"
                        value={newReview.company}
                        onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Country</label>
                      <input
                        type="text"
                        placeholder="e.g. USA"
                        value={newReview.country}
                        onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Rating</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) =>
                          setNewReview({ ...newReview, rating: parseInt(e.target.value) || 5 })
                        }
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      >
                        <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                        <option value="4">★★★★☆ (4 Stars - Great)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Verified Order Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. BD-43541 (250 pcs Velcro)"
                        value={newReview.verifiedOrder}
                        onChange={(e) => setNewReview({ ...newReview, verifiedOrder: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Avatar Photo URL</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={newReview.avatar}
                        onChange={(e) => setNewReview({ ...newReview, avatar: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Testimonial Quote</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Turnaround was under 10 days and stitch density is unmatched!"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="btn-orange px-5 py-2 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save &amp; Publish Review
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Review Modal */}
              {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border-2 border-orange-500/80 rounded-3xl max-w-xl w-full p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-orange-500" />
                        <span>Edit Customer Review</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="text-slate-400 hover:text-white text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Author Name</label>
                        <input
                          type="text"
                          value={editingReview.author}
                          onChange={(e) => setEditingReview({ ...editingReview, author: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={editingReview.company}
                          onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Country</label>
                        <input
                          type="text"
                          value={editingReview.country}
                          onChange={(e) => setEditingReview({ ...editingReview, country: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Rating</label>
                        <select
                          value={editingReview.rating}
                          onChange={(e) =>
                            setEditingReview({ ...editingReview, rating: parseInt(e.target.value) || 5 })
                          }
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                          <option value="4">★★★★☆ (4 Stars - Great)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Verified Order Tag</label>
                        <input
                          type="text"
                          value={editingReview.verifiedOrder}
                          onChange={(e) => setEditingReview({ ...editingReview, verifiedOrder: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Avatar Photo URL</label>
                        <input
                          type="text"
                          value={editingReview.avatar}
                          onChange={(e) => setEditingReview({ ...editingReview, avatar: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Testimonial Quote</label>
                        <textarea
                          rows={3}
                          value={editingReview.comment}
                          onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateReview}
                        className="btn-orange px-6 py-2 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Update &amp; Save Review
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(settings.reviews || []).map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#141722] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                        <div className="flex text-orange-400">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          ✓ Verified
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono mb-2">
                        {rev.verifiedOrder || 'Custom Run'}
                      </div>

                      <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {rev.avatar ? (
                            <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                          ) : (
                            <span>{rev.author?.slice(0, 2) || 'BD'}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">{rev.author}</div>
                          <div className="text-[10px] text-slate-400">
                            {rev.company} • {rev.country || 'USA'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingReview({ ...rev })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Edit Review"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(rev.id)}
                          className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Website Announcement &amp; Contact Settings
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage the top bar ticker, WhatsApp desk number, support email, and hero titles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish to Live Site</span>
                </button>
              </div>

              {/* Form Settings */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-6">
                
                {/* Announcement Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">
                      Top Announcement Bar Message
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.announcementEnabled}
                        onChange={(e) =>
                          setSettings({ ...settings, announcementEnabled: e.target.checked })
                        }
                        className="accent-orange-500 rounded"
                      />
                      <span>Banner Visible</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                  />
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      WhatsApp Desk Hotline
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Turnaround Display Text
                    </label>
                    <input
                      type="text"
                      value={settings.turnaroundTime ?? '10-14 Days Turnaround'}
                      onChange={(e) =>
                        setSettings({ ...settings, turnaroundTime: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>
                </div>

                {/* Hero Headlines */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Hero Badge Text
                    </label>
                    <input
                      type="text"
                      value={settings.heroBadge}
                      onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Hero Main Headline
                    </label>
                    <input
                      type="text"
                      value={settings.heroHeadline}
                      onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Hero Subheadline
                    </label>
                    <textarea
                      rows={2}
                      value={settings.heroSubheadline}
                      onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="btn-orange px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingSettings ? 'Publishing...' : 'Save & Publish Website Settings'}</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: B2B WHOLESALE */}
          {activeTab === 'b2b' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Wholesale B2B Client Accounts
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage dedicated wholesale tier pricing and accounts for tactical, sports, and corporate volume buyers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Apex Tactical Outfitters', tier: 'Tactical Govt Tier (35% OFF)', rep: 'Capt. Miller', spend: '$12,400', orders: 18 },
                  { name: 'Metro Police Dept K9 Unit', tier: 'Municipal First Responder (40% OFF)', rep: 'Lt. Reynolds', spend: '$24,800', orders: 26 },
                  { name: 'Wilderness Explorers Club', tier: 'Outdoor Volume (25% OFF)', rep: 'Sarah Johnson', spend: '$6,200', orders: 9 },
                ].map((acc, i) => (
                  <div key={i} className="bg-[#141722] border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="text-[10px] font-mono font-bold text-orange-400 uppercase">
                      {acc.tier}
                    </div>
                    <h4 className="text-base font-bold text-white">{acc.name}</h4>
                    <div className="text-xs text-slate-400">Primary Contact: {acc.rep}</div>
                    <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-mono">
                      <span>Lifetime Spend: <strong className="text-emerald-400">{acc.spend}</strong></span>
                      <span>{acc.orders} Runs</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Detail Modal for Selected Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-xl w-full p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-orange-400">
                  {selectedOrder.order_id}
                </span>
                <h3 className="text-base font-bold text-white">{selectedOrder.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block">Customer</span>
                  <span className="font-bold">{selectedOrder.customer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Contact</span>
                  <span className="font-mono">{selectedOrder.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Quantity</span>
                  <span className="font-mono font-bold">{selectedOrder.quantity} pieces</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Rate</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ${selectedOrder.total_amount?.toFixed(2)}
                  </span>
                </div>
              </div>

              {selectedOrder.artwork_thumbnail && (
                <div>
                  <span className="text-slate-400 block mb-1">Attached Artwork</span>
                  <a
                    href={selectedOrder.artwork_thumbnail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-orange-400 hover:underline"
                  >
                    <span>View Full-Resolution Artwork File</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <span className="text-slate-400 block mb-1">Customer Notes</span>
                  <p className="bg-slate-900/50 p-3 rounded-xl text-slate-300 font-mono text-[11px]">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="btn-orange px-6 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

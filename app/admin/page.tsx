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
  HelpCircle,
  Download,
  Printer,
  Globe,
  MapPin,
  Calendar,
  Percent,
  Layers,
  Tag,
  Check,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import {
  SiteSettings,
  DEFAULT_SETTINGS,
  PortfolioItem,
  CustomerReviewItem,
  FaqItem,
  BulkTierItem,
  PatchPricingCardItem,
  HeroPatchItem,
  DEFAULT_HERO_PATCHES,
  DEFAULT_PATCH_PRICING_CARDS,
  DEFAULT_PORTFOLIO,
  DEFAULT_REVIEWS,
  DEFAULT_FAQS,
  DEFAULT_BULK_TIERS,
} from '@/lib/settings';

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
  tracking_number?: string;
  courier?: string;
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
    tracking_number: 'FDX-9948201',
    courier: 'FedEx Express',
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
  {
    order_id: 'BD-61540',
    title: 'Special Recon Tactical Morale PVC Patches',
    patch_type: 'PVC',
    dimensions: '3.25" x 3.0"',
    quantity: 500,
    backing: 'Velcro Hook & Loop',
    border: 'Recessed Stitch Channel',
    customer_name: 'Captain Jason Hayes',
    email: 'jason.hayes@bravotactical.mil',
    phone: '+1 (619) 555-4421',
    shipping_address: 'Coronado, CA 92118, USA',
    subtotal: 1275.0,
    total_amount: 1275.0,
    paid: true,
    status: 'shipped',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    notes: 'Mil-spec subdued matte coyote tan & wolf grey casting.',
    tracking_number: 'DHL-847291039',
    courier: 'DHL Express',
  },
];

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
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'orders'
    | 'pricing_cards'
    | 'pricing'
    | 'portfolio'
    | 'slider'
    | 'reviews'
    | 'faqs'
    | 'settings'
    | 'b2b'
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

  // B2B Accounts
  const [b2bAccounts, setB2bAccounts] = useState<B2BAccountItem[]>(INITIAL_B2B_ACCOUNTS);
  const [showAddB2B, setShowAddB2B] = useState(false);
  const [newB2B, setNewB2B] = useState<Partial<B2BAccountItem>>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'Gold Tier (Wholesale)',
    discountPct: 20,
    totalOrders: 1,
    lifetimeSpend: 1500,
  });

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
    featured: true,
  });

  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaq, setNewFaq] = useState<Partial<FaqItem>>({
    category: 'turnaround',
    q: '',
    a: '',
    active: true,
  });

  // Edit item states
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [editingReview, setEditingReview] = useState<CustomerReviewItem | null>(null);
  const [editingPricingCard, setEditingPricingCard] = useState<PatchPricingCardItem | null>(null);
  const [cardFeaturesText, setCardFeaturesText] = useState<string>('');
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // Selected Order for Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<PatchOrderItem | null>(null);

  // Live Pricing Simulator State inside Admin
  const [simWidth, setSimWidth] = useState(3.0);
  const [simHeight, setSimHeight] = useState(3.0);
  const [simQty, setSimQty] = useState(100);
  const [simStyle, setSimStyle] = useState<'embroidered' | 'iron_on' | 'velcro' | 'woven' | 'leather' | 'pvc'>('embroidered');
  const [simBacking, setSimBacking] = useState<'velcro' | 'iron_on' | 'peel_stick' | 'sew_on'>('velcro');
  const [simBorder, setSimBorder] = useState<'merrowed' | 'laser_cut'>('merrowed');
  const [simRush, setSimRush] = useState(false);

  // Fetch Settings & Quotes from API
  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch Settings with cache-busting
      const setRes = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
      if (setRes.ok) {
        const setData = await setRes.json();
        const merged = { ...DEFAULT_SETTINGS, ...setData };
        if (!merged.portfolio || merged.portfolio.length === 0) {
          merged.portfolio = DEFAULT_SETTINGS.portfolio;
        }
        if (!merged.reviews || merged.reviews.length === 0) {
          merged.reviews = DEFAULT_SETTINGS.reviews;
        }
        if (!merged.patchPricingCards || merged.patchPricingCards.length === 0) {
          merged.patchPricingCards = DEFAULT_PATCH_PRICING_CARDS;
        }
        if (!merged.heroPatches || merged.heroPatches.length === 0) {
          merged.heroPatches = DEFAULT_HERO_PATCHES;
        }
        if (!merged.faqs || merged.faqs.length === 0) {
          merged.faqs = DEFAULT_SETTINGS.faqs;
        }
        if (!merged.bulkTiers || merged.bulkTiers.length === 0) {
          merged.bulkTiers = DEFAULT_SETTINGS.bulkTiers;
        }
        setSettings(merged);
        try {
          localStorage.setItem('apex_live_settings', JSON.stringify(merged));
        } catch (e) {}
      }

      // 2. Fetch Orders/Quotes
      const ordRes = await fetch(`/api/admin/orders?t=${Date.now()}`, { cache: 'no-store' });
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

      const data = await res.json();
      if (data?.settings) {
        setSettings(data.settings);
        try {
          localStorage.setItem('apex_live_settings', JSON.stringify(data.settings));
        } catch (e) {}
      }

      setSaveToast('✓ All edits successfully saved and published live to database!');
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

  // Add new portfolio item
  const handleAddPortfolio = () => {
    if (!newPortfolio.title) return;
    const item: PortfolioItem = {
      id: Date.now(),
      title: newPortfolio.title || 'Custom Morale Specimen',
      category: (newPortfolio.category as any) || 'tactical',
      styleId: newPortfolio.styleId || 'embroidered',
      badge: newPortfolio.badge || 'Tajima High Density',
      specs: newPortfolio.specs || '3.0" × 3.0" • Madeira Poly',
      batch: newPortfolio.batch || '100 pcs',
      desc: newPortfolio.desc || 'Precision manufactured custom patch.',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
      image: newPortfolio.image || 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
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
      desc: 'Full-density polyester thread coverage calibrated for extreme abrasion resistance.',
      image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
      basePrice: 1.85,
      active: true,
    });
  };

  const handleDeletePortfolio = (id: string | number) => {
    const updated = (settings.portfolio || []).filter((p) => String(p.id) !== String(id));
    const updatedSettings = { ...settings, portfolio: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
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

  // Add new review
  const handleAddReview = () => {
    if (!newReview.author) return;
    const item: CustomerReviewItem = {
      id: `r-${Date.now()}`,
      author: newReview.author || 'Anonymous Client',
      company: newReview.company || 'Verified Organization',
      country: newReview.country || 'USA',
      rating: Number(newReview.rating) || 5,
      verifiedOrder: newReview.verifiedOrder || 'BD-Custom (100 pcs)',
      comment: newReview.comment || 'Outstanding quality and very fast turnaround!',
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

  const handleDeleteReview = (id: string) => {
    const updated = (settings.reviews || []).filter((r) => r.id !== id);
    const updatedSettings = { ...settings, reviews: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Open Edit Patch Pricing Card
  const openEditPricingCard = (card: PatchPricingCardItem) => {
    setEditingPricingCard({ ...card });
    setCardFeaturesText(card.features ? card.features.join('\n') : '');
  };

  // Update Patch Pricing Card
  const handleUpdatePricingCard = () => {
    if (!editingPricingCard) return;
    const featuresList = cardFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedCard: PatchPricingCardItem = {
      ...editingPricingCard,
      features: featuresList,
    };

    const currentCards =
      settings.patchPricingCards && settings.patchPricingCards.length > 0
        ? settings.patchPricingCards
        : DEFAULT_PATCH_PRICING_CARDS;

    const updated = currentCards.map((c) =>
      c.id === updatedCard.id ? updatedCard : c
    );

    const updatedSettings = { ...settings, patchPricingCards: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setEditingPricingCard(null);
  };

  // Quick Toggle Active on Storefront
  const handleToggleCardActive = (cardId: string) => {
    const currentCards =
      settings.patchPricingCards && settings.patchPricingCards.length > 0
        ? settings.patchPricingCards
        : DEFAULT_PATCH_PRICING_CARDS;

    const updated = currentCards.map((c) =>
      c.id === cardId ? { ...c, active: c.active === false ? true : false } : c
    );

    const updatedSettings = { ...settings, patchPricingCards: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Reset All Cards to Factory Defaults
  const handleResetCardsToDefault = () => {
    if (
      confirm(
        'Are you sure you want to reset all 8 patch pricing cards to default specifications & rates?'
      )
    ) {
      const updatedSettings = {
        ...settings,
        patchPricingCards: DEFAULT_PATCH_PRICING_CARDS,
      };
      setSettings(updatedSettings);
      handleSaveSettings(updatedSettings);
    }
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (!newFaq.q || !newFaq.a) return;
    const item: FaqItem = {
      id: `f-${Date.now()}`,
      category: (newFaq.category as any) || 'general',
      q: newFaq.q,
      a: newFaq.a,
      active: true,
    };
    const updated = [...(settings.faqs || DEFAULT_FAQS), item];
    const updatedSettings = { ...settings, faqs: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setShowAddFaq(false);
    setNewFaq({ category: 'turnaround', q: '', a: '', active: true });
  };

  // Update FAQ
  const handleUpdateFaq = () => {
    if (!editingFaq || !editingFaq.q) return;
    const updated = (settings.faqs || DEFAULT_FAQS).map((f) =>
      f.id === editingFaq.id ? editingFaq : f
    );
    const updatedSettings = { ...settings, faqs: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
    setEditingFaq(null);
  };

  // Delete FAQ
  const handleDeleteFaq = (id: string) => {
    const updated = (settings.faqs || DEFAULT_FAQS).filter((f) => f.id !== id);
    const updatedSettings = { ...settings, faqs: updated };
    setSettings(updatedSettings);
    handleSaveSettings(updatedSettings);
  };

  // Add B2B Account
  const handleAddB2B = () => {
    if (!newB2B.name) return;
    const item: B2BAccountItem = {
      id: `b2b-${Date.now()}`,
      name: newB2B.name || 'New Wholesale Client',
      contactPerson: newB2B.contactPerson || 'Contact Name',
      email: newB2B.email || 'wholesale@client.com',
      phone: newB2B.phone || '+1 (800) 000-0000',
      tier: newB2B.tier || 'Gold Tier',
      discountPct: Number(newB2B.discountPct) || 20,
      totalOrders: Number(newB2B.totalOrders) || 1,
      lifetimeSpend: Number(newB2B.lifetimeSpend) || 1000,
    };
    setB2bAccounts([item, ...b2bAccounts]);
    setShowAddB2B(false);
    setNewB2B({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      tier: 'Gold Tier (Wholesale)',
      discountPct: 20,
      totalOrders: 1,
      lifetimeSpend: 1500,
    });
  };

  // Update Status Function
  const handleUpdateStatus = async (orderId: string, newStatus: PatchOrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.order_id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Update Tracking Number & Courier
  const handleUpdateTracking = (orderId: string, courier: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, courier, tracking_number: trackingNumber } : o
      )
    );
    if (selectedOrder && selectedOrder.order_id === orderId) {
      setSelectedOrder({ ...selectedOrder, courier, tracking_number: trackingNumber });
    }
  };

  // Export Orders CSV
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

  // WhatsApp Customer Helper
  const handleWhatsAppCustomer = (order: PatchOrderItem) => {
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
    const message = `Hello ${order.customer_name}, this is BDigitizing Factory regarding your custom patch order ${order.order_id} (${order.quantity} pcs ${order.patch_type}). Current Production Status: ${order.status.toUpperCase()}${
      order.tracking_number ? ` | Tracking: ${order.tracking_number}` : ''
    }. Please let us know if you need any assistance!`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Email Customer Helper
  const handleEmailCustomer = (order: PatchOrderItem) => {
    const subject = `Production Update: BDigitizing Custom Patch Order ${order.order_id}`;
    const body = `Hi ${order.customer_name},\n\nWe are pleased to inform you that your custom patch order ${order.order_id} (${order.quantity} pcs ${order.patch_type}) is now in: ${order.status.toUpperCase()}.\n\n${
      order.tracking_number ? `Courier: ${order.courier || 'Express'}\nTracking Number: ${order.tracking_number}\n\n` : ''
    }Thank you for your business!\n\nBest regards,\nBDigitizing Master Production Team\nsupport@bdigitizing.com`;
    window.open(`mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.patch_type?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // Overall KPIs
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

  // Live Simulator Calculation
  const simCalculation = useMemo(() => {
    const baseRates: Record<string, number> = {
      embroidered: settings.priceEmbroidered ?? 1.85,
      iron_on: settings.priceIronOn ?? 1.95,
      velcro: settings.priceVelcro ?? 2.35,
      woven: settings.priceWoven ?? 1.65,
      leather: settings.priceLeather ?? 2.45,
      pvc: settings.pricePvc ?? 2.55,
    };
    const backingFees: Record<string, number> = {
      velcro: settings.velcroFee ?? 0.45,
      iron_on: settings.ironOnFee ?? 0.20,
      peel_stick: settings.peelStickFee ?? 0.35,
      sew_on: settings.sewOnFee ?? 0.00,
    };
    const borderFee = simBorder === 'laser_cut' ? (settings.laserCutFee ?? 0.15) : (settings.merrowedFee ?? 0.0);
    const base = baseRates[simStyle] || 1.85;
    const backing = backingFees[simBacking] || 0.0;
    const sizeFactor = Math.max(1.0, ((simWidth + simHeight) / 2) / 3.0);

    // Bulk discount tier
    const matchingTier = [...(settings.bulkTiers || DEFAULT_BULK_TIERS)]
      .reverse()
      .find((t) => simQty >= t.qty);
    const discountPct = matchingTier ? matchingTier.discountPct : 0;

    let unit = (base + backing + borderFee) * sizeFactor;
    unit = unit * (1 - discountPct / 100);

    let total = unit * simQty;
    if (simRush) total += (settings.rushOrderFee ?? 45.0);

    return {
      unitPrice: unit.toFixed(2),
      discountPct,
      subtotal: (unit * simQty).toFixed(2),
      total: total.toFixed(2),
    };
  }, [simWidth, simHeight, simQty, simStyle, simBacking, simBorder, simRush, settings]);

  return (
    <div className="min-h-screen bg-[#0d0f15] text-slate-100 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#12141c]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <line x1="6" y1="4" x2="6" y2="20" />
              </svg>
            </div>
            <div>
              <span className="text-base font-black text-white tracking-tight flex items-center gap-1 font-sans">
                <span className="text-orange-500">B</span>Digitizing
              </span>
            </div>
          </Link>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <Shield className="w-3 h-3" />
            <span>Master Factory Command Portal</span>
          </span>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshData}
            title="Refresh database"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleSaveSettings()}
            disabled={isSavingSettings}
            className="btn-orange px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSavingSettings ? 'Saving...' : 'Save & Publish All'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/60"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-6 text-center animate-in slide-in-from-top-2 shadow-lg">
          {saveToast}
        </div>
      )}

      {/* 2. Main Dashboard Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#12141c] border-r border-slate-800/80 p-4 space-y-1 shrink-0">
          
          <div className="text-[10px] font-mono font-bold uppercase text-slate-500 px-3 py-2">
            Factory Control Modules
          </div>

          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'orders', label: 'Quote Requests & Orders', icon: <ShoppingBag className="w-4 h-4" />, badge: orders.length },
            { id: 'pricing_cards', label: 'Patch Pricing Cards', icon: <Tag className="w-4 h-4" />, badge: (settings.patchPricingCards || DEFAULT_PATCH_PRICING_CARDS).length },
            { id: 'pricing', label: 'Pricing & Surcharges', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'portfolio', label: 'Portfolio Specimens', icon: <ImageIcon className="w-4 h-4" />, badge: (settings.portfolio || []).length },
            { id: 'slider', label: 'Before/After Slider', icon: <Wand2 className="w-4 h-4" /> },
            { id: 'reviews', label: 'Customer Reviews', icon: <Star className="w-4 h-4" />, badge: (settings.reviews || []).length },
            { id: 'faqs', label: 'FAQs & Help Desk', icon: <HelpCircle className="w-4 h-4" />, badge: (settings.faqs || DEFAULT_FAQS).length },
            { id: 'settings', label: 'Website & Brand Settings', icon: <Settings className="w-4 h-4" /> },
            { id: 'b2b', label: 'Wholesale B2B Accounts', icon: <Users className="w-4 h-4" />, badge: b2bAccounts.length },
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
          <div className="pt-6 px-2">
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
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Factory Command Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Live production status, incoming client quote inquiries, and manufacturing pipeline.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="btn-orange px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>View All Orders</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
                    <span>Total Orders &amp; Quotes</span>
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono mt-2">
                    {metrics.totalOrdersCount}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                    ✓ Connected to Supabase DB
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

              {/* Quick Actions Bar */}
              <div className="bg-[#141722] border border-slate-800 p-5 rounded-2xl">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">
                  Quick Action Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pricing_cards')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4 text-orange-400" />
                    <span>Edit Patch Pricing Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('portfolio');
                      setShowAddPortfolio(true);
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Add Portfolio Specimen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportOrdersCSV()}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>Export Orders CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-left text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Website &amp; Promo Settings</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders Quick Table */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span>Recent Quote Inquiries &amp; Production Orders</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
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
                              onClick={() => setSelectedOrder(order)}
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

          {/* TAB 2: ORDERS & QUOTES */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Customer Quote Requests &amp; Production Orders
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage requests submitted via the quote modal, storefront forms, and factory desk.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportOrdersCSV}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap gap-3 items-center justify-between bg-[#141722] border border-slate-800 p-4 rounded-2xl">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, phone, order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                  />
                </div>

                {/* Status Chips */}
                <div className="flex gap-1.5 overflow-x-auto">
                  {['all', 'proof_review', 'mold_sampling', 'mass_production', 'backing_qc', 'shipped'].map((st) => (
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
                        <th className="p-4 font-bold">Quick WhatsApp</th>
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
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-orange-400 outline-none cursor-pointer"
                            >
                              <option value="proof_review">Proof Review</option>
                              <option value="mold_sampling">Mold Sampling</option>
                              <option value="mass_production">Mass Production</option>
                              <option value="backing_qc">Backing QC</option>
                              <option value="shipped">Shipped</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <button
                              type="button"
                              onClick={() => handleWhatsAppCustomer(order)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors text-[10px] font-bold cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Chat</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              View Full
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

          {/* TAB 3: PRICING & SURCHARGES */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Live Pricing Rates, Surcharges &amp; Calculator
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control baseline unit rates, backing fees, border options, bulk discount tiers, and verify with live calculator.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={isSavingSettings}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'Publishing...' : 'Publish Pricing to Website'}</span>
                </button>
              </div>

              {/* Base Prices Grid */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-500" />
                  <span>1. Base Unit Rates (Benchmark 100 pcs, 3.0" x 3.0")</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'priceEmbroidered', label: 'Embroidered Patches (Madeira Poly)', default: 1.85 },
                    { key: 'priceIronOn', label: 'Iron-On Patches (Heat-Seal Film)', default: 1.95 },
                    { key: 'priceVelcro', label: 'Velcro Patches (Mil-Spec Hook & Loop)', default: 2.35 },
                    { key: 'priceWoven', label: 'Woven Jacquard (50-Denier Micro)', default: 1.65 },
                    { key: 'priceLeather', label: 'Debossed Leatherette (Laser Etched)', default: 2.45 },
                    { key: 'pricePvc', label: '3D Soft Molded PVC Rubber', default: 2.55 },
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
                  <span>2. Backing &amp; Fastener Surcharges (Per Patch)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Velcro Hook &amp; Loop (+$/ea)
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
                      Heat-Seal Iron-On Glue (+$/ea)
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
                      3M Peel &amp; Stick (+$/ea)
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
                      Plain Sew-On (Standard)
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

              {/* Edge Finishes & Specialty Surcharges */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-500" />
                  <span>3. Edge Finishes &amp; Specialty Surcharges</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Classic Merrowed Border (Free)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.merrowedFee ?? 0.00}
                      onChange={(e) =>
                        setSettings({ ...settings, merrowedFee: parseFloat(e.target.value) || 0.00 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Precision Laser-Cut Border (+$/ea)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={settings.laserCutFee ?? 0.15}
                      onChange={(e) =>
                        setSettings({ ...settings, laserCutFee: parseFloat(e.target.value) || 0.15 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Rush 5-7 Days Expedite Fee ($)
                    </label>
                    <input
                      type="number"
                      step="5"
                      value={settings.rushOrderFee ?? 45.00}
                      onChange={(e) =>
                        setSettings({ ...settings, rushOrderFee: parseFloat(e.target.value) || 45.00 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Free Shipping Threshold ($)
                    </label>
                    <input
                      type="number"
                      step="5"
                      value={settings.freeShippingThreshold ?? 99.00}
                      onChange={(e) =>
                        setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 99.00 })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-sm font-bold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Bulk Quantity Discount Tiers */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Percent className="w-4 h-4 text-orange-500" />
                  <span>4. Wholesale Bulk Quantity Discount Tiers</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {(settings.bulkTiers || DEFAULT_BULK_TIERS).map((tier, idx) => (
                    <div key={tier.qty} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                      <div className="text-xs font-bold text-orange-400 mb-1">
                        {tier.qty}+ Pieces
                      </div>
                      <div className="text-[11px] text-slate-400 mb-2 truncate">
                        {tier.label}
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={tier.discountPct}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const updated = (settings.bulkTiers || DEFAULT_BULK_TIERS).map((t, i) =>
                              i === idx ? { ...t, discountPct: val } : t
                            );
                            setSettings({ ...settings, bulkTiers: updated });
                          }}
                          className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 font-mono text-sm font-bold text-white"
                        />
                        <span className="text-slate-400 font-bold">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Live Price Simulator */}
              <div className="bg-gradient-to-br from-slate-900 via-[#141722] to-slate-900 border-2 border-orange-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-orange-400" />
                    <span>5. Live Customer Pricing Test Simulator</span>
                  </h3>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">
                    Real-time calculation check
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Style</label>
                    <select
                      value={simStyle}
                      onChange={(e) => setSimStyle(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                    >
                      <option value="embroidered">Embroidered</option>
                      <option value="iron_on">Iron-On</option>
                      <option value="velcro">Velcro</option>
                      <option value="woven">Woven</option>
                      <option value="leather">Leather</option>
                      <option value="pvc">PVC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Backing</label>
                    <select
                      value={simBacking}
                      onChange={(e) => setSimBacking(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                    >
                      <option value="velcro">Velcro</option>
                      <option value="iron_on">Iron-On</option>
                      <option value="peel_stick">3M Stick</option>
                      <option value="sew_on">Sew-On</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Border</label>
                    <select
                      value={simBorder}
                      onChange={(e) => setSimBorder(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white outline-none"
                    >
                      <option value="merrowed">Merrowed (Free)</option>
                      <option value="laser_cut">Laser-Cut</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Quantity</label>
                    <input
                      type="number"
                      step="25"
                      value={simQty}
                      onChange={(e) => setSimQty(parseInt(e.target.value) || 100)}
                      className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Rush Turnaround</label>
                    <button
                      type="button"
                      onClick={() => setSimRush(!simRush)}
                      className={`w-full p-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                        simRush
                          ? 'bg-orange-500 text-white border-orange-400'
                          : 'bg-slate-950 text-slate-400 border-slate-700'
                      }`}
                    >
                      {simRush ? 'Rush (5-7 Days)' : 'Standard (10-14)'}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">Calculated Total</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      ${simCalculation.total}
                    </span>
                    <span className="text-[9px] text-slate-500 block font-mono">
                      ${simCalculation.unitPrice} / ea ({simCalculation.discountPct}% off)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Save Bar */}
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
          )}

          {/* TAB 4: 8 CUSTOM PATCH PRICING CARDS */}
          {activeTab === 'pricing_cards' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      8 Standard Patch Styles
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live Storefront Sync
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Tag className="w-6 h-6 text-orange-500" />
                    <span>Patch Pricing Cards Manager</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control public pricing cards: live unit rates, comparison strike prices, top badge pills, bullet features list, and turnaround time.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCardsToDefault}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
                    title="Reset cards back to factory defaults"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingSettings ? 'Publishing...' : 'Publish Cards to Store'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Summary Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#141722] border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Total Patch Types</span>
                  <span className="text-lg font-black text-white font-mono">
                    {(settings.patchPricingCards || DEFAULT_PATCH_PRICING_CARDS).length} Cards
                  </span>
                </div>
                <div className="bg-[#141722] border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Storefront Visible</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {(settings.patchPricingCards || DEFAULT_PATCH_PRICING_CARDS).filter(c => c.active !== false).length} Active
                  </span>
                </div>
                <div className="bg-[#141722] border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Starting Price Range</span>
                  <span className="text-lg font-black text-amber-400 font-mono">$1.65 – $2.65 / ea</span>
                </div>
                <div className="bg-[#141722] border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Database Sync</span>
                  <span className="text-lg font-black text-blue-400 font-mono">Real-Time Cloud</span>
                </div>
              </div>

              {/* 8 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {(settings.patchPricingCards || DEFAULT_PATCH_PRICING_CARDS).map((card) => {
                  const isActive = card.active !== false;
                  
                  // Color helpers
                  const getPillBadgeStyle = (color: string) => {
                    switch (color) {
                      case 'orange': return 'bg-orange-500 text-white';
                      case 'blue': return 'bg-blue-600 text-white';
                      case 'green': return 'bg-emerald-600 text-white';
                      case 'purple': return 'bg-purple-600 text-white';
                      case 'amber': return 'bg-amber-600 text-white';
                      case 'teal': return 'bg-teal-600 text-white';
                      case 'yellow': return 'bg-yellow-400 text-slate-950 font-black';
                      case 'indigo': return 'bg-indigo-600 text-white';
                      default: return 'bg-blue-600 text-white';
                    }
                  };

                  return (
                    <div
                      key={card.id}
                      className={`bg-[#141722] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 relative group ${
                        isActive ? 'border-slate-800 hover:border-slate-700 shadow-md' : 'border-dashed border-slate-800/60 opacity-60'
                      }`}
                    >
                      {/* Top Bar with Badge Pill & Active Toggle */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getPillBadgeStyle(card.pillColor || 'blue')}`}>
                            {card.badgePill || 'PATCH'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleCardActive(card.id)}
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                            }`}
                            title="Click to toggle card visibility"
                          >
                            {isActive ? '● Live' : '○ Hidden'}
                          </button>
                        </div>

                        <h3 className="text-base font-black text-white leading-snug mb-1">
                          {card.name}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {card.desc}
                        </p>

                        {/* Price Box */}
                        <div className="bg-[#181b26] border border-slate-800/80 rounded-xl p-3 mb-4 text-center">
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-2xl font-black text-emerald-400 font-mono">
                              ${card.price.toFixed(2)}
                            </span>
                            {card.strikePrice && (
                              <span className="text-xs font-mono text-slate-500 line-through">
                                ${card.strikePrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                              / piece
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-orange-400" />
                            <span className="truncate">{card.turnaround}</span>
                          </div>
                        </div>

                        {/* Features preview */}
                        <div className="space-y-1.5 mb-4">
                          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                            Included Specs ({card.features?.length || 0})
                          </span>
                          {(card.features || []).slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                          {(card.features?.length || 0) > 3 && (
                            <span className="text-[10px] text-slate-500 font-mono block pl-5">
                              + {(card.features.length - 3)} more bullet features
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditPricingCard(card)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleCardActive(card.id)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400'
                              : 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/60'
                          }`}
                          title={isActive ? 'Hide from public view' : 'Show on public site'}
                        >
                          {isActive ? <Eye className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Edit Patch Pricing Card Modal */}
              {editingPricingCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                          <Tag className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">
                            Edit Patch Pricing Card
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            Identifier: {editingPricingCard.id}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingPricingCard(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Name & Badge Pill */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Patch Style Title
                          </label>
                          <input
                            type="text"
                            value={editingPricingCard.name}
                            onChange={(e) =>
                              setEditingPricingCard({ ...editingPricingCard, name: e.target.value })
                            }
                            placeholder="e.g. 100% Tajima Embroidered"
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Top Badge Pill Text
                          </label>
                          <input
                            type="text"
                            value={editingPricingCard.badgePill}
                            onChange={(e) =>
                              setEditingPricingCard({ ...editingPricingCard, badgePill: e.target.value })
                            }
                            placeholder="e.g. MOST POPULAR, COMBAT GRADE"
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* Pill Color theme */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Top Badge Pill Color Theme
                          </label>
                          <select
                            value={editingPricingCard.pillColor || 'blue'}
                            onChange={(e) =>
                              setEditingPricingCard({ ...editingPricingCard, pillColor: e.target.value })
                            }
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                          >
                            <option value="orange">Orange (Brand Highlight / Most Popular)</option>
                            <option value="blue">Blue (Tactical Combat)</option>
                            <option value="green">Green (Easy Heat-Seal Application)</option>
                            <option value="purple">Purple (Micro Precision Woven)</option>
                            <option value="amber">Amber (Rustic Laser Leather)</option>
                            <option value="teal">Teal (100% Waterproof PVC)</option>
                            <option value="yellow">Yellow (Vintage Chenille Varsity)</option>
                            <option value="indigo">Indigo (Photographic Sublimation)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            CTA Button Text
                          </label>
                          <input
                            type="text"
                            value={editingPricingCard.buttonText}
                            onChange={(e) =>
                              setEditingPricingCard({ ...editingPricingCard, buttonText: e.target.value })
                            }
                            placeholder="e.g. Order Embroidered Patches"
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* Prices & Turnaround */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Live Unit Price ($ / pc)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">$</span>
                            <input
                              type="number"
                              step="0.05"
                              value={editingPricingCard.price}
                              onChange={(e) =>
                                setEditingPricingCard({
                                  ...editingPricingCard,
                                  price: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm font-bold focus:border-orange-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Strike-Through Price ($)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">$</span>
                            <input
                              type="number"
                              step="0.05"
                              value={editingPricingCard.strikePrice}
                              onChange={(e) =>
                                setEditingPricingCard({
                                  ...editingPricingCard,
                                  strikePrice: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm font-bold focus:border-orange-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-bold">
                            Delivery Turnaround
                          </label>
                          <input
                            type="text"
                            value={editingPricingCard.turnaround}
                            onChange={(e) =>
                              setEditingPricingCard({
                                ...editingPricingCard,
                                turnaround: e.target.value,
                              })
                            }
                            placeholder="e.g. Express Delivery: 10–12 Business Days"
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* Technical Description */}
                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">
                          Technical Description (1-2 sentences)
                        </label>
                        <textarea
                          rows={2}
                          value={editingPricingCard.desc}
                          onChange={(e) =>
                            setEditingPricingCard({ ...editingPricingCard, desc: e.target.value })
                          }
                          placeholder="Brief technical summary of thread density, backing, and material construction..."
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:border-orange-500 outline-none"
                        />
                      </div>

                      {/* Bullet Features Textarea */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-slate-400 font-bold">
                            Bullet Features (One per line)
                          </label>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Each line will display with a green checkmark
                          </span>
                        </div>
                        <textarea
                          rows={6}
                          value={cardFeaturesText}
                          onChange={(e) => setCardFeaturesText(e.target.value)}
                          placeholder={'Classic 3D textured embroidery thread sheen\n100% Madeira Polyneon high-tensile threads\nRolled merrowed overlock fray-proof border\nWithstands 100+ commercial wash cycles\nFree 6-Hour digital embroidery stitch proof'}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-medium text-white focus:border-orange-500 outline-none leading-relaxed"
                        />
                      </div>

                      {/* Storefront Active Checkbox */}
                      <div className="bg-[#181b26] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Card Active on Public Storefront
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Uncheck if you temporarily want to hide this patch style from customers.
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingPricingCard.active !== false}
                            onChange={(e) =>
                              setEditingPricingCard({
                                ...editingPricingCard,
                                active: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingPricingCard(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdatePricingCard}
                        className="btn-orange px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Save className="w-4 h-4" />
                        <span>Update &amp; Save Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: PORTFOLIO SPECIMENS */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Client Production Portfolio Specimens
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage high-definition client production specimens, material badges, and batch counts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPortfolio(true)}
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Specimen</span>
                </button>
              </div>

              {/* Add Portfolio Form Modal */}
              {showAddPortfolio && (
                <div className="bg-[#141722] border-2 border-orange-500/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Add New Production Specimen</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Specimen Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Tactical Recon Morale Badge"
                        value={newPortfolio.title}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                      <select
                        value={newPortfolio.category}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value as any })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      >
                        <option value="tactical">Tactical Units</option>
                        <option value="headwear">Caps &amp; Beanies</option>
                        <option value="biker">Biker MC</option>
                        <option value="varsity">Varsity Athletics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Material Badge Label</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Tajima High Density"
                        value={newPortfolio.badge}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, badge: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 mb-1">High-Res Image URL</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={newPortfolio.image}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, image: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Batch Size</label>
                      <input
                        type="text"
                        placeholder="e.g. 500 pcs"
                        value={newPortfolio.batch}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, batch: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Technical Specs</label>
                      <input
                        type="text"
                        placeholder='3.25" × 3.0" • Madeira Thread • Mil-Spec Velcro'
                        value={newPortfolio.specs}
                        onChange={(e) => setNewPortfolio({ ...newPortfolio, specs: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Manufacturing details..."
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
                      className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                    >
                      Save Specimen
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Portfolio Modal */}
              {editingPortfolio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-white space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-orange-400" />
                        <span>Edit Portfolio Specimen</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingPortfolio(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-400 mb-1">Specimen Title</label>
                        <input
                          type="text"
                          value={editingPortfolio.title}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-400 mb-1">Category</label>
                        <select
                          value={editingPortfolio.category}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="tactical">Tactical Units</option>
                          <option value="headwear">Caps &amp; Beanies</option>
                          <option value="biker">Biker MC</option>
                          <option value="varsity">Varsity Athletics</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-400 mb-1">Batch Run</label>
                        <input
                          type="text"
                          value={editingPortfolio.batch}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, batch: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-400 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={editingPortfolio.badge}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, badge: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-400 mb-1">High-Res Image URL</label>
                        <input
                          type="text"
                          value={editingPortfolio.image}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-400 mb-1">Technical Specs</label>
                        <input
                          type="text"
                          value={editingPortfolio.specs}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, specs: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-400 mb-1">Manufacturing Description</label>
                        <textarea
                          rows={3}
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
                        className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdatePortfolio}
                        className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                      >
                        Update &amp; Save Specimen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Specimens Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(settings.portfolio || []).map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#141722] border border-slate-800 rounded-2xl overflow-hidden flex flex-col group"
                  >
                    <div className="h-44 bg-slate-900 relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20">
                        {p.batch}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1">
                          {p.badge}
                        </span>
                        <h3 className="font-bold text-sm text-white">{p.title}</h3>
                        <p className="text-[11px] font-mono text-slate-400 mt-1">{p.specs}</p>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500 capitalize">
                          Cat: {p.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingPortfolio({ ...p })}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePortfolio(p.id)}
                            className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                            title="Delete Specimen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: BEFORE / AFTER SLIDER */}
          {activeTab === 'slider' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Before / After Digitizing Comparison Slider
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control 2D vector graphic file vs. 3D physical embroidery stitch photo and labels.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={isSavingSettings}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'Publishing...' : 'Publish Slider'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Inputs */}
                <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-orange-400" />
                    <span>Slider Media &amp; Headlines</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Section Badge</label>
                    <input
                      type="text"
                      value={settings.sliderBadge}
                      onChange={(e) => setSettings({ ...settings, sliderBadge: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={settings.sliderTitle}
                      onChange={(e) => setSettings({ ...settings, sliderTitle: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={settings.sliderSubtitle}
                      onChange={(e) => setSettings({ ...settings, sliderSubtitle: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Left: Before (2D Vector File) Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.sliderBeforeImage}
                        onChange={(e) => setSettings({ ...settings, sliderBeforeImage: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Left: Before Label Text
                      </label>
                      <input
                        type="text"
                        value={settings.sliderBeforeLabel}
                        onChange={(e) => setSettings({ ...settings, sliderBeforeLabel: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Right: After (3D Tajima Stitches) Image URL
                      </label>
                      <input
                        type="text"
                        value={settings.sliderAfterImage}
                        onChange={(e) => setSettings({ ...settings, sliderAfterImage: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">
                        Right: After Label Text
                      </label>
                      <input
                        type="text"
                        value={settings.sliderAfterLabel}
                        onChange={(e) => setSettings({ ...settings, sliderAfterLabel: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-orange-400" />
                    <span>Slider Comparison Preview</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 h-64">
                    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-white">
                      <img
                        src={settings.sliderBeforeImage}
                        alt="Before Preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {settings.sliderBeforeLabel}
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img
                        src={settings.sliderAfterImage}
                        alt="After Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {settings.sliderAfterLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    Drag-handle is rendered interactively on the live storefront using this imagery.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: REVIEWS */}
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
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
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
                      <label className="block text-xs font-bold text-slate-400 mb-1">Rating</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      >
                        <option value={5}>5 Stars (★★★★★)</option>
                        <option value={4}>4 Stars (★★★★☆)</option>
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
                    <div className="sm:col-span-2">
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
                        rows={2}
                        placeholder="Client testimonial..."
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
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Review Modal */}
              {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-xl w-full p-6 text-white space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-orange-400" />
                        <span>Edit Customer Review</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                        <label className="block text-xs font-bold text-slate-400 mb-1">Company / Squadron</label>
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
                          value={editingReview.country || 'USA'}
                          onChange={(e) => setEditingReview({ ...editingReview, country: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>

                      <div>
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
                        className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateReview}
                        className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
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
                    className="bg-[#141722] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-orange-400 mb-2">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                          alt={rev.author}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{rev.author}</div>
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

          {/* TAB 8: FAQS & KNOWLEDGEBASE */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Frequently Asked Questions (FAQs)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage customer support questions, answers, and categories on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddFaq(true)}
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              {/* Add FAQ Form */}
              {showAddFaq && (
                <div className="bg-[#141722] border-2 border-orange-500/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Add New FAQ Item</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Question</label>
                        <input
                          type="text"
                          placeholder="e.g. Can I request a physical sew-out sample?"
                          value={newFaq.q}
                          onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                        <select
                          value={newFaq.category}
                          onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="turnaround">Turnaround &amp; Speed</option>
                          <option value="shipping">Worldwide Shipping</option>
                          <option value="ordering">Ordering &amp; Samples</option>
                          <option value="artwork">Artwork &amp; Thread Colors</option>
                          <option value="general">General Support</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Answer</label>
                      <textarea
                        rows={3}
                        placeholder="Comprehensive factory answer..."
                        value={newFaq.a}
                        onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFaq(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                    >
                      Save FAQ
                    </button>
                  </div>
                </div>
              )}

              {/* Edit FAQ Modal */}
              {editingFaq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-xl w-full p-6 text-white space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-orange-400" />
                        <span>Edit FAQ</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-400 mb-1">Question</label>
                        <input
                          type="text"
                          value={editingFaq.q}
                          onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-400 mb-1">Category</label>
                        <select
                          value={editingFaq.category}
                          onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        >
                          <option value="turnaround">Turnaround &amp; Speed</option>
                          <option value="shipping">Worldwide Shipping</option>
                          <option value="ordering">Ordering &amp; Samples</option>
                          <option value="artwork">Artwork &amp; Thread Colors</option>
                          <option value="general">General Support</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-400 mb-1">Answer</label>
                        <textarea
                          rows={4}
                          value={editingFaq.a}
                          onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateFaq}
                        className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                      >
                        Update &amp; Save FAQ
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQs List */}
              <div className="space-y-3">
                {(settings.faqs || DEFAULT_FAQS).map((f) => (
                  <div
                    key={f.id}
                    className="bg-[#141722] border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 group"
                  >
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">
                        {f.category}
                      </span>
                      <h4 className="text-sm font-bold text-white pt-1">{f.q}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">{f.a}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setEditingFaq({ ...f })}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(f.id)}
                        className="text-slate-500 hover:text-red-400 p-2 transition-colors cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 9: WEBSITE & BRAND SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Comprehensive Website &amp; Brand Settings
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage header announcements, hero messaging, factory contact info, social links, stats, and SEO.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={isSavingSettings}
                  className="btn-orange px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'Publishing...' : 'Publish Website Settings'}</span>
                </button>
              </div>

              {/* 1. Header & Top Announcement Bar */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>1. Top Promo Announcement Strip</span>
                  </h3>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.announcementEnabled}
                      onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                      className="w-4 h-4 rounded text-orange-500"
                    />
                    <span>Announcement Enabled</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Banner Text Message
                    </label>
                    <input
                      type="text"
                      value={settings.announcementText}
                      onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Promo Discount Code
                    </label>
                    <input
                      type="text"
                      value={settings.promoCode}
                      onChange={(e) => setSettings({ ...settings, promoCode: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Hero Section Content */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span>2. Hero Section Messaging</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Hero Eyebrow Badge
                    </label>
                    <input
                      type="text"
                      value={settings.heroBadge}
                      onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={settings.heroHeadline}
                      onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Sub-Headline
                    </label>
                    <textarea
                      rows={2}
                      value={settings.heroSubheadline}
                      onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2B. Hero Showcase Patches (5 Featured Specimens) */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>2B. Hero Showcase Patches (5 Featured Specimens)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSettings({ ...settings, heroPatches: DEFAULT_HERO_PATCHES });
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default Badges</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Manage the 5 physical custom patch specimens floating on the Hero stage: customize title, technical specs, and custom patch photo image URLs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {(settings.heroPatches || DEFAULT_HERO_PATCHES).map((patch, idx) => (
                    <div
                      key={patch.id || idx}
                      className="bg-[#181b26] p-4 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                          Position {idx + 1}: {['Top-Left', 'Top-Right', 'Center Focal', 'Lower-Center', 'Far Right'][idx] || `Patch ${idx + 1}`}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          {patch.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={patch.image}
                          alt={patch.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-700 shrink-0 shadow-md"
                        />
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={patch.name}
                            onChange={(e) => {
                              const updated = [...(settings.heroPatches || DEFAULT_HERO_PATCHES)];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              setSettings({ ...settings, heroPatches: updated });
                            }}
                            placeholder="Patch Title"
                            className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:border-orange-500 outline-none"
                          />
                          <input
                            type="text"
                            value={patch.badge}
                            onChange={(e) => {
                              const updated = [...(settings.heroPatches || DEFAULT_HERO_PATCHES)];
                              updated[idx] = { ...updated[idx], badge: e.target.value };
                              setSettings({ ...settings, heroPatches: updated });
                            }}
                            placeholder="Badge Pill Text"
                            className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono font-bold text-orange-400 focus:border-orange-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Specifications Line
                        </label>
                        <input
                          type="text"
                          value={patch.specs}
                          onChange={(e) => {
                            const updated = [...(settings.heroPatches || DEFAULT_HERO_PATCHES)];
                            updated[idx] = { ...updated[idx], specs: e.target.value };
                            setSettings({ ...settings, heroPatches: updated });
                          }}
                          placeholder="e.g. 100% Madeira Polyester • 24,500 Stitches"
                          className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 focus:border-orange-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Patch Image URL
                        </label>
                        <input
                          type="text"
                          value={patch.image}
                          onChange={(e) => {
                            const updated = [...(settings.heroPatches || DEFAULT_HERO_PATCHES)];
                            updated[idx] = { ...updated[idx], image: e.target.value };
                            setSettings({ ...settings, heroPatches: updated });
                          }}
                          placeholder="https://..."
                          className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 focus:border-orange-500 outline-none truncate"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Factory Contact Channels */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>3. Factory Contact &amp; Support Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      WhatsApp Clean Number (e.g. 18005557282)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      WhatsApp Display Format
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappDisplay}
                      onChange={(e) => setSettings({ ...settings, whatsappDisplay: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Support Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Hotline Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.supportPhone}
                      onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Standard Turnaround Display
                    </label>
                    <input
                      type="text"
                      value={settings.turnaroundTime}
                      onChange={(e) => setSettings({ ...settings, turnaroundTime: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Factory Business Working Hours
                    </label>
                    <input
                      type="text"
                      value={settings.workingHours}
                      onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Physical Factory / Studio Address
                    </label>
                    <input
                      type="text"
                      value={settings.companyAddress}
                      onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Social Media Links */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-500" />
                  <span>4. Social Profiles (Footer &amp; Channels)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={settings.socialFacebook}
                      onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={settings.socialInstagram}
                      onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={settings.socialYoutube}
                      onChange={(e) => setSettings({ ...settings, socialYoutube: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={settings.socialLinkedin}
                      onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Production Trust Stats */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span>5. Production Proof &amp; Trust Counters</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Patches Sewn</label>
                    <input
                      type="text"
                      value={settings.statPatchesSewn}
                      onChange={(e) => setSettings({ ...settings, statPatchesSewn: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">On-Time Delivery %</label>
                    <input
                      type="text"
                      value={settings.statOnTimeDelivery}
                      onChange={(e) => setSettings({ ...settings, statOnTimeDelivery: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Proof Scan Speed</label>
                    <input
                      type="text"
                      value={settings.statProofSpeed}
                      onChange={(e) => setSettings({ ...settings, statProofSpeed: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Countries Shipped</label>
                    <input
                      type="text"
                      value={settings.statCountriesShipped}
                      onChange={(e) => setSettings({ ...settings, statCountriesShipped: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Social Proof Floating Notifications & SEO */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  <span>6. Social Proof Toast &amp; SEO Metadata</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.socialProofEnabled}
                        onChange={(e) => setSettings({ ...settings, socialProofEnabled: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-500"
                      />
                      <span>Enable Live Purchase Social Proof Toasts</span>
                    </label>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Popup Interval (Seconds)
                      </label>
                      <input
                        type="number"
                        value={settings.socialProofIntervalSeconds}
                        onChange={(e) => setSettings({ ...settings, socialProofIntervalSeconds: parseInt(e.target.value) || 12 })}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Site SEO Title
                      </label>
                      <input
                        type="text"
                        value={settings.siteTitle}
                        onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Site Meta Description
                      </label>
                      <input
                        type="text"
                        value={settings.metaDescription}
                        onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                        className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Save Bar */}
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
          )}

          {/* TAB 10: B2B ACCOUNTS */}
          {activeTab === 'b2b' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Wholesale Contract &amp; Corporate B2B Accounts
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage volume accounts for tactical gear outfitters, apparel lines, and motorcycle club chapters.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddB2B(true)}
                  className="btn-orange px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer self-start shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add B2B Account</span>
                </button>
              </div>

              {/* Add B2B Form */}
              {showAddB2B && (
                <div className="bg-[#141722] border-2 border-orange-500/60 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white">Add Wholesale B2B Client</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Tactical Gear"
                        value={newB2B.name}
                        onChange={(e) => setNewB2B({ ...newB2B, name: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Contact Person</label>
                      <input
                        type="text"
                        placeholder="e.g. David Miller"
                        value={newB2B.contactPerson}
                        onChange={(e) => setNewB2B({ ...newB2B, contactPerson: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="buyer@company.com"
                        value={newB2B.email}
                        onChange={(e) => setNewB2B({ ...newB2B, email: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Phone</label>
                      <input
                        type="text"
                        placeholder="+1 (800) 555-0199"
                        value={newB2B.phone}
                        onChange={(e) => setNewB2B({ ...newB2B, phone: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Contract Tier</label>
                      <input
                        type="text"
                        placeholder="Platinum Tier (Wholesale)"
                        value={newB2B.tier}
                        onChange={(e) => setNewB2B({ ...newB2B, tier: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Wholesale Discount (%)</label>
                      <input
                        type="number"
                        value={newB2B.discountPct}
                        onChange={(e) => setNewB2B({ ...newB2B, discountPct: parseFloat(e.target.value) || 20 })}
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddB2B(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddB2B}
                      className="btn-orange px-6 py-2 rounded-lg text-xs font-bold"
                    >
                      Save B2B Account
                    </button>
                  </div>
                </div>
              )}

              {/* B2B Table */}
              <div className="bg-[#141722] border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-[11px]">
                        <th className="p-4 font-bold">Company</th>
                        <th className="p-4 font-bold">Contact</th>
                        <th className="p-4 font-bold">Contract Tier</th>
                        <th className="p-4 font-bold">Discount</th>
                        <th className="p-4 font-bold">Total Orders</th>
                        <th className="p-4 font-bold">Lifetime Spend</th>
                        <th className="p-4 font-bold text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {b2bAccounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-white">
                            {acc.name}
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200 font-medium">{acc.contactPerson}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{acc.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                              {acc.tier}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-emerald-400">
                            {acc.discountPct}% OFF
                          </td>
                          <td className="p-4 font-mono text-slate-300">
                            {acc.totalOrders} runs
                          </td>
                          <td className="p-4 font-mono font-bold text-white">
                            ${acc.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="p-4 text-right">
                            <a
                              href={`mailto:${acc.email}?subject=Wholesale%20Production%20Inquiry%20-%20BDigitizing`}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 font-bold text-[11px] transition-colors inline-block"
                            >
                              Email
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Comprehensive Detail Modal for Selected Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141722] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 text-white space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                    {selectedOrder.order_id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      selectedOrder.status === 'proof_review'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : selectedOrder.status === 'mass_production'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {selectedOrder.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1.5">{selectedOrder.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Customer & Order Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Customer Info</span>
                <div className="font-bold text-white text-sm">{selectedOrder.customer_name}</div>
                <div className="text-slate-400 font-mono">{selectedOrder.email}</div>
                <div className="text-orange-400 font-mono font-bold">{selectedOrder.phone}</div>
                <div className="text-slate-400 text-[11px] pt-1">
                  📍 {selectedOrder.shipping_address || 'Free Worldwide Tracked Delivery'}
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Manufacturing Specs</span>
                <div className="flex justify-between text-slate-300">
                  <span>Patch Style:</span>
                  <span className="font-bold text-white">{selectedOrder.patch_type}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Dimensions:</span>
                  <span className="font-bold text-white">{selectedOrder.dimensions}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Quantity:</span>
                  <span className="font-bold text-white">{selectedOrder.quantity} pieces</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    ${selectedOrder.total_amount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Production Stage Selector */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-300">Update Production Workflow Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'proof_review', label: '1. Proof Review' },
                  { id: 'mold_sampling', label: '2. Mold Sampling' },
                  { id: 'mass_production', label: '3. Production' },
                  { id: 'backing_qc', label: '4. Backing QC' },
                  { id: 'shipped', label: '5. Shipped' },
                ].map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => handleUpdateStatus(selectedOrder.order_id, st.id as any)}
                    className={`py-2 px-2.5 rounded-lg text-[11px] font-bold transition-all text-center cursor-pointer border ${
                      selectedOrder.status === st.id
                        ? 'bg-orange-500 text-white border-orange-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courier & Tracking Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Carrier Courier</label>
                <select
                  value={selectedOrder.courier || 'FedEx Express'}
                  onChange={(e) =>
                    handleUpdateTracking(
                      selectedOrder.order_id,
                      e.target.value,
                      selectedOrder.tracking_number || ''
                    )
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-white outline-none"
                >
                  <option value="FedEx Express">FedEx Express Tracked</option>
                  <option value="DHL Express">DHL Express Priority</option>
                  <option value="UPS Worldwide">UPS Worldwide Saver</option>
                  <option value="USPS Priority">USPS Priority Mail</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Tracking Waybill #</label>
                <input
                  type="text"
                  placeholder="e.g. 784920194821"
                  value={selectedOrder.tracking_number || ''}
                  onChange={(e) =>
                    handleUpdateTracking(
                      selectedOrder.order_id,
                      selectedOrder.courier || 'FedEx Express',
                      e.target.value
                    )
                  }
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 font-mono text-xs font-bold text-white outline-none"
                />
              </div>
            </div>

            {/* Attached Artwork Preview */}
            {selectedOrder.artwork_thumbnail && (
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Customer Attached Artwork</span>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden shrink-0">
                    <img
                      src={selectedOrder.artwork_thumbnail}
                      alt="Artwork Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <a
                      href={selectedOrder.artwork_thumbnail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download / Inspect High-Res Artwork Vector</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Customer uploaded design for Tajima embroidery digitizing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Notes */}
            {selectedOrder.notes && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 block">Customer Special Instructions</span>
                <p className="bg-slate-900/90 p-3.5 rounded-xl text-slate-300 font-mono text-[11px] border border-slate-800">
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            {/* Action Buttons: WhatsApp, Email, Print, Close */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppCustomer(selectedOrder)}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEmailCustomer(selectedOrder)}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Client</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Job Sheet</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="btn-orange px-6 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

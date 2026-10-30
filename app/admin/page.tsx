'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';

export interface PatchOrderItem {
  order_id: string;
  title: string;
  patch_type: 'Embroidered' | 'PVC Rubber' | 'Chenille' | 'Leatherette' | 'Woven' | 'Printed Sublimated';
  dimensions: string;
  quantity: number;
  backing: 'Velcro (Hook & Loop)' | 'Iron-On Heat Seal' | 'Sew-On Heavy Twill' | 'Peel & Stick Adhesive' | 'Magnetic Backing';
  border: 'Merrowed Overlock' | 'Laser Cut Smooth' | 'Hot Cut Heat Sealed';
  customer_name: string;
  company_or_unit?: string;
  email: string;
  phone: string;
  shipping_address: string;
  subtotal: number;
  total_amount: number;
  paid: boolean;
  status: 'proof_review' | 'mold_sampling' | 'mass_production' | 'backing_qc' | 'shipped';
  artwork_thumbnail: string;
  thread_pms_colors?: string[];
  created_at: string;
  notes?: string;
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

export interface PortfolioPatchItem {
  id: string;
  name: string;
  category: 'Embroidered' | 'PVC Rubber' | 'Chenille' | 'Leatherette' | 'Woven' | 'Specialty';
  icon: string;
  specs: string;
  backing: string;
  turnaround: string;
  active: boolean;
  minQty: number;
  basePrice: number;
}

export interface CustomerReviewItem {
  id: string;
  author: string;
  company: string;
  rating: number;
  verifiedOrder: string;
  comment: string;
  date: string;
  featured: boolean;
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

// 11 Physical Patch Portfolio Styles
const INITIAL_PORTFOLIO: PortfolioPatchItem[] = [
  { id: 'p1', name: 'Tactical PVC Rubber Morale Patch', category: 'PVC Rubber', icon: '🛡️', specs: '3D embossed liquid PVC, waterproof, recessed stitch canal', backing: 'Velcro Hook & Loop', turnaround: '7-9 Days', active: true, minQty: 25, basePrice: 2.45 },
  { id: 'p2', name: '100% High-Density Tajima Embroidered Badge', category: 'Embroidered', icon: '🧵', specs: 'Full twill thread coverage, Madeira poly threads, merrowed overlock', backing: 'Velcro / Iron-On', turnaround: '5-7 Days', active: true, minQty: 10, basePrice: 1.85 },
  { id: 'p3', name: 'Vintage Varsity Wool Letter Chenille', category: 'Chenille', icon: '🏆', specs: 'Heavy toweling loop stitch, double stiff felt border, varsity jacket spec', backing: 'Iron-On Heat Seal', turnaround: '6-8 Days', active: true, minQty: 25, basePrice: 2.85 },
  { id: 'p4', name: 'Rustic Laser-Cut Caramel Leatherette', category: 'Leatherette', icon: '🏷️', specs: 'CO2 laser engraved & debossed, vintage distress texture, custom die cut', backing: '3M Industrial Peel & Stick', turnaround: '4-6 Days', active: true, minQty: 25, basePrice: 2.25 },
  { id: 'p5', name: 'High-Definition Micro-Woven Tournament Crest', category: 'Woven', icon: '🎮', specs: 'Ultra-thin 50-denier damask threads for microscopic text & gradient curves', backing: 'Heat Seal Iron-On', turnaround: '6-8 Days', active: true, minQty: 50, basePrice: 1.65 },
  { id: 'p6', name: 'Sublimated Full-Color Photographic Patch', category: 'Specialty', icon: '🎨', specs: 'Sublimation dye print with satin embroidered edge for photorealistic art', backing: 'Sew-On / Iron-On', turnaround: '5-7 Days', active: true, minQty: 25, basePrice: 2.15 },
  { id: 'p7', name: 'Glow-in-the-Dark Phosphorescent PVC Patch', category: 'PVC Rubber', icon: '✨', specs: 'Photoluminescent pigment charged by daylight, tactical night-vision spec', backing: 'Velcro Hook & Loop', turnaround: '8-10 Days', active: true, minQty: 50, basePrice: 2.95 },
  { id: 'p8', name: 'Gold & Silver Metallic Bullion Wire Crest', category: 'Specialty', icon: '👑', specs: 'Hand-sewn bullion wire cord & velvet base for blazers & formal regalia', backing: 'Safety Pin / Sew-on', turnaround: '10-14 Days', active: true, minQty: 10, basePrice: 14.50 },
  { id: 'p9', name: '3M Scotchlite Reflective Safety Patch', category: 'Specialty', icon: '🦺', specs: 'High-visibility retroreflective glass bead base with laser hot-cut borders', backing: 'Velcro Hook & Loop', turnaround: '6-8 Days', active: true, minQty: 25, basePrice: 2.65 },
  { id: 'p10', name: 'Motorcycle Club Heavy Twill Rocker Arch', category: 'Embroidered', icon: '🦅', specs: '12-inch heavy back jacket rockers, lock-stitch lettering, abrasion proof', backing: 'Sew-On Heavy Twill', turnaround: '5-7 Days', active: true, minQty: 10, basePrice: 5.80 },
  { id: 'p11', name: 'MultiCam Tactical Camouflage Twill Patch', category: 'Embroidered', icon: '🌲', specs: 'Genuine licensed MultiCam OCP twill backing with subdued coyote stitching', backing: 'Velcro Hook & Loop', turnaround: '5-7 Days', active: true, minQty: 25, basePrice: 2.35 },
];

// Verified Customer Reviews
const INITIAL_REVIEWS: CustomerReviewItem[] = [
  { id: 'r1', author: 'Capt. David Miller', company: 'Task Force Apex Apparel', rating: 5, verifiedOrder: 'AP-43541 (250 pcs PVC)', comment: 'The 3D PVC morale patches are unmatched. Mold depth is crisp, Coyote brown PMS is 100% matched, and the velcro backing is military grade.', date: 'Yesterday', featured: true },
  { id: 'r2', author: 'Marcus Vance', company: 'Eastbrook High Athletics', rating: 5, verifiedOrder: 'AP-38910 (150 pcs Chenille)', comment: 'Varsity chenille letters arrived in 5 days. Thick wool felt and heavy loop stitching. The team loved them on their championship bomber jackets.', date: '3 days ago', featured: true },
  { id: 'r3', author: 'Elena Rostova', company: 'Timber & Bean Roastery', rating: 5, verifiedOrder: 'AP-19230 (100 pcs Leatherette)', comment: 'Laser-cut leatherette patches elevated our coffee brand beanies immediately. The 3M peel and stick holds tight through repeat washes.', date: '5 days ago', featured: true },
  { id: 'r4', author: 'Lt. Frank Reynolds', company: 'Metro Police Dept K9', rating: 5, verifiedOrder: 'AP-27480 (500 pcs Embroidered)', comment: '500 pcs embroidered shield patches with merrowed gold border. Flawless stitch density and zero thread fraying. Best factory in the US.', date: '1 week ago', featured: true },
  { id: 'r5', author: 'Jesse Thorne', company: 'Iron Horse MC', rating: 5, verifiedOrder: 'AP-15600 (50 sets Rockers)', comment: 'Toughest biker rockers we have ordered. Heavy twill and sew-on backing holds on at highway speeds. Will order every annual rally patch here.', date: '2 weeks ago', featured: false },
];

// B2B Wholesale Accounts
const INITIAL_ACCOUNTS: B2BAccountItem[] = [
  { id: 'b1', name: 'Task Force Apex Apparel', contactPerson: 'Capt. David Miller', email: 'd.miller@apexops.mil', phone: '+1 (512) 555-0199', tier: 'Tactical Govt (Net-30)', discountPct: 35, totalOrders: 14, lifetimeSpend: 8420 },
  { id: 'b2', name: 'Eastbrook High Athletics', contactPerson: 'Marcus Vance', email: 'athletics@eastbrook-edu.org', phone: '+1 (614) 555-8832', tier: 'Education Bulk', discountPct: 26, totalOrders: 8, lifetimeSpend: 3890 },
  { id: 'b3', name: 'Metro Police Department K9', contactPerson: 'Lt. Frank Reynolds', email: 'k9division@metro-police.gov', phone: '+1 (312) 555-4012', tier: 'Municipal First Responder', discountPct: 44, totalOrders: 22, lifetimeSpend: 18650 },
  { id: 'b4', name: 'Timber & Bean Roasters', contactPerson: 'Elena Rostova', email: 'elena@timberandbean.com', phone: '+1 (206) 555-9182', tier: 'Apparel Merch', discountPct: 15, totalOrders: 6, lifetimeSpend: 1940 },
  { id: 'b5', name: 'Iron Horse Brotherhood MC', contactPerson: 'Jesse Thorne', email: 'jesse.ironhorse@gmail.com', phone: '+1 (480) 555-6671', tier: 'Club Direct', discountPct: 26, totalOrders: 11, lifetimeSpend: 6820 },
  { id: 'b6', name: 'Vortex Gaming Arena', contactPerson: 'Tyler Ward', email: 'tournaments@vortexgg.com', phone: '+1 (702) 555-3344', tier: 'Esports Wholesale', discountPct: 26, totalOrders: 9, lifetimeSpend: 4210 },
];

// Initial Patch Orders
const SAMPLE_PATCH_ORDERS: PatchOrderItem[] = [
  {
    order_id: 'AP-43541',
    title: 'Tactical Skull & Night-Vision Morale Patch',
    patch_type: 'PVC Rubber',
    dimensions: '3.25" x 3.0" (Custom Die-Cut)',
    quantity: 250,
    backing: 'Velcro (Hook & Loop)',
    border: 'Laser Cut Smooth',
    customer_name: 'Capt. David Miller',
    company_or_unit: 'Task Force Apex Apparel',
    email: 'd.miller@apexops.mil',
    phone: '+1 (512) 555-0199',
    shipping_address: 'Austin Military Depot, Bldg 4, Austin, TX 78701',
    subtotal: 585.00,
    total_amount: 585.00,
    paid: true,
    status: 'mass_production',
    artwork_thumbnail: '🛡️',
    thread_pms_colors: ['Pantone 418C Coyote', 'Pantone Black 6C', 'Pantone 7531C Wolf Grey'],
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    notes: '2D embossed liquid PVC with recessed sewing channel for tactical uniforms.',
  },
  {
    order_id: 'AP-38910',
    title: 'State Championship Gold Varsity Letter "E"',
    patch_type: 'Chenille',
    dimensions: '4.50" x 4.0" (Standard Letter)',
    quantity: 150,
    backing: 'Iron-On Heat Seal',
    border: 'Merrowed Overlock',
    customer_name: 'Marcus Vance',
    company_or_unit: 'Eastbrook High Athletics',
    email: 'athletics@eastbrook-edu.org',
    phone: '+1 (614) 555-8832',
    shipping_address: 'Eastbrook Varsity Fieldhouse, Columbus, OH 43215',
    subtotal: 425.00,
    total_amount: 425.00,
    paid: true,
    status: 'mass_production',
    artwork_thumbnail: '🏆',
    thread_pms_colors: ['Varsity Gold Towel Loop', 'Navy Blue Double Felt Base'],
    created_at: new Date(Date.now() - 3600000 * 7).toISOString(),
    notes: 'Heavy loop stitch toweling on double stiff felt with thermo-adhesive backing.',
  },
  {
    order_id: 'AP-27480',
    title: 'Metropolitan Police K9 Division Shield Patch',
    patch_type: 'Embroidered',
    dimensions: '3.75" x 3.25" (Police Shield)',
    quantity: 500,
    backing: 'Velcro (Hook & Loop)',
    border: 'Merrowed Overlock',
    customer_name: 'Lt. Frank Reynolds',
    company_or_unit: 'Metro Police Department K9',
    email: 'k9division@metro-police.gov',
    phone: '+1 (312) 555-4012',
    shipping_address: 'Central Police HQ, Logistics Dock, Chicago, IL 60605',
    subtotal: 890.00,
    total_amount: 890.00,
    paid: true,
    status: 'proof_review',
    artwork_thumbnail: '🧵',
    thread_pms_colors: ['100% Tajima High Density', 'Gold Metallic Poly', 'Deep Navy Poly'],
    created_at: new Date(Date.now() - 3600000 * 11).toISOString(),
    notes: '100% full coverage high-durability Madeira polyester threads, military velcro backing.',
  },
  {
    order_id: 'AP-19230',
    title: 'Heritage Coffee Roasters Laser-Cut Artisan Patch',
    patch_type: 'Leatherette',
    dimensions: '2.75" x 2.0" (Hexagon Shape)',
    quantity: 100,
    backing: 'Peel & Stick Adhesive',
    border: 'Laser Cut Smooth',
    customer_name: 'Elena Rostova',
    company_or_unit: 'Timber & Bean Roastery',
    email: 'elena@timberandbean.com',
    phone: '+1 (206) 555-9182',
    shipping_address: '420 Pine St, Suite 300, Seattle, WA 98101',
    subtotal: 245.00,
    total_amount: 245.00,
    paid: false,
    status: 'mold_sampling',
    artwork_thumbnail: '🏷️',
    thread_pms_colors: ['Rustic Caramel Faux Leather', 'High-Contrast Carbon Engraving'],
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
    notes: 'Laser debossed logo on honey brown leatherette with heavy 3M industrial peel & stick.',
  },
  {
    order_id: 'AP-15600',
    title: 'Iron Horse MC Top Rocker & Center Biker Crest',
    patch_type: 'Embroidered',
    dimensions: '12.0" x 3.5" (Curved Top Rocker)',
    quantity: 50,
    backing: 'Sew-On Heavy Twill',
    border: 'Merrowed Overlock',
    customer_name: 'Jesse Thorne',
    company_or_unit: 'Iron Horse Brotherhood MC',
    email: 'jesse.ironhorse@gmail.com',
    phone: '+1 (480) 555-6671',
    shipping_address: '1840 S Desert Way, Phoenix, AZ 85001',
    subtotal: 620.00,
    total_amount: 620.00,
    paid: true,
    status: 'shipped',
    artwork_thumbnail: '🦅',
    thread_pms_colors: ['White Rayon Thread', 'Blood Red Outline', 'Heavy Black Duck Twill'],
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    notes: 'Shipped via FedEx Priority Tracking #78942109854. Heavy-duty leather jacket sew-on.',
  },
  {
    order_id: 'AP-11420',
    title: 'Apex Esports League Micro-Detail Tournament Crest',
    patch_type: 'Woven',
    dimensions: '2.50" x 2.50" (Square)',
    quantity: 300,
    backing: 'Iron-On Heat Seal',
    border: 'Hot Cut Heat Sealed',
    customer_name: 'Tyler Ward',
    company_or_unit: 'Vortex Gaming Arena',
    email: 'tournaments@vortexgg.com',
    phone: '+1 (702) 555-3344',
    shipping_address: '3500 S Las Vegas Blvd, Las Vegas, NV 89109',
    subtotal: 410.00,
    total_amount: 410.00,
    paid: true,
    status: 'backing_qc',
    artwork_thumbnail: '🎮',
    thread_pms_colors: ['Neon Cyan 50-Denier', 'Magenta UV', 'Ultra-tight High Definition Damask'],
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: 'Micro-woven threads capturing 0.5mm small typography impossible on standard embroidery.',
  },
];

export default function AdminPortalPage() {
  // Navigation Sidebar State - Every item has a real view!
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'orders' | 'inbox' | 'whatsapp' | 'accounts' | 'rates' | 'homepage' | 'gallery' | 'reviews' | 'pricing'
  >('dashboard');

  // Filter & Queue State
  const [pipelineStage, setPipelineStage] = useState<
    'all' | 'proof_review' | 'mold_sampling' | 'mass_production' | 'backing_qc' | 'shipped'
  >('all');
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'embroidered' | 'pvc' | 'chenille' | 'leatherette' | 'woven'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Live Settings State (Editable Homepage)
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Orders, Quotes, Portfolio, Reviews & Accounts Data
  const [orders, setOrders] = useState<PatchOrderItem[]>(SAMPLE_PATCH_ORDERS);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioPatchItem[]>(INITIAL_PORTFOLIO);
  const [reviews, setReviews] = useState<CustomerReviewItem[]>(INITIAL_REVIEWS);
  const [accounts, setAccounts] = useState<B2BAccountItem[]>(INITIAL_ACCOUNTS);

  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  // Modals
  const [selectedOrder, setSelectedOrder] = useState<PatchOrderItem | null>(null);
  const [showNewOfferModal, setShowNewOfferModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    clientName: '',
    phone: '',
    patchType: 'PVC Rubber',
    qty: 100,
    unitPrice: 2.15,
  });

  // Load Data from Supabase & Settings
  const fetchData = useCallback(async () => {
    setSyncStatus('syncing');
    try {
      const sRes = await fetch('/api/settings');
      if (sRes.ok) {
        const sData = await sRes.json();
        setSettings(sData);
      }

      const oRes = await fetch('/api/admin/orders');
      if (oRes.ok) {
        const oData = await oRes.json();
        if (oData.quotes && oData.quotes.length > 0) {
          setQuotes(oData.quotes);

          const dbOrders: PatchOrderItem[] = oData.quotes.map((q: QuoteItem) => {
            const pType = (q.patch_type || 'embroidered').toLowerCase();
            let mappedType: PatchOrderItem['patch_type'] = 'Embroidered';
            let mappedThumb = '🧵';
            if (pType.includes('pvc')) { mappedType = 'PVC Rubber'; mappedThumb = '🛡️'; }
            else if (pType.includes('chenille')) { mappedType = 'Chenille'; mappedThumb = '🏆'; }
            else if (pType.includes('leather')) { mappedType = 'Leatherette'; mappedThumb = '🏷️'; }
            else if (pType.includes('woven')) { mappedType = 'Woven'; mappedThumb = '🎮'; }

            const qty = Number(q.quantity) || 100;
            const unitRate = qty >= 500 ? 1.65 : qty >= 250 ? 1.85 : qty >= 100 ? 2.15 : 2.75;
            const computedTotal = Number((qty * unitRate).toFixed(2));

            return {
              order_id: q.ref_code || `AP-${q.id.slice(0, 5)}`,
              title: `Custom ${mappedType} Patch Order (${qty} pcs)`,
              patch_type: mappedType,
              dimensions: q.dimensions || '3.0" x 3.0" (Standard)',
              quantity: qty,
              backing: 'Velcro (Hook & Loop)',
              border: 'Merrowed Overlock',
              customer_name: q.full_name || 'Direct Wholesale Client',
              company_or_unit: 'Direct Inquiry via Storefront',
              email: q.email || 'pending@apexpatches.com',
              phone: q.phone || '+1 (800) 555-7282',
              shipping_address: q.notes ? q.notes.slice(0, 80) : 'Standard Courier Dispatch Dock',
              subtotal: computedTotal,
              total_amount: computedTotal,
              paid: false,
              status: 'proof_review',
              artwork_thumbnail: mappedThumb,
              thread_pms_colors: ['Pantone Match Customer Logo', 'High-Density Base'],
              created_at: q.created_at || new Date().toISOString(),
              notes: q.notes || 'Inquiry uploaded via online custom patch builder.',
            };
          });

          const existingIds = new Set(dbOrders.map((d) => d.order_id));
          const combined = [
            ...dbOrders,
            ...SAMPLE_PATCH_ORDERS.filter((s) => !existingIds.has(s.order_id)),
          ];
          setOrders(combined);
        }
      }
    } catch (e) {
      console.log('Error loading admin patch factory data:', e);
    } finally {
      setSyncStatus('synced');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Save Settings Function (Updates Live Homepage in Real-Time)
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');

      localStorage.setItem('apex_live_settings', JSON.stringify(settings));

      setSettingsSavedToast(true);
      setTimeout(() => setSettingsSavedToast(false), 4000);
    } catch (err) {
      alert('Failed to save settings: ' + err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Patch Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: PatchOrderItem['status']) => {
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
        body: JSON.stringify({ type: 'order', id: orderId, status: newStatus }),
      });
    } catch (err) {
      console.log('Note: Local patch queue status updated:', err);
    }
  };

  // Toggle Portfolio Item
  const togglePortfolioActive = (id: string) => {
    setPortfolio((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  // Toggle Review Featured
  const toggleReviewFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r))
    );
  };

  // Physical Patch Factory Stats Calculations
  const stats = useMemo(() => {
    const totalVolume = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const totalPhysicalPieces = orders.reduce((sum, o) => sum + (Number(o.quantity) || 0), 0);
    
    const proofReviewCount = orders.filter((o) => o.status === 'proof_review').length;
    const moldSamplingCount = orders.filter((o) => o.status === 'mold_sampling').length;
    const massProdCount = orders.filter((o) => o.status === 'mass_production').length;
    const backingQcCount = orders.filter((o) => o.status === 'backing_qc').length;
    const shippedCount = orders.filter((o) => o.status === 'shipped').length;

    const activePipeline = proofReviewCount + moldSamplingCount + massProdCount + backingQcCount;
    const uniqueClients = new Set(orders.map((o) => o.email)).size || accounts.length;

    return {
      totalVolume: (totalVolume + 45100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalPhysicalPieces: totalPhysicalPieces + 68200,
      activePipeline,
      proofReviewCount,
      moldSamplingCount,
      massProdCount,
      backingQcCount,
      shippedCount,
      uniqueClients,
      avgOrderValue: ((totalVolume + 45100) / (orders.length + 180)).toFixed(2),
    };
  }, [orders, accounts]);

  // Filtered Production Queue by Stage & Patch Type
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStage = pipelineStage === 'all' || o.status === pipelineStage;

      const patchTypeStr = (o.patch_type || '').toLowerCase();
      const matchCategory =
        categoryFilter === 'all' ||
        (categoryFilter === 'embroidered' && patchTypeStr.includes('embroider')) ||
        (categoryFilter === 'pvc' && patchTypeStr.includes('pvc')) ||
        (categoryFilter === 'chenille' && patchTypeStr.includes('chenille')) ||
        (categoryFilter === 'leatherette' && patchTypeStr.includes('leather')) ||
        (categoryFilter === 'woven' && patchTypeStr.includes('woven'));

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        o.order_id.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        (o.company_or_unit && o.company_or_unit.toLowerCase().includes(q)) ||
        (o.title && o.title.toLowerCase().includes(q)) ||
        (o.backing && o.backing.toLowerCase().includes(q));

      return matchStage && matchCategory && matchSearch;
    });
  }, [orders, pipelineStage, categoryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {settingsSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500 bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-2xl animate-bounce">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>✓ Changes saved and updated live on the website!</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* LEFT NAVIGATION SIDEBAR (Every item has an active view!) */}
      {/* ===================================================================== */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-30 select-none shadow-xs">
        
        <div>
          {/* Patch Factory Logo & Branding */}
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
              🛡️
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                APEX PATCHES
              </div>
              <div className="text-[9px] text-blue-600 font-black uppercase tracking-wider mt-1 font-mono">
                PHYSICAL FACTORY DESK
              </div>
            </div>
          </div>

          {/* Factory Command Status Badge */}
          <div className="p-4 pb-2">
            <div className="rounded-xl bg-[#0d1322] text-white p-3 flex items-center gap-2.5 shadow-sm">
              <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center text-xs">
                🏭
              </div>
              <div>
                <div className="text-xs font-extrabold tracking-wide">Production Floor</div>
                <div className="text-[9px] text-slate-400 font-mono">Looms & Mold Machines Active</div>
              </div>
            </div>
          </div>

          {/* Navigation Links Grouped for Patch Manufacturing */}
          <nav className="p-3 space-y-6 text-xs">
            
            {/* Group 1: FACTORY OPERATIONS */}
            <div>
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Factory Operations
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'dashboard'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>📊</span>
                    <span>Executive Dashboard</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'orders'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>🧵</span>
                    <span>Patch Production Queue</span>
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('inbox')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'inbox'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>🎨</span>
                    <span>Customer Proofs & Artwork</span>
                  </span>
                  {quotes.length > 0 && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                      {quotes.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveMenu('whatsapp')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'whatsapp'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>💬</span>
                    <span>24/7 Client WhatsApp Desk</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded font-mono">
                    Online
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('accounts')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'accounts'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>🏢</span>
                    <span>B2B Wholesale Accounts</span>
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {accounts.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Group 2: CATALOG & BULK PRICING */}
            <div>
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Catalog & Bulk Pricing
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveMenu('rates')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'rates'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>💲</span>
                    <span>Bulk Tier Discounts</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">52% Max</span>
                </button>
              </div>
            </div>

            {/* Group 3: WEBSITE CONTENT CMS */}
            <div>
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Website Content CMS
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveMenu('homepage')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'homepage'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>✏️</span>
                    <span>Live Homepage Editor</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                    Live
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('gallery')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'gallery'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>🖼️</span>
                    <span>Physical Patch Portfolio</span>
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {portfolio.length} Styles
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('reviews')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'reviews'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>⭐</span>
                    <span>Verified Reviews (5.0★)</span>
                  </span>
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {reviews.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Group 4: FACTORY SETTINGS */}
            <div>
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Factory Settings
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveMenu('pricing')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'pricing'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>🏷️</span>
                    <span>Base Rates & Backing Fees</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('whatsapp')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors ${
                    activeMenu === 'whatsapp'
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>📱</span>
                    <span>Dispatch WhatsApp API</span>
                  </span>
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Bottom User & Website Info */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all shadow-xs"
          >
            <span className="flex items-center gap-2">
              <span>↗</span>
              <span>Visit Customer Storefront</span>
            </span>
          </Link>

          <div className="flex items-center justify-between px-2 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Machines Online</span>
            </span>
            <span className="text-slate-400">Tajima & PVC v2.4</span>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* MAIN RIGHT WORKSPACE AREA */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400">APEX PRODUCTION ENGINE</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-slate-700">Custom Physical Patches Executive Desk</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              title="Reload all Supabase orders & quotes"
            >
              <span>{syncStatus === 'syncing' ? '⏳' : '🔄'}</span>
              <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Supabase'}</span>
            </button>

            <button
              onClick={() => setActiveMenu('homepage')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 shadow-xs transition-all"
            >
              <span>✏️ Edit Live Homepage</span>
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* VIEW 1: EXECUTIVE COMMAND CENTER */}
        {/* =================================================================== */}
        {activeMenu === 'dashboard' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LOOMS & MOLDS OPERATING
                  </span>
                  <span className="rounded-full bg-slate-900 text-white px-2 py-0.5 text-[10px] font-bold font-mono">
                    FACTORY ADMIN
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Custom Patches Production Command Center
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct oversight of embroidery looms, PVC molds, laser cutting, backing stations, and bulk shipments.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowNewOfferModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-extrabold shadow-sm transition-all"
                >
                  + New Customer Patch Offer
                </button>
                <button
                  onClick={() => setActiveMenu('rates')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-extrabold transition-all"
                >
                  Pricing Matrix
                </button>
                <button
                  onClick={fetchData}
                  className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all"
                >
                  Sync DB
                </button>
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold font-mono text-slate-400 tracking-wider uppercase">
                    TOTAL PATCH VOLUME
                  </span>
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    $
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    ${stats.totalVolume}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                    <span className="text-emerald-600 font-bold">+18.4% this mo</span>
                    <span>•</span>
                    <span>Avg ${stats.avgOrderValue}/batch</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold font-mono text-slate-400 tracking-wider uppercase">
                    ACTIVE PRODUCTION PIPELINE
                  </span>
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {stats.activePipeline} Batches Active
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                    <span className="text-blue-600 font-bold">{stats.massProdCount} Looms Running</span>
                    <span>•</span>
                    <span>{stats.proofReviewCount} Proof Reviews</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold font-mono text-slate-400 tracking-wider uppercase">
                    DELIVERED PHYSICAL PATCHES
                  </span>
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {stats.totalPhysicalPieces.toLocaleString()} Patches
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1 font-mono">
                    <span>99.8% QC Passed</span>
                    <span>•</span>
                    <span>Zero Return Defect</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold font-mono text-slate-400 tracking-wider uppercase">
                    WHOLESALE CLIENTS
                  </span>
                  <div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                    👥
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {accounts.length} B2B Accounts
                  </div>
                  <div className="text-[11px] font-semibold text-purple-600 mt-1 flex items-center gap-1 font-mono">
                    <span>Military, Apparel & Clubs</span>
                    <span>•</span>
                    <span>Net-30 Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Stage Funnel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] font-mono font-extrabold text-blue-600 uppercase tracking-wider">
                    PHYSICAL PATCH WORKFLOW
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    Live Patch Manufacturing Stages
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Click any stage to filter the production queue below
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <button
                  onClick={() => setPipelineStage(pipelineStage === 'proof_review' ? 'all' : 'proof_review')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pipelineStage === 'proof_review'
                      ? 'border-blue-500 bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">1. Proof & Artwork</span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-mono font-extrabold px-2 py-0.5 rounded-md">
                      {stats.proofReviewCount}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Free 6-hr digital proof sent</div>
                </button>

                <button
                  onClick={() => setPipelineStage(pipelineStage === 'mold_sampling' ? 'all' : 'mold_sampling')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pipelineStage === 'mold_sampling'
                      ? 'border-indigo-500 bg-indigo-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">2. Mold & Sample</span>
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-mono font-extrabold px-2 py-0.5 rounded-md">
                      {stats.moldSamplingCount}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Steel mold cutting & test sew</div>
                </button>

                <button
                  onClick={() => setPipelineStage(pipelineStage === 'mass_production' ? 'all' : 'mass_production')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pipelineStage === 'mass_production'
                      ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">3. Looms & Mass Run</span>
                    <span className="bg-amber-100 text-amber-700 text-xs font-mono font-extrabold px-2 py-0.5 rounded-md">
                      {stats.massProdCount}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Multi-head embroidery & PVC</div>
                </button>

                <button
                  onClick={() => setPipelineStage(pipelineStage === 'backing_qc' ? 'all' : 'backing_qc')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pipelineStage === 'backing_qc'
                      ? 'border-purple-500 bg-purple-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">4. Backing & Edge</span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-mono font-extrabold px-2 py-0.5 rounded-md">
                      {stats.backingQcCount}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Velcro stitch & merrowed border</div>
                </button>

                <button
                  onClick={() => setPipelineStage(pipelineStage === 'shipped' ? 'all' : 'shipped')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pipelineStage === 'shipped'
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">5. Courier Shipped</span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-mono font-extrabold px-2 py-0.5 rounded-md">
                      {stats.shippedCount}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Dispatched via FedEx/DHL</div>
                </button>
              </div>
            </div>

            {/* Split Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Live Queue */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Search orders, clients, patch types, PO#..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-blue-500 bg-slate-50 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                        categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All ({orders.length})
                    </button>
                    <button
                      onClick={() => setCategoryFilter('embroidered')}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                        categoryFilter === 'embroidered' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🧵 Embroidered
                    </button>
                    <button
                      onClick={() => setCategoryFilter('pvc')}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                        categoryFilter === 'pvc' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🛡️ PVC Rubber
                    </button>
                    <button
                      onClick={() => setCategoryFilter('chenille')}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                        categoryFilter === 'chenille' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🏆 Chenille
                    </button>
                    <button
                      onClick={() => setCategoryFilter('leatherette')}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                        categoryFilter === 'leatherette' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🏷️ Leatherette
                    </button>
                  </div>
                </div>

                {/* Queue Cards */}
                <div className="space-y-3">
                  {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs">
                      No patch production jobs matching current filter.
                    </div>
                  ) : (
                    filteredOrders.map((o) => (
                      <div
                        key={o.order_id}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-xl shadow-2xs">
                            {o.artwork_thumbnail}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-slate-900">
                                #{o.order_id}
                              </span>
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono">
                                {o.patch_type}
                              </span>
                              <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                                {o.quantity} PCS
                              </span>
                            </div>

                            <div className="text-xs font-bold text-slate-900 truncate max-w-md mt-1">
                              {o.title}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 font-mono mt-1">
                              <span>📏 {o.dimensions}</span>
                              <span>•</span>
                              <span>🧲 {o.backing}</span>
                              <span>•</span>
                              <span>🪡 {o.border}</span>
                            </div>

                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                              <span className="text-slate-700 font-semibold">{o.customer_name}</span>
                              {o.company_or_unit && (
                                <>
                                  <span>({o.company_or_unit})</span>
                                  <span>•</span>
                                </>
                              )}
                              <span className="truncate">{o.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <div className="text-right">
                            <div className="font-mono text-sm font-black text-slate-900">
                              ${Number(o.total_amount).toFixed(2)}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              ${(o.total_amount / o.quantity).toFixed(2)}/patch
                            </div>
                            <div>
                              {o.paid ? (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-100 text-emerald-700 rounded font-mono">
                                  PAID
                                </span>
                              ) : (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-amber-100 text-amber-700 rounded font-mono">
                                  UNPAID
                                </span>
                              )}
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize font-mono ${
                              o.status === 'mass_production'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : o.status === 'mold_sampling'
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : o.status === 'backing_qc'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : o.status === 'shipped'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {o.status.replace('_', ' ')}
                          </span>

                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="px-3 py-1.5 bg-[#0d1322] hover:bg-blue-700 text-white rounded-lg text-xs font-extrabold transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <span>Manage</span>
                            <span>+</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Widgets */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Priority Alerts */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    <span>⚡</span>
                    <span>Priority Factory Alerts</span>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-slate-800">PVC Steel Mold Sign-Off</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Order #AP-43541: Client approved 2D profile. CNC cutter ready.
                        </div>
                      </div>
                      <span className="bg-amber-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-slate-800">Velcro Backing Station Queue</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          750 pcs awaiting hook & loop machine stitching.
                        </div>
                      </div>
                      <span className="bg-blue-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                        Queue
                      </span>
                    </div>

                    <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-3 flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-slate-800">Merrowing Edge Overlock</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Metro Police K9 shield patches awaiting gold edge.
                        </div>
                      </div>
                      <span className="bg-purple-600 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                        In QA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Production Share */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    <span>Patch Volume Breakdown</span>
                    <span className="text-[10px] text-slate-400 font-normal">LOOM USAGE</span>
                  </div>

                  <div className="space-y-3 pt-1 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>🧵 Custom Embroidered</span>
                        <span className="font-mono text-slate-500">28,400 pcs (54%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-[54%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">$27,850.00 volume</div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>🛡️ PVC Rubber Morale</span>
                        <span className="font-mono text-slate-500">14,200 pcs (26%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full w-[26%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">$13,420.00 volume</div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>🏆 Chenille Varsity</span>
                        <span className="font-mono text-slate-500">6,500 pcs (12%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[12%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">$5,680.00 volume</div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>🏷️ Leatherette & Woven</span>
                        <span className="font-mono text-slate-500">4,300 pcs (8%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full w-[8%]" />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">$3,940.00 volume</div>
                    </div>
                  </div>
                </div>

                {/* Operations Shortcuts */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Production Shortcuts
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setActiveMenu('rates')}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-left transition-colors flex items-center gap-1.5"
                    >
                      <span>💲</span>
                      <span>Bulk Discounts</span>
                    </button>

                    <button
                      onClick={() => setActiveMenu('homepage')}
                      className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100 font-bold text-blue-700 text-left transition-colors flex items-center gap-1.5"
                    >
                      <span>✏️</span>
                      <span>Edit Website</span>
                    </button>

                    <button
                      onClick={() => setActiveMenu('inbox')}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-left transition-colors flex items-center gap-1.5"
                    >
                      <span>💬</span>
                      <span>Customer Proofs</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-left transition-colors flex items-center gap-1.5"
                    >
                      <span>🖨️</span>
                      <span>Print Day Batch</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 2: LIVE HOMEPAGE EDITOR */}
        {/* =================================================================== */}
        {activeMenu === 'homepage' && (
          <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wider">
                  WEBSITE CONTENT MANAGER
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Live Homepage & Storefront Editor
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Any changes saved here will instantly update the public homepage without any redeployment.
                </p>
              </div>

              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              >
                View Live Storefront ↗
              </Link>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                    1. Top Announcement Header Bar
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={settings.announcementEnabled}
                      onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                      className="accent-blue-600 h-4 w-4 rounded"
                    />
                    <span>Show on Website</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Banner Announcement Text</label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                  2. Hero Section Messaging
                </h3>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Top Badge Pill</label>
                  <input
                    type="text"
                    value={settings.heroBadge}
                    onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Main Headline (H1)</label>
                  <input
                    type="text"
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-bold text-slate-900 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Sub-headline Description</label>
                  <textarea
                    rows={3}
                    value={settings.heroSubheadline}
                    onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Main CTA Button Label</label>
                  <input
                    type="text"
                    value={settings.heroCtaText}
                    onChange={(e) => setSettings({ ...settings, heroCtaText: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                  3. Contact & WhatsApp Numbers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-mono mb-1">
                      WhatsApp Number (Digits Only)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })
                      }
                      placeholder="e.g. 923001234567"
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono text-slate-800 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-mono mb-1">Support Phone</label>
                    <input
                      type="text"
                      value={settings.supportPhone}
                      onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-mono mb-1">Support Email</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.005] disabled:opacity-50"
              >
                {isLoading ? 'Publishing Live...' : '✓ Save & Publish Changes to Live Website'}
              </button>
            </form>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 3: FULL ORDERS & FACTORY QUEUE */}
        {/* =================================================================== */}
        {activeMenu === 'orders' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Physical Patch Orders Queue</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage live loom runs, PVC molds, backing stations, and courier dispatches.</p>
              </div>
              <button
                onClick={fetchData}
                className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-slate-800"
              >
                Refresh Queue
              </button>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.order_id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg shrink-0">
                      {o.artwork_thumbnail}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-900">#{o.order_id}</span>
                        <span className="text-xs text-blue-600 font-bold font-mono">[{o.patch_type} - {o.quantity} PCS]</span>
                        <span className="text-xs text-slate-400 font-mono">• {new Date(o.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{o.title}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        {o.customer_name} • {o.email} • {o.phone}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Backing: {o.backing} | Border: {o.border} | Size: {o.dimensions}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-mono text-base font-black text-slate-900">
                        ${Number(o.total_amount).toFixed(2)}
                      </div>
                      <span className="text-[9px] font-bold uppercase font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                        {o.status.replace('_', ' ')}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-4 py-2 bg-[#0d1322] hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs"
                    >
                      Manage Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 4: CUSTOMER PROOFS & ARTWORK INBOX */}
        {/* =================================================================== */}
        {activeMenu === 'inbox' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Proofs & Artwork Submissions</h1>
                <p className="text-xs text-slate-500 mt-0.5">Inquiries submitted from the online patch builder with vector/raster artwork.</p>
              </div>
            </div>

            {quotes.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs">
                No customer inquiries in inbox yet.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Ref Code</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Style & Quantity</th>
                      <th className="p-4">Artwork File</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-blue-600">#{q.ref_code}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{q.full_name}</div>
                          <div className="text-slate-400 font-mono">{q.phone}</div>
                        </td>
                        <td className="p-4 font-mono font-medium text-slate-700">
                          {q.quantity} pcs {q.patch_type}
                        </td>
                        <td className="p-4">
                          {q.artwork_url ? (
                            <a href={q.artwork_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline font-mono">
                              View Artwork ↗
                            </a>
                          ) : (
                            <span className="text-slate-400 font-mono">None uploaded</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                            {q.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam-o-Alaikum ${q.full_name}! Regarding inquiry #${q.ref_code} for ${q.quantity} pcs ${q.patch_type} patches, your free digital proof is ready!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>WhatsApp Proof</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 5: 24/7 CLIENT WHATSAPP DESK & DISPATCH API */}
        {/* =================================================================== */}
        {activeMenu === 'whatsapp' && (
          <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-wider">
                  INSTANT MESSAGING & PROOFS
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  24/7 Client WhatsApp Dispatch Hub
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send 1-click proof approvals, loom production status, and tracking numbers to customers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 font-mono">API Active: +{settings.whatsappNumber}</span>
              </div>
            </div>

            {/* Quick WhatsApp Test Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                <span>💬</span>
                <span>Send Direct WhatsApp Message to Any Client</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Customer Phone Number (with Country Code)</label>
                  <input
                    type="text"
                    id="wa-test-phone"
                    defaultValue="923001234567"
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-xs font-mono text-slate-800 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Message Template</label>
                  <select
                    id="wa-test-type"
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-xs font-mono text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="proof">🎨 Digital Proof Ready for Review</option>
                    <option value="production">🧵 Looms & Mold Run Started</option>
                    <option value="qc">🔍 Quality Check Passed & Backing Stitched</option>
                    <option value="shipped">📦 Courier Dispatched with Tracking</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const phoneInput = (document.getElementById('wa-test-phone') as HTMLInputElement)?.value || settings.whatsappNumber;
                  const type = (document.getElementById('wa-test-type') as HTMLSelectElement)?.value || 'proof';
                  let msg = `Assalam-o-Alaikum! Your Apex Patches custom digital proof is ready for approval.`;
                  if (type === 'production') msg = `Good news! Your custom patch order has entered Tajima loom stitching & PVC mold curing.`;
                  if (type === 'qc') msg = `Your patches have passed 100% factory inspection. Backing & borders are completed!`;
                  if (type === 'shipped') msg = `Your patches are packed and dispatched via courier. Tracking will arrive shortly.`;

                  window.open(`https://wa.me/${phoneInput.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Launch WhatsApp Web Chat ↗</span>
              </button>
            </div>

            {/* Ready Pre-configured Message Templates */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                Factory Standard Message Templates
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-800">1. Digital Proof Approval:</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    &ldquo;Assalam-o-Alaikum [Name]! Your custom patch proof for #[ID] is ready. Dimensions: [Size], Qty: [Qty] pcs. Please reply &lsquo;Approved&rsquo; to begin loom run.&rdquo;
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-800">2. Loom & Mold Running:</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    &ldquo;Your order #[ID] is currently running on our multi-head Tajima embroidery machines / PVC vulcanization line.&rdquo;
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-800">3. Shipped with Tracking:</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    &ldquo;Assalam-o-Alaikum [Name]! Your package has been dispatched. Courier: FedEx Priority. Tracking: #[Track].&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 6: B2B WHOLESALE ACCOUNTS */}
        {/* =================================================================== */}
        {activeMenu === 'accounts' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wider">
                  CLIENT DIRECTORY & ACCOUNTS
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  B2B Wholesale Accounts & Volume Buyers
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage corporate apparel brands, tactical units, and clubs with custom bulk discount tiers.
                </p>
              </div>

              <button
                onClick={() => setShowNewOfferModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-extrabold shadow-sm"
              >
                + Add Wholesale Client
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total B2B Accounts</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{accounts.length} Organizations</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Wholesale Volume</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">$43,930 Lifetime</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Wholesale Payment Terms</div>
                <div className="text-2xl font-black text-blue-600 mt-1">Net-30 Approved</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Organization / Unit</th>
                    <th className="p-4">Contact Person</th>
                    <th className="p-4">Wholesale Tier</th>
                    <th className="p-4">Discount</th>
                    <th className="p-4">Total Orders</th>
                    <th className="p-4">Lifetime Spend</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {accounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-slate-50">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{acc.name}</div>
                        <div className="text-slate-400 font-mono text-[11px]">{acc.email}</div>
                      </td>
                      <td className="p-4 font-mono text-slate-700">
                        <div>{acc.contactPerson}</div>
                        <div className="text-slate-400 text-[11px]">{acc.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                          {acc.tier}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-600">
                        {acc.discountPct}% Off
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-700">
                        {acc.totalOrders} Batches
                      </td>
                      <td className="p-4 font-mono font-black text-slate-900">
                        ${acc.lifetimeSpend.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`https://wa.me/${acc.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam-o-Alaikum ${acc.contactPerson}! Contacting you from Apex Patches Factory regarding your wholesale account.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold inline-flex items-center gap-1 shadow-xs"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 7: PHYSICAL PATCH PORTFOLIO (11 Styles) */}
        {/* =================================================================== */}
        {activeMenu === 'gallery' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wider">
                  STUDIO SHOWCASE
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Physical Patch Portfolio (11 Factory Styles)
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage the showcase patch types displayed on the public website and custom patch builder.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Active on Site: <span className="font-bold text-emerald-600">{portfolio.filter(p => p.active).length} / {portfolio.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 mt-2">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.specs}</p>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] font-mono text-slate-600">
                      <div><strong>Backing:</strong> {item.backing}</div>
                      <div><strong>Turnaround:</strong> {item.turnaround}</div>
                      <div><strong>Min Qty:</strong> {item.minQty} pcs • Base: ${item.basePrice.toFixed(2)}/ea</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
                      item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {item.active ? '● Live on Storefront' : '○ Hidden'}
                    </span>

                    <button
                      onClick={() => togglePortfolioActive(item.id)}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                    >
                      {item.active ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 8: VERIFIED REVIEWS (5.0★) */}
        {/* =================================================================== */}
        {activeMenu === 'reviews' && (
          <main className="p-6 sm:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-amber-600 uppercase tracking-wider">
                  SOCIAL PROOF & RATINGS
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Verified Customer Reviews (5.0★ Rating)
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real verified feedback from military, police, schools, and motorcycle club clients.
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-sm font-black">
                <span>★★★★★</span>
                <span className="text-slate-700 text-xs font-mono ml-1">5.0 / 5.0 (428 reviews)</span>
              </div>
            </div>

            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 text-xs">★★★★★</span>
                      <span className="font-bold text-xs text-slate-900">{r.author}</span>
                      <span className="text-xs text-slate-400">• {r.company}</span>
                      <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold font-mono px-1.5 py-0.2 rounded">
                        Verified Order
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 italic mt-1">&ldquo;{r.comment}&rdquo;</p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Order: {r.verifiedOrder} • {r.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleReviewFeatured(r.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                        r.featured
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {r.featured ? '★ Featured on Home' : 'Feature'}
                    </button>

                    <button
                      onClick={() => alert(`Review verified from ${r.author}`)}
                      className="px-3 py-1.5 bg-[#0d1322] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                      Verified
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 9: BASE RATES & BACKING FEES */}
        {/* =================================================================== */}
        {activeMenu === 'pricing' && (
          <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-wider">
                  PRODUCTION SURCHARGES
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Base Rates & Backing Add-on Fees
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set prices for individual patch options and backings. Directly recalculates in the online order form.
                </p>
              </div>

              <button
                onClick={() => handleSaveSettings()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Save Pricing
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                Active Unit Pricing ($)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Standard Patch Base Rate ($/ea)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.basePrice}
                    onChange={(e) => setSettings({ ...settings, basePrice: parseFloat(e.target.value) || 1.85 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Starting rate for 10-24 pcs tier</span>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Velcro (Hook & Loop) Backing ($/ea)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.velcroFee}
                    onChange={(e) => setSettings({ ...settings, velcroFee: parseFloat(e.target.value) || 0.5 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Iron-On Heat Seal Backing ($/ea)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.ironOnFee}
                    onChange={(e) => setSettings({ ...settings, ironOnFee: parseFloat(e.target.value) || 0.25 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">3M Peel & Stick Adhesive ($/ea)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.peelStickFee}
                    onChange={(e) => setSettings({ ...settings, peelStickFee: parseFloat(e.target.value) || 0.35 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Magnetic Pinless Backing ($/ea)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.magneticFee}
                    onChange={(e) => setSettings({ ...settings, magneticFee: parseFloat(e.target.value) || 0.95 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-mono mb-1">Merrowed Overlock Border</label>
                  <input
                    type="text"
                    disabled
                    value="FREE (Included Standard)"
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold bg-slate-50 text-emerald-700"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  Save & Apply Pricing Live to Website
                </button>
              </div>
            </div>
          </main>
        )}

        {/* =================================================================== */}
        {/* VIEW 10: BULK TIER DISCOUNTS */}
        {/* =================================================================== */}
        {activeMenu === 'rates' && (
          <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Wholesale Custom Patch Bulk Pricing</h1>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-xs shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-sm">Active Unit Base Rate:</span>
                <span className="font-mono text-lg font-black text-blue-600">${settings.basePrice.toFixed(2)}/patch</span>
              </div>

              <div className="text-slate-600 leading-relaxed">
                Wholesale bulk discount tiers automatically apply on the customer order form based on patch quantity:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">10 – 24 Patches</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Base Price: ${settings.basePrice.toFixed(2)}/ea (Retail Tier)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">25 – 49 Patches</div>
                  <div className="text-emerald-600 text-[11px] font-bold mt-0.5">8% Bulk Discount (${(settings.basePrice * 0.92).toFixed(2)}/ea)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">50 – 99 Patches</div>
                  <div className="text-emerald-600 text-[11px] font-bold mt-0.5">15% Bulk Discount (${(settings.basePrice * 0.85).toFixed(2)}/ea)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">100 – 249 Patches</div>
                  <div className="text-emerald-600 text-[11px] font-bold mt-0.5">26% Bulk Discount (${(settings.basePrice * 0.74).toFixed(2)}/ea)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">250 – 499 Patches</div>
                  <div className="text-emerald-600 text-[11px] font-bold mt-0.5">35% Bulk Discount (${(settings.basePrice * 0.65).toFixed(2)}/ea)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono">
                  <div className="font-bold text-slate-900">500 – 999 Patches</div>
                  <div className="text-emerald-600 text-[11px] font-bold mt-0.5">44% Bulk Discount (${(settings.basePrice * 0.56).toFixed(2)}/ea)</div>
                </div>

                <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 font-mono sm:col-span-2">
                  <div className="font-bold text-blue-900">1,000+ Patches (Factory Direct Tier)</div>
                  <div className="text-blue-700 text-[11px] font-bold mt-0.5">52% Maximum Discount (${(settings.basePrice * 0.48).toFixed(2)}/ea) + Free Mould / Free Setup</div>
                </div>
              </div>
            </div>
          </main>
        )}

      </div>

      {/* ===================================================================== */}
      {/* MANAGE PATCH WORK ORDER MODAL / PRINTABLE JOB TICKET */}
      {/* ===================================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider">
                  FACTORY PRODUCTION JOB TICKET
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Order #{selectedOrder.order_id} • {selectedOrder.quantity} Pcs
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 border border-slate-100 font-mono">
                <div><strong>Client:</strong> {selectedOrder.customer_name} {selectedOrder.company_or_unit && `(${selectedOrder.company_or_unit})`}</div>
                <div><strong>Email:</strong> {selectedOrder.email}</div>
                <div><strong>Phone / WhatsApp:</strong> {selectedOrder.phone}</div>
                <div><strong>Shipping Dock:</strong> {selectedOrder.shipping_address}</div>
                <div className="pt-1 border-t border-slate-200 text-slate-900 font-bold">
                  Total Order Amount: ${Number(selectedOrder.total_amount).toFixed(2)} ({selectedOrder.paid ? 'PAID' : 'PENDING PAYMENT'})
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-xl p-4 space-y-1.5 border border-blue-100 font-mono">
                <div className="font-bold text-blue-900 uppercase text-[10px]">Machine Floor Specifications:</div>
                <div><strong>Patch Style:</strong> {selectedOrder.patch_type}</div>
                <div><strong>Dimensions:</strong> {selectedOrder.dimensions}</div>
                <div><strong>Backing Attached:</strong> {selectedOrder.backing}</div>
                <div><strong>Border Finish:</strong> {selectedOrder.border}</div>
                {selectedOrder.thread_pms_colors && (
                  <div><strong>Colors / Thread PMS:</strong> {selectedOrder.thread_pms_colors.join(', ')}</div>
                )}
                {selectedOrder.notes && (
                  <div className="text-slate-600 pt-1 text-[11px]"><strong>Notes:</strong> {selectedOrder.notes}</div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">
                  Move Manufacturing Stage:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                  {[
                    { id: 'proof_review', label: '1. Proof Review' },
                    { id: 'mold_sampling', label: '2. Mold / Sample' },
                    { id: 'mass_production', label: '3. Loom Production' },
                    { id: 'backing_qc', label: '4. Backing / QC' },
                    { id: 'shipped', label: '5. Dispatched' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleUpdateOrderStatus(selectedOrder.order_id, st.id as PatchOrderItem['status'])}
                      className={`p-2 rounded-lg border text-center font-bold transition-all ${
                        selectedOrder.status === st.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs"
                >
                  🖨️ Print Machine Job Ticket
                </button>
                <a
                  href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam-o-Alaikum ${selectedOrder.customer_name}! Your Apex Patches order #${selectedOrder.order_id} (${selectedOrder.quantity} pcs ${selectedOrder.patch_type}) is now in: ${selectedOrder.status.replace('_', ' ').toUpperCase()}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>WhatsApp Dispatch</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* CREATE NEW CUSTOM OFFER MODAL */}
      {/* ===================================================================== */}
      {showNewOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider">
                  QUICK WHOLESALE QUOTE
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Generate Customer Patch Offer
                </h3>
              </div>
              <button
                onClick={() => setShowNewOfferModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-500 mb-1">Client Name / Business</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe / Bravo Company"
                  value={newOffer.clientName}
                  onChange={(e) => setNewOffer({ ...newOffer, clientName: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Client WhatsApp</label>
                  <input
                    type="text"
                    placeholder="e.g. 923001234567"
                    value={newOffer.phone}
                    onChange={(e) => setNewOffer({ ...newOffer, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Patch Type</label>
                  <select
                    value={newOffer.patchType}
                    onChange={(e) => setNewOffer({ ...newOffer, patchType: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none"
                  >
                    <option value="PVC Rubber">PVC Rubber</option>
                    <option value="Embroidered">Embroidered</option>
                    <option value="Chenille">Chenille</option>
                    <option value="Leatherette">Leatherette</option>
                    <option value="Woven">Woven</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Quantity (pcs)</label>
                  <input
                    type="number"
                    value={newOffer.qty}
                    onChange={(e) => setNewOffer({ ...newOffer, qty: parseInt(e.target.value) || 100 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Unit Rate ($)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newOffer.unitPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, unitPrice: parseFloat(e.target.value) || 2.15 })}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none font-bold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-between text-blue-900 font-bold">
                <span>Calculated Wholesale Total:</span>
                <span className="text-base font-black">${(newOffer.qty * newOffer.unitPrice).toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const total = (newOffer.qty * newOffer.unitPrice).toFixed(2);
                    const msg = `Assalam-o-Alaikum ${newOffer.clientName}! Here is your official custom patch offer:\n- Style: ${newOffer.patchType}\n- Qty: ${newOffer.qty} pcs\n- Rate: $${newOffer.unitPrice}/ea\n- Total: $${total}\nIncludes free digital proof & backing. Reply to confirm!`;
                    window.open(`https://wa.me/${newOffer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                    setShowNewOfferModal(false);
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs"
                >
                  Send Offer via WhatsApp ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

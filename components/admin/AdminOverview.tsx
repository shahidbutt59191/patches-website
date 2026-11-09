'use client';

import React from 'react';
import {
  ShoppingBag,
  Clock,
  Layers,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingUp,
  Shield,
  FileSpreadsheet,
  Settings,
  Sparkles,
  ExternalLink,
  Tag,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { PatchOrderItem } from './types';
import { AdminTabId } from './AdminSidebar';

interface AdminOverviewProps {
  orders: PatchOrderItem[];
  metrics: {
    totalOrdersCount: number;
    inProduction: number;
    pendingProofs: number;
    totalRevenue: string;
  };
  onSelectTab: (tab: AdminTabId) => void;
  onSelectOrder: (order: PatchOrderItem) => void;
  onExportCsv: () => void;
}

export default function AdminOverview({
  orders,
  metrics,
  onSelectTab,
  onSelectOrder,
  onExportCsv,
}: AdminOverviewProps) {
  const recentOrders = orders.slice(0, 6);

  const getStatusBadge = (status: PatchOrderItem['status']) => {
    switch (status) {
      case 'proof_review':
        return {
          label: 'Proof Review',
          className: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'mold_sampling':
        return {
          label: 'Mold / Sample',
          className: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'mass_production':
        return {
          label: 'In Production',
          className: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
          dot: 'bg-purple-400 animate-pulse',
        };
      case 'backing_qc':
        return {
          label: 'Backing QC',
          className: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
          dot: 'bg-cyan-400',
        };
      case 'shipped':
        return {
          label: 'Shipped',
          className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      default:
        return {
          label: 'New',
          className: 'bg-slate-500/10 text-slate-400 border border-slate-500/30',
          dot: 'bg-slate-400',
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Factory Welcome & Telemetry Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-[#121622] to-slate-900 border border-slate-800/90 p-5 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>FACTORY COMMAND HUB • TAJIMA MULTI-HEAD 1,200 SPM</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Production & Order Dispatch Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time monitoring of client quote requests, automated digitizing proofs, and Madeira poly-thread manufacturing lines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectTab('orders')}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExportCsv}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Total Orders & Quotes */}
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Inquiries & Orders</span>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {metrics.totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Connected to Supabase DB</span>
          </div>
        </div>

        {/* KPI 2: Pending Proof Reviews */}
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Pending Proof Reviews</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-300 tracking-tight">
            {metrics.pendingProofs}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-amber-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Needs 6-Hour Scan Proof</span>
          </div>
        </div>

        {/* KPI 3: In Mass Production */}
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">In Mass Production</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-300 tracking-tight">
            {metrics.inProduction}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>On Tajima Loom Heads</span>
          </div>
        </div>

        {/* KPI 4: Estimated Pipeline Revenue */}
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Estimated Pipeline</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400 tracking-tight">
            ${metrics.totalRevenue}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-slate-400">
            <span>Wholesale Order Pipeline</span>
          </div>
        </div>

      </div>

      {/* 3. Quick Action Shortcuts */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Quick Action Shortcuts
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => onSelectTab('pricing_cards')}
            className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/40 text-left transition-all group cursor-pointer"
          >
            <Tag className="w-4 h-4 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Edit Pricing Cards</div>
            <p className="text-[10px] text-slate-400">Update storefront styles</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('portfolio')}
            className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">+ Add Portfolio Item</div>
            <p className="text-[10px] text-slate-400">Publish patch specimens</p>
          </button>

          <button
            type="button"
            onClick={onExportCsv}
            className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-left transition-all group cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Export Orders CSV</div>
            <p className="text-[10px] text-slate-400">Download spreadsheet</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('settings')}
            className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left transition-all group cursor-pointer"
          >
            <Settings className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Website & Settings</div>
            <p className="text-[10px] text-slate-400">Promo banner & contacts</p>
          </button>
        </div>
      </div>

      {/* 4. Recent Quote Inquiries & Production Orders Table */}
      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Recent Quote Inquiries & Production Orders
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('orders')}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Patch Style & Specs</th>
                <th className="py-3 px-4 font-semibold text-right">Qty</th>
                <th className="py-3 px-4 font-semibold text-right">Total ($)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {recentOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr
                    key={order.order_id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-orange-400 group-hover:text-orange-300">
                        {order.order_id}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-[10px]">
                          {(order.customer_name || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-200">{order.customer_name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{order.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Patch Style & Specs */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-300">{order.patch_type}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {order.dimensions} • {order.backing}
                      </div>
                    </td>

                    {/* Qty */}
                    <td className="py-3 px-4 text-right font-mono text-slate-300">
                      {order.quantity} pcs
                    </td>

                    {/* Total Real Price */}
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono font-black text-amber-400 text-sm">
                        ${order.total_amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${badge.className}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectOrder(order)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

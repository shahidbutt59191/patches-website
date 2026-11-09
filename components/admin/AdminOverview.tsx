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
          className: 'bg-amber-50 text-amber-700 border border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'mold_sampling':
        return {
          label: 'Mold / Sample',
          className: 'bg-blue-50 text-blue-700 border border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'mass_production':
        return {
          label: 'In Production',
          className: 'bg-purple-50 text-purple-700 border border-purple-200',
          dot: 'bg-purple-500 animate-pulse',
        };
      case 'backing_qc':
        return {
          label: 'Backing QC',
          className: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
          dot: 'bg-cyan-500',
        };
      case 'shipped':
        return {
          label: 'Shipped',
          className: 'bg-emerald-50 text-[#109655] border border-emerald-200',
          dot: 'bg-[#1dbf73]',
        };
      default:
        return {
          label: 'New Inquiry',
          className: 'bg-slate-100 text-slate-700 border border-slate-200',
          dot: 'bg-slate-500',
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Factory Welcome & Telemetry Banner (Fiverr Pro Clean Aesthetic) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] p-5 sm:p-7 shadow-xs">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#109655] text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#1dbf73] animate-pulse" />
              <span>FACTORY COMMAND HUB • TAJIMA MULTI-HEAD 1,200 SPM</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#222325] tracking-tight">
              Production & Order Dispatch Center
            </h2>
            <p className="text-xs sm:text-sm text-[#62646a] mt-1 max-w-2xl leading-relaxed">
              Real-time monitoring of client quote requests, automated digitizing proofs, and Madeira poly-thread manufacturing lines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectTab('orders')}
              className="px-4 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExportCsv}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#e4e5e7] text-[#222325] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#109655]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Total Orders & Quotes */}
        <div className="rounded-2xl bg-white border border-[#e4e5e7] p-5 shadow-xs hover:border-[#1dbf73] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#74767e]">Total Inquiries & Orders</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#109655] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#222325] tracking-tight">
            {metrics.totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-[#109655]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Connected to Supabase DB</span>
          </div>
        </div>

        {/* KPI 2: Pending Proof Reviews */}
        <div className="rounded-2xl bg-white border border-[#e4e5e7] p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#74767e]">Pending Proof Reviews</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 tracking-tight">
            {metrics.pendingProofs}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-amber-600">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Needs 6-Hour Scan Proof</span>
          </div>
        </div>

        {/* KPI 3: In Mass Production */}
        <div className="rounded-2xl bg-white border border-[#e4e5e7] p-5 shadow-xs hover:border-purple-400 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#74767e]">In Mass Production</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-600 tracking-tight">
            {metrics.inProduction}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-purple-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>On Tajima Loom Heads</span>
          </div>
        </div>

        {/* KPI 4: Estimated Pipeline Revenue */}
        <div className="rounded-2xl bg-white border border-[#e4e5e7] p-5 shadow-xs hover:border-[#1dbf73] hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#74767e]">Estimated Pipeline</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#109655] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#109655] tracking-tight">
            ${metrics.totalRevenue}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-[#74767e]">
            <span>Wholesale Order Pipeline</span>
          </div>
        </div>

      </div>

      {/* 3. Quick Action Shortcuts */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-[#74767e]">
          Quick Action Shortcuts
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => onSelectTab('pricing_cards')}
            className="p-3.5 rounded-xl bg-white hover:border-[#1dbf73] border border-[#e4e5e7] text-left transition-all group cursor-pointer shadow-xs hover:shadow-sm"
          >
            <Tag className="w-4 h-4 text-[#109655] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#222325]">Edit Pricing Cards</div>
            <p className="text-[10px] text-[#74767e]">Update storefront styles</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('portfolio')}
            className="p-3.5 rounded-xl bg-white hover:border-[#1dbf73] border border-[#e4e5e7] text-left transition-all group cursor-pointer shadow-xs hover:shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#109655] mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#222325]">+ Add Portfolio Item</div>
            <p className="text-[10px] text-[#74767e]">Publish patch specimens</p>
          </button>

          <button
            type="button"
            onClick={onExportCsv}
            className="p-3.5 rounded-xl bg-white hover:border-[#1dbf73] border border-[#e4e5e7] text-left transition-all group cursor-pointer shadow-xs hover:shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#222325]">Export Orders CSV</div>
            <p className="text-[10px] text-[#74767e]">Download spreadsheet</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('settings')}
            className="p-3.5 rounded-xl bg-white hover:border-[#1dbf73] border border-[#e4e5e7] text-left transition-all group cursor-pointer shadow-xs hover:shadow-sm"
          >
            <Settings className="w-4 h-4 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-[#222325]">Website & Settings</div>
            <p className="text-[10px] text-[#74767e]">Promo banner & contacts</p>
          </button>
        </div>
      </div>

      {/* 4. Recent Quote Inquiries & Production Orders Table */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-[#e4e5e7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#109655]" />
            <h3 className="text-sm sm:text-base font-bold text-[#222325]">
              Recent Quote Inquiries & Production Orders
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('orders')}
            className="text-xs font-bold text-[#1dbf73] hover:text-[#19a463] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e4e5e7] text-[11px] font-bold uppercase text-[#74767e] bg-[#f7f7f7]">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Patch Style & Specs</th>
                <th className="py-3 px-4 font-semibold text-right">Qty</th>
                <th className="py-3 px-4 font-semibold text-right">Total ($)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e5e7] text-xs">
              {recentOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr
                    key={order.order_id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#1dbf73]">
                        {order.order_id}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-[#109655] text-[10px]">
                          {(order.customer_name || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#222325]">{order.customer_name}</div>
                          <div className="text-[10px] text-[#74767e] font-mono">{order.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Patch Style & Specs */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#222325]">{order.patch_type}</div>
                      <div className="text-[10px] text-[#74767e] font-mono">
                        {order.dimensions} • {order.backing}
                      </div>
                    </td>

                    {/* Qty */}
                    <td className="py-3 px-4 text-right font-mono text-[#222325]">
                      {order.quantity} pcs
                    </td>

                    {/* Total Real Price */}
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono font-bold text-[#222325] text-sm">
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
                        className="px-3 py-1.5 rounded-lg border border-[#e4e5e7] bg-white hover:bg-[#1dbf73] hover:text-white hover:border-[#1dbf73] text-[#222325] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
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

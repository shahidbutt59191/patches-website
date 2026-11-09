'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  FileSpreadsheet,
  ArrowRight,
  MessageCircle,
  Mail,
  Truck,
  ExternalLink,
  ChevronDown,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { PatchOrderItem } from './types';

interface AdminOrdersProps {
  orders: PatchOrderItem[];
  onSelectOrder: (order: PatchOrderItem) => void;
  onUpdateStatus: (orderId: string, newStatus: PatchOrderItem['status']) => void;
  onWhatsApp: (order: PatchOrderItem) => void;
  onEmail: (order: PatchOrderItem) => void;
  onExportCsv: () => void;
}

export default function AdminOrders({
  orders,
  onSelectOrder,
  onUpdateStatus,
  onWhatsApp,
  onEmail,
  onExportCsv,
}: AdminOrdersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.order_id?.toLowerCase().includes(q) ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.phone?.toLowerCase().includes(q) ||
        o.patch_type?.toLowerCase().includes(q) ||
        o.notes?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchesStyle =
        styleFilter === 'all' ||
        o.patch_type?.toLowerCase().includes(styleFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesStyle;
    });
  }, [orders, searchQuery, statusFilter, styleFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: orders.length,
      proof_review: 0,
      mold_sampling: 0,
      mass_production: 0,
      backing_qc: 0,
      shipped: 0,
    };
    orders.forEach((o) => {
      if (counts[o.status] !== undefined) counts[o.status]++;
    });
    return counts;
  }, [orders]);

  const getStatusBadge = (status: PatchOrderItem['status']) => {
    switch (status) {
      case 'proof_review':
        return {
          label: 'Proof Review',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'mold_sampling':
        return {
          label: 'Sampling',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'mass_production':
        return {
          label: 'In Production',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500 animate-pulse',
        };
      case 'backing_qc':
        return {
          label: 'Backing QC',
          className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          dot: 'bg-cyan-500',
        };
      case 'shipped':
        return {
          label: 'Shipped',
          className: 'bg-emerald-50 text-[#109655] border-emerald-200',
          dot: 'bg-[#1dbf73]',
        };
      default:
        return {
          label: 'New Inquiry',
          className: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Search & Filter Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#74767e] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Client, Email, Phone, Patch Style..."
            className="w-full bg-[#f7f7f7] border border-[#e4e5e7] focus:border-[#1dbf73] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#222325] placeholder-[#74767e] focus:outline-none transition-colors"
          />
        </div>

        {/* Filters & Export */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Patch Style Selector */}
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            className="bg-[#f7f7f7] border border-[#e4e5e7] text-[#222325] text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1dbf73] cursor-pointer"
          >
            <option value="all">All Patch Styles</option>
            <option value="embroidered">Embroidered</option>
            <option value="iron">Iron-On</option>
            <option value="velcro">Velcro</option>
            <option value="woven">Woven</option>
            <option value="leather">Leather</option>
            <option value="pvc">PVC</option>
            <option value="chenille">Chenille</option>
            <option value="sublimated">Sublimated</option>
          </select>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={onExportCsv}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#222325] text-xs font-bold transition-all flex items-center gap-2 border border-[#e4e5e7] cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#109655]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tab Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'proof_review', label: 'Proof Review' },
          { id: 'mold_sampling', label: 'Sampling' },
          { id: 'mass_production', label: 'In Production' },
          { id: 'backing_qc', label: 'Backing QC' },
          { id: 'shipped', label: 'Shipped' },
        ].map((tab) => {
          const count = statusCounts[tab.id] || 0;
          const isActive = statusFilter === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#1dbf73] text-white shadow-xs'
                  : 'bg-white text-[#62646a] hover:text-[#222325] border border-[#e4e5e7] hover:border-[#b5b6ba]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#74767e]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table Container */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e4e5e7] text-[11px] font-bold uppercase text-[#74767e] bg-[#f7f7f7]">
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Client & Contact</th>
                <th className="py-3.5 px-4 font-semibold">Patch Specification</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quantity</th>
                <th className="py-3.5 px-4 font-semibold text-right">Real Price ($)</th>
                <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e5e7] text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#74767e] text-xs">
                    No matching orders or quote requests found for current filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <tr
                      key={order.order_id}
                      onClick={() => onSelectOrder(order)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Order ID */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#1dbf73]">
                            {order.order_id}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(order.order_id, e)}
                            className="p-1 rounded text-[#74767e] hover:text-[#222325] transition-colors cursor-pointer"
                            title="Copy Order ID"
                          >
                            {copiedId === order.order_id ? (
                              <Check className="w-3 h-3 text-[#109655]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="text-[10px] text-[#74767e] font-mono mt-0.5">
                          {new Date(order.created_at).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Client & Contact */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-[#109655] text-xs shrink-0">
                            {(order.customer_name || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[#222325]">{order.customer_name}</div>
                            <div className="text-[10px] text-[#74767e] font-mono">{order.email}</div>
                            {order.phone && (
                              <div className="text-[10px] text-[#74767e] font-mono mt-0.5">
                                {order.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Patch Specification */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#222325]">{order.patch_type}</div>
                        <div className="text-[10px] text-[#74767e] font-mono mt-0.5">
                          {order.dimensions} • {order.backing}
                        </div>
                        {order.border && (
                          <div className="text-[10px] text-[#74767e] font-mono">
                            Border: {order.border}
                          </div>
                        )}
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-[#222325]">
                        {order.quantity.toLocaleString()} pcs
                      </td>

                      {/* Total Real Price */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-mono font-bold text-[#222325] text-sm">
                          ${order.total_amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-[#74767e] font-mono">
                          ${(order.total_amount / (order.quantity || 1)).toFixed(2)} / pc
                        </div>
                      </td>

                      {/* Inline Status Dropdown */}
                      <td
                        className="py-4 px-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={order.status}
                          onChange={(e) =>
                            onUpdateStatus(order.order_id, e.target.value as PatchOrderItem['status'])
                          }
                          className={`text-[10px] font-bold rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${badge.className} bg-white shadow-xs`}
                        >
                          <option value="proof_review">Proof Review</option>
                          <option value="mold_sampling">Mold Sampling</option>
                          <option value="mass_production">Mass Production</option>
                          <option value="backing_qc">Backing QC</option>
                          <option value="shipped">Shipped</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td
                        className="py-4 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp */}
                          <button
                            type="button"
                            onClick={() => onWhatsApp(order)}
                            title="Chat with client on WhatsApp"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#109655] border border-emerald-200 transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* Email */}
                          <button
                            type="button"
                            onClick={() => onEmail(order)}
                            title="Send email update"
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-all cursor-pointer"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          {/* Details */}
                          <button
                            type="button"
                            onClick={() => onSelectOrder(order)}
                            className="px-2.5 py-1.5 rounded-lg border border-[#e4e5e7] bg-white hover:bg-[#1dbf73] hover:text-white hover:border-[#1dbf73] text-[#222325] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

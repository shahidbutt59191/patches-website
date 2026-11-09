'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  MessageCircle,
  Mail,
  Truck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Shield,
  Copy,
  Check,
  Package,
} from 'lucide-react';
import { PatchOrderItem } from './types';

interface AdminOrderModalProps {
  order: PatchOrderItem;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: PatchOrderItem['status']) => void;
  onUpdateTracking: (orderId: string, courier: string, trackingNumber: string) => void;
  onWhatsApp: (order: PatchOrderItem) => void;
  onEmail: (order: PatchOrderItem) => void;
}

const STATUS_STEPS: { id: PatchOrderItem['status']; label: string; icon: any }[] = [
  { id: 'proof_review', label: '1. Proof Review', icon: Clock },
  { id: 'mold_sampling', label: '2. Mold / Sample', icon: Layers },
  { id: 'mass_production', label: '3. Production', icon: Sparkles },
  { id: 'backing_qc', label: '4. Backing QC', icon: CheckCircle2 },
  { id: 'shipped', label: '5. Shipped', icon: Truck },
];

export default function AdminOrderModal({
  order,
  onClose,
  onUpdateStatus,
  onUpdateTracking,
  onWhatsApp,
  onEmail,
}: AdminOrderModalProps) {
  const [courier, setCourier] = useState(order.courier || 'FedEx Express');
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || '');
  const [isUpdatingTracking, setIsUpdatingTracking] = useState(false);
  const [trackingSavedToast, setTrackingSavedToast] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.order_id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1500);
  };

  const handleSaveTracking = async () => {
    setIsUpdatingTracking(true);
    await onUpdateTracking(order.order_id, courier, trackingNumber);
    setIsUpdatingTracking(false);
    setTrackingSavedToast(true);
    setTimeout(() => setTrackingSavedToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.id === order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0c0e14] border border-slate-800 rounded-3xl shadow-2xl flex flex-col text-slate-100">
        
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-[#0c0e14]/95 backdrop-blur-md border-b border-slate-800/80 px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-orange-400 text-base">
                  {order.order_id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="p-1 rounded text-slate-500 hover:text-slate-300"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {order.title || `Custom ${order.patch_type} Run`} • {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-800 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Print Packing Slip</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Stepper Progression Bar */}
        <div className="px-5 sm:px-7 py-4 bg-[#10131d] border-b border-slate-800/80">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
            Production Stage Progression (Click step to advance)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STATUS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isPassedOrCurrent = idx <= currentStepIndex;
              const isCurrent = order.status === step.id;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => onUpdateStatus(order.order_id, step.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isCurrent
                      ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/25 ring-1 ring-orange-400'
                      : isPassedOrCurrent
                      ? 'bg-slate-800/80 text-slate-200 border-slate-700'
                      : 'bg-slate-900/60 text-slate-500 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <StepIcon className="w-4 h-4" />
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                  </div>
                  <div className="text-[11px] font-bold leading-tight">{step.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Main Content (2 Columns) */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Client & Artwork Details */}
          <div className="space-y-6">
            
            {/* Client Contact Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Client Profile
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Contact
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-black text-lg flex items-center justify-center shadow-lg">
                  {(order.customer_name || 'C').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-base font-bold text-white">{order.customer_name}</div>
                  <div className="text-xs text-slate-400 font-mono">{order.email}</div>
                  {order.phone && (
                    <div className="text-xs text-orange-400 font-mono mt-0.5">{order.phone}</div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                <div className="text-slate-500 font-medium">Delivery Address:</div>
                <div className="text-slate-300 font-mono leading-relaxed">
                  {order.shipping_address || 'Worldwide Express Delivery'}
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onWhatsApp(order)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Client</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEmail(order)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-500/15 hover:bg-blue-500 text-blue-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-blue-500/30 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>

            {/* Customer Artwork & Design Proof Preview */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Customer Vector / Digitizing File
                </span>
                {order.artwork_thumbnail && (
                  <a
                    href={order.artwork_thumbnail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1 font-bold"
                  >
                    <span>View HD File</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {order.artwork_thumbnail ? (
                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center group">
                  <img
                    src={order.artwork_thumbnail}
                    alt="Customer Artwork"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-800 p-6 text-center text-xs text-slate-500">
                  Artwork file linked via Quote Intake portal or email proof attachment.
                </div>
              )}
            </div>

            {/* Special Instructions / Notes */}
            {order.notes && (
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Client Production Notes:</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-mono">{order.notes}</p>
              </div>
            )}

          </div>

          {/* Right Column: Manufacturing Specs & Courier Dispatch */}
          <div className="space-y-6">
            
            {/* Manufacturing Specifications Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Manufacturing Specifications
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Tajima 1,200 SPM
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Patch Style</span>
                  <span className="font-bold text-white text-sm">{order.patch_type}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Dimensions</span>
                  <span className="font-bold text-white text-sm">{order.dimensions}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Attachment Backing</span>
                  <span className="font-bold text-slate-200">{order.backing}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Border Finishing</span>
                  <span className="font-bold text-slate-200">{order.border || 'Merrowed Overlock'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Total Run Quantity</span>
                  <span className="font-bold text-white text-base font-mono">{order.quantity} pcs</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">Unit Factory Price</span>
                  <span className="font-bold text-amber-400 text-base font-mono">
                    ${(order.total_amount / (order.quantity || 1)).toFixed(2)} / pc
                  </span>
                </div>
              </div>

              {/* Real Total Price Box */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">Total Invoice Amount:</span>
                  <p className="text-[10px] text-slate-500">Includes free digital proof & global delivery</p>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  ${order.total_amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Courier Dispatch & Tracking Number Manager */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Courier & Dispatch Tracking</span>
                </span>
                {order.tracking_number && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Tracking
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Courier Service:
                  </label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="FedEx Express">FedEx Express</option>
                    <option value="DHL Express Worldwide">DHL Express Worldwide</option>
                    <option value="UPS Worldwide Expedited">UPS Worldwide Expedited</option>
                    <option value="USPS Priority Mail">USPS Priority Mail</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Airway Bill / Tracking Number:
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. FDX-9948201 or 847291039"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveTracking}
                  disabled={isUpdatingTracking}
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isUpdatingTracking ? 'Saving...' : 'Update Tracking & Notify Client'}</span>
                </button>

                {trackingSavedToast && (
                  <div className="text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-1.5 rounded-lg animate-in fade-in">
                    ✓ Tracking number updated & saved to Supabase!
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

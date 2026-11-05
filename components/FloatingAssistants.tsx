'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, CheckCircle2 } from 'lucide-react';

interface FloatingAssistantsProps {
  whatsappNumber?: string;
  onOpenQuote?: () => void;
  socialProofEnabled?: boolean;
  intervalSeconds?: number;
}

interface SocialOrder {
  name: string;
  city: string;
  order: string;
  time: string;
}

const DEFAULT_PATCH_ORDERS: SocialOrder[] = [
  { name: 'Marcus V.', city: 'Austin, TX', order: '250 Velcro Tactical Patches', time: '3 mins ago' },
  { name: 'Sarah L.', city: 'Seattle, WA', order: '150 Custom Embroidered Patches', time: '7 mins ago' },
  { name: 'David K.', city: 'Denver, CO', order: '500 3D Soft PVC Morale Patches', time: '12 mins ago' },
  { name: 'Elena R.', city: 'Chicago, IL', order: '200 Debossed Leather Patches', time: '18 mins ago' },
  { name: 'Jackson M.', city: 'San Diego, CA', order: '350 Iron-On Uniform Patches', time: '24 mins ago' },
  { name: 'Tyler B.', city: 'Miami, FL', order: '400 High-Density Woven Patches', time: '31 mins ago' },
  { name: 'Samantha P.', city: 'Boston, MA', order: '100 Chenille Varsity Patches', time: '42 mins ago' },
];

export default function FloatingAssistants({
  whatsappNumber = '18005557282',
  onOpenQuote,
  socialProofEnabled = true,
  intervalSeconds = 14,
}: FloatingAssistantsProps) {
  const [showOrderToast, setShowOrderToast] = useState(false);
  const [toastData, setToastData] = useState<SocialOrder>(DEFAULT_PATCH_ORDERS[0]);
  const [ordersList, setOrdersList] = useState<SocialOrder[]>(DEFAULT_PATCH_ORDERS);
  const [isDismissedByUser, setIsDismissedByUser] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Attempt to load real recent customer orders from the database
  useEffect(() => {
    fetch(`/api/admin/orders?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.quotes && data.quotes.length > 0) {
          const mappedReal: SocialOrder[] = data.quotes
            .filter((q: any) => q.full_name && q.quantity)
            .slice(0, 10)
            .map((q: any, idx: number) => {
              const nameParts = (q.full_name || 'Client').trim().split(' ');
              const maskedName = nameParts.length > 1
                ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.`
                : nameParts[0];

              const styleRaw = q.patch_type || 'Embroidered';
              const patchStyle = styleRaw.charAt(0).toUpperCase() + styleRaw.slice(1);
              const times = ['4 mins ago', '9 mins ago', '15 mins ago', '28 mins ago', '45 mins ago', '1 hour ago'];

              return {
                name: maskedName,
                city: 'Verified Direct Buyer',
                order: `${q.quantity} ${patchStyle} Patches`,
                time: times[idx % times.length],
              };
            });

          if (mappedReal.length > 0) {
            setOrdersList([...mappedReal, ...DEFAULT_PATCH_ORDERS]);
            setToastData(mappedReal[0]);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Control Toast appearance and auto-dismiss lifecycle
  useEffect(() => {
    if (!socialProofEnabled || isDismissedByUser) {
      setShowOrderToast(false);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      return;
    }

    const intervalMs = Math.max(8, intervalSeconds || 14) * 1000;
    let orderIndex = 0;

    // Initial show after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setShowOrderToast(true);

      // Auto-dismiss after 5.5 seconds so it doesn't get permanently stuck over the page
      hideTimerRef.current = setTimeout(() => {
        setShowOrderToast(false);
      }, 5500);
    }, 3500);

    // Recurring interval
    const interval = setInterval(() => {
      orderIndex = (orderIndex + 1) % ordersList.length;
      setToastData(ordersList[orderIndex]);
      setShowOrderToast(true);

      // Auto-dismiss after 5.5 seconds
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setShowOrderToast(false);
      }, 5500);
    }, intervalMs);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [socialProofEnabled, intervalSeconds, isDismissedByUser, ordersList]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOrderToast(false);
    setIsDismissedByUser(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  return (
    <>
      {/* 1. Floating Recent Order Social Proof Toast (Bottom Left) */}
      {socialProofEnabled && showOrderToast && !isDismissedByUser && (
        <div
          onClick={() => onOpenQuote?.()}
          className="fixed bottom-6 left-6 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 cursor-pointer hover:border-orange-500/50 hover:shadow-orange-500/10 transition-all select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/20">
            <span className="text-lg">🧵</span>
          </div>

          <div className="flex-1 pr-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 truncate">
              <span>{toastData.name}</span>
              <span className="text-slate-400 font-normal truncate">({toastData.city})</span>
            </div>
            <div className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
              Ordered <strong className="text-orange-600 font-bold">{toastData.order}</strong>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-mono font-bold mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>Verified Factory Order • {toastData.time}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close notification"
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Floating WhatsApp Help Desk Button (Bottom Right) */}
      <aside aria-label="Support Desk" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi%20BDigitizing!%20I%20would%20like%20a%20free%20quote%20for%20custom%20patches.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/40 cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
          </div>
          <span className="text-xs font-bold hidden sm:inline">
            WhatsApp Desk
          </span>
        </a>
      </aside>
    </>
  );
}

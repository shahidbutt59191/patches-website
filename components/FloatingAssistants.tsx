'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface FloatingAssistantsProps {
  whatsappNumber?: string;
  onOpenQuote?: () => void;
  socialProofEnabled?: boolean;
}

export default function FloatingAssistants({
  whatsappNumber = '18005557282',
  onOpenQuote,
  socialProofEnabled = true,
}: FloatingAssistantsProps) {
  const [showOrderToast, setShowOrderToast] = useState(false);
  const [toastData, setToastData] = useState({
    name: 'Marcus K.',
    city: 'Dallas, TX',
    order: '250 Velcro Tactical Patches',
    time: '4 mins ago',
  });

  const recentOrders = [
    { name: 'Marcus K.', city: 'Dallas, TX', order: '250 Velcro Tactical Patches', time: '3 mins ago' },
    { name: 'Sarah L.', city: 'Toronto, Canada', order: '100 Embroidered Beanies', time: '8 mins ago' },
    { name: 'Liam P.', city: 'London, UK', order: '500 Woven Brand Labels', time: '14 mins ago' },
    { name: 'Captain Harris', city: 'San Diego, CA', order: '350 Flight Suit Morale Patches', time: '21 mins ago' },
  ];

  useEffect(() => {
    if (!socialProofEnabled) {
      setShowOrderToast(false);
      return;
    }

    // Show toast after 4s
    const timer = setTimeout(() => {
      setShowOrderToast(true);
    }, 4000);

    // Rotate toast data every 18s
    const interval = setInterval(() => {
      const randomOrder = recentOrders[Math.floor(Math.random() * recentOrders.length)];
      setToastData(randomOrder);
      setShowOrderToast(true);
    }, 18000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* 1. Floating Recent Order Social Proof Toast (Bottom Left) */}
      {showOrderToast && (
        <div className="fixed bottom-6 left-6 z-40 max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200/80 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-base">🧵</span>
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span>{toastData.name}</span>
              <span className="text-slate-400 font-normal">({toastData.city})</span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              Ordered <strong className="text-orange-600 font-semibold">{toastData.order}</strong>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Verified Factory Order • {toastData.time}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowOrderToast(false)}
            aria-label="Close notification"
            className="text-slate-400 hover:text-slate-600 p-0.5"
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

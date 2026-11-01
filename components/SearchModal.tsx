'use client';

import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (id: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectService }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const searchableItems = [
    { title: 'Embroidered Patches', category: 'Services', id: 'embroidered', desc: 'Classic polyester stitch on heavy duck twill' },
    { title: 'Iron-On Patches', category: 'Services', id: 'iron-on', desc: 'Heat-seal adhesive for quick iron application' },
    { title: 'Velcro Tactical Patches', category: 'Services', id: 'velcro', desc: 'Hook & loop backing for plate carriers and uniforms' },
    { title: 'Woven Jacquard Patches', category: 'Services', id: 'woven', desc: 'Ultra high-definition micro thread construction' },
    { title: 'Debossed Leather Patches', category: 'Services', id: 'leather', desc: 'Laser etched rustic headwear patches' },
    { title: 'Free Worldwide Shipping', category: 'Policy', id: 'shipping', desc: 'Free tracked delivery worldwide on all orders' },
    { title: '10-14 Days Turnaround', category: 'Turnaround', id: 'turnaround', desc: 'Standard production timeline with rush options' },
  ];

  const filtered = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-orange-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search custom patches, backing types, turnaround..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (onSelectService && item.category === 'Services') {
                    onSelectService(item.id);
                  }
                  onClose();
                }}
                className="py-3 px-3 rounded-xl hover:bg-orange-50/70 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.desc}
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

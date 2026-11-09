'use client';

import React, { useState } from 'react';
import {
  Tag,
  RotateCcw,
  Edit3,
  Check,
  X,
  Sparkles,
  Eye,
  EyeOff,
  DollarSign,
  Clock,
  Layers,
  Save,
} from 'lucide-react';
import { PatchPricingCardItem, SiteSettings, DEFAULT_PATCH_PRICING_CARDS } from '@/lib/settings';

interface AdminPricingCardsProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminPricingCards({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminPricingCardsProps) {
  const [editingCard, setEditingCard] = useState<PatchPricingCardItem | null>(null);
  const [cardFeaturesText, setCardFeaturesText] = useState<string>('');

  const cards =
    settings.patchPricingCards && settings.patchPricingCards.length > 0
      ? settings.patchPricingCards
      : DEFAULT_PATCH_PRICING_CARDS;

  const openEdit = (card: PatchPricingCardItem) => {
    setEditingCard({ ...card });
    setCardFeaturesText(card.features ? card.features.join('\n') : '');
  };

  const handleSaveCard = () => {
    if (!editingCard) return;
    const featuresList = cardFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedCard: PatchPricingCardItem = {
      ...editingCard,
      features: featuresList,
    };

    const updated = cards.map((c) => (c.id === updatedCard.id ? updatedCard : c));
    const newSettings = { ...settings, patchPricingCards: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setEditingCard(null);
  };

  const handleToggleActive = (cardId: string) => {
    const updated = cards.map((c) =>
      c.id === cardId ? { ...c, active: c.active === false ? true : false } : c
    );
    const newSettings = { ...settings, patchPricingCards: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
  };

  const handleResetDefaults = () => {
    if (
      confirm(
        'Are you sure you want to reset all 8 patch pricing cards to default specifications & rates?'
      )
    ) {
      const newSettings = {
        ...settings,
        patchPricingCards: DEFAULT_PATCH_PRICING_CARDS,
      };
      onUpdateSettings(newSettings);
      onSaveSettings(newSettings);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#109655]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#222325]">
              Storefront Custom Patch Pricing Cards
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200">
              {cards.length} Styles
            </span>
          </div>
          <p className="text-xs text-[#74767e] mt-1">
            Customize prices, badge pills, turnaround times, and bullet features displayed on the main pricing cards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#222325] text-xs font-bold transition-all flex items-center gap-2 border border-[#e4e5e7] cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-[#74767e]" />
          <span>Reset Factory Defaults</span>
        </button>
      </div>

      {/* 8 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const isActive = card.active !== false;
          return (
            <div
              key={card.id}
              className={`rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 p-5 flex flex-col justify-between relative group shadow-xs ${
                isActive
                  ? 'border-[#e4e5e7] hover:border-[#1dbf73] hover:shadow-md'
                  : 'border-[#e4e5e7] opacity-60 bg-slate-50'
              }`}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      card.pillColor || 'bg-emerald-50 text-[#109655] border-emerald-200'
                    }`}
                  >
                    {card.badgePill}
                  </span>

                  {/* Active / Inactive Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(card.id)}
                    title={isActive ? 'Hide from storefront' : 'Show on storefront'}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-[#109655] border-emerald-200 hover:bg-[#1dbf73] hover:text-white'
                        : 'bg-slate-100 text-[#74767e] border-slate-200 hover:text-[#222325]'
                    }`}
                  >
                    {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Card Title & Desc */}
                <h3 className="text-base font-bold text-[#222325] mb-1">{card.name}</h3>
                <p className="text-xs text-[#74767e] line-clamp-2 mb-4 leading-relaxed">
                  {card.desc}
                </p>

                {/* Pricing Display */}
                <div className="p-3 rounded-xl bg-[#f7f7f7] border border-[#e4e5e7] mb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#74767e] font-mono block">From</span>
                    <span className="text-2xl font-black text-[#222325] font-mono">
                      ${card.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#74767e] font-mono"> / pc</span>
                  </div>
                  {card.strikePrice && (
                    <div className="text-right">
                      <span className="text-xs text-[#74767e] line-through font-mono">
                        ${card.strikePrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#109655] font-bold block">Wholesale Rate</span>
                    </div>
                  )}
                </div>

                {/* Turnaround Pill */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#74767e] font-mono mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#109655]" />
                  <span>{card.turnaround || '10-12 Business Days'}</span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-1.5 mb-5 border-t border-[#e4e5e7] pt-3">
                  {(card.features || []).slice(0, 4).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#404145]">
                      <Check className="w-3.5 h-3.5 text-[#1dbf73] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                  {(card.features || []).length > 4 && (
                    <div className="text-[10px] text-[#74767e] font-mono">
                      +{card.features.length - 4} more specs
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => openEdit(card)}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#1dbf73] text-[#222325] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-[#e4e5e7] hover:border-[#1dbf73] cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Specifications</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Pricing Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-[#e4e5e7] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-[#222325]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e5e7]">
              <div className="flex items-center gap-2.5">
                <Tag className="w-5 h-5 text-[#109655]" />
                <h3 className="text-lg font-bold text-[#222325]">
                  Edit Card: {editingCard.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="p-1.5 rounded-lg text-[#74767e] hover:text-[#222325] hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-[#62646a] block mb-1">Patch Style Name</label>
                <input
                  type="text"
                  value={editingCard.name}
                  onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-[#62646a] block mb-1">Badge Pill Text</label>
                <input
                  type="text"
                  value={editingCard.badgePill}
                  onChange={(e) => setEditingCard({ ...editingCard, badgePill: e.target.value })}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-[#62646a] block mb-1">Starting Price ($)</label>
                <input
                  type="number"
                  step="0.05"
                  value={editingCard.price}
                  onChange={(e) => setEditingCard({ ...editingCard, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-[#62646a] block mb-1">Strike Price ($)</label>
                <input
                  type="number"
                  step="0.05"
                  value={editingCard.strikePrice || 0}
                  onChange={(e) => setEditingCard({ ...editingCard, strikePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-[#62646a] block mb-1">Card Subtitle / Description</label>
                <input
                  type="text"
                  value={editingCard.desc}
                  onChange={(e) => setEditingCard({ ...editingCard, desc: e.target.value })}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-[#62646a] block mb-1">
                  Features Checklist (one bullet point per line):
                </label>
                <textarea
                  rows={5}
                  value={cardFeaturesText}
                  onChange={(e) => setCardFeaturesText(e.target.value)}
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl p-3 text-[#222325] font-mono text-xs focus:outline-none focus:border-[#1dbf73] focus:bg-white leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#e4e5e7] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#222325] border border-[#e4e5e7] font-bold text-xs cursor-pointer shadow-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCard}
                className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Card Specifications</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

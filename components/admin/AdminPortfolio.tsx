'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  Save,
  X,
  Layers,
  Tag,
} from 'lucide-react';
import { PortfolioItem, SiteSettings, DEFAULT_PORTFOLIO } from '@/lib/settings';

interface AdminPortfolioProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminPortfolio({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminPortfolioProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
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

  const portfolioList = settings.portfolio && settings.portfolio.length > 0 ? settings.portfolio : DEFAULT_PORTFOLIO;

  const handleAddSubmit = () => {
    if (!newItem.title) return;
    const item: PortfolioItem = {
      id: Date.now(),
      title: newItem.title || 'Custom Morale Specimen',
      category: (newItem.category as any) || 'tactical',
      styleId: newItem.styleId || 'embroidered',
      badge: newItem.badge || 'Tajima High Density',
      specs: newItem.specs || '3.0" × 3.0" • Madeira Poly',
      batch: newItem.batch || '100 pcs',
      desc: newItem.desc || 'Precision manufactured custom patch.',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
      image: newItem.image || 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
      basePrice: Number(newItem.basePrice) || 1.85,
      active: true,
    };

    const updated = [item, ...portfolioList];
    const newSettings = { ...settings, portfolio: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setShowAddModal(false);
    setNewItem({
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

  const handleEditSubmit = () => {
    if (!editingItem || !editingItem.title) return;
    const updated = portfolioList.map((p) =>
      String(p.id) === String(editingItem.id) ? editingItem : p
    );
    const newSettings = { ...settings, portfolio: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setEditingItem(null);
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Delete this portfolio specimen?')) {
      const updated = portfolioList.filter((p) => String(p.id) !== String(id));
      const newSettings = { ...settings, portfolio: updated };
      onUpdateSettings(newSettings);
      onSaveSettings(newSettings);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Portfolio Specimens Gallery</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {portfolioList.length} Items
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Showcase finished patch orders, photography specimens, and client runs on the storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Specimen</span>
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioList.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 overflow-hidden flex flex-col group hover:border-slate-700 transition-all shadow-lg"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-orange-400 border border-orange-500/30">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  {item.badge}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-amber-400/20">
                  ${item.basePrice?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Specimen Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-[11px] text-slate-400 font-mono mb-2">{item.specs}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Batch: {item.batch}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                    title="Edit Specimen"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                    title="Delete Specimen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modals */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#0c0e14] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-slate-100">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {editingItem ? 'Edit Portfolio Specimen' : 'Add New Portfolio Specimen'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            {(() => {
              const current = editingItem || newItem;
              const setter = (key: keyof PortfolioItem, val: any) => {
                if (editingItem) setEditingItem({ ...editingItem, [key]: val });
                else setNewItem({ ...newItem, [key]: val });
              };

              return (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Title</label>
                    <input
                      type="text"
                      value={current.title || ''}
                      onChange={(e) => setter('title', e.target.value)}
                      placeholder="e.g. Tactical Recon Skull Morale Badge"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-400 block mb-1">Category</label>
                      <select
                        value={current.category || 'tactical'}
                        onChange={(e) => setter('category', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="tactical">Tactical</option>
                        <option value="headwear">Headwear</option>
                        <option value="biker">Biker & Clubs</option>
                        <option value="varsity">Varsity / Apparel</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-400 block mb-1">Style ID</label>
                      <select
                        value={current.styleId || 'embroidered'}
                        onChange={(e) => setter('styleId', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="embroidered">Embroidered</option>
                        <option value="iron-on">Iron-On</option>
                        <option value="velcro">Velcro</option>
                        <option value="woven">Woven</option>
                        <option value="leather">Leather</option>
                        <option value="pvc">PVC</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={current.image || ''}
                      onChange={(e) => setter('image', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold text-slate-400 block mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={current.badge || ''}
                        onChange={(e) => setter('badge', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-400 block mb-1">Batch Size</label>
                      <input
                        type="text"
                        value={current.batch || ''}
                        onChange={(e) => setter('batch', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-400 block mb-1">Base Price ($)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={current.basePrice || 1.85}
                        onChange={(e) => setter('basePrice', parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Specs String</label>
                    <input
                      type="text"
                      value={current.specs || ''}
                      onChange={(e) => setter('specs', e.target.value)}
                      placeholder='e.g. 3.25" × 3.0" • Pantone 418C • Mil-Spec Hook'
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={current.desc || ''}
                      onChange={(e) => setter('desc', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none"
                    />
                  </div>
                </div>
              );
            })()}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingItem ? handleEditSubmit : handleAddSubmit}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25"
              >
                <Save className="w-4 h-4" />
                <span>{editingItem ? 'Save Changes' : 'Create Specimen'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit3,
  X,
  Save,
  Check,
} from 'lucide-react';
import { FaqItem, SiteSettings, DEFAULT_FAQS } from '@/lib/settings';

interface AdminFaqsProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminFaqs({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminFaqsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const [newFaq, setNewFaq] = useState<Partial<FaqItem>>({
    category: 'turnaround',
    q: '',
    a: '',
    active: true,
  });

  const faqsList = settings.faqs && settings.faqs.length > 0 ? settings.faqs : DEFAULT_FAQS;

  const filteredFaqs =
    activeCategory === 'all'
      ? faqsList
      : faqsList.filter((f) => f.category === activeCategory);

  const handleAddSubmit = () => {
    if (!newFaq.q || !newFaq.a) return;
    const item: FaqItem = {
      id: `f-${Date.now()}`,
      category: (newFaq.category as any) || 'general',
      q: newFaq.q,
      a: newFaq.a,
      active: true,
    };
    const updated = [...faqsList, item];
    const newSettings = { ...settings, faqs: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setShowAddModal(false);
    setNewFaq({ category: 'turnaround', q: '', a: '', active: true });
  };

  const handleEditSubmit = () => {
    if (!editingFaq || !editingFaq.q) return;
    const updated = faqsList.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    const newSettings = { ...settings, faqs: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setEditingFaq(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this FAQ question?')) {
      const updated = faqsList.filter((f) => f.id !== id);
      const newSettings = { ...settings, faqs: updated };
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
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">FAQs & Help Desk Knowledge Base</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {faqsList.length} Questions
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage common client inquiries about digitizing, rush orders, backing types, and payment terms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Categories' },
          { id: 'turnaround', label: 'Turnaround & Delivery' },
          { id: 'ordering', label: 'Ordering & Proofs' },
          { id: 'artwork', label: 'Artwork & Digitizing' },
          { id: 'billing', label: 'Pricing & Billing' },
          { id: 'general', label: 'General' },
        ].map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Items List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800/90 p-5 space-y-3 hover:border-slate-700 transition-all shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{faq.q}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                    {faq.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingFaq(faq)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 transition-colors"
                  title="Edit FAQ"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 pl-9 leading-relaxed border-t border-slate-800/60 pt-3">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit FAQ Modal */}
      {(showAddModal || editingFaq) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0c0e14] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-slate-100">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const current = editingFaq || newFaq;
              const setter = (key: keyof FaqItem, val: any) => {
                if (editingFaq) setEditingFaq({ ...editingFaq, [key]: val });
                else setNewFaq({ ...newFaq, [key]: val });
              };

              return (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Category</label>
                    <select
                      value={current.category || 'turnaround'}
                      onChange={(e) => setter('category', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="turnaround">Turnaround & Delivery</option>
                      <option value="ordering">Ordering & Proofs</option>
                      <option value="artwork">Artwork & Digitizing</option>
                      <option value="billing">Pricing & Billing</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Question</label>
                    <input
                      type="text"
                      value={current.q || ''}
                      onChange={(e) => setter('q', e.target.value)}
                      placeholder="e.g. How long does digital proof approval take?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-400 block mb-1">Answer</label>
                    <textarea
                      rows={5}
                      value={current.a || ''}
                      onChange={(e) => setter('a', e.target.value)}
                      placeholder="Provide clear step-by-step guidance..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed focus:outline-none"
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
                  setEditingFaq(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingFaq ? handleEditSubmit : handleAddSubmit}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25"
              >
                <Save className="w-4 h-4" />
                <span>{editingFaq ? 'Save FAQ' : 'Create FAQ'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

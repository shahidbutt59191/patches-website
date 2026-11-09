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
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#109655]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#222325]">FAQs & Help Desk Knowledge Base</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200">
              {faqsList.length} Questions
            </span>
          </div>
          <p className="text-xs text-[#74767e] mt-1">
            Manage common client inquiries about digitizing, rush orders, backing types, and payment terms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
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
                ? 'bg-[#1dbf73] text-white shadow-xs'
                : 'bg-white text-[#62646a] hover:text-[#222325] border border-[#e4e5e7]'
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
            className="rounded-2xl bg-white border border-[#e4e5e7] p-5 space-y-3 hover:border-[#1dbf73] hover:shadow-md transition-all shadow-xs"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#109655] border border-emerald-200 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#222325] mb-1">{faq.q}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-[#74767e] border border-slate-200 uppercase">
                    {faq.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingFaq(faq)}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#222325] border border-[#e4e5e7] transition-colors cursor-pointer shadow-xs"
                  title="Edit FAQ"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-[#e4e5e7] hover:border-rose-200 transition-colors cursor-pointer shadow-xs"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#62646a] pl-9 leading-relaxed border-t border-[#e4e5e7] pt-3">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit FAQ Modal */}
      {(showAddModal || editingFaq) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e5e7] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-[#222325]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e5e7]">
              <h3 className="text-base sm:text-lg font-bold text-[#222325]">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                }}
                className="p-1.5 rounded-lg text-[#74767e] hover:text-[#222325] hover:bg-slate-100 cursor-pointer"
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
                    <label className="font-semibold text-[#62646a] block mb-1">Category</label>
                    <select
                      value={current.category || 'turnaround'}
                      onChange={(e) => setter('category', e.target.value)}
                      className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                    >
                      <option value="turnaround">Turnaround & Delivery</option>
                      <option value="ordering">Ordering & Proofs</option>
                      <option value="artwork">Artwork & Digitizing</option>
                      <option value="billing">Pricing & Billing</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#62646a] block mb-1">Question</label>
                    <input
                      type="text"
                      value={current.q || ''}
                      onChange={(e) => setter('q', e.target.value)}
                      placeholder="e.g. How long does digital proof approval take?"
                      className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#62646a] block mb-1">Answer</label>
                    <textarea
                      rows={5}
                      value={current.a || ''}
                      onChange={(e) => setter('a', e.target.value)}
                      placeholder="Provide clear step-by-step guidance..."
                      className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl p-3 text-[#222325] leading-relaxed focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                    />
                  </div>
                </div>
              );
            })()}

            <div className="pt-4 border-t border-[#e4e5e7] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFaq(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#222325] border border-[#e4e5e7] font-bold text-xs cursor-pointer shadow-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingFaq ? handleEditSubmit : handleAddSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
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

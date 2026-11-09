'use client';

import React, { useState } from 'react';
import {
  Star,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Save,
  MessageSquare,
} from 'lucide-react';
import { CustomerReviewItem, SiteSettings, DEFAULT_REVIEWS } from '@/lib/settings';

interface AdminReviewsProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminReviews({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminReviewsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReview, setEditingReview] = useState<CustomerReviewItem | null>(null);

  const [newReview, setNewReview] = useState<Partial<CustomerReviewItem>>({
    author: '',
    company: '',
    country: 'USA',
    rating: 5,
    verifiedOrder: 'BD-Custom (100 pcs)',
    comment: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    featured: true,
  });

  const reviewsList = settings.reviews && settings.reviews.length > 0 ? settings.reviews : DEFAULT_REVIEWS;

  const handleAddSubmit = () => {
    if (!newReview.author) return;
    const item: CustomerReviewItem = {
      id: `r-${Date.now()}`,
      author: newReview.author || 'Anonymous Client',
      company: newReview.company || 'Verified Organization',
      country: newReview.country || 'USA',
      rating: Number(newReview.rating) || 5,
      verifiedOrder: newReview.verifiedOrder || 'BD-Custom (100 pcs)',
      comment: newReview.comment || 'Outstanding quality and very fast turnaround!',
      date: 'Just now',
      featured: true,
      avatar: newReview.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    };

    const updated = [item, ...reviewsList];
    const newSettings = { ...settings, reviews: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setShowAddModal(false);
    setNewReview({
      author: '',
      company: '',
      country: 'USA',
      rating: 5,
      verifiedOrder: 'BD-Custom (100 pcs)',
      comment: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    });
  };

  const handleEditSubmit = () => {
    if (!editingReview || !editingReview.author) return;
    const updated = reviewsList.map((r) =>
      r.id === editingReview.id ? editingReview : r
    );
    const newSettings = { ...settings, reviews: updated };
    onUpdateSettings(newSettings);
    onSaveSettings(newSettings);
    setEditingReview(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer review?')) {
      const updated = reviewsList.filter((r) => r.id !== id);
      const newSettings = { ...settings, reviews: updated };
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
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg sm:text-xl font-bold text-[#222325]">Customer Reviews & Ratings</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200">
              {reviewsList.length} Verified Reviews
            </span>
          </div>
          <p className="text-xs text-[#74767e] mt-1">
            Display social proof testimonials from corporate teams, motorcycle clubs, and tactical clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] p-5 flex flex-col justify-between space-y-4 hover:border-[#1dbf73] hover:shadow-md transition-all shadow-xs"
          >
            <div>
              {/* Stars & Verified Order Tag */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (rev.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#109655] border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{rev.verifiedOrder || 'Verified Order'}</span>
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-xs text-[#404145] italic leading-relaxed mb-4">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-3 border-t border-[#e4e5e7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-8 h-8 rounded-full object-cover border border-[#e4e5e7]"
                />
                <div>
                  <div className="text-xs font-bold text-[#222325]">{rev.author}</div>
                  <div className="text-[10px] text-[#74767e] font-mono">
                    {rev.company} • {rev.country || 'USA'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditingReview(rev)}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#222325] border border-[#e4e5e7] transition-colors cursor-pointer shadow-xs"
                  title="Edit Review"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-[#e4e5e7] hover:border-rose-200 transition-colors cursor-pointer shadow-xs"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Review Modal */}
      {(showAddModal || editingReview) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e5e7] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-[#222325]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e5e7]">
              <h3 className="text-base sm:text-lg font-bold text-[#222325]">
                {editingReview ? 'Edit Review' : 'Add New Customer Review'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingReview(null);
                }}
                className="p-1.5 rounded-lg text-[#74767e] hover:text-[#222325] hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const current = editingReview || newReview;
              const setter = (key: keyof CustomerReviewItem, val: any) => {
                if (editingReview) setEditingReview({ ...editingReview, [key]: val });
                else setNewReview({ ...newReview, [key]: val });
              };

              return (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#62646a] block mb-1">Author Name</label>
                    <input
                      type="text"
                      value={current.author || ''}
                      onChange={(e) => setter('author', e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#62646a] block mb-1">Company / Brand</label>
                      <input
                        type="text"
                        value={current.company || ''}
                        onChange={(e) => setter('company', e.target.value)}
                        placeholder="e.g. Apex Tactical"
                        className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#62646a] block mb-1">Country</label>
                      <input
                        type="text"
                        value={current.country || 'USA'}
                        onChange={(e) => setter('country', e.target.value)}
                        className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-[#62646a] block mb-1">Rating (1 to 5 Stars)</label>
                      <select
                        value={current.rating || 5}
                        onChange={(e) => setter('rating', parseInt(e.target.value, 10))}
                        className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                      >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Great)</option>
                        <option value="3">3 Stars (Average)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-[#62646a] block mb-1">Verified Order Badge</label>
                      <input
                        type="text"
                        value={current.verifiedOrder || ''}
                        onChange={(e) => setter('verifiedOrder', e.target.value)}
                        placeholder="e.g. BD-Custom (100 pcs)"
                        className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#62646a] block mb-1">Avatar Image URL</label>
                    <input
                      type="text"
                      value={current.avatar || ''}
                      onChange={(e) => setter('avatar', e.target.value)}
                      className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#62646a] block mb-1">Review Comment</label>
                    <textarea
                      rows={4}
                      value={current.comment || ''}
                      onChange={(e) => setter('comment', e.target.value)}
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
                  setEditingReview(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#222325] border border-[#e4e5e7] font-bold text-xs cursor-pointer shadow-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingReview ? handleEditSubmit : handleAddSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingReview ? 'Save Review' : 'Create Review'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

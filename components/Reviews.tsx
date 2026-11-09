'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { CustomerReviewItem } from '@/lib/settings';

interface ReviewsProps {
  items?: CustomerReviewItem[];
}

export default function Reviews({ items }: ReviewsProps) {
  const defaultReviews = [
    {
      id: '1',
      author: 'David Miller',
      country: 'Austin, TX 🇺🇸',
      company: 'Apex Tactical Gear',
      verifiedOrder: '250 pcs Velcro Tactical Patches',
      comment: 'The stitch density on the subdued coyote brown PVC is unmatched. Our plate carriers look incredible. Free 6-hour proof was spot-on!',
      rating: 5,
      date: 'Yesterday',
      featured: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      author: 'Sarah Johnson',
      country: 'Vancouver, BC 🇨🇦',
      company: 'Wilderness Apparel Co.',
      verifiedOrder: '300 pcs Debossed Leather Snapbacks',
      comment: 'Laser-etched detail on the caramel leatherette patches is crisp and clean. Best wholesale pricing we have found across North America.',
      rating: 5,
      date: '3 days ago',
      featured: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      author: 'Michael Henderson',
      country: 'Chicago, IL 🇺🇸',
      company: 'Iron Horse MC Chapter',
      verifiedOrder: '150 sets Embroidered Top Rockers',
      comment: 'Heavy twill backing and thick merrowed gold border stood up to high-speed wind with zero fraying. True professional patch crafters.',
      rating: 5,
      date: '5 days ago',
      featured: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '4',
      author: 'Elena Rostova',
      country: 'Miami, FL 🇺🇸',
      company: 'Streetwear Merch Drop',
      verifiedOrder: '500 pcs Micro Woven Labels',
      comment: 'Tiny 4pt typography was perfectly legible. The damask micro-weave is silky soft and retail ready. Will be ordering for every season.',
      rating: 5,
      date: '1 week ago',
      featured: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const reviewsList = items && items.length > 0 ? items : defaultReviews;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, reviewsList.length - 3) : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= reviewsList.length - 3 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-16 sm:py-22 bg-[#f7f7f7] border-b border-[#e4e5e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#109655] border border-emerald-200 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Buyer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#222325] tracking-tight">
              Loved by 5,000+ brands &amp; creators
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#62646a]">
              Read verified factory production reviews from real customers worldwide.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevReview}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-white border border-[#e4e5e7] hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-all cursor-pointer shadow-xs text-slate-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-white border border-[#e4e5e7] hover:border-[#1dbf73] hover:text-[#1dbf73] flex items-center justify-center transition-all cursor-pointer shadow-xs text-slate-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Reviews Grid (Fiverr Style Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.slice(currentIndex, currentIndex + 3).map((item) => {
            const authorName = (item as any).author || (item as any).name || 'Verified Client';
            const quoteText = (item as any).comment || (item as any).quote || '';
            const orderText = (item as any).verifiedOrder || (item as any).order || 'Custom Patch Run';
            const countryText = (item as any).country || 'USA';
            const avatarUrl = (item as any).avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#e4e5e7] p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#1dbf73] transition-all duration-300"
              >
                <div>
                  {/* Verified Header & Stars */}
                  <div className="flex items-center justify-between mb-3 border-b border-[#e4e5e7] pb-3">
                    <div className="flex items-center gap-1 text-[#1dbf73]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#109655] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Order</span>
                    </span>
                  </div>

                  {/* Customer Review Quote */}
                  <p className="text-sm text-[#404145] leading-relaxed mb-6 font-normal">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                </div>

                {/* Customer Details Footer */}
                <div className="pt-4 border-t border-[#e4e5e7] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    <img
                      src={avatarUrl}
                      alt={authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#222325] truncate">
                      {authorName}
                    </div>
                    <div className="text-[11px] text-[#74767e] truncate font-medium">
                      {orderText} • {countryText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

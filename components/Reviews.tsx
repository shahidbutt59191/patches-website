'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'David Miller',
      country: 'USA',
      company: 'Apex Tactical Gear',
      order: '250 Embroidered Shield Patches',
      quote: 'Excellent quality and super fast delivery. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'DM',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      country: 'Canada',
      company: 'Wilderness Explorers Club',
      order: '150 Round Woven Mountain Badges',
      quote: 'Amazing patches! The colors are perfect. Will order again.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      initials: 'SJ',
    },
    {
      id: 3,
      name: 'Ahmed Khan',
      country: 'UK',
      company: 'Khan Motorsports MC',
      order: '500 Iron-On Custom Rockers',
      quote: 'Professional service and outstanding quality.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      initials: 'AK',
    },
    {
      id: 4,
      name: 'Michael Rossi',
      country: 'Australia',
      company: 'Outback Adventures',
      order: '300 Laser Debossed Leather Patches',
      quote: 'Turnaround was under 10 days and stitch density is unmatched!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      initials: 'MR',
    },
    {
      id: 5,
      name: 'Elena Rostova',
      country: 'Germany',
      company: 'Cyberpunk Apparel Brand',
      order: '200 Glow-in-the-Dark Velcro Patches',
      quote: 'The stitch precision on tiny text is incredible. 10/10 experience.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'ER',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Luxury Container matching screenshot */}
        <div className="relative rounded-3xl bg-[#111318] border border-slate-800 p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
          
          {/* Subtle Fabric Grid */}
          <div className="absolute inset-0 bg-fabric-pattern opacity-40 pointer-events-none" />

          {/* Top Rating Badge */}
          <div className="relative z-10 flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
              <span>4.9 / 5.0 Rating Across 3,840+ Direct Factory Orders</span>
            </div>
          </div>

          {/* Heading with Orange Accents */}
          <div className="relative z-10 text-center mb-10 flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 sm:w-20 bg-gradient-to-r from-transparent to-orange-500 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              What Our Customers Say
            </h2>
            <span className="h-0.5 w-10 sm:w-20 bg-gradient-to-l from-transparent to-orange-500 rounded-full" />
          </div>

          {/* Reviews Carousel Wrapper */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            
            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={prevReview}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-orange-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 3 Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {reviews.slice(currentIndex, currentIndex + 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#181b22] border border-slate-800/90 p-6 flex flex-col justify-between hover:border-orange-500/60 hover:-translate-y-1 transition-all duration-300 shadow-inner group"
                >
                  
                  {/* Verified & Order Tag */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-4 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle className="w-3 h-3" /> Verified Customer
                    </span>
                    <span className="font-mono text-slate-500 truncate max-w-[140px]">
                      {item.order}
                    </span>
                  </div>

                  {/* Customer Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6 group-hover:text-white transition-colors">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Customer Info & Orange Stars */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-600 flex items-center justify-center text-xs font-bold text-white border-2 border-orange-500 shrink-0">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span>{item.initials}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {item.company} • {item.country}
                        </div>
                      </div>
                    </div>

                    {/* 5 Orange Stars */}
                    <div className="flex items-center gap-0.5 text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      ))}
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-orange-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

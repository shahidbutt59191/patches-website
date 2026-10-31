'use client';

import React, { useState } from 'react';

const BACKINGS_DATA = [
  {
    id: 'velcro',
    name: 'Hook & Loop (Velcro)',
    badge: 'Tactical Favorite',
    icon: '🛡️',
    desc: 'Pre-sewn military male hook backing with free matching female loop swatch. Perfect for tactical vests, plate carriers, uniforms, and backpacks.',
    extraCost: '+$0.50 / ea',
    pros: ['Interchangeable instantly', 'Washable & rugged', 'Includes matching female fabric piece'],
    bestFor: 'Military, Law Enforcement, Airsoft, Tactical Gear',
  },
  {
    id: 'iron-on',
    name: 'Heat-Seal Thermal Iron-On',
    badge: 'Easiest Application',
    icon: '🔥',
    desc: 'Industrial-grade heat-activated glue backing. Bonds permanently to cotton, denim, twill, and polyester blends using a standard home iron or heat press machine.',
    extraCost: '+$0.25 / ea',
    pros: ['Permanent strong bond', 'Applies in 20 seconds', 'Zero sewing required'],
    bestFor: 'Denim Jackets, Hoodies, Caps, Cotton Uniforms',
  },
  {
    id: 'sew-on',
    name: 'Reinforced Plain Sew-On',
    badge: 'Maximum Durability',
    icon: '🧵',
    desc: 'Heavy-duty non-woven twill backing ready for needle stitching. Offers the strongest permanent attachment that withstands extreme industrial laundering.',
    extraCost: 'FREE (Included)',
    pros: ['Withstands 100+ industrial wash cycles', 'Flexible & soft drape', 'Traditional biker cut standard'],
    bestFor: 'Biker Leathers, Canvas Bags, Martial Arts Gis',
  },
  {
    id: 'peel-stick',
    name: '3M Industrial Peel & Stick',
    badge: 'Temporary & Events',
    icon: '🏷️',
    desc: 'Heavy-tack pressure-sensitive 3M adhesive backing with pull-tab liner. Bonds firmly without heat or sewing. Can also be sewn on later for permanence.',
    extraCost: '+$0.35 / ea',
    pros: ['Instant peel and stick', 'Ideal for trade shows & races', 'Adheres to wood, glass, metal & fabric'],
    bestFor: 'Conferences, Trade Shows, Hat Promos, Temporary Badges',
  },
  {
    id: 'magnetic',
    name: 'Dual-Magnet Pinless Backing',
    badge: 'Zero Fabric Damage',
    icon: '🧲',
    desc: 'Powerful neodymium magnet bar securely clamps through clothing without puncturing delicate garments, luxury blazers, or silk lapels.',
    extraCost: '+$0.95 / ea',
    pros: ['Leaves zero holes or pin punctures', 'Ultra-strong neodymium hold', 'Instant removal'],
    bestFor: 'Corporate Blazers, Suits, Formal Regalia, Security Badges',
  },
  {
    id: 'borders',
    name: 'Merrowed vs Laser-Cut Borders',
    badge: 'Edge Finishing',
    icon: '✂️',
    desc: 'A Merrowed border is a classic heavy rolled overlock edge (1/8" thick) best for circles & shields. Laser-cut is a smooth heat-sealed edge for custom die-cut shapes.',
    extraCost: 'Standard Included',
    pros: ['Merrowed: Traditional raised edge', 'Laser-Cut: Complex die-cut contours', '100% fray resistant'],
    bestFor: 'All Shapes & Custom Die-Cut Silhouettes',
  },
];

export default function BackingsGuide() {
  const [activeTab, setActiveTab] = useState('velcro');

  return (
    <section id="backings-section" className="py-24 bg-tactical-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-3">
            <span>Attachment Hardware Guide</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Backing Types & Border Finishes
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Choose the ideal attachment mechanism engineered for your specific uniform, tactical gear, or apparel fabric.
          </p>
        </div>

        {/* Backing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BACKINGS_DATA.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                activeTab === item.id
                  ? 'border-amber-500/60 bg-slate-900/90 shadow-xl shadow-amber-500/10 -translate-y-1'
                  : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{item.name}</h3>
                <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">{item.extraCost}</div>
                
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  {item.pros.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-amber-400">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <strong className="text-white">Best For:</strong> {item.bestFor}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

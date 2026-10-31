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
    <section id="backings" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching EmbroidPro */}
        <div className="flex flex-col gap-2.5 text-center items-center mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Attachment Hardware Guide
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-3xl">
            Backing Types &amp; Border Finishes
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl text-slate-400 mx-auto">
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
                  ? 'border-indigo-500/60 bg-[#0e1326] shadow-xl shadow-indigo-500/15 -translate-y-1'
                  : 'border-white/10 bg-[#0c1020] hover:border-white/20'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{item.name}</h3>
                <div className="text-xs font-mono font-bold text-indigo-400 mt-0.5">{item.extraCost}</div>
                
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-300 font-mono">
                  {item.pros.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-2 text-[11px]">
                      <span className="text-indigo-400">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <strong className="text-white">Best For:</strong> {item.bestFor}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

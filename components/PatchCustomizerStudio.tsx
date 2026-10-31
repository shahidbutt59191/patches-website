'use client';

import React, { useState } from 'react';

export const SHAPES = [
  { id: 'shield', name: 'Tactical Shield', svgPath: 'M 150 20 L 250 50 L 250 170 C 250 240, 150 280, 150 280 C 150 280, 50 240, 50 170 L 50 50 Z' },
  { id: 'circle', name: 'Classic Round', svgPath: 'M 150,150 m -115,0 a 115,115 0 1,0 230,0 a 115,115 0 1,0 -230,0' },
  { id: 'hexagon', name: 'MOLLE Hexagon', svgPath: 'M 150 25 L 245 80 L 245 220 L 150 275 L 55 220 L 55 80 Z' },
  { id: 'rectangle', name: 'Name Tape & Bar', svgPath: 'M 40 70 L 260 70 A 15 15 0 0 1 275 85 L 275 215 A 15 15 0 0 1 260 230 L 40 230 A 15 15 0 0 1 25 215 L 25 85 A 15 15 0 0 1 40 70 Z' },
  { id: 'diamond', name: 'Biker Diamond', svgPath: 'M 150 25 L 265 150 L 150 275 L 35 150 Z' },
  { id: 'crest', name: 'Varsity Crest', svgPath: 'M 45 40 L 255 40 L 255 190 Q 255 270 150 280 Q 45 270 45 190 Z' }
];

export const ICONS = [
  {
    id: 'eagle',
    name: 'Majestic Eagle',
    svg: (
      <g>
        <path d="M150 95 C140 105 130 115 110 118 C100 120 85 115 75 125 C65 135 68 155 78 165 C90 175 115 170 125 180 C135 190 140 210 150 215 C160 210 165 190 175 180 C185 170 210 175 222 165 C232 155 235 135 225 125 C215 115 200 120 190 118 C170 115 160 105 150 95 Z" fill="currentColor" opacity="0.9" />
        <path d="M142 125 C145 118 155 118 158 125 L154 138 C152 142 148 142 146 138 Z" fill="#f59e0b" />
        <circle cx="138" cy="118" r="3" fill="#ffffff" />
        <circle cx="162" cy="118" r="3" fill="#ffffff" />
        <path d="M110 145 Q150 165 190 145" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'skull',
    name: 'Tactical Skull',
    svg: (
      <g>
        <path d="M110 105 C110 80 190 80 190 105 C190 130 185 150 175 160 L175 190 L125 190 L125 160 C115 150 110 130 110 105 Z" fill="currentColor" />
        <ellipse cx="132" cy="120" rx="10" ry="14" fill="#0b0f17" />
        <ellipse cx="168" cy="120" rx="10" ry="14" fill="#0b0f17" />
        <path d="M146 142 L150 135 L154 142 Z" fill="#0b0f17" />
        <line x1="135" y1="180" x2="135" y2="190" stroke="#0b0f17" strokeWidth="3" />
        <line x1="145" y1="180" x2="145" y2="190" stroke="#0b0f17" strokeWidth="3" />
        <line x1="155" y1="180" x2="155" y2="190" stroke="#0b0f17" strokeWidth="3" />
        <line x1="165" y1="180" x2="165" y2="190" stroke="#0b0f17" strokeWidth="3" />
      </g>
    ),
  },
  {
    id: 'wolf',
    name: 'Alpha Wolf',
    svg: (
      <g>
        <polygon points="150,75 175,120 205,95 190,145 220,175 175,185 150,225 125,185 80,175 110,145 95,95 125,120" fill="currentColor" />
        <polygon points="135,135 145,145 130,148" fill="#f59e0b" />
        <polygon points="165,135 155,145 170,148" fill="#f59e0b" />
        <polygon points="146,180 154,180 150,192" fill="#0b0f17" />
      </g>
    ),
  },
  {
    id: 'wings',
    name: 'Biker Wings',
    svg: (
      <g>
        <path d="M50 140 C80 110 130 130 150 160 C170 130 220 110 250 140 C210 160 180 200 150 200 C120 200 90 160 50 140 Z" fill="currentColor" />
        <circle cx="150" cy="145" r="16" fill="#f59e0b" />
        <polygon points="150,135 155,145 145,145" fill="#111827" />
        <path d="M80 145 C100 130 130 150 140 165" stroke="#ffffff" strokeWidth="2" fill="none" />
        <path d="M220 145 C200 130 170 150 160 165" stroke="#ffffff" strokeWidth="2" fill="none" />
      </g>
    ),
  },
];

export default function PatchCustomizerStudio() {
  const [shapeId, setShapeId] = useState('shield');
  const [styleId, setStyleId] = useState<'embroidered' | 'pvc' | 'leather' | 'chenille'>('embroidered');
  const [fabricColor, setFabricColor] = useState('#0b0f17');
  const [borderColor, setBorderColor] = useState('#f59e0b');
  const [threadColor, setThreadColor] = useState('#f1f5f9');
  const [iconId, setIconId] = useState('eagle');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('TACTICAL SQUAD');
  const [bottomText, setBottomText] = useState('EST. 2026');
  const [backing, setBacking] = useState<'velcro' | 'iron-on' | 'sew-on'>('velcro');
  const [isFlipped, setIsFlipped] = useState(false);
  const [stage, setStage] = useState<'studio' | 'backpack' | 'jacket' | 'hat'>('studio');
  const [quantity, setQuantity] = useState(100);

  const selectedShape = SHAPES.find((s) => s.id === shapeId) || SHAPES[0];
  const selectedIcon = ICONS.find((i) => i.id === iconId) || ICONS[0];

  // Price Calculation
  const baseRate = styleId === 'pvc' ? 2.45 : styleId === 'chenille' ? 2.85 : styleId === 'leather' ? 2.25 : 1.85;
  const backingCost = backing === 'velcro' ? 0.50 : backing === 'iron-on' ? 0.25 : 0;
  const discountFactor = quantity >= 500 ? 0.56 : quantity >= 250 ? 0.65 : quantity >= 100 ? 0.74 : quantity >= 50 ? 0.85 : 1;
  const unitPrice = ((baseRate + backingCost) * discountFactor).toFixed(2);
  const totalPrice = (Number(unitPrice) * quantity).toFixed(2);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="customizer-studio" className="relative py-24 bg-gradient-to-b from-slate-950 via-tactical-950 to-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/80">
      
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-96 w-[700px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 font-mono uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            3D Interactive Patch Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Design & Customize Your Patch Live
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Real-time Tajima embroidery stitch simulation, PVC depth sculpting, front/back flip, and instant wholesale price calculations.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Patch Visual Stage (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Stage Selector Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs font-mono mb-4 shadow-lg">
              {(['studio', 'backpack', 'jacket', 'hat'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all ${
                    stage === s ? 'bg-amber-500 text-black shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* The Patch Canvas Stage */}
            <div
              className={`w-full aspect-square max-w-[420px] rounded-3xl border border-slate-800 flex items-center justify-center relative p-8 shadow-2xl transition-all duration-500 overflow-hidden ${
                stage === 'backpack'
                  ? 'bg-[#1b222d] border-slate-700'
                  : stage === 'jacket'
                  ? 'bg-[#18201a] border-emerald-950'
                  : stage === 'hat'
                  ? 'bg-[#291e18] border-amber-950'
                  : 'bg-gradient-to-b from-slate-900 to-slate-950'
              }`}
            >
              {/* Flip Button */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-amber-400 hover:bg-slate-800 transition-all shadow-md"
              >
                <span>🔄</span>
                <span>{isFlipped ? 'Show Front' : 'Show Backing'}</span>
              </button>

              {/* Front Face (Patch SVG) */}
              {!isFlipped ? (
                <div className="w-full h-full flex items-center justify-center transition-all duration-300">
                  <svg viewBox="0 0 300 300" className="w-72 h-72 select-none filter drop-shadow-2xl">
                    <defs>
                      <filter id="threadEmboss" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                        <feOffset in="blur" dx="1" dy="2" result="offset" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.5" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode in="offset" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <pattern id="twillWeave" width="4" height="4" patternUnits="userSpaceOnUse">
                        <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                      </pattern>

                      <path id="topTextCurve" d="M 65 140 C 75 70, 225 70, 235 140" fill="none" />
                      <path id="bottomTextCurve" d="M 75 190 C 115 250, 185 250, 225 190" fill="none" />

                      <clipPath id="patchClip">
                        <path d={selectedShape.svgPath} />
                      </clipPath>
                    </defs>

                    {/* Inside Fabric & Twill */}
                    <g clipPath="url(#patchClip)">
                      <path d={selectedShape.svgPath} fill={fabricColor} />
                      <rect x="0" y="0" width="300" height="300" fill="url(#twillWeave)" />

                      {/* Inner Stitching Contour */}
                      <path
                        d={selectedShape.svgPath}
                        fill="none"
                        stroke={borderColor}
                        strokeWidth="2.5"
                        strokeDasharray={styleId === 'pvc' ? '0' : '4,2'}
                        transform="scale(0.92) translate(12, 12)"
                        opacity="0.85"
                      />

                      {/* Center Clipart / Logo */}
                      <g filter="url(#threadEmboss)">
                        {customImage ? (
                          <image href={customImage} x="95" y="95" width="110" height="110" preserveAspectRatio="xMidYMid meet" />
                        ) : (
                          <g fill={threadColor} color={threadColor}>
                            {selectedIcon.svg}
                          </g>
                        )}
                      </g>

                      {/* Top Arc Text */}
                      {topText && (
                        <text
                          fontFamily="'Montserrat', sans-serif"
                          fontWeight="900"
                          fontSize="14"
                          fill={threadColor}
                          letterSpacing="3"
                          filter="url(#threadEmboss)"
                        >
                          <textPath href="#topTextCurve" startOffset="50%" textAnchor="middle">
                            {topText}
                          </textPath>
                        </text>
                      )}

                      {/* Bottom Arc Text */}
                      {bottomText && (
                        <text
                          fontFamily="'Montserrat', sans-serif"
                          fontWeight="800"
                          fontSize="12"
                          fill={borderColor}
                          letterSpacing="2"
                          filter="url(#threadEmboss)"
                        >
                          <textPath href="#bottomTextCurve" startOffset="50%" textAnchor="middle">
                            {bottomText}
                          </textPath>
                        </text>
                      )}

                      {/* Star Accents */}
                      <polygon points="75,150 78,156 84,156 79,160 81,166 75,162 70,166 72,160 67,156 73,156" fill={borderColor} />
                      <polygon points="225,150 228,156 234,156 229,160 231,166 225,162 220,166 222,160 217,156 223,156" fill={borderColor} />
                    </g>

                    {/* Outer Overlock Merrowed Border */}
                    <path d={selectedShape.svgPath} fill="none" stroke="#000000" strokeWidth="12" opacity="0.65" />
                    <path d={selectedShape.svgPath} fill="none" stroke={borderColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={selectedShape.svgPath} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3,3" />
                  </svg>
                </div>
              ) : (
                /* Backing Texture (Hook Velcro or Iron-On) */
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-900/90 rounded-2xl border border-slate-700 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-3xl mb-3 shadow-inner">
                    {backing === 'velcro' ? '🧲' : backing === 'iron-on' ? '🔥' : '🧵'}
                  </div>
                  <div className="font-mono text-sm font-black text-amber-400 uppercase tracking-wider">
                    {backing === 'velcro' ? 'Tactical Hook & Loop (Velcro)' : backing === 'iron-on' ? 'Heat-Seal Thermal Iron-On Film' : 'Heavy Reinforced Plain Sew-On'}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs font-mono">
                    {backing === 'velcro'
                      ? 'Pre-sewn military male hook backing with free matching female loop swatch for jackets & gear.'
                      : backing === 'iron-on'
                      ? 'Industrial thermo-adhesive film bonds permanently to cotton, denim & fleece via heat press.'
                      : 'Heavy plain backing engineered for direct sewing onto motorcycle leather & workwear.'}
                  </p>
                </div>
              )}
            </div>

            {/* Instant Price Badge */}
            <div className="w-full max-w-[420px] mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Wholesale Price</div>
                <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1.5">
                  <span className="text-amber-400">${unitPrice}</span>
                  <span className="text-xs text-slate-400 font-normal">/ea</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">{quantity} Pcs Total</div>
                <div className="text-lg font-black text-emerald-400 font-mono">${totalPrice}</div>
              </div>
            </div>

            {/* Direct Order CTA */}
            <a
              href="#order-form"
              className="w-full max-w-[420px] mt-3 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 text-center transition-all hover:scale-105"
            >
              Order This Custom Patch Design ↗
            </a>
          </div>

          {/* RIGHT: Live Design Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
            
            {/* Control 1: Select Shape */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                1. Select Patch Shape
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShapeId(s.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      shapeId === s.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold shadow-xs'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] truncate">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Select Material Style */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                2. Manufacturing Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'embroidered', name: 'Embroidered', badge: 'Classic 100%' },
                  { id: 'pvc', name: '3D PVC Rubber', badge: 'Mil-Spec' },
                  { id: 'leather', name: 'Leatherette', badge: 'Laser Debossed' },
                  { id: 'chenille', name: 'Chenille', badge: 'Varsity Loop' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStyleId(st.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      styleId === st.id
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-xs'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{st.name}</div>
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5">{st.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Colors (Fabric, Border, Thread) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                3. Choose Colors (Fabric Twill, Border & Thread)
              </label>
              <div className="grid grid-cols-3 gap-3">
                
                {/* Fabric Color */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Fabric Twill</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fabricColor}
                      onChange={(e) => setFabricColor(e.target.value)}
                      className="h-8 w-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="font-mono text-xs text-white uppercase">{fabricColor}</span>
                  </div>
                </div>

                {/* Border Color */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Merrow Border</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="h-8 w-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="font-mono text-xs text-white uppercase">{borderColor}</span>
                  </div>
                </div>

                {/* Thread Color */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Thread Stitch</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={threadColor}
                      onChange={(e) => setThreadColor(e.target.value)}
                      className="h-8 w-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="font-mono text-xs text-white uppercase">{threadColor}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Control 4: Text Curves (Top & Bottom Arc Text) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                4. Custom Curved Typography
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Top Arc Text (Upper Banner)</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value.toUpperCase())}
                    placeholder="e.g. TACTICAL SQUAD"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Bottom Arc Text (Lower Ribbon)</label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                    placeholder="e.g. EST. 2026"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Control 5: Center Graphic (Upload Logo or Preset Icon) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  5. Center Graphic / Custom Logo
                </label>
                {customImage && (
                  <button
                    onClick={() => setCustomImage(null)}
                    className="text-[10px] font-mono text-rose-400 hover:underline"
                  >
                    Reset to Clipart
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {ICONS.map((ic) => (
                  <button
                    key={ic.id}
                    onClick={() => {
                      setCustomImage(null);
                      setIconId(ic.id);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      !customImage && iconId === ic.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs truncate">{ic.name}</div>
                  </button>
                ))}
              </div>

              {/* Upload Your Own Logo */}
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-3 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="studio-file-upload"
                />
                <label
                  htmlFor="studio-file-upload"
                  className="cursor-pointer text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-2"
                >
                  <span>📁</span>
                  <span>{customImage ? 'Change Uploaded Logo File' : 'Upload Your Logo / Artwork File onto Patch'}</span>
                </label>
                <div className="text-[10px] font-mono text-slate-500 mt-1">PNG, JPG, SVG, or AI supported</div>
              </div>
            </div>

            {/* Control 6: Backing Selection & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  6. Backing Hardware
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'velcro', name: 'Velcro' },
                    { id: 'iron-on', name: 'Iron-On' },
                    { id: 'sew-on', name: 'Sew-On' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBacking(b.id as any)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                        backing === b.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  7. Quantity: <span className="text-amber-400">{quantity} pcs</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>10 pcs</span>
                  <span>100 pcs (26% Off)</span>
                  <span>1,000 pcs (52% Off)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

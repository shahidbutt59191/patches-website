'use client';

import React, { useState } from 'react';
import { Compass, Check, ArrowRight, RotateCcw, Sparkles, Layers, Shield, HelpCircle } from 'lucide-react';

interface ApplicationOption {
  id: string;
  label: string;
  sub: string;
  icon: string;
}

interface ArtStyleOption {
  id: string;
  label: string;
  sub: string;
  icon: string;
}

const APPLICATIONS: ApplicationOption[] = [
  { id: 'hats', label: 'Snapback Caps & Beanies', sub: 'Trucker mesh, curved brim, knit beanies', icon: '🧢' },
  { id: 'tactical', label: 'Tactical Gear & Vests', sub: 'MOLLE plate carriers, duty bags, combat uniforms', icon: '🛡️' },
  { id: 'biker', label: 'Biker Leathers & Denim', sub: 'Motorcycle club cuts, heavy denim, road jackets', icon: '🏍️' },
  { id: 'streetwear', label: 'Streetwear & Varsity', sub: 'Collegiate letterman jackets, oversized hoodies', icon: '🏆' },
  { id: 'corporate', label: 'Corporate & Workwear', sub: 'Polo shirts, technician uniforms, staff apparel', icon: '👔' },
  { id: 'outdoor', label: 'Outdoor Packs & Duffels', sub: 'Waterproof backpacks, hiking gear, tool bags', icon: '🎒' },
];

const ART_STYLES: ArtStyleOption[] = [
  { id: 'classic_thread', label: 'Classic Thread Texture', sub: 'Bold emblem, traditional embroidered look', icon: '🧵' },
  { id: 'micro_detail', label: 'Micro Text & Fine Lines', sub: 'Tiny typography (<2mm), intricate crest line-art', icon: '🔍' },
  { id: 'rubber_3d', label: 'Rugged Waterproof 3D', sub: 'Raised dimensional rubber, all-weather durability', icon: '💧' },
  { id: 'rustic_leather', label: 'Rustic Etched Leather', sub: 'Laser engraved debossed faux/genuine leather', icon: '🏷️' },
  { id: 'photo_gradient', label: 'Photo Realistic Gradients', sub: 'Continuous color blends, shadows, photos', icon: '🎨' },
  { id: 'plush_chenille', label: 'Plush High-Pile Fuzzy', sub: 'Varsity collegiate moss stitch on wool felt', icon: '🧸' },
];

interface Recommendation {
  patchName: string;
  badge: string;
  backing: string;
  border: string;
  why: string[];
  startingPrice: string;
  turnaround: string;
  icon: string;
}

function getRecommendation(app: string, art: string): Recommendation {
  // If user selected micro-detail, woven is supreme
  if (art === 'micro_detail') {
    return {
      patchName: 'Jacquard Micro-Thread Woven Patch',
      badge: 'Best For High Detail',
      backing: app === 'tactical' ? 'Mil-Spec Hook & Loop (Velcro)' : 'Heat-Seal Iron-On or Sew-On',
      border: 'Laser-Cut Sealed Edge (Prevents Fraying)',
      why: [
        'Uses ultra-fine 50-denier thread allowing text down to 1.5mm to remain 100% legible',
        'Flat, non-snagging profile that sits completely smooth against fabrics',
        'Weaves the artwork directly from thread scratch rather than embroidery over twill',
      ],
      startingPrice: '$1.45 / ea',
      turnaround: '6-8 Business Days',
      icon: '🎮',
    };
  }

  // If user selected rubber 3D or tactical
  if (art === 'rubber_3d' || app === 'tactical') {
    return {
      patchName: 'Mil-Spec 3D Soft PVC Rubber Patch',
      badge: 'Maximum Durability & All-Weather',
      backing: 'Mil-Spec Hook Velcro (Pre-sewn into recessed perimeter channel)',
      border: 'Recessed Sewing Border Canal',
      why: [
        '100% impervious to torrential rain, mud, saltwater, and extreme UV fading',
        'Multi-tiered 3D dimensional relief with razor-sharp sculpted edges',
        'Standard issue for military morale, search & rescue, and extreme outdoor apparel',
      ],
      startingPrice: '$2.15 / ea',
      turnaround: '7-9 Business Days',
      icon: '🛡️',
    };
  }

  // If user selected rustic leather or hats
  if (art === 'rustic_leather' || (app === 'hats' && art !== 'photo_gradient' && art !== 'plush_chenille')) {
    return {
      patchName: 'Laser-Engraved Debossed Leatherette Patch',
      badge: 'Premier Headwear Standard',
      backing: '3M Heavy-Duty Heat Seal or Industrial Sew-On',
      border: 'Perimeter Contrast Laser Stitch Channel',
      why: [
        'Matches the curved front crown of trucker snapbacks and cuff of knit beanies seamlessly',
        'Fiber laser etched with rich caramel, dark chocolate, or charcoal tone-on-tone contrast',
        'Resistant to sweat, grease, and repeated outdoor wear while aging with rich patina',
      ],
      startingPrice: '$1.95 / ea',
      turnaround: '4-6 Business Days',
      icon: '🏷️',
    };
  }

  // If user selected plush chenille or varsity
  if (art === 'plush_chenille' || app === 'streetwear') {
    return {
      patchName: 'Vintage Varsity Wool Chenille Patch',
      badge: 'Authentic Collegiate Heritage',
      backing: 'Reinforced Heat-Seal Iron-On with Double-Felt Base',
      border: 'Double-Layer Stiff Wool Felt Edge',
      why: [
        'Timeless looped moss-stitch pile that creates high-volume tactile warmth',
        'Supported by heavy dual-layer felt backing to maintain shape over heavy coats and hoodies',
        'Gold bullion and metallic thread accents available for championship emblems',
      ],
      startingPrice: '$2.45 / ea',
      turnaround: '6-8 Business Days',
      icon: '🏆',
    };
  }

  // If user selected photo gradient
  if (art === 'photo_gradient') {
    return {
      patchName: 'Dye-Sublimated Photographic Patch',
      badge: 'Full-Color Photographic Clarity',
      backing: 'Heat-Seal Iron-On or Velcro Hook & Loop',
      border: 'Overlocked Merrowed Thread Border',
      why: [
        'Infuses dyes at 400°F directly into polyester twill for permanent zero-fade colors',
        'Captures complex multi-color gradients, album covers, and photorealistic art',
        'Finished with a traditional merrowed embroidered edge for classic patch tactile framing',
      ],
      startingPrice: '$1.55 / ea',
      turnaround: '5-7 Business Days',
      icon: '🎨',
    };
  }

  // Default: Classic Embroidered
  return {
    patchName: '100% Tajima High-Density Embroidered Patch',
    badge: 'Industry Universal Standard',
    backing: app === 'biker' ? 'Heavy Sew-On Plastic Backing' : 'Iron-On Heat Seal or Velcro',
    border: 'Traditional Merrowed Overlock Stitch Border',
    why: [
      'Dense Madeira polyester thread construction woven into heavy duck twill base',
      'The iconic, timeless patch look with rich 3D embroidery sheen and zero fraying',
      'Universally recognized for biker vests, corporate polo emblems, and uniform badges',
    ],
    startingPrice: '$1.65 / ea',
    turnaround: '5-7 Business Days',
    icon: '🧵',
  };
}

export default function PatchAdvisorWizard() {
  const [selectedApp, setSelectedApp] = useState<string>('hats');
  const [selectedArt, setSelectedArt] = useState<string>('classic_thread');
  const [step, setStep] = useState<number>(1);

  const recommendation = getRecommendation(selectedApp, selectedArt);

  const handleReset = () => {
    setSelectedApp('hats');
    setSelectedArt('classic_thread');
    setStep(1);
  };

  return (
    <section id="patch-advisor" className="py-20 sm:py-28 bg-[#070913] border-b border-white/10 relative scroll-mt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.16em] bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-mono mb-3">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Smart Patch Advisor
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.15]">
            Unsure Which Patch Style Fits Your Project?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Tell us where you plan to attach your patches and your artwork style. Our engineering logic calculates the exact material, backing, and border suited for your use-case.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0b0f22] border border-white/15 p-6 sm:p-10 shadow-2xl">
          
          {/* Step Progress Indicators */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 pb-6 border-b border-white/10 text-xs font-mono">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                step === 1 ? 'bg-indigo-500/20 text-white font-bold border border-indigo-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                1
              </span>
              <span className="truncate">Application</span>
            </button>

            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                step === 2 ? 'bg-indigo-500/20 text-white font-bold border border-indigo-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                2
              </span>
              <span className="truncate">Art Style</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                step === 3 ? 'bg-indigo-500/20 text-white font-bold border border-indigo-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                3
              </span>
              <span className="truncate">Recommendation</span>
            </button>
          </div>

          {/* STEP 1: Application */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  Question 1 of 2
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Where will your patches be attached?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Different garments require specific flexibility, adhesive strength, and weather resistance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
                {APPLICATIONS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApp(app.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      selectedApp === app.id
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl mb-3 block">{app.icon}</span>
                      {selectedApp === app.id && (
                        <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{app.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{app.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg"
                >
                  <span>Next: Choose Artwork Style</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Art Style */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  Question 2 of 2
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  What best describes your logo or design?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Thread physical properties depend on line-thickness, gradient blending, and dimension.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
                {ART_STYLES.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArt(art.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      selectedArt === art.id
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl mb-3 block">{art.icon}</span>
                      {selectedArt === art.id && (
                        <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{art.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{art.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  ← Back to Application
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg"
                >
                  <span>Generate Recommended Spec</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Instant Recommendation Output */}
          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Factory Specification Match Found
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-[#121835] to-[#0c1022] p-6 sm:p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-4xl shadow-inner">
                      {recommendation.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                        {recommendation.badge}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {recommendation.patchName}
                      </h4>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono text-xs">
                    <span className="text-slate-400 block text-[10px]">ESTIMATED RATE:</span>
                    <span className="text-base font-bold text-emerald-400">{recommendation.startingPrice}</span>
                    <span className="text-slate-500 block text-[10px] mt-0.5">{recommendation.turnaround}</span>
                  </div>
                </div>

                {/* Technical Specs Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold mb-1">
                      <Layers className="w-4 h-4" />
                      <span>RECOMMENDED BACKING</span>
                    </div>
                    <div className="text-xs text-white font-medium">{recommendation.backing}</div>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold mb-1">
                      <Shield className="w-4 h-4" />
                      <span>RECOMMENDED BORDER</span>
                    </div>
                    <div className="text-xs text-white font-medium">{recommendation.border}</div>
                  </div>
                </div>

                {/* Engineering Rationale */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Why our production team recommends this:
                  </span>
                  {recommendation.why.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="text-indigo-400 mt-0.5">✦</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href="#order"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex-1 sm:flex-initial text-center"
                  >
                    <span>Configure &amp; Order This Spec</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#customizer-studio"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex-1 sm:flex-initial text-center"
                  >
                    <span>Preview in 3D Customizer Studio</span>
                  </a>
                </div>

              </div>

              <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>Want a human engineer to review your artwork? Our design team provides free 6-hour digitizing assessments.</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

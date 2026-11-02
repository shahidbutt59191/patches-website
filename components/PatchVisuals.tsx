'use client';

import React from 'react';

// 1. Mountain Shield Patch ("YOUR LOGO", Mountain Peaks, Pine Trees, Orange Border)
export function MountainShieldPatch({ className = "w-64 h-72" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 240 280" className="w-full h-full">
        <defs>
          {/* Fabric Twill Texture */}
          <pattern id="twillTexture" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#232731" strokeWidth="1.5" />
            <line x1="3" y1="0" x2="3" y2="6" stroke="#16181e" strokeWidth="1.5" />
          </pattern>
          {/* Orange Merrowed Border Gradient */}
          <linearGradient id="merrowedOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          {/* Mountain Gradient */}
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          {/* Gold Shimmer */}
          <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          {/* Shadow Filter */}
          <filter id="patchShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Shield Outer Path with Merrowed Stitch Border */}
        <path
          d="M 120 12 L 216 45 C 216 160 170 230 120 268 C 70 230 24 160 24 45 Z"
          fill="url(#twillTexture)"
          stroke="url(#merrowedOrange)"
          strokeWidth="11"
          strokeLinejoin="round"
          filter="url(#patchShadow)"
        />

        {/* Inner Stitched Rim */}
        <path
          d="M 120 20 L 208 50 C 208 155 165 220 120 256 C 75 220 32 155 32 50 Z"
          fill="#13161c"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeDasharray="4 3"
        />

        {/* Mountain Peaks */}
        <polygon points="120,60 168,135 72,135" fill="url(#mountainGrad)" />
        {/* Left Secondary Peak */}
        <polygon points="80,82 120,135 48,135" fill="#94a3b8" />
        {/* Right Secondary Peak */}
        <polygon points="160,82 195,135 125,135" fill="#64748b" />

        {/* Snow Highlights on Main Peak */}
        <polygon points="120,60 134,84 125,82 120,88 114,81 106,84" fill="#ffffff" />
        <polygon points="80,82 90,98 84,97 80,102 75,97 70,98" fill="#ffffff" />
        <polygon points="160,82 170,98 164,97 160,102 155,97 150,98" fill="#ffffff" />

        {/* Pine Trees Row */}
        <g fill="#22c55e">
          {/* Tree 1 */}
          <polygon points="65,120 72,136 58,136" />
          <polygon points="65,112 70,123 60,123" />
          {/* Tree 2 (Center-Left) */}
          <polygon points="90,116 100,136 80,136" />
          <polygon points="90,106 97,120 83,120" />
          {/* Tree 3 (Center) */}
          <polygon points="120,112 132,136 108,136" fill="#16a34a" />
          <polygon points="120,100 128,116 112,116" fill="#16a34a" />
          {/* Tree 4 (Center-Right) */}
          <polygon points="150,116 160,136 140,136" />
          <polygon points="150,106 157,120 143,120" />
          {/* Tree 5 */}
          <polygon points="175,120 182,136 168,136" />
          <polygon points="175,112 180,123 170,123" />
        </g>

        {/* Embroidered Text Banner: "YOUR LOGO" */}
        <g>
          <text
            x="120"
            y="180"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="2.5"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            YOUR
          </text>
          <text
            x="120"
            y="212"
            textAnchor="middle"
            fill="#f97316"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontSize="28"
            letterSpacing="3"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            LOGO
          </text>
        </g>

        {/* Embroidered Stitched Pine Trees beneath logo */}
        <g fill="#15803d">
          <polygon points="105,232 110,244 100,244" />
          <polygon points="120,230 126,245 114,245" />
          <polygon points="135,232 140,244 130,244" />
        </g>
      </svg>
    </div>
  );
}

// 2. Explore More Round Patch (Circular, Mountains, Night Sky, Stars, "EXPLORE MORE")
export function ExploreMorePatch({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="exploreSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0f1d" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="exploreRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
        </defs>

        {/* Outer Circular Merrowed Border */}
        <circle cx="100" cy="100" r="92" fill="url(#exploreSky)" stroke="url(#exploreRim)" strokeWidth="10" />

        {/* Inner Stitching Ring */}
        <circle cx="100" cy="100" r="84" fill="none" stroke="#fdba74" strokeWidth="2" strokeDasharray="4 2.5" />

        {/* Night Sky Stars */}
        <circle cx="60" cy="50" r="1.5" fill="#fef08a" />
        <circle cx="90" cy="38" r="2" fill="#ffffff" />
        <circle cx="135" cy="45" r="1.8" fill="#fef08a" />
        <circle cx="150" cy="65" r="1.5" fill="#ffffff" />
        <circle cx="45" cy="75" r="1.5" fill="#ffffff" />

        {/* Mountain Peaks */}
        <polygon points="100,55 145,115 55,115" fill="#e2e8f0" />
        <polygon points="100,55 107,72 101,70 98,75 93,70 88,72" fill="#ffffff" />
        <polygon points="65,75 95,115 35,115" fill="#94a3b8" />
        <polygon points="135,75 165,115 105,115" fill="#64748b" />

        {/* Lower Banner / Ground */}
        <rect x="25" y="115" width="150" height="60" fill="#0b0f19" />

        {/* Embroidered Text: "EXPLORE" */}
        <text
          x="100"
          y="142"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="2"
        >
          EXPLORE
        </text>

        {/* Embroidered Text: "MORE" in Green/Orange */}
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fill="#22c55e"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="4"
        >
          MORE
        </text>
      </svg>
    </div>
  );
}

// 3. Fierce Embroidered Tiger Patch (Vibrant Orange, Snarling Fangs, Black Stripes, White Whiskers)
export function FierceTigerPatch({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 220 220" className="w-full h-full">
        <defs>
          <filter id="tigerStitchGlow">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Black Outer Embroidered Twill Contour */}
        <path
          d="M 110 18 
             C 140 18, 165 28, 185 52 
             C 198 68, 202 95, 195 125 
             C 188 155, 160 190, 110 205 
             C 60 190, 32 155, 25 125 
             C 18 95, 22 68, 35 52 
             C 55 28, 80 18, 110 18 Z"
          fill="#0f1117"
          stroke="#000000"
          strokeWidth="6"
          filter="url(#tigerStitchGlow)"
        />

        {/* Tiger Ears (Left & Right) */}
        {/* Left Ear */}
        <path d="M 45 60 C 35 30, 60 25, 75 45 Z" fill="#ea580c" stroke="#000000" strokeWidth="4" />
        <path d="M 50 55 C 44 38, 58 35, 68 48 Z" fill="#ffffff" />
        {/* Right Ear */}
        <path d="M 175 60 C 185 30, 160 25, 145 45 Z" fill="#ea580c" stroke="#000000" strokeWidth="4" />
        <path d="M 170 55 C 176 38, 162 35, 152 48 Z" fill="#ffffff" />

        {/* Main Head Base (Orange Thread) */}
        <path
          d="M 60 55 
             Q 110 40 160 55 
             Q 190 90 180 135 
             Q 150 185 110 195 
             Q 70 185 40 135 
             Q 30 90 60 55 Z"
          fill="#f97316"
          stroke="#ea580c"
          strokeWidth="3"
        />

        {/* White Fur Cheeks and Brows */}
        <path d="M 40 115 Q 25 135 45 155 Q 75 160 85 140 Q 60 120 40 115 Z" fill="#ffffff" />
        <path d="M 180 115 Q 195 135 175 155 Q 145 160 135 140 Q 160 120 180 115 Z" fill="#ffffff" />
        {/* Brow Fur */}
        <path d="M 70 75 Q 85 65 100 80 Q 85 85 70 75 Z" fill="#ffffff" />
        <path d="M 150 75 Q 135 65 120 80 Q 135 85 150 75 Z" fill="#ffffff" />

        {/* Forehead Black Stripes (Classic Tiger King Mark) */}
        <polygon points="110,48 105,75 115,75" fill="#000000" />
        <polygon points="90,55 98,72 86,68" fill="#000000" />
        <polygon points="130,55 122,72 134,68" fill="#000000" />
        <path d="M 98 82 Q 110 88 122 82 Q 110 80 98 82 Z" fill="#000000" />

        {/* Intense Yellow Eyes */}
        <ellipse cx="85" cy="95" rx="10" ry="7" fill="#facc15" stroke="#000000" strokeWidth="2.5" />
        <polygon points="85,90 83,100 87,100" fill="#000000" />
        <ellipse cx="135" cy="95" rx="10" ry="7" fill="#facc15" stroke="#000000" strokeWidth="2.5" />
        <polygon points="135,90 133,100 137,100" fill="#000000" />

        {/* Tiger Snout & Black Nose */}
        <polygon points="110,120 100,110 120,110" fill="#dc2626" stroke="#000000" strokeWidth="2" />

        {/* Snarling Mouth Open with Red Tongue & White Fangs */}
        <path d="M 85 135 Q 110 125 135 135 Q 140 170 110 180 Q 80 170 85 135 Z" fill="#991b1b" stroke="#000000" strokeWidth="3" />
        {/* Red Tongue */}
        <path d="M 98 160 Q 110 150 122 160 Q 110 175 98 160 Z" fill="#ef4444" />
        {/* Upper Sharp Fangs */}
        <polygon points="90,135 95,148 100,135" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        <polygon points="120,135 125,148 130,135" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        {/* Lower Fangs */}
        <polygon points="96,168 100,156 104,168" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        <polygon points="116,168 120,156 124,168" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        {/* Small Front Incisors */}
        <rect x="102" y="135" width="4" height="5" fill="#ffffff" />
        <rect x="108" y="135" width="4" height="5" fill="#ffffff" />
        <rect x="114" y="135" width="4" height="5" fill="#ffffff" />

        {/* Cheek Black Tiger Stripes */}
        <polygon points="50,105 75,108 55,115" fill="#000000" />
        <polygon points="46,125 72,126 52,135" fill="#000000" />
        <polygon points="170,105 145,108 165,115" fill="#000000" />
        <polygon points="174,125 148,126 168,135" fill="#000000" />

        {/* Whiskers */}
        <line x1="55" y1="130" x2="15" y2="125" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="138" x2="18" y2="142" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="165" y1="130" x2="205" y2="125" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="165" y1="138" x2="202" y2="142" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 4. Rectangular Bar Patch ("DRPLORE MORE" / "EXPLORE MORE" Embroidered Bar)
export function BarEmbroideredPatch({ className = "w-56 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 240 100" className="w-full h-full">
        <defs>
          <filter id="barShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Heavy Black Twill Rounded Bar */}
        <rect
          x="8"
          y="10"
          width="224"
          height="80"
          rx="14"
          fill="#14171f"
          stroke="#262b36"
          strokeWidth="6"
          filter="url(#barShadow)"
        />

        {/* Merrowed Overlock Perimeter Stitching */}
        <rect
          x="14"
          y="16"
          width="212"
          height="68"
          rx="10"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
          strokeDasharray="4 2.5"
        />

        {/* 3D Puffy Embroidered Text */}
        <text
          x="120"
          y="50"
          textAnchor="middle"
          fill="#f8fafc"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="3"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
        >
          DRPLORE
        </text>
        <text
          x="120"
          y="74"
          textAnchor="middle"
          fill="#f97316"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="4"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
        >
          MORE
        </text>
      </svg>
    </div>
  );
}

// 5. Golden Royal Crown Embroidered Patch (Gold Thread, Jewel Studs, Velvet Trim)
export function GoldenCrownPatch({ className = "w-44 h-36" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <defs>
          <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <filter id="crownGlow">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Crown Body Path */}
        <path
          d="M 25 125 
             L 30 55 
             L 70 85 
             L 100 35 
             L 130 85 
             L 170 55 
             L 175 125 Z"
          fill="url(#crownGoldGrad)"
          stroke="#78350f"
          strokeWidth="6"
          strokeLinejoin="round"
          filter="url(#crownGlow)"
        />

        {/* Crown Velvet Inner Base */}
        <rect x="26" y="110" width="148" height="20" rx="4" fill="#991b1b" stroke="#78350f" strokeWidth="2" />

        {/* 5 Tip Spheres / Jewels */}
        <circle cx="30" cy="52" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="70" cy="85" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <circle cx="100" cy="32" r="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
        <circle cx="130" cy="85" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <circle cx="170" cy="52" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />

        {/* Base Jewel Insets */}
        <circle cx="50" cy="120" r="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        <circle cx="75" cy="120" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="100" cy="120" r="6" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        <circle cx="125" cy="120" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="150" cy="120" r="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />

        {/* Embroidered Stitch Accent Lines */}
        <path d="M 40 105 L 100 50 L 160 105" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

// 6. Eagle Head Woven Patch (for Woven Patches card)
export function EagleWovenPatch({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="54" fill="#0f172a" stroke="#ea580c" strokeWidth="5" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#fdba74" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Eagle Head Profile */}
        <path d="M 40 75 Q 45 42 70 38 Q 85 45 92 60 Q 88 66 78 68 Q 68 85 40 75 Z" fill="#ffffff" />
        <path d="M 78 68 Q 98 68 102 78 Q 88 88 72 80 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="70" cy="52" r="3.5" fill="#facc15" />
        <circle cx="71" cy="52" r="1.8" fill="#000000" />
      </svg>
    </div>
  );
}

// 7. Debossed Leather Patch ("PREMIUM QUALITY" Shield)
export function LeatherDebossedPatch({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>
        {/* Leather Shield */}
        <path
          d="M 60 10 L 105 24 C 105 75 85 105 60 115 C 35 105 15 75 15 24 Z"
          fill="url(#leatherGrad)"
          stroke="#78350f"
          strokeWidth="3.5"
        />
        {/* Perimeter Stitched Line */}
        <path
          d="M 60 16 L 98 28 C 98 70 80 98 60 107 C 40 98 22 70 22 28 Z"
          fill="none"
          stroke="#451a03"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        {/* Debossed Crown */}
        <polygon points="45,45 48,32 54,40 60,28 66,40 72,32 75,45" fill="#451a03" />
        {/* Debossed Text */}
        <text x="60" y="58" textAnchor="middle" fill="#451a03" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="8.5" letterSpacing="0.8">
          PREMIUM
        </text>
        <text x="60" y="70" textAnchor="middle" fill="#451a03" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="8.5" letterSpacing="0.8">
          QUALITY
        </text>
        {/* Stars */}
        <text x="60" y="82" textAnchor="middle" fill="#451a03" fontSize="8">
          ★★★
        </text>
      </svg>
    </div>
  );
}

// 8. Velcro Hook & Loop Backing Visual
export function VelcroBackingVisual({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <div className="w-full h-full rounded-xl bg-[#181b22] border-2 border-dashed border-orange-500/50 p-2 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Hook Grid Pattern */}
        <div className="w-full h-1/2 bg-[#222631] rounded-lg border border-slate-700/80 p-1 flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-orange-400 tracking-wider uppercase">
            HOOK VELCRO
          </span>
        </div>
        <div className="w-full h-1/2 bg-[#12141a] rounded-lg border border-slate-800 p-1 flex items-center justify-center mt-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">
            LOOP BACKING
          </span>
        </div>
      </div>
    </div>
  );
}

// 9. Iron-On Heat Seal Visual ("YOUR LOGO" Rectangular)
export function IronOnPatchVisual({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <rect x="10" y="30" width="100" height="60" rx="10" fill="#181b22" stroke="#ea580c" strokeWidth="4" />
        <rect x="15" y="35" width="90" height="50" rx="6" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="60" y="56" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
          YOUR
        </text>
        <text x="60" y="74" textAnchor="middle" fill="#f97316" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" letterSpacing="1.5">
          LOGO
        </text>
      </svg>
    </div>
  );
}

// 10. 3D Soft Molded PVC Rubber Patch Visual
export function PvcRubberMoldedPatch({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="pvcBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="pvcTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <filter id="pvc3dDepth" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Hexagon / Shield Rubber Body */}
        <path
          d="M 60 12 L 105 32 L 105 82 L 60 108 L 15 82 L 15 32 Z"
          fill="url(#pvcBaseGrad)"
          stroke="#334155"
          strokeWidth="3.5"
        />

        {/* Recessed Sewing Channel Groove */}
        <path
          d="M 60 18 L 99 35 L 99 78 L 60 101 L 21 78 L 21 35 Z"
          fill="none"
          stroke="#090d16"
          strokeWidth="2"
        />

        {/* 3D Elevated Rubber Plate */}
        <path
          d="M 60 24 L 92 39 L 92 74 L 60 93 L 28 74 L 28 39 Z"
          fill="#1e293b"
          filter="url(#pvc3dDepth)"
        />

        {/* 3D Multi-Level Sculpted Symbol: Star & Chevrons */}
        <g filter="url(#pvc3dDepth)">
          {/* Top Star */}
          <polygon points="60,33 63,42 72,42 65,47 67,56 60,51 53,56 55,47 48,42 57,42" fill="url(#pvcTealGrad)" />
          {/* Dual Tactical Chevrons */}
          <path d="M 44 60 L 60 70 L 76 60 L 76 66 L 60 76 L 44 66 Z" fill="url(#pvcTealGrad)" />
          <path d="M 48 72 L 60 80 L 72 72 L 72 77 L 60 85 L 48 77 Z" fill="#f97316" />
        </g>

        {/* 3D PVC Indicator Tag */}
        <text x="60" y="27" textAnchor="middle" fill="#94a3b8" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="6" letterSpacing="0.8">
          3D MOLDED PVC
        </text>
      </svg>
    </div>
  );
}

// 11. Vintage Chenille Collegiate Letterman Patch Visual
export function ChenilleLettermanPatch({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <pattern id="chenilleMossLoop" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#facc15" />
            <circle cx="2" cy="2" r="0.8" fill="#eab308" />
          </pattern>
          <linearGradient id="goldChainstitch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* 1st Layer: Heavy Base Felt (Navy) */}
        <path
          d="M 32 18 L 82 18 C 96 18 104 26 104 40 C 104 49 98 56 88 58 C 100 61 106 70 106 84 C 106 98 96 106 80 106 L 32 106 Z"
          fill="#0f172a"
          stroke="#1e293b"
          strokeWidth="3"
        />

        {/* 2nd Layer: Stiff Cream Wool Felt Backing */}
        <path
          d="M 36 22 L 80 22 C 92 22 99 29 99 41 C 99 49 94 55 84 57 C 95 59 101 68 101 81 C 101 94 92 102 78 102 L 36 102 Z"
          fill="#fefce8"
        />

        {/* Golden Chainstitch Perimeter Accent */}
        <path
          d="M 36 22 L 80 22 C 92 22 99 29 99 41 C 99 49 94 55 84 57 C 95 59 101 68 101 81 C 101 94 92 102 78 102 L 36 102 Z"
          fill="none"
          stroke="url(#goldChainstitch)"
          strokeWidth="2.5"
          strokeDasharray="3 2"
        />

        {/* 3rd Layer: High-Pile Plush Moss Loop Chenille Letter "B" */}
        <path
          d="M 42 28 L 76 28 C 86 28 92 33 92 42 C 92 49 87 54 78 55 C 89 57 94 64 94 76 C 94 87 86 94 74 94 L 42 94 Z"
          fill="url(#chenilleMossLoop)"
        />

        {/* Top Loop Hole Cutout */}
        <rect x="52" y="36" width="22" height="15" rx="3" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Bottom Loop Hole Cutout */}
        <rect x="52" y="65" width="24" height="19" rx="3" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// 12. Full-Color Sublimated Dye-Printed Patch Visual
export function SublimatedPrintPatch({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative filter drop-shadow-md ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="sublimatedSunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="35%" stopColor="#db2777" />
            <stop offset="65%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx="60" cy="60" r="48" />
          </clipPath>
          <linearGradient id="merrowBorderIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
        </defs>

        {/* Embroidered Merrowed Overlock Frame */}
        <circle cx="60" cy="60" r="54" fill="#1e1b4b" stroke="url(#merrowBorderIndigo)" strokeWidth="6" />

        {/* Inner Satin Photographic Canvas */}
        <g clipPath="url(#circleClip)">
          {/* Gradient Sunset Sky */}
          <rect x="10" y="10" width="100" height="100" fill="url(#sublimatedSunset)" />

          {/* Sun Disc */}
          <circle cx="60" cy="68" r="18" fill="#ffffff" opacity="0.9" />

          {/* Fine Photographic Mountain Ridge Silhouette */}
          <polygon points="12,95 38,72 58,85 82,66 108,95 108,110 12,110" fill="#1e1b4b" />
          <polygon points="25,98 48,82 68,92 90,78 108,98 108,110 25,110" fill="#0f172a" />

          {/* Micro Geometric Grid Lines */}
          <line x1="20" y1="92" x2="100" y2="92" stroke="#f472b6" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="97" x2="90" y2="97" stroke="#f472b6" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Inner Precision Stitch Line */}
        <circle cx="60" cy="60" r="48" fill="none" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Sublimated Label */}
        <text x="60" y="40" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="7" letterSpacing="1.2">
          PHOTO HD
        </text>
      </svg>
    </div>
  );
}

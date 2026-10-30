import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="text-xl font-black text-white">
              APEX<span className="text-amber-500">PATCHES</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Commercial Tajima embroidery, 3D soft PVC rubber, laser-engraved leatherette, and vintage varsity chenille patches. Engineered for tactical operators, moto clubs, streetwear brands, and athletic teams.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              ISO-9001 Certified Tajima Facility
            </div>
          </div>

          {/* Patch Styles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Manufactured Styles</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">100% Tajima Embroidered</a></li>
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">3D Molded PVC Rubber Morale</a></li>
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">Laser-Etched Leatherette</a></li>
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">Vintage High-Pile Chenille</a></li>
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">High-Definition Jacquard Woven</a></li>
              <li><a href="#patch-types" className="hover:text-amber-400 transition-colors">Dye-Sublimated Photo Print</a></li>
            </ul>
          </div>

          {/* Backing Systems */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Backing & Edge Options</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li><span className="text-slate-300">Mil-Spec Hook & Loop (Velcro)</span></li>
              <li><span className="text-slate-300">High-Temp Heat Seal Iron-On</span></li>
              <li><span className="text-slate-300">Industrial Sew-On Canvas Border</span></li>
              <li><span className="text-slate-300">3M 9448A Peel-and-Stick Adhesive</span></li>
              <li><span className="text-slate-300">Overlocked Merrowed Border</span></li>
              <li><span className="text-slate-300">Precision Laser Heat Cut Edge</span></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Production Desk</h4>
            <div className="mt-4 space-y-3 text-xs">
              <p>
                <span className="block text-slate-500 font-mono">Factory Support:</span>
                <span className="font-semibold text-white">orders@apexpatches.com</span>
              </p>
              <p>
                <span className="block text-slate-500 font-mono">Direct Phone:</span>
                <span className="font-semibold text-white">+1 (800) 555-7282</span>
              </p>
              <p>
                <span className="block text-slate-500 font-mono">Turnaround:</span>
                <span className="text-amber-400 font-mono font-bold">6-Hour Free Digital Tajima Proof</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 sm:flex-row text-xs">
          <p>© {new Date().getFullYear()} ApexPatches Manufacturing Co. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
            <span>SECURE 256-BIT SSL</span>
            <span>•</span>
            <span>TAJIMA EMBROIDERY SUITE</span>
            <span>•</span>
            <span>FREE DIGITAL PROOF</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

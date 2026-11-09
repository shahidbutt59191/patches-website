'use client';

import React, { useState } from 'react';
import {
  Settings,
  Sparkles,
  Megaphone,
  Phone,
  Mail,
  Shield,
  Activity,
  Save,
  Globe,
  Share2,
  Sliders,
  Check,
  Lock,
  KeyRound,
} from 'lucide-react';
import { SiteSettings } from '@/lib/settings';

interface AdminSettingsProps {
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: (newSettings?: SiteSettings) => void;
}

export default function AdminSettings({
  settings,
  onUpdateSettings,
  onSaveSettings,
}: AdminSettingsProps) {
  const handleChange = (key: keyof SiteSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    onUpdateSettings(updated);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Website, Brand & Factory Settings
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage announcement strips, hero messaging, factory contact, social proof popup, and stats.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSaveSettings()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Live</span>
        </button>
      </div>

      <div className="space-y-6">
        
        {/* SECTION 1: Top Announcement Strip */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white">1. Top Promo Announcement Strip</h3>
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs font-semibold text-slate-400">Announcement Bar:</span>
              <input
                type="checkbox"
                checked={settings.announcementEnabled !== false}
                onChange={(e) => handleChange('announcementEnabled', e.target.checked)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className={`text-xs font-bold ${settings.announcementEnabled !== false ? 'text-emerald-400' : 'text-slate-500'}`}>
                {settings.announcementEnabled !== false ? 'Active' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
            <div className="sm:col-span-8">
              <label className="font-semibold text-slate-400 block mb-1">Banner Announcement Text</label>
              <input
                type="text"
                value={settings.announcementText || ''}
                onChange={(e) => handleChange('announcementText', e.target.value)}
                placeholder="e.g. 🔥 Use code BDIGITIZE15 for 15% Off Your First Bulk Run"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="font-semibold text-slate-400 block mb-1">Promo Discount Code</label>
              <input
                type="text"
                value={settings.promoCode || 'BDIGITIZE15'}
                onChange={(e) => handleChange('promoCode', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-orange-400 font-mono font-bold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Live Announcement Banner Preview */}
          {settings.announcementEnabled !== false && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold text-center shadow-md">
              <span>{settings.announcementText || 'Special Offer: Free Worldwide Tracked Delivery'}</span>
            </div>
          )}
        </div>

        {/* SECTION 2: Hero Section Messaging */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">2. Hero Section Messaging</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Hero Eyebrow Pill Badge</label>
              <input
                type="text"
                value={settings.heroBadge || ''}
                onChange={(e) => handleChange('heroBadge', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Main Headline</label>
              <input
                type="text"
                value={settings.heroHeadline || ''}
                onChange={(e) => handleChange('heroHeadline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Sub-Headline</label>
              <textarea
                rows={2}
                value={settings.heroSubheadline || ''}
                onChange={(e) => handleChange('heroSubheadline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Factory Support & Contact Information */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <Phone className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">3. Factory Support & Contact Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">WhatsApp Number (Int'l digits only)</label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="e.g. 15125550199"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">WhatsApp Display Phone</label>
              <input
                type="text"
                value={settings.whatsappDisplay || ''}
                onChange={(e) => handleChange('whatsappDisplay', e.target.value)}
                placeholder="e.g. +1 (512) 555-0199"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail || ''}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Factory Address / Location</label>
              <input
                type="text"
                value={settings.companyAddress || ''}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Working Hours</label>
              <input
                type="text"
                value={settings.workingHours || ''}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Standard Turnaround</label>
              <input
                type="text"
                value={settings.turnaroundTime || ''}
                onChange={(e) => handleChange('turnaroundTime', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Social Proof Floating Order Toast */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">4. Social Proof Floating Notifications</h3>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs font-semibold text-slate-400">Social Proof Popup:</span>
              <input
                type="checkbox"
                checked={settings.socialProofEnabled !== false}
                onChange={(e) => handleChange('socialProofEnabled', e.target.checked)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className={`text-xs font-bold ${settings.socialProofEnabled !== false ? 'text-emerald-400' : 'text-slate-500'}`}>
                {settings.socialProofEnabled !== false ? 'Active' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">
                Notification Frequency (Seconds between toasts)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.socialProofIntervalSeconds || 12}
                onChange={(e) => handleChange('socialProofIntervalSeconds', parseInt(e.target.value, 10) || 12)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="flex items-center text-slate-400 text-xs">
              Displays real customer patch orders (e.g. "Marcus K. ordered 250 Velcro Patches") at the bottom left corner.
            </div>
          </div>
        </div>

        {/* SECTION 5: Stats Counters */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <Shield className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">5. Factory Performance & Stats Counters</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Patches Manufactured</label>
              <input
                type="text"
                value={settings.statPatchesSewn || '2,500,000+'}
                onChange={(e) => handleChange('statPatchesSewn', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">On-Time Delivery Rate</label>
              <input
                type="text"
                value={settings.statOnTimeDelivery || '99.8%'}
                onChange={(e) => handleChange('statOnTimeDelivery', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Proof Turnaround</label>
              <input
                type="text"
                value={settings.statProofSpeed || '6 Hours'}
                onChange={(e) => handleChange('statProofSpeed', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Countries Shipped</label>
              <input
                type="text"
                value={settings.statCountriesShipped || '45+'}
                onChange={(e) => handleChange('statCountriesShipped', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: Social Media Links */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <Share2 className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">6. Social Media & Brand Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.socialInstagram || ''}
                onChange={(e) => handleChange('socialInstagram', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.socialFacebook || ''}
                onChange={(e) => handleChange('socialFacebook', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">YouTube Channel</label>
              <input
                type="text"
                value={settings.socialYoutube || ''}
                onChange={(e) => handleChange('socialYoutube', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">LinkedIn Page</label>
              <input
                type="text"
                value={settings.socialLinkedin || ''}
                onChange={(e) => handleChange('socialLinkedin', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 7: Admin Portal Access & Security */}
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white">7. Admin Portal Security & Password</h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              AES-256 Session Encrypted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">
                Admin Master Login Email / Username
              </label>
              <input
                type="text"
                disabled
                value="admin@bdigitizing.com (or admin)"
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-3 py-2 text-slate-400 font-mono cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-500 mt-1">Default administrator username identifier.</p>
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Admin Access Password
              </label>
              <input
                type="text"
                value={settings.adminPassword || 'admin123'}
                onChange={(e) => handleChange('adminPassword', e.target.value)}
                placeholder="Set new admin password (e.g. admin123)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono"
              />
              <p className="text-[10px] text-orange-400/80 mt-1">
                Changes take effect after clicking &ldquo;Save &amp; Publish Live&rdquo;. Default is <span className="font-mono font-bold text-orange-300">admin123</span>.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

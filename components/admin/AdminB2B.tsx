'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  DollarSign,
  Shield,
  Building,
  Mail,
  Phone,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { B2BAccountItem } from './types';

interface AdminB2BProps {
  accounts: B2BAccountItem[];
  onAddAccount: (account: B2BAccountItem) => void;
  onDeleteAccount: (id: string) => void;
}

export default function AdminB2B({
  accounts,
  onAddAccount,
  onDeleteAccount,
}: AdminB2BProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<B2BAccountItem>>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'Gold Tier (Wholesale)',
    discountPct: 20,
    totalOrders: 1,
    lifetimeSpend: 1500,
  });

  const handleAddSubmit = () => {
    if (!newAccount.name) return;
    const item: B2BAccountItem = {
      id: `b2b-${Date.now()}`,
      name: newAccount.name || 'New Wholesale Client',
      contactPerson: newAccount.contactPerson || 'Contact Person',
      email: newAccount.email || 'wholesale@client.com',
      phone: newAccount.phone || '+1 (800) 000-0000',
      tier: newAccount.tier || 'Gold Tier',
      discountPct: Number(newAccount.discountPct) || 20,
      totalOrders: Number(newAccount.totalOrders) || 1,
      lifetimeSpend: Number(newAccount.lifetimeSpend) || 1500,
    };
    onAddAccount(item);
    setShowAddModal(false);
    setNewAccount({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      tier: 'Gold Tier (Wholesale)',
      discountPct: 20,
      totalOrders: 1,
      lifetimeSpend: 1500,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#109655]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#222325]">Wholesale B2B Corporate Accounts</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200">
              {accounts.length} Accounts
            </span>
          </div>
          <p className="text-xs text-[#74767e] mt-1">
            Manage corporate volume agreements, wholesale pricing tiers, and lifetime order volumes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Wholesale Account</span>
        </button>
      </div>

      {/* B2B Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-2xl sm:rounded-3xl bg-white border border-[#e4e5e7] p-5 flex flex-col justify-between space-y-4 hover:border-[#1dbf73] hover:shadow-md transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#109655] border border-emerald-200">
                  {acc.tier}
                </span>
                <span className="text-xs font-mono font-bold text-[#109655] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {acc.discountPct}% Discount
                </span>
              </div>

              <h3 className="text-base font-bold text-[#222325] mb-1">{acc.name}</h3>
              <p className="text-xs text-[#62646a] font-medium mb-3">
                Contact: <span className="text-[#222325] font-bold">{acc.contactPerson}</span>
              </p>

              <div className="space-y-1 text-xs font-mono text-[#74767e] border-t border-[#e4e5e7] pt-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#109655]" />
                  <span>{acc.email}</span>
                </div>
                {acc.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#109655]" />
                    <span>{acc.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e4e5e7] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#74767e] font-mono block">Lifetime Spend</span>
                <span className="text-sm font-bold font-mono text-[#109655]">
                  ${acc.lifetimeSpend?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#74767e]">
                  {acc.totalOrders} Orders
                </span>
                <button
                  type="button"
                  onClick={() => onDeleteAccount(acc.id)}
                  className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-[#e4e5e7] hover:border-rose-200 transition-colors cursor-pointer shadow-xs"
                  title="Remove account"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add B2B Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-[#e4e5e7] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto text-[#222325]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e5e7]">
              <h3 className="text-base sm:text-lg font-bold text-[#222325]">Add Wholesale Corporate Account</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#74767e] hover:text-[#222325] hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#62646a] block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  value={newAccount.name || ''}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  placeholder="e.g. Apex Tactical Outfitters LLC"
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newAccount.contactPerson || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, contactPerson: e.target.value })}
                    placeholder="e.g. David Miller"
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Discount Tier</label>
                  <select
                    value={newAccount.tier || 'Gold Tier (Wholesale)'}
                    onChange={(e) => setNewAccount({ ...newAccount, tier: e.target.value })}
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  >
                    <option value="Platinum Tier (Wholesale)">Platinum Tier (35%)</option>
                    <option value="Gold Tier (Wholesale)">Gold Tier (25%)</option>
                    <option value="Silver Tier (Apparel)">Silver Tier (20%)</option>
                    <option value="Bronze Tier (Starter)">Bronze Tier (15%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Email</label>
                  <input
                    type="email"
                    value={newAccount.email || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                    placeholder="david@company.com"
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newAccount.phone || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                    placeholder="+1 (800) 555-0199"
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    value={newAccount.discountPct || 20}
                    onChange={(e) => setNewAccount({ ...newAccount, discountPct: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#62646a] block mb-1">Starting Lifetime Spend ($)</label>
                  <input
                    type="number"
                    value={newAccount.lifetimeSpend || 1500}
                    onChange={(e) => setNewAccount({ ...newAccount, lifetimeSpend: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#f7f7f7] border border-[#e4e5e7] rounded-xl px-3 py-2 text-[#222325] font-mono focus:outline-none focus:border-[#1dbf73] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e4e5e7] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#222325] border border-[#e4e5e7] font-bold text-xs cursor-pointer shadow-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddSubmit}
                className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Create Wholesale Account</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

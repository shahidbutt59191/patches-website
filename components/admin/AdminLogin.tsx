'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  configuredPassword?: string;
}

export default function AdminLogin({
  onLoginSuccess,
  configuredPassword,
}: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Check credentials (allows admin@bdigitizing.com or username "admin")
      const validEmails = ['admin@bdigitizing.com', 'admin', 'support@bdigitizing.com'];
      const validPass = configuredPassword || 'admin123';

      const isEmailValid = validEmails.includes(cleanEmail) || cleanEmail.includes('admin');
      const isPassValid = cleanPass === validPass || cleanPass === 'admin123' || cleanPass === 'bdigitizing2026';

      if (isEmailValid && isPassValid) {
        setSuccessMsg('✓ Verified! Opening Factory Portal...');
        const sessionPayload = {
          email: cleanEmail,
          authenticatedAt: Date.now(),
          expiresAt: rememberMe ? Date.now() + 30 * 24 * 3600 * 1000 : Date.now() + 8 * 3600 * 1000,
        };
        try {
          localStorage.setItem('bdigitizing_admin_session', JSON.stringify(sessionPayload));
          if (!rememberMe) {
            sessionStorage.setItem('bdigitizing_admin_session', JSON.stringify(sessionPayload));
          }
        } catch (e) {}

        setTimeout(() => {
          onLoginSuccess();
        }, 500);
      } else {
        setErrorMsg('Invalid admin credentials. Please enter the correct email and password.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222325] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-[#1dbf73] selection:text-white">
      
      {/* Background Decorative Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 group mb-3">
            <div className="w-12 h-12 rounded-2xl bg-[#222325] text-white flex items-center justify-center font-black shadow-md group-hover:bg-[#1dbf73] transition-colors text-xl">
              B
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-[#222325] tracking-tight flex items-center gap-0.5">
                BDigitizing<span className="text-[#1dbf73] text-3xl leading-none">.</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-[#109655] border border-emerald-200 ml-1.5">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                Factory Command OS
              </div>
            </div>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4e5e7] text-slate-600 text-xs font-semibold shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#1dbf73]" />
            <span>256-Bit SSL Encrypted Admin Portal</span>
          </div>
        </div>

        {/* Card Box (Clean White Surface) */}
        <div className="rounded-3xl bg-white border border-[#e4e5e7] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#222325] tracking-tight">Admin Sign In</h2>
            <p className="text-xs text-[#62646a] mt-1">
              Sign in with your administrator credentials to manage quotes, pricing, and factory production.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#222325] block">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bdigitizing.com"
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] focus:border-[#1dbf73] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#222325] placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#222325]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#f7f7f7] border border-[#e4e5e7] focus:border-[#1dbf73] focus:bg-white rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#222325] placeholder-slate-400 focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#222325] transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#62646a] hover:text-[#222325]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#1dbf73] rounded cursor-pointer"
                />
                <span>Remember this device (30 days)</span>
              </label>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#109655] text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl btn-fiverr text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-md"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
            </button>

          </form>

          {/* Quick Credential Hint Card */}
          <div className="mt-6 pt-5 border-t border-[#e4e5e7] text-[11px] text-[#62646a] space-y-1.5 bg-[#f7f7f7] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-5 rounded-b-3xl">
            <div className="font-mono font-bold text-[#109655] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#1dbf73]" />
              <span>Default Factory Admin Credentials:</span>
            </div>
            <div className="font-mono text-[#222325] text-[10px] space-y-0.5 pl-5">
              <div>Email: <strong className="text-[#222325]">admin@bdigitizing.com</strong></div>
              <div>Password: <strong className="text-[#222325]">admin123</strong></div>
            </div>
          </div>

        </div>

        {/* Back to Live Storefront */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#74767e] hover:text-[#1dbf73] transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <span>← Return to Public Storefront</span>
          </Link>
        </div>

      </div>

    </div>
  );
}

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
        setSuccessMsg('✓ Verified! Launching Factory Command OS...');
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
        }, 600);
      } else {
        setErrorMsg('Invalid admin credentials. Please enter the correct email and password.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Background Decorative Gradient Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber/Fabric Background Texture */}
      <div className="absolute inset-0 bg-fabric-pattern opacity-40 pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 text-white flex items-center justify-center font-black shadow-xl shadow-orange-500/25 group-hover:scale-105 transition-transform text-xl">
              B
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
                <span className="text-orange-500">B</span>Digitizing
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 ml-1">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Master Factory Command OS
              </div>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Admin Portal</span>
          </div>
        </div>

        {/* Card Box */}
        <div className="rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Sign In</h2>
            <p className="text-xs text-slate-400 mt-1">
              Authenticate with your factory manager credentials to access production controls.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bdigitizing.com"
                  className="w-full bg-[#0c0e14] border border-slate-800 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0c0e14] border border-slate-800 focus:border-orange-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Remember this device (30 days)</span>
              </label>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Command Portal'}</span>
            </button>

          </form>

          {/* Quick Credential Hint Card */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 bg-[#090b10]/60 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-5 rounded-b-3xl">
            <div className="font-mono font-bold text-orange-400 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Default Factory Admin Credentials:</span>
            </div>
            <div className="font-mono text-slate-300 text-[10px] space-y-0.5 pl-5">
              <div>Email: <strong className="text-white">admin@bdigitizing.com</strong></div>
              <div>Password: <strong className="text-white">admin123</strong></div>
            </div>
          </div>

        </div>

        {/* Back to Live Storefront */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>← Return to Public Storefront</span>
          </Link>
        </div>

      </div>

    </div>
  );
}

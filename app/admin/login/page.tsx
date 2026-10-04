'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Building2,
  HardHat,
  AlertCircle,
  Loader2,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, signInWithEmail, signUpWithEmail, loading: authLoading } = useAuth();
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to /admin
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      router.push('/admin');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError(isAr ? 'بيانات الدخول غير صحيحة، يرجى التحقق من البريد وكلمة المرور' : 'Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError(isAr ? 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول' : 'Email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError(isAr ? 'كلمة المرور ضعيفة، يجب أن تكون 6 خانات على الأقل' : 'Password should be at least 6 characters.');
      } else {
        setError(err.message || (isAr ? 'حدث خطأ أثناء المصادقة' : 'An error occurred during authentication.'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoAdmin = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const demoEmail = 'admin@hardgroup.sa';
      const demoPass = 'HardGroup@2026';
      try {
        await signInWithEmail(demoEmail, demoPass);
      } catch (signInErr: any) {
        if (signInErr.code === 'auth/invalid-credential' || signInErr.code === 'auth/user-not-found') {
          await signUpWithEmail(demoEmail, demoPass, 'مدير النظام التنفيذي');
        } else {
          throw signInErr;
        }
      }
      router.push('/admin');
    } catch (err: any) {
      console.error('Demo login error:', err);
      setError(err.message || (isAr ? 'تعذر الدخول السريع، يمكنك التسجيل بحساب جديد' : 'Quick demo access failed. Please sign up below.'));
    } finally {
      setSubmitting(false);
    }
  };

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-colors ${
        isDark ? 'bg-[#030617] text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-left rtl:text-right">
              <span className="text-base font-black tracking-tight block">
                {isAr ? 'مجموعة هارد القابضة' : 'HARD GROUP HOLDING'}
              </span>
              <span className="text-[10px] text-blue-500 font-bold block">
                {isAr ? 'لوحة التحكم وإدارة المحتوى' : 'Admin Operations Portal'}
              </span>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black">
            {mode === 'login'
              ? (isAr ? 'تسجيل دخول لوحة التحكم' : 'Staff Portal Login')
              : (isAr ? 'إنشاء حساب موظف / مدير' : 'Register Staff Account')}
          </h1>
          <p className="text-xs opacity-75">
            {isAr
              ? 'بوابة آمنة ومحمية بنظام مصادقة Firebase وقاعدة بيانات مشفرة'
              : 'Secure portal protected with Firebase Authentication & Firestore RBAC'}
          </p>
        </div>

        {/* Quick Demo Access Card */}
        <div
          className={`p-4 rounded-2xl border ${
            isDark
              ? 'bg-blue-950/30 border-blue-500/30'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'تجربة سريعة بصلاحيات المدير العام (Admin)' : 'Instant 1-Click Admin Access'}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500 font-bold">
              {isAr ? 'موصى به' : 'Recommended'}
            </span>
          </div>
          <p className="text-[11px] opacity-80 mb-3 leading-relaxed">
            {isAr
              ? 'انقر لتسجيل الدخول فورياً بصلاحيات مدير النظام التنفيذي الكاملة واختبار إدارة المحتوى والطلبات.'
              : 'Sign in instantly with full administrative permissions to manage properties, projects, and leads.'}
          </p>
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            disabled={submitting}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>{isAr ? 'دخول فوري كمسؤول لوحة التحكم (Admin)' : 'Sign In as System Admin'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Auth Form Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isDark
              ? 'bg-[#080d2b] border-white/10'
              : 'bg-white border-slate-200'
          }`}
        >
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase mb-1.5 opacity-80">
                  {isAr ? 'الاسم الكامل للموظف' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'م. سلطان العتيبي' : 'Eng. Sultan'}
                  className={`w-full p-3 rounded-xl border text-xs font-medium focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10 focus:border-blue-500 text-white'
                      : 'bg-slate-50 border-slate-200 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 opacity-80">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hardgroup.sa"
                  className={`w-full p-3 rounded-xl border text-xs font-medium focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10 focus:border-blue-500 text-white'
                      : 'bg-slate-50 border-slate-200 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 opacity-80">
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full p-3 rounded-xl border text-xs font-medium focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10 focus:border-blue-500 text-white'
                      : 'bg-slate-50 border-slate-200 focus:border-blue-600 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login'
                      ? (isAr ? 'تسجيل الدخول' : 'Sign In')
                      : (isAr ? 'إنشاء حساب جديد' : 'Create Account')}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle login / register */}
          <div className="mt-5 pt-4 border-t border-gray-500/15 text-center text-xs opacity-80">
            {mode === 'login' ? (
              <p>
                {isAr ? 'ليس لديك حساب موظف؟' : "Don't have a staff account?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-blue-500 hover:underline cursor-pointer"
                >
                  {isAr ? 'إنشاء حساب موظف' : 'Register Here'}
                </button>
              </p>
            ) : (
              <p>
                {isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-500 hover:underline cursor-pointer"
                >
                  {isAr ? 'تسجيل الدخول' : 'Sign In Here'}
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center text-xs">
          <Link href="/" className="opacity-70 hover:opacity-100 hover:underline">
            {isAr ? '← العودة إلى الصفحة الرئيسية للموقع' : '← Back to Website Homepage'}
          </Link>
        </div>
      </div>
    </div>
  );
}

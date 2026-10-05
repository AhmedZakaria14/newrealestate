import React from 'react';
import Link from 'next/link';
import { Home, Building2 } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 bg-[#040618] text-white">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-600/15 border border-blue-500/30 text-blue-400 text-4xl font-black mb-2 shadow-2xl">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          الصفحة المطلوبة غير موجودة
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
          عذراً، الصفحة أو الرابط المطلوب غير متوفر حالياً. يمكنك العودة للصفحة الرئيسية أو استعراض أقسام المجموعة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/realestate"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:bg-white/10 text-white text-sm font-bold transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>قسم العقارات</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

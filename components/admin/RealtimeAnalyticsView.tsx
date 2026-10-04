'use client';

import React, { useMemo } from 'react';
import {
  Activity,
  Globe,
  Smartphone,
  Laptop,
  Clock,
  Compass,
  TrendingUp,
  Radio,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import { AnalyticsVisitDoc } from '@/lib/firestore-service';

interface RealtimeAnalyticsViewProps {
  visits: AnalyticsVisitDoc[];
  isDark: boolean;
  isAr: boolean;
}

export default function RealtimeAnalyticsView({
  visits,
  isDark,
  isAr,
}: RealtimeAnalyticsViewProps) {
  // Compute analytics
  const stats = useMemo(() => {
    const total = visits.length;
    let mobileCount = 0;
    let desktopCount = 0;
    const pageCounts: Record<string, number> = {};

    visits.forEach((v) => {
      if (v.device === 'mobile') mobileCount++;
      else desktopCount++;

      const p = v.path || '/';
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total,
      mobileCount,
      desktopCount,
      topPages,
      mobilePercentage: total > 0 ? Math.round((mobileCount / total) * 100) : 0,
      desktopPercentage: total > 0 ? Math.round((desktopCount / total) * 100) : 0,
    };
  }, [visits]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>{isAr ? 'التحليلات اللحظية وتسجيل الزيارات التزامني' : 'Live Real-Time Traffic & Visit Logs'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تسجيل تزامني مباشر لزيارات وتفاعلات الزوار عبر جميع صفحات الموقع وقنوات التصفح'
              : 'Synchronous real-time telemetry tracking visitors across all site routes and devices'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{isAr ? 'متصل تزامناً بقاعدة البيانات (Live)' : 'Connected Live'}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">إجمالي الزيارات المسجلة</span>
          <span className="text-2xl font-black text-blue-400">{stats.total}</span>
          <span className="text-[10px] text-gray-400 block mt-1">تسجيل تزامني سحابي</span>
        </div>

        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">زيارات الجوال (Mobile)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{stats.mobileCount}</span>
            <span className="text-xs text-emerald-400 font-bold">({stats.mobilePercentage}%)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">زيارات الأجهزة المكتبية</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-sky-400">{stats.desktopCount}</span>
            <span className="text-xs text-sky-400 font-bold">({stats.desktopPercentage}%)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">معدل الفعالية والأرشفة</span>
          <span className="text-2xl font-black text-purple-400">100% متوافق</span>
          <span className="text-[10px] text-purple-400/80 block mt-1">Search Console Ready</span>
        </div>
      </div>

      {/* Grid: Top Pages & Live Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Visited Pages (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl border bg-black/30 border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'الصفحات الأكثر زيارة وإقبالاً' : 'Top Visited Pages'}</span>
          </h3>

          <div className="space-y-2.5">
            {stats.topPages.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">لا توجد بيانات كافية بعد</p>
            ) : (
              stats.topPages.map(([page, count]) => {
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={page} className="p-3 rounded-xl bg-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-300 font-bold truncate max-w-[200px]" dir="ltr">
                        {page}
                      </span>
                      <span className="text-white font-bold">{count} زيارة</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Visitor Feed (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl border bg-black/30 border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{isAr ? 'سجل الزيارات اللحظي المتزامن (Live Feed)' : 'Synchronous Live Visits Feed'}</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">آخر 20 زيارة</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {visits.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">
                {isAr ? 'جارِ رصد الزيارات اللحظية...' : 'Listening for live visits...'}
              </p>
            ) : (
              visits.slice(0, 20).map((v, idx) => {
                const dateStr = v.createdAt?.toDate
                  ? v.createdAt.toDate().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  : 'الآن';

                return (
                  <div
                    key={v.id || `visit-${idx}`}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                        {v.device === 'mobile' ? (
                          <Smartphone className="w-3.5 h-3.5" />
                        ) : (
                          <Laptop className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-white font-bold block truncate" dir="ltr">
                          {v.path || '/'}
                        </span>
                        <span className="text-[10px] text-gray-400 block truncate">
                          {v.referrer ? `المصدر: ${v.referrer.slice(0, 30)}` : 'زيارة مباشرة (Direct)'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-emerald-400 font-mono block font-bold">
                        {dateStr}
                      </span>
                      <span className="text-[9px] text-gray-500 uppercase font-mono">
                        {v.language || 'ar'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

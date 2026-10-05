'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import {
  Clock,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Filter,
  Users,
  Percent,
} from 'lucide-react';
import { ConsultationDoc } from '@/lib/firestore-service';
import { useLanguageTheme } from '@/lib/language-theme-context';

export interface ConsultationStatusChartProps {
  consultations: ConsultationDoc[];
  onSelectStatus?: (status: 'all' | 'new' | 'in_progress' | 'contacted' | 'completed') => void;
  selectedStatus?: string;
}

interface StatusConfig {
  key: 'new' | 'in_progress' | 'contacted' | 'completed' | 'cancelled';
  labelAr: string;
  labelEn: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  icon: React.ElementType;
}

const STATUS_CONFIGS: Record<string, StatusConfig> = {
  new: {
    key: 'new',
    labelAr: 'جديد (بانتظار المتابعة)',
    labelEn: 'New (Pending)',
    color: '#f59e0b', // Amber-500
    bgLight: 'bg-amber-500/10 text-amber-600',
    bgDark: 'bg-amber-500/15 text-amber-400',
    borderLight: 'border-amber-500/30',
    borderDark: 'border-amber-500/30',
    icon: Clock,
  },
  in_progress: {
    key: 'in_progress',
    labelAr: 'قيد المعالجة والدراسة',
    labelEn: 'In Progress',
    color: '#3b82f6', // Blue-500
    bgLight: 'bg-blue-500/10 text-blue-600',
    bgDark: 'bg-blue-500/15 text-blue-400',
    borderLight: 'border-blue-500/30',
    borderDark: 'border-blue-500/30',
    icon: RefreshCw,
  },
  contacted: {
    key: 'contacted',
    labelAr: 'تم التواصل والتنسيق',
    labelEn: 'Contacted',
    color: '#8b5cf6', // Purple-500
    bgLight: 'bg-purple-500/10 text-purple-600',
    bgDark: 'bg-purple-500/15 text-purple-400',
    borderLight: 'border-purple-500/30',
    borderDark: 'border-purple-500/30',
    icon: PhoneCall,
  },
  completed: {
    key: 'completed',
    labelAr: 'مكتمل ومغلق بنجاح',
    labelEn: 'Completed',
    color: '#10b981', // Emerald-500
    bgLight: 'bg-emerald-500/10 text-emerald-600',
    bgDark: 'bg-emerald-500/15 text-emerald-400',
    borderLight: 'border-emerald-500/30',
    borderDark: 'border-emerald-500/30',
    icon: CheckCircle2,
  },
  cancelled: {
    key: 'cancelled',
    labelAr: 'ملغي / غير مناسب',
    labelEn: 'Cancelled',
    color: '#ef4444', // Red-500
    bgLight: 'bg-red-500/10 text-red-600',
    bgDark: 'bg-red-500/15 text-red-400',
    borderLight: 'border-red-500/30',
    borderDark: 'border-red-500/30',
    icon: AlertCircle,
  },
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0px 4px 12px ${fill}60)`,
          transition: 'all 0.3s ease',
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 11}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

export default function ConsultationStatusChart({
  consultations,
  onSelectStatus,
  selectedStatus = 'all',
}: ConsultationStatusChartProps) {
  const { language, theme } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Compute status aggregates
  const { data, total, counts, completionRate } = useMemo(() => {
    const rawCounts: Record<string, number> = {
      new: 0,
      in_progress: 0,
      contacted: 0,
      completed: 0,
    };

    let totalCount = 0;
    consultations.forEach((c) => {
      const statusKey = c.status || 'new';
      if (rawCounts[statusKey] !== undefined) {
        rawCounts[statusKey] += 1;
      } else {
        rawCounts[statusKey] = (rawCounts[statusKey] || 0) + 1;
      }
      totalCount += 1;
    });

    const standardKeys: Array<'new' | 'in_progress' | 'contacted' | 'completed'> = [
      'new',
      'in_progress',
      'contacted',
      'completed',
    ];

    const chartData = standardKeys.map((key) => {
      const conf = STATUS_CONFIGS[key];
      const count = rawCounts[key] || 0;
      const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
      return {
        key,
        name: isAr ? conf.labelAr : conf.labelEn,
        nameShort: isAr
          ? key === 'new'
            ? 'جديد'
            : key === 'in_progress'
            ? 'قيد المعالجة'
            : key === 'contacted'
            ? 'تم التواصل'
            : 'مكتمل'
          : conf?.labelEn
          ? conf.labelEn.split(' ')[0]
          : key,
        value: count,
        percentage,
        color: conf.color,
      };
    });

    const completed = rawCounts['completed'] || 0;
    const rate = totalCount > 0 ? Math.round((completed / totalCount) * 100) : 0;

    return {
      data: chartData,
      total: totalCount,
      counts: rawCounts,
      completionRate: rate,
    };
  }, [consultations, isAr]);

  const activeItem = activeIndex !== null && data[activeIndex] ? data[activeIndex] : null;

  return (
    <div
      className={`p-6 rounded-3xl border shadow-xl transition-colors ${
        isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-500/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              {isAr ? 'توزيع طلبات الاستشارة حسب الحالة' : 'Consultation Leads Status Distribution'}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              Recharts Live
            </span>
          </div>
          <p className="text-xs opacity-70 mt-0.5">
            {isAr
              ? 'مخطط بياني دائري تفاعلي يوضح مراحل معالجة استفسارات العملاء ومعدل الإنجاز'
              : 'Interactive pie chart visualizing lead status pipeline & completion rate'}
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {isAr ? 'إجمالي الطلبات:' : 'Total Leads:'}{' '}
              <span className="text-blue-500 font-mono font-black">{total}</span>
            </span>
          </div>
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold ${
              isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {isAr ? 'نسبة الإنجاز:' : 'Completion Rate:'}{' '}
              <span className="font-mono font-black">{completionRate}%</span>
            </span>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="py-12 text-center opacity-60 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold">
              {isAr ? 'لا توجد بيانات استشارات متوفرة حالياً' : 'No consultation data available'}
            </p>
            <p className="text-xs opacity-75">
              {isAr
                ? 'استخدم زر "مزامنة البيانات" بالأعلى لتوليد طلبات افتراضية في Firestore لعرض المخطط التفاعلي'
                : 'Click "Sync Data" above to populate sample consultation leads in Firestore.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Pie Chart Visualization */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[280px]">
            {isMounted && (
              <div className="w-full h-[270px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {React.createElement(
                      Pie as any,
                      {
                        data,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 65,
                        outerRadius: 95,
                        paddingAngle: 4,
                        dataKey: "value",
                        activeIndex: activeIndex !== null ? activeIndex : undefined,
                        activeShape: renderActiveShape,
                        onMouseEnter: (_: any, index: number) => setActiveIndex(index),
                        onMouseLeave: () => setActiveIndex(null),
                        onClick: (entry: any) => {
                          if (onSelectStatus && entry && entry.key) {
                            onSelectStatus(entry.key);
                          }
                        },
                        className: "cursor-pointer outline-none",
                      },
                      data.map((entry) => (
                        <Cell
                          key={`cell-${entry.key}`}
                          fill={entry.color}
                          stroke={isDark ? '#080d2b' : '#ffffff'}
                          strokeWidth={2}
                          className="cursor-pointer transition-transform hover:opacity-90"
                        />
                      ))
                    )}
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length > 0) {
                          const pData = payload[0]?.payload;
                          if (!pData) return null;
                          return (
                            <div
                              className={`p-3 rounded-xl border shadow-xl backdrop-blur-md text-xs font-bold ${
                                isDark
                                  ? 'bg-[#0f172a]/95 border-white/20 text-white'
                                  : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: pData.color }}
                                />
                                <span className="font-extrabold">{pData.name}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 opacity-80 font-mono text-[11px]">
                                <span>{isAr ? 'العدد:' : 'Count:'} {pData.value}</span>
                                <span>{pData.percentage}%</span>
                              </div>
                              <div className="mt-1 text-[10px] text-blue-400 font-normal">
                                {isAr ? 'انقر للفلترة والاستعراض' : 'Click to filter list'}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Badge / Hover Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {activeItem ? (
                    <div className="text-center animate-fadeIn">
                      <span
                        className="text-2xl font-black font-mono block leading-none"
                        style={{ color: activeItem.color }}
                      >
                        {activeItem.value}
                      </span>
                      <span className="text-[11px] font-bold opacity-80 block mt-0.5">
                        {activeItem.nameShort}
                      </span>
                      <span className="text-[10px] font-mono opacity-60">
                        {activeItem.percentage}%
                      </span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-2xl font-black font-mono block leading-none text-blue-500">
                        {total}
                      </span>
                      <span className="text-[11px] font-bold opacity-80 block mt-0.5">
                        {isAr ? 'إجمالي الطلبات' : 'Total Leads'}
                      </span>
                      <span className="text-[10px] opacity-60">
                        {isAr ? 'مرر للمعاينة' : 'Hover to view'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Status Breakdown List & Interactive Filter Cards */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="text-xs font-bold opacity-75 mb-1 flex items-center justify-between">
              <span>{isAr ? 'تفصيل الحالات ونسب التوزيع:' : 'Status Breakdown & Actions:'}</span>
              <span className="text-[10px] text-blue-400">
                {isAr ? '(انقر على أي حالة لفلترة القائمة)' : '(Click any status to filter)'}
              </span>
            </div>

            {data.map((item, idx) => {
              const conf = STATUS_CONFIGS[item.key];
              const Icon = conf.icon;
              const isSelected = selectedStatus === item.key;
              const isHovered = activeIndex === idx;

              return (
                <div
                  key={item.key}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => onSelectStatus?.(item.key as any)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? isDark
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                        : 'bg-blue-50 border-blue-400 text-blue-900 shadow-md'
                      : isHovered
                      ? isDark
                        ? 'bg-white/10 border-white/20'
                        : 'bg-slate-100 border-slate-300'
                      : isDark
                      ? 'bg-white/5 border-white/5 hover:bg-white/10'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isDark ? conf.bgDark : conf.bgLight
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">
                          {isAr ? conf.labelAr : conf.labelEn}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500 text-white font-bold">
                            {isAr ? 'محدد' : 'Active'}
                          </span>
                        )}
                      </div>
                      {/* Visual progress bar */}
                      <div className="w-32 sm:w-44 bg-gray-500/20 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: conf.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-sm font-black font-mono" style={{ color: conf.color }}>
                        {item.value}
                      </span>
                      <span className="text-[11px] opacity-60">
                        ({item.percentage}%)
                      </span>
                    </div>
                    <span className="text-[10px] opacity-50 block">
                      {isAr ? 'طلب' : 'leads'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

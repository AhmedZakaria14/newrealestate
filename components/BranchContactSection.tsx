'use client';

import React, { useState } from 'react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

export default function BranchContactSection() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<'khobar' | 'riyadh'>('khobar');

  const branches = {
    khobar: {
      nameAr: 'المقر الرئيسي — حي الريان، الدمام (المنطقة الشرقية)',
      nameEn: 'Headquarters — Al-Rayyan, Dammam (Eastern Province)',
      addressAr: '4737 شارع 18 - حي الريان وحدة رقم: 1، الدمام 32256 - 8405، المملكة العربية السعودية',
      addressEn: '4737 18th - Al-Rayyan Unit No.: 1, Dammam 32256 - 8405, Kingdom of Saudi Arabia',
      phone: '+966138444663',
      phoneDisplay: '+966 13 844 4663',
      fax: '+966 13 844 4663 Ext. 108',
      whatsapp: '+966556125711',
      whatsappDisplay: '+966 55 612 5711',
      email: 'info@hardgp.com',
      hoursAr: 'الأحد - الخميس: 8:00 ص – 6:00 م (طوارئ المشاريع والصيانة 24/7)',
      hoursEn: 'Sun - Thu: 8:00 AM – 6:00 PM (Emergency Contracting & AMC 24/7)',
      coverageAr: 'الدمام، الخُبر، الظهران، الجبيل، الأحساء، وكافة محافظات المنطقة الشرقية',
      coverageEn: 'Dammam, Al Khobar, Dhahran, Jubail, Al Ahsa, and Eastern Province',
    },
    riyadh: {
      nameAr: 'خدمات التوسع الإقليمي — المنطقتان الوسطى والغربية',
      nameEn: 'Regional Expansion — Central & Western Provinces',
      addressAr: 'مشاريع وخدمات التوسع: الرياض والمنطقة الوسطى، وجدة والمنطقة الغربية',
      addressEn: 'Expansion Projects: Central Province (Riyadh) and Western Province (Jeddah)',
      phone: '+966138444663',
      phoneDisplay: '+966 13 844 4663',
      fax: '+966 13 844 4663 Ext. 108',
      whatsapp: '+966556125711',
      whatsappDisplay: '+966 55 612 5711',
      email: 'info@hardgp.com',
      hoursAr: 'الأحد - الخميس: 8:00 ص – 6:00 م (مكتب التنسيق المركزي)',
      hoursEn: 'Sun - Thu: 8:00 AM – 6:00 PM (Central Coordination Desk)',
      coverageAr: 'تغطية مشاريع الإنشاءات والتطوير العقاري بالمنطقة الوسطى (الرياض) والمنطقة الغربية',
      coverageEn: 'Coverage for Construction & Real Estate Development in Central & Western Provinces',
    },
  };

  const branch = branches[selectedBranch];

  return (
    <section
      id="contact-branches"
      className={`py-16 sm:py-24 transition-colors border-t ${
        isDark ? 'bg-[#040618] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
            <Building2 className="w-4 h-4" />
            <span>{isAr ? 'المقرات والتواصل المباشر' : 'Headquarters & Direct Access'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {isAr ? 'مستعدون لبدء مشروعك القادم' : 'Ready to Launch Your Next Milestone'}
          </h2>
          <p className="text-sm sm:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'تفضل بزيارة مقرنا الرئيسي بحي الريان بالدمام، أو تواصل مباشرة مع فريق المهندسين وإدارة المشاريع لحجز استشارة هندسية أو طلب خدمات المقاولات والتطوير العقاري.'
              : 'Visit our headquarters in Al-Rayyan, Dammam, or connect directly with our engineering and project management teams for contracting and property development.'}
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 max-w-md w-full">
            <button
              type="button"
              onClick={() => setSelectedBranch('khobar')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                selectedBranch === 'khobar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {isAr ? 'المقر الرئيسي (الدمام)' : 'Dammam HQ'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('riyadh')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                selectedBranch === 'riyadh'
                  ? 'bg-blue-600 text-white shadow-md'
                  : isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {isAr ? 'المنطقة الوسطى والغربية' : 'Central & Western'}
            </button>
          </div>
        </div>

        {/* Branch Details Card */}
        <div
          className={`rounded-3xl border shadow-2xl p-6 sm:p-8 lg:p-12 ${
            isDark
              ? 'bg-[#080d2b] border-white/10 shadow-black/40'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-500 block mb-1">
                  {selectedBranch === 'khobar' ? (isAr ? 'المركز الإداري والهندسي الرئيسي' : 'Central Corporate Hub') : (isAr ? 'الفرع التنفيذي بالرياض' : 'Capital Executive Office')}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  {isAr ? branch.nameAr : branch.nameEn}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5">{isAr ? 'العنوان والموقع:' : 'Physical Address:'}</span>
                    <p className="opacity-75">{isAr ? branch.addressAr : branch.addressEn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold block mb-0.5">{isAr ? 'أرقام الاتصال والفاكس:' : 'Telephone, Fax & Mobile:'}</span>
                    <p className="opacity-75">
                      <span className="font-medium">{isAr ? 'هاتف: ' : 'Tel: '}</span>+966 13 844 4663
                      <span className="mx-2 opacity-50">|</span>
                      <span className="font-medium">{isAr ? 'فاكس: ' : 'FAX: '}</span>+966 13 844 4663 Ext. 108
                    </p>
                    <p className="opacity-75">
                      <span className="font-medium">{isAr ? 'جوال: ' : 'Mobile: '}</span>+966 55 612 5711
                      <span className="mx-2 opacity-50">|</span>
                      <span className="font-medium">{isAr ? 'بريد: ' : 'E-mail: '}</span>info@hardgp.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5">{isAr ? 'ساعات العمل الرسمية:' : 'Working Hours:'}</span>
                    <p className="opacity-75">{isAr ? branch.hoursAr : branch.hoursEn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5">{isAr ? 'نطاق التغطية الميدانية:' : 'Coverage Region:'}</span>
                    <p className="opacity-75">{isAr ? branch.coverageAr : branch.coverageEn}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${branch.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'اتصال مباشر:' : 'Call:'} {branch.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${branch.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'محادثة واتساب فورية' : 'WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isDark
                      ? 'border-white/20 hover:bg-white/10 text-white'
                      : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{isAr ? 'حجز موعد زيارة للمقر' : 'Book HQ Visit'}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Interactive Inquiry Card */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 sm:p-7 rounded-3xl border ${
                  isDark
                    ? 'bg-[#05081e] border-white/10'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
                    {isAr ? 'استجابة هندسية خلال أقل من 15 دقيقة' : 'Response within 15 Minutes'}
                  </span>
                </div>

                <h4 className="text-lg font-black mb-2">
                  {isAr ? 'اطلب استشارة أو عرض سعر مخصص' : 'Request Tailored Engineering Quote'}
                </h4>
                <p className="text-xs opacity-75 mb-6 leading-relaxed">
                  {isAr
                    ? 'فريق المهندسين ومستشاري التسويق العقاري جاهز للرد على استفسارك وتزويدك بالتفاصيل الفنية والمالية.'
                    : 'Our senior engineering consultants are on standby to evaluate your requirements and provide verified schedules.'}
                </p>

                <button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'فتح استمارة الاستشارة والميزانية' : 'Open Consultation Form'}</span>
                </button>

                <div className="mt-4 pt-4 border-t border-gray-500/15 flex items-center justify-between text-[11px] opacity-75">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    {isAr ? 'سرية تامة للبيانات' : '100% Confidential'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {isAr ? 'رخصة فال معتمدة' : 'Licensed Advisory'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </section>
  );
}

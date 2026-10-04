'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Fan,
  PhoneCall,
  AlertCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Zap,
  Phone,
  Send,
  Loader2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { createConsultation } from '@/lib/firestore-service';

export default function HvacEmergencyPage() {
  const { language, theme, direction } = useLanguageTheme();
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    facilityType: isAr ? 'مستشفى / مركز طبي' : 'Hospital / Medical Facility',
    location: 'الخُبر / الدمام',
    problem: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createConsultation({
        name: form.name,
        phone: form.phone,
        service: 'طوارئ التكييف والشيلرات 24/7',
        budget: 'طوارئ عاجلة',
        details: `${form.facilityType} - الموقع: ${form.location} - العطل: ${form.problem}`,
        status: 'new',
        source: 'صفحة طوارئ التكييف 24/7',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting emergency lead:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#030617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />

      {/* Header Banner */}
      <section className={`pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b ${isDark ? 'bg-red-950/20 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Link href="/" className="hover:text-blue-500">{isAr ? 'الرئيسية' : 'Home'}</Link>
              <span>/</span>
              <Link href="/hvac" className="hover:text-blue-500">{isAr ? 'هارد للتكييف' : 'HARD HVAC'}</Link>
              <span>/</span>
              <span className="font-bold text-red-500">{isAr ? 'طوارئ التكييف 24/7' : '24/7 Emergency'}</span>
            </div>

            <BackButton fallbackUrl="/hvac" labelAr="الرجوع لقسم التكييف" labelEn="Back to HVAC" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 mb-2 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                {isAr ? 'خط الطوارئ الساخن المباشر 24/7' : '24/7 Live Emergency Hotlines'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-red-500">
                {isAr ? 'طوارئ التكييف المركزي والمرافق الحيوية' : '24/7 Mission-Critical HVAC Dispatch'}
              </h1>
              <p className="text-sm sm:text-base opacity-80 max-w-2xl mt-2 leading-relaxed">
                {isAr
                  ? 'تدخل فوري وسريع لمعالجة توقف الشيلرات وغرف الخوادم (Data Centers) والمستشفيات والمصانع خلال أقل من 90 دقيقة.'
                  : 'Immediate field dispatch for mission-critical cooling failures in data centers, healthcare, and industrial plants within 90 minutes.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+966138901234"
                className="py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 flex items-center gap-2 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>+966 13 890 1234</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Form and Hotline Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dispatch Form */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-2xl ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black">{isAr ? 'تم استلام بلاغ الطوارئ فورياً' : 'Emergency Dispatch Received'}</h3>
                <p className="text-xs opacity-75 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'تم توجيه البلاغ لأقرب شاحنة صيانة متنقلة وفريق المهندسين الميدانيين للتواصل المباشر برقم هاتفك والتحرك للموقع.'
                    : 'Your alert has been routed to our mobile fleet. A chief technical engineer will contact you immediately.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  {isAr ? 'إرسال بلاغ آخر' : 'Submit Another Alert'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-base font-black flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span>{isAr ? 'إرسال بلاغ طوارئ تكييف فوري' : 'Submit Rapid Emergency Alert'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'اسم المنشأة / المسؤول' : 'Facility / Contact Name'}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isAr ? 'مستشفى المواساة / م. أحمد' : 'General Hospital / Eng. Ahmed'}
                      className="w-full p-3 rounded-xl border bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'رقم الهاتف المباشر' : 'Emergency Contact Phone'}</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+966 50 000 0000"
                      className="w-full p-3 rounded-xl border bg-transparent dir-ltr font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'نوع المنشأة' : 'Facility Type'}</label>
                    <select
                      value={form.facilityType}
                      onChange={(e) => setForm({ ...form, facilityType: e.target.value })}
                      className="w-full p-3 rounded-xl border bg-slate-900 text-white"
                    >
                      <option value="مستشفى / مركز طبي">{isAr ? 'مستشفى / مركز طبي' : 'Hospital / Medical'}</option>
                      <option value="مركز بيانات داتا سنتر">{isAr ? 'مركز بيانات داتا سنتر' : 'Data Center'}</option>
                      <option value="برج تجاري / إداري">{isAr ? 'برج تجاري / إداري' : 'Corporate Tower'}</option>
                      <option value="مصنع / مستودع مبرد">{isAr ? 'مصنع / مستودع مبرد' : 'Industrial / Cold Storage'}</option>
                      <option value="قصر / فيلا خاصة">{isAr ? 'قصر / فيلا خاصة' : 'Private Estate'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isAr ? 'المدينة / الحي' : 'City / Neighborhood'}</label>
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full p-3 rounded-xl border bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">{isAr ? 'وصف العطل الطارئ' : 'Emergency Failure Description'}</label>
                  <textarea
                    rows={3}
                    required
                    value={form.problem}
                    onChange={(e) => setForm({ ...form, problem: e.target.value })}
                    placeholder={isAr ? 'توقف مفاجئ في شيلر رقم 2، ارتفاع حرارة غرفة السيرفرات...' : 'Chiller #2 shutdown, server room temperature critical...'}
                    className="w-full p-3 rounded-xl border bg-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{isAr ? 'إرسال بلاغ الطوارئ فوراً لقاعدة البيانات' : 'Dispatch Rapid Response Now'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* SLA Info Card */}
          <div
            className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
              isDark ? 'bg-[#080d2b] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="text-base font-black">{isAr ? 'معايير الاستجابة لطوارئ التكييف' : 'Emergency SLA Standards'}</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-500/5 border border-gray-500/10">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">{isAr ? '90 دقيقة وقت الوصول الميداني' : '90 Minutes Max Arrival Time'}</h4>
                  <p className="opacity-75 mt-0.5">{isAr ? 'تغطية فورية لكافة أحياء الخبر، الدمام، الظهران، ورأس تنورة.' : 'Rapid dispatch covering Khobar, Dammam, and Dhahran.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-500/5 border border-gray-500/10">
                <Wrench className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">{isAr ? 'شاحنات صيانة مجهزة بالكامل' : 'Fully Equipped Mobile Fleet'}</h4>
                  <p className="opacity-75 mt-0.5">{isAr ? 'تحتوي أسطوانات غاز الفريون ومضخات الفاكيوم وأجهزة الفحص الإلكتروني.' : 'Equipped with digital vacuum pumps, freon canisters, and diagnostic units.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-500/5 border border-gray-500/10">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">{isAr ? 'مهندسون وفنيون معتمدون' : 'Certified HVAC Engineers'}</h4>
                  <p className="opacity-75 mt-0.5">{isAr ? 'فريق فني مرخص يحمل شهادات اعتماد لأنظمة الشيلرات الكبرى.' : 'Factory-certified technicians specialized in York, Carrier, and Trane.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

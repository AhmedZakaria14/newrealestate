'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

export default function ContactUsPage() {
  const { language, theme, t, direction } = useLanguageTheme();
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={t('nav.contact')}
        subtitle={
          language === 'ar'
            ? 'تواصل مع كبار مهندسينا ومديري المشاريع لطلب دراسات الجدوى، معاينات المواقع، أو الاستشارات الإنشائية.'
            : 'Get in touch with our engineering and project management leads for estimates, site audits, or partnerships.'
        }
        breadcrumb={[{ label: t('nav.contact') }]}
      />

      <section
        className={`py-24 sm:py-32 overflow-hidden transition-colors ${
          isDark ? 'bg-[#040618] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 px-3.5 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  {language === 'ar' ? 'تواصل معنا مباشرة' : 'Get In Touch'}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {language === 'ar' ? 'مستعدون لبناء صرحك المعماري' : "We're ready to build your future"}{' '}
                  <span className={isDark ? 'text-[#DCFF09]' : 'text-emerald-600'}>
                    {language === 'ar' ? 'بأعلى إتقان' : 'together'}
                  </span>
                </h2>
                <p className="opacity-80 text-sm sm:text-base leading-relaxed">
                  {language === 'ar'
                    ? 'هل لديك فكرة معمارية، قطعة أرض تجارية، أو تخطط لفيلا سكنية راقية؟ تواصل مع مهندسينا للحصول على استشارة فنية وتقديرات واضحة للمشروع.'
                    : 'Have an architectural concept, commercial plot, or residential luxury villa in mind? Contact our engineering leads for transparent estimates.'}
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                <div
                  className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#DCFF09]/10 text-[#DCFF09]' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-70 font-bold block mb-1">
                      {t('footer.callUs')}
                    </span>
                    <a
                      href="tel:+91123456789"
                      dir="ltr"
                      className={`text-lg font-bold transition-colors block text-left rtl:text-right ${
                        isDark ? 'hover:text-[#DCFF09]' : 'hover:text-emerald-600'
                      }`}
                    >
                      +91 (123) 456-789
                    </a>
                    <span className="text-xs opacity-70 block mt-0.5">
                      {t('drawer.hours')}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#DCFF09]/10 text-[#DCFF09]' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-70 font-bold block mb-1">
                      {t('footer.emailUs')}
                    </span>
                    <a
                      href="mailto:info@skyvillaconstruction.com"
                      className={`text-lg font-bold transition-colors truncate block ${
                        isDark ? 'hover:text-[#DCFF09]' : 'hover:text-emerald-600'
                      }`}
                    >
                      info@skyvillaconstruction.com
                    </a>
                    <span className="text-xs opacity-70 block mt-0.5">
                      {language === 'ar' ? 'الرد خلال 24 ساعة كحد أقصى' : 'Typical reply time: within 24 hours'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                    isDark ? 'bg-[#080b24] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#DCFF09]/10 text-[#DCFF09]' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-70 font-bold block mb-1">
                      {t('footer.location')}
                    </span>
                    <p className="text-sm font-bold">
                      {t('footer.locationVal')}
                    </p>
                    <span className="text-xs opacity-70 block mt-0.5">
                      {language === 'ar' ? 'المقر الرئيسي واستوديو التصميم الهندسي' : 'Global Headquarters & Engineering Studio'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div
                className={`p-8 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden ${
                  isDark
                    ? 'bg-[#080b24] border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-500">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold">{t('modal.successTitle')}</h3>
                    <p className="opacity-80 max-w-md mx-auto text-sm leading-relaxed">
                      {t('modal.successDesc')}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className={`px-8 py-3 font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-md ${
                        isDark
                          ? 'bg-[#DCFF09] text-[#040618] hover:bg-white'
                          : 'bg-[#0f172a] text-white hover:bg-emerald-600'
                      }`}
                    >
                      {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <span className="text-xs uppercase font-bold text-emerald-500 tracking-wider block mb-1">
                        {language === 'ar' ? 'نموذج التواصل' : 'Inquiry Form'}
                      </span>
                      <h3 className="text-2xl font-bold">{language === 'ar' ? 'أرسل لنا رسالة' : 'Send Us A Message'}</h3>
                      <p className="text-xs opacity-70 mt-1">
                        {language === 'ar'
                          ? 'يرجى تدوين تفاصيل مشروعك وسيقوم مهندسنا المختص بالتواصل معك مباشرة.'
                          : 'Fill out the details below and our lead engineer will respond promptly.'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                            {t('modal.nameLabel')}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={language === 'ar' ? 'سلطان المنصور' : 'John Doe'}
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                              isDark
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                            {t('modal.emailLabel')}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                              isDark
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                            {t('modal.phoneLabel')}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+966 50 000 0000"
                            dir="ltr"
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors text-left rtl:text-right ${
                              isDark
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                            {language === 'ar' ? 'نوع المشروع / الموضوع' : 'Subject / Project Type'}
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder={language === 'ar' ? 'بناء فيلا سكنية فاخرة' : 'Luxury Villa Construction'}
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                              isDark
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                          {t('modal.detailsLabel')}
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('modal.detailsPlaceholder')}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                            isDark
                              ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                          }`}
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className={`w-full py-4 font-bold rounded-2xl transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group cursor-pointer text-sm ${
                            isDark
                              ? 'bg-[#DCFF09] text-[#040618] hover:bg-white shadow-[#DCFF09]/20'
                              : 'bg-[#0f172a] text-white hover:bg-emerald-600 shadow-slate-400/30'
                          }`}
                        >
                          <span>{language === 'ar' ? 'إرسال الرسالة الآن' : 'Send Message Now'}</span>
                          <Send className={`w-4 h-4 transition-transform ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

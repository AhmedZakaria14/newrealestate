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
        pageKey="contact"
        title={language === 'ar' ? 'اتصل بنا وتواصل مع خبرائنا' : 'Contact Us & Reach Our Experts'}
        subtitle={
          language === 'ar'
            ? 'فروعنا في الدمام والخبر ومكاتب التوسع بالرياض لخدمتكم وتقديم الاستشارات الفورية.'
            : 'Offices in Dammam, Khobar, and Riyadh ready to assist your projects around the clock.'
        }
        breadcrumb={[{ label: language === 'ar' ? 'تواصل معنا' : 'Contact Us' }]}
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
                <span className="inline-block text-xs uppercase tracking-widest font-bold text-blue-500 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                  {language === 'ar' ? 'استشارات عقارية معتمدة' : 'Certified Advisory'}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {language === 'ar' ? 'نحن هنا لإرشادك في كل خطوة' : "We're here to guide your investment"}{' '}
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                    {language === 'ar' ? 'بأعلى موثوقية' : 'with excellence'}
                  </span>
                </h2>
                <p className="opacity-100 text-sm sm:text-base leading-relaxed">
                  {language === 'ar'
                    ? 'سواء كنت تبحث عن عقار استثنائي للتملك، أو ترغب في تسويق مشروع عقاري، أو تحتاج لتقييم معتمد وفق رخصة فال، يسعدنا الترحيب بك في مكاتبنا أو التواصل المباشر عبر الهاتف والواتساب.'
                    : 'Whether you are seeking an exceptional residence, marketing a landmark development, or requiring verified FAL valuation, our certified team is at your disposal.'}
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
                      isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-90 font-bold block mb-1">
                      {language === 'ar' ? 'الاتصال المباشر والواتساب' : 'Direct Line & WhatsApp'}
                    </span>
                    <a
                      href="tel:+966556125711"
                      dir="ltr"
                      className={`text-lg font-bold transition-colors block text-left rtl:text-right ${
                        isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                      }`}
                    >
                      +966 55 612 5711
                    </a>
                    <span className="text-xs opacity-90 block mt-0.5">
                      {language === 'ar' ? 'الأحد - الخميس: 8:30 ص - 8:00 م' : 'Sunday - Thursday: 8:30 AM - 8:00 PM'}
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
                      isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-90 font-bold block mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}
                    </span>
                    <a
                      href="mailto:info@hardgp.com"
                      className={`text-lg font-bold transition-colors truncate block ${
                        isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                      }`}
                    >
                      info@hardgp.com
                    </a>
                    <span className="text-xs opacity-90 block mt-0.5">
                      {language === 'ar' ? 'الرد خلال 15 دقيقة خلال ساعات العمل' : 'Fast response within 15 minutes'}
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
                      isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-90 font-bold block mb-1">
                      {language === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                    </span>
                    <p className="text-sm font-bold">
                      {language === 'ar'
                        ? 'طريق الأمير تركي، الكورنيش، الخُبر، المملكة العربية السعودية'
                        : 'Prince Turki Street, Corniche Waterfront, Al Khobar, Saudi Arabia'}
                    </p>
                    <span className="text-xs opacity-90 block mt-0.5">
                      {language === 'ar' ? 'مرخص من الهيئة العامة للعقار برخصة فال 1200028944' : 'REGA Licensed Real Estate Brokerage FAL 1200028944'}
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
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-blue-500/20 text-blue-500">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold">{t('modal.successTitle')}</h3>
                    <p className="opacity-100 max-w-md mx-auto text-sm leading-relaxed">
                      {t('modal.successDesc')}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className={`px-8 py-3 font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-md ${
                        isDark
                          ? 'bg-blue-600 text-white hover:bg-white'
                          : 'bg-[#0f172a] text-white hover:bg-blue-600'
                      }`}
                    >
                      {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <span className="text-xs uppercase font-bold text-blue-500 tracking-wider block mb-1">
                        {language === 'ar' ? 'نموذج التواصل' : 'Inquiry Form'}
                      </span>
                      <h3 className="text-2xl font-bold">{language === 'ar' ? 'أرسل لنا رسالة' : 'Send Us A Message'}</h3>
                      <p className="text-xs opacity-90 mt-1">
                        {language === 'ar'
                          ? 'يرجى تدوين تفاصيل مشروعك وسيقوم مهندسنا المختص بالتواصل معك مباشرة.'
                          : 'Fill out the details below and our lead engineer will respond promptly.'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-100">
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
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-100">
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
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-100">
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
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                            {language === 'ar' ? 'نوع المشروع / الموضوع' : 'Subject / Project Type'}
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder={language === 'ar' ? 'طلب معاينة عقار / إدراج عقار للبيع' : 'Property Viewing / Listing Inquiry'}
                            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                              isDark
                                ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1 opacity-100">
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
                              ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                          }`}
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className={`w-full py-4 font-bold rounded-2xl transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group cursor-pointer text-sm ${
                            isDark
                              ? 'bg-blue-600 text-white hover:bg-white shadow-blue-500/25'
                              : 'bg-[#0f172a] text-white hover:bg-blue-600 shadow-slate-400/30'
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

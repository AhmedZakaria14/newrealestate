'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, Building2, Loader2 } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { createConsultation } from '@/lib/firestore-service';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  initialServiceType?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultService,
  initialServiceType,
}: ConsultationModalProps) {
  const { language, theme, t, direction } = useLanguageTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const initialService = defaultService || initialServiceType;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || (isAr ? 'المقاولات العامة والتطوير الإنشائي' : 'General Contracting & Structural Construction'),
    projectType: isAr ? 'فيلا فاخرة / قصر' : 'Luxury Villa / Mansion',
    budget: isAr ? '3 - 10 ملايين ريال' : '3M - 10M SAR',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createConsultation({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        details: `${formData.projectType} - ${formData.message}`,
        source: 'Consultation Modal',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving consultation to Firestore:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 md:p-8 border ${
          isDark
            ? 'bg-[#080b24] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Accent corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className={`absolute top-5 ${
            direction === 'rtl' ? 'left-5' : 'right-5'
          } p-2 rounded-full hover:bg-gray-500/10 transition-colors opacity-90 hover:opacity-100 cursor-pointer`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="inline-flex p-4 rounded-full bg-blue-500/20 text-blue-500 mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Submitted Successfully!'}
            </h3>
            <p className="opacity-100 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              {isAr
                ? 'شكراً لتواصلك مع هارد للعقارات. سيقوم أحد كبار مستشارينا المعتمدين بالتواصل معك خلال 15 دقيقة.'
                : 'Thank you for reaching out to HARD Real Estate. One of our certified brokers will contact you within 15 minutes.'}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className={`px-8 py-3 font-bold rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'bg-blue-600 text-white hover:bg-white'
                  : 'bg-[#0f172a] text-white hover:bg-sky-600'
              }`}
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-sky-500 mb-2 px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20">
                {isAr ? 'هارد للعقارات | استشارة معتمدة' : 'HARD Real Estate | Certified Advisory'}
              </span>
              <h3 className="text-2xl font-extrabold">
                {isAr ? 'احجز استشارة وساطة أو تسويق عقاري' : 'Book a Brokerage Consultation'}
              </h3>
              <p className="text-sm opacity-90 mt-1">
                {isAr
                  ? 'تحدث مع كبار مستشارينا المعتمدين برخصة فال لمناقشة شراء، بيع، أو تسويق عقارك.'
                  : 'Speak with our licensed FAL brokers regarding property acquisition, sales, or marketing campaigns.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                    {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'سلطان المنصور' : 'Faisal Al-Otaibi'}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                    {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966 50 123 4567"
                    dir="ltr"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors text-left rtl:text-right ${
                      isDark
                        ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                  {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                    {isAr ? 'نوع الخدمة العقارية المطلوبة' : 'Requested Real Estate Service'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#040618] border-white/20 text-white focus:border-blue-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  >
                    {isAr ? (
                      <>
                        <option value="الوساطة واستشارات الاستحواذ الخاصة" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">الوساطة واستشارات الاستحواذ الخاصة</option>
                        <option value="تسويق وإدراج عقار للبيع" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">تسويق وإدراج عقار للبيع</option>
                        <option value="حملات التسويق الرقمي والإنتاج 4K" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">حملات التسويق الرقمي والإنتاج 4K</option>
                        <option value="تسويق مشاريع التطوير الكبرى (Off-Plan)" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">تسويق مشاريع التطوير الكبرى (Off-Plan)</option>
                        <option value="حجز موعد معاينة خاصة لعقار" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">حجز موعد معاينة خاصة لعقار</option>
                        <option value="التقييم العقاري المعتمد" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">التقييم العقاري المعتمد</option>
                      </>
                    ) : (
                      <>
                        <option value="Private Brokerage & Acquisitions" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">Private Brokerage & Acquisitions</option>
                        <option value="List Property for Sale" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">List Property for Sale</option>
                        <option value="Digital Marketing & 4K Cinema Production" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">Digital Marketing & 4K Cinema Production</option>
                        <option value="Master Project Off-Plan Sales" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">Master Project Off-Plan Sales</option>
                        <option value="Private Property Viewing Tour" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">Private Property Viewing Tour</option>
                        <option value="Accredited Property Valuation" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">Accredited Property Valuation</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                    {isAr ? 'الميزانية التقديرية' : 'Estimated Budget'}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#040618] border-white/20 text-white focus:border-blue-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  >
                    <option value="1M - 3M SAR" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">{isAr ? '1 - 3 ملايين ريال' : '1M - 3M SAR'}</option>
                    <option value="3M - 8M SAR" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">{isAr ? '3 - 8 ملايين ريال' : '3M - 8M SAR'}</option>
                    <option value="8M - 20M SAR" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">{isAr ? '8 - 20 مليون ريال' : '8M - 20M SAR'}</option>
                    <option value="20M+ SAR" className="bg-white text-slate-900 dark:bg-[#080b24] dark:text-white">{isAr ? '20+ مليون ريال' : '20M+ SAR'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-100">
                  {isAr ? 'تفاصيل الاستفسار أو مواصفات العقار' : 'Inquiry Details / Property Specs'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isAr
                      ? 'اكتب أي متطلبات خاصة بالحي، المساحة، الإطلالة، أو مواعيد المعاينة المفضلة...'
                      : 'Provide details regarding location, desired space, amenities, or viewing preferences...'
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                    isDark
                      ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-600'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isAr ? 'جاري الحفظ في قاعدة البيانات...' : 'Saving to Database...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isAr ? 'إرسال طلب الاستشارة الآن' : 'Submit Consultation Request'}</span>
                      <Send className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

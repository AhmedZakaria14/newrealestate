'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Phone, Mail, Building2, Loader2, Sparkles } from 'lucide-react';
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
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden touch-none">
          {/* Backdrop with silky Gaussian blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 z-0"
          />

          {/* Modal Card / Bottom Sheet on mobile with native drag physics */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.03, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) {
                onClose();
              }
            }}
            initial={{ opacity: 0, y: '50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '60%', scale: 0.96 }}
            transition={{
              type: 'spring',
              damping: 32,
              stiffness: 380,
              mass: 0.85,
            }}
            className={`relative z-10 w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-[2.25rem] sm:rounded-3xl shadow-2xl p-6 md:p-8 border ${
              isDark
                ? 'bg-[#080b24]/95 border-white/20 text-white ring-1 ring-white/10'
                : 'bg-white/95 border-slate-200 text-slate-900 ring-1 ring-black/5'
            } backdrop-blur-2xl`}
          >
            {/* Mobile Touch Drag Handle */}
            <div className="w-full flex flex-col items-center pb-3 sm:hidden cursor-grab active:cursor-grabbing touch-none select-none">
              <div className="w-12 h-1.5 rounded-full bg-gray-400/50 hover:bg-gray-300 transition-colors" />
              <span className="text-[10px] text-gray-400/70 font-medium mt-1">
                {isAr ? 'اسحب للأسفل للإغلاق' : 'Swipe down to close'}
              </span>
            </div>

            {/* Subtle Top Glowing Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/60 to-transparent shrink-0 mb-4 sm:mb-0" />

            {/* Accent corner blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className={`absolute top-5 ${
                direction === 'rtl' ? 'left-5' : 'right-5'
              } p-2 rounded-2xl hover:bg-gray-500/15 transition-all active:scale-90 opacity-90 hover:opacity-100 cursor-pointer`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black">
                  {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Submitted Successfully!'}
                </h3>
                <p className="opacity-90 max-w-md mx-auto text-sm leading-relaxed">
                  {isAr
                    ? 'شكراً لتواصلك مع مجموعة هارد. سيقوم أحد كبار مهندسينا ومستشارينا المعتمدين بالتواصل معك خلال 15 دقيقة.'
                    : 'Thank you for contacting HARD Group. One of our certified engineers or brokers will contact you within 15 minutes.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className={`px-8 py-3 font-bold rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 ${
                    isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-[#0f172a] text-white hover:bg-blue-600'
                  }`}
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="inline-block text-xs uppercase tracking-widest font-bold text-sky-400 mb-2 px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20">
                    {isAr ? 'مجموعة هارد | استشارة وتسعير معتمد' : 'HARD Group | Certified Advisory & Quote'}
                  </span>
                  <h3 className="text-2xl font-black">
                    {isAr ? 'طلب دراسة تسعير واستشارة فورية' : 'Request Project Quote & Consultation'}
                  </h3>
                  <p className="text-sm opacity-80 mt-1">
                    {isAr
                      ? 'تحدث مع كبار مهندسينا ومستشارينا المعتمدين لمناقشة مشروعك، التكلفة، وجداول الكميات.'
                      : 'Speak with our certified engineering directors regarding your project scope, BOQ and cost.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 opacity-90">
                        {isAr ? 'الاسم الكريم' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? 'محمد العبدالله' : 'Mohammed Al-Abdullah'}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          isDark
                            ? 'bg-black/40 border-white/15 text-white placeholder:text-gray-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 opacity-90">
                        {isAr ? 'رقم الجوال' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          isDark
                            ? 'bg-black/40 border-white/15 text-white placeholder:text-gray-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-90">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDark
                          ? 'bg-black/40 border-white/15 text-white placeholder:text-gray-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 opacity-90">
                        {isAr ? 'القطاع المطلوب' : 'Target Division'}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          isDark ? 'bg-black/80 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="المقاولات العامة والتطوير الإنشائي">
                          {isAr ? 'المقاولات العامة والإنشاءات (SBC)' : 'General Contracting (SBC)'}
                        </option>
                        <option value="الوساطة والتطوير العقاري">
                          {isAr ? 'الوساطة والتطوير العقاري (فال)' : 'Real Estate Development (VAL)'}
                        </option>
                        <option value="صيانة وتكييف الهواء والتشغيل">
                          {isAr ? 'صيانة وتكييف الهواء والتشغيل (AMC)' : 'HVAC Maintenance & AMC'}
                        </option>
                        <option value="دراسات الجدوى وجداول الكميات BOQ">
                          {isAr ? 'دراسة تكاليف وجداول كميات BOQ' : 'BOQ Cost Estimation'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 opacity-90">
                        {isAr ? 'نوع المشروع' : 'Project Type'}
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          isDark ? 'bg-black/80 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="فيلا فاخرة / قصر">{isAr ? 'فيلا فاخرة / قصر' : 'Luxury Villa / Mansion'}</option>
                        <option value="برج تجاري / مجمع مكاتب">{isAr ? 'برج تجاري / مجمع مكاتب' : 'Commercial Tower'}</option>
                        <option value="منشأة صناعية / مستودع">{isAr ? 'منشأة صناعية / مستودع' : 'Industrial Facility'}</option>
                        <option value="أرض استثمارية / مخطط">{isAr ? 'أرض استثمارية / مخطط' : 'Investment Land'}</option>
                        <option value="عقد صيانة تكييف سنوي">{isAr ? 'عقد صيانة تكييف سنوي' : 'Annual AMC Contract'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-90">
                      {isAr ? 'تفاصيل إضافية عن المشروع' : 'Additional Project Details'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? 'اذكر المدينة، المساحة التقريبية، أو أي متطلبات خاصة بالمشروع...'
                          : 'Mention city, approximate area, or specific requirements...'
                      }
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDark
                          ? 'bg-black/40 border-white/15 text-white placeholder:text-gray-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{isAr ? 'جارِ إرسال الطلب...' : 'Submitting Inquiry...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                          <span>{isAr ? 'إرسال طلب الاستشارة والتسعير' : 'Submit Consultation Request'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

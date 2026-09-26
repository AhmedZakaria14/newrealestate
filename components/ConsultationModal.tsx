'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail } from 'lucide-react';
import { useLanguageTheme } from '@/lib/language-theme-context';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultService,
}: ConsultationModalProps) {
  const { language, theme, t, direction } = useLanguageTheme();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || (language === 'ar' ? 'تخطيط المواقع والمخططات' : 'Site Planning'),
    projectType: language === 'ar' ? 'سكني فاخر' : 'Residential',
    budget: language === 'ar' ? '$100k - $500k' : '$100k - $500k',
    message: '',
  });

  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div
        className={`relative w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden border ${
          isDark
            ? 'bg-[#080b24] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Neon accent corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className={`absolute top-5 ${
            direction === 'rtl' ? 'left-5' : 'right-5'
          } p-2 rounded-full hover:bg-gray-500/10 transition-colors opacity-70 hover:opacity-100`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-500 mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t('modal.successTitle')}</h3>
            <p className="opacity-80 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              {t('modal.successDesc')}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className={`px-8 py-3 font-bold rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#DCFF09] text-[#040618] hover:bg-white'
                  : 'bg-[#0f172a] text-white hover:bg-emerald-600'
              }`}
            >
              {t('modal.close')}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-500 mb-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Skyvilla Construction
              </span>
              <h3 className="text-2xl font-extrabold">{t('modal.title')}</h3>
              <p className="text-sm opacity-70 mt-1">{t('modal.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                    {t('modal.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'محمد العبدالله' : 'Cameron Williamson'}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                    {t('modal.phoneLabel')}
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
                        ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                    }`}
                  />
                </div>
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
                  placeholder="client@domain.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                    {t('modal.serviceLabel')}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#040618] border-white/10 text-white focus:border-[#DCFF09]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600'
                    }`}
                  >
                    {language === 'ar' ? (
                      <>
                        <option value="تخطيط المواقع والمخططات">تخطيط المواقع والمخططات</option>
                        <option value="التصميم المعماري والهندسي">التصميم المعماري والهندسي</option>
                        <option value="إدارة وتنفيذ المشاريع">إدارة وتنفيذ المشاريع</option>
                        <option value="التخطيط والدراسات الهندسية">التخطيط والدراسات الهندسية</option>
                        <option value="استشارة بناء عامة">استشارة بناء عامة</option>
                      </>
                    ) : (
                      <>
                        <option value="Site Planning">Site Planning</option>
                        <option value="Building Design">Building Design</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Design & Planning">Design & Planning</option>
                        <option value="General Consultation">General Consultation</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                    {t('modal.budgetLabel')}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#040618] border-white/10 text-white focus:border-[#DCFF09]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600'
                    }`}
                  >
                    <option value="Under $100k">Under $100k</option>
                    <option value="$100k - $500k">$100k - $500k</option>
                    <option value="$500k - $2M">$500k - $2M</option>
                    <option value="$2M+">$2M+ (Luxury Scale)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-80">
                  {t('modal.detailsLabel')}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('modal.detailsPlaceholder')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                    isDark
                      ? 'bg-[#040618] border-white/10 text-white placeholder-gray-500 focus:border-[#DCFF09]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer ${
                    isDark
                      ? 'bg-[#DCFF09] text-[#040618] hover:bg-white'
                      : 'bg-[#0f172a] text-white hover:bg-emerald-600'
                  }`}
                >
                  <span>{t('modal.submit')}</span>
                  <Send className={`w-4 h-4 transition-transform ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs opacity-75">
                <span className="flex items-center gap-1.5" dir="ltr">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  +91 (123) 456-789
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  info@skyvillaconstruction.com
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

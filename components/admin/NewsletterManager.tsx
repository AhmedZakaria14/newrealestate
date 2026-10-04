'use client';

import React, { useState } from 'react';
import {
  Mail,
  Search,
  Download,
  Copy,
  Check,
  Trash2,
  UserPlus,
  RefreshCw,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react';
import {
  NewsletterSubscriberDoc,
  subscribeNewsletter,
  deleteNewsletterSubscriber,
  updateNewsletterSubscriberStatus,
} from '@/lib/firestore-service';

interface NewsletterManagerProps {
  subscribers: NewsletterSubscriberDoc[];
  isDark: boolean;
  isAr: boolean;
}

export default function NewsletterManager({
  subscribers,
  isDark,
  isAr,
}: NewsletterManagerProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');
  const [copied, setCopied] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);

  // Filter list
  const filtered = subscribers.filter((sub) => {
    const matchSearch = (sub.email || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCopyEmails = () => {
    const emails = filtered.map((s) => s.email).filter(Boolean).join(', ');
    if (emails) {
      navigator.clipboard.writeText(emails);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleExportCsv = () => {
    const header = 'Email,Status,Source,Date\n';
    const rows = filtered
      .map((s) => {
        const dateStr = s.createdAt?.toDate ? s.createdAt.toDate().toISOString() : '';
        return `"${s.email}","${s.status}","${s.source || 'footer'}","${dateStr}"`;
      })
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    try {
      setAdding(true);
      await subscribeNewsletter(newEmail, 'admin_manual');
      setNewEmail('');
    } catch (err) {
      console.error(err);
      alert(isAr ? 'حدث خطأ أثناء إضافة البريد' : 'Error adding email');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm(isAr ? 'هل أنت متأكد من حذف هذا المشترك؟' : 'Delete this subscriber?')) {
      await deleteNewsletterSubscriber(id);
    }
  };

  const handleToggleStatus = async (sub: NewsletterSubscriberDoc) => {
    if (!sub.id) return;
    const nextStatus = sub.status === 'active' ? 'unsubscribed' : 'active';
    await updateNewsletterSubscriberStatus(sub.id, nextStatus);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'إدارة النشرة البريدية والعملاء المهتمين' : 'Newsletter Subscribers & Leads'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'تسجيل تزامني مباشر لجميع العملاء والمستثمرين المسجلين عبر الموقع والنماذج'
              : 'Real-time synchronous log of all subscribers and investor leads from website forms'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyEmails}
            className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ كافة الإيميلات' : 'Copy All Emails')}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">إجمالي المشتركين النشطين</span>
          <span className="text-2xl font-black text-blue-400">
            {subscribers.filter((s) => s.status === 'active').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">إجمالي المسجلين في القاعدة</span>
          <span className="text-2xl font-black text-white">{subscribers.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-black/30 border border-white/10">
          <span className="text-xs text-gray-400 font-bold block mb-1">نسبة التفاعل والتأكيد</span>
          <span className="text-2xl font-black text-emerald-400">100% موثقة</span>
        </div>
      </div>

      {/* Manual Add Form */}
      <form onSubmit={handleAddManual} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto" />
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={isAr ? 'إضافة بريد إلكتروني يدوياً لقائمة المشتركين...' : 'Add subscriber email manually...'}
            className="w-full py-2.5 px-10 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>{adding ? (isAr ? 'جارِ الإضافة...' : 'Adding...') : (isAr ? 'إضافة للقائمة' : 'Add to List')}</span>
        </button>
      </form>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'البحث بالبريد الإلكتروني...' : 'Search subscriber email...'}
            className="w-full py-2 px-9 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'active', 'unsubscribed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === filter ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {filter === 'all' && (isAr ? 'الكل' : 'All')}
              {filter === 'active' && (isAr ? 'نشط' : 'Active')}
              {filter === 'unsubscribed' && (isAr ? 'ملغي' : 'Unsubscribed')}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
        <table className="w-full text-right rtl:text-right ltr:text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase font-black">
            <tr>
              <th className="p-3.5">البريد الإلكتروني</th>
              <th className="p-3.5">الحالة</th>
              <th className="p-3.5">المصدر</th>
              <th className="p-3.5">تاريخ التسجيل</th>
              <th className="p-3.5 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 font-bold">
                  {isAr ? 'لا توجد سجلات مطابقة للبحث' : 'No matching subscribers found'}
                </td>
              </tr>
            ) : (
              filtered.map((sub) => {
                const dateDisplay = sub.createdAt?.toDate
                  ? sub.createdAt.toDate().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'حديث';

                return (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-mono">{sub.email}</span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(sub)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black cursor-pointer border ${
                          sub.status === 'active'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}
                        title="انقر لتغيير الحالة"
                      >
                        {sub.status === 'active' ? (isAr ? 'نشط' : 'Active') : (isAr ? 'ملغي' : 'Unsubscribed')}
                      </button>
                    </td>
                    <td className="p-3.5 text-gray-400 font-mono">
                      {sub.source || 'footer'}
                    </td>
                    <td className="p-3.5 text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{dateDisplay}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                        title={isAr ? 'حذف المشترك' : 'Delete subscriber'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

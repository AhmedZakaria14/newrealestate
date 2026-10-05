'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Sparkles,
  X,
  Loader2,
} from 'lucide-react';
import { MediaItemDoc, addMediaItem, deleteMediaItem } from '@/lib/firestore-service';

interface MediaLibraryModalProps {
  media: MediaItemDoc[];
  isDark: boolean;
  isAr: boolean;
  onSelectUrl?: (url: string) => void;
}

export default function MediaLibraryModal({
  media,
  isDark,
  isAr,
  onSelectUrl,
}: MediaLibraryModalProps) {
  const [search, setSearch] = useState('');
  const [filterFolder, setFilterFolder] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItemDoc | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Convert to data url for instant storage & preview
        const reader = new FileReader();
        const readPromise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const dataUrl = await readPromise;

        await addMediaItem({
          name: file.name,
          url: dataUrl,
          size: file.size,
          type: file.type || 'image/jpeg',
          folder: file.type.startsWith('image/') ? 'images' : 'documents',
          uploader: 'Admin Staff',
        });
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert(isAr ? 'حدث خطأ أثناء رفع الملف' : 'Upload error');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const copyUrl = (item: MediaItemDoc) => {
    if (!item.url) return;
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id || item.name);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm(isAr ? 'هل أنت متأكد من حذف هذا الملف من المكتبة؟' : 'Delete this media item?')) {
      await deleteMediaItem(id);
    }
  };

  const filtered = media.filter((m) => {
    const matchSearch = (m.name || '').toLowerCase().includes(search.toLowerCase());
    const matchFolder = filterFolder === 'all' || m.folder === filterFolder;
    return matchSearch && matchFolder;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border backdrop-blur-md bg-white/5 border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <span>{isAr ? 'مركز رفع الصور والملفات والمخططات' : 'Media, Blueprint & Asset Hub'}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isAr
              ? 'رفع وإدارة الصور والمخططات والملفات المعمارية مع إنشاء روابط فورية لاستخدامها في أقسام الموقع'
              : 'Upload and manage images, architectural blueprints, and documents with instant link generation'}
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all cursor-pointer shadow-lg shadow-blue-600/30">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? (isAr ? 'جارِ الرفع والمعالجة...' : 'Processing...') : (isAr ? 'رفع ملفات / صور جديدة' : 'Upload New Files')}</span>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? 'البحث باسم الملف...' : 'Search media by file name...'}
            className="w-full py-2 px-9 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'images', 'documents'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterFolder === f ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {f === 'all' && (isAr ? 'الكل' : 'All')}
              {f === 'images' && (isAr ? 'الصور' : 'Images')}
              {f === 'documents' && (isAr ? 'المخططات والمستندات' : 'Blueprints & Docs')}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-black/20 text-gray-400 space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-600" />
          <p className="text-sm font-bold">
            {isAr ? 'لا توجد وسائط مرفوعة حالياً في هذا القسم' : 'No media items uploaded yet'}
          </p>
          <p className="text-xs text-gray-500">
            {isAr ? 'اضغط على زر "رفع ملفات / صور جديدة" أعلاه لرفع صور المشاريع والعقارات والمخططات' : 'Click "Upload New Files" above to upload property photos and documents.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => {
            const isImg = item.type?.startsWith('image/') || item.url?.startsWith('data:image') || item.url?.includes('unsplash');
            const isCopied = copiedId === (item.id || item.name);

            return (
              <div
                key={item.id || item.name}
                className="group relative rounded-2xl border border-white/10 bg-black/30 overflow-hidden hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                {/* Media Preview Thumbnail */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="relative aspect-video bg-black/50 overflow-hidden cursor-pointer flex items-center justify-center"
                >
                  {isImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <FileText className="w-10 h-10 text-blue-400" />
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] bg-black/70 px-2 py-1 rounded text-white font-bold">
                      {isAr ? 'معاينة' : 'Preview'}
                    </span>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-3 space-y-2">
                  <p className="text-xs font-bold text-white truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => copyUrl(item)}
                      className="flex-1 py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="نسخ الرابط"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? (isAr ? 'تم!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy URL')}</span>
                    </button>

                    {onSelectUrl && (
                      <button
                        type="button"
                        onClick={() => onSelectUrl(item.url)}
                        className="py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-[10px] font-bold text-white transition-colors cursor-pointer"
                        title="اختيار"
                      >
                        {isAr ? 'اختيار' : 'Select'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence mode="wait">
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden touch-none">
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setPreviewItem(null)}
              className="fixed inset-0 bg-black/80 z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                type: 'spring',
                damping: 32,
                stiffness: 380,
                mass: 0.85,
              }}
              className="relative z-10 max-w-3xl w-full bg-[#080d2b] border border-white/20 ring-1 ring-white/10 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white truncate max-w-md">{previewItem.name}</h3>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-90 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-hidden rounded-2xl flex items-center justify-center bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewItem.url} alt={previewItem.name} className="max-h-[60vh] object-contain" />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <span className="text-xs text-gray-400 font-mono">
                  {previewItem.type} · {(previewItem.size / 1024).toFixed(1)} KB
                </span>
                <button
                  onClick={() => copyUrl(previewItem)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Copy className="w-4 h-4" />
                  <span>{isAr ? 'نسخ رابط الصورة المباشر' : 'Copy Direct Image URL'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  youtubeId = 'Y-x0efG1seA',
  title = 'HARD Real Estate Video Tour',
}: VideoModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden touch-none">
          {/* Backdrop with silky Gaussian blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 z-0"
          />

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{
              type: 'spring',
              damping: 32,
              stiffness: 380,
              mass: 0.85,
            }}
            className="relative z-10 w-full max-w-4xl bg-[#040618] border border-white/20 ring-1 ring-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#080b24]">
              <h3 className="font-bold text-white text-sm sm:text-base truncate">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white p-2 rounded-2xl hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export interface StyleSegment {
  text: string;
  className?: string;
  italic?: boolean;
}

interface WordsPullUpMultiStyleProps {
  segments: StyleSegment[];
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  staggerDelay = 0.08,
  delay = 0,
}: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  // Flatten segments into individual words with their respective styles
  const allWords = segments.flatMap((seg) => {
    const words = seg.text.split(/\s+/).filter(Boolean);
    return words.map((w) => ({
      word: w,
      className: seg.className || '',
      italic: seg.italic,
    }));
  });

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap items-baseline justify-center gap-x-[0.25em] gap-y-[0.1em] ${className}`}
    >
      {allWords.map((item, idx) => (
        <span
          key={`${item.word}-${idx}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + idx * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className} ${item.italic ? 'font-serif italic' : ''}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

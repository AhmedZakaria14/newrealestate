'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface StyleSegment {
  text: string;
  className?: string;
  italic?: boolean;
}

interface WordsPullUpMultiStyleProps {
  segments: StyleSegment[];
  className?: string;
  delay?: number;
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  delay = 0,
}: WordsPullUpMultiStyleProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: 'blur(4px)',
    },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap items-baseline gap-x-[0.25em] gap-y-1 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(' ');
        return (
          <React.Fragment key={segIdx}>
            {words.map((word, wordIdx) => {
              if (!word) return null;
              return (
                <motion.span
                  key={`${segIdx}-${wordIdx}-${word}`}
                  variants={child}
                  className={`inline-block ${segment.className || ''} ${
                    segment.italic ? 'font-serif italic' : ''
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}

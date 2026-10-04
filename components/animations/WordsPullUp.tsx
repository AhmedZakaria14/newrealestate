'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delay = 0,
  staggerDelay = 0.08,
  as: Component = 'div',
}: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-flex flex-wrap items-baseline gap-x-[0.25em] ${className}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;

        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden relative"
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative transform-gpu will-change-transform"
            >
              {word}
              {showAsterisk && isLastWord && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[#DEDBC8] font-normal leading-none select-none">
                  *
                </sup>
              )}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}

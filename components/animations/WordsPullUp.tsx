'use client';

import React from 'react';
import { motion } from 'motion/react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delay = 0,
}: WordsPullUpProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: 24,
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
    <motion.span
      className={`inline-flex flex-wrap items-center gap-x-[0.28em] ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
      {showAsterisk && (
        <motion.span
          variants={child}
          className="inline-block text-[#DEDBC8] select-none align-super text-[0.7em] ml-1"
        >
          *
        </motion.span>
      )}
    </motion.span>
  );
}

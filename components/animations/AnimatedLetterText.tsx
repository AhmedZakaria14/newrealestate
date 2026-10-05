'use client';

import React from 'react';
import { motion } from 'motion/react';

interface AnimatedLetterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedLetterText({
  text,
  className = '',
  delay = 0.1,
}: AnimatedLetterTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

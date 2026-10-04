'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedLetterTextProps {
  text: string;
  className?: string;
}

function SingleCharacter({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
}

export default function AnimatedLetterText({
  text,
  className = '',
}: AnimatedLetterTextProps) {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const total = chars.length;

  return (
    <p ref={targetRef} className={className}>
      {chars.map((char, i) => {
        const charProgress = i / total;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);

        return (
          <SingleCharacter
            key={`${char}-${i}`}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

'use client';

import React from 'react';
import CircularLogoLoader from '@/components/CircularLogoLoader';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10">
        <CircularLogoLoader size="lg" />
      </div>
    </div>
  );
}

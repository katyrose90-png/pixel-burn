import React from 'react';

export default function StartIndicator({ text = 'CLICK TO START' }) {
  return (
    <div className="absolute bottom-20 sm:bottom-28 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20">
      <div className="font-display text-[10px] sm:text-sm text-[hsl(var(--retro-yellow))] neon-yellow animate-pulse">
        ▶ {text} ◀
      </div>
    </div>
  );
}
import React from 'react';

export default function RetroLoader({ label = 'LOADING' }) {
  return (
    <div className="absolute inset-0 z-[40] flex flex-col items-center justify-center gap-3 bg-[hsl(var(--background))]">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-3 h-3 bg-[hsl(var(--retro-green))]"
            style={{
              animation: `loader-blink 0.6s ${i * 0.18}s steps(1) infinite`,
              boxShadow: '2px 2px 0 #000',
            }}
          />
        ))}
      </div>
      <span className="font-display text-[9px] sm:text-[11px] text-[hsl(var(--retro-green))] neon">
        {label}
      </span>
    </div>
  );
}
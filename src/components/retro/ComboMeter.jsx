import React from 'react';

const SEGMENTS = 8;

export default function ComboMeter({ combo }) {
  const filled = Math.min(combo, SEGMENTS);
  return (
    <div className="absolute bottom-16 left-3 z-30 flex flex-col items-start gap-1 pointer-events-none select-none">
      <span className="font-display text-[7px] sm:text-[8px] text-[hsl(var(--retro-cyan))] neon">
        SPEED
      </span>
      <div className="flex gap-[2px]">
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const on = i < filled;
          const high = i >= SEGMENTS - 2;
          return (
            <div
              key={i}
              className="w-[5px] h-4 border border-black/60"
              style={{
                background: on
                  ? high
                    ? 'hsl(var(--retro-pink))'
                    : i >= SEGMENTS - 4
                      ? 'hsl(var(--retro-yellow))'
                      : 'hsl(var(--retro-green))'
                  : 'hsl(var(--retro-panel))',
                boxShadow: on ? '0 0 4px currentColor' : 'none',
              }}
            />
          );
        })}
      </div>
      <span className="font-display text-[7px] sm:text-[8px] text-white neon">
        x{combo || 1}
      </span>
    </div>
  );
}
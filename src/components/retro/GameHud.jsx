import React from 'react';

export default function GameHud({
  calories,
  level,
  clicks,
  muted,
  onToggleMute,
  onBack,
}) {
  return (
    <header className="relative z-30 flex items-center justify-between gap-2 px-3 sm:px-5 py-3">
      <div className="min-w-[64px]">
        {onBack && (
          <button onClick={onBack} className="pixel-btn">
            ◀ GYM
          </button>
        )}
      </div>

      <div className="text-center">
        <div className="font-display text-[8px] text-[hsl(var(--retro-cyan))]">
          CALORIES BURNED
        </div>
        <div className="font-display text-sm sm:text-lg text-[hsl(var(--retro-green))] neon mt-1">
          {Math.floor(calories).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-[64px] justify-end">
        <div className="text-right">
          <div className="font-display text-[8px] text-[hsl(var(--retro-yellow))]">
            LV {level}
          </div>
          <div className="font-display text-[8px] text-white/50">
            {clicks.toLocaleString()} HITS
          </div>
        </div>
        <button onClick={onToggleMute} className="pixel-btn !px-2">
          {muted ? 'OFF' : 'ON'}
        </button>
      </div>
    </header>
  );
}
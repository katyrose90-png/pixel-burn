import React from 'react';
import { Image } from '@/components/ui/image';
import GameHud from './GameHud';

export default function StationFrame({
  bgUrl,
  label,
  onBack,
  stats,
  muted,
  onToggleMute,
  children,
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden crt-stage">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgUrl}
          fittingType="fill"
          alt={label}
          className="block w-full h-full object-cover pixel-img brightness-110"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <GameHud
        calories={stats.calories}
        level={stats.level}
        clicks={stats.clicks}
        muted={muted}
        onToggleMute={onToggleMute}
        onBack={onBack}
      />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 font-display text-[9px] sm:text-[11px] text-[hsl(var(--retro-cyan))] neon z-20">
        {label}
      </div>

      {children}
    </div>
  );
}
import React, { useState } from 'react';
import GameHud from './GameHud';
import RetroLoader from './RetroLoader';
import { optimizedBg } from './assets';

export default function StationFrame({
  bgUrl,
  label,
  onBack,
  stats,
  muted,
  onToggleMute,
  children,
  bgClassName = 'brightness-110',
  overlayOpacity = 'bg-black/35',
}) {
  const [bgLoaded, setBgLoaded] = useState(false);
  return (
    <div className="relative min-h-screen w-full overflow-hidden crt-stage">
      {!bgLoaded && <RetroLoader label="LOADING STATION" />}
      <div className={`absolute inset-0 z-0 ${bgClassName}`}>
        <img
          src={optimizedBg(bgUrl)}
          alt={label}
          loading="eager"
          fetchpriority="high"
          onLoad={() => setBgLoaded(true)}
          className="block w-full h-full object-cover pixel-img"
        />
        <div className={`absolute inset-0 ${overlayOpacity}`} />
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
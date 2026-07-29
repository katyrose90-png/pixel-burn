import React from 'react';
import { Image } from '@/components/ui/image';
import { ART } from '../assets';
import GameHud from '../GameHud';

const STATIONS = [
  {
    id: 'treadmill',
    label: 'TREADMILL',
    style: { left: '5%', top: '36%', width: '27%', height: '50%' },
  },
  {
    id: 'barbell',
    label: 'BARBELL',
    style: { left: '37%', top: '38%', width: '26%', height: '44%' },
  },
  {
    id: 'punching',
    label: 'PUNCHING BAG',
    style: { left: '67%', top: '32%', width: '28%', height: '52%' },
  },
];

export default function GymWide({ onNavigate, stats, muted, onToggleMute }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden crt-stage">
      <div className="absolute inset-0 z-0">
        <Image
          src={ART.gym}
          fittingType="fill"
          alt="Gym wide"
          className="block w-full h-full object-cover pixel-img brightness-110"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <GameHud
        calories={stats.calories}
        level={stats.level}
        clicks={stats.clicks}
        muted={muted}
        onToggleMute={onToggleMute}
      />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 font-display text-[9px] sm:text-[11px] text-[hsl(var(--retro-cyan))] neon z-20">
        ▶ SELECT YOUR STATION ◀
      </div>

      {STATIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          style={s.style}
          className="absolute group z-10"
        >
          <div className="w-full h-full border-4 border-[hsl(var(--retro-green))] group-hover:border-[hsl(var(--retro-yellow))] bg-[hsl(var(--retro-green))]/10 hover:bg-[hsl(var(--retro-yellow))]/20 flex items-end justify-center pb-2 transition-colors animate-pulse">
            <span className="font-display text-[8px] sm:text-[10px] text-white neon text-center px-1">
              {s.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
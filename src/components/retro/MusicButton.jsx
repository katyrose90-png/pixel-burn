import React from 'react';
import { Music, VolumeX } from 'lucide-react';

export default function MusicButton({ on, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className="absolute bottom-4 left-3 z-30 flex items-center gap-2 px-3 py-2 border-2 border-[hsl(var(--retro-cyan))] bg-[hsl(var(--retro-panel))]/85 hover:bg-[hsl(var(--retro-cyan))]/20 transition-colors"
      style={{ boxShadow: '3px 3px 0 0 rgba(0,0,0,0.6)' }}
    >
      {on ? (
        <Music className="w-4 h-4 text-[hsl(var(--retro-cyan))]" />
      ) : (
        <VolumeX className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
      )}
      <span className="font-display text-[7px] sm:text-[8px] text-white neon">
        {on ? 'MUSIC ON' : 'MUSIC'}
      </span>
    </button>
  );
}
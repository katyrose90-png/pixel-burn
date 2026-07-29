import React from 'react';
import { Music, VolumeX, ChevronRight } from 'lucide-react';

export default function MusicButton({ on, trackName, onClick, onNext }) {
  return (
    <div
      className="absolute bottom-4 left-3 z-30 flex items-stretch border-2 border-[hsl(var(--retro-cyan))] bg-[hsl(var(--retro-panel))]/90"
      style={{ boxShadow: '3px 3px 0 0 rgba(0,0,0,0.6)' }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="flex items-center gap-2 px-3 py-2 hover:bg-[hsl(var(--retro-cyan))]/20 transition-colors"
      >
        {on ? (
          <Music className="w-4 h-4 text-[hsl(var(--retro-cyan))]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
        )}
        <span className="font-display text-[7px] sm:text-[8px] text-white neon max-w-[90px] truncate text-left">
          {trackName}
        </span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        disabled={!on}
        className="flex items-center px-2 border-l-2 border-[hsl(var(--retro-cyan))]/50 hover:bg-[hsl(var(--retro-cyan))]/20 transition-colors disabled:opacity-30"
        title="Next track"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
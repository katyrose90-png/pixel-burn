import React from 'react';

function Stat({ label, value, color = 'green' }) {
  const colorMap = {
    green: 'hsl(var(--retro-green))',
    cyan: 'hsl(var(--retro-cyan))',
    yellow: 'hsl(var(--retro-yellow))',
    pink: 'hsl(var(--retro-pink))',
  };
  return (
    <div className="bg-black/40 border-2 border-black/60 p-2">
      <div className="font-display text-[8px] text-white/50">{label}</div>
      <div
        className="font-display text-sm mt-1"
        style={{ color: colorMap[color] }}
      >
        {value}
      </div>
    </div>
  );
}

export default function StatsPanel({
  calories,
  clicks,
  combo,
  multiplier,
  level,
  levelProgress,
  power,
}) {
  return (
    <aside className="pixel-border bg-[hsl(var(--retro-panel))]/85 backdrop-blur-sm p-4 sm:p-5 space-y-4">
      <div>
        <div className="font-display text-[9px] text-[hsl(var(--retro-cyan))]">
          CALORIES BURNED
        </div>
        <div className="font-display text-2xl sm:text-3xl text-[hsl(var(--retro-green))] neon mt-2 break-all">
          {Math.floor(calories).toLocaleString()}
        </div>
      </div>

      <div>
        <div className="flex justify-between font-display text-[9px] text-white/70">
          <span>LV {level}</span>
          <span>{Math.floor(levelProgress * 100)}%</span>
        </div>
        <div className="mt-1 h-4 bg-black/60 border-2 border-black">
          <div
            className="h-full transition-[width] duration-300"
            style={{
              width: `${levelProgress * 100}%`,
              background: 'hsl(var(--retro-yellow))',
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between font-display text-[9px] text-white/70">
          <span>COMBO</span>
          <span className="text-[hsl(var(--retro-pink))]">
            x{multiplier.toFixed(1)}
          </span>
        </div>
        <div className="mt-1 h-4 bg-black/60 border-2 border-black">
          <div
            className="h-full transition-[width] duration-150"
            style={{
              width: `${Math.min(100, (combo / 50) * 100)}%`,
              background: 'hsl(var(--retro-pink))',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <Stat label="CLICKS" value={clicks.toLocaleString()} color="cyan" />
        <Stat label="POWER" value={power.toFixed(1)} color="yellow" />
        <Stat label="LEVEL" value={level} color="green" />
        <Stat label="STREAK" value={combo} color="pink" />
      </div>

      <p className="font-display text-[8px] leading-relaxed text-white/45 pt-2 border-t-2 border-dashed border-white/15">
        CLICK FAST TO BUILD COMBO. HIGHER COMBO = MORE CALORIES PER CLICK.
      </p>
    </aside>
  );
}
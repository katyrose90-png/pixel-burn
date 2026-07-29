import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useHoldToRun } from '../useHoldToRun';
import { ART } from '../assets';

export default function TreadmillStation({ burn, stats, sound, onBack }) {
  const { started, running, pressHandlers } = useHoldToRun(() => {
    burn(0.5);
    sound.playTreadmill();
  }, 110);

  return (
    <StationFrame
      bgUrl={ART.treadmill}
      label="TREADMILL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
    >
      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...pressHandlers}
      >
        {/* moving belt overlay */}
        <div
          className={`absolute left-[26%] right-[26%] bottom-[24%] h-[4%] belt-strip ${
            running ? 'animate-belt' : ''
          }`}
        />
        {/* active glow */}
        {running && (
          <div className="absolute left-1/2 top-[58%] -translate-x-1/2 w-2/3 h-1/4 bg-[hsl(var(--retro-cyan))]/15 blur-2xl rounded-full animate-pulse" />
        )}
        {/* speed lines */}
        {running && (
          <div className="absolute left-[20%] right-[20%] top-[55%] h-[6%] flex items-center gap-2 opacity-70">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 bg-[hsl(var(--retro-yellow))]/70"
                style={{ animation: `belt-scroll 0.3s linear infinite` }}
              />
            ))}
          </div>
        )}
        {!running && (
          <StartIndicator text={started ? 'HOLD TO RUN' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
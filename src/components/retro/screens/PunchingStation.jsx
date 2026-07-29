import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useHoldToRun } from '../useHoldToRun';
import { ART } from '../assets';

export default function PunchingStation({ burn, stats, sound, onBack }) {
  const { started, running, pressHandlers } = useHoldToRun(() => {
    burn(2);
    sound.playPunch();
  }, 300);

  return (
    <StationFrame
      bgUrl={ART.punching}
      label="PUNCHING BAG STATION"
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
        {/* swinging bag overlay */}
        <div
          className={`absolute left-1/2 top-[14%] w-[12%] h-[36%] bag-swing ${
            running ? 'animate-bag' : ''
          }`}
        >
          <div className="w-full h-full bg-gradient-to-b from-[#6B6BC6] to-[#2A2A80] border-4 border-black rounded-t-full" />
          <div className="w-1/3 h-2 bg-[#2A2A80] mx-auto -mt-1 border-x-2 border-black" />
        </div>
        {/* punch glow */}
        {running && (
          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-2/5 h-1/4 bg-[hsl(var(--retro-pink))]/20 blur-2xl rounded-full animate-pulse" />
        )}
        {!running && (
          <StartIndicator text={started ? 'HOLD TO PUNCH' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
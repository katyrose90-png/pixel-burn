import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useHoldToRun } from '../useHoldToRun';
import { ART } from '../assets';

export default function BarbellStation({ burn, stats, sound, onBack }) {
  const { started, running, pressHandlers } = useHoldToRun(() => {
    burn(1.5);
    sound.playLift();
  }, 220);

  return (
    <StationFrame
      bgUrl={ART.barbell}
      label="BARBELL STATION"
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
        {/* lifting barbell overlay — bobs up and down */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-[32%] w-[30%] h-[5%] ${
            running ? 'animate-barbell' : ''
          }`}
        >
          <div className="w-full h-full flex items-stretch">
            <div className="w-4 bg-[#4d4dff] border-2 border-black" />
            <div className="flex-1 bg-[#2a2a9a] border-y-2 border-black" />
            <div className="w-4 bg-[#4d4dff] border-2 border-black" />
          </div>
        </div>
        {/* lift glow */}
        {running && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-[hsl(var(--retro-purple))]/15 blur-2xl rounded-full animate-pulse" />
        )}
        {!running && (
          <StartIndicator text={started ? 'HOLD TO LIFT' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
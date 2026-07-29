import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useClickStation } from '../useClickStation';
import { ART } from '../assets';

export default function BarbellStation({ burn, stats, sound, onBack }) {
  const { active, count, clickHandlers } = useClickStation(() => {
    burn(1.5);
    sound.playLift();
  }, 550);

  return (
    <StationFrame
      bgUrl={ART.barbellAnim}
      label="BARBELL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
    >
      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...clickHandlers}
      >
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP LIFTING' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
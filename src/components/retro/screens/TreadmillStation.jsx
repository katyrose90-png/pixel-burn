import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useClickStation } from '../useClickStation';
import { ART } from '../assets';

export default function TreadmillStation({ burn, stats, sound, onBack }) {
  const { active, count, clickHandlers } = useClickStation(() => {
    burn(0.5);
    sound.playTreadmill();
  }, 500);

  return (
    <StationFrame
      bgUrl={ART.treadmill}
      label="TREADMILL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
      bgClassName="brightness-100"
    >
      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...clickHandlers}
      >
        {/* the treadmill belt — its surface scrolls downward while you click */}
        <div
          className={`absolute left-[14%] right-[14%] bottom-0 h-[34%] tread-belt ${
            active ? 'animate-tread' : ''
          }`}
          style={{
            clipPath: 'polygon(37.5% 0, 60% 0, 68% 100%, 27.5% 100%)',
          }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP CLICKING TO RUN' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
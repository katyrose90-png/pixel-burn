import React from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import ComboMeter from '../ComboMeter';
import MusicButton from '../MusicButton';
import FloatingText from '../FloatingText';
import { useStationExtras } from '../useStationExtras';
import { ART, MUSIC_TRACKS } from '../assets';

export default function TreadmillStation({ burn, stats, sound, onBack }) {
  const {
    active,
    count,
    clickHandlers,
    combo,
    pops,
    musicOn,
    trackIndex,
    toggleMusic,
    nextTrack,
  } = useStationExtras({
    burn,
    burnAmount: 0.5,
    sound,
    soundFn: sound.playTreadmill,
  });

  const beltDuration = Math.max(0.045, 0.16 - combo * 0.009);

  return (
    <StationFrame
      bgUrl={ART.treadmill}
      label="TREADMILL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
      bgClassName="brightness-100"
      overlayOpacity="bg-black/0"
    >
      <MusicButton
        on={musicOn}
        trackName={MUSIC_TRACKS[trackIndex].name}
        onClick={toggleMusic}
        onNext={nextTrack}
      />
      <ComboMeter combo={combo} />

      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...clickHandlers}
      >
        <div
          className="absolute left-[14%] right-[14%] bottom-0 h-[34%] tread-belt"
          style={{
            clipPath: 'polygon(37.5% 0, 60% 0, 68% 100%, 27.5% 100%)',
            animation: active ? `tread-scroll ${beltDuration}s linear infinite` : 'none',
          }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP CLICKING TO RUN' : 'CLICK TO START'} />
        )}
      </div>

      <FloatingText items={pops} />
    </StationFrame>
  );
}
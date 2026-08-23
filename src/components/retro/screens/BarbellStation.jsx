import React from 'react';
import { motion } from 'framer-motion';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import ComboMeter from '../ComboMeter';
import MusicButton from '../MusicButton';
import FloatingText from '../FloatingText';
import { useStationExtras } from '../useStationExtras';
import { ART, MUSIC_TRACKS, optimizedSprite } from '../assets';

export default function BarbellStation({ burn, stats, sound, onBack, music }) {
  const { active, count, clickHandlers, combo, pops } = useStationExtras({
    burn,
    burnAmount: 1.5,
    sound,
    soundFn: sound.playLift,
  });

  return (
    <StationFrame
      bgUrl={ART.barbellAnim}
      label="BARBELL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
      bgClassName="brightness-100"
      overlayOpacity="bg-black/0"
    >
      <MusicButton
        on={music.musicOn}
        trackName={MUSIC_TRACKS[music.trackIndex].name}
        onClick={music.toggleMusic}
        onNext={music.nextTrack}
      />
      <ComboMeter combo={combo} />

      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...clickHandlers}
      >
        <motion.img
          key={count}
          src={optimizedSprite(ART.barbellBar)}
          alt="Barbell"
          initial={{ y: 0 }}
          animate={{ y: [0, -120, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute left-0 bottom-[14%] w-[460%] pixel-img z-20"
          style={{ imageRendering: 'pixelated', transformOrigin: 'left bottom' }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP LIFTING' : 'CLICK TO START'} />
        )}
      </div>

      <FloatingText items={pops} />
    </StationFrame>
  );
}
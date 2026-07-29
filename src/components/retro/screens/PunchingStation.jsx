import React from 'react';
import { motion } from 'framer-motion';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import ComboMeter from '../ComboMeter';
import MusicButton from '../MusicButton';
import FloatingText from '../FloatingText';
import { useStationExtras } from '../useStationExtras';
import { ART, MUSIC_TRACKS } from '../assets';

export default function PunchingStation({ burn, stats, sound, onBack, music }) {
  const { active, count, clickHandlers, combo, pops } = useStationExtras({
    burn,
    burnAmount: 2,
    sound,
    soundFn: sound.playPunch,
  });

  return (
    <StationFrame
      bgUrl={ART.boxingBg}
      label="PUNCHING BAG STATION"
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
          src={ART.punchingBag}
          alt="Punching Bag"
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, 18, -12, 0] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[-6%] h-[104%] pixel-img z-20 bag-swing"
          style={{ imageRendering: 'pixelated', transformOrigin: 'top center', translate: '-50% 0' }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP PUNCHING' : 'CLICK TO START'} />
        )}
      </div>

      <FloatingText items={pops} />
    </StationFrame>
  );
}
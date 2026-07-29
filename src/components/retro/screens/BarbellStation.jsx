import React from 'react';
import { motion } from 'framer-motion';
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
        {/* the barbell — lifts up with each click */}
        <motion.img
          key={count}
          src={ART.barbellBar}
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
    </StationFrame>
  );
}
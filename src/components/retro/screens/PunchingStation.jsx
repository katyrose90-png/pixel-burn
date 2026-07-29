import React from 'react';
import { motion } from 'framer-motion';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import { useClickStation } from '../useClickStation';
import { ART } from '../assets';

export default function PunchingStation({ burn, stats, sound, onBack }) {
  const { active, count, clickHandlers } = useClickStation(() => {
    burn(2);
    sound.playPunch();
  }, 550);

  return (
    <StationFrame
      bgUrl={ART.boxingBg}
      label="PUNCHING BAG STATION"
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
        {/* the bag — swings with each punch */}
        <motion.img
          key={count}
          src={ART.punchingBag}
          alt="Punching Bag"
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, 18, -12, 0] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[4%] h-[60%] pixel-img z-20 bag-swing"
          style={{ imageRendering: 'pixelated', transformOrigin: 'top center', translate: '-50% 0' }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP PUNCHING' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
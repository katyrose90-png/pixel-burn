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
        {...clickHandlers}
      >
        {/* the bag — swings with each punch */}
        <motion.div
          key={count}
          initial={{ rotate: -6 }}
          animate={{ rotate: [-6, 16, -10, 0] }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[14%] w-[12%] h-[36%] bag-swing"
        >
          <div className="w-full h-full bg-gradient-to-b from-[#6B6BC6] to-[#2A2A80] border-4 border-black rounded-t-full" />
          <div className="w-1/3 h-2 bg-[#2A2A80] mx-auto -mt-1 border-x-2 border-black" />
        </motion.div>
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP PUNCHING' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
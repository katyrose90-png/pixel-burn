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
        {...clickHandlers}
      >
        {/* the barbell — lifts up with each click */}
        <motion.div
          key={count}
          initial={{ y: 0 }}
          animate={{ y: [0, -70, 0] }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[30%] w-[26%] h-[4%] flex items-stretch"
        >
          <div className="w-4 bg-[#4d4dff] border-2 border-black" />
          <div className="flex-1 bg-[#2a2a9a] border-y-2 border-black" />
          <div className="w-4 bg-[#4d4dff] border-2 border-black" />
        </motion.div>
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP LIFTING' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
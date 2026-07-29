import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
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
        <motion.div
          key={count}
          initial={{ y: 0 }}
          animate={{ y: [0, -90, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[24%]"
        >
          <Image
            src={ART.barbellBar}
            fittingType="fit"
            alt="Barbell"
            className="w-full h-full pixel-img"
          />
        </motion.div>
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP LIFTING' : 'CLICK TO START'} />
        )}
      </div>
    </StationFrame>
  );
}
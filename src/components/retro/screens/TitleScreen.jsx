import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ART } from '../assets';

export default function TitleScreen({ onStart }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden crt-stage">
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={ART.title}
          fittingType="fill"
          alt="ClickFit"
          className="block w-full h-full object-cover pixel-img brightness-110"
        />
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      <div className="relative min-h-screen flex items-center justify-center">
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={onStart}
          className="absolute bottom-[11%] left-1/2 -translate-x-1/2 pixel-btn text-xs sm:text-base animate-pulse"
        >
          ▶ CLICK TO START ◀
        </motion.button>
      </div>
    </div>
  );
}
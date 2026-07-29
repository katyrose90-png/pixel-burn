import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ART } from '../assets';

export default function TitleScreen({ onStart }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden crt-stage cursor-pointer"
      onClick={onStart}
    >
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={ART.title}
            fittingType="fill"
            quality={70}
            alt="ClickFit"
            className="block w-full h-full object-cover pixel-img brightness-125"
          />
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>
      </motion.div>

      <div className="relative min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute bottom-[5%] left-0 right-0 mx-auto w-max font-display text-sm sm:text-xl text-white animate-pulse"
          style={{ textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 0 6px #fff' }}
        >
          ▶ CLICK TO START ◀
        </motion.div>
      </div>
    </div>
  );
}
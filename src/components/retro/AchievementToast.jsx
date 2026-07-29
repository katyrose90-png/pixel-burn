import React from 'react';
import { motion } from 'framer-motion';

export default function AchievementToast({ title, desc }) {
  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 90, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pixel-border-pink bg-[hsl(var(--retro-panel))] px-6 py-3 text-center"
    >
      <div className="font-display text-[9px] text-[hsl(var(--retro-yellow))] neon-yellow">
        ★ ACHIEVEMENT UNLOCKED ★
      </div>
      <div className="font-display text-sm text-[hsl(var(--retro-green))] mt-2">
        {title}
      </div>
      <div className="text-sm text-white/75 mt-1">{desc}</div>
    </motion.div>
  );
}
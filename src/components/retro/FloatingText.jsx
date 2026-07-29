import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingText({ items }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -70, scale: 1.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute font-display text-sm"
            style={{
              left: it.x,
              top: it.y,
              color: it.crit
                ? 'hsl(var(--retro-yellow))'
                : 'hsl(var(--retro-green))',
              textShadow: '2px 2px 0 #000',
            }}
          >
            {it.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
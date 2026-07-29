import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const PALETTE = {
  H: '#2b1810', // hair
  F: '#f2c18d', // skin
  E: '#1a1030', // eyes
  S: '#e23636', // shirt
  B: '#2f4ec8', // shorts
  L: '#f2c18d', // legs (skin)
  O: '#222226', // shoes
  D: '#aeb6c9', // dumbbell
  A: '#f2c18d', // arm (skin)
};

// 16 wide x 18 tall pixel character holding dumbbells
const ROWS = [
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '.....HFFFFH.....',
  '.....FEFFEF.....',
  '.....FFFFFF.....',
  '.....FFFFFF.....',
  '......FFFF......',
  '.......FF.......',
  'DDDASSSSSSSSADDD',
  '....SSSSSSSS....',
  '....SSSSSSSS....',
  '.....SSSSSS.....',
  '.....BBBBBB.....',
  '.....BBBBBB.....',
  '.....L....L.....',
  '.....L....L.....',
  '....OO....OO....',
];

export default function PixelCharacter({ trigger = 0, size = 14 }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (trigger === 0) return;
    controls.start({
      y: [0, -size * 1.1, 0],
      scaleY: [1, 1.07, 1],
      transition: { duration: 0.24, ease: 'easeOut' },
    });
  }, [trigger, size, controls]);

  return (
    <div className="idle-bob" style={{ width: 16 * size, height: 18 * size }}>
      <motion.div
        animate={controls}
        style={{ width: 16 * size, height: 18 * size }}
        className="relative select-none"
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(16, ${size}px)`,
            gridTemplateRows: `repeat(18, ${size}px)`,
          }}
        >
          {ROWS.flatMap((row, r) =>
            row.split('').map((ch, c) => {
              const color = PALETTE[ch];
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    background: color || 'transparent',
                    boxShadow: color
                      ? 'inset 0 0 0 1px rgba(0,0,0,0.12)'
                      : 'none',
                  }}
                />
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
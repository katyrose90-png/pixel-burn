import { useRef, useState, useCallback } from 'react';

export function useBlip() {
  const ctxRef = useRef(null);
  const [muted, setMuted] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('retro_muted') === '1'
  );

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const beep = useCallback(
    (freq, dur = 0.08, type = 'square', vol = 0.05) => {
      if (muted) return;
      try {
        const ctx = getCtx();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = vol;
        o.connect(g);
        g.connect(ctx.destination);
        const t = ctx.currentTime;
        o.start(t);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.stop(t + dur);
      } catch (e) {
        /* no-op */
      }
    },
    [muted]
  );

  const playClick = useCallback(
    (combo = 0) => {
      beep(440 + Math.min(combo, 30) * 18, 0.06, 'square', 0.05);
    },
    [beep]
  );

  const playLevelUp = useCallback(() => {
    [523, 659, 784, 1046].forEach((f, i) =>
      setTimeout(() => beep(f, 0.13, 'square', 0.07), i * 95)
    );
  }, [beep]);

  const playAchievement = useCallback(() => {
    [659, 784, 988].forEach((f, i) =>
      setTimeout(() => beep(f, 0.11, 'triangle', 0.07), i * 85)
    );
  }, [beep]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const n = !m;
      localStorage.setItem('retro_muted', n ? '1' : '0');
      return n;
    });
  }, []);

  return { playClick, playLevelUp, playAchievement, muted, toggleMute };
}
import { useState, useRef, useCallback, useEffect } from 'react';
import { useClickStation } from './useClickStation';

let popId = 0;

/**
 * Shared station extras: combo meter and floating calorie pop-ups.
 * Music playback is managed at the app root via useMusicPlayer so it
 * persists across screen transitions.
 */
export function useStationExtras({ burn, burnAmount, sound, soundFn }) {
  const [combo, setCombo] = useState(0);
  const [pops, setPops] = useState([]);
  const comboTimer = useRef(null);

  const onClick = useCallback(() => {
    burn(burnAmount);
    soundFn();

    setCombo((c) => {
      const next = c + 1;
      clearTimeout(comboTimer.current);
      comboTimer.current = setTimeout(() => setCombo(0), 650);
      return next;
    });

    const id = ++popId;
    const x = `${20 + Math.random() * 55}%`;
    const y = `${42 + Math.random() * 18}%`;
    setPops((p) => [...p, { id, x, y, text: `+${burnAmount}`, crit: combo > 7 }]);
    setTimeout(() => setPops((p) => p.filter((it) => it.id !== id)), 900);
  }, [burn, burnAmount, soundFn, combo]);

  const { active, count, clickHandlers } = useClickStation(onClick, 500);

  useEffect(() => {
    return () => clearTimeout(comboTimer.current);
  }, []);

  return { active, count, clickHandlers, combo, pops };
}
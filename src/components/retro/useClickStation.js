import { useState, useRef, useCallback } from 'react';

/**
 * Click-based station interaction.
 * Each click fires `onClick` once and keeps the station "active"
 * (driving equipment animation) for `activeMs` after the last click.
 * Returns { active, count, clickHandlers }
 */
export function useClickStation(onClick, activeMs = 400) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const timer = useRef(null);

  const handle = useCallback(() => {
    onClick();
    setCount((c) => c + 1);
    setActive(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), activeMs);
  }, [onClick, activeMs]);

  const clickHandlers = {
    onPointerDown: (e) => {
      e.preventDefault();
      handle();
    },
  };

  return { active, count, clickHandlers };
}
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hold-to-run hook for gym stations.
 * - pointerdown on the bound element starts the loop (and marks "started")
 * - releasing anywhere stops it
 * - onTick fires every tickMs while held
 * Returns { started, running, pressHandlers }
 */
export function useHoldToRun(onTick, tickMs = 120) {
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const tickRef = useRef(onTick);
  tickRef.current = onTick;
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    setStarted(true);
    setRunning(true);
  }, []);

  const stop = useCallback(() => setRunning(false), []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => tickRef.current(), tickMs);
    return () => clearInterval(intervalRef.current);
  }, [running, tickMs]);

  // Stop on pointer up anywhere (so leaving the element while held still stops)
  useEffect(() => {
    if (!running) return;
    const up = () => setRunning(false);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [running]);

  const pressHandlers = {
    onPointerDown: (e) => {
      e.preventDefault();
      start();
    },
  };

  return { started, running, pressHandlers };
}
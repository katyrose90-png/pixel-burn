import { useState, useRef, useCallback, useEffect } from 'react';
import { useClickStation } from './useClickStation';
import { MUSIC_TRACKS } from './assets';

let popId = 0;

/**
 * Shared station extras: combo meter, floating calorie pop-ups,
 * and cycling background music with a next-track control.
 */
export function useStationExtras({ burn, burnAmount, sound, soundFn }) {
  const [combo, setCombo] = useState(0);
  const [pops, setPops] = useState([]);
  const [musicOn, setMusicOn] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const comboTimer = useRef(null);
  const audioRef = useRef(null);

  const playTrack = useCallback(
    (index) => {
      if (sound.muted) return;
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.loop = true;
          audioRef.current.volume = 0.4;
        }
        audioRef.current.volume = 0.4;
        audioRef.current.src = MUSIC_TRACKS[index].url;
        audioRef.current.play();
      } catch (e) {
        /* no-op */
      }
    },
    [sound.muted]
  );

  const stopTrack = useCallback(() => {
    try {
      if (audioRef.current) audioRef.current.pause();
    } catch (e) {
      /* no-op */
    }
  }, []);

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

  const toggleMusic = useCallback(() => {
    if (musicOn) {
      stopTrack();
      setMusicOn(false);
    } else {
      playTrack(trackIndex);
      setMusicOn(true);
    }
  }, [musicOn, playTrack, stopTrack, trackIndex]);

  const nextTrack = useCallback(() => {
    const next = (trackIndex + 1) % MUSIC_TRACKS.length;
    setTrackIndex(next);
    if (musicOn) {
      stopTrack();
      playTrack(next);
    }
  }, [trackIndex, musicOn, stopTrack, playTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (sound.muted) {
      audioRef.current.pause();
    } else if (musicOn) {
      audioRef.current.play().catch(() => {});
    }
  }, [sound.muted, musicOn]);

  useEffect(() => {
    return () => {
      stopTrack();
      clearTimeout(comboTimer.current);
    };
  }, [stopTrack]);

  return {
    active,
    count,
    clickHandlers,
    combo,
    pops,
    musicOn,
    trackIndex,
    toggleMusic,
    nextTrack,
  };
}
import { useState, useRef, useCallback, useEffect } from 'react';
import { MUSIC_TRACKS } from './assets';

/**
 * App-level music player that persists across screen transitions.
 * The audio element lives here so navigating between stations and the gym
 * hub never interrupts playback.
 */
export function useMusicPlayer(sound) {
  const [musicOn, setMusicOn] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
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

  // pause/resume when mute toggles
  useEffect(() => {
    if (!audioRef.current) return;
    if (sound.muted) {
      audioRef.current.pause();
    } else if (musicOn) {
      audioRef.current.play().catch(() => {});
    }
  }, [sound.muted, musicOn]);

  return { musicOn, trackIndex, toggleMusic, nextTrack, stopTrack };
}
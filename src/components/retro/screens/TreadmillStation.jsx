import React, { useState, useRef, useCallback, useEffect } from 'react';
import StationFrame from '../StationFrame';
import StartIndicator from '../StartIndicator';
import ComboMeter from '../ComboMeter';
import MusicButton from '../MusicButton';
import FloatingText from '../FloatingText';
import { useClickStation } from '../useClickStation';
import { ART, MUSIC_TRACKS } from '../assets';

let popId = 0;

export default function TreadmillStation({ burn, stats, sound, onBack }) {
  const [combo, setCombo] = useState(0);
  const [pops, setPops] = useState([]);
  const [musicOn, setMusicOn] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const comboTimer = useRef(null);
  const audioRef = useRef(null);

  const beltDuration = Math.max(0.045, 0.16 - combo * 0.009);

  const playTrack = useCallback(
    (index) => {
      if (sound.muted) return;
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.loop = true;
        }
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
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } catch (e) {
      /* no-op */
    }
  }, []);

  const handleClick = useCallback(() => {
    burn(0.5);
    sound.playTreadmill();

    setCombo((c) => {
      const next = c + 1;
      clearTimeout(comboTimer.current);
      comboTimer.current = setTimeout(() => setCombo(0), 650);
      return next;
    });

    const id = ++popId;
    const x = `${20 + Math.random() * 55}%`;
    const y = `${42 + Math.random() * 18}%`;
    setPops((p) => [...p, { id, x, y, text: '+0.5', crit: combo > 7 }]);
    setTimeout(() => setPops((p) => p.filter((it) => it.id !== id)), 900);
  }, [burn, sound, combo]);

  const { active, count, clickHandlers } = useClickStation(handleClick, 500);

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

  // pause/resume music when mute toggles
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

  return (
    <StationFrame
      bgUrl={ART.treadmill}
      label="TREADMILL STATION"
      onBack={onBack}
      stats={stats}
      muted={sound.muted}
      onToggleMute={sound.toggleMute}
      bgClassName="brightness-100"
      overlayOpacity="bg-black/0"
    >
      <MusicButton
        on={musicOn}
        trackName={MUSIC_TRACKS[trackIndex].name}
        onClick={toggleMusic}
        onNext={nextTrack}
      />
      <ComboMeter combo={combo} />

      <div
        className="absolute inset-0 z-10"
        style={{ touchAction: 'none', cursor: 'pointer' }}
        {...clickHandlers}
      >
        <div
          className={`absolute left-[14%] right-[14%] bottom-0 h-[34%] tread-belt`}
          style={{
            clipPath: 'polygon(37.5% 0, 60% 0, 68% 100%, 27.5% 100%)',
            animation: active ? `tread-scroll ${beltDuration}s linear infinite` : 'none',
          }}
        />
        {!active && (
          <StartIndicator text={count > 0 ? 'KEEP CLICKING TO RUN' : 'CLICK TO START'} />
        )}
      </div>

      <FloatingText items={pops} />
    </StationFrame>
  );
}
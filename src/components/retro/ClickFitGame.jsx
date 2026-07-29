import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBlip } from './useBlip';
import { useMusicPlayer } from './useMusicPlayer';
import TitleScreen from './screens/TitleScreen';
import GymWide from './screens/GymWide';
import TreadmillStation from './screens/TreadmillStation';
import BarbellStation from './screens/BarbellStation';
import PunchingStation from './screens/PunchingStation';
import AchievementToast from './AchievementToast';

const SAVE_KEY = 'retro_gym_save';

const ACHIEVEMENTS = [
  { id: 'first', test: (s) => s.clicks >= 1, title: 'FIRST SWEAT', desc: 'Your first rep is logged!' },
  { id: 'cal50', test: (s) => s.calories >= 50, title: 'WARMING UP', desc: '50 calories burned!' },
  { id: 'click100', test: (s) => s.clicks >= 100, title: 'CENTURY', desc: '100 total reps!' },
  { id: 'cal500', test: (s) => s.calories >= 500, title: 'PUMPING IRON', desc: '500 calories burned!' },
  { id: 'lv5', test: (s) => s.level >= 5, title: 'GYM RAT', desc: 'Reached level 5!' },
  { id: 'cal2000', test: (s) => s.calories >= 2000, title: 'SHREDDED', desc: '2000 calories burned!' },
  { id: 'lv10', test: (s) => s.level >= 10, title: 'LEGEND', desc: 'Level 10 unlocked!' },
  { id: 'cal10000', test: (s) => s.calories >= 10000, title: 'GOD MODE', desc: '10000 calories burned!' },
];

const levelFromCal = (c) => Math.floor(c / 100) + 1;

function loadSave() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function ClickFitGame() {
  const init = useRef(loadSave());
  const [calories, setCalories] = useState(init.current.calories || 0);
  const [clicks, setClicks] = useState(init.current.clicks || 0);
  const [screen, setScreen] = useState('title');
  const [achQueue, setAchQueue] = useState([]);
  const [shaking, setShaking] = useState(false);

  const sound = useBlip();
  const music = useMusicPlayer(sound);
  const achUnlocked = useRef(new Set(init.current.ach || []));
  const prevLevel = useRef(levelFromCal(init.current.calories || 0));

  const level = levelFromCal(calories);
  const stats = { calories, clicks, level };

  const burn = useCallback((amount) => {
    setCalories((c) => +(c + amount).toFixed(1));
    setClicks((n) => n + 1);
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        calories,
        clicks,
        ach: [...achUnlocked.current],
      })
    );
  }, [calories, clicks]);

  // achievements
  useEffect(() => {
    const s = { calories, clicks, level };
    const newly = ACHIEVEMENTS.filter(
      (a) => !achUnlocked.current.has(a.id) && a.test(s)
    );
    if (newly.length) {
      newly.forEach((a) => achUnlocked.current.add(a.id));
      setAchQueue((q) => [...q, ...newly]);
      sound.playAchievement();
    }
  }, [calories, clicks, level, sound]);

  // level up
  useEffect(() => {
    if (level > prevLevel.current) {
      prevLevel.current = level;
      sound.playLevelUp();
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [level, sound]);

  // achievement toast queue
  const currentAch = achQueue[0] || null;
  useEffect(() => {
    if (!currentAch) return;
    const t = setTimeout(() => setAchQueue((q) => q.slice(1)), 2600);
    return () => clearTimeout(t);
  }, [currentAch]);

  const navigate = useCallback((s) => setScreen(s), []);

  return (
    <div
      className={`relative min-h-screen w-full bg-background ${
        shaking ? 'screen-shake' : ''
      }`}
    >
      {screen === 'title' && <TitleScreen onStart={() => setScreen('gym')} />}

      {screen === 'gym' && (
        <GymWide
          onNavigate={navigate}
          stats={stats}
          muted={sound.muted}
          onToggleMute={sound.toggleMute}
          music={music}
        />
      )}

      {screen === 'treadmill' && (
        <TreadmillStation
          burn={burn}
          stats={stats}
          sound={sound}
          music={music}
          onBack={() => setScreen('gym')}
        />
      )}
      {screen === 'barbell' && (
        <BarbellStation
          burn={burn}
          stats={stats}
          sound={sound}
          music={music}
          onBack={() => setScreen('gym')}
        />
      )}
      {screen === 'punching' && (
        <PunchingStation
          burn={burn}
          stats={stats}
          sound={sound}
          music={music}
          onBack={() => setScreen('gym')}
        />
      )}

      <AnimatePresence>
        {currentAch && (
          <AchievementToast
            key={currentAch.id}
            title={currentAch.title}
            desc={currentAch.desc}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
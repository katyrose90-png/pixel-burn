import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import PixelCharacter from '@/components/retro/PixelCharacter';
import StatsPanel from '@/components/retro/StatsPanel';
import AchievementToast from '@/components/retro/AchievementToast';
import FloatingText from '@/components/retro/FloatingText';
import { useBlip } from '@/components/retro/useBlip';

const BG_URL =
  'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/bc9c6609b_generated_image.png';

const SAVE_KEY = 'retro_gym_save';

const ACHIEVEMENTS = [
  { id: 'first', test: (s) => s.clicks >= 1, title: 'FIRST SWEAT', desc: 'You logged your first rep!' },
  { id: 'cal50', test: (s) => s.calories >= 50, title: 'WARMING UP', desc: '50 calories burned!' },
  { id: 'click100', test: (s) => s.clicks >= 100, title: 'CENTURY CLICKER', desc: '100 total clicks!' },
  { id: 'cal500', test: (s) => s.calories >= 500, title: 'PUMPING IRON', desc: '500 calories burned!' },
  { id: 'lv5', test: (s) => s.level >= 5, title: 'GYM RAT', desc: 'You reached level 5!' },
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

export default function Home() {
  const init = useRef(loadSave());
  const [calories, setCalories] = useState(init.current.calories || 0);
  const [clicks, setClicks] = useState(init.current.clicks || 0);
  const [combo, setCombo] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [floats, setFloats] = useState([]);
  const [achQueue, setAchQueue] = useState([]);
  const [shaking, setShaking] = useState(false);
  const [charSize, setCharSize] = useState(14);

  const { playClick, playLevelUp, playAchievement, muted, toggleMute } = useBlip();
  const lastClick = useRef(0);
  const achUnlocked = useRef(new Set(init.current.ach || []));
  const prevLevel = useRef(levelFromCal(init.current.calories || 0));
  const stageRef = useRef(null);

  const level = levelFromCal(calories);
  const levelStart = (level - 1) * 100;
  const levelProgress = Math.min(1, (calories - levelStart) / 100);
  const multiplier = 1 + Math.min(combo, 50) * 0.1;

  // responsive character size
  useEffect(() => {
    const update = () => setCharSize(window.innerWidth < 640 ? 10 : 14);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
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
      playAchievement();
    }
  }, [calories, clicks, level, playAchievement]);

  // level up
  useEffect(() => {
    if (level > prevLevel.current) {
      prevLevel.current = level;
      playLevelUp();
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [level, playLevelUp]);

  // combo decay
  useEffect(() => {
    if (combo === 0) return;
    const t = setTimeout(() => setCombo(0), 1100);
    return () => clearTimeout(t);
  }, [combo]);

  // achievement toast queue
  const currentAch = achQueue[0] || null;
  useEffect(() => {
    if (!currentAch) return;
    const t = setTimeout(() => setAchQueue((q) => q.slice(1)), 2600);
    return () => clearTimeout(t);
  }, [currentAch]);

  // floating text cleanup
  useEffect(() => {
    if (!floats.length) return;
    const t = setTimeout(() => setFloats((f) => f.slice(1)), 900);
    return () => clearTimeout(t);
  }, [floats]);

  const handleClick = useCallback(
    (e) => {
      const now = Date.now();
      const newCombo = now - lastClick.current < 1000 ? combo + 1 : 1;
      lastClick.current = now;
      const gain = +(1 * (1 + Math.min(newCombo, 50) * 0.1)).toFixed(1);

      setCalories((c) => c + gain);
      setClicks((n) => n + 1);
      setCombo(newCombo);
      setTrigger((t) => t + 1);
      playClick(newCombo);

      const rect = stageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setFloats((f) => [
          ...f,
          {
            id: `${now}_${Math.random().toString(36).slice(2, 7)}`,
            x,
            y,
            text: `+${gain}`,
            crit: newCombo >= 10,
          },
        ]);
      }
    },
    [combo, playClick]
  );

  const reset = () => {
    if (!window.confirm('Reset ALL progress? This cannot be undone.')) return;
    localStorage.removeItem(SAVE_KEY);
    setCalories(0);
    setClicks(0);
    setCombo(0);
    achUnlocked.current = new Set();
    setAchQueue([]);
    prevLevel.current = 1;
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden crt-stage ${
        shaking ? 'screen-shake' : ''
      }`}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={BG_URL}
          fittingType="fill"
          alt="Retro pixel gym"
          className="w-full h-full object-cover pixel-img"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="font-display text-sm sm:text-xl text-[hsl(var(--retro-green))] neon">
          ▶ RETRO GYM
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button onClick={toggleMute} className="pixel-btn">
            {muted ? 'SND OFF' : 'SND ON'}
          </button>
          <button onClick={reset} className="pixel-btn">
            RESET
          </button>
        </div>
      </header>

      {/* main */}
      <main className="mx-auto max-w-6xl px-3 sm:px-4 pb-10 grid lg:grid-cols-[1fr_320px] gap-5 items-start">
        <section
          ref={stageRef}
          onClick={handleClick}
          className="relative cursor-crosshair min-h-[58vh] sm:min-h-[64vh] lg:min-h-[70vh] pixel-border bg-black/30 flex items-end justify-center pb-12 sm:pb-16 select-none"
        >
          <div className="absolute top-3 left-3 font-display text-[9px] sm:text-[10px] text-[hsl(var(--retro-cyan))]">
            STAGE 1-{level}
          </div>
          {combo >= 2 && (
            <div className="absolute top-3 right-3 font-display text-[9px] sm:text-[10px] text-[hsl(var(--retro-yellow))] neon-yellow text-right">
              x{multiplier.toFixed(1)} COMBO
              <br />
              <span className="text-[hsl(var(--retro-pink))]">{combo} HITS</span>
            </div>
          )}

          {/* character */}
          <div className="pointer-events-none mb-2">
            <PixelCharacter trigger={trigger} size={charSize} />
          </div>

          {/* floating numbers */}
          <FloatingText items={floats} />

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-[9px] sm:text-xs text-white/80 animate-pulse whitespace-nowrap">
            ▼ CLICK TO SWEAT ▼
          </div>
        </section>

        <StatsPanel
          calories={calories}
          clicks={clicks}
          combo={combo}
          multiplier={multiplier}
          level={level}
          levelProgress={levelProgress}
          power={multiplier}
        />
      </main>

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
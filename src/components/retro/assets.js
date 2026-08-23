// Builds a single fixed-size WebP transform URL for full-screen backgrounds.
// Pixel art tolerates low resolution (image-rendering: pixelated), so we cap
// width and quality to keep downloads tiny — far smaller than the responsive
// srcset the Image component generates (which requests 2x/3x DPR variants).
export function optimizedBg(url, w = 1024, h = 768, q = 35) {
  const name = url.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
  return `${url}/v1/fill/w_${w},h_${h},al_c,q_${q},usm_0.66_1.00_0.01,enc_webp,quality_auto/${name}.webp`;
}

// Same as optimizedBg but uses `fit` (no cropping) for transparent sprites.
export function optimizedSprite(url, w = 1024, h = 1024, q = 40) {
  const name = url.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
  return `${url}/v1/fit/w_${w},h_${h},q_${q},usm_0.66_1.00_0.01,enc_webp,quality_auto/${name}.webp`;
}

export const ART = {
  title:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/89bcdad03_1_ClickFitTitleArtextended.png',
  gym:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/419cbd5bc_2_GymWideextended.png',
  treadmill:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/8ac315e0d_extendedtreadmill.png',
  barbell:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/9f1514bae_4_Barbell.png',
  barbellAnim:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/df673ced5_Weightlifting_Background.png',
  barbellBar:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/eedce1e66_Weightlifting_Barbell.png',
  punching:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/f78407512_5_PunchingBag.png',
  boxingBg:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/632a331ea_Boxing_Background.png',
  punchingBag:
    'https://media.base44.com/images/public/6a6a18e0c70211de47d6ca9c/535cbe507_Boxing_PunchingBag.png',
};

export const MUSIC_TRACKS = [
  {
    url: 'https://media.base44.com/files/public/6a6a18e0c70211de47d6ca9c/e13ef35a3_AscheSpencer-RetroClassics212.mp3',
    name: 'RETRO CLASSICS 212',
  },
  {
    url: 'https://media.base44.com/files/public/6a6a18e0c70211de47d6ca9c/d20bf9b5a_AscheSpencer-RetroClassics292.mp3',
    name: 'RETRO CLASSICS 292',
  },
  {
    url: 'https://media.base44.com/files/public/6a6a18e0c70211de47d6ca9c/880f44519_AscheSpencer-Orchestral563.mp3',
    name: 'ORCHESTRAL 563',
  },
  {
    url: 'https://media.base44.com/files/public/6a6a18e0c70211de47d6ca9c/7472a9bca_AscheSpencer-HipHopRB283.mp3',
    name: 'HIP HOP RB 283',
  },
];
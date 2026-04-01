// Express Pathology — "YOU HAVE NO IDEA" — Design Tokens
// 1080x1920 vertical | 30fps | 35 seconds | 1050 frames

export const COLORS = {
  bg: '#050A14',
  cyan: '#22D3EE',
  cyanDim: 'rgba(34,211,238,0.12)',
  cyanGlow: 'rgba(34,211,238,0.25)',
  purple: '#A855F7',
  purpleDim: 'rgba(168,85,247,0.08)',
  purpleGlow: 'rgba(168,85,247,0.25)',
  orange: '#F97316',
  orangeGlow: 'rgba(249,115,22,0.4)',
  white: '#FFFFFF',
  white70: 'rgba(255,255,255,0.7)',
  white60: 'rgba(255,255,255,0.6)',
  white50: 'rgba(255,255,255,0.5)',
  white40: 'rgba(255,255,255,0.4)',
  white08: 'rgba(255,255,255,0.08)',
  white04: 'rgba(255,255,255,0.04)',
  white03: 'rgba(255,255,255,0.03)',
  gold: '#FBBF24',
  crimson: 'rgba(180,30,30,0.15)',
} as const;

export const FONTS = {
  sans: 'Inter, system-ui, sans-serif',
} as const;

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 35;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 1050

export const SAFE = { top: 150, bottom: 170, left: 60, right: 60 } as const;

// Organic spring — the hero config for this video
export const SPRING_ORGANIC = {
  mass: 1,
  damping: 15,
  stiffness: 120,
} as const;

// Punchy spring for impact moments
export const SPRING_PUNCH = {
  mass: 0.8,
  damping: 12,
  stiffness: 180,
} as const;

// Heavy spring for price / big reveals
export const SPRING_HEAVY = {
  mass: 1.2,
  damping: 14,
  stiffness: 100,
} as const;

export const SCENES = {
  coldOpen:    { start: 0,   end: 90  },  // 0-3s
  problem:     { start: 90,  end: 240 },  // 3-8s
  revelation:  { start: 240, end: 390 },  // 8-13s
  shift:       { start: 390, end: 540 },  // 13-18s
  howItWorks:  { start: 540, end: 690 },  // 18-23s
  socialProof: { start: 690, end: 780 },  // 23-26s
  cta:         { start: 780, end: 1050 }, // 26-35s
} as const;

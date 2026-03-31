// Express Pathology — "Ultimate Performance Screen" Ad — Design Tokens
// 1080x1920 vertical | 30fps | 28 seconds

export const COLORS = {
  bg: '#0F172A',
  cyan: '#22D3EE',
  cyanDim: 'rgba(34,211,238,0.3)',
  cyanGlow: 'rgba(34,211,238,0.15)',
  orange: '#F97316',
  orangeDim: 'rgba(249,115,22,0.3)',
  purple: '#A855F7',
  purpleDim: 'rgba(168,85,247,0.3)',
  purpleGlow: 'rgba(168,85,247,0.15)',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.35)',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.08)',
  gold: '#FBBF24',
} as const;

export const GRADIENTS = {
  heroGlow:
    'radial-gradient(ellipse at center, rgba(168,85,247,0.35) 0%, rgba(34,211,238,0.2) 40%, transparent 70%)',
  darkVignette:
    'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
  cyanShine:
    'linear-gradient(135deg, #22D3EE 0%, #06B6D4 50%, #22D3EE 100%)',
  orangeShine:
    'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #F97316 100%)',
  purpleCyan:
    'radial-gradient(ellipse at center, rgba(168,85,247,0.4) 0%, rgba(34,211,238,0.25) 50%, transparent 80%)',
  subtleSweep:
    'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.1) 50%, transparent 100%)',
} as const;

export const SHADOWS = {
  cyanGlow:
    '0 0 40px rgba(34,211,238,0.4), 0 0 80px rgba(34,211,238,0.2)',
  cyanGlowStrong:
    '0 0 60px rgba(34,211,238,0.6), 0 0 120px rgba(34,211,238,0.3)',
  purpleGlow:
    '0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.2)',
  orangeGlow:
    '0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(249,115,22,0.2)',
  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  cardShadow:
    '0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(34,211,238,0.2)',
} as const;

export const FONTS = {
  heading: 'Inter, Liberation Sans, sans-serif',
  body: 'Inter, Liberation Sans, sans-serif',
} as const;

// 1080x1920 vertical (9:16)
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 28;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 840

// Safe zone
export const SAFE = {
  top: 150,
  bottom: 170,
  left: 60,
  right: 60,
} as const;

// Spring config used throughout
export const SPRING_CONFIG = {
  damping: 12,
  mass: 0.5,
  stiffness: 200,
} as const;

// Scene frame ranges (30fps)
export const SCENES = {
  hook:        { start: 0,   end: 90  },  // 0-3s
  theNumber:   { start: 90,  end: 240 },  // 3-8s
  whoItsFor:   { start: 240, end: 390 },  // 8-13s
  howItWorks:  { start: 390, end: 540 },  // 13-18s
  socialProof: { start: 540, end: 660 },  // 18-22s
  cta:         { start: 660, end: 840 },  // 22-28s
} as const;

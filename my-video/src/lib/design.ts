// Express Pathology — "Ultimate Performance Screen" Ad — Design Tokens
// 1080x1920 vertical | 30fps | 28 seconds
// Matched to landing page: expresspathology.com.au/pages/ultimateperformancescreen

export const COLORS = {
  bg: '#0C1220',
  green: '#10B981',
  greenBright: '#34D399',
  greenDim: 'rgba(16,185,129,0.3)',
  greenGlow: 'rgba(16,185,129,0.15)',
  greenDark: '#059669',
  orange: '#F97316',
  orangeDim: 'rgba(249,115,22,0.3)',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.35)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  gold: '#FBBF24',
  red: '#EF4444',
  strikethrough: 'rgba(255,255,255,0.4)',
} as const;

export const GRADIENTS = {
  heroGlow:
    'radial-gradient(ellipse at center, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)',
  darkVignette:
    'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
  greenShine:
    'linear-gradient(135deg, #10B981 0%, #34D399 50%, #10B981 100%)',
  subtleSweep:
    'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.08) 50%, transparent 100%)',
  topBanner:
    'linear-gradient(90deg, #059669 0%, #10B981 50%, #059669 100%)',
} as const;

export const SHADOWS = {
  greenGlow:
    '0 0 40px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.2)',
  greenGlowStrong:
    '0 0 60px rgba(16,185,129,0.6), 0 0 120px rgba(16,185,129,0.3)',
  orangeGlow:
    '0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(249,115,22,0.2)',
  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  cardShadow:
    '0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(16,185,129,0.2)',
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

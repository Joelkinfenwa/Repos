// Express Pathology — "The Tired Guy" Ad — Design Tokens
// 1080x1920 vertical | 30fps | 30 seconds

export const COLORS = {
  bg: '#0C0F0A',
  green: '#4CAF4C',
  greenBright: '#66BB6A',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
  greenDark: '#2E7D32',
  greenMuted: 'rgba(76,175,76,0.15)',
  accent: '#00E676',
  accentDim: 'rgba(0,230,118,0.3)',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.35)',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.08)',
} as const;

export const GRADIENTS = {
  heroGlow: 'radial-gradient(ellipse at center, rgba(76,175,76,0.3) 0%, transparent 70%)',
  darkVignette: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
  greenShine: 'linear-gradient(135deg, #4CAF4C 0%, #66BB6A 50%, #4CAF4C 100%)',
  textGlow: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)',
  subtleSweep: 'linear-gradient(90deg, transparent 0%, rgba(76,175,76,0.1) 50%, transparent 100%)',
} as const;

export const SHADOWS = {
  greenGlow: '0 0 40px rgba(76,175,76,0.4), 0 0 80px rgba(76,175,76,0.2)',
  greenGlowStrong: '0 0 60px rgba(76,175,76,0.6), 0 0 120px rgba(76,175,76,0.3), 0 0 180px rgba(76,175,76,0.1)',
  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  cardShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(76,175,76,0.2)',
} as const;

export const FONTS = {
  heading: 'DM Sans',
  mono: 'Space Mono',
} as const;

// 1080x1920 vertical (9:16)
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 30;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 900

// Spring config used throughout
export const SPRING_CONFIG = {
  damping: 12,
  mass: 0.5,
  stiffness: 200,
} as const;

// Scene frame ranges (30fps)
export const SCENES = {
  hook:        { start: 0,   end: 90  },  // 0-3s
  agitate:     { start: 90,  end: 210 },  // 3-7s
  reframe:     { start: 210, end: 330 },  // 7-11s
  showSite:    { start: 330, end: 540 },  // 11-18s
  stats:       { start: 540, end: 690 },  // 18-23s
  socialProof: { start: 690, end: 810 },  // 23-27s
  cta:         { start: 810, end: 900 },  // 27-30s
} as const;

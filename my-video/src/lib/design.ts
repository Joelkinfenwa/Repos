// Express Pathology — "The Tired Guy" Ad — Design Tokens
// 1080x1920 vertical | 30fps | 30 seconds

export const COLORS = {
  bg: '#0C0F0A',
  green: '#4CAF4C',
  greenBright: '#66BB6A',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
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

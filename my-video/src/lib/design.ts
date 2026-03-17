// Express Pathology — Design Tokens

export const COLORS = {
  bg: '#0C0F0A',
  green: '#4CAF4C',
  greenDark: '#3A8C3A',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
} as const;

export const FONTS = {
  heading: 'DM Sans',
  body: 'DM Sans',
  mono: 'Space Mono',
} as const;

// 1080x1920 vertical (9:16)
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 30;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 900

// Scene frame ranges
export const SCENES = {
  hook:     { start: 0,   end: 90  },  // 0-3s
  agitate:  { start: 90,  end: 240 },  // 3-8s
  reframe:  { start: 240, end: 450 },  // 8-15s
  solution: { start: 450, end: 660 },  // 15-22s
  proof:    { start: 660, end: 810 },  // 22-27s
  cta:      { start: 810, end: 900 },  // 27-30s
} as const;

// Express Pathology — "DECODE YOURSELF" — Design Tokens
// 1080x1920 vertical | 30fps | 30 seconds | 900 frames
// Aesthetic: Luxury editorial — warm gold, serif type, minimal motion

export const COLORS = {
  bg: '#080810',
  gold: '#D4A574',
  goldBright: '#E8C088',
  goldDim: 'rgba(212,165,116,0.15)',
  goldGlow: 'rgba(212,165,116,0.35)',
  cream: '#F5F0EB',
  cream70: 'rgba(245,240,235,0.7)',
  cream50: 'rgba(245,240,235,0.5)',
  cream30: 'rgba(245,240,235,0.3)',
  cream15: 'rgba(245,240,235,0.15)',
  cream08: 'rgba(245,240,235,0.08)',
  rose: '#C4788A',
  roseGlow: 'rgba(196,120,138,0.3)',
  white: '#FFFFFF',
  white60: 'rgba(255,255,255,0.6)',
  white40: 'rgba(255,255,255,0.4)',
  orange: '#E8854A',
  orangeGlow: 'rgba(232,133,74,0.4)',
} as const;

export const FONTS = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'Inter, system-ui, sans-serif',
} as const;

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION_SECONDS = 30;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 900

export const SAFE = { top: 150, bottom: 170, left: 60, right: 60 } as const;

// Elegant spring — smooth, refined
export const SPRING_ELEGANT = {
  mass: 1,
  damping: 18,
  stiffness: 80,
} as const;

// Firm spring — confident reveals
export const SPRING_FIRM = {
  mass: 0.9,
  damping: 16,
  stiffness: 140,
} as const;

// Heavy spring — big number / price reveals
export const SPRING_HEAVY = {
  mass: 1.4,
  damping: 16,
  stiffness: 90,
} as const;

export const SCENES = {
  coldOpen:   { start: 0,   end: 120 },  // 0-4s
  theData:    { start: 120, end: 300 },  // 4-10s
  categories: { start: 300, end: 480 },  // 10-16s
  process:    { start: 480, end: 660 },  // 16-22s
  authority:  { start: 660, end: 780 },  // 22-26s
  cta:        { start: 780, end: 900 },  // 26-30s
} as const;

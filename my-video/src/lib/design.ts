// Express Pathology — "DECODE YOURSELF" — Design Tokens
// 1080x1920 vertical | 30fps | 30 seconds | 900 frames
// Aesthetic: Luxury editorial + phone scroll showcase

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
  white90: 'rgba(255,255,255,0.9)',
  white60: 'rgba(255,255,255,0.6)',
  white40: 'rgba(255,255,255,0.4)',
  orange: '#E8854A',
  orangeGlow: 'rgba(232,133,74,0.4)',
  emerald: '#10B981',
  emeraldDim: 'rgba(16,185,129,0.15)',
  phoneBg: '#FAFAF9',
  phoneGray: '#6B7280',
  phoneGrayLight: '#E5E7EB',
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

export const SPRING_ELEGANT = { mass: 1, damping: 18, stiffness: 80 } as const;
export const SPRING_FIRM = { mass: 0.9, damping: 16, stiffness: 140 } as const;
export const SPRING_HEAVY = { mass: 1.4, damping: 16, stiffness: 90 } as const;

export const SCENES = {
  coldOpen:    { start: 0,   end: 120 },  // 0-4s   — title
  phoneScroll: { start: 120, end: 420 },  // 4-14s  — phone scrolls landing page
  expand:      { start: 420, end: 600 },  // 14-20s — stats expand from phone
  authority:   { start: 600, end: 720 },  // 20-24s — social proof
  cta:         { start: 720, end: 900 },  // 24-30s — price + CTA
} as const;

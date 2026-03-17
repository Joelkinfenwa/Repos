// Express Pathology — Design Tokens (Website Walkthrough)

export const COLORS = {
  bg: '#0C0F0A',
  green: '#4CAF4C',
  greenDark: '#2E7D32',
  white: '#FFFFFF',
  dimmed: 'rgba(255,255,255,0.25)',
  dimmedMid: 'rgba(255,255,255,0.5)',
  browserChrome: '#1A1A2E',
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
export const DURATION_SECONDS = 45;
export const DURATION_FRAMES = FPS * DURATION_SECONDS; // 1350

// Scene frame ranges
export const SCENES = {
  hook:           { start: 0,    end: 150  },  // 0-5s
  websiteIntro:   { start: 150,  end: 360  },  // 5-12s
  packageShowcase:{ start: 360,  end: 660  },  // 12-22s
  resultsPreview: { start: 660,  end: 900  },  // 22-30s
  howItWorks:     { start: 900,  end: 1140 },  // 30-38s
  cta:            { start: 1140, end: 1350 },  // 38-45s
} as const;

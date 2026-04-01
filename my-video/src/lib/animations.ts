// "DECODE YOURSELF" — Animation Library
// Elegant, refined motion — luxury editorial feel

import { interpolate, spring } from 'remotion';
import { FPS, SPRING_ELEGANT, SPRING_FIRM, SPRING_HEAVY } from './design';

// ---------------------------------------------------------------------------
// Spring helpers
// ---------------------------------------------------------------------------

export function elegantSpring(frame: number, delay: number) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_ELEGANT, durationInFrames: 60 });
}

export function firmSpring(frame: number, delay: number) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_FIRM, durationInFrames: 45 });
}

export function heavySpring(frame: number, delay: number) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_HEAVY, durationInFrames: 60 });
}

// ---------------------------------------------------------------------------
// Fade
// ---------------------------------------------------------------------------

export function fadeIn(frame: number, delay: number, dur = 20) {
  return interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export function fadeOut(frame: number, start: number, dur = 15) {
  return interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// ---------------------------------------------------------------------------
// Slide Up — elegant entrance
// ---------------------------------------------------------------------------

export function slideUp(frame: number, delay: number, distance = 60) {
  const s = elegantSpring(frame, delay);
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
  };
}

// ---------------------------------------------------------------------------
// Slide from left
// ---------------------------------------------------------------------------

export function slideFromLeft(frame: number, delay: number, distance = 80) {
  const s = elegantSpring(frame, delay);
  return {
    opacity: s,
    transform: `translateX(${interpolate(s, [0, 1], [-distance, 0])}px)`,
  };
}

// ---------------------------------------------------------------------------
// Scale reveal — grows from small
// ---------------------------------------------------------------------------

export function scaleReveal(frame: number, delay: number) {
  const s = firmSpring(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`,
  };
}

// ---------------------------------------------------------------------------
// Price slam — big number from large to normal
// ---------------------------------------------------------------------------

export function priceSlam(frame: number, delay: number) {
  const s = heavySpring(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [3, 1])})`,
  };
}

// ---------------------------------------------------------------------------
// Line draw — horizontal line growing from center or left
// ---------------------------------------------------------------------------

export function lineDraw(frame: number, delay: number, dur = 30) {
  return interpolate(frame, [delay, delay + dur], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// ---------------------------------------------------------------------------
// Counter
// ---------------------------------------------------------------------------

export function countUp(frame: number, delay: number, to: number, dur: number) {
  const t = Math.min(1, Math.max(0, (frame - delay) / dur));
  const ease = 1 - Math.pow(1 - t, 4);
  return Math.floor(ease * to);
}

// ---------------------------------------------------------------------------
// Gold shimmer — subtle horizontal light sweep
// ---------------------------------------------------------------------------

export function shimmerX(frame: number, delay: number, dur = 40) {
  return interpolate(frame, [delay, delay + dur], [-100, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// ---------------------------------------------------------------------------
// Gentle float
// ---------------------------------------------------------------------------

export function gentleFloat(frame: number, amplitude = 4, speed = 0.03) {
  return Math.sin(frame * speed) * amplitude;
}

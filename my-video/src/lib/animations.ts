// Animation library — "YOU HAVE NO IDEA" campaign
// Cinematic spring-based motion with particles, shake, glitch, streaks

import { spring, interpolate } from 'remotion';
import { FPS, SPRING_ORGANIC, SPRING_PUNCH, SPRING_HEAVY } from './design';

// ---------------------------------------------------------------------------
// Springs
// ---------------------------------------------------------------------------

export function orgSpring(frame: number, delay = 0) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_ORGANIC });
}

export function punchSpring(frame: number, delay = 0) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_PUNCH });
}

export function heavySpring(frame: number, delay = 0) {
  return spring({ frame: frame - delay, fps: FPS, config: SPRING_HEAVY });
}

// ---------------------------------------------------------------------------
// Entrances
// ---------------------------------------------------------------------------

/** Slam from scale to 1 with punch spring */
export function slamIn(frame: number, delay: number, fromScale = 2) {
  const s = punchSpring(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [fromScale, 1])})`,
  };
}

/** Slide up with organic spring */
export function slideUp(frame: number, delay: number, distance = 80) {
  const s = orgSpring(frame, delay);
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
  };
}

/** Slide from right with slight rotation */
export function slideFromRight(frame: number, delay: number) {
  const s = orgSpring(frame, delay);
  const x = interpolate(s, [0, 1], [300, 0]);
  const rot = interpolate(s, [0, 1], [-2, 0]);
  return {
    opacity: s,
    transform: `translateX(${x}px) rotate(${rot}deg)`,
  };
}

/** Slide down from above */
export function slideDown(frame: number, delay: number, distance = 80) {
  const s = orgSpring(frame, delay);
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [-distance, 0])}px)`,
  };
}

/** Scale in with organic spring */
export function scaleIn(frame: number, delay: number, from = 0.6) {
  const s = orgSpring(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [from, 1])})`,
  };
}

/** Heavy price slam from 5x */
export function priceSlam(frame: number, delay: number) {
  const s = heavySpring(frame, delay);
  return {
    opacity: Math.min(s * 3, 1),
    transform: `scale(${interpolate(s, [0, 1], [5, 1])})`,
  };
}

// ---------------------------------------------------------------------------
// Fades
// ---------------------------------------------------------------------------

export function fadeIn(frame: number, start: number, dur: number) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export function fadeOut(frame: number, start: number, dur: number) {
  return interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// ---------------------------------------------------------------------------
// Counter
// ---------------------------------------------------------------------------

export function countUp(frame: number, delay: number, to: number, dur: number) {
  // easeOutQuart
  const t = Math.min(1, Math.max(0, (frame - delay) / dur));
  const ease = 1 - Math.pow(1 - t, 4);
  return Math.floor(ease * to);
}

// ---------------------------------------------------------------------------
// Effects
// ---------------------------------------------------------------------------

/** Screen shake — decaying xy jitter */
export function screenShake(frame: number, start: number, intensity = 3, dur = 8) {
  const t = frame - start;
  if (t < 0 || t > dur) return { x: 0, y: 0 };
  const decay = 1 - t / dur;
  return {
    x: Math.sin(t * 11.3) * intensity * decay,
    y: Math.cos(t * 17.7) * intensity * decay,
  };
}

/** Stroke draw (SVG dashoffset) */
export function strokeDraw(frame: number, delay: number, dur: number, len: number) {
  const offset = interpolate(frame, [delay, delay + dur], [len, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { strokeDasharray: len, strokeDashoffset: offset };
}

/** Pulsing glow — oscillating opacity */
export function pulseGlow(frame: number, min = 0.2, max = 0.5, speed = 0.1) {
  const t = Math.sin(frame * speed) * 0.5 + 0.5;
  return min + t * (max - min);
}

/** Ambient float — gentle Y oscillation */
export function ambientFloat(frame: number, amplitude = 4, speed = 0.06) {
  return Math.sin(frame * speed) * amplitude;
}

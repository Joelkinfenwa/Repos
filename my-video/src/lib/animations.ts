// Animation utilities — Express Pathology Ultimate Performance Screen
// Cinematic spring-based reveals with glitch, particles, camera shake, light streaks

import { spring, interpolate } from 'remotion';
import { FPS, SPRING_CONFIG } from './design';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpringOpts {
  frame: number;
  delay?: number;
}

interface StaggerOpts {
  frame: number;
  delay?: number;
  index: number;
  staggerAmount?: number;
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

export function sp(frame: number, delay = 0) {
  return spring({
    frame: frame - delay,
    fps: FPS,
    config: SPRING_CONFIG,
  });
}

// ---------------------------------------------------------------------------
// Spring animations
// ---------------------------------------------------------------------------

/** Spring slam from 2x scale — punchy text reveal */
export function springSlam({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [2, 1])})`,
  };
}

/** Spring slam from 2.5x — even more aggressive for hero text */
export function springSlamHard({ frame, delay = 0 }: SpringOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 10, mass: 0.6, stiffness: 250 },
  });
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [2.5, 1])})`,
  };
}

/** Spring scale-in (gentler) */
export function springScale({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
  };
}

/** Slide in from left */
export function springSlideLeft({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `translateX(${interpolate(s, [0, 1], [-200, 0])}px)`,
  };
}

/** Slide in from right */
export function springSlideRight({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `translateX(${interpolate(s, [0, 1], [200, 0])}px)`,
  };
}

/** Slide up reveal */
export function springSlideUp({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [80, 0])}px)`,
  };
}

/** Bounce scale (for price reveal, CTA) */
export function springBounce({ frame, delay = 0 }: SpringOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 8, mass: 0.4, stiffness: 200 },
  });
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.3, 1])})`,
  };
}

// ---------------------------------------------------------------------------
// Fade helpers
// ---------------------------------------------------------------------------

export function fadeOut(frame: number, startFrame: number, duration: number) {
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export function fadeIn(frame: number, startFrame: number, duration: number) {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// ---------------------------------------------------------------------------
// Scene & transition
// ---------------------------------------------------------------------------

export function sceneTransition(frame: number, totalFrames: number, fadeFrames = 8) {
  const enterOpacity = fadeIn(frame, 0, fadeFrames);
  const exitOpacity = fadeOut(frame, totalFrames - fadeFrames, fadeFrames);
  const opacity = Math.min(enterOpacity, exitOpacity);
  const scale = interpolate(frame, [0, fadeFrames], [1.05, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity, scale };
}

// ---------------------------------------------------------------------------
// Cinematic effects
// ---------------------------------------------------------------------------

/** Camera shake — returns x/y offset that decays over time */
export function cameraShake(
  frame: number,
  startFrame: number,
  intensity = 12,
  decayFrames = 15,
) {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > decayFrames) return { x: 0, y: 0 };
  const decay = 1 - elapsed / decayFrames;
  const seed = elapsed * 7.3;
  return {
    x: Math.sin(seed * 2.1) * intensity * decay,
    y: Math.cos(seed * 3.7) * intensity * decay,
  };
}

/** Digital glitch — random jitter + opacity flicker */
export function glitchText({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0, transform: 'translate(0px, 0px)' };

  const jitterX = Math.sin(t * 43.7) * 6 + Math.sin(t * 97.3) * 3;
  const jitterY = Math.sin(t * 71.1) * 4 + Math.cos(t * 53.9) * 2;
  const flicker = 0.7 + 0.3 * Math.sin(t * 31.4);

  return {
    opacity: flicker,
    transform: `translate(${jitterX}px, ${jitterY}px)`,
  };
}

/** Floating particle motion — unique per index */
export function particleFloat({ frame, index }: { frame: number; index: number }) {
  const freqX = 0.02 + index * 0.007;
  const freqY = 0.015 + index * 0.009;
  const phase = index * 1.618;

  const x = Math.sin(frame * freqX + phase) * (30 + index * 5);
  const y = Math.cos(frame * freqY + phase * 0.7) * (20 + index * 4);

  return { transform: `translate(${x}px, ${y}px)` };
}

/** Light streak — fast horizontal motion */
export function lightStreak({
  frame,
  delay = 0,
  angle = 0,
}: {
  frame: number;
  delay?: number;
  angle?: number;
}) {
  const progress = interpolate(frame, [delay, delay + 12], [-200, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    transform: `translateX(${progress}%) rotate(${angle}deg)`,
    opacity: interpolate(
      Math.abs(progress),
      [0, 100, 200],
      [1, 0.8, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    ),
  };
}

/** Electric flicker-in — rapid opacity flicker then settle */
export function flickerIn({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0 };
  if (t > 10) return { opacity: 1 };

  const flicker =
    Math.sin(t * 19.7) > 0.2
      ? Math.sin(t * 37.3) > -0.3
        ? 1
        : 0.15
      : 0.05;

  return { opacity: flicker };
}

// ---------------------------------------------------------------------------
// Glow & pulse
// ---------------------------------------------------------------------------

/** Pulsing glow — sine-wave scale + opacity */
export function pulseGlow({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0, transform: 'scale(1)' };

  const pulse = Math.sin(t * 0.15) * 0.5 + 0.5;
  const scale = 1.0 + pulse * 0.15;
  const opacity = 0.7 + pulse * 0.3;

  return { opacity, transform: `scale(${scale})` };
}

/** Pulsing green box-shadow glow */
export function borderGlowGreen({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { boxShadow: '0 0 0px rgba(16,185,129,0)' };

  const pulse = Math.sin(t * 0.2) * 0.5 + 0.5;
  const blur = 6 + pulse * 16;
  const spread = 1 + pulse * 4;
  const alpha = 0.2 + pulse * 0.6;

  return {
    boxShadow: `0 0 ${blur}px ${spread}px rgba(16,185,129,${alpha})`,
  };
}

/** Continuous gentle breathing scale */
export function breathe({ frame }: { frame: number }) {
  const pulse = Math.sin(frame * 0.08) * 0.5 + 0.5;
  const scale = 1.0 + pulse * 0.05;

  return { transform: `scale(${scale})` };
}

// ---------------------------------------------------------------------------
// Stagger & count
// ---------------------------------------------------------------------------

/** Staggered fade up — offset per index */
export function staggerFadeUp({
  frame,
  delay = 0,
  index,
  staggerAmount = 5,
}: StaggerOpts) {
  const effectiveDelay = delay + index * staggerAmount;
  const s = sp(frame, effectiveDelay);

  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
  };
}

/** Interpolates a number from `from` to `to` over `duration` frames */
export function countUp({
  frame,
  delay = 0,
  from = 0,
  to = 100,
  duration = 30,
}: {
  frame: number;
  delay?: number;
  from?: number;
  to?: number;
  duration?: number;
}) {
  return interpolate(frame, [delay, delay + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Elastic slide up — aggressive overshoot */
export function elasticSlideUp({ frame, delay = 0 }: SpringOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 5, mass: 0.3, stiffness: 300 },
  });

  return {
    opacity: Math.min(s * 3, 1),
    transform: `translateY(${interpolate(s, [0, 1], [120, 0])}px)`,
  };
}

/** Star scale-in */
export function starPop({ frame, delay = 0 }: SpringOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 8, mass: 0.3, stiffness: 300 },
  });

  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0, 1.2])})`,
  };
}

/** SVG stroke draw */
export function strokeDraw({
  frame,
  delay = 0,
  duration = 20,
  totalLength = 100,
}: {
  frame: number;
  delay?: number;
  duration?: number;
  totalLength?: number;
}) {
  const progress = interpolate(frame, [delay, delay + duration], [totalLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    strokeDasharray: totalLength,
    strokeDashoffset: progress,
  };
}

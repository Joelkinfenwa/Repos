// Animation utilities — spring-based reveals for Ultimate Performance Screen
// Cyan/purple themed animations

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

/** Standard spring using the design system config */
export function sp(frame: number, delay = 0) {
  return spring({
    frame: frame - delay,
    fps: FPS,
    config: SPRING_CONFIG,
  });
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

/** Spring slam from 2x scale */
export function springSlam({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [2, 1])})`,
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

/** Fade out over duration */
export function fadeOut(frame: number, startFrame: number, duration: number) {
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Fade in over duration */
export function fadeIn(frame: number, startFrame: number, duration: number) {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Scene transition — slight zoom with opacity crossfade */
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

/** Pulsing glow — sine-wave scale oscillation with opacity pulse */
export function pulseGlow({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0, transform: 'scale(1)' };

  const pulse = Math.sin(t * 0.15) * 0.5 + 0.5;
  const scale = 1.0 + pulse * 0.15;
  const opacity = 0.7 + pulse * 0.3;

  return {
    opacity,
    transform: `scale(${scale})`,
  };
}

/** Staggered fade up — springSlideUp offset per index */
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

/** Continuous gentle breathing scale */
export function breathe({ frame }: { frame: number }) {
  const pulse = Math.sin(frame * 0.08) * 0.5 + 0.5;
  const scale = 1.0 + pulse * 0.05;

  return {
    transform: `scale(${scale})`,
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

/** Elastic slide up — aggressive overshoot for punchy reveals */
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

/** Pulsing cyan box-shadow glow */
export function borderGlowCyan({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { boxShadow: '0 0 0px rgba(34,211,238,0)' };

  const pulse = Math.sin(t * 0.2) * 0.5 + 0.5;
  const blur = 6 + pulse * 16;
  const spread = 1 + pulse * 4;
  const alpha = 0.2 + pulse * 0.6;

  return {
    boxShadow: `0 0 ${blur}px ${spread}px rgba(34,211,238,${alpha})`,
  };
}

/** Star scale-in with sparkle */
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

/** SVG stroke draw animation */
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

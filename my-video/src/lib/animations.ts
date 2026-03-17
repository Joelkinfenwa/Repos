// Animation utilities — spring-based reveals with specified spring config

import { spring, interpolate } from 'remotion';
import { FPS, SPRING_CONFIG } from './design';

interface SpringOpts {
  frame: number;
  delay?: number;
}

/** Standard spring using the design system config */
export function sp(frame: number, delay = 0) {
  return spring({
    frame: frame - delay,
    fps: FPS,
    config: SPRING_CONFIG,
  });
}

/** Spring scale-in from center (for slamming text) */
export function springSlam({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`,
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

/** Camera shake effect — returns translateX/Y offsets */
export function cameraShake(frame: number, startFrame: number, intensity = 8, decayFrames = 12) {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > decayFrames) return { x: 0, y: 0 };
  const decay = 1 - elapsed / decayFrames;
  const seed = elapsed * 7.3;
  return {
    x: Math.sin(seed * 2.1) * intensity * decay,
    y: Math.cos(seed * 3.7) * intensity * decay,
  };
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

// Animation utilities — spring-based reveals with specified spring config
// Expanded animation library with glitch, particle, cinematic, and more effects

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
// Original animations (preserved)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// New animations
// ---------------------------------------------------------------------------

/** Digital glitch effect — random jitter and opacity flicker */
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

/** Floating particle motion — each particle moves uniquely based on index */
export function particleFloat({ frame, index }: { frame: number; index: number }) {
  const freqX = 0.02 + index * 0.007;
  const freqY = 0.015 + index * 0.009;
  const phase = index * 1.618; // golden ratio offset

  const x = Math.sin(frame * freqX + phase) * (30 + index * 5);
  const y = Math.cos(frame * freqY + phase * 0.7) * (20 + index * 4);

  return {
    transform: `translate(${x}px, ${y}px)`,
  };
}

/** Typewriter reveal — clips text left-to-right like typing */
export function typewriter({
  frame,
  delay = 0,
  duration = 30,
}: {
  frame: number;
  delay?: number;
  duration?: number;
}) {
  const progress = interpolate(frame, [delay, delay + duration], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    clipPath: `inset(0 ${progress}% 0 0)`,
  };
}

/** Pulsing glow — sine-wave scale oscillation with opacity pulse */
export function pulseGlow({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0, transform: 'scale(1)' };

  const pulse = Math.sin(t * 0.15) * 0.5 + 0.5; // 0..1
  const scale = 1.0 + pulse * 0.15;
  const opacity = 0.7 + pulse * 0.3;

  return {
    opacity,
    transform: `scale(${scale})`,
  };
}

/** Cinematic letterbox reveal — clip path opens from center vertically */
export function cinematicReveal({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  const insetY = interpolate(s, [0, 1], [50, 0]);

  return {
    clipPath: `inset(${insetY}% 0 ${insetY}% 0)`,
  };
}

/** Light streak — fast horizontal movement for overlay streaks */
export function lightStreak({
  frame,
  delay = 0,
  angle = 0,
}: {
  frame: number;
  delay?: number;
  angle?: number;
}) {
  const progress = interpolate(frame, [delay, delay + 15], [-200, 200], {
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

/** Elastic morph scale — overshoots to 1.2 then settles to 1.0 */
export function morphScale({ frame, delay = 0 }: SpringOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 6, mass: 0.3, stiffness: 280 },
  });

  return {
    opacity: Math.min(s * 2, 1),
    transform: `scale(${interpolate(s, [0, 1], [0, 1.0])})`,
  };
}

/** 3D rotation entry — rotateY from 90deg to 0deg with perspective */
export function rotateIn3D({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  const rotateY = interpolate(s, [0, 1], [90, 0]);

  return {
    opacity: s,
    transform: `perspective(800px) rotateY(${rotateY}deg)`,
  };
}

/** Staggered fade up — like springSlideUp but offset per index */
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

/** Continuous gentle breathing scale — never stops */
export function breathe({ frame }: { frame: number }) {
  const pulse = Math.sin(frame * 0.08) * 0.5 + 0.5; // 0..1
  const scale = 1.0 + pulse * 0.05;

  return {
    transform: `scale(${scale})`,
  };
}

/** Random shake with intensity control */
export function shake({
  frame,
  delay = 0,
  intensity = 6,
}: {
  frame: number;
  delay?: number;
  intensity?: number;
}) {
  const t = frame - delay;
  if (t < 0) return { transform: 'translate(0px, 0px)' };

  const x = Math.sin(t * 17.3) * intensity + Math.cos(t * 31.7) * intensity * 0.5;
  const y = Math.cos(t * 23.1) * intensity + Math.sin(t * 41.3) * intensity * 0.4;

  return {
    transform: `translate(${x}px, ${y}px)`,
  };
}

/** Pulsing green box-shadow glow */
export function borderGlow({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { boxShadow: '0 0 0px rgba(76, 175, 76, 0)' };

  const pulse = Math.sin(t * 0.2) * 0.5 + 0.5; // 0..1
  const blur = 8 + pulse * 24;
  const spread = 2 + pulse * 6;
  const alpha = 0.3 + pulse * 0.7;

  return {
    boxShadow: `0 0 ${blur}px ${spread}px rgba(76, 175, 76, ${alpha})`,
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

/** Split reveal — clip path opens from center outward */
export function splitReveal({
  frame,
  delay = 0,
  direction = 'horizontal',
}: {
  frame: number;
  delay?: number;
  direction?: 'horizontal' | 'vertical';
}) {
  const s = sp(frame, delay);

  if (direction === 'vertical') {
    const insetY = interpolate(s, [0, 1], [50, 0]);
    return {
      clipPath: `inset(${insetY}% 0 ${insetY}% 0)`,
    };
  }

  const insetX = interpolate(s, [0, 1], [50, 0]);
  return {
    clipPath: `inset(0 ${insetX}% 0 ${insetX}%)`,
  };
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

/** Electric flicker-in — rapid opacity flicker then settles to 1 */
export function flickerIn({ frame, delay = 0 }: SpringOpts) {
  const t = frame - delay;
  if (t < 0) return { opacity: 0 };
  if (t > 10) return { opacity: 1 };

  // Rapid flicker pattern using high-frequency sin
  const flicker =
    Math.sin(t * 19.7) > 0.2
      ? Math.sin(t * 37.3) > -0.3
        ? 1
        : 0.15
      : 0.05;

  return {
    opacity: flicker,
  };
}

/** Zigzag slide — oscillating translateY while translateX slides in */
export function zigzagSlide({ frame, delay = 0 }: SpringOpts) {
  const s = sp(frame, delay);
  const t = frame - delay;

  const x = interpolate(s, [0, 1], [-300, 0]);
  const zigzag = t > 0 ? Math.sin(t * 0.8) * 30 * (1 - s) : 0;

  return {
    opacity: s,
    transform: `translate(${x}px, ${zigzag}px)`,
  };
}

/** Radial wipe — circle clip path grows from center */
export function radialWipe({ frame, delay = 0 }: SpringOpts) {
  const radius = interpolate(frame, [delay, delay + 20], [0, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    clipPath: `circle(${radius}% at 50% 50%)`,
  };
}

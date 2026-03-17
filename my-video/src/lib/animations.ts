// Animation utilities — spring-based reveals

import { spring, interpolate } from 'remotion';
import { FPS } from './design';

interface SpringRevealOpts {
  frame: number;
  delay?: number;
  durationInFrames?: number;
}

export function springReveal({ frame, delay = 0 }: SpringRevealOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`,
  };
}

export function springScale({ frame, delay = 0 }: SpringRevealOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
  };
}

export function springSlideLeft({ frame, delay = 0 }: SpringRevealOpts) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { damping: 16, stiffness: 110, mass: 0.9 },
  });
  return {
    opacity: s,
    transform: `translateX(${interpolate(s, [0, 1], [80, 0])}px)`,
  };
}

export function fadeOut(frame: number, startFrame: number, duration: number) {
  if (frame < startFrame) return 1;
  if (frame > startFrame + duration) return 0;
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0]);
}

export function fadeIn(frame: number, startFrame: number, duration: number) {
  if (frame < startFrame) return 0;
  if (frame > startFrame + duration) return 1;
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1]);
}

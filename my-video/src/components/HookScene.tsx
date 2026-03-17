// SCENE 1: HOOK — 0-5s (frames 0-150)
// Big bold text reveal with staggered spring animations

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { NarrationCaption } from './NarrationCaption';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Line 1: "Something feels off."
  const line1Spring = spring({
    frame: frame - 10,
    fps: FPS,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });

  // Line 2: "Low energy. Brain fog. No drive."
  const line2Spring = spring({
    frame: frame - 45,
    fps: FPS,
    config: { damping: 14, stiffness: 160, mass: 0.7 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
        padding: '0 80px',
        position: 'relative',
      }}
    >
      {/* Subtle green glow in background */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}18 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: interpolate(frame, [0, 80], [0, 0.7], {
            extrapolateRight: 'clamp',
          }),
        }}
      />

      {/* "Something feels off." */}
      <div
        style={{
          opacity: line1Spring,
          transform: `scale(${interpolate(line1Spring, [0, 1], [1.3, 1])}) translateY(${interpolate(line1Spring, [0, 1], [30, 0])}px)`,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          fontSize: 100,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 40,
          zIndex: 1,
        }}
      >
        Something feels off.
      </div>

      {/* "Low energy. Brain fog. No drive." */}
      <div
        style={{
          opacity: line2Spring,
          transform: `translateY(${interpolate(line2Spring, [0, 1], [25, 0])}px)`,
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 56,
          color: COLORS.green,
          textAlign: 'center',
          lineHeight: 1.3,
          zIndex: 1,
        }}
      >
        Low energy. Brain fog. No drive.
      </div>

      <NarrationCaption
        text="If you've been feeling off lately... low energy, brain fog, no motivation... you're not alone."
        frame={frame}
        startFrame={20}
      />
    </div>
  );
};

// Animated background — slow-cycling gradient (navy ↔ dark purple)
// Never flat. Subtle but always alive.

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../lib/design';

export const AnimatedBg: React.FC = () => {
  const frame = useCurrentFrame();
  // Slow sine cycle over ~20s (600 frames)
  const purpleAlpha = 0.04 + Math.sin(frame * 0.0105) * 0.04;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.bg,
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, rgba(88,28,135,${purpleAlpha}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

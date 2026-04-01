// Global ambient particle system — runs entire video duration
// 20 small circles (cyan + purple) drifting upward at varying speeds

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, HEIGHT } from '../lib/design';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: ((i * 71 + 23) % 100),
  size: 2 + (i % 3) * 2,
  speed: 0.3 + (i % 5) * 0.12,
  sineFreq: 0.01 + (i % 7) * 0.004,
  sineAmp: 8 + (i % 4) * 6,
  phase: i * 1.37,
  color: i % 3 === 0 ? COLORS.purple : COLORS.cyan,
  alpha: 0.06 + (i % 5) * 0.025,
}));

export const GlobalParticles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {PARTICLES.map((p) => {
        const baseY = HEIGHT + 20 - ((frame * p.speed + p.phase * 200) % (HEIGHT + 40));
        const driftX = Math.sin(frame * p.sineFreq + p.phase) * p.sineAmp;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: baseY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: p.alpha,
              transform: `translateX(${driftX}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

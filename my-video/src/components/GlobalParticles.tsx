// Floating gold dust particles — sparse and elegant
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../lib/design';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 97 + 31) % 100,
  startY: 100 + (i * 43) % 40,
  speed: 0.15 + (i % 5) * 0.05,
  size: 1.5 + (i % 3) * 0.8,
  opacity: 0.15 + (i % 4) * 0.08,
  drift: ((i % 2 === 0) ? 1 : -1) * (0.3 + (i % 3) * 0.15),
}));

export const GlobalParticles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {PARTICLES.map((p, i) => {
        const y = p.startY - frame * p.speed;
        const yMod = ((y % 140) + 140) % 140 - 20;
        const x = p.x + Math.sin(frame * 0.02 + i) * p.drift;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${yMod}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.gold,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
};

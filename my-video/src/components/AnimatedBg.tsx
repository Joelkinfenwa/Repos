// Subtle warm gradient background — slow breathing animation
import React from 'react';
import { useCurrentFrame } from 'remotion';

export const AnimatedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = Math.sin(frame * 0.008) * 0.5 + 0.5;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 50% ${40 + cycle * 20}%, rgba(212,165,116,0.06) 0%, rgba(8,8,16,1) 70%)`,
      }}
    />
  );
};

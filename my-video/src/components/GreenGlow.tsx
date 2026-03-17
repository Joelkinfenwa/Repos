// Reusable green radial glow accent

import React from 'react';
import { COLORS } from '../lib/design';

interface GreenGlowProps {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
  bright?: boolean;
}

export const GreenGlow: React.FC<GreenGlowProps> = ({
  x = '50%',
  y = '50%',
  size = 600,
  opacity = 0.4,
  bright = false,
}) => {
  const color = bright ? COLORS.greenBright : COLORS.green;
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

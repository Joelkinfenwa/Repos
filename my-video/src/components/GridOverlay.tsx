// Subtle grid texture overlay — thin lines at low opacity
// Gives that premium tech/keynote feel

import React from 'react';
import { COLORS } from '../lib/design';

const GRID_SIZE = 60;
const LINE_OPACITY = 0.015;

export const GridOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        backgroundImage: `
          linear-gradient(${COLORS.white}${Math.round(LINE_OPACITY * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.white}${Math.round(LINE_OPACITY * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    />
  );
};

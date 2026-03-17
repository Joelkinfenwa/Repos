// Narration caption component — bottom-of-screen text pill

import React from 'react';
import { spring, interpolate } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';

interface NarrationCaptionProps {
  text: string;
  frame: number;
  startFrame?: number;
}

export const NarrationCaption: React.FC<NarrationCaptionProps> = ({
  text,
  frame,
  startFrame = 10,
}) => {
  const s = spring({
    frame: frame - startFrame,
    fps: FPS,
    config: { damping: 18, stiffness: 100, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 270,
        left: '50%',
        transform: `translateX(-50%) translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
        opacity: s,
        zIndex: 20,
        width: '90%',
        maxWidth: 960,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          borderRadius: 24,
          padding: '18px 36px',
          fontFamily: FONTS.body,
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  );
};

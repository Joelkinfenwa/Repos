// SCENE 1: HOOK — 0-3s (frames 0-90)
// Audio marker: Bass hit / impact sound on each word reveal
// Pattern interrupt. Bold text, word by word with impact.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';

const WORDS = ["You're", 'tired.', 'Every.', 'Single.', 'Day.'];

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

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
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {WORDS.map((word, i) => {
          // Stagger: each word appears ~12 frames apart (0.4s)
          const delay = i * 12;
          const s = spring({
            frame: frame - delay,
            fps: FPS,
            config: { damping: 12, stiffness: 200, mass: 0.6 },
          });

          // Impact scale: overshoot then settle
          const scale = spring({
            frame: frame - delay,
            fps: FPS,
            config: { damping: 8, stiffness: 300, mass: 0.5 },
          });

          const isLastWord = i === WORDS.length - 1;
          const isPunctuation = word.endsWith('.');
          const color =
            isLastWord
              ? COLORS.green
              : isPunctuation && i > 1
                ? COLORS.white
                : COLORS.white;

          return (
            <div
              key={word}
              style={{
                opacity: s,
                transform: `scale(${interpolate(scale, [0, 1], [1.4, 1])}) translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
                fontFamily: FONTS.heading,
                fontWeight: 900,
                fontSize: isLastWord ? 140 : 110,
                color,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                textAlign: 'center',
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {/* Subtle green glow behind text */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}15 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: interpolate(frame, [0, 60], [0, 0.6], {
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </div>
  );
};

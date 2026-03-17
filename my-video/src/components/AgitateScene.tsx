// SCENE 2: AGITATE — 3-8s (frames 90-240)
// Audio marker: Low ambient drone, subtle tension building
// Make them feel seen. Kinetic typography, each line appearing and fading.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { springReveal, fadeOut } from '../lib/animations';

const LINES = [
  'You sleep 7 hours.',
  'You eat well.',
  'You train.',
  'And you\'re still dragging yourself',
  'through every afternoon.',
];

export const AgitateScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Total scene: 150 frames (5 seconds)

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
          alignItems: 'flex-start',
          gap: 16,
          width: '100%',
          maxWidth: 900,
        }}
      >
        {LINES.map((line, i) => {
          // First 3 lines appear one by one, then last 2 together
          const delay = i < 3 ? i * 25 : 75 + (i - 3) * 12;
          const reveal = springReveal({ frame, delay });

          // Fade earlier lines slightly as new ones appear
          const dimStart = delay + 60;
          const dimOpacity = i < 3
            ? interpolate(frame, [dimStart, dimStart + 20], [1, 0.35], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1;

          // Last two lines: different styling
          const isConclusion = i >= 3;
          const exitOpacity = fadeOut(frame, 130, 15);

          return (
            <div
              key={i}
              style={{
                ...reveal,
                opacity: (reveal.opacity as number) * dimOpacity * exitOpacity,
                fontFamily: FONTS.heading,
                fontWeight: isConclusion ? 800 : 500,
                fontSize: isConclusion ? 72 : 60,
                color: isConclusion ? COLORS.white : COLORS.dimmedMid,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Tension line — horizontal accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 350,
          left: '50%',
          transform: 'translateX(-50%)',
          width: interpolate(frame, [80, 120], [0, 600], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: 2,
          backgroundColor: COLORS.dimmed,
          opacity: fadeOut(frame, 130, 15),
        }}
      />
    </div>
  );
};

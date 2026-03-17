// SCENE 2: AGITATE — 3-7s (frames 0-120 local)
// Quick kinetic text: "You sleep 7 hours." / "You eat clean." / "You train 4x a week."
// Then all dim, and "Still exhausted by 2pm." appears in green.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { springSlideLeft, springSlideRight, springSlam, sceneTransition } from '../lib/animations';

const LINES = [
  { text: 'You sleep 7 hours.', anim: springSlideLeft, delay: 5 },
  { text: 'You eat clean.', anim: springSlideRight, delay: 20 },
  { text: 'You train 4x a week.', anim: springSlideLeft, delay: 35 },
];

export const Scene2Agitate: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  // At frame 65, dim all three lines and show the kicker
  const dimOpacity = interpolate(frame, [60, 72], [1, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const kickerAnim = springSlam({ frame, delay: 72 });

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
        padding: '0 60px',
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
      }}
    >
      {/* Three slide-in lines */}
      <div style={{ opacity: dimOpacity }}>
        {LINES.map((line, i) => {
          const anim = line.anim({ frame, delay: line.delay });
          return (
            <div
              key={i}
              style={{
                ...anim,
                fontFamily: FONTS.heading,
                fontWeight: 700,
                fontSize: 64,
                color: COLORS.white,
                textAlign: 'center',
                lineHeight: 1.4,
                letterSpacing: '-0.03em',
                marginBottom: 16,
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Kicker line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '90%',
          ...kickerAnim,
          transform: `translate(-50%, -50%) ${kickerAnim.transform}`,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          fontSize: 72,
          color: COLORS.green,
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '-0.04em',
        }}
      >
        Still exhausted by 2pm.
      </div>
    </div>
  );
};

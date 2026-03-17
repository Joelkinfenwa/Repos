// SCENE 1: HOOK — 0-3s (frames 0-90)
// Black screen. Text SLAMS in word by word with spring physics.
// "You're tired." "Every." "Single." "Day." (green, bigger, shake)

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { springSlam, cameraShake, sceneTransition } from '../lib/animations';

const WORDS: { text: string; color: string; fontSize: number; delay: number }[] = [
  { text: "You're tired.", color: COLORS.white, fontSize: 96, delay: 0 },
  { text: 'Every.', color: COLORS.white, fontSize: 88, delay: 15 },
  { text: 'Single.', color: COLORS.white, fontSize: 88, delay: 30 },
  { text: 'Day.', color: COLORS.green, fontSize: 120, delay: 45 },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 90;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  // Camera shake on "Day." impact (frame 45)
  const shake = cameraShake(frame, 48, 12, 15);

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
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {WORDS.map((word, i) => {
        const anim = springSlam({ frame, delay: word.delay });
        return (
          <div
            key={i}
            style={{
              ...anim,
              fontFamily: FONTS.heading,
              fontWeight: 900,
              fontSize: word.fontSize,
              color: word.color,
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '-0.04em',
              marginBottom: 8,
            }}
          >
            {word.text}
          </div>
        );
      })}
    </div>
  );
};

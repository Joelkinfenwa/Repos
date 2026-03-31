// Scene 1 — HOOK (0-3s | 90 frames)
// "Your last blood test missed 80% of the picture."
// Matches landing page headline exactly. Green italic accent on "the picture."

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, GRADIENTS, SAFE, FONTS } from '../lib/design';
import { springSlam, fadeOut, pulseGlow, sceneTransition } from '../lib/animations';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 90;
  const { opacity } = sceneTransition(frame, totalFrames);

  const slam = springSlam({ frame, delay: 5 });
  const exitFade = fadeOut(frame, 70, 20);
  const glow = pulseGlow({ frame, delay: 0 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Green radial glow background */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
          background: GRADIENTS.heroGlow,
          ...glow,
        }}
      />

      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: GRADIENTS.darkVignette,
        }}
      />

      {/* Main headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          textAlign: 'center',
          ...slam,
          opacity: (slam.opacity as number) * exitFade,
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 68,
            color: COLORS.white,
            lineHeight: 1.15,
            textShadow: '0 0 60px rgba(16,185,129,0.4)',
            margin: 0,
          }}
        >
          Your last blood test
          <br />
          missed 80% of
          <br />
          <span
            style={{
              color: COLORS.green,
              fontStyle: 'italic',
            }}
          >
            the picture.
          </span>
        </h1>
      </div>
    </div>
  );
};

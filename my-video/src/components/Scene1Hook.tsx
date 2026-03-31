// Scene 1 — HOOK (0-3s | 90 frames)
// "How Optimised Are You Really?"
// Text slams in from 2x scale with spring, purple-to-cyan radial glow pulses

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, GRADIENTS, SAFE, FONTS } from '../lib/design';
import { springSlam, fadeOut, pulseGlow, sceneTransition } from '../lib/animations';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 90;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Text slam animation
  const slam = springSlam({ frame, delay: 5 });

  // Fade out at end of scene
  const exitFade = fadeOut(frame, 70, 20);

  // Pulsing glow behind text
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
      {/* Purple-to-cyan radial glow background */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
          background: GRADIENTS.purpleCyan,
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
            fontSize: 72,
            color: COLORS.white,
            lineHeight: 1.15,
            textShadow: '0 0 60px rgba(168,85,247,0.6), 0 0 120px rgba(34,211,238,0.3)',
            margin: 0,
          }}
        >
          How Optimised
          <br />
          Are You{' '}
          <span style={{ color: COLORS.cyan }}>Really</span>?
        </h1>
      </div>
    </div>
  );
};

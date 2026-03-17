// SCENE 3: REFRAME — 7-11s (frames 0-120 local)
// "What if it's not your discipline?"
// Beat. Then green: "What if it's your blood?"
// Background green glow pulse.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { springSlideUp, springSlam, sp, sceneTransition } from '../lib/animations';

export const Scene3Reframe: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  const line1 = springSlideUp({ frame, delay: 8 });
  const line2 = springSlam({ frame, delay: 50 });

  // Green glow pulse
  const glowOpacity = interpolate(
    sp(frame, 45),
    [0, 1],
    [0, 0.6],
  );
  const glowScale = interpolate(frame, [45, 120], [0.8, 1.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* Green glow pulse background */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.greenBright}30 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          opacity: glowOpacity,
        }}
      />

      {/* Line 1 */}
      <div
        style={{
          ...line1,
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 64,
          color: COLORS.dimmedMid,
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '-0.03em',
          marginBottom: 50,
          zIndex: 1,
        }}
      >
        What if it's not your discipline?
      </div>

      {/* Line 2 — green emphasis */}
      <div
        style={{
          ...line2,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          fontSize: 80,
          color: COLORS.green,
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '-0.04em',
          zIndex: 1,
        }}
      >
        What if it's your blood?
      </div>
    </div>
  );
};

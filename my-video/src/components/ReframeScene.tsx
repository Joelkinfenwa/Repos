// SCENE 3: REFRAME — 8-15s (frames 240-450, local 0-210)
// Audio marker: Tonal shift at frame 90 — mood lifts, subtle synth pad
// Shift thinking. "What if it's not your discipline? What if it's your blood?"
// Background transitions from dark to green-tinted.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { springReveal } from '../lib/animations';

export const ReframeScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Total: 210 frames (7 seconds)

  // Background color shift at the "your blood?" reveal
  const bgShift = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgColor = `rgb(${interpolate(bgShift, [0, 1], [12, 18])}, ${interpolate(bgShift, [0, 1], [15, 35])}, ${interpolate(bgShift, [0, 1], [10, 15])})`;

  // Line 1: "What if it's not"
  const line1 = springReveal({ frame, delay: 10 });
  // Line 2: "your discipline?"
  const line2 = springReveal({ frame, delay: 30 });
  // Line 3: "What if it's"
  const line3 = springReveal({ frame, delay: 80 });
  // Line 4: "your blood?" — big green reveal
  const line4Delay = 100;
  const line4Spring = spring({
    frame: frame - line4Delay,
    fps: FPS,
    config: { damping: 10, stiffness: 150, mass: 0.7 },
  });

  // Fade out everything near end
  const exitOpacity = interpolate(frame, [185, 205], [1, 0], {
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
        backgroundColor: bgColor,
        padding: '0 70px',
        opacity: exitOpacity,
      }}
    >
      {/* Green glow that intensifies */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}20 0%, transparent 70%)`,
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: bgShift * 0.8,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 8,
          width: '100%',
          maxWidth: 920,
          zIndex: 1,
        }}
      >
        {/* "What if it's not" */}
        <div
          style={{
            ...line1,
            fontFamily: FONTS.heading,
            fontWeight: 500,
            fontSize: 64,
            color: COLORS.dimmedMid,
            lineHeight: 1.2,
          }}
        >
          What if it's not
        </div>

        {/* "your discipline?" */}
        <div
          style={{
            ...line2,
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 80,
            color: COLORS.white,
            lineHeight: 1.15,
            marginBottom: 60,
          }}
        >
          your discipline?
        </div>

        {/* "What if it's" */}
        <div
          style={{
            ...line3,
            fontFamily: FONTS.heading,
            fontWeight: 500,
            fontSize: 64,
            color: COLORS.dimmedMid,
            lineHeight: 1.2,
          }}
        >
          What if it's
        </div>

        {/* "your blood?" — the big green reveal */}
        <div
          style={{
            opacity: line4Spring,
            transform: `scale(${interpolate(line4Spring, [0, 1], [0.7, 1])})`,
            transformOrigin: 'left center',
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 110,
            color: COLORS.green,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          your blood?
        </div>
      </div>
    </div>
  );
};

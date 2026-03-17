// SCENE 6: CTA — 27-30s (frames 810-900, local 0-90)
// Audio marker: Final beat, clean resolution, confidence
// Close it hard. Price, no referral, book now.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Total: 90 frames (3 seconds)

  // Price — big reveal
  const priceSpring = spring({
    frame: frame - 5,
    fps: FPS,
    config: { damping: 10, stiffness: 180, mass: 0.6 },
  });

  // "No referral needed."
  const noRefSpring = spring({
    frame: frame - 18,
    fps: FPS,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  // "Book in 2 minutes."
  const bookSpring = spring({
    frame: frame - 30,
    fps: FPS,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  // Logo / brand
  const logoSpring = spring({
    frame: frame - 42,
    fps: FPS,
    config: { damping: 16, stiffness: 100, mass: 0.9 },
  });

  // URL
  const urlSpring = spring({
    frame: frame - 52,
    fps: FPS,
    config: { damping: 16, stiffness: 100, mass: 0.9 },
  });

  // Pulsing CTA glow
  const pulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

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
        padding: '0 70px',
      }}
    >
      {/* Pulsing green glow behind price */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}18 0%, transparent 60%)`,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: pulse * priceSpring,
        }}
      />

      {/* Price */}
      <div
        style={{
          opacity: priceSpring,
          transform: `scale(${interpolate(priceSpring, [0, 1], [0.5, 1])})`,
          fontFamily: FONTS.mono,
          fontSize: 160,
          fontWeight: 700,
          color: COLORS.green,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: 20,
          zIndex: 1,
        }}
      >
        $249
      </div>

      {/* No referral */}
      <div
        style={{
          opacity: noRefSpring,
          transform: `translateY(${interpolate(noRefSpring, [0, 1], [25, 0])}px)`,
          fontFamily: FONTS.heading,
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.white,
          marginBottom: 8,
          zIndex: 1,
        }}
      >
        No referral needed.
      </div>

      {/* Book in 2 minutes */}
      <div
        style={{
          opacity: bookSpring,
          transform: `translateY(${interpolate(bookSpring, [0, 1], [25, 0])}px)`,
          fontFamily: FONTS.heading,
          fontSize: 48,
          fontWeight: 500,
          color: COLORS.dimmedMid,
          marginBottom: 120,
          zIndex: 1,
        }}
      >
        Book in 2 minutes.
      </div>

      {/* Express Pathology Logo/Brand */}
      <div
        style={{
          opacity: logoSpring,
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.8, 1])})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 1,
        }}
      >
        {/* Logo mark — stylised cross/plus */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: COLORS.green,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONTS.heading,
            fontSize: 40,
            fontWeight: 900,
            color: COLORS.bg,
          }}
        >
          +
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: '-0.01em',
          }}
        >
          Express Pathology
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlSpring,
          position: 'absolute',
          bottom: 180,
          fontFamily: FONTS.mono,
          fontSize: 30,
          color: COLORS.green,
          letterSpacing: '0.02em',
          zIndex: 1,
        }}
      >
        expresspathology.com.au
      </div>
    </div>
  );
};

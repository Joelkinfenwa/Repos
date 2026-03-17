// SCENE 5: PROOF — 22-27s (frames 660-810, local 0-150)
// Audio marker: Subtle confidence-building pad, trust-evoking tone
// Build trust with credentials and social proof.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { springReveal } from '../lib/animations';

interface TrustBadge {
  label: string;
  value: string;
}

const BADGES: TrustBadge[] = [
  { label: 'REVIEWED BY', value: 'Qualified Doctors' },
  { label: 'LABORATORIES', value: 'NATA-Accredited' },
  { label: 'COLLECTION CENTRES', value: '2,000+ Australia-wide' },
  { label: 'RESULTS', value: 'Within 48 Hours' },
];

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Total: 150 frames (5 seconds)

  // Section heading
  const heading = springReveal({ frame, delay: 5 });

  // Exit
  const exitOpacity = interpolate(frame, [130, 148], [1, 0], {
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
        padding: '0 70px',
        opacity: exitOpacity,
      }}
    >
      {/* Green accent line top */}
      <div
        style={{
          position: 'absolute',
          top: 400,
          left: '50%',
          transform: 'translateX(-50%)',
          width: interpolate(frame, [0, 30], [0, 200], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: 3,
          backgroundColor: COLORS.green,
          borderRadius: 2,
        }}
      />

      {/* Heading */}
      <div
        style={{
          ...heading,
          fontFamily: FONTS.mono,
          fontSize: 26,
          fontWeight: 400,
          color: COLORS.dimmed,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: 80,
        }}
      >
        Why Australians Trust Us
      </div>

      {/* Trust badges grid */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          width: '100%',
          maxWidth: 880,
        }}
      >
        {BADGES.map((badge, i) => {
          const delay = 20 + i * 18;
          const s = spring({
            frame: frame - delay,
            fps: FPS,
            config: { damping: 16, stiffness: 120, mass: 0.8 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `translateX(${interpolate(s, [0, 1], [-40, 0])}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                borderLeft: `3px solid ${COLORS.green}`,
                paddingLeft: 28,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 20,
                  color: COLORS.dimmed,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {badge.label}
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 52,
                  fontWeight: 800,
                  color: COLORS.white,
                  lineHeight: 1.15,
                }}
              >
                {badge.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}10 0%, transparent 70%)`,
          bottom: 200,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

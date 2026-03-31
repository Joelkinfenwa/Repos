// Scene 5 — SOCIAL PROOF (18-22s | 120 frames)
// "Australia's #1 Selling Performance Blood Test"
// 5 gold stars animate in, trust line below

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import {
  springSlideUp,
  starPop,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
} from '../lib/animations';

const StarSVG: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <path
      d="M26 4l6.18 12.52L46 18.68l-10 9.74L38.36 42 26 35.52 13.64 42 16 28.42 6 18.68l13.82-2.16L26 4z"
      fill={filled ? COLORS.gold : 'none'}
      stroke={COLORS.gold}
      strokeWidth="2"
    />
  </svg>
);

export const Scene5SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Headline
  const headline = springSlideUp({ frame, delay: 5 });

  // Trust line
  const trustLine = staggerFadeUp({ frame, delay: 55, index: 0, staggerAmount: 0 });

  // Exit fade
  const exitFade = fadeOut(frame, 100, 20);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        opacity: opacity * exitFade,
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '40%',
          top: '30%',
          left: '10%',
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 800,
          fontSize: 56,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.2,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          textShadow: SHADOWS.textShadow,
          marginBottom: 50,
          ...headline,
        }}
      >
        Australia&apos;s{' '}
        <span style={{ color: COLORS.cyan }}>#1</span> Selling
        <br />
        Performance Blood Test
      </div>

      {/* 5 Stars */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 40,
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const anim = starPop({ frame, delay: 25 + i * 5 });
          return (
            <div
              key={i}
              style={{
                ...anim,
              }}
            >
              <StarSVG filled />
            </div>
          );
        })}
      </div>

      {/* Trust line */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 36,
          color: COLORS.textSecondary,
          textAlign: 'center',
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          ...trustLine,
        }}
      >
        Trusted by{' '}
        <span style={{ color: COLORS.white, fontWeight: 800 }}>10,000+</span>{' '}
        Australians
      </div>
    </div>
  );
};

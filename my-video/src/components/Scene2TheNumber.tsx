// Scene 2 — THE NUMBER (3-8s | 150 frames)
// Giant animated counter 0→40+, biomarker category pills stagger in

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import {
  countUp,
  springSlideUp,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
  borderGlowCyan,
} from '../lib/animations';

const PILLS = [
  'Hormones',
  'Thyroid',
  'Liver',
  'Kidney',
  'Iron',
  'Cholesterol',
  'Vitamins',
  'Inflammation',
];

export const Scene2TheNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Counter: 0 → 40 over first 45 frames
  const count = Math.floor(countUp({ frame, delay: 5, from: 0, to: 40, duration: 45 }));

  // "+" appears after counter lands
  const showPlus = frame > 50;

  // Subtitle reveal
  const subtitle = springSlideUp({ frame, delay: 55 });

  // Exit fade
  const exitFade = fadeOut(frame, 130, 20);

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
      {/* Giant counter */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 800,
          fontSize: 200,
          color: COLORS.white,
          fontVariantNumeric: 'tabular-nums',
          textShadow: SHADOWS.cyanGlowStrong,
          lineHeight: 1,
          position: 'relative',
        }}
      >
        {count}
        {showPlus && (
          <span style={{ color: COLORS.cyan }}>+</span>
        )}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 48,
          color: COLORS.textSecondary,
          marginTop: 16,
          ...subtitle,
        }}
      >
        Biomarkers. One Test.
      </div>

      {/* Category pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          marginTop: 48,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          maxWidth: '100%',
        }}
      >
        {PILLS.map((pill, i) => {
          const anim = staggerFadeUp({
            frame,
            delay: 65,
            index: i,
            staggerAmount: 4,
          });
          const glowAnim = borderGlowCyan({ frame, delay: 65 + i * 4 });

          return (
            <div
              key={pill}
              style={{
                fontFamily: FONTS.body,
                fontWeight: 600,
                fontSize: 28,
                color: COLORS.white,
                backgroundColor: 'rgba(34,211,238,0.08)',
                border: '1.5px solid rgba(34,211,238,0.3)',
                borderRadius: 40,
                padding: '10px 24px',
                ...anim,
                ...glowAnim,
              }}
            >
              {pill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

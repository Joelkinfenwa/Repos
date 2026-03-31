// Scene 2 — THE NUMBER (3-8s | 150 frames)
// 30+ biomarkers counter, then 4 category cards matching landing page:
// HORMONAL, THYROID, METABOLIC, BLOOD HEALTH

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import {
  countUp,
  springSlideUp,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
} from '../lib/animations';

const CATEGORIES = [
  {
    label: 'HORMONAL',
    title: 'Full Hormone Panel',
    detail: 'Testosterone, SHBG, IGF-1, Cortisol, E2',
  },
  {
    label: 'THYROID',
    title: 'TSH, Free T3 & T4',
    detail: 'Complete thyroid function',
  },
  {
    label: 'METABOLIC',
    title: 'HbA1c & Glucose',
    detail: 'Long-term blood sugar',
  },
  {
    label: 'BLOOD HEALTH',
    title: 'Full Blood Count',
    detail: 'FBC + ESR + iron studies',
  },
];

export const Scene2TheNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Counter: 0 → 30 over first 40 frames
  const count = Math.floor(
    countUp({ frame, delay: 5, from: 0, to: 30, duration: 40 }),
  );
  const showPlus = frame > 45;

  // Subtitle
  const subtitle = springSlideUp({ frame, delay: 50 });

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
          fontSize: 180,
          color: COLORS.white,
          fontVariantNumeric: 'tabular-nums',
          textShadow: SHADOWS.greenGlowStrong,
          lineHeight: 1,
        }}
      >
        {count}
        {showPlus && <span style={{ color: COLORS.green }}>+</span>}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 40,
          color: COLORS.textSecondary,
          marginTop: 8,
          marginBottom: 48,
          ...subtitle,
        }}
      >
        biomarkers. One test. Complete clarity.
      </div>

      {/* Category cards — 2x2 grid matching landing page */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          justifyContent: 'center',
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const anim = staggerFadeUp({
            frame,
            delay: 60,
            index: i,
            staggerAmount: 6,
          });

          return (
            <div
              key={cat.label}
              style={{
                width: 440,
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 12,
                padding: '20px 24px',
                ...anim,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 600,
                  fontSize: 22,
                  color: COLORS.green,
                  letterSpacing: '0.08em',
                  marginBottom: 6,
                }}
              >
                {cat.label}
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 800,
                  fontSize: 32,
                  color: COLORS.white,
                  lineHeight: 1.2,
                }}
              >
                {cat.title}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  fontSize: 24,
                  color: COLORS.textSecondary,
                  marginTop: 4,
                }}
              >
                {cat.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

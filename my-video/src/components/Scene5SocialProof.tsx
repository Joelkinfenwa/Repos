// Scene 5 — SOCIAL PROOF (18-22s | 120 frames)
// Matches the stats bar from landing page:
// 5,000+ tested | 4.6 ★ | 2,000+ centres | 48hrs | 30+
// "#1 Best-Selling Panel — 5,000+ Australians Tested" (top banner text)

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  springSlideUp,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
} from '../lib/animations';

const STATS = [
  { value: '5,000+', label: 'Australians Tested' },
  { value: '4.6', label: 'Average Rating', isStar: true },
  { value: '2,000+', label: 'Collection Centres' },
  { value: '48hrs', label: 'For Results' },
  { value: '30+', label: 'Biomarkers' },
];

const StarSVG: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ verticalAlign: 'middle', marginLeft: 4 }}>
    <path
      d="M18 3l4.3 8.7L32 13.4l-7 6.8L26.6 30 18 25.4 9.4 30 11 20.2 4 13.4l9.7-1.7L18 3z"
      fill={COLORS.gold}
    />
  </svg>
);

export const Scene5SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Top banner text
  const banner = springSlideUp({ frame, delay: 3 });

  // Headline
  const headline = springSlideUp({ frame, delay: 10 });

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
      {/* Green banner strip like the site top bar */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top - 50,
          left: 0,
          right: 0,
          height: 52,
          background: GRADIENTS.topBanner,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...banner,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 24,
            color: COLORS.white,
            letterSpacing: '0.06em',
          }}
        >
          ★ #1 BEST-SELLING PANEL — 5,000+ AUSTRALIANS TESTED
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 800,
          fontSize: 52,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.2,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          textShadow: SHADOWS.textShadow,
          marginBottom: 70,
          ...headline,
        }}
      >
        Trusted by{' '}
        <span style={{ color: COLORS.green }}>5,000+</span>
        <br />
        Australians
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
        }}
      >
        {STATS.map((stat, i) => {
          const anim = staggerFadeUp({
            frame,
            delay: 25,
            index: i,
            staggerAmount: 5,
          });

          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 12,
                padding: '20px 28px',
                textAlign: 'center',
                minWidth: 160,
                ...anim,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 800,
                  fontSize: 44,
                  color: COLORS.green,
                  lineHeight: 1,
                }}
              >
                {stat.value}
                {stat.isStar && <StarSVG />}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  fontSize: 24,
                  color: COLORS.textSecondary,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

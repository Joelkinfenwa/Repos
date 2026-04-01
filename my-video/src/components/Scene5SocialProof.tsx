// Scene 5 — SOCIAL PROOF (18-22s | 120 frames)
// Stats bar: 5,000+ | 4.6★ | 2,000+ | 48hrs | 30+
// Green banner, trust headline, stat cards with particles

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  springSlideUp,
  springSlamHard,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
  breathe,
  particleFloat,
} from '../lib/animations';

const STATS = [
  { value: '5,000+', label: 'Australians Tested' },
  { value: '4.6 ★', label: 'Average Rating' },
  { value: '2,000+', label: 'Collection Centres' },
  { value: '48hrs', label: 'For Results' },
  { value: '30+', label: 'Biomarkers' },
];

const TRUST_POINTS = [
  'NATA-accredited labs',
  'Doctor-reviewed reports',
  'No GP referral needed',
  'Results in 48 hours',
];

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 60 + ((i * 97) % 960),
  y: 100 + ((i * 139) % 1720),
  size: 2 + (i % 3),
  opacity: 0.04 + (i % 4) * 0.02,
}));

export const Scene5SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Banner
  const banner = springSlideUp({ frame, delay: 2 });

  // Headline slam
  const headline = springSlamHard({ frame, delay: 8 });

  // Background
  const bgBreathe = breathe({ frame });

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '120%',
          height: '60%',
          transform: `translate(-50%, -50%) ${bgBreathe.transform}`,
          background: GRADIENTS.heroGlow,
          pointerEvents: 'none',
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => {
        const pAnim = particleFloat({ frame, index: p.id });
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.green,
              opacity: p.opacity,
              transform: pAnim.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Green banner strip */}
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

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 52,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            textShadow: SHADOWS.textShadow,
            marginBottom: 50,
            ...headline,
          }}
        >
          Same labs your{' '}
          <span style={{ color: COLORS.green }}>GP uses.</span>
          <br />
          <span style={{ fontSize: 42, color: COLORS.textSecondary, fontWeight: 600 }}>
            Without the wait.
          </span>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {STATS.map((stat, i) => {
            const anim = staggerFadeUp({
              frame,
              delay: 22,
              index: i,
              staggerAmount: 4,
            });

            return (
              <div
                key={stat.label}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 12,
                  padding: '16px 22px',
                  textAlign: 'center',
                  minWidth: 150,
                  ...anim,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 800,
                    fontSize: 38,
                    color: COLORS.green,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 400,
                    fontSize: 22,
                    color: COLORS.textSecondary,
                    marginTop: 6,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust points row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          {TRUST_POINTS.map((point, i) => {
            const anim = staggerFadeUp({
              frame,
              delay: 50,
              index: i,
              staggerAmount: 4,
            });
            return (
              <div
                key={point}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  ...anim,
                }}
              >
                <span style={{ color: COLORS.green, fontSize: 24 }}>✓</span>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: 26,
                    color: COLORS.dimmedMid,
                  }}
                >
                  {point}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scanline */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
};

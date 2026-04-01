// Scene 2 — THE NUMBER (3-8s | 150 frames)
// Giant animated counter 0→30+ with glow explosion on landing
// 4 category cards matching landing page, floating particles, camera shake

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  countUp,
  springSlideUp,
  staggerFadeUp,
  cameraShake,
  particleFloat,
  fadeOut,
  sceneTransition,
  breathe,
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

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 30 + ((i * 83) % 1020),
  y: 50 + ((i * 131) % 1820),
  size: 2 + (i % 4),
  opacity: 0.05 + (i % 5) * 0.025,
}));

export const Scene2TheNumber: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Counter: 0 → 30 over first 40 frames
  const count = Math.floor(
    countUp({ frame, delay: 5, from: 0, to: 30, duration: 40 }),
  );
  const showPlus = frame > 45;

  // Camera shake when counter lands
  const shake = cameraShake(frame, 45, 10, 12);

  // Glow explosion when counter lands at 30+
  const impactT = frame - 45;
  const glowRadius =
    impactT > 0
      ? interpolate(impactT, [0, 6, 30], [0, 1, 0.4], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  // Subtitle
  const subtitle = springSlideUp({ frame, delay: 50 });

  // Background breathe
  const bgBreathe = breathe({ frame });

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
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '120%',
          height: '60%',
          transform: `translate(-50%, -50%) ${bgBreathe.transform}`,
          background: GRADIENTS.heroGlow,
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles */}
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
              backgroundColor: p.id % 3 === 0 ? COLORS.white : COLORS.green,
              opacity: p.opacity,
              transform: pAnim.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Giant counter with glow explosion */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Glow explosion behind counter */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400%',
            height: '400%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse at center, rgba(16,185,129,${glowRadius * 0.6}) 0%, rgba(16,185,129,${glowRadius * 0.2}) 40%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 200,
            color: COLORS.white,
            fontVariantNumeric: 'tabular-nums',
            textShadow: `${SHADOWS.greenGlowStrong}, 0 0 ${30 + glowRadius * 60}px rgba(16,185,129,${0.3 + glowRadius * 0.5})`,
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {count}
          {showPlus && <span style={{ color: COLORS.green }}>+</span>}
        </div>
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
          position: 'relative',
          zIndex: 2,
          ...subtitle,
        }}
      >
        biomarkers. One test.{' '}
        <span style={{ color: COLORS.white }}>Complete clarity.</span>
      </div>

      {/* Category cards — 2x2 grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
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

      {/* Scanline overlay */}
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

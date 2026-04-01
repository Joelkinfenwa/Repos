// Scene 1 — HOOK (0-3s | 90 frames)
// "Your last blood test might've missed 80% of the picture."
// Word-by-word slam, "80%" massive green glow explosion + camera shake,
// floating particles, light streaks, scanline overlay

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, GRADIENTS, SAFE, FONTS, SHADOWS } from '../lib/design';
import {
  springSlamHard,
  springSlam,
  springSlideUp,
  cameraShake,
  glitchText,
  lightStreak,
  particleFloat,
  fadeOut,
  breathe,
} from '../lib/animations';

// 20 floating particles
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 40 + ((i * 73) % 1000),
  y: 60 + ((i * 149) % 1800),
  size: 2 + (i % 4),
  opacity: 0.06 + (i % 5) * 0.03,
}));

// Word timing
const LINE1_DELAY = 3;   // "Your last blood test"
const LINE2_DELAY = 18;  // "might've missed"
const EIGHTY_DELAY = 35; // "80%"
const LINE3_DELAY = 55;  // "of the picture."
const GLITCH_DURATION = 5;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade
  const exitFade = fadeOut(frame, 75, 15);

  // Camera shake on "80%" impact
  const shake = cameraShake(frame, EIGHTY_DELAY + 3, 20, 18);

  // Background glow breathe
  const bgBreathe = breathe({ frame });
  const glowPulse = 0.15 + Math.sin(frame * 0.12) * 0.1;

  // Per-line animations
  const line1 = springSlideUp({ frame, delay: LINE1_DELAY });
  const line2 = springSlam({ frame, delay: LINE2_DELAY });

  // 80% — massive slam with glitch aftershock
  const eightySlam = springSlamHard({ frame, delay: EIGHTY_DELAY });
  const inGlitch80 =
    frame >= EIGHTY_DELAY + 4 && frame < EIGHTY_DELAY + 4 + GLITCH_DURATION;
  const glitch80 = inGlitch80
    ? glitchText({ frame, delay: EIGHTY_DELAY + 4 })
    : null;

  const line3 = springSlideUp({ frame, delay: LINE3_DELAY });

  // "80%" glow explosion
  const impactT = frame - EIGHTY_DELAY;
  const glowRadius =
    impactT > 0
      ? interpolate(impactT, [0, 8, 40], [0, 1, 0.5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;
  const glowAlpha = glowRadius * 0.8;

  // Light streak on 80% impact
  const streak1 = lightStreak({ frame, delay: EIGHTY_DELAY + 2, angle: -10 });
  const streak2 = lightStreak({ frame, delay: EIGHTY_DELAY + 4, angle: -10 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.bg,
        opacity: exitFade,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Breathing radial green glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          width: '140%',
          height: '90%',
          transform: `translate(-50%, -50%) ${bgBreathe.transform}`,
          background: `radial-gradient(ellipse at center, rgba(16,185,129,${glowPulse}) 0%, rgba(16,185,129,${glowPulse * 0.25}) 35%, transparent 68%)`,
          pointerEvents: 'none',
          zIndex: 0,
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

      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* TEXT CONTENT */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${SAFE.left}px`,
          zIndex: 5,
        }}
      >
        {/* "Your last blood test" */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 62,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            textShadow: SHADOWS.textShadow,
            marginBottom: 12,
            ...line1,
          }}
        >
          Your last blood test
        </div>

        {/* "might've missed" */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 72,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            textShadow: SHADOWS.textShadow,
            marginBottom: 16,
            ...line2,
          }}
        >
          might&apos;ve missed
        </div>

        {/* "80%" — massive green with glow explosion */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          {/* Glow explosion behind 80% */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '500%',
              height: '600%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, rgba(16,185,129,${glowAlpha}) 0%, rgba(16,185,129,${glowAlpha * 0.4}) 30%, rgba(16,185,129,${glowAlpha * 0.1}) 55%, transparent 75%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 900,
              fontSize: 160,
              color: COLORS.green,
              textAlign: 'center',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textShadow: `${SHADOWS.greenGlowStrong}, 0 0 ${40 + glowRadius * 80}px rgba(16,185,129,${0.4 + glowRadius * 0.5}), 0 0 ${100 + glowRadius * 160}px rgba(16,185,129,${0.15 + glowRadius * 0.3})`,
              position: 'relative',
              zIndex: 1,
              ...eightySlam,
              ...(glitch80
                ? {
                    opacity: glitch80.opacity * (eightySlam.opacity as number),
                    transform: `${eightySlam.transform} ${glitch80.transform}`,
                  }
                : {}),
            }}
          >
            80%
          </div>
        </div>

        {/* "of the picture." */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 62,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            ...line3,
          }}
        >
          of{' '}
          <span
            style={{
              color: COLORS.greenBright,
              fontStyle: 'italic',
            }}
          >
            the picture.
          </span>
        </div>
      </div>

      {/* LIGHT STREAKS on 80% impact */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '-20%',
          width: '140%',
          height: 6,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.9) 30%, rgba(255,255,255,0.95) 50%, rgba(16,185,129,0.9) 70%, transparent 100%)',
          filter: 'blur(3px)',
          ...streak1,
          pointerEvents: 'none',
          zIndex: 8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '44%',
          left: '-20%',
          width: '140%',
          height: 2,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 100%)',
          filter: 'blur(1px)',
          ...streak2,
          pointerEvents: 'none',
          zIndex: 9,
        }}
      />

      {/* Top-layer cinematic vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      />
    </div>
  );
};

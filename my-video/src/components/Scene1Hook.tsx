// SCENE 1: HOOK — 0-3s (frames 0-90)
// Premium cinematic title reveal: "You're tired. Every. Single. DAY."
// Radial wipe entry, springSlam words with glitch aftershock, floating particles,
// pulsing green glow text shadows, massive neon "DAY." explosion with camera shake
// and light streak, scanline overlay for that premium film look.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, GRADIENTS, SHADOWS } from '../lib/design';
import {
  radialWipe,
  springSlam,
  glitchText,
  cameraShake,
  fadeOut,
  particleFloat,
  breathe,
  lightStreak,
} from '../lib/animations';

// ---------------------------------------------------------------------------
// 24 floating particles — green/white dots with varying size and opacity
// ---------------------------------------------------------------------------
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 40 + ((i * 73) % 1000),
  y: 60 + ((i * 149) % 1800),
  size: 2 + (i % 5),
  opacity: 0.06 + (i % 6) * 0.035,
  color: i % 3 === 0 ? COLORS.white : COLORS.accent, // mix green and white
}));

// Word timing (frame delays)
const WORD_TIRED_DELAY = 5;
const WORD_EVERY_DELAY = 25;
const WORD_SINGLE_DELAY = 40;
const WORD_DAY_DELAY = 55;
const GLITCH_DURATION = 5; // frames of glitch after each word lands

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // -----------------------------------------------------------------------
  // Global scene animations
  // -----------------------------------------------------------------------

  // Radial wipe reveals the entire scene from frame 0
  const wipe = radialWipe({ frame, delay: 0 });

  // Exit fade in the final 12 frames
  const exitOpacity = fadeOut(frame, 78, 12);

  // Camera shake on "DAY." impact — intense (18px, 18 frame decay)
  const shake = cameraShake(frame, WORD_DAY_DELAY + 2, 18, 18);

  // Background glow breath
  const glowBreath = breathe({ frame });
  const glowPulse = 0.2 + Math.sin(frame * 0.14) * 0.15;

  // -----------------------------------------------------------------------
  // Per-word animations: springSlam + glitch aftershock
  // -----------------------------------------------------------------------
  const wordAnim = (delay: number) => {
    const slam = springSlam({ frame, delay });
    // Glitch runs for GLITCH_DURATION frames right after the spring mostly settles (~4 frames in)
    const glitchStart = delay + 4;
    const inGlitch = frame >= glitchStart && frame < glitchStart + GLITCH_DURATION;
    const glitch = inGlitch ? glitchText({ frame, delay: glitchStart }) : null;

    return {
      opacity: glitch ? glitch.opacity * slam.opacity : slam.opacity,
      transform: glitch
        ? `${slam.transform} ${glitch.transform}`
        : slam.transform,
    };
  };

  const tiredAnim = wordAnim(WORD_TIRED_DELAY);
  const everyAnim = wordAnim(WORD_EVERY_DELAY);
  const singleAnim = wordAnim(WORD_SINGLE_DELAY);
  const dayAnim = wordAnim(WORD_DAY_DELAY);

  // -----------------------------------------------------------------------
  // Pulsing green glow shadow helper — uses breathe sine for text-shadow
  // -----------------------------------------------------------------------
  const glowShadow = (delay: number, base: string) => {
    const t = frame - delay;
    if (t < 0) return base;
    const pulse = Math.sin(t * 0.18) * 0.5 + 0.5; // 0..1
    const blur = 8 + pulse * 20;
    const alpha = 0.25 + pulse * 0.45;
    return `${base}, 0 0 ${blur}px rgba(0, 230, 118, ${alpha})`;
  };

  // -----------------------------------------------------------------------
  // "DAY." glow explosion — massive radial gradient that blooms on impact
  // -----------------------------------------------------------------------
  const dayImpactT = frame - WORD_DAY_DELAY;
  const dayGlowRadius = dayImpactT > 0
    ? interpolate(dayImpactT, [0, 8, 35], [0, 1, 0.6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const dayGlowAlpha = dayGlowRadius * 0.7;

  // Light streak across screen on DAY impact
  const streakAnim = lightStreak({ frame, delay: WORD_DAY_DELAY + 1, angle: -12 });

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.bg,
        // Radial wipe clip + exit fade
        ...wipe,
        opacity: exitOpacity,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {/* ====== BACKGROUND LAYERS ====== */}

      {/* Animated dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Breathing radial green glow — center of scene */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          width: '140%',
          height: '90%',
          transform: `translate(-50%, -50%) ${glowBreath.transform}`,
          background: `radial-gradient(ellipse at center, rgba(0,230,118,${glowPulse}) 0%, rgba(76,175,76,${glowPulse * 0.25}) 35%, transparent 68%)`,
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
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: pAnim.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Scanline overlay — subtle horizontal lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* ====== TEXT CONTENT ====== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          zIndex: 5,
        }}
      >
        {/* "You're tired." */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 108,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: 20,
            textShadow: glowShadow(WORD_TIRED_DELAY, SHADOWS.textShadow),
            ...tiredAnim,
          }}
        >
          You're tired.
        </div>

        {/* "Every." */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 92,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-0.04em',
            marginBottom: 10,
            textShadow: glowShadow(WORD_EVERY_DELAY, SHADOWS.textShadow),
            ...everyAnim,
          }}
        >
          Every.
        </div>

        {/* "Single." */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 92,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-0.04em',
            marginBottom: 10,
            textShadow: glowShadow(WORD_SINGLE_DELAY, SHADOWS.textShadow),
            ...singleAnim,
          }}
        >
          Single.
        </div>

        {/* "DAY." — massive neon green with glow explosion */}
        <div style={{ position: 'relative' }}>
          {/* Green glow explosion behind DAY */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '500%',
              height: '600%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, rgba(0,230,118,${dayGlowAlpha}) 0%, rgba(0,230,118,${dayGlowAlpha * 0.4}) 30%, rgba(0,230,118,${dayGlowAlpha * 0.1}) 55%, transparent 75%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 900,
              fontSize: 150,
              color: COLORS.accent,
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textShadow: `${SHADOWS.greenGlowStrong}, 0 0 ${40 + dayGlowRadius * 80}px rgba(0,230,118,${0.4 + dayGlowRadius * 0.5}), 0 0 ${100 + dayGlowRadius * 160}px rgba(0,230,118,${0.15 + dayGlowRadius * 0.3})`,
              position: 'relative',
              zIndex: 1,
              ...dayAnim,
            }}
          >
            DAY.
          </div>
        </div>
      </div>

      {/* ====== LIGHT STREAK on DAY impact ====== */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '-20%',
          width: '140%',
          height: 6,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,230,118,0.9) 30%, rgba(255,255,255,0.95) 50%, rgba(0,230,118,0.9) 70%, transparent 100%)',
          filter: 'blur(3px)',
          ...streakAnim,
          pointerEvents: 'none',
          zIndex: 8,
        }}
      />

      {/* Second thinner streak for layered effect */}
      <div
        style={{
          position: 'absolute',
          top: '47%',
          left: '-20%',
          width: '140%',
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 100%)',
          filter: 'blur(1px)',
          ...lightStreak({ frame, delay: WORD_DAY_DELAY + 2, angle: -12 }),
          pointerEvents: 'none',
          zIndex: 9,
        }}
      />

      {/* Top-layer dark vignette for cinematic depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 6,
        }}
      />
    </div>
  );
};

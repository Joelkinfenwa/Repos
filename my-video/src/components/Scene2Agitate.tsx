// SCENE 2: AGITATE — 3-7s (frames 0-120 local)
// Cinematic letterbox reveal, 3 routine lines with elastic stagger + animated
// green border-left, glitch scramble + fade, light streak, spring-slam kicker
// with pulsing borderGlow, floating particles, scanline overlay.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, GRADIENTS, SHADOWS } from '../lib/design';
import {
  cinematicReveal,
  elasticSlideUp,
  glitchText,
  fadeOut,
  fadeIn,
  particleFloat,
  lightStreak,
  springSlam,
  borderGlow,
  breathe,
} from '../lib/animations';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const TOTAL = 120;

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 60 + ((i * 137) % 960),
  y: 150 + ((i * 211) % 1620),
  size: 2 + (i % 3),
  baseOpacity: 0.04 + (i % 5) * 0.02,
}));

const LINES = [
  { icon: '\u{1F634}', text: 'You sleep 7 hours' },
  { icon: '\u{1F957}', text: 'You eat clean' },
  { icon: '\u{1F3CB}\uFE0F', text: 'You train 4\u00D7 a week' },
] as const;

// Timeline constants
const LINE_START = 12; // first line appears
const LINE_STAGGER = 8; // gap between lines
const GLITCH_START = 52; // lines begin glitching
const GLITCH_END = 66; // lines settle at dimmed opacity
const STREAK_FRAME = 68; // green light streak
const KICKER_FRAME = 74; // "Still exhausted" slams in

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Scramble a string with random unicode block chars (deterministic per frame) */
function scrambleString(text: string, frame: number, seed: number): string {
  const glitchChars = '\u2588\u2593\u2591\u2592\u2580\u2584\u258C\u2590';
  return text
    .split('')
    .map((ch, ci) => {
      const hash = Math.sin((frame + seed) * 13.7 + ci * 47.3);
      return hash > 0.35 ? glitchChars[Math.abs(Math.floor(hash * 739)) % glitchChars.length] : ch;
    })
    .join('');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Scene2Agitate: React.FC = () => {
  const frame = useCurrentFrame();

  // -- Cinematic letterbox reveal (first ~18 frames) -------------------------
  const letterbox = cinematicReveal({ frame, delay: 0 });

  // -- Scene exit fade -------------------------------------------------------
  const exitOpacity = fadeOut(frame, TOTAL - 12, 12);

  // -- Background breath glow ------------------------------------------------
  const glowBreath = breathe({ frame });
  const bgGlowAlpha = 0.1 + Math.sin(frame * 0.1) * 0.06;

  // -- Routine lines phase ---------------------------------------------------
  // After GLITCH_END the lines sit at 15% opacity
  const linesBaseOpacity = interpolate(frame, [GLITCH_END, GLITCH_END + 4], [1, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shift lines up after glitch so kicker has room
  const linesShiftY = interpolate(frame, [GLITCH_START, GLITCH_END], [0, -140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isGlitching = frame >= GLITCH_START && frame < GLITCH_END;

  // -- Light streak ----------------------------------------------------------
  const streak = lightStreak({ frame, delay: STREAK_FRAME, angle: 0 });

  // -- Kicker ----------------------------------------------------------------
  const kickerSlam = springSlam({ frame, delay: KICKER_FRAME });
  const kickerGlow = borderGlow({ frame, delay: KICKER_FRAME });
  const kickerBgAlpha =
    frame >= KICKER_FRAME
      ? interpolate(frame, [KICKER_FRAME, KICKER_FRAME + 14], [0, 0.35], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  // -- Scanline offset (subtle repeating texture) ----------------------------
  const scanlineOffset = (frame * 1.5) % 4;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.bg,
        opacity: exitOpacity,
        ...letterbox, // clipPath letterbox
      }}
    >
      {/* ── Radial green background glow ── */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          width: '130%',
          height: '90%',
          transform: `translate(-50%, -50%) ${glowBreath.transform}`,
          background: `radial-gradient(ellipse at center, rgba(76,175,76,${bgGlowAlpha}) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => {
        const pAnim = particleFloat({ frame, index: p.id });
        const pFade = fadeIn(frame, 4 + p.id * 2, 12);
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
              backgroundColor: COLORS.accent,
              opacity: p.baseOpacity * pFade,
              transform: pAnim.transform,
              pointerEvents: 'none',
              boxShadow: `0 0 ${p.size * 3}px rgba(0,230,118,0.3)`,
            }}
          />
        );
      })}

      {/* ── Main content layer ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          zIndex: 2,
        }}
      >
        {/* ── Three routine lines ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: 900,
            transform: `translateY(${linesShiftY}px)`,
            opacity: linesBaseOpacity,
          }}
        >
          {LINES.map((line, i) => {
            const lineDelay = LINE_START + i * LINE_STAGGER;

            // Elastic slide up per line
            const slide = elasticSlideUp({ frame, delay: lineDelay });

            // Glitch jitter when glitching
            const glitch = isGlitching ? glitchText({ frame, delay: 0 }) : null;

            // Animated green left-border via clipPath (grows top-to-bottom)
            const borderProgress = interpolate(
              frame,
              [lineDelay + 4, lineDelay + 18],
              [100, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            const displayText =
              isGlitching ? scrambleString(line.text, frame, i * 31) : line.text;

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 32,
                  opacity: slide.opacity,
                  transform: [
                    slide.transform,
                    glitch ? glitch.transform : '',
                  ]
                    .filter(Boolean)
                    .join(' '),
                }}
              >
                {/* Animated green left border */}
                <div
                  style={{
                    width: 2,
                    height: 56,
                    backgroundColor: COLORS.accent,
                    marginRight: 22,
                    borderRadius: 2,
                    clipPath: `inset(0 0 ${borderProgress}% 0)`,
                    boxShadow: '0 0 8px rgba(0,230,118,0.45)',
                  }}
                />
                {/* Icon */}
                <span
                  style={{
                    fontSize: 48,
                    marginRight: 18,
                    lineHeight: 1,
                  }}
                >
                  {line.icon}
                </span>
                {/* Text */}
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 700,
                    fontSize: 52,
                    color: COLORS.white,
                    lineHeight: 1.3,
                    letterSpacing: '-0.03em',
                    textShadow: SHADOWS.textShadow,
                  }}
                >
                  {displayText}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Green light streak ── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.accent} 30%, ${COLORS.accent} 70%, transparent 100%)`,
            boxShadow: `0 0 18px rgba(0,230,118,0.7), 0 0 40px rgba(0,230,118,0.3)`,
            ...streak,
            pointerEvents: 'none',
          }}
        />

        {/* ── Kicker: "Still exhausted by 2pm." ── */}
        <div style={{ position: 'relative', marginTop: 20 }}>
          {/* Radial glow behind kicker */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '280%',
              height: '400%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, rgba(0,230,118,${kickerBgAlpha}) 0%, transparent 60%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 900,
              fontSize: 78,
              color: COLORS.accent,
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              textShadow: SHADOWS.greenGlowStrong,
              position: 'relative',
              zIndex: 1,
              padding: '16px 24px',
              borderRadius: 6,
              ...kickerSlam,
              ...kickerGlow,
            }}
          >
            Still exhausted
            <br />
            by 2pm.
          </div>
        </div>
      </div>

      {/* ── Scanline overlay ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)',
          backgroundPositionY: scanlineOffset,
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* ── Dark vignette ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </div>
  );
};

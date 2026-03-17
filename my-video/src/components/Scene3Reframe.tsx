// SCENE 3: REFRAME — 7-11s (frames 0-120 local)
// THE pivotal moment. "What if it's not your discipline?" → glitch → "What if it's your blood?"
// Split reveal entry, typewriter, violent glitch, dramatic beat, spring slam revelation.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS, SPRING_CONFIG } from '../lib/design';
import {
  splitReveal,
  typewriter,
  glitchText,
  springSlideUp,
  fadeIn,
  lightStreak,
  breathe,
} from '../lib/animations';

// ---------------------------------------------------------------------------
// Timeline constants (all in local frames, 0-120)
// ---------------------------------------------------------------------------
const SPLIT_REVEAL_START = 0;
const TYPEWRITER_START = 4;
const TYPEWRITER_DURATION = 24;
const LINE2_FADE_START = 30; // "your discipline?" fades in
const LINE2_FADE_DUR = 12;
const GLITCH_START = 54; // pause ends, glitch begins (30 frames after line2 appears ~frame 42)
const GLITCH_DURATION = 8;
const VANISH_FRAME = GLITCH_START + GLITCH_DURATION; // 62
const BEAT_DURATION = 5; // near-black dramatic beat
const REVEAL_START = VANISH_FRAME + BEAT_DURATION; // 67
const SLAM_DELAY = 10; // "your blood?" slams relative to reveal start
const SLAM_FRAME = REVEAL_START + SLAM_DELAY; // 77
const GLOW_EXPAND_START = SLAM_FRAME;
const GLOW_EXPAND_DURATION = 30;
const STREAK_START = SLAM_FRAME + 2;
const PARTICLE_COUNT = 14;

// ---------------------------------------------------------------------------
// Helper: intensified spring slam (1.5x scale overshoot)
// ---------------------------------------------------------------------------
function springSlam1_5x(frame: number, delay: number) {
  const s = spring({
    frame: frame - delay,
    fps: FPS,
    config: { ...SPRING_CONFIG, damping: 10, stiffness: 260 },
  });
  return {
    opacity: s,
    // Normal slam goes 1.8 → 1. At 1.5x intensity: 2.2 → 1
    transform: `scale(${interpolate(s, [0, 1], [2.2, 1])})`,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Scene3Reframe: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Phase flags ----
  const isFirstPhase = frame < VANISH_FRAME;
  const isBeat = frame >= VANISH_FRAME && frame < REVEAL_START;
  const isSecondPhase = frame >= REVEAL_START;
  const isGlitching = frame >= GLITCH_START && frame < VANISH_FRAME;

  // ---- Scene split reveal (horizontal, opens from center) ----
  const reveal = splitReveal({ frame, delay: SPLIT_REVEAL_START, direction: 'horizontal' });

  // ---- First phase: "What if it's not" + "your discipline?" ----
  const twStyle = typewriter({ frame, delay: TYPEWRITER_START, duration: TYPEWRITER_DURATION });
  const line2Opacity = fadeIn(frame, LINE2_FADE_START, LINE2_FADE_DUR);

  // Glitch applied to both lines during glitch window
  const glitch = isGlitching
    ? glitchText({ frame, delay: GLITCH_START })
    : { opacity: 1, transform: 'translate(0px, 0px)' };

  // First phase visibility: visible until vanish
  const firstPhaseOpacity = isFirstPhase ? 1 : 0;

  // ---- Beat: near-black ----
  // beat phase uses near-black overlay

  // ---- Second phase: "What if it's" + "your blood?" ----
  const whatIfSlide = springSlideUp({ frame, delay: REVEAL_START });
  const bloodSlam = springSlam1_5x(frame, SLAM_FRAME);

  // ---- Radial green glow behind "your blood?" ----
  const glowProgress = interpolate(
    frame,
    [GLOW_EXPAND_START, GLOW_EXPAND_START + GLOW_EXPAND_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const glowScale = interpolate(glowProgress, [0, 1], [0.5, 2.0]);
  const glowOpacity = interpolate(glowProgress, [0, 0.3, 1], [0, 0.8, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Breathing pulse on the glow once it's expanded
  const glowBreathe = isSecondPhase ? breathe({ frame: frame - SLAM_FRAME }) : { transform: 'scale(1)' };

  // ---- Light streaks ----
  const streaks = [
    { angle: -25, delay: STREAK_START },
    { angle: 15, delay: STREAK_START + 3 },
    { angle: -8, delay: STREAK_START + 6 },
  ];

  // ---- Converging particles (reverse direction — move inward toward center) ----
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const startRadius = 600;
    const elapsed = frame - SLAM_FRAME;
    if (elapsed < 0) return null;

    const convergence = interpolate(elapsed, [0, 40], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const radius = startRadius * convergence;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = 3 + (i % 4) * 2;
    const particleOpacity = interpolate(elapsed, [0, 5, 35, 40], [0, 0.9, 0.7, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return { x, y, size, opacity: particleOpacity, index: i };
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
        position: 'relative',
        overflow: 'hidden',
        ...reveal,
      }}
    >
      {/* Dark overlay for the dramatic beat */}
      {isBeat && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.97)',
            zIndex: 10,
          }}
        />
      )}

      {/* ================= FIRST PHASE ================= */}
      {isFirstPhase && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0 60px',
            opacity: firstPhaseOpacity,
            zIndex: 2,
            ...(isGlitching ? { transform: glitch.transform, opacity: glitch.opacity } : {}),
          }}
        >
          {/* "What if it's not" — typewriter */}
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 68,
              color: COLORS.white,
              textAlign: 'center',
              lineHeight: 1.3,
              letterSpacing: '-0.03em',
              marginBottom: 24,
              ...twStyle,
            }}
          >
            What if it's not
          </div>

          {/* "your discipline?" — fades in below, dimmed */}
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 600,
              fontSize: 58,
              color: COLORS.textSecondary,
              textAlign: 'center',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              opacity: line2Opacity,
            }}
          >
            your discipline?
          </div>
        </div>
      )}

      {/* ================= SECOND PHASE ================= */}
      {isSecondPhase && (
        <>
          {/* Radial green glow */}
          <div
            style={{
              position: 'absolute',
              width: 900,
              height: 900,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.accent}55 0%, ${COLORS.accent}20 35%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${glowScale}) ${glowBreathe.transform}`,
              opacity: glowOpacity,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Light streaks */}
          {streaks.map((s, i) => {
            const lsAnim = lightStreak({ frame, delay: s.delay, angle: s.angle });
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '150%',
                  height: i === 0 ? 6 : 4,
                  background: `linear-gradient(90deg, transparent 0%, ${COLORS.accent}90 30%, ${COLORS.accent} 50%, ${COLORS.accent}90 70%, transparent 100%)`,
                  top: '50%',
                  left: '-25%',
                  opacity: lsAnim.opacity * 0.7,
                  transform: lsAnim.transform,
                  filter: 'blur(2px)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            );
          })}

          {/* Converging particles */}
          {particles.map((p) => {
            if (!p) return null;
            return (
              <div
                key={p.index}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  backgroundColor: COLORS.accent,
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
                  opacity: p.opacity,
                  boxShadow: `0 0 ${p.size * 2}px ${COLORS.accent}`,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            );
          })}

          {/* Text container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 60px',
              zIndex: 3,
            }}
          >
            {/* "What if it's" — slides up smoothly */}
            <div
              style={{
                ...whatIfSlide,
                fontFamily: FONTS.heading,
                fontWeight: 600,
                fontSize: 62,
                color: COLORS.white,
                textAlign: 'center',
                lineHeight: 1.3,
                letterSpacing: '-0.03em',
                marginBottom: 20,
                textShadow: COLORS.accent + '00 0 0 0', // no glow on this line
              }}
            >
              What if it's
            </div>

            {/* "your blood?" — EXPLODES in with 1.5x spring slam, accent green */}
            <div
              style={{
                ...bloodSlam,
                fontFamily: FONTS.heading,
                fontWeight: 900,
                fontSize: 130,
                color: COLORS.accent,
                textAlign: 'center',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                textShadow: `0 0 40px ${COLORS.accent}88, 0 0 80px ${COLORS.accent}44, 0 4px 20px rgba(0,0,0,0.6)`,
              }}
            >
              your blood?
            </div>
          </div>
        </>
      )}
    </div>
  );
};

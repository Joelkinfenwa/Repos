// Scene 1 — COLD OPEN (0-3s | 90 frames)
// Cyan ECG line draws → pulse → shatter into 40 particles
// "YOU HAVE NO IDEA" punches in, words fall away with gravity

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS, WIDTH } from '../lib/design';
import { slamIn, fadeOut } from '../lib/animations';

// 40 particles that scatter from the line
const SHATTER_PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const angle = (i / 40) * Math.PI * 2 + (i * 0.3);
  const speed = 3 + (i % 5) * 2.5;
  return {
    id: i,
    vx: Math.cos(angle) * speed * (0.7 + Math.random() * 0.6),
    vy: Math.sin(angle) * speed * (0.7 + Math.random() * 0.6),
    size: 2 + (i % 3) * 1.5,
    startX: (i / 40) * WIDTH,
  };
});

const WORDS = ['YOU', 'HAVE', 'NO', 'IDEA'];

export const Scene1ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();

  // === LINE DRAW (f8-f32) ===
  const lineProgress = interpolate(frame, [8, 32], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // === ECG PULSE (f32-f38) ===
  const pulseActive = frame >= 32 && frame < 38;
  const pulseScale = pulseActive
    ? 1 + interpolate(frame, [32, 35, 38], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }) * 0.5
    : 1;

  // === RIPPLE (f32-f45) ===
  const rippleProgress = interpolate(frame, [32, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleOpacity = frame >= 32 ? interpolate(rippleProgress, [0, 1], [0.4, 0]) : 0;
  const rippleRadius = rippleProgress * 600;

  // === SHATTER (f38+) — line disappears, particles scatter ===
  const lineVisible = frame < 38;
  const shatterActive = frame >= 38;
  const shatterT = Math.max(0, frame - 38);

  // === TEXT SLAM (f42-f55) ===
  const textSlam = slamIn(frame, 42, 0);

  // === TEXT HOLD then FALL (f80-f90) ===
  const textVisible = frame >= 42 && frame < 90;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* === CYAN HORIZONTAL LINE === */}
      {lineVisible && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: 2,
            transform: `scaleY(${pulseScale})`,
          }}
        >
          <div
            style={{
              width: `${lineProgress}%`,
              height: '100%',
              backgroundColor: COLORS.cyan,
              boxShadow: `0 0 12px ${COLORS.cyanGlow}, 0 0 30px ${COLORS.cyanDim}`,
            }}
          />
        </div>
      )}

      {/* === ECG PULSE SPIKE === */}
      {pulseActive && (
        <svg
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}
          width="200" height="80" viewBox="0 0 200 80"
        >
          <polyline
            points="0,40 60,40 75,10 90,70 105,20 120,50 140,40 200,40"
            stroke={COLORS.cyan}
            strokeWidth="3"
            fill="none"
            opacity={interpolate(frame, [32, 38], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        </svg>
      )}

      {/* === RIPPLE WAVE === */}
      {frame >= 32 && frame < 48 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: rippleRadius * 2,
            height: rippleRadius * 2,
            borderRadius: '50%',
            border: `2px solid ${COLORS.cyan}`,
            opacity: rippleOpacity,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* === SHATTER PARTICLES === */}
      {shatterActive &&
        SHATTER_PARTICLES.map((p) => {
          const pOpacity = interpolate(shatterT, [0, 30], [0.8, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const px = p.startX + p.vx * shatterT;
          const py = 960 + p.vy * shatterT + 0.3 * shatterT * shatterT; // gravity

          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: px,
                top: py,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: COLORS.cyan,
                opacity: pOpacity,
                boxShadow: `0 0 4px ${COLORS.cyanGlow}`,
              }}
            />
          );
        })}

      {/* === "YOU HAVE NO IDEA" TEXT === */}
      {textVisible && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            padding: `0 ${SAFE.left}px`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 20px',
              ...textSlam,
            }}
          >
            {WORDS.map((word, i) => {
              // Gravity fall: starts at f80, each word staggers 3 frames
              const fallStart = 80 + i * 3;
              const fallT = Math.max(0, frame - fallStart);
              const fallY = fallT > 0 ? fallT * fallT * 1.5 : 0;
              const fallOpacity = fallT > 0 ? fadeOut(frame, fallStart, 10) : 1;
              const fallRot = fallT > 0 ? fallT * (i % 2 === 0 ? 1.5 : -1.5) : 0;

              return (
                <span
                  key={word}
                  style={{
                    fontFamily: FONTS.sans,
                    fontWeight: 900,
                    fontSize: 96,
                    color: COLORS.white,
                    textShadow: `0 0 40px ${COLORS.cyanGlow}`,
                    letterSpacing: '-0.02em',
                    transform: `translateY(${fallY}px) rotate(${fallRot}deg)`,
                    opacity: fallOpacity,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

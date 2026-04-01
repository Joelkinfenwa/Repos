// Scene 4 — THE SHIFT (13-18s | 150 frames)
// "Stop guessing. Start knowing." typewriter
// Three glass-morphism data cards with shimmer

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS } from '../lib/design';
import { slideUp, fadeIn, fadeOut } from '../lib/animations';

const HEADLINE = 'Stop guessing. Start knowing.';

const CARDS = [
  { category: 'Your hormones', question: 'Are they optimised?' },
  { category: 'Your thyroid', question: 'Is it keeping up?' },
  { category: 'Your inflammation', question: 'What\'s it telling you?' },
];

export const Scene4Shift: React.FC = () => {
  const frame = useCurrentFrame();

  // === COLLAPSE POINT (f0-f10) ===
  const pointOpacity = interpolate(frame, [0, 5, 10], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pointScale = interpolate(frame, [5, 10], [1, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // === GRID LINES (f10-f18) ===
  const gridOpacity = fadeIn(frame, 10, 8) * 0.03;

  // === TYPEWRITER (f18+) ===
  const typeStart = 18;
  const charsPerFrame = 1.5;
  const visibleChars = Math.min(
    HEADLINE.length,
    Math.max(0, Math.floor((frame - typeStart) * charsPerFrame)),
  );
  const typedText = HEADLINE.slice(0, visibleChars);

  // === CARDS (f40, f52, f64) ===

  // Exit
  const exitFade = fadeOut(frame, 135, 15);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        opacity: exitFade,
      }}
    >
      {/* Collapse point */}
      {frame < 12 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: COLORS.white,
            boxShadow: `0 0 20px ${COLORS.white}, 0 0 60px ${COLORS.cyanGlow}`,
            opacity: pointOpacity,
            transform: `translate(-50%, -50%) scale(${pointScale})`,
          }}
        />
      )}

      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridOpacity,
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, ${COLORS.white} 79px, ${COLORS.white} 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, ${COLORS.white} 79px, ${COLORS.white} 80px)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Typewriter headline */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top + 80,
          left: SAFE.left,
          right: SAFE.right,
          textAlign: 'center',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 58,
            color: COLORS.white,
          }}
        >
          {typedText.split('').map((ch, ci) => {
            const charAge = frame - typeStart - ci / charsPerFrame;
            const charGlow = charAge >= 0 && charAge < 6
              ? interpolate(charAge, [0, 3, 6], [0.6, 0.3, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              : 0;
            return (
              <span
                key={ci}
                style={{
                  textShadow: charGlow > 0
                    ? `0 0 ${8 + charGlow * 20}px ${COLORS.cyan}`
                    : undefined,
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      </div>

      {/* Glass-morphism cards */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top + 260,
          left: SAFE.left,
          right: SAFE.right,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          zIndex: 3,
        }}
      >
        {CARDS.map((card, i) => {
          const cardDelay = 40 + i * 12;
          const anim = slideUp(frame, cardDelay, 100);

          // Shimmer sweep
          const shimmerProgress = interpolate(
            frame,
            [cardDelay + 5, cardDelay + 25],
            [-100, 200],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );

          return (
            <div
              key={card.category}
              style={{
                position: 'relative',
                backgroundColor: COLORS.white04,
                borderRadius: 16,
                padding: '28px 32px',
                borderLeft: `3px solid ${COLORS.cyan}`,
                border: `1px solid ${COLORS.white08}`,
                borderLeftWidth: 3,
                borderLeftColor: COLORS.cyan,
                overflow: 'hidden',
                ...anim,
              }}
            >
              {/* Shimmer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(110deg, transparent ${shimmerProgress - 30}%, rgba(255,255,255,0.06) ${shimmerProgress}%, transparent ${shimmerProgress + 30}%)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontWeight: 700,
                  fontSize: 36,
                  color: COLORS.cyan,
                  marginBottom: 6,
                }}
              >
                {card.category}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontWeight: 400,
                  fontSize: 32,
                  color: COLORS.white70,
                }}
              >
                {card.question}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

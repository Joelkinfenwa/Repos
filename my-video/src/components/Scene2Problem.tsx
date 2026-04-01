// Scene 2 — THE PROBLEM (3-8s | 150 frames)
// Tracking cascade → blur out → "But what about your blood?" slam + shake

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS } from '../lib/design';
import { slideFromRight, slamIn, screenShake, fadeOut } from '../lib/animations';

const TRACKING_LINES = [
  'You track your sleep.',
  'You track your steps.',
  'You track your macros.',
  'You track your heart rate.',
];

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Tracking lines cascade (stagger 4 frames, start at f5)
  const blurStart = 45; // f135 absolute = f45 local
  const slamStart = 55;

  // Blur out all lines
  const blurAmount = interpolate(frame, [blurStart, blurStart + 10], [0, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blurScale = interpolate(frame, [blurStart, blurStart + 10], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "But what about your blood?" slam
  const slam = slamIn(frame, slamStart, 1.8);
  const shake = screenShake(frame, slamStart + 3, 3, 8);

  // Crimson heartbeat pulse
  const pulseStart = slamStart + 5;
  const pulseProgress = interpolate(frame, [pulseStart, pulseStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseOpacity = frame >= pulseStart
    ? interpolate(pulseProgress, [0, 0.3, 1], [0.2, 0.15, 0])
    : 0;
  const pulseSize = pulseProgress * 1200;

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
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {/* Crimson heartbeat pulse */}
      {frame >= pulseStart && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: pulseSize,
            height: pulseSize,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${COLORS.crimson} 0%, transparent 70%)`,
            opacity: pulseOpacity,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tracking lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${SAFE.left}px`,
          gap: 16,
          filter: frame >= blurStart ? `blur(${blurAmount}px)` : undefined,
          transform: frame >= blurStart ? `scale(${blurScale})` : undefined,
          opacity: frame >= blurStart
            ? interpolate(frame, [blurStart, blurStart + 10], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1,
        }}
      >
        {TRACKING_LINES.map((line, i) => {
          const anim = slideFromRight(frame, 5 + i * 4);
          return (
            <div
              key={line}
              style={{
                fontFamily: FONTS.sans,
                fontWeight: 500,
                fontSize: 44,
                color: COLORS.white70,
                textAlign: 'center',
                ...anim,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* "But what about your blood?" */}
      {frame >= slamStart && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `0 ${SAFE.left}px`,
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontWeight: 900,
              fontSize: 64,
              color: COLORS.white,
              textAlign: 'center',
              lineHeight: 1.2,
              textShadow: '0 0 30px rgba(255,255,255,0.15)',
              ...slam,
            }}
          >
            But what about
            <br />
            <span style={{ color: COLORS.cyan }}>your blood?</span>
          </div>
        </div>
      )}
    </div>
  );
};

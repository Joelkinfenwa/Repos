// Scene 3 — THE REVELATION (8-13s | 150 frames)
// Animated counter 0→40+, orbiting category labels as data constellation

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { countUp, scaleIn, slideUp, fadeIn, fadeOut } from '../lib/animations';

const LABELS = [
  'Hormones', 'Thyroid', 'Liver', 'Kidney',
  'Iron', 'Cholesterol', 'Vitamins', 'Inflammation',
];

export const Scene3Revelation: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom-blur entrance
  const enterScale = interpolate(frame, [0, 8], [1.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const enterBlur = interpolate(frame, [0, 8], [4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter 0→40 (easeOutQuart over 45 frames)
  const count = countUp(frame, 8, 40, 45);

  // "+" springs in at f53
  const plus = scaleIn(frame, 53, 0);

  // Subtitle
  const subtitle = slideUp(frame, 55);

  // Subtitle letter-spacing animation
  const letterSpacing = interpolate(frame, [55, 75], [-2, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Constellation rotation
  const rotation = frame * 0.3;

  // Counter glow
  const counterGlow = 0.3 + Math.sin(frame * 0.08) * 0.15;

  // Exit
  const exitFade = fadeOut(frame, 135, 15);

  const cx = WIDTH / 2;
  const cy = 800; // centre of constellation
  const radius = 360;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transform: `scale(${enterScale})`,
        filter: enterBlur > 0.1 ? `blur(${enterBlur}px)` : undefined,
        opacity: exitFade,
      }}
    >
      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          top: cy - 100,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 900,
            fontSize: 180,
            color: COLORS.white,
            fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 60px rgba(34,211,238,${counterGlow}), 0 0 120px rgba(34,211,238,${counterGlow * 0.4})`,
          }}
        >
          {count}
        </span>
        {frame >= 53 && (
          <span
            style={{
              fontFamily: FONTS.sans,
              fontWeight: 900,
              fontSize: 140,
              color: COLORS.cyan,
              ...plus,
            }}
          >
            +
          </span>
        )}
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: cy + 90,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 3,
          ...subtitle,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 300,
            fontSize: 38,
            color: COLORS.white60,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          biomarkers hiding beneath the surface
        </span>
      </div>

      {/* Data constellation — orbiting labels with connecting lines */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        width="1080"
        height="1920"
      >
        {LABELS.map((label, i) => {
          const angle = (i / LABELS.length) * Math.PI * 2 + (rotation * Math.PI) / 180;
          const lx = cx + Math.cos(angle) * radius;
          const ly = cy + Math.sin(angle) * (radius * 0.65); // elliptical
          const labelDelay = 60 + i * 6;
          const labelOpacity = fadeIn(frame, labelDelay, 10);
          const dotScale = interpolate(frame, [labelDelay, labelDelay + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          // Pulsing dot
          const dotPulse = labelOpacity > 0.5 ? 1 + Math.sin((frame - labelDelay) * 0.3) * 0.3 : 1;

          // Connecting line
          const lineOpacity = fadeIn(frame, labelDelay + 4, 12) * 0.08;

          return (
            <g key={label}>
              {/* Connecting line */}
              <line
                x1={cx}
                y1={cy}
                x2={lx}
                y2={ly}
                stroke={COLORS.white}
                strokeWidth="1"
                opacity={lineOpacity}
              />
              {/* Cyan dot */}
              <circle
                cx={lx}
                cy={ly}
                r={6 * dotScale * dotPulse}
                fill={COLORS.cyan}
                opacity={labelOpacity * 0.8}
              />
              {/* Label text */}
              <text
                x={lx}
                y={ly + 22}
                textAnchor="middle"
                fontFamily={FONTS.sans}
                fontWeight="500"
                fontSize="26"
                fill={COLORS.white}
                opacity={labelOpacity * 0.7}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

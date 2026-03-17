// SCENE 5: STATS ANIMATION — 18-23s (frames 0-150 local)
// Animated stat counters in a grid, staggered entrance
// Then biomarker cascade like a typewriter

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { sp, springSlideUp, sceneTransition } from '../lib/animations';

const STATS = [
  { value: '5,000+', label: 'Australians tested', countTo: 5000, delay: 5 },
  { value: '4.6★', label: 'Verified rating', countTo: 4.6, delay: 15, decimal: true },
  { value: '2,000+', label: 'Collection centres', countTo: 2000, delay: 25 },
  { value: '48hrs', label: 'Results turnaround', delay: 35 },
];

const MARKERS = [
  'Testosterone', 'Cortisol', 'Thyroid', 'Iron',
  'Vitamin D', 'Liver', 'Kidney', '+20 more',
];

function formatNumber(n: number, decimal?: boolean): string {
  if (decimal) return n.toFixed(1);
  return Math.round(n).toLocaleString();
}

export const Scene5Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

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
        padding: '0 50px',
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
      }}
    >
      {/* Green glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}15 0%, transparent 70%)`,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Stats grid — 2x2 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 30,
          width: '100%',
          maxWidth: 900,
          zIndex: 1,
        }}
      >
        {STATS.map((stat, i) => {
          const anim = springSlideUp({ frame, delay: stat.delay });

          // Counter animation
          let displayVal = stat.value;
          if (stat.countTo !== undefined) {
            const progress = sp(frame, stat.delay);
            const counted = interpolate(progress, [0, 1], [0, stat.countTo]);
            const suffix = stat.value.includes('+') ? '+' : '';
            const star = stat.value.includes('★') ? '★' : '';
            displayVal = formatNumber(counted, stat.decimal) + suffix + star;
          }

          return (
            <div
              key={i}
              style={{
                ...anim,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 16,
                padding: '36px 24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontWeight: 700,
                  fontSize: 52,
                  color: COLORS.green,
                  letterSpacing: '0.02em',
                  marginBottom: 8,
                }}
              >
                {displayVal}
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontWeight: 700,
                  fontSize: 20,
                  color: COLORS.dimmed,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Biomarker cascade — typewriter style */}
      <div
        style={{
          marginTop: 60,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          maxWidth: 900,
          zIndex: 1,
        }}
      >
        {MARKERS.map((marker, i) => {
          const markerDelay = 70 + i * 6;
          const progress = sp(frame, markerDelay);
          return (
            <span
              key={i}
              style={{
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [15, 0])}px)`,
                fontFamily: FONTS.heading,
                fontWeight: 600,
                fontSize: 28,
                color: i === MARKERS.length - 1 ? COLORS.greenBright : COLORS.white,
                whiteSpace: 'nowrap',
              }}
            >
              {marker}
              {i < MARKERS.length - 1 ? ' · ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};

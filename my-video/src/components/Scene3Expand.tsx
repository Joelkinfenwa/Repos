// Scene 3: EXPAND (14-20s | 180 frames)
// Phone shrinks to center, key stats expand outward
// Cards float around the miniature phone
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { firmSpring, fadeIn, slideUp } from '../lib/animations';

const STATS = [
  { value: '40+', label: 'Biomarkers', x: -280, y: -200 },
  { value: '48hr', label: 'Results', x: 280, y: -200 },
  { value: '$319', label: 'All Inclusive', x: -280, y: 100 },
  { value: '2000+', label: 'Lab Locations', x: 280, y: 100 },
];

const CATEGORIES = [
  'Hormones', 'Thyroid', 'Heart', 'Liver',
  'Iron', 'Vitamins', 'Cholesterol', 'Inflammation',
];

export const Scene3Expand: React.FC = () => {
  const frame = useCurrentFrame();

  // Mini phone in center (just a silhouette now)
  const phoneScale = firmSpring(frame, 0);
  const phoneOpacity = fadeIn(frame, 0, 15);

  // Headline
  const headAnim = slideUp(frame, 10);

  // Stats cards fly out
  const statsEntrance = (delay: number) => {
    const s = firmSpring(frame, delay);
    return s;
  };

  // Category pills appear
  const pillsOpacity = fadeIn(frame, 90, 25);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          width: WIDTH,
          textAlign: 'center',
          ...headAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 50,
            fontWeight: 400,
            color: COLORS.cream,
          }}
        >
          Everything You Need
        </div>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 50,
            fontWeight: 400,
            color: COLORS.gold,
            marginTop: 8,
          }}
        >
          In One Test
        </div>
      </div>

      {/* Mini phone silhouette */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interpolate(phoneScale, [0, 1], [0.5, 1])})`,
          opacity: phoneOpacity,
          width: 80,
          height: 160,
          borderRadius: 16,
          border: `2px solid ${COLORS.gold}`,
          backgroundColor: 'rgba(212,165,116,0.05)',
        }}
      />

      {/* Stat cards orbiting around phone */}
      {STATS.map((stat, i) => {
        const s = statsEntrance(25 + i * 10);
        const floatY = Math.sin(frame * 0.04 + i * 1.5) * 6;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `calc(50% + ${stat.y + floatY}px)`,
              left: `calc(50% + ${stat.x}px)`,
              transform: `translate(-50%, -50%) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
              opacity: s,
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '20px 30px',
                borderRadius: 20,
                backgroundColor: 'rgba(212,165,116,0.08)',
                border: `1px solid rgba(212,165,116,0.15)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.serif,
                  fontSize: 44,
                  fontWeight: 400,
                  color: COLORS.cream,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 16,
                  fontWeight: 300,
                  color: COLORS.cream50,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Category pills at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          left: 60,
          right: 60,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          opacity: pillsOpacity,
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 400,
              color: COLORS.gold,
              border: `1px solid ${COLORS.goldDim}`,
              borderRadius: 30,
              padding: '10px 24px',
              opacity: fadeIn(frame, 95 + i * 4, 12),
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

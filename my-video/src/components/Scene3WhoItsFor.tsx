// Scene 3 — WHO IT'S FOR & WHY (8-13s | 150 frames)
// Sales-driven: YOUR GP test only checks 6-8 markers. This checks 30+.
// Targeting: athletes, lifters, biohackers, high performers
// WHY: Stop guessing. Get the full picture.

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  springSlideUp,
  springSlamHard,
  staggerFadeUp,
  fadeOut,
  sceneTransition,
  breathe,
  particleFloat,
} from '../lib/animations';

// SVG Icons
const DumbbellIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="3" y="15" width="5" height="10" rx="1.5" fill={COLORS.green} />
    <rect x="8" y="12" width="3" height="16" rx="1" fill={COLORS.green} opacity={0.7} />
    <rect x="29" y="12" width="3" height="16" rx="1" fill={COLORS.green} opacity={0.7} />
    <rect x="32" y="15" width="5" height="10" rx="1.5" fill={COLORS.green} />
    <rect x="11" y="18.5" width="18" height="3" rx="1" fill={COLORS.green} opacity={0.5} />
  </svg>
);

const BrainIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path
      d="M20 6c-4 0-7 2-8 5-3 1-5 4-5 7 0 4 3 7 6 8 1 3 4 6 7 6s6-3 7-6c3-1 6-4 6-8 0-3-2-6-5-7-1-3-4-5-8-5z"
      stroke={COLORS.green}
      strokeWidth="2"
      fill="none"
    />
    <path d="M20 6v26" stroke={COLORS.green} strokeWidth="1.5" opacity={0.4} />
  </svg>
);

const ChartUpIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <polyline
      points="4,32 14,22 20,26 28,14 36,8"
      stroke={COLORS.green}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <polyline
      points="30,8 36,8 36,14"
      stroke={COLORS.green}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const PROFILES = [
  { icon: <DumbbellIcon />, title: 'Athletes & Lifters', sub: 'Optimise recovery & hormones' },
  { icon: <BrainIcon />, title: 'Biohackers', sub: 'Track what your GP won\'t test' },
  { icon: <ChartUpIcon />, title: 'High Performers', sub: 'Data-driven health decisions' },
];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 50 + ((i * 91) % 980),
  y: 80 + ((i * 143) % 1760),
  size: 2 + (i % 3),
  opacity: 0.04 + (i % 4) * 0.02,
}));

export const Scene3WhoItsFor: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // "A standard GP screen checks 6-8 markers."
  const gpLine = springSlideUp({ frame, delay: 3 });

  // "This checks 30+." — slam
  const thisLine = springSlamHard({ frame, delay: 18 });

  // Exit fade
  const exitFade = fadeOut(frame, 130, 20);

  // Background
  const bgBreathe = breathe({ frame });

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
        position: 'relative',
        overflow: 'hidden',
        opacity: opacity * exitFade,
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '120%',
          height: '60%',
          transform: `translate(-50%, -50%) ${bgBreathe.transform}`,
          background: GRADIENTS.heroGlow,
          pointerEvents: 'none',
        }}
      />

      {/* Particles */}
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
              backgroundColor: COLORS.green,
              opacity: p.opacity,
              transform: pAnim.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          width: '100%',
        }}
      >
        {/* GP comparison text */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 12,
            ...gpLine,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 600,
              fontSize: 38,
              color: COLORS.textSecondary,
            }}
          >
            A standard GP screen checks 6–8 markers.
          </span>
        </div>

        {/* "This checks 30+." — big green slam */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 60,
            ...thisLine,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 64,
              color: COLORS.green,
              textShadow: SHADOWS.greenGlow,
            }}
          >
            This checks 30+.
          </span>
        </div>

        {/* Profile cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: '100%',
          }}
        >
          {PROFILES.map((profile, i) => {
            const anim = staggerFadeUp({
              frame,
              delay: 35,
              index: i,
              staggerAmount: 8,
            });

            return (
              <div
                key={profile.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  backgroundColor: COLORS.cardBg,
                  borderRadius: 16,
                  padding: '22px 24px',
                  borderLeft: `4px solid ${COLORS.green}`,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderLeftWidth: 4,
                  borderLeftColor: COLORS.green,
                  boxShadow: SHADOWS.cardShadow,
                  ...anim,
                }}
              >
                <div style={{ flexShrink: 0 }}>{profile.icon}</div>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontWeight: 700,
                      fontSize: 34,
                      color: COLORS.white,
                      lineHeight: 1.2,
                    }}
                  >
                    {profile.title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontWeight: 400,
                      fontSize: 26,
                      color: COLORS.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    {profile.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
};

// Scene 3 — WHO IT'S FOR (8-13s | 150 frames)
// "Built For People Who Take Performance Seriously"
// Three profile cards with SVG icons stagger from bottom

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import { springSlideUp, elasticSlideUp, fadeOut, sceneTransition } from '../lib/animations';

// SVG Icons as inline components
const DumbbellIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="18" width="6" height="12" rx="2" fill={COLORS.cyan} />
    <rect x="10" y="14" width="4" height="20" rx="1" fill={COLORS.cyan} opacity={0.7} />
    <rect x="34" y="14" width="4" height="20" rx="1" fill={COLORS.cyan} opacity={0.7} />
    <rect x="38" y="18" width="6" height="12" rx="2" fill={COLORS.cyan} />
    <rect x="14" y="22" width="20" height="4" rx="1" fill={COLORS.cyan} opacity={0.5} />
  </svg>
);

const BriefcaseIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="16" width="36" height="24" rx="4" stroke={COLORS.cyan} strokeWidth="3" fill="none" />
    <path d="M16 16V12a4 4 0 014-4h8a4 4 0 014 4v4" stroke={COLORS.cyan} strokeWidth="3" fill="none" />
    <line x1="6" y1="28" x2="42" y2="28" stroke={COLORS.cyan} strokeWidth="2" opacity={0.5} />
  </svg>
);

const HeartPulseIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 40s-14-8.5-14-19a9 9 0 0118 0 9 9 0 0118 0c0 10.5-14 19-14 19z"
      fill="none"
      stroke={COLORS.cyan}
      strokeWidth="3"
      opacity={0.4}
    />
    <polyline
      points="10,26 18,26 21,18 24,34 27,22 30,26 38,26"
      stroke={COLORS.cyan}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CARDS = [
  { icon: <DumbbellIcon />, label: 'Athletes & Lifters' },
  { icon: <BriefcaseIcon />, label: 'High Performers' },
  { icon: <HeartPulseIcon />, label: 'Health Optimisers' },
];

export const Scene3WhoItsFor: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Headline
  const headline = springSlideUp({ frame, delay: 5 });

  // Exit fade
  const exitFade = fadeOut(frame, 130, 20);

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
      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 800,
          fontSize: 56,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.2,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          marginBottom: 60,
          textShadow: SHADOWS.textShadow,
          ...headline,
        }}
      >
        Built For People
        <br />
        Who Take Performance{' '}
        <span style={{ color: COLORS.cyan }}>Seriously</span>
      </div>

      {/* Profile cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          width: '100%',
        }}
      >
        {CARDS.map((card, i) => {
          const anim = elasticSlideUp({ frame, delay: 30 + i * 12 });

          return (
            <div
              key={card.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                backgroundColor: COLORS.cardBg,
                borderRadius: 16,
                padding: '24px 28px',
                borderLeft: `4px solid ${COLORS.purple}`,
                border: `1px solid ${COLORS.cardBorder}`,
                borderLeftWidth: 4,
                borderLeftColor: COLORS.purple,
                boxShadow: SHADOWS.cardShadow,
                ...anim,
              }}
            >
              <div style={{ flexShrink: 0 }}>{card.icon}</div>
              <span
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 600,
                  fontSize: 36,
                  color: COLORS.white,
                }}
              >
                {card.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

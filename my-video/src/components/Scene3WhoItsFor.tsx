// Scene 3 — TRUST SIGNALS (8-13s | 150 frames)
// Matches the landing page checklist:
// ✓ 30+ biomarkers tested
// ✓ Doctor-reviewed PDF report
// ✓ Results in 48 hours
// ✓ No GP referral needed
// ✓ NATA-accredited labs
// Plus the 3 tick-mark trust points from the hero

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import { springSlideUp, staggerFadeUp, fadeOut, sceneTransition } from '../lib/animations';

const CHECKS = [
  '30+ biomarkers tested',
  'Hormones, thyroid, metabolic & blood health',
  'Doctor-reviewed PDF report',
  'Results in 48 hours',
  'Pathology form emailed instantly',
  'No GP referral needed',
];

const CheckIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="rgba(16,185,129,0.15)" />
    <path
      d="M10 16l4 4 8-8"
      stroke="#10B981"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const Scene3WhoItsFor: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  const headline = springSlideUp({ frame, delay: 5 });
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
        What&apos;s{' '}
        <span style={{ color: COLORS.green }}>Included</span>
      </div>

      {/* Checklist */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingLeft: SAFE.left + 20,
          paddingRight: SAFE.right + 20,
          width: '100%',
        }}
      >
        {CHECKS.map((item, i) => {
          const anim = staggerFadeUp({
            frame,
            delay: 20,
            index: i,
            staggerAmount: 6,
          });

          return (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                ...anim,
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 600,
                  fontSize: 36,
                  color: COLORS.white,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom trust badges row */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 50,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
        }}
      >
        {['NATA-accredited', 'Private & secure', 'Doctor-reviewed', 'Instant form'].map(
          (badge, i) => {
            const anim = staggerFadeUp({
              frame,
              delay: 65,
              index: i,
              staggerAmount: 5,
            });
            return (
              <div
                key={badge}
                style={{
                  backgroundColor: COLORS.cardBg,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 8,
                  padding: '10px 16px',
                  ...anim,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    fontSize: 22,
                    color: COLORS.textSecondary,
                  }}
                >
                  {badge}
                </span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

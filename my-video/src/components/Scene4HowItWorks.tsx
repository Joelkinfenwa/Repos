// Scene 4 — HOW IT WORKS (13-18s | 150 frames)
// 3-step flow: Order Online → Walk Into 2,000+ Centres → Results in 48hrs
// SVG stroke draw animations, connecting lines

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS } from '../lib/design';
import {
  springSlideUp,
  staggerFadeUp,
  strokeDraw,
  fadeOut,
  sceneTransition,
} from '../lib/animations';

const CartIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M6 6h5l3 20h20l3-14H14"
        stroke={COLORS.green}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <circle cx="18" cy="34" r="2.5" stroke={COLORS.green} strokeWidth="2" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
      <circle cx="32" cy="34" r="2.5" stroke={COLORS.green} strokeWidth="2" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
    </svg>
  );
};

const MapPinIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4C16 4 10 10 10 18c0 12 14 26 14 26s14-14 14-26c0-8-6-14-14-14z"
        stroke={COLORS.green}
        strokeWidth="2.5"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <circle cx="24" cy="18" r="5" stroke={COLORS.green} strokeWidth="2" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
    </svg>
  );
};

const ChartIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <polyline
        points="6,38 14,28 22,32 30,16 42,8"
        stroke={COLORS.green}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <polyline
        points="34,8 42,8 42,16"
        stroke={COLORS.green}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
    </svg>
  );
};

const STEPS = [
  { icon: CartIcon, label: 'Order Online', sub: 'Takes 2 minutes' },
  { icon: MapPinIcon, label: 'Walk Into Any of\n2,000+ Centres', sub: 'No referral needed' },
  { icon: ChartIcon, label: 'Results in 48hrs', sub: 'Doctor-reviewed PDF' },
];

export const Scene4HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  const headline = springSlideUp({ frame, delay: 3 });
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
      {/* Title */}
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 800,
          fontSize: 56,
          color: COLORS.white,
          textAlign: 'center',
          textShadow: SHADOWS.textShadow,
          marginBottom: 80,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          ...headline,
        }}
      >
        How It <span style={{ color: COLORS.green }}>Works</span>
      </div>

      {/* Steps */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
          width: '100%',
        }}
      >
        {STEPS.map((step, i) => {
          const stepDelay = 15 + i * 10;
          const anim = staggerFadeUp({
            frame,
            delay: 15,
            index: i,
            staggerAmount: 10,
          });

          const lineProgress =
            i < STEPS.length - 1
              ? interpolate(
                  frame,
                  [stepDelay + 15, stepDelay + 30],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                )
              : 0;

          const IconComponent = step.icon;

          return (
            <React.Fragment key={step.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  width: '100%',
                  ...anim,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    border: `2px solid ${COLORS.green}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: SHADOWS.greenGlow,
                  }}
                >
                  <IconComponent frame={frame} delay={stepDelay} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontWeight: 700,
                      fontSize: 34,
                      color: COLORS.white,
                      whiteSpace: 'pre-line',
                      lineHeight: 1.25,
                    }}
                  >
                    {step.label}
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
                    {step.sub}
                  </div>
                </div>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 40,
                    marginLeft: 39,
                    background: `linear-gradient(180deg, ${COLORS.green}, transparent)`,
                    opacity: lineProgress,
                    transformOrigin: 'top',
                    transform: `scaleY(${lineProgress})`,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

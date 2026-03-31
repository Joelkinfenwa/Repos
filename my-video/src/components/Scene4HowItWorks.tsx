// Scene 4 — HOW IT WORKS (13-18s | 150 frames)
// 3-step flow with SVG stroke-dashoffset draw animation
// Connecting lines draw between steps, stagger by 10 frames

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

// SVG Icons with draw animation support
const CartIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path
        d="M8 8h6l4 24h24l4-16H18"
        stroke={COLORS.cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <circle cx="22" cy="40" r="3" stroke={COLORS.cyan} strokeWidth="2.5" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
      <circle cx="38" cy="40" r="3" stroke={COLORS.cyan} strokeWidth="2.5" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
    </svg>
  );
};

const MapPinIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path
        d="M28 4C18.06 4 10 12.06 10 22c0 14 18 30 18 30s18-16 18-30C46 12.06 37.94 4 28 4z"
        stroke={COLORS.cyan}
        strokeWidth="3"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <circle cx="28" cy="22" r="6" stroke={COLORS.cyan} strokeWidth="2.5" fill="none"
        strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
    </svg>
  );
};

const ChartIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const draw = strokeDraw({ frame, delay, duration: 15, totalLength: 200 });
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <polyline
        points="6,44 16,32 26,36 36,18 50,8"
        stroke={COLORS.cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={draw.strokeDasharray}
        strokeDashoffset={draw.strokeDashoffset}
      />
      <polyline
        points="40,8 50,8 50,18"
        stroke={COLORS.cyan}
        strokeWidth="3"
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
  { icon: CartIcon, label: 'Order Online' },
  { icon: MapPinIcon, label: 'Walk Into Any of\n2,000+ Centres' },
  { icon: ChartIcon, label: 'Results Within\n24hrs' },
];

export const Scene4HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 150;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Headline
  const headline = springSlideUp({ frame, delay: 3 });

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
        How It <span style={{ color: COLORS.cyan }}>Works</span>
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

          // Connecting line between steps
          const lineProgress = i < STEPS.length - 1
            ? interpolate(
                frame,
                [stepDelay + 15, stepDelay + 30],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )
            : 0;

          const IconComponent = step.icon;

          return (
            <React.Fragment key={step.label}>
              {/* Step */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  width: '100%',
                  ...anim,
                }}
              >
                {/* Number circle + icon */}
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34,211,238,0.1)',
                    border: `2px solid ${COLORS.cyan}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: SHADOWS.cyanGlow,
                  }}
                >
                  <IconComponent frame={frame} delay={stepDelay} />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 600,
                    fontSize: 36,
                    color: COLORS.white,
                    whiteSpace: 'pre-line',
                    lineHeight: 1.25,
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 50,
                    marginLeft: 44,
                    background: `linear-gradient(180deg, ${COLORS.cyan}, transparent)`,
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

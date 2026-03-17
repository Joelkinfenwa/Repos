// SCENE 5: HOW IT WORKS — 30-38s (frames 900-1140, local 0-240)
// Three numbered step cards sliding in sequentially with connecting dots

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { NarrationCaption } from './NarrationCaption';

interface Step {
  number: number;
  icon: string;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: '\uD83D\uDD0D',
    title: 'Choose Your Package',
    subtitle: 'Browse our range of health panels',
  },
  {
    number: 2,
    icon: '\uD83D\uDCCD',
    title: 'Visit a Collection Centre',
    subtitle: '2,000+ locations Australia-wide',
  },
  {
    number: 3,
    icon: '\uD83D\uDCCB',
    title: 'Get Your Results',
    subtitle: 'Within 48 hours, doctor-reviewed',
  },
];

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Heading
  const headingSpring = spring({
    frame: frame - 5,
    fps: FPS,
    config: { damping: 16, stiffness: 100, mass: 0.8 },
  });

  // Exit
  const exitOpacity = interpolate(frame, [215, 238], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.bg,
        padding: '200px 60px 0',
        position: 'relative',
        opacity: exitOpacity,
      }}
    >
      {/* Heading */}
      <div
        style={{
          opacity: headingSpring,
          transform: `translateY(${interpolate(headingSpring, [0, 1], [30, 0])}px)`,
          fontFamily: FONTS.heading,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.white,
          textAlign: 'center',
          marginBottom: 80,
          zIndex: 1,
        }}
      >
        How It Works
      </div>

      {/* Steps container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          width: '100%',
          maxWidth: 860,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Green connecting line */}
        <div
          style={{
            position: 'absolute',
            left: 55,
            top: 70,
            width: 4,
            height: interpolate(frame, [50, 180], [0, 650], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            backgroundColor: `${COLORS.green}30`,
            borderRadius: 2,
            zIndex: 0,
          }}
        />

        {STEPS.map((step, i) => {
          const cardDelay = 30 + i * 50;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps: FPS,
            config: { damping: 14, stiffness: 100, mass: 0.9 },
          });

          return (
            <div
              key={step.number}
              style={{
                opacity: cardSpring,
                transform: `translateX(${interpolate(cardSpring, [0, 1], [-80, 0])}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 28,
                marginBottom: 50,
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  backgroundColor: `${COLORS.green}18`,
                  border: `2px solid ${COLORS.green}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Card content */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#141914',
                  borderRadius: 16,
                  padding: '32px 36px',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
              >
                {/* Step number label */}
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 18,
                    color: COLORS.green,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 8,
                  }}
                >
                  Step {step.number}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 40,
                    fontWeight: 800,
                    color: COLORS.white,
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 28,
                    fontWeight: 400,
                    color: COLORS.dimmedMid,
                    lineHeight: 1.3,
                  }}
                >
                  {step.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NarrationCaption
        text="Pick your package, walk into any of two thousand collection centres, and get your results within forty-eight hours."
        frame={frame}
        startFrame={15}
      />
    </div>
  );
};

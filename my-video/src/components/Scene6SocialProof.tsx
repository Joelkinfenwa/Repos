// SCENE 6: SOCIAL PROOF + TRUST — 23-27s (frames 0-120 local)
// Checkmark animations for trust points
// Quick flash of checkout screenshot

import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Img } from 'remotion';
import { COLORS, FONTS, FPS, SPRING_CONFIG } from '../lib/design';
import { sp, sceneTransition } from '../lib/animations';

const TRUST_POINTS = [
  { text: 'Doctor-reviewed results', delay: 5 },
  { text: 'NATA-accredited labs', delay: 20 },
  { text: 'Same labs your GP uses', delay: 35 },
];

const CheckmarkIcon: React.FC<{ progress: number }> = ({ progress }) => {
  // Animated checkmark circle + tick
  const circleScale = interpolate(progress, [0, 0.6], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const tickProgress = interpolate(progress, [0.4, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        backgroundColor: COLORS.green,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${circleScale})`,
        flexShrink: 0,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M6 14 L12 20 L22 8"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="30"
          strokeDashoffset={30 - 30 * tickProgress}
        />
      </svg>
    </div>
  );
};

export const Scene6SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  // Checkout phone mockup appears at frame 60
  const phoneEnter = spring({
    frame: frame - 60,
    fps: FPS,
    config: SPRING_CONFIG,
  });
  const phoneRotY = interpolate(frame, [60, 120], [-5, 5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        padding: '0 60px',
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
      }}
    >
      {/* Trust points with checkmarks */}
      <div style={{ zIndex: 1, width: '100%', maxWidth: 800, marginBottom: 60 }}>
        {TRUST_POINTS.map((point, i) => {
          const progress = sp(frame, point.delay);
          const slideX = interpolate(progress, [0, 1], [60, 0]);

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginBottom: 32,
                opacity: progress,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <CheckmarkIcon progress={progress} />
              <span
                style={{
                  fontFamily: FONTS.heading,
                  fontWeight: 700,
                  fontSize: 48,
                  color: COLORS.white,
                  letterSpacing: '-0.02em',
                }}
              >
                {point.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Checkout phone mockup */}
      <div
        style={{
          opacity: phoneEnter,
          transform: `scale(${interpolate(phoneEnter, [0, 1], [0.8, 1])}) rotateY(${phoneRotY}deg)`,
          perspective: 1200,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 320,
            height: 500,
            borderRadius: 32,
            background: '#1a1a1a',
            padding: 10,
            boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 300,
              height: 480,
              borderRadius: 24,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Img
              src={staticFile('checkout.png')}
              style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

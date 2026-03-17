// SCENE 3: PACKAGE SHOWCASE — 12-22s (frames 360-660, local 0-300)
// Detailed package card for Male Hormonal Health Package with checklist reveal

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { NarrationCaption } from './NarrationCaption';

const CHECKLIST = [
  'Testosterone (Total & Free)',
  'Cortisol',
  'Thyroid Panel (TSH, T3, T4)',
  'DHEA-S',
  'SHBG',
  'Prolactin',
  'LH & FSH',
];

export const PackageShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Card entrance
  const cardSpring = spring({
    frame: frame - 5,
    fps: FPS,
    config: { damping: 16, stiffness: 90, mass: 1 },
  });

  // Price reveal
  const priceSpring = spring({
    frame: frame - 30,
    fps: FPS,
    config: { damping: 12, stiffness: 150, mass: 0.7 },
  });

  // Exit
  const exitOpacity = interpolate(frame, [270, 295], [1, 0], {
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
        padding: '120px 60px 0',
        position: 'relative',
        opacity: exitOpacity,
      }}
    >
      {/* Green glow behind card */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}15 0%, transparent 70%)`,
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: cardSpring * 0.6,
        }}
      />

      {/* Package Card */}
      <div
        style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [60, 0])}px)`,
          width: '100%',
          maxWidth: 920,
          backgroundColor: '#141914',
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid ${COLORS.green}30`,
          zIndex: 1,
        }}
      >
        {/* Green top border accent */}
        <div
          style={{
            height: 5,
            backgroundColor: COLORS.green,
            width: '100%',
          }}
        />

        <div style={{ padding: '48px 48px 40px' }}>
          {/* Package Name */}
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 48,
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Male Hormonal Health Package
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.dimmedMid,
              marginBottom: 24,
            }}
          >
            Comprehensive hormonal health screening
          </div>

          {/* Price */}
          <div
            style={{
              opacity: priceSpring,
              transform: `scale(${interpolate(priceSpring, [0, 1], [0.7, 1])})`,
              transformOrigin: 'left center',
              fontFamily: FONTS.mono,
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.green,
              lineHeight: 1,
              marginBottom: 40,
            }}
          >
            $249
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(255,255,255,0.08)',
              marginBottom: 32,
            }}
          />

          {/* Checklist */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {CHECKLIST.map((item, i) => {
              const itemDelay = 60 + i * 18;
              const itemSpring = spring({
                frame: frame - itemDelay,
                fps: FPS,
                config: { damping: 16, stiffness: 120, mass: 0.7 },
              });

              return (
                <div
                  key={item}
                  style={{
                    opacity: itemSpring,
                    transform: `translateX(${interpolate(itemSpring, [0, 1], [60, 0])}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: `${COLORS.green}20`,
                      border: `1px solid ${COLORS.green}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONTS.heading,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.green,
                      flexShrink: 0,
                    }}
                  >
                    {'\u2713'}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 32,
                      fontWeight: 500,
                      color: COLORS.white,
                    }}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <NarrationCaption
        text="The Male Hormonal Health Package — two forty-nine — covers everything. Testosterone, cortisol, thyroid, the lot. This is what your GP probably hasn't checked."
        frame={frame}
        startFrame={15}
      />
    </div>
  );
};

// SCENE 4: SOLUTION — 15-22s (frames 450-660, local 0-210)
// Audio marker: Confident beat drop at frame 0, subtle pulse underneath
// Show the product. Animated marker list cascade. Mock results PDF slide-in.

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { springReveal, springSlideLeft } from '../lib/animations';

const MARKERS = [
  'Testosterone',
  'Cortisol',
  'Thyroid (TSH, T3, T4)',
  'Iron Studies',
  'Vitamin D',
  'HbA1c',
  'Liver Function',
  'Cholesterol',
  'SHBG',
  'DHEA-S',
];

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Total: 210 frames (7 seconds)

  // Headline: "One blood test."
  const h1 = springReveal({ frame, delay: 5 });
  // "30+ markers."
  const h2 = springReveal({ frame, delay: 20 });
  // "The answers your GP"
  const h3 = springReveal({ frame, delay: 40 });
  // "may not have checked."
  const h4 = springReveal({ frame, delay: 52 });

  // Marker list starts cascading at frame 75
  const markerStart = 75;

  // PDF mock slides in from right at frame 140
  const pdfSlide = springSlideLeft({ frame, delay: 140 });

  // Exit
  const exitOpacity = interpolate(frame, [190, 210], [1, 0], {
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
        padding: '180px 70px 0',
        opacity: exitOpacity,
      }}
    >
      {/* Green glow top */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}12 0%, transparent 70%)`,
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Headlines */}
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          zIndex: 1,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            ...h1,
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 88,
            color: COLORS.green,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          One blood test.
        </div>
        <div
          style={{
            ...h2,
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 88,
            color: COLORS.white,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          30+ markers.
        </div>
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              ...h3,
              fontFamily: FONTS.heading,
              fontWeight: 500,
              fontSize: 48,
              color: COLORS.dimmedMid,
              lineHeight: 1.3,
            }}
          >
            The answers your GP
          </div>
          <div
            style={{
              ...h4,
              fontFamily: FONTS.heading,
              fontWeight: 500,
              fontSize: 48,
              color: COLORS.dimmedMid,
              lineHeight: 1.3,
            }}
          >
            may not have checked.
          </div>
        </div>
      </div>

      {/* Marker cascade list */}
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          zIndex: 1,
        }}
      >
        {MARKERS.map((marker, i) => {
          const delay = markerStart + i * 6;
          const s = spring({
            frame: frame - delay,
            fps: FPS,
            config: { damping: 15, stiffness: 140, mass: 0.7 },
          });

          return (
            <div
              key={marker}
              style={{
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
                fontFamily: FONTS.mono,
                fontWeight: 400,
                fontSize: 30,
                color: COLORS.green,
                backgroundColor: `${COLORS.green}15`,
                border: `1px solid ${COLORS.green}30`,
                borderRadius: 8,
                padding: '10px 20px',
                whiteSpace: 'nowrap',
              }}
            >
              {marker}
            </div>
          );
        })}
      </div>

      {/* Mock PDF Results Card */}
      <div
        style={{
          ...pdfSlide,
          position: 'absolute',
          bottom: 160,
          right: 60,
          width: 500,
          backgroundColor: '#141914',
          border: `1px solid ${COLORS.green}25`,
          borderRadius: 16,
          padding: '36px 32px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            color: COLORS.dimmed,
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Doctor-Reviewed Results
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.white,
            marginBottom: 24,
          }}
        >
          Blood Test Report
        </div>
        {['Testosterone: 14.2 nmol/L', 'Cortisol: 285 nmol/L', 'TSH: 2.1 mIU/L', 'Vitamin D: 62 nmol/L'].map(
          (line, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONTS.mono,
                fontSize: 22,
                color: i === 0 ? COLORS.green : COLORS.dimmedMid,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {line}
            </div>
          ),
        )}
        <div
          style={{
            marginTop: 20,
            width: '100%',
            height: 2,
            backgroundColor: COLORS.green,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: FONTS.mono,
            fontSize: 16,
            color: COLORS.dimmed,
          }}
        >
          expresspathology.com.au
        </div>
      </div>
    </div>
  );
};

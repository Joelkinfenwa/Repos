// SCENE 4: RESULTS PREVIEW — 22-30s (frames 660-900, local 0-240)
// Mock results report card with sample values and doctor-reviewed stamp

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { NarrationCaption } from './NarrationCaption';

interface ResultRow {
  name: string;
  value: string;
  unit: string;
  reference: string;
}

const RESULTS: ResultRow[] = [
  { name: 'Testosterone', value: '18.5', unit: 'nmol/L', reference: '8.0–27.0' },
  { name: 'Cortisol', value: '425', unit: 'nmol/L', reference: '150–600' },
  { name: 'TSH', value: '2.1', unit: 'mIU/L', reference: '0.5–4.0' },
];

export const ResultsPreviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Card entrance
  const cardSpring = spring({
    frame: frame - 10,
    fps: FPS,
    config: { damping: 16, stiffness: 90, mass: 1 },
  });

  // Doctor-reviewed stamp
  const stampSpring = spring({
    frame: frame - 160,
    fps: FPS,
    config: { damping: 10, stiffness: 180, mass: 0.6 },
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
        padding: '160px 60px 0',
        position: 'relative',
        opacity: exitOpacity,
      }}
    >
      {/* Green glow */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}12 0%, transparent 70%)`,
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: cardSpring * 0.5,
        }}
      />

      {/* Results Card */}
      <div
        style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [80, 0])}px)`,
          width: '100%',
          maxWidth: 920,
          backgroundColor: '#141914',
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid ${COLORS.green}25`,
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Green top accent */}
        <div
          style={{
            height: 4,
            backgroundColor: COLORS.green,
            width: '100%',
          }}
        />

        <div style={{ padding: '40px 44px' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: 44,
                fontWeight: 800,
                color: COLORS.white,
                lineHeight: 1.2,
              }}
            >
              Your Results
            </div>
            {/* Mini logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: COLORS.green,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.heading,
                  fontSize: 20,
                  fontWeight: 900,
                  color: COLORS.bg,
                }}
              >
                +
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.dimmedMid,
                }}
              >
                Express Pathology
              </div>
            </div>
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

          {/* Column headers */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 20,
              paddingRight: 120,
            }}
          >
            <div
              style={{
                flex: 2,
                fontFamily: FONTS.mono,
                fontSize: 18,
                color: COLORS.dimmed,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Marker
            </div>
            <div
              style={{
                flex: 1.5,
                fontFamily: FONTS.mono,
                fontSize: 18,
                color: COLORS.dimmed,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Result
            </div>
            <div
              style={{
                flex: 1.5,
                fontFamily: FONTS.mono,
                fontSize: 18,
                color: COLORS.dimmed,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Reference
            </div>
          </div>

          {/* Result rows */}
          {RESULTS.map((row, i) => {
            const rowDelay = 40 + i * 25;
            const rowSpring = spring({
              frame: frame - rowDelay,
              fps: FPS,
              config: { damping: 16, stiffness: 120, mass: 0.7 },
            });

            return (
              <div
                key={row.name}
                style={{
                  opacity: rowSpring,
                  transform: `translateX(${interpolate(rowSpring, [0, 1], [40, 0])}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    flex: 2,
                    fontFamily: FONTS.body,
                    fontSize: 30,
                    fontWeight: 600,
                    color: COLORS.white,
                  }}
                >
                  {row.name}
                </div>
                <div
                  style={{
                    flex: 1.5,
                    fontFamily: FONTS.mono,
                    fontSize: 28,
                    fontWeight: 400,
                    color: COLORS.white,
                  }}
                >
                  {row.value} {row.unit}
                </div>
                <div
                  style={{
                    flex: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 22,
                      color: COLORS.dimmedMid,
                    }}
                  >
                    {row.reference}
                  </div>
                  {/* Normal badge */}
                  <div
                    style={{
                      backgroundColor: `${COLORS.green}20`,
                      border: `1px solid ${COLORS.green}60`,
                      borderRadius: 6,
                      padding: '4px 12px',
                      fontFamily: FONTS.mono,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.green,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Normal
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctor-Reviewed Stamp */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            opacity: stampSpring,
            transform: `scale(${interpolate(stampSpring, [0, 1], [0.4, 1])}) rotate(${interpolate(stampSpring, [0, 1], [-15, -6])}deg)`,
            border: `3px solid ${COLORS.green}`,
            borderRadius: 12,
            padding: '14px 28px',
            fontFamily: FONTS.heading,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.green,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            backgroundColor: `${COLORS.green}10`,
          }}
        >
          Doctor-Reviewed
        </div>
      </div>

      <NarrationCaption
        text="You get a full report, reviewed by a real doctor. Clear results. No guessing."
        frame={frame}
        startFrame={15}
      />
    </div>
  );
};

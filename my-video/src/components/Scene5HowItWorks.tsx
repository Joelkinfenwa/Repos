// Scene 5 — HOW IT WORKS (18-23s | 150 frames)
// "Three steps. Full picture." + 3 vertical nodes with circuit data flow

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS } from '../lib/design';
import { slideDown, slideUp, strokeDraw, fadeIn, fadeOut } from '../lib/animations';

const STEPS = [
  { label: 'Order Online', sub: 'Takes 2 minutes', iconDelay: 30 },
  { label: 'Walk In & Test', sub: '2,000+ centres', iconDelay: 40 },
  { label: 'Get Your Data', sub: 'Within 48 hours', iconDelay: 50 },
];

// SVG Icons
const CartPath = 'M6 6h4l3 18h18l3-12H13';
const PinPath = 'M20 4C13 4 8 9 8 16c0 10 12 22 12 22s12-12 12-22c0-7-5-12-12-12z';
const ChartPath = 'M4 34 L12 24 L20 28 L28 14 L38 8';

export const Scene5HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();

  // Headline
  const headline = slideDown(frame, 12);

  // Connecting line draws downward
  const lineProgress = interpolate(frame, [25, 55], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Travelling data dots along the line
  const dotPhase = (frame * 3) % 100;

  // Exit
  const exitFade = fadeOut(frame, 135, 15);

  const nodeY = [620, 890, 1160]; // Y positions of the 3 nodes
  const nodeX = 540; // centre

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        opacity: exitFade,
      }}
    >
      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: SAFE.top + 60,
          left: SAFE.left,
          right: SAFE.right,
          textAlign: 'center',
          zIndex: 3,
          ...headline,
        }}
      >
        <span style={{ fontFamily: FONTS.sans, fontWeight: 700, fontSize: 52, color: COLORS.white }}>
          Three steps.{' '}
          <span style={{ color: COLORS.cyan }}>Full picture.</span>
        </span>
      </div>

      {/* Connecting line + data dots */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        width="1080" height="1920"
      >
        {/* Vertical line */}
        <line
          x1={nodeX} y1={nodeY[0] + 40}
          x2={nodeX} y2={nodeY[0] + 40 + (nodeY[2] - nodeY[0]) * lineProgress / 100}
          stroke={COLORS.cyan}
          strokeWidth="2"
          opacity={0.3}
        />

        {/* Travelling dots */}
        {frame >= 30 && [0, 33, 66].map((offset) => {
          const pos = (dotPhase + offset) % 100;
          const dy = nodeY[0] + 40 + (nodeY[2] - nodeY[0]) * pos / 100;
          return (
            <circle
              key={offset}
              cx={nodeX}
              cy={dy}
              r={3}
              fill={COLORS.cyan}
              opacity={0.5}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {STEPS.map((step, i) => {
        const nodeDelay = step.iconDelay;
        const anim = slideUp(frame, nodeDelay, 60);

        // Ring pulse when node activates
        const pulseT = frame - nodeDelay;
        const ringScale = pulseT > 0 && pulseT < 15
          ? 1 + interpolate(pulseT, [0, 15], [0, 0.6], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : 0;
        const ringOpacity = pulseT > 0 && pulseT < 15
          ? interpolate(pulseT, [0, 15], [0.5, 0])
          : 0;

        // Node border brightness
        const borderAlpha = fadeIn(frame, nodeDelay, 10);

        // Icon draw
        const draw = strokeDraw(frame, nodeDelay + 3, 12, 200);

        return (
          <div
            key={step.label}
            style={{
              position: 'absolute',
              top: nodeY[i] - 40,
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              zIndex: 3,
              ...anim,
            }}
          >
            {/* Node circle with icon */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {/* Ring pulse */}
              {ringOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    border: `2px solid ${COLORS.cyan}`,
                    opacity: ringOpacity,
                    transform: `scale(${ringScale})`,
                  }}
                />
              )}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34,211,238,0.06)',
                  border: `2px solid rgba(34,211,238,${0.2 + borderAlpha * 0.8})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d={i === 0 ? CartPath : i === 1 ? PinPath : ChartPath}
                    stroke={COLORS.cyan}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeDasharray={draw.strokeDasharray}
                    strokeDashoffset={draw.strokeDashoffset}
                  />
                  {i === 1 && (
                    <circle cx="20" cy="16" r="4" stroke={COLORS.cyan} strokeWidth="2" fill="none"
                      strokeDasharray={draw.strokeDasharray} strokeDashoffset={draw.strokeDashoffset} />
                  )}
                </svg>
              </div>
            </div>

            {/* Text */}
            <div>
              <div style={{ fontFamily: FONTS.sans, fontWeight: 700, fontSize: 36, color: COLORS.white }}>
                {step.label}
              </div>
              <div style={{ fontFamily: FONTS.sans, fontWeight: 400, fontSize: 28, color: COLORS.white50, marginTop: 4 }}>
                {step.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

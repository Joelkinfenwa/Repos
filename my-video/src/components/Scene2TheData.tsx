// Scene 2: THE DATA — cascading numbers, counter to 40+, editorial layout
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { fadeIn, slideUp, countUp, fadeOut } from '../lib/animations';

const NUMBERS = [
  '7.2', '142', '4.8', '98', '3.1', '156', '0.8', '12.4',
  '5.6', '88', '2.3', '167', '9.1', '45', '6.7', '113',
  '1.4', '72', '8.9', '34', '11.2', '67', '3.8', '129',
];

export const Scene2TheData: React.FC = () => {
  const frame = useCurrentFrame();

  // Cascading numbers fade in and drift up
  const numbersFade = fadeIn(frame, 10, 20);
  const numbersOut = fadeOut(frame, 100, 20);
  const numbersOpacity = Math.min(numbersFade, frame < 100 ? 1 : numbersOut);

  // Counter
  const count = countUp(frame, 60, 40, 50);
  const counterAnim = slideUp(frame, 55);

  // "biomarkers" text
  const bioAnim = slideUp(frame, 75);

  // Bottom tagline
  const tagAnim = slideUp(frame, 100);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Cascading numbers background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          gap: 30,
          padding: 80,
          opacity: numbersOpacity * 0.25,
        }}
      >
        {NUMBERS.map((n, i) => {
          const delay = i * 3;
          const y = Math.max(0, (frame - delay) * 0.3);
          return (
            <span
              key={i}
              style={{
                fontFamily: FONTS.serif,
                fontSize: 48,
                color: COLORS.gold,
                opacity: fadeIn(frame, delay, 15),
                transform: `translateY(-${y}px)`,
                fontWeight: 300,
              }}
            >
              {n}
            </span>
          );
        })}
      </div>

      {/* Main counter */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          width: WIDTH,
          textAlign: 'center',
          ...counterAnim,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.serif,
            fontSize: 220,
            fontWeight: 400,
            color: COLORS.cream,
          }}
        >
          {count}
        </span>
        <span
          style={{
            fontFamily: FONTS.serif,
            fontSize: 120,
            fontWeight: 300,
            color: COLORS.gold,
            marginLeft: 8,
            opacity: fadeIn(frame, 95, 15),
          }}
        >
          +
        </span>
      </div>

      {/* "biomarkers analyzed" */}
      <div
        style={{
          position: 'absolute',
          top: '56%',
          width: WIDTH,
          textAlign: 'center',
          ...bioAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 36,
            fontWeight: 300,
            color: COLORS.cream70,
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          biomarkers analyzed
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          top: '68%',
          width: WIDTH,
          textAlign: 'center',
          ...tagAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 34,
            fontWeight: 400,
            fontStyle: 'italic',
            color: COLORS.cream30,
          }}
        >
          One test. The full picture.
        </div>
      </div>
    </div>
  );
};

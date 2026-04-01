// Scene 3: CATEGORIES — elegant grid of what's tested
// Two columns, gold divider, staggered reveal
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { slideUp, fadeIn, lineDraw } from '../lib/animations';

const LEFT = ['Hormones', 'Heart Health', 'Thyroid', 'Iron Studies', 'Vitamins'];
const RIGHT = ['Inflammation', 'Liver Function', 'Cholesterol', 'Kidney', 'Diabetes'];

export const Scene3Categories: React.FC = () => {
  const frame = useCurrentFrame();

  // Headline
  const headAnim = slideUp(frame, 8);

  // Gold center divider draws down
  const dividerHeight = lineDraw(frame, 25, 35);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          width: WIDTH,
          textAlign: 'center',
          ...headAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 52,
            fontWeight: 400,
            color: COLORS.cream,
          }}
        >
          What We Measure
        </div>
        <div
          style={{
            width: 60,
            height: 1.5,
            backgroundColor: COLORS.gold,
            margin: '24px auto 0',
            opacity: fadeIn(frame, 20, 15),
          }}
        />
      </div>

      {/* Two-column grid */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1, textAlign: 'right', paddingRight: 50 }}>
          {LEFT.map((item, i) => {
            const anim = slideUp(frame, 35 + i * 10);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 34,
                  fontWeight: 300,
                  color: COLORS.cream70,
                  marginBottom: 48,
                  ...anim,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 1.5,
            height: `${dividerHeight * 5.5}px`,
            backgroundColor: COLORS.gold,
            opacity: 0.6,
          }}
        />

        {/* Right column */}
        <div style={{ flex: 1, textAlign: 'left', paddingLeft: 50 }}>
          {RIGHT.map((item, i) => {
            const anim = slideUp(frame, 40 + i * 10);
            return (
              <div
                key={i}
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 34,
                  fontWeight: 300,
                  color: COLORS.cream70,
                  marginBottom: 48,
                  ...anim,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          width: WIDTH,
          textAlign: 'center',
          opacity: fadeIn(frame, 120, 20),
        }}
      >
        <span
          style={{
            fontFamily: FONTS.serif,
            fontSize: 28,
            fontStyle: 'italic',
            color: COLORS.gold,
          }}
        >
          and more...
        </span>
      </div>
    </div>
  );
};

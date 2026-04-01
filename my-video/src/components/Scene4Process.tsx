// Scene 4: THE PROCESS — 3 elegant steps with connecting gold line
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { slideUp, fadeIn, lineDraw } from '../lib/animations';

const STEPS = [
  { number: '01', title: 'Order Online', desc: 'Choose your screen' },
  { number: '02', title: 'Visit a Lab', desc: '2,000+ locations Australia-wide' },
  { number: '03', title: 'Get Results', desc: 'Within 48 hours' },
];

export const Scene4Process: React.FC = () => {
  const frame = useCurrentFrame();

  const headAnim = slideUp(frame, 8);
  const connectLine = lineDraw(frame, 30, 60);

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
          Three Simple Steps
        </div>
      </div>

      {/* Steps */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          left: 100,
          right: 100,
        }}
      >
        {/* Vertical connecting line */}
        <div
          style={{
            position: 'absolute',
            left: 30,
            top: 50,
            width: 1.5,
            height: `${connectLine * 7.5}px`,
            backgroundColor: COLORS.gold,
            opacity: 0.4,
          }}
        />

        {STEPS.map((step, i) => {
          const anim = slideUp(frame, 30 + i * 20);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: 120,
                ...anim,
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: `1.5px solid ${COLORS.gold}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.sans,
                  fontSize: 22,
                  fontWeight: 300,
                  color: COLORS.gold,
                  flexShrink: 0,
                }}
              >
                {step.number}
              </div>

              {/* Text */}
              <div style={{ marginLeft: 40 }}>
                <div
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: 40,
                    fontWeight: 400,
                    color: COLORS.cream,
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 28,
                    fontWeight: 300,
                    color: COLORS.cream50,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No GP required note */}
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          width: WIDTH,
          textAlign: 'center',
          opacity: fadeIn(frame, 100, 20),
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 26,
            fontWeight: 300,
            color: COLORS.gold,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          No GP referral required
        </div>
      </div>
    </div>
  );
};

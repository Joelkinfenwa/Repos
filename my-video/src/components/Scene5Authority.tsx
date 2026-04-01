// Scene 5: AUTHORITY — "Australia's Most Comprehensive" + gold stars
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { slideUp, fadeIn } from '../lib/animations';

export const Scene5Authority: React.FC = () => {
  const frame = useCurrentFrame();

  const line1Anim = slideUp(frame, 10);
  const line2Anim = slideUp(frame, 25);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* White flash transition */}
      {frame < 3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.white,
            opacity: 1 - frame / 3,
          }}
        />
      )}

      {/* Stars */}
      <div
        style={{
          position: 'absolute',
          top: 500,
          width: WIDTH,
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg
              key={i}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              style={{
                opacity: fadeIn(frame, 15 + i * 5, 10),
                transform: `scale(${fadeIn(frame, 15 + i * 5, 10)})`,
              }}
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={COLORS.goldBright}
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Main text */}
      <div
        style={{
          position: 'absolute',
          top: 600,
          width: WIDTH,
          textAlign: 'center',
          padding: '0 80px',
          ...line1Anim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 56,
            fontWeight: 400,
            color: COLORS.cream,
            lineHeight: 1.3,
          }}
        >
          Australia's Most
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 685,
          width: WIDTH,
          textAlign: 'center',
          padding: '0 80px',
          ...line2Anim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 56,
            fontWeight: 400,
            color: COLORS.cream,
            lineHeight: 1.3,
          }}
        >
          Comprehensive
        </div>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 56,
            fontWeight: 400,
            color: COLORS.gold,
            lineHeight: 1.3,
            marginTop: 8,
          }}
        >
          Performance Blood Screen
        </div>
      </div>

      {/* Gold underline */}
      <div
        style={{
          position: 'absolute',
          top: 900,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${fadeIn(frame, 60, 25) * 200}px`,
          height: 1.5,
          backgroundColor: COLORS.gold,
        }}
      />

      {/* Trusted by */}
      <div
        style={{
          position: 'absolute',
          top: 950,
          width: WIDTH,
          textAlign: 'center',
          opacity: fadeIn(frame, 75, 20),
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 26,
            fontWeight: 300,
            color: COLORS.cream30,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Trusted by thousands of Australians
        </div>
      </div>
    </div>
  );
};

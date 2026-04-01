// Scene 6 — SOCIAL PROOF (23-26s | 90 frames)
// "Australia's Most Comprehensive" + 5 gold stars with SVG draw

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS } from '../lib/design';
import { scaleIn, fadeIn, fadeOut, strokeDraw } from '../lib/animations';

const STAR_PATH = 'M12 2l3 6.2L22 9.4l-5 4.9 1.2 6.9L12 17.8l-6.2 3.4L7 14.3 2 9.4l7-1.2L12 2z';

export const Scene6SocialProof: React.FC = () => {
  const frame = useCurrentFrame();

  // White flash (f0-f2)
  const flashOpacity = frame < 3
    ? interpolate(frame, [0, 1, 2], [0, 0.7, 0])
    : 0;

  // "Australia's Most Comprehensive"
  const h1 = scaleIn(frame, 3, 0.95);

  // "Performance Blood Screen"
  const h2Opacity = fadeIn(frame, 15, 10);

  // Stars (stagger 3 frames, start f25)
  // Exit
  const exitFade = fadeOut(frame, 75, 15);

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
      {/* White flash */}
      {frame < 3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.white,
            opacity: flashOpacity,
            zIndex: 10,
          }}
        />
      )}

      {/* Headlines */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: SAFE.left,
          right: SAFE.right,
          textAlign: 'center',
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 52,
            color: COLORS.white,
            lineHeight: 1.2,
            marginBottom: 12,
            ...h1,
          }}
        >
          Australia&apos;s Most
          <br />
          Comprehensive
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 300,
            fontSize: 42,
            color: COLORS.cyan,
            opacity: h2Opacity,
          }}
        >
          Performance Blood Screen
        </div>
      </div>

      {/* 5 Stars */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          zIndex: 3,
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const starDelay = 25 + i * 3;
          const draw = strokeDraw(frame, starDelay, 12, 100);
          const fillOpacity = fadeIn(frame, starDelay + 8, 6);

          return (
            <svg key={i} width="52" height="52" viewBox="0 0 24 24">
              {/* Filled star behind */}
              <path
                d={STAR_PATH}
                fill={COLORS.gold}
                opacity={fillOpacity}
              />
              {/* Stroke draw on top */}
              <path
                d={STAR_PATH}
                fill="none"
                stroke={COLORS.gold}
                strokeWidth="1.5"
                strokeDasharray={draw.strokeDasharray}
                strokeDashoffset={draw.strokeDashoffset}
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

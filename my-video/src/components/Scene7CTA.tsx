// Scene 7 — CTA / CLOSE (26-35s | 270 frames)
// $319 from 5x → 1x with purple glow, orange CTA button, breathing close

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS } from '../lib/design';
import { priceSlam, slideUp, fadeIn, pulseGlow, ambientFloat } from '../lib/animations';

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in from black (f0-f10)
  const sceneFade = fadeIn(frame, 0, 10);

  // "$319" price slam (f10)
  const price = priceSlam(frame, 10);

  // Purple glow behind price
  const purpleGlowAlpha = pulseGlow(frame, 0.15, 0.35, 0.07);

  // "Ultimate Performance Screen" (f40)
  const productName = slideUp(frame, 40, 40);

  // CTA button (f90)
  const ctaAnim = slideUp(frame, 90, 60);
  const ctaGlowAlpha = pulseGlow(frame, 0.3, 0.8, 0.05);
  const ctaFloat = ambientFloat(frame, 4, 0.06);

  // URL (f115)
  const urlOpacity = fadeIn(frame, 115, 12);

  // Footnote (f130)
  const footnoteOpacity = fadeIn(frame, 130, 12);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneFade,
      }}
    >
      {/* Purple glow behind price */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, rgba(168,85,247,${purpleGlowAlpha}) 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content stack */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${SAFE.left}px`,
          zIndex: 3,
        }}
      >
        {/* Price */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 900,
            fontSize: 140,
            color: COLORS.white,
            textShadow: `0 0 40px rgba(168,85,247,0.3)`,
            marginBottom: 12,
            ...price,
          }}
        >
          $319
        </div>

        {/* Product name */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 300,
            fontSize: 36,
            color: COLORS.white60,
            letterSpacing: 8,
            textTransform: 'uppercase',
            marginBottom: 60,
            ...productName,
          }}
        >
          Ultimate Performance Screen
        </div>

        {/* CTA Button */}
        {frame >= 90 && (
          <div
            style={{
              ...ctaAnim,
            }}
          >
          <div
            style={{
              transform: `translateY(${ctaFloat}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontWeight: 700,
                fontSize: 38,
                color: COLORS.white,
                backgroundColor: COLORS.orange,
                padding: '22px 64px',
                borderRadius: 60,
                textAlign: 'center',
                boxShadow: `0 0 ${20 + ctaGlowAlpha * 30}px rgba(249,115,22,${ctaGlowAlpha})`,
              }}
            >
              GET YOUR DATA →
            </div>
          </div>
          </div>
        )}

        {/* URL */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 500,
            fontSize: 28,
            color: COLORS.cyan,
            marginTop: 40,
            opacity: urlOpacity,
          }}
        >
          expresspathology.com.au
        </div>

        {/* Footnote */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 400,
            fontSize: 26,
            color: COLORS.white40,
            marginTop: 20,
            opacity: footnoteOpacity,
          }}
        >
          No GP required · No referral needed
        </div>
      </div>
    </div>
  );
};

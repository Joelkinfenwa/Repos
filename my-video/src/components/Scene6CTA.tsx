// Scene 6 — CTA (22-28s | 180 frames)
// Matches the product card from landing page:
// #1 Best seller badge, $319 (was $389, Save $70)
// Green "Confirm & Pay" button

import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  springSlam,
  springSlideUp,
  springBounce,
  staggerFadeUp,
  pulseGlow,
  breathe,
  sceneTransition,
} from '../lib/animations';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 180;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Badge
  const badge = springSlideUp({ frame, delay: 5 });

  // Product name
  const productName = springSlideUp({ frame, delay: 15 });

  // Price slam
  const price = springSlam({ frame, delay: 30 });

  // Old price + save badge
  const savings = staggerFadeUp({ frame, delay: 45, index: 0, staggerAmount: 0 });

  // URL
  const url = staggerFadeUp({ frame, delay: 55, index: 0, staggerAmount: 0 });

  // CTA button
  const cta = springBounce({ frame, delay: 65 });

  // CTA pulsing glow
  const ctaGlow = pulseGlow({ frame, delay: 70 });

  // Background breathe
  const bgBreathe = breathe({ frame });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Green glow behind content */}
      <div
        style={{
          position: 'absolute',
          width: '140%',
          height: '80%',
          top: '10%',
          left: '-20%',
          background: GRADIENTS.heroGlow,
          ...bgBreathe,
          pointerEvents: 'none',
        }}
      />

      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: SAFE.left,
          paddingRight: SAFE.right,
        }}
      >
        {/* #1 Best seller badge */}
        <div
          style={{
            backgroundColor: COLORS.green,
            borderRadius: 20,
            padding: '8px 24px',
            marginBottom: 24,
            ...badge,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 24,
              color: COLORS.white,
            }}
          >
            ★ #1 Best seller
          </span>
        </div>

        {/* Product name */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 56,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 30,
            ...productName,
          }}
        >
          Ultimate
          <br />
          Performance Screen
        </div>

        {/* Price */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 120,
            color: COLORS.green,
            textShadow: SHADOWS.greenGlowStrong,
            lineHeight: 1,
            marginBottom: 8,
            ...price,
          }}
        >
          $319
        </div>

        {/* Was $389 / Save $70 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 30,
            ...savings,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 600,
              fontSize: 40,
              color: COLORS.strikethrough,
              textDecoration: 'line-through',
            }}
          >
            $389
          </span>
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 28,
              color: COLORS.white,
              backgroundColor: '#EF4444',
              borderRadius: 8,
              padding: '4px 14px',
            }}
          >
            Save $70
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 30,
            color: COLORS.green,
            marginBottom: 50,
            ...url,
          }}
        >
          expresspathology.com.au
        </div>

        {/* CTA Button — green to match site */}
        <div style={{ ...cta }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 40,
              color: COLORS.white,
              background: GRADIENTS.greenShine,
              padding: '24px 64px',
              borderRadius: 60,
              textAlign: 'center',
              boxShadow: `0 0 ${20 + (ctaGlow.opacity as number) * 40}px rgba(16,185,129,${0.3 + (ctaGlow.opacity as number) * 0.4})`,
              transform: ctaGlow.transform,
            }}
          >
            Confirm & Pay — $319 →
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (i * 97 + 31) % 100;
        const startY = 100 + ((i * 47) % 60);
        const drift = Math.sin(frame * 0.03 + i) * 20;
        const floatY = startY - ((frame * 0.5 + i * 3) % 120);
        const particleOpacity = 0.12 + Math.sin(frame * 0.08 + i * 2) * 0.08;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${floatY}%`,
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              borderRadius: '50%',
              backgroundColor: COLORS.green,
              opacity: particleOpacity,
              transform: `translateX(${drift}px)`,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
};

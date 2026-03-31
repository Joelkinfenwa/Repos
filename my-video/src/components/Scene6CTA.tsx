// Scene 6 — CTA (22-28s | 180 frames)
// "Ultimate Performance Screen — $249"
// Product name, price slam, URL, orange CTA button pulses

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

  // Product name
  const productName = springSlideUp({ frame, delay: 5 });

  // Price slam
  const price = springSlam({ frame, delay: 25 });

  // URL reveal
  const url = staggerFadeUp({ frame, delay: 50, index: 0, staggerAmount: 0 });

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
      {/* Purple/cyan glow behind content */}
      <div
        style={{
          position: 'absolute',
          width: '140%',
          height: '80%',
          top: '10%',
          left: '-20%',
          background: GRADIENTS.purpleCyan,
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
        {/* Product name */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 56,
            color: COLORS.white,
            textAlign: 'center',
            lineHeight: 1.2,
            textShadow: `0 0 40px rgba(168,85,247,0.5)`,
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
            color: COLORS.orange,
            textShadow: SHADOWS.orangeGlow,
            lineHeight: 1,
            marginBottom: 20,
            ...price,
          }}
        >
          $249
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 32,
            color: COLORS.cyan,
            marginBottom: 50,
            ...url,
          }}
        >
          expresspathology.com.au
        </div>

        {/* CTA Button */}
        <div
          style={{
            ...cta,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 40,
              color: COLORS.white,
              backgroundColor: COLORS.orange,
              padding: '24px 64px',
              borderRadius: 60,
              textAlign: 'center',
              boxShadow: `0 0 ${20 + (ctaGlow.opacity as number) * 40}px rgba(249,115,22,${0.3 + (ctaGlow.opacity as number) * 0.4})`,
              transform: ctaGlow.transform,
            }}
          >
            Order Your Test Today
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (i * 97 + 31) % 100;
        const startY = 100 + (i * 47) % 60;
        const drift = Math.sin(frame * 0.03 + i) * 20;
        const floatY = startY - (frame * 0.5 + i * 3) % 120;
        const particleOpacity = 0.15 + Math.sin(frame * 0.08 + i * 2) * 0.1;

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
              backgroundColor: i % 2 === 0 ? COLORS.cyan : COLORS.purple,
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

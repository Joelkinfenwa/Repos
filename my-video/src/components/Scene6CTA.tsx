// Scene 6 — CTA (22-28s | 180 frames)
// #1 Best seller badge, $319 (was $389, Save $70)
// Camera shake on price slam, glow explosion, pulsing green CTA button
// Particles, scanlines, cinematic depth

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, SAFE, FONTS, SHADOWS, GRADIENTS } from '../lib/design';
import {
  springSlamHard,
  springSlideUp,
  springBounce,
  staggerFadeUp,
  pulseGlow,
  breathe,
  cameraShake,
  particleFloat,
  sceneTransition,
} from '../lib/animations';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 30 + ((i * 89) % 1020),
  y: 50 + ((i * 137) % 1820),
  size: 2 + (i % 4),
  opacity: 0.05 + (i % 5) * 0.025,
}));

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 180;
  const { opacity } = sceneTransition(frame, totalFrames);

  // Badge
  const badge = springSlideUp({ frame, delay: 5 });

  // Product name
  const productName = springSlideUp({ frame, delay: 15 });

  // Price slam — hard slam with camera shake
  const price = springSlamHard({ frame, delay: 30 });
  const priceShake = cameraShake(frame, 33, 15, 14);

  // Price glow explosion
  const priceImpactT = frame - 30;
  const priceGlow =
    priceImpactT > 0
      ? interpolate(priceImpactT, [0, 8, 40], [0, 1, 0.5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  // Old price + save badge
  const savings = staggerFadeUp({ frame, delay: 48, index: 0, staggerAmount: 0 });

  // URL
  const url = staggerFadeUp({ frame, delay: 58, index: 0, staggerAmount: 0 });

  // CTA button
  const cta = springBounce({ frame, delay: 68 });

  // CTA pulsing glow
  const ctaGlow = pulseGlow({ frame, delay: 73 });

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
        transform: `translate(${priceShake.x}px, ${priceShake.y}px)`,
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

      {/* Floating particles */}
      {PARTICLES.map((p) => {
        const pAnim = particleFloat({ frame, index: p.id });
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.green,
              opacity: p.opacity,
              transform: pAnim.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
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

        {/* Price with glow explosion */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400%',
              height: '400%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse at center, rgba(16,185,129,${priceGlow * 0.7}) 0%, rgba(16,185,129,${priceGlow * 0.3}) 35%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 130,
              color: COLORS.green,
              textShadow: `${SHADOWS.greenGlowStrong}, 0 0 ${40 + priceGlow * 80}px rgba(16,185,129,${0.3 + priceGlow * 0.5})`,
              lineHeight: 1,
              position: 'relative',
              zIndex: 1,
              ...price,
            }}
          >
            $319
          </div>
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

        {/* CTA Button */}
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
    </div>
  );
};

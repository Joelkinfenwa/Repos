// SCENE 7: CTA — 27-30s (frames 0-90 local)
// Ultimate closer. Price reveal, value props, brand + CTA button.
// Premium energy builds throughout. Every frame sells.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  COLORS,
  FONTS,
  GRADIENTS,
  SHADOWS,
} from '../lib/design';
import {
  springBounce,
  splitReveal,
  shake,
  particleFloat,
  typewriter,
  flickerIn,
  elasticSlideUp,
  borderGlow,
  fadeIn,
} from '../lib/animations';

// ---------------------------------------------------------------------------
// Particles config
// ---------------------------------------------------------------------------

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

const PARTICLES: Particle[] = Array.from({ length: 24 }, (_, i) => ({
  x: Math.sin(i * 2.39) * 480 + 540,
  y: Math.cos(i * 1.83) * 880 + 960,
  size: 2 + (i % 5) * 1.5,
  color: i % 3 === 0 ? COLORS.green : COLORS.white,
  opacity: 0.15 + (i % 4) * 0.1,
  speed: 0.6 + (i % 3) * 0.3,
}));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // -- Scene entrance: vertical split reveal --
  const reveal = splitReveal({ frame, delay: 0, direction: 'vertical' });

  // -- Background glow: massive green orb with breathing scale --
  const glowBaseScale = interpolate(frame, [0, 15], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowPulse = Math.sin(frame * 0.08) * 0.5 + 0.5;
  const glowScale = glowBaseScale * (1 + glowPulse * 0.08);

  // -- PRICE REVEAL (frames 0-30) --
  const priceAnim = springBounce({ frame, delay: 3 });
  // Shake on landing (frames 10-15)
  const priceShake =
    frame >= 10 && frame <= 15
      ? shake({ frame, delay: 10, intensity: 10 })
      : { transform: 'translate(0px, 0px)' };
  // Green glow explosion behind price
  const explosionScale = interpolate(frame, [10, 25], [0, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const explosionOpacity = interpolate(frame, [10, 25], [0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // AUD label
  const audOpacity = fadeIn(frame, 14, 8);

  // -- VALUE PROPS (frames 15-45) --
  const valueProp1 = typewriter({ frame, delay: 15, duration: 12 });
  const valueProp2 = typewriter({ frame, delay: 22, duration: 12 });
  const valueProp3 = typewriter({ frame, delay: 29, duration: 12 });

  // -- BRAND + CTA (frames 35-90) --
  const brandFlicker = flickerIn({ frame, delay: 35 });
  const urlOpacity = fadeIn(frame, 42, 10);
  const ctaEntry = elasticSlideUp({ frame, delay: 48 });
  const ctaGlow = borderGlow({ frame, delay: 50 });
  // CTA button breathe
  const ctaBreathe = 1.0 + (Math.sin(frame * 0.12) * 0.5 + 0.5) * 0.03;
  // Sweeping light across button
  const sweepX = interpolate(
    frame % 45, // repeats every 1.5s
    [0, 45],
    [-150, 150],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // -- Pill label --
  const pillOpacity = fadeIn(frame, 38, 10);

  // -- Particle fade-in --
  const particleGlobalOpacity = fadeIn(frame, 0, 15);

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
        ...reveal,
      }}
    >
      {/* ── MASSIVE GREEN RADIAL GLOW ORB ── */}
      <div
        style={{
          position: 'absolute',
          width: 1400,
          height: 1400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(76,175,76,0.35) 0%, rgba(76,175,76,0.12) 40%, transparent 70%)',
          top: '42%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          pointerEvents: 'none',
        }}
      />

      {/* ── FLOATING PARTICLES ── */}
      {PARTICLES.map((p, i) => {
        const float = particleFloat({ frame, index: i });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: p.opacity * particleGlobalOpacity,
              ...float,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* ── DARK VIGNETTE ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
        }}
      />

      {/* ── TOP-RIGHT PILL: "Male Hormonal Package" ── */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 48,
          opacity: pillOpacity,
          fontFamily: FONTS.mono,
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.green,
          backgroundColor: COLORS.greenMuted,
          border: `1px solid ${COLORS.green}40`,
          borderRadius: 100,
          padding: '10px 28px',
          letterSpacing: '0.02em',
          zIndex: 10,
        }}
      >
        Male Hormonal Package
      </div>

      {/* ── PRICE SECTION ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        {/* Green glow explosion behind price */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(76,175,76,0.5) 0%, transparent 60%)',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${explosionScale})`,
            opacity: explosionOpacity,
            pointerEvents: 'none',
          }}
        />

        {/* Price number */}
        <div
          style={{
            ...priceAnim,
            fontFamily: FONTS.heading,
            fontWeight: 900,
            fontSize: 172,
            color: COLORS.white,
            letterSpacing: '-0.04em',
            textShadow: SHADOWS.greenGlowStrong,
            ...(frame >= 10 && frame <= 15 ? priceShake : {}),
          }}
        >
          $249
        </div>

        {/* AUD label */}
        <div
          style={{
            opacity: audOpacity,
            fontFamily: FONTS.mono,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.textSecondary,
            marginLeft: 12,
            letterSpacing: '0.06em',
            alignSelf: 'flex-start',
            marginTop: 30,
          }}
        >
          AUD
        </div>
      </div>

      {/* ── VALUE PROPS ── */}
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textSecondary,
            ...valueProp1,
          }}
        >
          No referral needed.
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textSecondary,
            ...valueProp2,
          }}
        >
          Results in 48 hours.
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.accent,
            ...valueProp3,
          }}
        >
          30+ biomarkers tested.
        </div>
      </div>

      {/* ── BRAND NAME (flicker-in like neon sign) ── */}
      <div
        style={{
          zIndex: 2,
          fontFamily: FONTS.mono,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.white,
          letterSpacing: '0.04em',
          marginBottom: 8,
          textShadow: brandFlicker.opacity === 1 ? SHADOWS.greenGlow : 'none',
          ...brandFlicker,
        }}
      >
        Express Pathology
      </div>

      {/* ── URL ── */}
      <div
        style={{
          zIndex: 2,
          fontFamily: FONTS.mono,
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.textTertiary,
          letterSpacing: '0.03em',
          marginBottom: 48,
          opacity: urlOpacity,
        }}
      >
        expresspathology.com.au
      </div>

      {/* ── CTA BUTTON ── */}
      <div
        style={{
          ...ctaEntry,
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Glow behind button */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 950,
            height: 140,
            borderRadius: 60,
            background: COLORS.green,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            opacity: frame > 50 ? 0.25 + Math.sin(frame * 0.2) * 0.15 : 0,
            pointerEvents: 'none',
          }}
        />

        {/* Button */}
        <div
          style={{
            width: 900,
            height: 80,
            borderRadius: 50,
            background: GRADIENTS.greenShine,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            transform: `scale(${ctaBreathe})`,
            ...ctaGlow,
          }}
        >
          {/* Sweeping light effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              transform: `translateX(${sweepX}%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Button text */}
          <span
            style={{
              fontFamily: FONTS.heading,
              fontWeight: 800,
              fontSize: 32,
              color: COLORS.white,
              letterSpacing: '-0.01em',
              position: 'relative',
              zIndex: 1,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            Check Your Levels &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

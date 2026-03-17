// SCENE 6: SOCIAL PROOF + TRUST — 23-27s (frames 0-120 local)
// Shield/checkmark hero, staggered trust points with green accents,
// checkout phone mockup with premium bezel styling (matching Scene 4)

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, GRADIENTS, SHADOWS } from '../lib/design';
import {
  sceneTransition,
  radialWipe,
  morphScale,
  elasticSlideUp,
  staggerFadeUp,
  flickerIn,
  borderGlow,
  typewriter,
  particleFloat,
} from '../lib/animations';
import { MockCheckoutPage } from './MockCheckoutPage';

// ---------------------------------------------------------------------------
// Trust data
// ---------------------------------------------------------------------------

const TRUST_POINTS = [
  'Doctor-reviewed results',
  'NATA-accredited laboratories',
  'Same labs your GP uses',
] as const;

// ---------------------------------------------------------------------------
// Phone mockup dimensions (matching Scene 4 premium bezel)
// ---------------------------------------------------------------------------

const PW = 380;
const PH = 640;
const BEZEL = 12;
const RADIUS = 40;

// ---------------------------------------------------------------------------
// Floating particles config
// ---------------------------------------------------------------------------

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100, // golden angle scatter
  y: (i * 61.8) % 100,
  size: 2 + (i % 4) * 1.5,
  opacity: 0.08 + (i % 5) * 0.04,
}));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Scene6SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 120;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  // Scene-level radial wipe entrance
  const wipe = radialWipe({ frame, delay: 0 });

  // Shield/checkmark icon — morphScale with overshoot
  const shield = morphScale({ frame, delay: 3 });

  // Title
  const title = elasticSlideUp({ frame, delay: 8 });

  // Phone entrance from bottom
  const phone = elasticSlideUp({ frame, delay: 55 });
  const phoneGlow = borderGlow({ frame, delay: 58 });

  // Phone tilt oscillation (~3deg rotateY)
  const phoneTiltY =
    frame >= 55 ? Math.sin((frame - 55) * 0.08) * 3 : 0;

  // Animated gradient border position (matching Scene 4)
  const bgPos = interpolate(frame, [55, 120], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typewriter label above phone
  const labelTw = typewriter({ frame, delay: 58, duration: 20 });

  // Green pulse wave across trust points after all 3 visible (frame ~45)
  const pulseWaveActive = frame >= 45;
  const pulseWaveT = pulseWaveActive ? frame - 45 : -1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 120,
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
        ...wipe,
      }}
    >
      {/* --- Dark vignette overlay --- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* --- Floating particles --- */}
      {PARTICLES.map((p) => {
        const float = particleFloat({ frame, index: p.id });
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.green,
              opacity: p.opacity,
              pointerEvents: 'none',
              zIndex: 0,
              ...float,
            }}
          />
        );
      })}

      {/* ====== TRUST SECTION (frames 0-70) ====== */}
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 900,
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        {/* Shield / checkmark hero icon */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            backgroundColor: COLORS.green,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: SHADOWS.greenGlow,
            ...shield,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <path
              d="M14 28 L24 38 L42 18"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 56,
            color: COLORS.white,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 48,
            textShadow: SHADOWS.textShadow,
            ...title,
          }}
        >
          Why Australians Trust Us
        </div>

        {/* Trust points — staggered with 10-frame gaps */}
        <div style={{ width: '100%' }}>
          {TRUST_POINTS.map((text, i) => {
            const itemDelay = 15 + i * 10;
            const fade = staggerFadeUp({
              frame,
              delay: 15,
              index: i,
              staggerAmount: 10,
            });

            // Green left-border grows via clipPath
            const borderGrowth = interpolate(
              frame,
              [itemDelay + 5, itemDelay + 20],
              [0, 100],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            // Checkmark flicker (independent per item)
            const checkFlicker = flickerIn({ frame, delay: itemDelay + 2 });

            // Pulse wave: green ripple through items after all 3 appear
            const pulseAlpha = pulseWaveActive
              ? Math.max(
                  0,
                  Math.sin((pulseWaveT - i * 4) * 0.35) * 0.35,
                )
              : 0;

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  marginBottom: 28,
                  position: 'relative',
                  ...fade,
                }}
              >
                {/* Green left border (clipPath grow) */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    borderRadius: 2,
                    backgroundColor: COLORS.green,
                    clipPath: `inset(${100 - borderGrowth}% 0 0 0)`,
                  }}
                />

                {/* Pulse wave highlight overlay */}
                {pulseAlpha > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: 12,
                      background: `rgba(76, 175, 76, ${pulseAlpha})`,
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Checkmark with independent flickerIn */}
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 700,
                    fontSize: 46,
                    color: COLORS.green,
                    flexShrink: 0,
                    paddingLeft: 16,
                    ...checkFlicker,
                  }}
                >
                  ✓
                </span>

                {/* Trust text */}
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontWeight: 600,
                    fontSize: 42,
                    color: COLORS.white,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====== CHECKOUT PREVIEW (frames 55-120) ====== */}
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        {/* "Simple checkout" typewriter label */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 600,
            fontSize: 28,
            color: COLORS.textSecondary,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 16,
            opacity: phone.opacity,
            ...labelTw,
          }}
        >
          Simple checkout
        </div>

        {/* Phone mockup — premium bezel matching Scene 4 */}
        <div
          style={{
            perspective: 1200,
            ...phone,
          }}
        >
          {/* Animated gradient border wrapper (Scene 4 style) */}
          <div
            style={{
              width: PW + 6,
              height: PH + 6,
              borderRadius: RADIUS + 3,
              background: GRADIENTS.greenShine,
              backgroundSize: '400% 400%',
              backgroundPosition: `${bgPos}% 50%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(phoneGlow as React.CSSProperties),
            }}
          >
            {/* Phone body */}
            <div
              style={{
                width: PW,
                height: PH,
                borderRadius: RADIUS,
                background: '#1a1a1a',
                padding: BEZEL,
                overflow: 'hidden',
                transform: `rotateY(${phoneTiltY}deg)`,
              }}
            >
              {/* Screen viewport */}
              <div
                style={{
                  width: PW - BEZEL * 2,
                  height: PH - BEZEL * 2,
                  borderRadius: RADIUS - BEZEL,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `scale(${(PW - BEZEL * 2) / 396})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <MockCheckoutPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SCENE 7: CTA — 27-30s (frames 0-90 local)
// Big price reveal "$249" with bounce
// "No referral. Book in 2 minutes."
// Express Pathology logo, URL, green CTA button with pulse

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { springBounce, springSlideUp, sp, cameraShake, sceneTransition } from '../lib/animations';

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 90;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames, 6);

  // Price bounce in
  const priceAnim = springBounce({ frame, delay: 5 });
  const shake = cameraShake(frame, 8, 8, 10);

  // Subtext
  const subAnim = springSlideUp({ frame, delay: 20 });

  // Logo / brand
  const logoAnim = springSlideUp({ frame, delay: 32 });

  // URL
  const urlAnim = springSlideUp({ frame, delay: 40 });

  // CTA button
  const btnAnim = springBounce({ frame, delay: 48 });

  // CTA pulse glow
  const pulsePhase = interpolate(frame, [50, 90], [0, Math.PI * 4]);
  const pulseOpacity = frame > 50 ? 0.3 + Math.sin(pulsePhase) * 0.2 : 0;

  // Green glow scale
  const glowScale = interpolate(sp(frame, 5), [0, 1], [0.5, 1.2]);

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
        opacity: sceneOpacity,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      {/* Background green glow */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}20 0%, transparent 70%)`,
          top: '45%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
        }}
      />

      {/* Price */}
      <div
        style={{
          ...priceAnim,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          fontSize: 160,
          color: COLORS.green,
          letterSpacing: '-0.04em',
          zIndex: 1,
          marginBottom: 16,
        }}
      >
        $249
      </div>

      {/* Subtext */}
      <div
        style={{
          ...subAnim,
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 44,
          color: COLORS.white,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          zIndex: 1,
          marginBottom: 50,
        }}
      >
        No referral. Book in 2 minutes.
      </div>

      {/* Brand name */}
      <div
        style={{
          ...logoAnim,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          fontSize: 52,
          color: COLORS.white,
          letterSpacing: '-0.02em',
          zIndex: 1,
          marginBottom: 12,
        }}
      >
        Express Pathology
      </div>

      {/* URL */}
      <div
        style={{
          ...urlAnim,
          fontFamily: FONTS.mono,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.dimmedMid,
          letterSpacing: '0.04em',
          zIndex: 1,
          marginBottom: 50,
        }}
      >
        expresspathology.com.au
      </div>

      {/* CTA Button */}
      <div
        style={{
          ...btnAnim,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Pulse glow behind button */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 500,
            height: 120,
            borderRadius: 60,
            background: COLORS.green,
            filter: 'blur(30px)',
            transform: 'translate(-50%, -50%)',
            opacity: pulseOpacity,
          }}
        />
        <div
          style={{
            background: COLORS.green,
            color: COLORS.white,
            fontFamily: FONTS.heading,
            fontWeight: 800,
            fontSize: 38,
            padding: '22px 60px',
            borderRadius: 50,
            letterSpacing: '-0.01em',
            position: 'relative',
          }}
        >
          Check your levels →
        </div>
      </div>
    </div>
  );
};

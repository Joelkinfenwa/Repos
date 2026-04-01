// Scene 2: PHONE SCROLL (4-14s | 300 frames)
// Phone slides up from bottom, landing page auto-scrolls through it
// Subtle gold glow behind phone, reflection effect
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { elegantSpring, fadeIn } from '../lib/animations';
import { PhoneMockup } from './PhoneMockup';

export const Scene2PhoneScroll: React.FC = () => {
  const frame = useCurrentFrame();

  // Phone slides up from below (first 30 frames)
  const phoneEnter = elegantSpring(frame, 0);
  const phoneY = interpolate(phoneEnter, [0, 1], [400, 0]);

  // Scroll progress ramps up smoothly over the middle portion
  const scrollProgress = interpolate(frame, [40, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phone scale — starts normal, very slightly grows
  const phoneScale = interpolate(frame, [0, 300], [1.8, 1.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ambient text that appears alongside phone
  const tagOpacity = fadeIn(frame, 20, 20);
  const tagOut = interpolate(frame, [260, 280], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gold glow pulse behind phone
  const glowPulse = 0.08 + Math.sin(frame * 0.04) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Gold glow behind phone */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${COLORS.goldGlow} 0%, transparent 70%)`,
          opacity: glowPulse,
        }}
      />

      {/* Phone centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${phoneY}px)`,
        }}
      >
        <PhoneMockup
          scrollProgress={scrollProgress}
          phoneScale={phoneScale}
          phoneOpacity={phoneEnter}
        />
      </div>

      {/* Top label */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          width: WIDTH,
          textAlign: 'center',
          opacity: tagOpacity * tagOut,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 22,
            fontWeight: 300,
            color: COLORS.cream30,
            letterSpacing: 5,
            textTransform: 'uppercase',
          }}
        >
          expresspathology.com.au
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          width: WIDTH,
          textAlign: 'center',
          opacity: fadeIn(frame, 30, 20) * tagOut,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 26,
            fontStyle: 'italic',
            color: COLORS.gold,
            opacity: 0.5 + Math.sin(frame * 0.08) * 0.3,
          }}
        >
          ↓
        </div>
      </div>
    </div>
  );
};

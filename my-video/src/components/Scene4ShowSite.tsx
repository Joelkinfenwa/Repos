// SCENE 4: SHOW THE SITE — 11-18s (frames 0-210 local)
// Premium phone mockup showcase with radial wipe, floating particles,
// animated gradient border, 3D tilt oscillation, glitch transitions,
// elastic badge overlays, and scanline overlay.

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  COLORS,
  GRADIENTS,
  FONTS,
} from '../lib/design';
import {
  sp,
  radialWipe,
  morphScale,
  glitchText,
  elasticSlideUp,
  flickerIn,
  breathe,
  borderGlow,
  particleFloat,
  fadeOut,
  sceneTransition,
} from '../lib/animations';
import { MockHomepage } from './MockHomepage';
import { MockLandingPage } from './MockLandingPage';
import { MockProductPage } from './MockProductPage';

// Phone mockup dimensions
const PW = 420;
const PH = 840;
const BEZEL = 12;
const RADIUS = 40;
const TOTAL_FRAMES = 210;

// Particle config
const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: 100 + Math.sin(i * 2.3) * 440 + 440,
  y: 200 + Math.cos(i * 1.7) * 800 + 800,
  size: 2 + (i % 4) * 1.5,
  opacity: 0.15 + (i % 5) * 0.06,
}));

// Phone page schedule: [startFrame, endFrame, glitchOutStart]
const PAGE_SCHEDULE = [
  { start: 0, end: 80, glitchAt: 75 },
  { start: 80, end: 150, glitchAt: 145 },
  { start: 150, end: 205, glitchAt: -1 },
] as const;

// Badge overlay config
const BADGES = [
  { text: '30+ biomarkers', delay: 25, counter: true, counterEnd: 30 },
  { text: 'No GP referral', delay: 90 },
  { text: 'Results in 48hrs', delay: 155 },
] as const;

// ─── PhoneSlot ───────────────────────────────────────────────────────────────

interface ScreenSlotProps {
  startFrame: number;
  endFrame: number;
  glitchAt: number;
  scrollStart?: number;
  scrollEnd?: number;
  children: React.ReactNode;
}

const PhoneSlot: React.FC<ScreenSlotProps> = ({
  startFrame,
  endFrame,
  glitchAt,
  scrollStart = 0,
  scrollEnd = 500,
  children,
}) => {
  const frame = useCurrentFrame();
  const visible = frame >= startFrame && frame < endFrame;
  if (!visible) return null;

  const local = frame - startFrame;
  const dur = endFrame - startFrame;

  // morphScale entry
  const entry = morphScale({ frame, delay: startFrame });
  const entryOpacity = entry.opacity as number;

  // Smooth zoom
  const scale = interpolate(local, [0, dur * 0.3, dur], [0.88, 1.0, 1.08], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 3D tilt oscillation ±8deg Y, ±3deg X
  const tiltY = Math.sin(local * 0.06) * 8;
  const tiltX = Math.cos(local * 0.08) * 3;

  // Parallax scroll
  const scrollY = interpolate(local, [0, dur], [scrollStart, scrollEnd], {
    extrapolateRight: 'clamp',
  });

  // Glitch-out phase: 5 frames of jitter before exit
  const isGlitching = glitchAt >= 0 && frame >= glitchAt && frame < glitchAt + 5;
  const glitch = isGlitching
    ? glitchText({ frame, delay: glitchAt })
    : { opacity: 1, transform: 'translate(0px, 0px)' };
  const glitchOpacity = glitch.opacity as number;

  // Exit fade (after glitch)
  const exitFade = interpolate(local, [dur - 6, dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing shadow
  const glow = borderGlow({ frame, delay: startFrame });

  // Animated gradient border rotation via background-position
  const bgPos = ((frame * 4) % 400);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: entryOpacity * exitFade * glitchOpacity,
        transform: `translate(-50%, -50%) ${glitch.transform} scale(${scale}) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
        perspective: 1200,
        zIndex: 5,
      }}
    >
      {/* Animated gradient border wrapper */}
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
          ...(glow as React.CSSProperties),
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
            {/* Scrolling content */}
            <div
              style={{
                position: 'absolute',
                top: -scrollY,
                left: 0,
                width: '100%',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Badge Overlay ───────────────────────────────────────────────────────────

interface BadgeConfig {
  readonly text: string;
  readonly delay: number;
  readonly counter?: boolean;
  readonly counterEnd?: number;
}

const BadgeOverlay: React.FC<{ badge: BadgeConfig; index: number }> = ({
  badge,
  index,
}) => {
  const frame = useCurrentFrame();

  // flickerIn for the first 10 frames after delay
  const flicker = flickerIn({ frame, delay: badge.delay });
  const flickerOp = flicker.opacity as number;

  // elasticSlideUp entrance
  const slide = elasticSlideUp({ frame, delay: badge.delay });
  const slideOp = slide.opacity as number;

  // Combined opacity
  const combinedEnterOp = Math.min(flickerOp, slideOp);

  // Fade out
  const exitOp = fadeOut(frame, badge.delay + 55, 10);

  // Pulsing green dot
  const dotBreathe = breathe({ frame });
  const dotScale = dotBreathe.transform;

  // Counter for "30+ biomarkers"
  let displayText = badge.text;
  if (badge.counter && badge.counterEnd) {
    const s = sp(frame, badge.delay);
    const count = Math.round(
      interpolate(s, [0, 1], [1, badge.counterEnd]),
    );
    displayText = `${count}+ biomarkers`;
  }

  // Don't render before delay
  if (frame < badge.delay) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200 - index * 0, // stacked at same position, only one visible at a time
        left: '50%',
        transform: `translateX(-50%) ${slide.transform}`,
        opacity: combinedEnterOp * exitOp,
        fontFamily: FONTS.mono,
        fontWeight: 700,
        fontSize: 34,
        color: COLORS.green,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        textAlign: 'center',
        background: COLORS.cardBg,
        backdropFilter: 'blur(8px)',
        padding: '16px 40px 16px 52px',
        borderRadius: 14,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        whiteSpace: 'nowrap',
      }}
    >
      {/* Pulsing green dot */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: '50%',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: COLORS.greenBright,
          boxShadow: `0 0 8px ${COLORS.green}`,
          transform: `translateY(-50%) ${dotScale}`,
        }}
      />
      {displayText}
    </div>
  );
};

// ─── Scanline Overlay ────────────────────────────────────────────────────────

const ScanlineOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 2) % 8;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 4px)',
        backgroundPosition: `0 ${offset}px`,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  );
};

// ─── Floating Particles ──────────────────────────────────────────────────────

const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {particles.map((p) => {
        const motion = particleFloat({ frame, index: p.id });
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
              background: COLORS.greenBright,
              opacity: p.opacity,
              transform: motion.transform,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      })}
    </>
  );
};

// ─── Main Scene ──────────────────────────────────────────────────────────────

export const Scene4ShowSite: React.FC = () => {
  const frame = useCurrentFrame();
  const { opacity: sceneOpacity } = sceneTransition(frame, TOTAL_FRAMES);

  // Radial wipe reveal for scene entry
  const wipe = radialWipe({ frame, delay: 0 });

  // Pulsing green orb behind phone
  const orbPulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
  const orbScale = 1.0 + orbPulse * 0.15;
  const orbOpacity = 0.12 + orbPulse * 0.14;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
        ...(wipe as React.CSSProperties),
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: COLORS.textTertiary,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        Express Pathology
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Large pulsing green glow orb */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}30 0%, ${COLORS.green}08 40%, transparent 70%)`,
          top: '48%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${orbScale})`,
          opacity: orbOpacity,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Phone page 1: Homepage — frames 0-80 */}
      <PhoneSlot
        startFrame={PAGE_SCHEDULE[0].start}
        endFrame={PAGE_SCHEDULE[0].end}
        glitchAt={PAGE_SCHEDULE[0].glitchAt}
        scrollStart={0}
        scrollEnd={500}
      >
        <MockHomepage />
      </PhoneSlot>

      {/* Phone page 2: Landing page — frames 80-150 */}
      <PhoneSlot
        startFrame={PAGE_SCHEDULE[1].start}
        endFrame={PAGE_SCHEDULE[1].end}
        glitchAt={PAGE_SCHEDULE[1].glitchAt}
        scrollStart={0}
        scrollEnd={600}
      >
        <MockLandingPage />
      </PhoneSlot>

      {/* Phone page 3: Product page — frames 150-205 */}
      <PhoneSlot
        startFrame={PAGE_SCHEDULE[2].start}
        endFrame={PAGE_SCHEDULE[2].end}
        glitchAt={PAGE_SCHEDULE[2].glitchAt}
        scrollStart={0}
        scrollEnd={350}
      >
        <MockProductPage />
      </PhoneSlot>

      {/* Badge overlays */}
      {BADGES.map((badge, i) => (
        <BadgeOverlay key={i} badge={badge} index={i} />
      ))}

      {/* Scanline overlay */}
      <ScanlineOverlay />
    </div>
  );
};

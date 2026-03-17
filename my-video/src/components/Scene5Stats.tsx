// SCENE 5: STATS + BIOMARKER CASCADE — 18-23s (frames 0-150 local)
// Cinematic reveal → 2x2 stat cards with countUp → biomarker pill cascade

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS, GRADIENTS, SHADOWS } from '../lib/design';
import {
  cinematicReveal,
  rotateIn3D,
  countUp,
  borderGlow,
  typewriter,
  staggerFadeUp,
  flickerIn,
  particleFloat,
  fadeOut,
  fadeIn,
} from '../lib/animations';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS = [
  { number: 5000, suffix: '+', label: 'Australians', delay: 10 },
  { number: 4.6, suffix: '★', label: 'Rating', delay: 18, decimal: true },
  { number: 2000, suffix: '+', label: 'Centres', delay: 26 },
  { number: 48, suffix: 'hrs', label: 'Results', delay: 34 },
];

const BIOMARKERS = [
  'Testosterone',
  'Free Test.',
  'SHBG',
  'Cortisol',
  'TSH',
  'T3',
  'T4',
  'Iron',
  'Ferritin',
  'Vitamin D',
  'B12',
  'Folate',
  'Liver Panel',
  'Kidney',
  '+16 more',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatWithCommas(n: number, decimal?: boolean): string {
  if (decimal) return n.toFixed(1);
  return Math.round(n).toLocaleString();
}

// ---------------------------------------------------------------------------
// Particles background
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 18;

const Particles: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const { transform } = particleFloat({ frame, index: i });
      const size = 2 + (i % 4) * 1.5;
      // Deterministic positioning seeded by index
      const baseX = ((i * 173 + 37) % 100);
      const baseY = ((i * 241 + 89) % 100);
      const opacity = 0.15 + (i % 5) * 0.06;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${baseX}%`,
            top: `${baseY}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: i % 3 === 0 ? COLORS.green : COLORS.white,
            opacity,
            transform,
            pointerEvents: 'none',
          }}
        />
      );
    })}
  </>
);

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

const StatCard: React.FC<{
  frame: number;
  stat: (typeof STATS)[number];
  index: number;
}> = ({ frame, stat, index }) => {
  const cardAnim = rotateIn3D({ frame, delay: stat.delay + index * 8 });
  const glow = borderGlow({ frame, delay: stat.delay + index * 8 + 10 });

  const counted = countUp({
    frame,
    delay: stat.delay + index * 8,
    from: 0,
    to: stat.number,
    duration: 30,
  });
  const displayVal = formatWithCommas(counted, stat.decimal) + stat.suffix;

  // Fade out stats section starting at frame 70
  const cardFade = fadeOut(frame, 70, 15);

  return (
    <div
      style={{
        ...cardAnim,
        opacity: (cardAnim.opacity as number) * cardFade,
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 16,
        padding: '40px 24px 32px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden' as const,
      }}
    >
      {/* Green accent line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: 3,
          background: GRADIENTS.greenShine,
          borderRadius: '0 0 4px 4px',
        }}
      />

      {/* Number with pulsing glow */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontWeight: 700,
          fontSize: 56,
          color: COLORS.green,
          letterSpacing: '0.02em',
          marginBottom: 10,
          textShadow: SHADOWS.greenGlow,
          ...glow,
        }}
      >
        {displayVal}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontWeight: 700,
          fontSize: 18,
          color: COLORS.textSecondary,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Biomarker pill
// ---------------------------------------------------------------------------

const BiomarkerPill: React.FC<{
  frame: number;
  label: string;
  index: number;
  isLast: boolean;
}> = ({ frame, label, index, isLast }) => {
  const pillDelay = 80 + index * 4;

  // Use flickerIn for the last "+16 more" item, staggerFadeUp for others
  const anim = isLast
    ? flickerIn({ frame, delay: pillDelay })
    : staggerFadeUp({ frame, delay: 80, index, staggerAmount: 4 });

  return (
    <div
      style={{
        ...anim,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 22px',
        borderRadius: 24,
        background: isLast ? 'rgba(76,175,76,0.2)' : COLORS.cardBg,
        border: `1px solid ${isLast ? COLORS.green : COLORS.cardBorder}`,
        fontFamily: FONTS.mono,
        fontWeight: 600,
        fontSize: 22,
        color: isLast ? COLORS.accent : COLORS.white,
        whiteSpace: 'nowrap' as const,
        textShadow: isLast ? `0 0 12px ${COLORS.accent}` : 'none',
      }}
    >
      {label}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scanning line overlay (vertical sweep)
// ---------------------------------------------------------------------------

const ScanLine: React.FC<{ frame: number }> = ({ frame }) => {
  // Sweeps from top to bottom over frames 90-130
  const progress = interpolate(frame, [90, 135], [-5, 105], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(frame, [90, 95, 130, 135], [0, 0.7, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (lineOpacity <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '5%',
        width: '90%',
        top: `${progress}%`,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${COLORS.green} 20%, ${COLORS.accent} 50%, ${COLORS.green} 80%, transparent 100%)`,
        opacity: lineOpacity,
        boxShadow: `0 0 20px 6px rgba(76,175,76,0.4), 0 0 60px 10px rgba(76,175,76,0.15)`,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// Main scene
// ---------------------------------------------------------------------------

export const Scene5Stats: React.FC = () => {
  const frame = useCurrentFrame();

  // Cinematic letterbox reveal for the whole scene
  const reveal = cinematicReveal({ frame, delay: 0 });

  // Biomarker section fades in around frame 70
  const biomarkerOpacity = fadeIn(frame, 70, 12);

  // "The Numbers" title — typewriter
  const titleAnim = typewriter({ frame, delay: 3, duration: 20 });
  const titleFade = fadeOut(frame, 70, 12);

  // "What We Test" title — typewriter
  const testTitleAnim = typewriter({ frame, delay: 75, duration: 20 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        ...reveal,
      }}
    >
      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: GRADIENTS.darkVignette,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Subtle green radial glow at center */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,76,0.12) 0%, transparent 65%)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating particles */}
      <Particles frame={frame} />

      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 50px',
          zIndex: 2,
        }}
      >
        {/* ============ STATS SECTION (frames 0-80) ============ */}
        <div
          style={{
            opacity: titleFade,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '12%',
          }}
        >
          {/* Title: "The Numbers" */}
          <div
            style={{
              ...titleAnim,
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: 48,
              color: COLORS.green,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 50,
              textShadow: `0 0 30px rgba(76,175,76,0.5)`,
            }}
          >
            The Numbers
          </div>

          {/* 2x2 Stat cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 28,
              width: '100%',
              maxWidth: 880,
            }}
          >
            {STATS.map((stat, i) => (
              <StatCard key={i} frame={frame} stat={stat} index={i} />
            ))}
          </div>
        </div>

        {/* ============ BIOMARKER CASCADE (frames 70-150) ============ */}
        <div
          style={{
            opacity: biomarkerOpacity,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '15%',
          }}
        >
          {/* Title: "What We Test" */}
          <div
            style={{
              ...testTitleAnim,
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: 48,
              color: COLORS.green,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 50,
              textShadow: `0 0 30px rgba(76,175,76,0.5)`,
            }}
          >
            What We Test
          </div>

          {/* Biomarker pills in flowing layout */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 14,
              maxWidth: 900,
              position: 'relative',
            }}
          >
            {BIOMARKERS.map((marker, i) => (
              <BiomarkerPill
                key={i}
                frame={frame}
                label={marker}
                index={i}
                isLast={i === BIOMARKERS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Green scanning line sweep */}
      <ScanLine frame={frame} />
    </div>
  );
};

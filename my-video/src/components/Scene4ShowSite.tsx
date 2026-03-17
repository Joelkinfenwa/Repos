// SCENE 4: SHOW THE SITE — 11-18s (frames 0-210 local)
// Smooth zoom into recreated website pages inside phone mockups
// Overlay text: "30+ biomarkers", "No GP referral", "Results in 48 hours"
// Parallax scrolling + 3D tilt on phone mockups

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS, SPRING_CONFIG } from '../lib/design';
import { springSlideUp, sp, sceneTransition } from '../lib/animations';
import { MockHomepage } from './MockHomepage';
import { MockLandingPage } from './MockLandingPage';
import { MockProductPage } from './MockProductPage';

// Phone mockup dimensions
const PW = 420;
const PH = 840;
const BEZEL = 12;
const RADIUS = 40;

interface ScreenSlotProps {
  startFrame: number;
  endFrame: number;
  scrollStart?: number;
  scrollEnd?: number;
  children: React.ReactNode;
}

const PhoneSlot: React.FC<ScreenSlotProps> = ({
  startFrame,
  endFrame,
  scrollStart = 0,
  scrollEnd = 400,
  children,
}) => {
  const frame = useCurrentFrame();
  const visible = frame >= startFrame && frame < endFrame;
  if (!visible) return null;

  const local = frame - startFrame;
  const dur = endFrame - startFrame;

  // Entry spring
  const enter = spring({ frame: local, fps: FPS, config: SPRING_CONFIG });

  // Zoom: start at 0.85, zoom to 1.05
  const scale = interpolate(local, [0, dur], [0.85, 1.05], { extrapolateRight: 'clamp' });

  // Parallax scroll on inner content
  const scrollY = interpolate(local, [0, dur], [scrollStart, scrollEnd], { extrapolateRight: 'clamp' });

  // 3D tilt
  const rotY = interpolate(local, [0, dur], [-3, 3], { extrapolateRight: 'clamp' });
  const rotX = interpolate(local, [0, dur], [2, -1], { extrapolateRight: 'clamp' });

  // Exit fade
  const exitFade = interpolate(local, [dur - 8, dur], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: enter * exitFade,
        transform: `translate(-50%, -50%) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
        perspective: 1200,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: PW,
          height: PH,
          borderRadius: RADIUS,
          background: '#1a1a1a',
          padding: BEZEL,
          boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(76,175,76,0.12)',
          overflow: 'hidden',
        }}
      >
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
  );
};

// Overlay text items
const OVERLAYS = [
  { text: '30+ biomarkers', delay: 20, counter: true, counterEnd: 30 },
  { text: 'No GP referral', delay: 80 },
  { text: 'Results in 48 hours', delay: 140 },
];

export const Scene4ShowSite: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 210;
  const { opacity: sceneOpacity } = sceneTransition(frame, totalFrames);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        opacity: sceneOpacity,
      }}
    >
      {/* Green glow behind phones */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.green}20 0%, transparent 70%)`,
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Screenshot 1: Homepage — frames 0-80 */}
      <PhoneSlot startFrame={0} endFrame={80} scrollStart={0} scrollEnd={500}>
        <MockHomepage />
      </PhoneSlot>

      {/* Screenshot 2: Landing page — frames 70-145 */}
      <PhoneSlot startFrame={70} endFrame={145} scrollStart={0} scrollEnd={600}>
        <MockLandingPage />
      </PhoneSlot>

      {/* Screenshot 3: Product page — frames 135-200 */}
      <PhoneSlot startFrame={135} endFrame={200} scrollStart={0} scrollEnd={350}>
        <MockProductPage />
      </PhoneSlot>

      {/* Overlay text badges */}
      {OVERLAYS.map((item, i) => {
        const anim = springSlideUp({ frame, delay: item.delay });
        // Counter animation for "30+ biomarkers"
        let displayText = item.text;
        if (item.counter && item.counterEnd) {
          const count = Math.round(
            interpolate(sp(frame, item.delay), [0, 1], [1, item.counterEnd]),
          );
          displayText = `${count}+ biomarkers`;
        }

        // Fade out after some time
        const fadeOutOp = interpolate(
          frame, [item.delay + 50, item.delay + 60], [1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 180,
              left: '50%',
              transform: `translateX(-50%) ${anim.transform}`,
              opacity: (anim.opacity as number) * fadeOutOp,
              fontFamily: FONTS.mono,
              fontWeight: 700,
              fontSize: 36,
              color: COLORS.green,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textAlign: 'center',
              background: 'rgba(12,15,10,0.85)',
              padding: '14px 36px',
              borderRadius: 12,
              border: `1px solid ${COLORS.green}40`,
              zIndex: 10,
            }}
          >
            {displayText}
          </div>
        );
      })}
    </div>
  );
};

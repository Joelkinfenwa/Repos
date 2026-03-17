// SCENE 2: WEBSITE INTRO — 5-12s (frames 150-360, local 0-210)
// Mock browser window sliding in from below, showing Express Pathology website

import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, FONTS, FPS } from '../lib/design';
import { NarrationCaption } from './NarrationCaption';

export const WebsiteIntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Browser slides in from below
  const browserSlide = spring({
    frame: frame - 10,
    fps: FPS,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });

  // Highlight "Hormone Panels" card after browser is in
  const highlightDelay = 120;
  const highlightSpring = spring({
    frame: frame - highlightDelay,
    fps: FPS,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Zoom towards Hormone Panels
  const zoomScale = interpolate(highlightSpring, [0, 1], [1, 1.05]);
  const zoomY = interpolate(highlightSpring, [0, 1], [0, -40]);

  const cards = ['Blood Tests', 'Hormone Panels', 'Health Checks'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
        position: 'relative',
      }}
    >
      {/* Browser Window */}
      <div
        style={{
          opacity: browserSlide,
          transform: `translateY(${interpolate(browserSlide, [0, 1], [300, 0])}px) scale(${zoomScale}) translateY(${zoomY}px)`,
          width: 940,
          borderRadius: 16,
          overflow: 'hidden',
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            backgroundColor: COLORS.browserChrome,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28CA42' }} />
          </div>
          {/* URL bar */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '8px 16px',
              fontFamily: FONTS.mono,
              fontSize: 18,
              color: COLORS.dimmedMid,
            }}
          >
            expresspathology.com.au
          </div>
        </div>

        {/* Website Content */}
        <div
          style={{
            backgroundColor: '#111411',
            minHeight: 900,
          }}
        >
          {/* Green Header Bar */}
          <div
            style={{
              backgroundColor: COLORS.green,
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: COLORS.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.heading,
                  fontSize: 22,
                  fontWeight: 900,
                  color: COLORS.green,
                }}
              >
                +
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                Express Pathology
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div
            style={{
              padding: '60px 40px 40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: 42,
                fontWeight: 800,
                color: COLORS.white,
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              Take Control of Your Health
            </div>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: COLORS.green,
                borderRadius: 12,
                padding: '14px 40px',
                fontFamily: FONTS.heading,
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              Book Now
            </div>
          </div>

          {/* Three cards */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              padding: '20px 32px 40px',
              justifyContent: 'center',
            }}
          >
            {cards.map((card, i) => {
              const isHighlighted = card === 'Hormone Panels';
              const glowOpacity = isHighlighted ? highlightSpring : 0;

              return (
                <div
                  key={card}
                  style={{
                    flex: 1,
                    backgroundColor: isHighlighted
                      ? `rgba(76, 175, 76, ${interpolate(highlightSpring, [0, 1], [0.05, 0.15])})`
                      : 'rgba(255,255,255,0.04)',
                    border: isHighlighted
                      ? `2px solid rgba(76, 175, 76, ${interpolate(highlightSpring, [0, 1], [0.2, 0.9])})`
                      : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '28px 16px',
                    textAlign: 'center',
                    boxShadow: isHighlighted
                      ? `0 0 ${interpolate(glowOpacity, [0, 1], [0, 30])}px rgba(76, 175, 76, ${interpolate(glowOpacity, [0, 1], [0, 0.4])})`
                      : 'none',
                    transform: isHighlighted
                      ? `scale(${interpolate(highlightSpring, [0, 1], [1, 1.05])})`
                      : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 20,
                      fontWeight: 700,
                      color: isHighlighted ? COLORS.green : COLORS.dimmedMid,
                    }}
                  >
                    {card}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <NarrationCaption
        text="Express Pathology makes it dead simple. Just jump on the website..."
        frame={frame}
        startFrame={15}
      />
    </div>
  );
};

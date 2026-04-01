// Scene 6: CTA — $319 price reveal, URL, final call to action
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS, WIDTH } from '../lib/design';
import { priceSlam, slideUp, fadeIn, gentleFloat } from '../lib/animations';

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const priceAnim = priceSlam(frame, 10);
  const nameAnim = slideUp(frame, 30);
  const btnAnim = slideUp(frame, 50, 40);
  const urlAnim = slideUp(frame, 65, 30);
  const noteAnim = slideUp(frame, 80, 30);

  const btnFloat = gentleFloat(frame, 3, 0.05);

  // Pulsing glow behind price
  const glowPulse = 0.3 + Math.sin(frame * 0.08) * 0.15;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Price glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.goldGlow} 0%, transparent 70%)`,
          opacity: glowPulse * fadeIn(frame, 8, 15),
        }}
      />

      {/* $319 */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          width: WIDTH,
          textAlign: 'center',
          ...priceAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 160,
            fontWeight: 400,
            color: COLORS.cream,
          }}
        >
          $319
        </div>
      </div>

      {/* Product name */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          width: WIDTH,
          textAlign: 'center',
          ...nameAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 30,
            fontWeight: 300,
            color: COLORS.gold,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          Ultimate Performance Screen
        </div>
        {/* Small gold rule */}
        <div
          style={{
            width: 80,
            height: 1.5,
            backgroundColor: COLORS.gold,
            margin: '25px auto 0',
            opacity: fadeIn(frame, 40, 15),
          }}
        />
      </div>

      {/* Save badge */}
      <div
        style={{
          position: 'absolute',
          top: '51%',
          width: WIDTH,
          textAlign: 'center',
          opacity: fadeIn(frame, 45, 15),
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.rose,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Save $70 — Was $389
        </span>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          width: WIDTH,
          textAlign: 'center',
          ...btnAnim,
        }}
      >
        <div style={{ transform: `translateY(${btnFloat}px)` }}>
          <div
            style={{
              display: 'inline-block',
              fontFamily: FONTS.sans,
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.white,
              backgroundColor: COLORS.orange,
              padding: '22px 64px',
              borderRadius: 50,
              boxShadow: `0 0 ${25 + Math.sin(frame * 0.1) * 10}px ${COLORS.orangeGlow}`,
            }}
          >
            ORDER NOW →
          </div>
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: 'absolute',
          top: '72%',
          width: WIDTH,
          textAlign: 'center',
          ...urlAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 28,
            fontWeight: 300,
            color: COLORS.cream50,
            letterSpacing: 1,
          }}
        >
          expresspathology.com.au
        </div>
      </div>

      {/* Footnote */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          width: WIDTH,
          textAlign: 'center',
          ...noteAnim,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 22,
            fontWeight: 300,
            color: COLORS.cream30,
          }}
        >
          No GP required · No referral needed
        </div>
      </div>
    </div>
  );
};

// Phone mockup with scrolling landing page content inside
// Recreates the Express Pathology landing page sections
import React from 'react';
// Phone rendering component
import { COLORS, FONTS } from '../lib/design';

const PHONE_W = 420;
const PHONE_H = 860;
const SCREEN_W = PHONE_W - 24;
const SCREEN_H = PHONE_H - 24;
const BORDER_R = 52;
const SCREEN_R = 44;

// Landing page content height (scrollable)
const CONTENT_H = 3200;

const BIOMARKERS = [
  'Testosterone', 'Cortisol', 'Thyroid (TSH, T3, T4)', 'Iron Studies',
  'Vitamin D', 'Vitamin B12', 'Liver Function', 'Kidney Function',
  'Cholesterol Panel', 'Inflammation (CRP)', 'Blood Glucose', 'HbA1c',
];

const STEPS = [
  { num: '1', title: 'Order Online', sub: 'Select your screen' },
  { num: '2', title: 'Visit a Lab', sub: '2,000+ locations' },
  { num: '3', title: 'Get Results', sub: 'Within 48 hours' },
];

interface Props {
  scrollProgress: number; // 0 to 1
  phoneScale: number;
  phoneOpacity: number;
}

export const PhoneMockup: React.FC<Props> = ({ scrollProgress, phoneScale, phoneOpacity }) => {
  const scrollY = scrollProgress * (CONTENT_H - SCREEN_H);

  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        position: 'relative',
        transform: `scale(${phoneScale})`,
        opacity: phoneOpacity,
      }}
    >
      {/* Phone outer frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: BORDER_R,
          background: 'linear-gradient(145deg, #2A2A2E 0%, #1A1A1E 50%, #2A2A2E 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,165,116,0.08)',
        }}
      />

      {/* Screen area */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: SCREEN_R,
          overflow: 'hidden',
          backgroundColor: COLORS.phoneBg,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 130,
            height: 28,
            backgroundColor: '#1A1A1E',
            borderRadius: '0 0 18px 18px',
            zIndex: 10,
          }}
        />

        {/* Scrolling content */}
        <div
          style={{
            position: 'absolute',
            top: -scrollY,
            left: 0,
            width: SCREEN_W,
            height: CONTENT_H,
          }}
        >
          {/* === HERO SECTION === */}
          <div
            style={{
              height: 700,
              background: 'linear-gradient(180deg, #064E3B 0%, #047857 60%, #10B981 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 24px 40px',
            }}
          >
            {/* Express Pathology logo placeholder */}
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 30,
              }}
            >
              EXPRESS PATHOLOGY
            </div>

            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.white,
                textAlign: 'center',
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Ultimate{'\n'}Performance{'\n'}Screen
            </div>

            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
                textAlign: 'center',
                lineHeight: 1.5,
                marginBottom: 24,
                padding: '0 16px',
              }}
            >
              Australia's most comprehensive blood test.{'\n'}40+ biomarkers. No GP required.
            </div>

            {/* Price badge */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 30,
                padding: '14px 36px',
                marginBottom: 16,
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 36, fontWeight: 700, color: COLORS.white }}>
                $319
              </span>
              <span style={{ fontFamily: FONTS.sans, fontSize: 14, color: 'rgba(255,255,255,0.7)', marginLeft: 10 }}>
                Save $70
              </span>
            </div>

            {/* CTA button */}
            <div
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: '12px 40px',
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 600, color: '#047857' }}>
                Order Now →
              </span>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: 30,
                marginTop: 30,
              }}
            >
              {[
                { val: '40+', label: 'Biomarkers' },
                { val: '48hr', label: 'Results' },
                { val: '2000+', label: 'Locations' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: FONTS.sans, fontSize: 20, fontWeight: 700, color: COLORS.white }}>
                    {s.val}
                  </div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === WHAT WE TEST SECTION === */}
          <div
            style={{
              padding: '40px 24px',
              backgroundColor: COLORS.white,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              What We Test
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {BIOMARKERS.map((b, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    color: '#047857',
                    backgroundColor: COLORS.emeraldDim,
                    borderRadius: 16,
                    padding: '6px 14px',
                    fontWeight: 500,
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* === HOW IT WORKS === */}
          <div
            style={{
              padding: '40px 24px',
              backgroundColor: '#F9FAFB',
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                marginBottom: 28,
              }}
            >
              How It Works
            </div>

            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 24,
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONTS.sans,
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.white,
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 600, color: '#111827' }}>
                    {step.title}
                  </div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: 12, color: '#6B7280' }}>
                    {step.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* === REVIEWS === */}
          <div
            style={{
              padding: '40px 24px',
              backgroundColor: COLORS.white,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              What People Say
            </div>

            {/* Stars */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} style={{ fontSize: 22, color: '#FBBF24', marginRight: 4 }}>{s}</span>
              ))}
            </div>

            {/* Review card */}
            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 12,
                padding: '20px',
                marginBottom: 12,
              }}
            >
              <div style={{ fontFamily: FONTS.sans, fontSize: 12, fontStyle: 'italic', color: '#374151', lineHeight: 1.5 }}>
                "Finally a blood test that covers everything. Results were fast and the dashboard is incredible."
              </div>
              <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
                — Sarah M., Sydney
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 12,
                padding: '20px',
              }}
            >
              <div style={{ fontFamily: FONTS.sans, fontSize: 12, fontStyle: 'italic', color: '#374151', lineHeight: 1.5 }}>
                "As someone who trains 5x a week, this is a game-changer for tracking recovery and hormones."
              </div>
              <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
                — James T., Melbourne
              </div>
            </div>
          </div>

          {/* === BOTTOM CTA === */}
          <div
            style={{
              padding: '40px 24px 60px',
              background: 'linear-gradient(180deg, #064E3B 0%, #047857 100%)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: FONTS.sans, fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>
              Ready to Decode{'\n'}Your Health?
            </div>
            <div
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: '14px 48px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 16, fontWeight: 600, color: '#047857' }}>
                Get Started — $319
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Side button (volume) */}
      <div
        style={{
          position: 'absolute',
          right: -3,
          top: 180,
          width: 3,
          height: 50,
          backgroundColor: '#3A3A3E',
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* Power button */}
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 200,
          width: 3,
          height: 70,
          backgroundColor: '#3A3A3E',
          borderRadius: '2px 0 0 2px',
        }}
      />
    </div>
  );
};

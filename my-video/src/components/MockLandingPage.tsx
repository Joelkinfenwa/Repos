// Mock recreation of expresspathology.com.au/pages/male-hormonal-page
// Male Hormonal Health Package landing page — stylized for video

import React from 'react';

const EP_GREEN = '#4CAF4C';
const EP_BRIGHT = '#66BB6A';
const EP_DARK = '#0a1a0a';
const EP_CARD_BG = '#111c11';
const EP_BORDER = 'rgba(76,175,76,0.15)';
const EP_WHITE = '#ffffff';
const EP_DIM = 'rgba(255,255,255,0.6)';

const BIOMARKERS = [
  { category: 'Hormones', items: ['Total Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol', 'Prolactin', 'LH', 'FSH', 'DHEA-S'] },
  { category: 'Thyroid', items: ['TSH', 'Free T4', 'Free T3'] },
  { category: 'Metabolic', items: ['Cortisol', 'HbA1c', 'Fasting Glucose', 'Insulin'] },
  { category: 'Vitamins & Minerals', items: ['Vitamin D', 'Vitamin B12', 'Folate', 'Iron Studies', 'Ferritin', 'Zinc', 'Magnesium'] },
  { category: 'Organ Function', items: ['Liver Function (LFT)', 'Kidney Function (eGFR)', 'Lipid Panel', 'Full Blood Count', 'CRP (Inflammation)'] },
];

export const MockLandingPage: React.FC = () => {
  return (
    <div
      style={{
        width: 396,
        minHeight: 3200,
        background: EP_DARK,
        fontFamily: 'DM Sans, sans-serif',
        color: EP_WHITE,
        overflow: 'hidden',
      }}
    >
      {/* Nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: `1px solid ${EP_BORDER}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: EP_GREEN,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 900,
              color: EP_WHITE,
            }}
          >
            E
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>
            Express Pathology
          </span>
        </div>
        <div
          style={{
            background: EP_GREEN,
            color: EP_WHITE,
            fontSize: 11,
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: 20,
          }}
        >
          Book Now
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '44px 24px 36px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(76,175,76,0.12)',
            color: EP_GREEN,
            fontSize: 10,
            fontWeight: 800,
            padding: '5px 14px',
            borderRadius: 20,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 16,
            fontFamily: 'Space Mono, monospace',
          }}
        >
          Most Popular
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          Male Hormonal
          <br />
          <span style={{ color: EP_GREEN }}>Health Package</span>
        </div>
        <div style={{ fontSize: 14, color: EP_DIM, lineHeight: 1.5, marginBottom: 24 }}>
          Comprehensive blood panel designed for men who want to understand their energy, mood, and performance.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: EP_GREEN, fontFamily: 'Space Mono, monospace' }}>
            $249
          </div>
          <div style={{ fontSize: 12, color: EP_DIM, textAlign: 'left', lineHeight: 1.4 }}>
            30+ biomarkers
            <br />
            Doctor reviewed
          </div>
        </div>
        <div
          style={{
            background: EP_GREEN,
            color: EP_WHITE,
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 40px',
            borderRadius: 28,
            display: 'inline-block',
          }}
        >
          Add to Cart — $249
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '20px 16px',
          background: 'rgba(76,175,76,0.04)',
          borderTop: `1px solid ${EP_BORDER}`,
          borderBottom: `1px solid ${EP_BORDER}`,
        }}
      >
        {[
          { icon: '🧪', label: '30+ Biomarkers' },
          { icon: '⏱', label: '48hr Results' },
          { icon: '👨‍⚕️', label: 'Doctor Reviewed' },
          { icon: '📍', label: '2,000+ Centres' },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
            <div style={{ fontSize: 9, color: EP_DIM, fontWeight: 600, lineHeight: 1.3 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* "Who is this for?" */}
      <div style={{ padding: '36px 24px' }}>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Who is this for?
        </div>
        <div style={{ fontSize: 13, color: EP_DIM, lineHeight: 1.6, marginBottom: 20 }}>
          Designed for men aged 25–55 experiencing:
        </div>
        {[
          'Persistent fatigue or low energy',
          'Brain fog or poor concentration',
          'Low mood or irritability',
          'Reduced strength or muscle recovery',
          'Low libido or performance concerns',
          'Weight changes despite good habits',
        ].map((symptom, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
              fontSize: 13,
              color: EP_WHITE,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'rgba(76,175,76,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ color: EP_GREEN, fontSize: 10, fontWeight: 700 }}>✓</span>
            </div>
            {symptom}
          </div>
        ))}
      </div>

      {/* Biomarker list */}
      <div style={{ padding: '0 24px 36px' }}>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>
          What's Tested
        </div>
        {BIOMARKERS.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: EP_BRIGHT,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 10,
                fontFamily: 'Space Mono, monospace',
              }}
            >
              {cat.category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cat.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    background: EP_CARD_BG,
                    border: `1px solid ${EP_BORDER}`,
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: EP_WHITE,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div
        style={{
          padding: '32px 24px',
          background: 'rgba(76,175,76,0.04)',
          borderTop: `1px solid ${EP_BORDER}`,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>
          How It Works
        </div>
        {[
          { step: '01', title: 'Choose Your Package', desc: 'Select online — no referral needed' },
          { step: '02', title: 'Visit a Collection Centre', desc: '2,000+ locations Australia-wide' },
          { step: '03', title: 'Get Your Results', desc: 'Doctor-reviewed report in 48 hours' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: EP_GREEN,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Space Mono, monospace',
                fontWeight: 700,
                fontSize: 13,
                color: EP_WHITE,
                flexShrink: 0,
              }}
            >
              {s.step}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: EP_DIM, marginTop: 2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '36px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.02em' }}>
          Stop guessing. Get tested.
        </div>
        <div
          style={{
            background: EP_GREEN,
            color: EP_WHITE,
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 40px',
            borderRadius: 28,
            display: 'inline-block',
            marginTop: 12,
          }}
        >
          Add to Cart — $249 →
        </div>
      </div>
    </div>
  );
};

// Mock recreation of expresspathology.com.au homepage
// Stylized for video — clean, sharp, designed for phone mockup display

import React from 'react';

const EP_GREEN = '#4CAF4C';
const EP_DARK = '#0a1a0a';
const EP_CARD_BG = '#111c11';
const EP_BORDER = 'rgba(76,175,76,0.15)';
const EP_WHITE = '#ffffff';
const EP_DIM = 'rgba(255,255,255,0.6)';

const TRUST_LOGOS = ['NATA Accredited', '2,000+ Centres', 'Doctor Reviewed', 'TGA Approved'];

const PRODUCTS = [
  { name: 'Male Hormonal Health', price: '$249', tests: '30+ biomarkers', tag: 'POPULAR' },
  { name: 'Female Hormonal Health', price: '$249', tests: '28+ biomarkers', tag: '' },
  { name: 'General Wellness', price: '$189', tests: '20+ biomarkers', tag: '' },
  { name: 'Thyroid Function', price: '$99', tests: '5 biomarkers', tag: '' },
  { name: 'Iron Studies', price: '$69', tests: '4 biomarkers', tag: '' },
  { name: 'Vitamin & Mineral', price: '$149', tests: '12 biomarkers', tag: '' },
];

export const MockHomepage: React.FC = () => {
  return (
    <div
      style={{
        width: 396,
        minHeight: 2800,
        background: EP_DARK,
        fontFamily: 'DM Sans, sans-serif',
        color: EP_WHITE,
        overflow: 'hidden',
      }}
    >
      {/* Nav bar */}
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

      {/* Hero section */}
      <div style={{ padding: '48px 24px 40px', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: EP_GREEN,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 14,
            fontFamily: 'Space Mono, monospace',
          }}
        >
          Private Blood Testing
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}
        >
          Take control of
          <br />
          your health.
        </div>
        <div
          style={{
            fontSize: 15,
            color: EP_DIM,
            lineHeight: 1.5,
            marginBottom: 28,
            maxWidth: 320,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Comprehensive blood tests. No GP referral needed. Doctor-reviewed results in 48 hours.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <div
            style={{
              background: EP_GREEN,
              color: EP_WHITE,
              fontWeight: 700,
              fontSize: 14,
              padding: '12px 28px',
              borderRadius: 28,
            }}
          >
            Browse Packages
          </div>
          <div
            style={{
              border: `1px solid rgba(255,255,255,0.2)`,
              color: EP_WHITE,
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 28px',
              borderRadius: 28,
            }}
          >
            How It Works
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '18px 16px',
          background: 'rgba(76,175,76,0.06)',
          borderTop: `1px solid ${EP_BORDER}`,
          borderBottom: `1px solid ${EP_BORDER}`,
        }}
      >
        {TRUST_LOGOS.map((label, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: EP_DIM,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.3,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(76,175,76,0.12)',
                margin: '0 auto 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: EP_GREEN, fontSize: 14 }}>✓</span>
            </div>
            {label}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '28px 16px',
        }}
      >
        {[
          { val: '5,000+', label: 'Tested' },
          { val: '4.6★', label: 'Rating' },
          { val: '48hrs', label: 'Results' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: EP_GREEN,
                fontFamily: 'Space Mono, monospace',
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 10, color: EP_DIM, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Section heading */}
      <div style={{ padding: '10px 24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>
          Our Packages
        </div>
        <div style={{ fontSize: 13, color: EP_DIM, marginTop: 8 }}>
          Comprehensive testing. Clear results.
        </div>
      </div>

      {/* Product cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PRODUCTS.map((p, i) => (
          <div
            key={i}
            style={{
              background: EP_CARD_BG,
              border: `1px solid ${i === 0 ? EP_GREEN : EP_BORDER}`,
              borderRadius: 14,
              padding: '20px 18px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {p.tag && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: EP_GREEN,
                  color: EP_WHITE,
                  fontSize: 8,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderBottomLeftRadius: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {p.tag}
              </div>
            )}
            <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.01em' }}>
              {p.name}
            </div>
            <div style={{ fontSize: 11, color: EP_DIM, marginBottom: 12 }}>{p.tests}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: EP_GREEN, fontFamily: 'Space Mono, monospace' }}>
                {p.price}
              </div>
              <div
                style={{
                  background: i === 0 ? EP_GREEN : 'rgba(255,255,255,0.08)',
                  color: EP_WHITE,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: 20,
                }}
              >
                View Package →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 20 }}>What People Say</div>
        <div
          style={{
            background: EP_CARD_BG,
            border: `1px solid ${EP_BORDER}`,
            borderRadius: 14,
            padding: '24px 20px',
          }}
        >
          <div style={{ fontSize: 13, color: EP_DIM, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 14 }}>
            "Finally got answers about my fatigue. The process was so easy — no GP visit needed. Results came back in under 2 days."
          </div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>— James M., Sydney</div>
          <div style={{ color: EP_GREEN, fontSize: 14, marginTop: 6 }}>★★★★★</div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          padding: '32px 24px 48px',
          textAlign: 'center',
          background: 'rgba(76,175,76,0.04)',
          borderTop: `1px solid ${EP_BORDER}`,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.02em' }}>
          Ready to check your levels?
        </div>
        <div style={{ fontSize: 13, color: EP_DIM, marginBottom: 20 }}>
          No referral. Results in 48 hours.
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
          Book Now →
        </div>
      </div>
    </div>
  );
};

// Mock product detail page for Male Hormonal Health Package
// Shows price, key details, ATC button — stylized for phone mockup

import React from 'react';

const EP_GREEN = '#4CAF4C';
const EP_DARK = '#0a1a0a';
const EP_CARD_BG = '#111c11';
const EP_BORDER = 'rgba(76,175,76,0.15)';
const EP_WHITE = '#ffffff';
const EP_DIM = 'rgba(255,255,255,0.6)';

export const MockProductPage: React.FC = () => {
  return (
    <div
      style={{
        width: 396,
        minHeight: 2000,
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
              width: 28, height: 28, borderRadius: 6, background: EP_GREEN,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 900, color: EP_WHITE,
            }}
          >
            E
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>
            Express Pathology
          </span>
        </div>
        <div style={{ fontSize: 12, color: EP_DIM }}>Cart (0)</div>
      </div>

      {/* Product hero */}
      <div style={{ padding: '36px 24px 28px' }}>
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
          Blood Test Package
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 8 }}>
          Male Hormonal
          <br />
          Health Package
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ color: EP_GREEN, fontSize: 14 }}>★★★★★</span>
          <span style={{ fontSize: 12, color: EP_DIM }}>4.6 (312 reviews)</span>
        </div>
        <div style={{ fontSize: 14, color: EP_DIM, lineHeight: 1.5, marginBottom: 24 }}>
          The most comprehensive hormonal blood test for men. Covers testosterone, thyroid, cortisol, vitamins, and organ function. Doctor-reviewed results delivered to your inbox.
        </div>

        {/* Price */}
        <div
          style={{
            background: EP_CARD_BG,
            border: `1px solid ${EP_BORDER}`,
            borderRadius: 16,
            padding: '24px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: EP_GREEN,
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '-0.02em',
              }}
            >
              $249
            </div>
            <div style={{ fontSize: 13, color: EP_DIM }}>AUD incl. GST</div>
          </div>
          {[
            '30+ biomarkers tested',
            'No GP referral required',
            'Results in 48 hours',
            'Doctor-reviewed report',
            '2,000+ collection centres',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
                fontSize: 12,
              }}
            >
              <span style={{ color: EP_GREEN, fontSize: 12 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* ATC Button */}
        <div
          style={{
            background: EP_GREEN,
            color: EP_WHITE,
            fontWeight: 800,
            fontSize: 16,
            padding: '16px',
            borderRadius: 30,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Add to Cart — $249
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: EP_DIM }}>
          Secure checkout · Instant booking confirmation
        </div>
      </div>

      {/* What's included */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
          What's Included
        </div>
        {[
          { cat: 'Hormones', count: 8, items: 'Testosterone, Free T, SHBG, Oestradiol, Prolactin, LH, FSH, DHEA-S' },
          { cat: 'Thyroid', count: 3, items: 'TSH, Free T4, Free T3' },
          { cat: 'Metabolic', count: 4, items: 'Cortisol, HbA1c, Glucose, Insulin' },
          { cat: 'Vitamins', count: 7, items: 'Vit D, B12, Folate, Iron, Ferritin, Zinc, Magnesium' },
          { cat: 'Organs', count: 5, items: 'Liver, Kidney, Lipids, FBC, CRP' },
        ].map((g, i) => (
          <div
            key={i}
            style={{
              background: EP_CARD_BG,
              border: `1px solid ${EP_BORDER}`,
              borderRadius: 12,
              padding: '14px 16px',
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{g.cat}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: EP_GREEN,
                  fontFamily: 'Space Mono, monospace',
                }}
              >
                {g.count} markers
              </span>
            </div>
            <div style={{ fontSize: 11, color: EP_DIM, lineHeight: 1.5 }}>{g.items}</div>
          </div>
        ))}
      </div>

      {/* Trust section */}
      <div
        style={{
          padding: '28px 24px',
          background: 'rgba(76,175,76,0.04)',
          borderTop: `1px solid ${EP_BORDER}`,
        }}
      >
        {[
          'NATA-accredited laboratories',
          'Same labs used by GPs and hospitals',
          'Doctor-reviewed — not auto-generated',
          'AHPRA compliant',
        ].map((t, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 10, fontSize: 12, fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 22, height: 22, borderRadius: '50%',
                background: EP_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ color: EP_WHITE, fontSize: 11, fontWeight: 700 }}>✓</span>
            </div>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock checkout page for Express Pathology
// Shows cart summary and booking flow — stylized for phone mockup

import React from 'react';

const EP_GREEN = '#4CAF4C';
const EP_DARK = '#0a1a0a';
const EP_CARD_BG = '#111c11';
const EP_BORDER = 'rgba(76,175,76,0.15)';
const EP_WHITE = '#ffffff';
const EP_DIM = 'rgba(255,255,255,0.6)';

export const MockCheckoutPage: React.FC = () => {
  return (
    <div
      style={{
        width: 396,
        minHeight: 1400,
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
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>Checkout</span>
        </div>
        <div style={{ fontSize: 12, color: EP_DIM }}>← Back</div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          {['Cart', 'Details', 'Payment'].map((step, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: i === 0 ? EP_GREEN : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  color: i === 0 ? EP_WHITE : EP_DIM,
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? EP_WHITE : EP_DIM }}>
                {step}
              </span>
              {i < 2 && (
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Cart item */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
          Your Cart
        </div>
        <div
          style={{
            background: EP_CARD_BG,
            border: `1px solid ${EP_GREEN}`,
            borderRadius: 14,
            padding: '20px 18px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>
                Male Hormonal Health Package
              </div>
              <div style={{ fontSize: 11, color: EP_DIM }}>30+ biomarkers · Doctor reviewed</div>
            </div>
            <div
              style={{
                fontSize: 22, fontWeight: 900, color: EP_GREEN,
                fontFamily: 'Space Mono, monospace',
              }}
            >
              $249
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div
          style={{
            background: EP_CARD_BG,
            border: `1px solid ${EP_BORDER}`,
            borderRadius: 14,
            padding: '20px 18px',
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>Order Summary</div>
          {[
            { label: 'Subtotal', value: '$249.00' },
            { label: 'GST (included)', value: '$22.64' },
            { label: 'Collection fee', value: 'Included' },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 12, color: EP_DIM, marginBottom: 8,
              }}
            >
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
          <div
            style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 16, fontWeight: 900, color: EP_WHITE,
              borderTop: `1px solid ${EP_BORDER}`,
              paddingTop: 12,
              marginTop: 8,
            }}
          >
            <span>Total</span>
            <span style={{ color: EP_GREEN, fontFamily: 'Space Mono, monospace' }}>$249.00</span>
          </div>
        </div>

        {/* Checkout button */}
        <div
          style={{
            background: EP_GREEN,
            color: EP_WHITE,
            fontWeight: 800,
            fontSize: 16,
            padding: '16px',
            borderRadius: 30,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Proceed to Checkout →
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 28 }}>
          {['🔒 Secure', '⚡ Instant', '✓ NATA'].map((badge, i) => (
            <span key={i} style={{ fontSize: 11, color: EP_DIM, fontWeight: 600 }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Payment methods */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: EP_DIM, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Accepted Payment
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {['Visa', 'MC', 'Amex', 'PayPal'].map((pm, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 6,
                  padding: '6px 14px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: EP_DIM,
                }}
              >
                {pm}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div
          style={{
            background: 'rgba(76,175,76,0.06)',
            border: `1px solid ${EP_BORDER}`,
            borderRadius: 12,
            padding: '16px',
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
            ✓ Book with confidence
          </div>
          <div style={{ fontSize: 11, color: EP_DIM, lineHeight: 1.5 }}>
            Doctor-reviewed results in 48 hours. 2,000+ collection centres nationwide.
          </div>
        </div>
      </div>
    </div>
  );
};

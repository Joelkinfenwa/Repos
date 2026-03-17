// Phone mockup frame for website screenshots
// Dark bezel, rounded corners, slight shadow, 3D tilt

import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';

interface PhoneMockupProps {
  src: string;
  /** Frame delay for entrance animation */
  delay?: number;
  /** Scroll amount in pixels (translateY on the inner image) */
  scrollY?: number;
  /** Extra style on outer container */
  style?: React.CSSProperties;
}

const PHONE_WIDTH = 380;
const PHONE_HEIGHT = 780;
const BEZEL = 12;
const RADIUS = 40;

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  src,
  delay = 0,
  scrollY = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - delay);

  // Subtle 3D tilt that slowly rotates
  const rotateY = interpolate(elapsed, [0, 120], [-4, 4], {
    extrapolateRight: 'clamp',
  });
  const rotateX = interpolate(elapsed, [0, 120], [2, -2], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        perspective: 1200,
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          borderRadius: RADIUS,
          background: '#1a1a1a',
          padding: BEZEL,
          boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(76,175,76,0.1)',
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: PHONE_WIDTH - BEZEL * 2,
            height: PHONE_HEIGHT - BEZEL * 2,
            borderRadius: RADIUS - BEZEL,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              position: 'absolute',
              top: -scrollY,
              left: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

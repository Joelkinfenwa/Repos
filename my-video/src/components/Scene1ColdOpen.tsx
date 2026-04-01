// Scene 1: COLD OPEN — "DECODE / YOURSELF"
// Letter-by-letter serif reveal, gold horizontal rule, minimal and powerful
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../lib/design';
import { fadeIn, lineDraw } from '../lib/animations';

export const Scene1ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const word1 = 'DECODE';
  const word2 = 'YOURSELF';

  // Each letter fades in 5 frames apart
  const letterOpacity = (index: number, wordDelay: number) => {
    return fadeIn(frame, wordDelay + index * 5, 12);
  };

  // Gold rule draws from center
  const ruleWidth = lineDraw(frame, 50, 40);

  // Subtitle fades in late
  const subOpacity = fadeIn(frame, 85, 20);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* DECODE */}
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: 110,
          fontWeight: 400,
          letterSpacing: 18,
          color: COLORS.cream,
          display: 'flex',
        }}
      >
        {word1.split('').map((char, i) => (
          <span key={i} style={{ opacity: letterOpacity(i, 10) }}>
            {char}
          </span>
        ))}
      </div>

      {/* Gold horizontal rule */}
      <div
        style={{
          width: `${ruleWidth * 3.6}px`,
          height: 1.5,
          backgroundColor: COLORS.gold,
          marginTop: 30,
          marginBottom: 30,
          opacity: ruleWidth > 0 ? 1 : 0,
        }}
      />

      {/* YOURSELF */}
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: 110,
          fontWeight: 400,
          letterSpacing: 18,
          color: COLORS.gold,
          display: 'flex',
        }}
      >
        {word2.split('').map((char, i) => (
          <span key={i} style={{ opacity: letterOpacity(i, 35) }}>
            {char}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 28,
          fontWeight: 300,
          color: COLORS.cream50,
          letterSpacing: 6,
          marginTop: 50,
          opacity: subOpacity,
          textTransform: 'uppercase',
        }}
      >
        Your blood tells a story
      </div>
    </div>
  );
};

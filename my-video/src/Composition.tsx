// Express Pathology — "DECODE YOURSELF" + Phone Scroll Campaign
// 1080x1920 | 30fps | 30 seconds | 9:16 vertical

import React from 'react';
import { Sequence } from 'remotion';
import { SCENES, COLORS } from './lib/design';
import { AnimatedBg } from './components/AnimatedBg';
import { GlobalParticles } from './components/GlobalParticles';
import { Scene1ColdOpen } from './components/Scene1ColdOpen';
import { Scene2PhoneScroll } from './components/Scene2PhoneScroll';
import { Scene3Expand } from './components/Scene3Expand';
import { Scene4Authority } from './components/Scene4Authority';
import { Scene5CTA } from './components/Scene5CTA';

export const UltimatePerformanceScreen: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
        fontFamily: 'Inter, Liberation Sans, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedBg />

      <Sequence
        from={SCENES.coldOpen.start}
        durationInFrames={SCENES.coldOpen.end - SCENES.coldOpen.start}
      >
        <Scene1ColdOpen />
      </Sequence>

      <Sequence
        from={SCENES.phoneScroll.start}
        durationInFrames={SCENES.phoneScroll.end - SCENES.phoneScroll.start}
      >
        <Scene2PhoneScroll />
      </Sequence>

      <Sequence
        from={SCENES.expand.start}
        durationInFrames={SCENES.expand.end - SCENES.expand.start}
      >
        <Scene3Expand />
      </Sequence>

      <Sequence
        from={SCENES.authority.start}
        durationInFrames={SCENES.authority.end - SCENES.authority.start}
      >
        <Scene4Authority />
      </Sequence>

      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <Scene5CTA />
      </Sequence>

      <GlobalParticles />
    </div>
  );
};

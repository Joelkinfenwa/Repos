// Express Pathology — "DECODE YOURSELF" Campaign
// 1080x1920 | 30fps | 30 seconds | 9:16 vertical

import React from 'react';
import { Sequence } from 'remotion';
import { SCENES, COLORS } from './lib/design';
import { AnimatedBg } from './components/AnimatedBg';
import { GlobalParticles } from './components/GlobalParticles';
import { Scene1ColdOpen } from './components/Scene1ColdOpen';
import { Scene2TheData } from './components/Scene2TheData';
import { Scene3Categories } from './components/Scene3Categories';
import { Scene4Process } from './components/Scene4Process';
import { Scene5Authority } from './components/Scene5Authority';
import { Scene6CTA } from './components/Scene6CTA';

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
        from={SCENES.theData.start}
        durationInFrames={SCENES.theData.end - SCENES.theData.start}
      >
        <Scene2TheData />
      </Sequence>

      <Sequence
        from={SCENES.categories.start}
        durationInFrames={SCENES.categories.end - SCENES.categories.start}
      >
        <Scene3Categories />
      </Sequence>

      <Sequence
        from={SCENES.process.start}
        durationInFrames={SCENES.process.end - SCENES.process.start}
      >
        <Scene4Process />
      </Sequence>

      <Sequence
        from={SCENES.authority.start}
        durationInFrames={SCENES.authority.end - SCENES.authority.start}
      >
        <Scene5Authority />
      </Sequence>

      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <Scene6CTA />
      </Sequence>

      <GlobalParticles />
    </div>
  );
};

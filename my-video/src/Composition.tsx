// Express Pathology — "YOU HAVE NO IDEA" Campaign
// 1080x1920 | 30fps | 35 seconds | 9:16 vertical

import React from 'react';
import { Sequence } from 'remotion';
import { SCENES, COLORS } from './lib/design';
import { AnimatedBg } from './components/AnimatedBg';
import { GlobalParticles } from './components/GlobalParticles';
import { Scene1ColdOpen } from './components/Scene1ColdOpen';
import { Scene2Problem } from './components/Scene2Problem';
import { Scene3Revelation } from './components/Scene3Revelation';
import { Scene4Shift } from './components/Scene4Shift';
import { Scene5HowItWorks } from './components/Scene5HowItWorks';
import { Scene6SocialProof } from './components/Scene6SocialProof';
import { Scene7CTA } from './components/Scene7CTA';

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
      {/* Animated background gradient — full duration */}
      <AnimatedBg />

      {/* Scene 1: COLD OPEN — 0-3s */}
      <Sequence
        from={SCENES.coldOpen.start}
        durationInFrames={SCENES.coldOpen.end - SCENES.coldOpen.start}
      >
        <Scene1ColdOpen />
      </Sequence>

      {/* Scene 2: PROBLEM — 3-8s */}
      <Sequence
        from={SCENES.problem.start}
        durationInFrames={SCENES.problem.end - SCENES.problem.start}
      >
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: REVELATION — 8-13s */}
      <Sequence
        from={SCENES.revelation.start}
        durationInFrames={SCENES.revelation.end - SCENES.revelation.start}
      >
        <Scene3Revelation />
      </Sequence>

      {/* Scene 4: THE SHIFT — 13-18s */}
      <Sequence
        from={SCENES.shift.start}
        durationInFrames={SCENES.shift.end - SCENES.shift.start}
      >
        <Scene4Shift />
      </Sequence>

      {/* Scene 5: HOW IT WORKS — 18-23s */}
      <Sequence
        from={SCENES.howItWorks.start}
        durationInFrames={SCENES.howItWorks.end - SCENES.howItWorks.start}
      >
        <Scene5HowItWorks />
      </Sequence>

      {/* Scene 6: SOCIAL PROOF — 23-26s */}
      <Sequence
        from={SCENES.socialProof.start}
        durationInFrames={SCENES.socialProof.end - SCENES.socialProof.start}
      >
        <Scene6SocialProof />
      </Sequence>

      {/* Scene 7: CTA — 26-35s */}
      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <Scene7CTA />
      </Sequence>

      {/* Ambient particles — full duration, on top */}
      <GlobalParticles />
    </div>
  );
};

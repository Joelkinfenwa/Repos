// Express Pathology — "Ultimate Performance Screen" Video Ad
// 1080x1920 | 30fps | 28 seconds | 9:16 vertical

import React from 'react';
import { Sequence } from 'remotion';
import { SCENES, COLORS } from './lib/design';
import { Scene1Hook } from './components/Scene1Hook';
import { Scene2TheNumber } from './components/Scene2TheNumber';
import { Scene3WhoItsFor } from './components/Scene3WhoItsFor';
import { Scene4HowItWorks } from './components/Scene4HowItWorks';
import { Scene5SocialProof } from './components/Scene5SocialProof';
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
      {/* Scene 1: HOOK — 0-3s */}
      <Sequence
        from={SCENES.hook.start}
        durationInFrames={SCENES.hook.end - SCENES.hook.start}
      >
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: THE NUMBER — 3-8s */}
      <Sequence
        from={SCENES.theNumber.start}
        durationInFrames={SCENES.theNumber.end - SCENES.theNumber.start}
      >
        <Scene2TheNumber />
      </Sequence>

      {/* Scene 3: WHO IT'S FOR — 8-13s */}
      <Sequence
        from={SCENES.whoItsFor.start}
        durationInFrames={SCENES.whoItsFor.end - SCENES.whoItsFor.start}
      >
        <Scene3WhoItsFor />
      </Sequence>

      {/* Scene 4: HOW IT WORKS — 13-18s */}
      <Sequence
        from={SCENES.howItWorks.start}
        durationInFrames={SCENES.howItWorks.end - SCENES.howItWorks.start}
      >
        <Scene4HowItWorks />
      </Sequence>

      {/* Scene 5: SOCIAL PROOF — 18-22s */}
      <Sequence
        from={SCENES.socialProof.start}
        durationInFrames={SCENES.socialProof.end - SCENES.socialProof.start}
      >
        <Scene5SocialProof />
      </Sequence>

      {/* Scene 6: CTA — 22-28s */}
      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <Scene6CTA />
      </Sequence>
    </div>
  );
};

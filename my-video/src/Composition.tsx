// Express Pathology — "The Tired Guy" Video Ad
// 1080x1920 | 30fps | 30 seconds | 9:16 vertical
//
// SCENE TIMING:
// 0:00 - 0:03  HOOK        — "You're tired. Every. Single. Day."
// 0:03 - 0:07  AGITATE     — Sleep/eat/train kinetic text → "Still exhausted by 2pm."
// 0:07 - 0:11  REFRAME     — "What if it's your blood?"
// 0:11 - 0:18  SHOW SITE   — Phone mockup zooms into screenshots
// 0:18 - 0:23  STATS       — Animated counters + biomarker cascade
// 0:23 - 0:27  SOCIAL PROOF — Checkmark trust points + checkout
// 0:27 - 0:30  CTA         — Price reveal, book now

import React from 'react';
import { Sequence } from 'remotion';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { SCENES, COLORS } from './lib/design';
import { Scene1Hook } from './components/Scene1Hook';
import { Scene2Agitate } from './components/Scene2Agitate';
import { Scene3Reframe } from './components/Scene3Reframe';
import { Scene4ShowSite } from './components/Scene4ShowSite';
import { Scene5Stats } from './components/Scene5Stats';
import { Scene6SocialProof } from './components/Scene6SocialProof';
import { Scene7CTA } from './components/Scene7CTA';
import { GridOverlay } from './components/GridOverlay';

// Load fonts
loadDMSans();
loadSpaceMono();

export const ExpressPathologyAd: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.bg,
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

      {/* Scene 2: AGITATE — 3-7s */}
      <Sequence
        from={SCENES.agitate.start}
        durationInFrames={SCENES.agitate.end - SCENES.agitate.start}
      >
        <Scene2Agitate />
      </Sequence>

      {/* Scene 3: REFRAME — 7-11s */}
      <Sequence
        from={SCENES.reframe.start}
        durationInFrames={SCENES.reframe.end - SCENES.reframe.start}
      >
        <Scene3Reframe />
      </Sequence>

      {/* Scene 4: SHOW THE SITE — 11-18s */}
      <Sequence
        from={SCENES.showSite.start}
        durationInFrames={SCENES.showSite.end - SCENES.showSite.start}
      >
        <Scene4ShowSite />
      </Sequence>

      {/* Scene 5: STATS — 18-23s */}
      <Sequence
        from={SCENES.stats.start}
        durationInFrames={SCENES.stats.end - SCENES.stats.start}
      >
        <Scene5Stats />
      </Sequence>

      {/* Scene 6: SOCIAL PROOF — 23-27s */}
      <Sequence
        from={SCENES.socialProof.start}
        durationInFrames={SCENES.socialProof.end - SCENES.socialProof.start}
      >
        <Scene6SocialProof />
      </Sequence>

      {/* Scene 7: CTA — 27-30s */}
      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <Scene7CTA />
      </Sequence>

      {/* Grid texture overlay — always visible */}
      <GridOverlay />
    </div>
  );
};

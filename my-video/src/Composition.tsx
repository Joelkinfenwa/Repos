// Express Pathology — "The Tired Guy" Meta Ad
// 1080x1920 | 30fps | 30 seconds | 9:16 vertical
//
// AUDIO TIMING MARKERS (for music/SFX overlay):
// 0:00 - 0:03  HOOK        — Impact hits on each word, bass drop
// 0:03 - 0:08  AGITATE     — Low drone, building tension
// 0:08 - 0:15  REFRAME     — Tonal shift at 0:11, mood lifts
// 0:15 - 0:22  SOLUTION    — Confident beat, subtle pulse
// 0:22 - 0:27  PROOF       — Trust-building pad
// 0:27 - 0:30  CTA         — Final beat, clean resolution

import React from 'react';
import { Sequence } from 'remotion';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { SCENES, COLORS } from './lib/design';
import { HookScene } from './components/HookScene';
import { AgitateScene } from './components/AgitateScene';
import { ReframeScene } from './components/ReframeScene';
import { SolutionScene } from './components/SolutionScene';
import { ProofScene } from './components/ProofScene';
import { CTAScene } from './components/CTAScene';
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
        <HookScene />
      </Sequence>

      {/* Scene 2: AGITATE — 3-8s */}
      <Sequence
        from={SCENES.agitate.start}
        durationInFrames={SCENES.agitate.end - SCENES.agitate.start}
      >
        <AgitateScene />
      </Sequence>

      {/* Scene 3: REFRAME — 8-15s */}
      <Sequence
        from={SCENES.reframe.start}
        durationInFrames={SCENES.reframe.end - SCENES.reframe.start}
      >
        <ReframeScene />
      </Sequence>

      {/* Scene 4: SOLUTION — 15-22s */}
      <Sequence
        from={SCENES.solution.start}
        durationInFrames={SCENES.solution.end - SCENES.solution.start}
      >
        <SolutionScene />
      </Sequence>

      {/* Scene 5: PROOF — 22-27s */}
      <Sequence
        from={SCENES.proof.start}
        durationInFrames={SCENES.proof.end - SCENES.proof.start}
      >
        <ProofScene />
      </Sequence>

      {/* Scene 6: CTA — 27-30s */}
      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.end - SCENES.cta.start}
      >
        <CTAScene />
      </Sequence>

      {/* Grid texture overlay — always visible */}
      <GridOverlay />
    </div>
  );
};

// Express Pathology — Website Walkthrough Video
// 1080x1920 | 30fps | 45 seconds | 9:16 vertical
//
// SCENE TIMING:
// 0:00 - 0:05  HOOK              — Big text reveal, "Something feels off"
// 0:05 - 0:12  WEBSITE INTRO     — Mock browser with Express Pathology site
// 0:12 - 0:22  PACKAGE SHOWCASE  — Male Hormonal Health Package details
// 0:22 - 0:30  RESULTS PREVIEW   — Mock results report with doctor stamp
// 0:30 - 0:38  HOW IT WORKS      — Three-step process cards
// 0:38 - 0:45  CTA               — Price, branding, book now

import React from 'react';
import { Sequence } from 'remotion';
import { loadFont as loadDMSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';
import { SCENES, COLORS } from './lib/design';
import { HookScene } from './components/HookScene';
import { WebsiteIntroScene } from './components/WebsiteIntroScene';
import { PackageShowcaseScene } from './components/PackageShowcaseScene';
import { ResultsPreviewScene } from './components/ResultsPreviewScene';
import { HowItWorksScene } from './components/HowItWorksScene';
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
      {/* Scene 1: HOOK — 0-5s */}
      <Sequence
        from={SCENES.hook.start}
        durationInFrames={SCENES.hook.end - SCENES.hook.start}
      >
        <HookScene />
      </Sequence>

      {/* Scene 2: WEBSITE INTRO — 5-12s */}
      <Sequence
        from={SCENES.websiteIntro.start}
        durationInFrames={SCENES.websiteIntro.end - SCENES.websiteIntro.start}
      >
        <WebsiteIntroScene />
      </Sequence>

      {/* Scene 3: PACKAGE SHOWCASE — 12-22s */}
      <Sequence
        from={SCENES.packageShowcase.start}
        durationInFrames={SCENES.packageShowcase.end - SCENES.packageShowcase.start}
      >
        <PackageShowcaseScene />
      </Sequence>

      {/* Scene 4: RESULTS PREVIEW — 22-30s */}
      <Sequence
        from={SCENES.resultsPreview.start}
        durationInFrames={SCENES.resultsPreview.end - SCENES.resultsPreview.start}
      >
        <ResultsPreviewScene />
      </Sequence>

      {/* Scene 5: HOW IT WORKS — 30-38s */}
      <Sequence
        from={SCENES.howItWorks.start}
        durationInFrames={SCENES.howItWorks.end - SCENES.howItWorks.start}
      >
        <HowItWorksScene />
      </Sequence>

      {/* Scene 6: CTA — 38-45s */}
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

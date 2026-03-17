// Voiceover lines mapped to scene timing
// Audio files go in public/vo/scene-{n}.mp3

import { SCENES } from './design';

export interface VoiceoverLine {
  file: string;
  startFrame: number;
  durationFrames: number;
  text: string;
}

export const VOICEOVER: VoiceoverLine[] = [
  {
    file: 'vo/scene-1.mp3',
    startFrame: SCENES.hook.start,
    durationFrames: SCENES.hook.end - SCENES.hook.start,
    text: "You're tired. Every. Single. Day.",
  },
  {
    file: 'vo/scene-2.mp3',
    startFrame: SCENES.agitate.start,
    durationFrames: SCENES.agitate.end - SCENES.agitate.start,
    text: 'You sleep seven hours. You eat clean. You train four times a week. Still exhausted by 2pm.',
  },
  {
    file: 'vo/scene-3.mp3',
    startFrame: SCENES.reframe.start,
    durationFrames: SCENES.reframe.end - SCENES.reframe.start,
    text: "What if it's not your discipline? What if it's your blood?",
  },
  {
    file: 'vo/scene-4.mp3',
    startFrame: SCENES.showSite.start,
    durationFrames: SCENES.showSite.end - SCENES.showSite.start,
    text: 'Express Pathology. Over thirty biomarkers tested. No GP referral needed. Results in forty-eight hours.',
  },
  {
    file: 'vo/scene-5.mp3',
    startFrame: SCENES.stats.start,
    durationFrames: SCENES.stats.end - SCENES.stats.start,
    text: 'Five thousand Australians tested. Four-point-six star rating. Two thousand collection centres nationwide.',
  },
  {
    file: 'vo/scene-6.mp3',
    startFrame: SCENES.socialProof.start,
    durationFrames: SCENES.socialProof.end - SCENES.socialProof.start,
    text: 'Doctor-reviewed results. NATA-accredited laboratories. The same labs your GP uses.',
  },
  {
    file: 'vo/scene-7.mp3',
    startFrame: SCENES.cta.start,
    durationFrames: SCENES.cta.end - SCENES.cta.start,
    text: 'Male Hormonal Package. Two-forty-nine. No referral needed. Check your levels today at expresspathology.com.au.',
  },
];

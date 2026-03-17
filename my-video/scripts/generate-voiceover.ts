#!/usr/bin/env npx tsx
/**
 * Generate voiceover MP3s using OpenAI TTS API.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-voiceover.ts
 *
 * Outputs to public/vo/scene-{1..7}.mp3
 * Voice: "onyx" (deep, calm male) — change below if needed.
 */

import fs from 'fs';
import path from 'path';

const VOICE = 'onyx'; // Options: alloy, echo, fable, onyx, nova, shimmer
const MODEL = 'tts-1-hd'; // tts-1 for faster/cheaper, tts-1-hd for higher quality
const SPEED = 1.0;

const LINES: { file: string; text: string }[] = [
  {
    file: 'scene-1.mp3',
    text: "You're tired. Every. Single. Day.",
  },
  {
    file: 'scene-2.mp3',
    text: 'You sleep seven hours. You eat clean. You train four times a week. Still exhausted by 2pm.',
  },
  {
    file: 'scene-3.mp3',
    text: "What if it's not your discipline? What if... it's your blood?",
  },
  {
    file: 'scene-4.mp3',
    text: 'Express Pathology. Over thirty biomarkers tested. No GP referral needed. Results in forty-eight hours.',
  },
  {
    file: 'scene-5.mp3',
    text: 'Five thousand Australians tested. Four-point-six star rating. Two thousand collection centres nationwide.',
  },
  {
    file: 'scene-6.mp3',
    text: 'Doctor-reviewed results. NATA-accredited laboratories. The same labs your GP uses.',
  },
  {
    file: 'scene-7.mp3',
    text: 'Male Hormonal Package. Two-forty-nine. No referral needed. Check your levels today at expresspathology.com.au.',
  },
];

async function generateAudio(text: string, outputPath: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Set OPENAI_API_KEY environment variable');
  }

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: text,
      voice: VOICE,
      speed: SPEED,
      response_format: 'mp3',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI TTS error (${res.status}): ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  const outDir = path.resolve(__dirname, '..', 'public', 'vo');
  fs.mkdirSync(outDir, { recursive: true });

  for (const line of LINES) {
    const outPath = path.join(outDir, line.file);
    console.log(`Generating: ${line.file}`);
    await generateAudio(line.text, outPath);
  }

  console.log('\nDone! All voiceover files saved to public/vo/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

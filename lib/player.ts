import { writeFileSync } from 'node:fs';

import * as playSound from 'play-sound';

const player = playSound();

export function play(audioBuffer: Buffer) {
  try {
    writeFileSync('temp_audio.mp3', audioBuffer);
    player.play('temp_audio.mp3');
  } catch (error: any) {
    console.error('[ERROR] playing audio failed:', error.message);
  }
}

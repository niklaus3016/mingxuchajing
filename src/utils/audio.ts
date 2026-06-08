/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Gentle Zen Bow Chime Synthesizer
export function playZenChime(enabled: boolean) {
  if (!enabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Frequencies representing a harmonious bell set (fundamental + sweet overtones)
    const baseFreq = 440; // A4
    const partials = [1.0, 1.5, 2.0, 2.61, 3.5, 4.4];
    const amplitudes = [0.5, 0.25, 0.15, 0.1, 0.05, 0.02];
    const decays = [1.8, 1.5, 1.2, 0.8, 0.6, 0.4];

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.6, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
    masterGain.connect(ctx.destination);

    partials.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Slightly detune to give a natural organic texture
      osc.frequency.setValueAtTime(baseFreq * ratio + (i * 1.2), now);
      osc.type = i === 0 ? 'sine' : 'sine';

      gainNode.gain.setValueAtTime(amplitudes[i], now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + decays[i]);

      osc.connect(gainNode);
      gainNode.connect(masterGain);

      osc.start(now);
      osc.stop(now + 2.5);
    });

    // Also trigger sound feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  } catch (e) {
    console.warn('Audio context playback failed or was blocked by browser policies: ', e);
  }
}

// Low click feedback for buttons
export function playClickSound(enabled: boolean) {
  if (!enabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
    osc.type = 'triangle';

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    // Fail silently
  }
}

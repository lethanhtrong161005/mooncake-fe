/**
 * Web Audio API luxury sound generator for notifications.
 * Synthesizes a golden bell chime without requiring external mp3 assets.
 */
export const playLuxuryChime = () => {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(698.46, ctx.currentTime); // F5
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6 harmonic

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1.2);
    osc2.stop(ctx.currentTime + 1.2);
  } catch {
    // Graceful no-op if audio context blocked by browser autoplay policy
  }
};


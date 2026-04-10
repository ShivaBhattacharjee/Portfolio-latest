import { TapticKit } from "taptickit";

let taptic = null;

function getTaptic() {
  if (typeof window === "undefined") return null;
  if (!taptic) taptic = new TapticKit();
  return taptic;
}

export function vibrate(duration = 15) {
  try {
    const t = getTaptic();
    if (t) t.trigger("medium");
  } catch {
    // silently ignore
  }
}

export function vibrateLight() {
  try {
    const t = getTaptic();
    if (t) t.trigger("light");
  } catch {
    // silently ignore
  }
}

export function vibrateSelection() {
  try {
    const t = getTaptic();
    if (t) t.trigger("selection");
  } catch {
    // silently ignore
  }
}

/**
 * Play a short mechanical click sound using Web Audio API.
 * Uses a singleton AudioContext to avoid browser limits on multiple instances.
 */
let sharedCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AudioCtx();
  }
  return sharedCtx;
}

export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const duration = 0.05;

  ctx.resume().then(() => {
    const now = ctx.currentTime;

    // Noise burst — the "body" of the click
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 6);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 4000;
    bandpass.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // Transient pop — the sharp "snap" on attack
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.015);

    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.015);
  });
}

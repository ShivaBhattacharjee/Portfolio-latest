/**
 * Trigger haptic feedback.
 * - Android: uses Vibration API
 * - iOS: toggles a hidden <input type="checkbox" switch> to invoke Taptic Engine
 */
let hiddenSwitch = null;

function getHiddenSwitch() {
  if (typeof document === "undefined") return null;
  if (hiddenSwitch) return hiddenSwitch;

  hiddenSwitch = document.createElement("input");
  hiddenSwitch.type = "checkbox";
  hiddenSwitch.setAttribute("switch", "");
  hiddenSwitch.style.cssText =
    "position:fixed;top:-100px;left:-100px;opacity:0;pointer-events:none;width:0;height:0;";
  document.body.appendChild(hiddenSwitch);
  return hiddenSwitch;
}

export function vibrate(duration = 15) {
  // Android vibration — cancel any ongoing vibration first so rapid taps each produce feedback
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(0);
    navigator.vibrate(duration);
    return;
  }

  // iOS haptic via hidden checkbox switch trick
  try {
    const sw = getHiddenSwitch();
    if (sw) {
      sw.checked = !sw.checked;
    }
  } catch {
    // silently ignore
  }
}

/**
 * Play a short click sound using Web Audio API.
 */
export function playClickSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);

    oscillator.onended = () => ctx.close();
  } catch {
    // Audio not available, silently ignore
  }
}

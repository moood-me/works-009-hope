// Each firefly wanders slowly and never in step (smooth noise of its own, about half a metre across, a third up and
// down) and blinks as the design's (0.3 + 0.7 · max(0, sin(t·f + phase)), its point brighter with it). The first one
// goes to her knee as `rest` rises and stays there, glowing.
const D = 7.2;
const A = 16 / 9;
const anim = e.anim;
// where the first was painted (fireflies.js): its layer is moved from there
const x0 = (A * 0.55 - A / 2) * D;
const y0 = (0.65 - 0.6) * D - 1.7;
const rest = anim.ease.inOut(anim.clamp(e.state.rest || 0, 0, 1));
for (let f = 0; f < 16; f++) {
  const L = e.layer('f' + f);
  let dx = anim.drift(e.t * 0.09, f * 3 + 1) * 0.5;
  let dy = anim.drift(e.t * 0.11, f * 3 + 2) * 0.32;
  if (f === 0 && rest > 0) {
    const knee = e.point('girl#knee');
    if (knee) {
      dx = anim.mix(dx, knee[0] - x0, rest);
      dy = anim.mix(dy, knee[1] - y0, rest);
    }
  }
  L.x = dx;
  L.y = dy;
  const fr = 1 + anim.hash(f, 11) * 2;
  const ph = anim.hash(f, 12) * 6;
  const a = 0.3 + 0.7 * Math.max(0, Math.sin(e.t * fr + ph));
  L.alpha = 0.5 + 0.5 * a;
  e.glow('f' + f, a);
}

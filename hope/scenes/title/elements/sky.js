// The night over the hill, the design's: dark at the top, the palest band at 0.62 of the frame, dark again
// toward the bottom (the gradient runs over the whole frame, behind the hill too). A pale aura in the
// middle of the sky (layer `aura`) breathes slowly (animate).
const L = -0.7;
const T = -0.6;
const R = e.aspect + 0.7;
const B = 1.3;
const gr = g.createLinearGradient(0, 0, 0, 1);
gr.addColorStop(0, '#090c11');
gr.addColorStop(0.62, '#1a2029');
gr.addColorStop(1, '#0a0c10');
g.fillStyle = gr;
g.fillRect(L, T, R - L, B - T);

e.layer('aura', {}, c => {
  const cx = e.aspect / 2;
  const a = c.createRadialGradient(cx, 0.4, 0, cx, 0.4, 0.55);
  a.addColorStop(0, 'rgba(190,205,225,0.08)');
  a.addColorStop(1, 'rgba(190,205,225,0)');
  c.fillStyle = a;
  c.fillRect(cx - 0.56, 0.4 - 0.56, 1.12, 1.12);
});

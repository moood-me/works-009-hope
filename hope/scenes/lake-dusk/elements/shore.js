// The far shore, the design's: a band of small dark spiky trees standing on the horizon, 0.01–0.04 of the frame
// tall, on a strip 0.008 of it — left of 0.42 and right of 0.83 of the frame's width, open water between. Turned into
// metres 2 km off (a frame's height is 2000 m there; a design pixel 1.85 m), running on past the frame's sides.
// The lake mirrors it.
const D = 2000;
const A = 16 / 9;
const PXM = D / 1080;
const across = fx => (fx * A - A / 2) * D;
g.fillStyle = '#3a3a4b';
g.beginPath();
let fx = -0.4;
while (fx < 1.4) {
  if (fx < 0.42 || fx > 0.83) {
    const x = across(fx);
    const h = D * (0.01 + e.rnd() * 0.03);
    const w = (3 + e.rnd() * 5) * PXM;
    g.moveTo(x - w, 0);
    g.lineTo(x + w, 0);
    g.lineTo(x, -h);
    g.closePath();
    g.rect(x - w, -D * 0.008, w * 2 + 2 * PXM, D * 0.008);
  }
  fx += (3 + e.rnd() * 7) / 1920;
}
g.fill();

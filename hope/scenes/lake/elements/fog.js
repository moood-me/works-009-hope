// Seven soft bands of fog lying over the far water, each its own layer drifting right at its own slow pace
// (the original's 4–12 px a second at 900 px tall: here 4–12 m/s at 900 m) and wrapping round the box.
// They rest on the water; the lake mirrors them, so each band sits on its own reflection.
const area = e.area;
const W = area[2] - area[0];
const D = 900;
const A = e.lib.ASPECT;

for (let i = 0; i < 7; i++) {
  const x = area[0] + e.rnd() * W;
  const y = -D * (0.005 + e.rnd() * 0.043);
  const rx = A * D * (0.2 + e.rnd() * 0.25);
  const ry = D * (0.03 + e.rnd() * 0.03);
  const v = 4 + e.rnd() * 8;
  const a = 0.1 + e.rnd() * 0.1;
  e.layer('band' + i, { drift: [v, 0] }, f => {
    for (const shift of [-W, 0, W]) {
      f.save();
      f.translate(x + shift, y);
      f.scale(1, ry / rx);
      const gr = f.createRadialGradient(0, 0, 0, 0, 0, rx);
      gr.addColorStop(0, 'rgba(223,226,255,' + a + ')');
      gr.addColorStop(1, 'rgba(223,226,255,0)');
      f.fillStyle = gr;
      f.fillRect(-rx, -rx, 2 * rx, 2 * rx);
      f.restore();
    }
  });
}

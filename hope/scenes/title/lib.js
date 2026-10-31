// Shared by the fog: the design's drifting fog blobs (fogs/drawFogs) — soft ellipses, each its own layer drifting
// right at its own pace and wrapping round the card — laid out in the frame's terms and turned into metres on a
// card D metres off whose anchor stands `drop` metres under the ground (eye 1.7 m, horizon 0.7).
const A = 16 / 9;

// o: { D, drop, y (the band's middle, a share of the frame's height), ry (the blobs' height, a share), n, pace (×
// the design's 4–14 px a second at 1080), alpha (× the design's 0.05–0.13), colour 'r,g,b' }
function fog(g, e, o) {
  const area = e.area;
  const W = area[2] - area[0];
  const toY = fy => -(o.drop + 1.7 - (fy - 0.7) * o.D);
  for (let i = 0; i < o.n; i++) {
    const x = area[0] + e.rnd() * W;
    const fy = o.y + (e.rnd() - 0.5) * 0.06;
    const rx = A * o.D * (0.25 + e.rnd() * 0.3);
    const ry = o.D * o.ry * (0.6 + e.rnd() * 0.8);
    const v = (4 + e.rnd() * 10) * o.pace / 1080 * o.D;
    const a = (0.05 + e.rnd() * 0.08) * o.alpha;
    const y = toY(fy);
    e.layer('blob' + i, { drift: [v, 0] }, c => {
      for (const shift of [-W, 0, W]) {
        c.save();
        c.translate(x + shift, y);
        c.scale(1, ry / rx);
        const gr = c.createRadialGradient(0, 0, 0, 0, 0, rx);
        gr.addColorStop(0, 'rgba(' + o.colour + ',' + a + ')');
        gr.addColorStop(1, 'rgba(' + o.colour + ',0)');
        c.fillStyle = gr;
        c.fillRect(-rx, -rx, 2 * rx, 2 * rx);
        c.restore();
      }
    });
  }
}

return { fog };

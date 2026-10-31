// The snow seen from above (origin at 2000 m, y toward the viewer). Far off, under the trees, it is the grey
// of the fog; the clearing before us is the original's ground: pale near the feet, greying with distance,
// its far rim wavering. His footprints come from behind us to where he stands (the original's path, its
// screen points turned into metres on the snow).
const lib = e.lib;
const toY = d => 2000 - d;
g.fillStyle = '#7f8997';
g.fillRect(-4000, -2000, 8000, 4000);

const n = lib.noise1D(4);
const gr = g.createLinearGradient(0, toY(17), 0, toY(4.5));
gr.addColorStop(0, '#7d8795');
gr.addColorStop(0.68, '#a1aab6');
gr.addColorStop(1, '#c4cbd4');
g.fillStyle = gr;
g.beginPath();
g.moveTo(-200, 2000);
for (let x = -200; x <= 200; x += 0.5) {
  g.lineTo(x, toY(16 + 3 * (n(x / 18) - 0.5)));
}
g.lineTo(200, 2000);
g.closePath();
g.fill();

const A = lib.ASPECT;
g.fillStyle = 'rgba(60,70,88,0.3)';
for (let i = 1; i < 30; i++) {
  const k = i / 29;
  const sx = A * (0.5 + 0.28 * k * k + 0.03 * Math.sin(k * 3));
  const sy = 0.8 + 0.24 * k;
  const d = lib.EYE / (sy - lib.HORIZON);
  const across = (sx - A / 2) * d + (i % 2 ? 1 : -1) * 0.06;
  g.beginPath();
  g.ellipse(across, toY(d), 0.05, 0.06, 0, 0, Math.PI * 2);
  g.fill();
}

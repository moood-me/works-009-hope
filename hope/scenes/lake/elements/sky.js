// The night sky in stage heights: the original's gradient down to the horizon (0.58), the low moon with
// its craters, and the stars on a layer of their own. The sky's shader twinkles the stars and draws the
// shooting star; the moon's halo is its glow (e.light), which the lake also draws out into a path.
const A = e.aspect;
const L = -0.7;
const T = -0.6;
const R = A + 0.7;
const B = 1.3;
const HZ = 0.58;

const gr = g.createLinearGradient(0, 0, 0, HZ);
gr.addColorStop(0, '#05070f');
gr.addColorStop(0.55, '#121831');
gr.addColorStop(0.88, '#2b2a48');
gr.addColorStop(1, '#433a5c');
g.fillStyle = gr;
g.fillRect(L, T, R - L, B - T);

const mx = 0.3 * A;
const my = 0.28;
const mr = 0.045;
g.fillStyle = '#ece8d8';
g.beginPath();
g.arc(mx, my, mr, 0, Math.PI * 2);
g.fill();
g.fillStyle = 'rgba(110,110,105,0.13)';
const craters = [[-0.3, -0.2, 0.26], [0.28, 0.12, 0.18], [-0.05, 0.4, 0.14], [0.4, -0.36, 0.1], [-0.45, 0.25, 0.08]];
for (const c of craters) {
  g.beginPath();
  g.arc(mx + c[0] * mr, my + c[1] * mr, c[2] * mr, 0, Math.PI * 2);
  g.fill();
}
e.at(mx, my, 'moon');
e.light(mx, my, 0.35, '#d7dcf5', 0.5, 'moon');

// Stars: each one's colour carries its twinkle — red its phase, green its pace — and the shader
// shows them all in #e2e5ff. Denser toward the top, as the original; none near the moon.
e.layer('stars', {}, s => {
  const star = (x, y) => {
    if (Math.hypot(x - mx, y - my) < mr * 4) {
      return;
    }
    const r = (0.45 + Math.pow(e.rnd(), 4) * 1.8) / 900;
    const phase = Math.floor(e.rnd() * 255);
    const pace = Math.floor(e.rnd() * 255);
    s.fillStyle = 'rgb(' + phase + ',' + pace + ',255)';
    s.beginPath();
    s.arc(x, y, r, 0, Math.PI * 2);
    s.fill();
  };
  const width = (A + 0.8) / A;
  const below = Math.round(345 * width);
  for (let i = 0; i < below; i++) {
    star(-0.4 + e.rnd() * (A + 0.8), Math.pow(e.rnd(), 1.5) * HZ * 0.92);
  }
  const above = Math.round(120 * width);
  for (let i = 0; i < above; i++) {
    star(-0.4 + e.rnd() * (A + 0.8), -0.55 + e.rnd() * 0.55);
  }
});

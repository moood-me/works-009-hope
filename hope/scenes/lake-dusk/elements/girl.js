// The girl at the pier's end, legs dangling over the water, head bowed toward the sun: the design's 'dangle' pose
// (a girl: her hair), in body units × 1.36 m (the design's 0.14 of the frame at 9.71 m). Her anchor is her feet's
// level, 0.5 m under the seat, so all of her is painted above it (SY lifts every shape onto the seat). Layers: each
// shin with its foot (swinging from the knee, out of step) and the upper body breathing about her hips (animate).
// Her scarf is its own element (scarf). Points: her head; her foot (where the drops fall from).
const S = 1.36;
const SY = -0.5;
const INK = '#0d0c13';
const P = (x, y) => [x * S, y * S + SY];
const pen = c => {
  c.fillStyle = INK;
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineJoin = 'round';
};
const limb = (c, a, b, w) => {
  c.lineWidth = w * S;
  c.beginPath();
  c.moveTo(a[0], a[1]);
  c.lineTo(b[0], b[1]);
  c.stroke();
};
const oval = (c, at, rx, ry, rot) => {
  c.beginPath();
  c.ellipse(at[0], at[1], rx * S, ry * S, rot, 0, Math.PI * 2);
  c.fill();
};

pen(g);
const hips = P(0, -0.06);
oval(g, P(0.02, -0.06), 0.14, 0.07, 0);
const legs = [['leg_far', 0.9, 0], ['leg_near', 0, 1]];
for (const leg of legs) {
  const kx = 0.27 - leg[2] * 0.02;
  const ky = -0.03;
  limb(g, hips, P(kx, ky), 0.15);
  e.layer(leg[0], { pivot: P(kx, ky) }, c => {
    pen(c);
    limb(c, P(kx, ky), P(kx + 0.03, ky + 0.33), 0.11);
    oval(c, P(kx + 0.06, ky + 0.36), 0.06, 0.03, 0);
  });
}

const shx = 0.07;
const shy = -0.56;
const hdx = 0.17;
const hdy = -0.69;
e.layer('upper', { pivot: hips }, c => {
  pen(c);
  c.lineWidth = 0.25 * S;
  c.beginPath();
  c.moveTo(hips[0], hips[1]);
  const q = P(-0.1, -0.34);
  const sh = P(shx, shy);
  c.quadraticCurveTo(q[0], q[1], sh[0], sh[1]);
  c.stroke();
  limb(c, P(shx, shy + 0.03), P(0.16, -0.04), 0.08);
  limb(c, P(shx, shy), P(hdx - 0.03, hdy + 0.05), 0.1);
  const hd = P(hdx, hdy);
  c.beginPath();
  c.arc(hd[0], hd[1], 0.13 * S, 0, Math.PI * 2);
  c.fill();
  oval(c, P(hdx - 0.07, hdy + 0.08), 0.1, 0.18, 0.5);
});

const head = P(hdx, hdy);
e.at(head[0], head[1]);
e.at(head[0], head[1], 'head');
const foot = P(0.33, 0.33);
e.at(foot[0], foot[1], 'foot');

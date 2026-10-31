// The girl sitting on the bank by the tree, knees pulled up and hugged, facing left toward the hazy moon: the
// design's 'hug' pose (a girl: her hair), in body units × 0.93 m (the design's 0.15 of the frame at 6.2 m). Hips,
// legs and feet are the still painting; the body, arm, neck, head and hair a layer breathing about her hips
// (animate). A soft cold glow about her (the design's, #8caaaa) is a glow only (light "aura": it lights nothing).
// Her scarf's end is its own element (scarf). Points: her head, her knee (where a firefly settles).
const S = 0.93;
const INK = '#020404';
g.fillStyle = INK;
g.strokeStyle = INK;
g.lineCap = 'round';
g.lineJoin = 'round';
const limb = (c, x0, y0, x1, y1, w) => {
  c.lineWidth = w * S;
  c.beginPath();
  c.moveTo(x0 * S, y0 * S);
  c.lineTo(x1 * S, y1 * S);
  c.stroke();
};
const oval = (c, x, y, rx, ry, rot) => {
  c.beginPath();
  c.ellipse(x * S, y * S, rx * S, ry * S, rot, 0, Math.PI * 2);
  c.fill();
};

e.light(-0.15 * S, -0.4 * S, 1.8 * S, '#8caaaa', 0.17, 'aura', 'linear');

const hx = 0;
const hy = -0.1;
const kx = -0.34;
const ky = -0.4;
const fx = -0.42;
const fy = -0.03;
oval(g, -0.04, -0.08, 0.17, 0.09, 0);
limb(g, hx - 0.05, hy, kx, ky, 0.17);
limb(g, kx, ky, fx, fy, 0.13);
oval(g, fx - 0.04, fy, 0.08, 0.035, 0);

const shx = -0.02;
const shy = -0.58;
const hdx = -0.15;
const hdy = -0.7;
e.layer('upper', { pivot: [0, hy * S] }, c => {
  c.fillStyle = INK;
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.lineWidth = 0.27 * S;
  c.beginPath();
  c.moveTo(hx * S, hy * S);
  c.quadraticCurveTo(0.1 * S, -0.36 * S, shx * S, shy * S);
  c.stroke();
  c.lineWidth = 0.085 * S;
  c.beginPath();
  c.moveTo((shx - 0.04) * S, (shy + 0.04) * S);
  c.quadraticCurveTo((kx + 0.02) * S, (shy + 0.02) * S, (kx + 0.02) * S, (ky + 0.06) * S);
  c.stroke();
  limb(c, shx, shy, hdx + 0.03, hdy + 0.05, 0.1);
  c.beginPath();
  c.arc(hdx * S, hdy * S, 0.13 * S, 0, Math.PI * 2);
  c.fill();
  oval(c, hdx + 0.07, hdy + 0.08, 0.1, 0.18, -0.5);
});

e.at(hdx * S, hdy * S);
e.at(hdx * S, hdy * S, 'head');
e.at(-0.32 * S, -0.47 * S - 0.0028 * 6.2, 'knee');

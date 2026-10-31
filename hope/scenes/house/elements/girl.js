// The girl on the sill, knees pulled up and hugged, facing left: the original's silhouette (Hope.childHuggingKnees,
// #030407), in body units × 0.86 m (the original's 0.42 of the window's height at 3.25 m). Legs are the still
// painting; the body, arm, head and hair a layer breathing about the seat (animate).
const S = 0.86;
const INK = '#030407';
const pen = c => {
  c.fillStyle = INK;
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineJoin = 'round';
};
const limb = (c, w, p) => {
  c.lineWidth = w * S;
  c.beginPath();
  c.moveTo(p[0] * S, p[1] * S);
  if (p.length === 6) {
    c.quadraticCurveTo(p[2] * S, p[3] * S, p[4] * S, p[5] * S);
  } else {
    c.lineTo(p[2] * S, p[3] * S);
  }
  c.stroke();
};
pen(g);
limb(g, 0.16, [0.0, -0.08, -0.28, -0.4]);
limb(g, 0.11, [-0.28, -0.4, -0.33, -0.05]);
limb(g, 0.075, [-0.33, -0.04, -0.43, -0.03]);
e.layer('upper', { pivot: [0, 0] }, c => {
  pen(c);
  c.beginPath();
  c.moveTo(0.13 * S, -0.02 * S);
  c.bezierCurveTo(0.22 * S, -0.22 * S, 0.18 * S, -0.46 * S, 0.05 * S, -0.6 * S);
  c.lineTo(-0.08 * S, -0.57 * S);
  c.bezierCurveTo(-0.1 * S, -0.4 * S, -0.06 * S, -0.2 * S, -0.04 * S, -0.06 * S);
  c.closePath();
  c.fill();
  limb(c, 0.075, [0.02, -0.52, -0.16, -0.46, -0.31, -0.36]);
  c.beginPath();
  c.arc(-0.13 * S, -0.68 * S, 0.1 * S, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.moveTo(-0.22 * S, -0.73 * S);
  c.quadraticCurveTo(-0.15 * S, -0.82 * S, -0.04 * S, -0.77 * S);
  c.quadraticCurveTo(0.02 * S, -0.69 * S, 0.0, -0.6 * S);
  c.lineTo(-0.08 * S, -0.62 * S);
  c.closePath();
  c.fill();
});
e.at(-0.13 * S, -0.68 * S);
e.at(-0.13 * S, -0.68 * S, 'head');

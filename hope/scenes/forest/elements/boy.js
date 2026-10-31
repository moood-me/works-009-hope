// The boy, standing with his back to us: the original's silhouette (Hope.boyStanding) in body units, scaled
// to his 0.94 m (the original's 0.1 of the frame at 9.4 m). Legs and boots are the still painting; the coat
// breathes (scaled from its hem), the head with its hat and the scarf round his neck rise with each breath.
// The scarf's flying ends are their own element (scarf).
const S = 0.94;
const INK = '#141820';
const RED = '#a8342b';
const pen = (c, colour) => {
  c.fillStyle = colour;
  c.strokeStyle = colour;
  c.lineCap = 'round';
  c.lineJoin = 'round';
};
const limb = (c, w, x0, y0, x1, y1) => {
  c.lineWidth = w * S;
  c.beginPath();
  c.moveTo(x0 * S, y0 * S);
  c.lineTo(x1 * S, y1 * S);
  c.stroke();
};
const disc = (c, x, y, r) => {
  c.beginPath();
  c.arc(x * S, y * S, r * S, 0, Math.PI * 2);
  c.fill();
};

pen(g, INK);
limb(g, 0.1, -0.06, -0.36, -0.07, -0.03);
limb(g, 0.1, 0.06, -0.36, 0.07, -0.03);
for (const bx of [-0.075, 0.075]) {
  g.beginPath();
  g.ellipse(bx * S, -0.02 * S, 0.06 * S, 0.03 * S, 0, 0, Math.PI * 2);
  g.fill();
}

e.layer('coat', { pivot: [0, -0.32 * S] }, c => {
  pen(c, INK);
  c.beginPath();
  c.moveTo(-0.11 * S, -0.75 * S);
  c.quadraticCurveTo(-0.17 * S, -0.73 * S, -0.17 * S, -0.64 * S);
  c.lineTo(-0.2 * S, -0.32 * S);
  c.lineTo(0.2 * S, -0.32 * S);
  c.lineTo(0.17 * S, -0.64 * S);
  c.quadraticCurveTo(0.17 * S, -0.73 * S, 0.11 * S, -0.75 * S);
  c.closePath();
  c.fill();
  limb(c, 0.08, -0.16, -0.66, -0.21, -0.42);
  limb(c, 0.08, 0.16, -0.66, 0.21, -0.42);
});

e.layer('head', {}, c => {
  pen(c, INK);
  disc(c, 0, -0.86, 0.11);
  c.beginPath();
  c.arc(0, -0.88 * S, 0.12 * S, Math.PI, 0);
  c.fill();
  disc(c, 0, -1.01, 0.045);
  pen(c, RED);
  limb(c, 0.065, -0.1, -0.76, 0.1, -0.76);
});

e.at(0, -0.86 * S);
e.at(0, -0.86 * S, 'head');

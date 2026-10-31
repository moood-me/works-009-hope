// The child standing on the crest, the design's 'stand' silhouette (a girl: her hair), one arm out holding a
// little warm light: a bright core and a wide faint halo (two glows), breathing in animate. Body units ×1.045 m.
const S = 1.045;
const INK = '#07090c';
g.fillStyle = INK;
g.strokeStyle = INK;
g.lineCap = 'round';
g.lineJoin = 'round';
const limb = (x0, y0, x1, y1, w) => {
  g.lineWidth = w * S;
  g.beginPath();
  g.moveTo(x0 * S, y0 * S);
  g.lineTo(x1 * S, y1 * S);
  g.stroke();
};
limb(-0.05, 0, 0, -0.45, 0.09);
limb(0.05, 0, 0, -0.45, 0.09);
g.beginPath();
g.moveTo(-0.14 * S, -0.33 * S);
g.lineTo(0.14 * S, -0.33 * S);
g.lineTo(0.07 * S, -0.8 * S);
g.lineTo(-0.07 * S, -0.8 * S);
g.closePath();
g.fill();
g.beginPath();
g.arc(0, -0.93 * S, 0.11 * S, 0, Math.PI * 2);
g.fill();
g.beginPath();
g.ellipse(-0.03 * S, -0.84 * S, 0.08 * S, 0.13 * S, 0, 0, Math.PI * 2);
g.fill();
limb(0.06, -0.75, 0.2, -0.5, 0.06);

e.light(0.2 * S, -0.45 * S, 2.3, '#ffc88c', 0.15, 'halo', 'linear');
e.light(0.2 * S, -0.42 * S, 0.4, '#ffe1b4', 1.1, 'core', 'linear');
e.at(0, -0.93 * S);
e.at(0.2 * S, -0.45 * S, 'light');

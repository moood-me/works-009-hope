// The girl sitting at the pier's end, legs hanging over it, facing left, head bowed: the original's
// silhouette (Hope.girlOnEdge), drawn in metres — her sitting height about a metre. The anchor is 0.45 m
// below the seat (at her feet), so all of her is painted above it; SY lifts every shape onto the seat.
// Layers: each shin with its foot (swinging about the knee, out of step), the body (breathing) and the
// long hair (stirring); the thighs and the dress over the lap are the still painting under them.
const SY = -0.45;
const INK = '#1a1c21';
const HAIR = '#16171b';

const pen = (c, colour) => {
  c.fillStyle = colour;
  c.strokeStyle = colour;
  c.lineCap = 'round';
  c.lineJoin = 'round';
};
const limb = (c, w, p) => {
  c.lineWidth = w;
  c.beginPath();
  c.moveTo(p[0], p[1] + SY);
  if (p.length === 6) {
    c.quadraticCurveTo(p[2], p[3] + SY, p[4], p[5] + SY);
  } else {
    for (let i = 2; i < p.length; i += 2) {
      c.lineTo(p[i], p[i + 1] + SY);
    }
  }
  c.stroke();
};

const legs = [['leg_near', 0.03], ['leg_far', -0.02]];

// thighs
pen(g, INK);
for (const leg of legs) {
  const kx = -0.36 + leg[1];
  limb(g, 0.12, [0.04, -0.07, kx, -0.06]);
}
// the dress over the lap
g.beginPath();
g.moveTo(0.16, 0 + SY);
g.lineTo(-0.3, -0.01 + SY);
g.quadraticCurveTo(-0.26, -0.15 + SY, -0.04, -0.19 + SY);
g.lineTo(0.12, -0.3 + SY);
g.closePath();
g.fill();

// shins and feet, painted hanging straight down from the knee; animate swings them
for (const leg of legs) {
  const kx = -0.36 + leg[1];
  const ky = -0.06;
  e.layer(leg[0], { pivot: [kx, ky + SY] }, c => {
    pen(c, INK);
    limb(c, 0.085, [kx, ky, kx, ky + 0.4]);
    limb(c, 0.065, [kx, ky + 0.4, kx - 0.08, ky + 0.415]);
  });
}

// the body: back, arm resting toward the knees, neck, bowed head — it breathes about the seat
e.layer('body', { pivot: [0, SY] }, c => {
  pen(c, INK);
  c.beginPath();
  c.moveTo(0.15, -0.03 + SY);
  c.bezierCurveTo(0.22, -0.26 + SY, 0.17, -0.48 + SY, 0.05, -0.6 + SY);
  c.lineTo(-0.07, -0.57 + SY);
  c.bezierCurveTo(-0.13, -0.42 + SY, -0.12, -0.22 + SY, -0.06, -0.05 + SY);
  c.closePath();
  c.fill();
  limb(c, 0.07, [0.0, -0.52, -0.08, -0.3, -0.22, -0.13]);
  limb(c, 0.07, [0.0, -0.57, -0.06, -0.66]);
  c.beginPath();
  c.arc(-0.1, -0.72 + SY, 0.12, 0, Math.PI * 2);
  c.fill();
});

// the long hair down her back, hung from the crown: it breathes with her and stirs at its free end
e.layer('hair', { pivot: [-0.07, -0.8 + SY] }, c => {
  pen(c, HAIR);
  c.beginPath();
  c.moveTo(-0.19, -0.79 + SY);
  c.quadraticCurveTo(-0.09, -0.9 + SY, 0.04, -0.8 + SY);
  c.quadraticCurveTo(0.12, -0.62 + SY, 0.17, -0.34 + SY);
  c.quadraticCurveTo(0.1, -0.4 + SY, 0.05, -0.5 + SY);
  c.quadraticCurveTo(-0.01, -0.62 + SY, -0.07, -0.7 + SY);
  c.closePath();
  c.fill();
});

e.at(-0.1, -0.72 + SY);
e.at(-0.1, -0.72 + SY, 'head');

// The girl sitting on the floor before the window, her back to us, head a little bowed: the design's 'back' pose (a
// girl: her hair), in body units × 1.133 m (the design's 0.24 of the frame at 4.72 m), #040406. The body is a layer
// stretching from the floor with her breath; head, neck, hair and the scarf's knot a layer rising with it and swaying
// a hair side to side (animate). The scarf's end is its own element (scarf).
const S = 1.133;
const INK = '#040406';
const P = (x, y) => [x * S, y * S];
const sy = -0.58;
e.layer('body', { pivot: [0, 0] }, c => {
  c.fillStyle = INK;
  c.beginPath();
  let a = P(-0.31, 0);
  c.moveTo(a[0], a[1]);
  let c1 = P(-0.34, -0.3);
  let c2 = P(-0.24, sy + 0.02);
  let b = P(0, sy);
  c.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], b[0], b[1]);
  c1 = P(0.24, sy + 0.02);
  c2 = P(0.34, -0.3);
  a = P(0.31, 0);
  c.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], a[0], a[1]);
  c.closePath();
  c.fill();
});
const hdx = -0.02;
const hdy = -0.74;
e.layer('head', {}, c => {
  c.fillStyle = INK;
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineWidth = 0.12 * S;
  c.beginPath();
  const n0 = P(0, sy);
  const n1 = P(hdx, hdy);
  c.moveTo(n0[0], n0[1]);
  c.lineTo(n1[0], n1[1]);
  c.stroke();
  c.beginPath();
  c.arc(n1[0], n1[1], 0.15 * S, 0, Math.PI * 2);
  c.fill();
  const hair = P(hdx, hdy + 0.1);
  c.beginPath();
  c.ellipse(hair[0], hair[1], 0.155 * S, 0.17 * S, 0, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = '#4a1f22';
  const knot = P(0, sy + 0.03);
  c.beginPath();
  c.ellipse(knot[0], knot[1], 0.15 * S, 0.04 * S, 0, 0, Math.PI * 2);
  c.fill();
});
const head = P(hdx, hdy);
e.at(head[0], head[1]);
e.at(head[0], head[1], 'head');

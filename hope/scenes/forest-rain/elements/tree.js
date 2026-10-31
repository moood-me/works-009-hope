// The big tree by her, the design's: a trunk 0.075 of the frame wide going up past the frame's top, its roots
// flaring at the foot, a long branch reaching left at 0.22 of the frame and a twig off it — both swaying a little
// (layers moved by animate). The design's frame points turned into metres on this card (6.4 m off, its anchor the
// trunk's middle at 0.7 of the frame's width).
const D = 6.4;
const A = 16 / 9;
const tx = (0.7 * A - A / 2) * D;
const X = fx => (fx * A - A / 2) * D - tx;
const Y = fy => Math.min(0, (fy - 0.6) * D - 1.7);
const tw = 0.075 * D;
const gy = 0.86;
const u = 1 / 1080;
const INK = '#040708';

g.fillStyle = INK;
g.beginPath();
g.moveTo(-tw * 0.42, -8);
g.lineTo(tw * 0.42, -8);
g.lineTo(tw * 0.55, Y(gy) - tw * 0.5);
g.quadraticCurveTo(tw * 0.7, Y(gy), tw * 1.3, Y(gy + 6 * u));
g.lineTo(-tw * 1.2, Y(gy + 6 * u));
g.quadraticCurveTo(-tw * 0.65, Y(gy), -tw * 0.52, Y(gy) - tw * 0.5);
g.closePath();
g.fill();

const bx = -tw * 0.3;
const by = Y(0.22);
e.layer('branch', { pivot: [bx, by] }, c => {
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineWidth = tw * 0.14;
  c.beginPath();
  c.moveTo(bx, by);
  c.quadraticCurveTo(-tw * 1.4, Y(0.16), -tw * 2.6, Y(0.19));
  c.stroke();
});
const twx = -tw * 1.6;
const twy = Y(0.175);
e.layer('twig', { pivot: [twx, twy] }, c => {
  c.strokeStyle = INK;
  c.lineCap = 'round';
  c.lineWidth = tw * 0.08;
  c.beginPath();
  c.moveTo(twx, twy);
  c.lineTo(-tw * 2.1, Y(0.11));
  c.stroke();
});

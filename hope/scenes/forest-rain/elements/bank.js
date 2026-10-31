// The near bank she sits on: the design's black rise (from the frame's left at gy + 12 px, over 0.4 of its width at
// gy − 18 px, to the right at gy + 4 px; gy = 0.86) turned into metres at 6.3 m, flat past the sides.
const D = 6.3;
const A = 16 / 9;
const px = fx => (fx * A - A / 2) * D;
const py = fy => Math.min(0, (fy - 0.6) * D - 1.7);
const gy = 0.86;
const u = 1 / 1080;
g.fillStyle = '#040708';
g.beginPath();
g.moveTo(-14, 0);
g.lineTo(-14, py(gy + 12 * u));
g.lineTo(px(0), py(gy + 12 * u));
g.quadraticCurveTo(px(0.4), py(gy - 18 * u), px(1), py(gy + 4 * u));
g.lineTo(14, py(gy + 4 * u));
g.lineTo(14, 0);
g.closePath();
g.fill();

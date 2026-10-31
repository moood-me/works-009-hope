// The dark hill, 19 m off: the design's curve — from the frame's left edge at 0.79 of its height, over a crest at
// the middle (0.7275, where the child stands), to the right edge at 0.8 — turned into metres at its distance (eye
// 1.7 m, horizon 0.7), running on flat at the sides for wider screens. It stands on the ground, which is of
// its colour (ground), so the two are the design's one dark silhouette.
const D = 19;
const A = 16 / 9;
// a point of the frame (x a share of its width, y of its height) on the hill's card
const px = fx => (fx * A - A / 2) * D;
const py = fy => Math.min(0, (fy - 0.7) * D - 1.7);
g.fillStyle = '#0c0f14';
g.beginPath();
g.moveTo(-45, 0);
g.lineTo(-45, py(0.79));
g.lineTo(px(0), py(0.79));
g.quadraticCurveTo(px(0.5), py(0.66), px(1), py(0.8));
g.lineTo(45, py(0.8));
g.lineTo(45, 0);
g.closePath();
g.fill();

// The pier, the design's: a deck 0.018 of the frame thick at 0.68 of its height, running from past the frame's left
// edge to its middle, posts 0.011 wide every 0.09 of its width down to the water at 0.735 — turned into metres at
// 9.71 m (the water line's distance: a frame's height is 9.71 m there). Its top edge catches the light faintly
// (the design's #d7beb9 line at 0.16, 1.2 px). The lake mirrors it.
const D = 9.71;
const A = 16 / 9;
const PXM = D / 1080;
const Y = fy => (fy - 0.56) * D - 1.7;
const deck = Y(0.68);
const thick = 0.018 * D;
const pw = Math.max(4 * PXM, 0.011 * D);
g.fillStyle = '#15141c';
for (let fx = 0.5 - 0.015; fx > -0.6; fx -= 0.09) {
  const x = (fx - 0.5) * A * D;
  g.fillRect(x - pw / 2, deck, pw, -deck + 3 * PXM);
}
g.fillRect(-25, deck, 25, thick);
g.fillStyle = 'rgba(215,190,185,0.16)';
g.fillRect(-25, deck, 25, 1.2 * PXM);
e.at(-0.163, deck, 'end');

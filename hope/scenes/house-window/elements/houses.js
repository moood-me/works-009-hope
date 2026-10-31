// The houses across the street, the design's: dark blocks (#0d131a) side by side along the window's foot, 0.12–0.3
// of the window wide and 0.08–0.34 of it tall, one of them (at 0.62 of the row, at least 0.24 tall) with a lit window
// and its warm glow. Turned into metres 40 m off on the street, 10 m under our floor (our eye 11.7 m over it), so
// their feet are under the sill; the row runs on past the window's sides for a leaning eye.
const L = e.lib;
const D = 40;
const X = sx => L.cardX(sx, D);
const Y = sy => (sy - L.HORIZON) * D - (L.EYE + L.FLOOR);
const base = L.WY + L.WH;
const row = [];
let x = L.WX - 0.3 * L.WW;
while (x < L.WX + 1.3 * L.WW) {
  const w = L.WW * (0.12 + e.rnd() * 0.18);
  row.push({ x, w, h: L.WH * (0.08 + e.rnd() * 0.26) });
  x += w * (0.9 + e.rnd() * 0.4);
}
const inWindow = row.filter(h => h.x + h.w > L.WX && h.x < L.WX + L.WW);
const lit = inWindow[Math.floor(inWindow.length * 0.62)];
lit.h = Math.max(lit.h, L.WH * 0.24);
g.fillStyle = '#0d131a';
for (const h of row) {
  g.fillRect(X(h.x), Y(base - h.h), h.w * D, -Y(base - h.h));
}
e.layer('window', {}, c => {
  c.fillStyle = 'rgb(255,205,140)';
  c.fillRect(X(lit.x + lit.w * 0.35), Y(base - lit.h * 0.72), lit.w * 0.2 * D, lit.h * 0.18 * D);
});
e.light(X(lit.x + lit.w * 0.45), Y(base - lit.h * 0.62), L.WW * 0.12 * D, '#ffbe78', 0.5, 'lit');

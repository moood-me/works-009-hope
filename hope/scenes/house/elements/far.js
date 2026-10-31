// The far row of the city across, the original's: blocks of #131725 side by side, their grids of small windows,
// about one in eight lit (amber mostly, a few cold). A window that comes and goes is a layer of its own (animate
// turns it on while its slow noise is up). Turned into metres 90 m off on the street (the eye 16.7 m over it), the
// blocks' feet under the sill; the row runs on past the window's sides for a leaning eye. All from lib.js's city().
const L = e.lib;
const D = 90;
const R = L.city()[0];
const X = x => L.cardX(L.WX + x, D);
const Y = y => L.streetY(L.WY + y, D);
g.fillStyle = R.colour;
for (const b of R.blocks) {
  g.fillRect(X(b.x), Y(b.top), b.w * D, -Y(b.top));
}
for (const w of R.lit) {
  g.fillStyle = w.colour;
  g.fillRect(X(w.x), Y(w.y), w.w * D, w.h * D);
}
R.toggles.forEach((w, i) => {
  e.layer('t' + i, {}, c => {
    c.fillStyle = w.colour;
    c.fillRect(X(w.x), Y(w.y), w.w * D, w.h * D);
  });
});

// The pane, the original's: 320 small drops that just sit on the glass (each a faint shadow under it, a pale body and
// a speck of light), painted here; its shader adds what moves — the city's lights blurred by the wet glass (bokeh),
// the drops sliding down with their trails, the distant lightning now and then, and her breath fogging the glass.
const L = e.lib;
const D = 3.29;
const rnd = L.seeded(77);
const X = x => L.cardX(L.WX + x, D);
const Y = y => L.cardY(L.WY + y, D);
const drop = (x, y, r, a) => {
  g.fillStyle = 'rgba(8,10,18,' + 0.35 * a + ')';
  g.beginPath();
  g.arc(x, y + r * 0.18, r, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(185,198,230,' + 0.2 * a + ')';
  g.beginPath();
  g.arc(x, y, r * 0.9, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(255,255,255,' + 0.55 * a + ')';
  g.beginPath();
  g.arc(x - r * 0.3, y - r * 0.35, r * 0.25, 0, Math.PI * 2);
  g.fill();
};
for (let i = 0; i < 320; i++) {
  const x = rnd() * L.WW;
  const y = rnd() * L.WH;
  const r = L.WW * (0.001 + Math.pow(rnd(), 2) * 0.005) * D;
  drop(X(x), Y(y), r, 0.8);
}

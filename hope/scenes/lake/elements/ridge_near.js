// The near shore, 1.5 km off: a low dark line with a ragged, wooded top (the original's fine noise).
const D = 1500;
const lib = e.lib;
const n2 = lib.noise1D(5);
const n3 = lib.noise1D(9);
const area = e.area;

g.fillStyle = '#272a3c';
lib.ridge(g, area[0], area[2], 5, x => {
  const f = lib.share(x, D);
  return -D * (0.008 + 0.02 * n2(f * 5) + 0.008 * n3(f * 70));
});

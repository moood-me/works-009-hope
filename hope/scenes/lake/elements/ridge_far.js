// The far hills, 3 km off: the original's outline (3–10 % of the frame's height above the horizon), and the
// low mist lying in the valley at their foot — a pale band over their lower slopes and the sky just above.
// Colours are night's after the scene's light: the far hills a little lighter and bluer than the near shore.
const D = 3000;
const lib = e.lib;
const n1 = lib.noise1D(3);
const area = e.area;

g.fillStyle = '#404466';
lib.ridge(g, area[0], area[2], 10, x => -D * (0.03 + 0.07 * n1(lib.share(x, D) * 2.5 + 1)));

const band = g.createLinearGradient(0, -0.06 * D, 0, 0);
band.addColorStop(0, 'rgba(188,181,239,0)');
band.addColorStop(1, 'rgba(188,181,239,0.45)');
g.fillStyle = band;
g.fillRect(area[0], -0.06 * D, area[2] - area[0], 0.06 * D);

// The sill under the window, the design's: 5 ft wider than the window, 1.3 ft deep below the frame, #0b0b0f, its top
// edge catching a cold line of light (#96aac8 at 0.14, 1 px).
const L = e.lib;
const D = 7.6;
const X = sx => L.cardX(sx, D);
const Y = sy => Math.min(0, L.cardY(sy, D));
const top = L.WY + L.WH + L.FT;
g.fillStyle = '#0b0b0f';
g.fillRect(X(L.WX - L.FT * 2.5), Y(top), (L.WW + L.FT * 5) * D, L.FT * 1.3 * D);
g.fillStyle = 'rgba(150,170,200,0.14)';
g.fillRect(X(L.WX - L.FT * 2.5), Y(top), (L.WW + L.FT * 5) * D, D / 1080);

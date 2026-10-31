// The sill she sits on, the original's: 1.14 window-widths wide, 0.028 of the frame deep, #0e0f16, its top edge
// catching the window's cold light (#8ca0d2 at 0.28, 2 px of 900).
const L = e.lib;
const D = 3.2;
const X = sx => L.cardX(sx, D);
const Y = sy => L.cardY(sy, D);
const top = L.WY + L.WH;
g.fillStyle = '#0e0f16';
g.fillRect(X(L.WX - L.WW * 0.07), Y(top), L.WW * 1.14 * D, 0.028 * D);
g.fillStyle = 'rgba(140,160,210,0.28)';
g.fillRect(X(L.WX - L.WW * 0.07), Y(top), L.WW * 1.14 * D, 2 * D / 900);

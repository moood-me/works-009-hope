// The room's wall, the original's near-black (#090a0f), the window's opening cut through it. Its shader lays the
// original's glows on it and the sill's shadow under the sill.
const L = e.lib;
const D = L.WALL;
const X = sx => L.cardX(sx, D);
const Y = sy => Math.min(0, L.cardY(sy, D));
g.fillStyle = '#090a0f';
g.beginPath();
g.rect(-8, -6, 16, 6);
g.rect(X(L.WX), Y(L.WY), L.WW * D, L.WH * D);
g.fill('evenodd');

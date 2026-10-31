// The window's cross, the design's: an upright bar down the window's middle and a crossbar at 0.38 of its height, ft
// wide, #08080b — on this card just before the pane.
const L = e.lib;
const D = 7.7;
const X = sx => L.cardX(sx, D);
const Y = sy => L.cardY(sy, D);
g.fillStyle = '#08080b';
g.fillRect(X(L.WX + L.WW / 2 - L.FT / 2), Y(L.WY), L.FT * D, L.WH * D);
g.fillRect(X(L.WX), Y(L.WY + L.WH * 0.38 - L.FT / 2), L.WW * D, L.FT * D);

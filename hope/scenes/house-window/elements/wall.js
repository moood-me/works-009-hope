// The wall with the window, the design's: its gradient (#0f1015 at the frame's top, #17171e at the floor's line,
// 0.72), the window's opening (ww × wh at (wx, wy)) cut through it, and the dark frame round the opening (#08080b,
// ft wide). Turned into metres on this card at the floor's line distance. Its shader lays the design's glows on it.
const L = e.lib;
const D = 7.727;
const X = sx => L.cardX(sx, D);
const Y = sy => Math.min(0, L.cardY(sy, D));
const gr = g.createLinearGradient(0, Y(0), 0, Y(L.FY));
gr.addColorStop(0, '#0f1015');
gr.addColorStop(1, '#17171e');
g.fillStyle = gr;
g.beginPath();
g.rect(-14, -9, 28, 9);
g.rect(X(L.WX), Y(L.WY), L.WW * D, L.WH * D);
g.fill('evenodd');
g.fillStyle = '#08080b';
g.beginPath();
g.rect(X(L.WX - L.FT), Y(L.WY - L.FT), (L.WW + 2 * L.FT) * D, (L.WH + 2 * L.FT) * D);
g.rect(X(L.WX), Y(L.WY), L.WW * D, L.WH * D);
g.fill('evenodd');

// The window's frame, the original's (#040509): the head across the top (0.035 of the window deep), the two sides, the
// upright bar down the middle and the crossbar at 0.36 of its height (0.018 wide), and a faint cold line round the
// opening (#788cc3 at 0.14, 1 px of 900).
const L = e.lib;
const D = 3.28;
const X = sx => L.cardX(sx, D);
const Y = sy => L.cardY(sy, D);
const W = v => v * D;
g.fillStyle = '#040509';
g.fillRect(X(L.WX - L.FW), Y(L.WY - L.FW), W(L.WW + 2 * L.FW), W(L.FW));
g.fillRect(X(L.WX - L.FW), Y(L.WY), W(L.FW), W(L.WH));
g.fillRect(X(L.WX + L.WW), Y(L.WY), W(L.FW), W(L.WH));
g.fillRect(X(L.WX + L.WW / 2 - L.MW / 2), Y(L.WY), W(L.MW), W(L.WH));
g.fillRect(X(L.WX), Y(L.WY + L.WH * 0.36 - L.MW / 2), W(L.WW), W(L.MW));
g.strokeStyle = 'rgba(120,140,195,0.14)';
g.lineWidth = D / 900;
g.strokeRect(X(L.WX), Y(L.WY), W(L.WW), W(L.WH));

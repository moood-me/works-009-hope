// The heavy curtain on the left, the original's: folds of #141520 and #0a0b11 across it (eight bands of a gradient),
// hanging from above the window to the floor, its inner edge wavering in long and small folds; and the dark rod above
// the window (#050608). On a card just before the wall.
const L = e.lib;
const D = 3.1;
const X = sx => L.cardX(sx, D);
const Y = sy => Math.min(0, L.cardY(sy, D));
const cx0 = L.WX - L.WW * 0.12;
const cx1 = L.WX + L.WW * 0.07;
const folds = g.createLinearGradient(X(cx0), 0, X(cx1), 0);
for (let i = 0; i <= 8; i++) {
  folds.addColorStop(i / 8, i % 2 ? '#141520' : '#0a0b11');
}
g.fillStyle = folds;
g.beginPath();
const top = L.WY - 0.07;
g.moveTo(X(cx0), Y(top));
g.lineTo(X(cx1), Y(top));
for (let y = top; y <= 1.1; y += 6 / 900) {
  g.lineTo(X(cx1 - L.WW * 0.03 * Math.sin((y - L.WY) * 3) - L.WW * 0.012 * Math.sin(y * 40)), Y(y));
}
g.lineTo(X(cx0), 0);
g.closePath();
g.fill();
g.fillStyle = '#050608';
g.fillRect(X(L.WX - L.WW * 0.16), Y(L.WY - 0.08), L.WW * 1.32 * D, 0.012 * D);

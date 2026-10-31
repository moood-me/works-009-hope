// The pier seen side-on, its left end where the girl sits, running off to the right past any screen:
// a deck 7 cm thick 0.62 m over the water, posts every 0.95 m. Dark wet wood; the top board's edge is
// worn pale, which is the thin light line along the deck in the original.
g.fillStyle = '#191c20';
for (let x = 0.05; x < 24; x += 0.95) {
  g.fillRect(x, -0.64, 0.07, 0.64);
}
g.fillRect(0, -0.69, 24.1, 0.07);
g.fillStyle = '#9ea2b4';
g.fillRect(0, -0.69, 24.1, 0.01);
e.at(0.3, -0.69, 'end');

// The forest floor seen from above (origin at 42.5 m, y toward the viewer): each row's own colour from its foot to
// the next row's (the design filled below each row's base with its colour), and the near bank's black before us.
const toY = d => 42.5 - d;
const lib = e.lib;
const bands = [[85, lib.dist(1), lib.COLOURS[0]], [lib.dist(1), lib.dist(2), lib.COLOURS[1]], [lib.dist(2), 6.3, lib.COLOURS[2]], [6.3, 0, '#040708']];
for (const b of bands) {
  g.fillStyle = b[2];
  g.fillRect(-100, toY(b[0]), 200, b[0] - b[1]);
}

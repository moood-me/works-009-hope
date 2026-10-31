// A small cabin far behind the first rows of trees, in the fog's grey (the original's mix 0.4); its window
// is cabin_light, so the mist of its row veils the cabin but not the light.
const s = 0.78;
g.fillStyle = e.lib.mix(0.4);
g.fillRect(-s, -s * 0.9, s * 2, s * 0.9);
g.beginPath();
g.moveTo(-s * 1.25, -s * 0.85);
g.lineTo(0, -s * 1.7);
g.lineTo(s * 1.25, -s * 0.85);
g.closePath();
g.fill();
e.at(0, -s * 0.5, 'cabin');

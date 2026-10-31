// The lit window and its warm glow in the fog, flickering a little (flicker): the light that is on.
const s = 0.78;
g.fillStyle = 'rgb(255,205,130)';
g.fillRect(-s * 0.22, -s * 0.62, s * 0.44, s * 0.34);
e.light(0, -s * 0.45, 2.5, '#ffaf5a', 1.7, 'window');
e.at(0, -s * 0.45, 'window');

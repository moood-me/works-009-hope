// The knot of the scarf at his neck; its two flying ends are drawn by the shader (scarf.wgsl), waving in the
// wind as the original's did.
const S = 0.94;
g.fillStyle = '#a8342b';
g.beginPath();
g.arc(0.08 * S, -0.755 * S, 0.033 * S, 0, Math.PI * 2);
g.fill();

// The little light breathes, the design's 0.75 + 0.25 sin(1.4 t) with a quick tremble (0.05 sin 9t).
const lp = 0.75 + 0.25 * Math.sin(e.t * 1.4) + 0.05 * Math.sin(e.t * 9);
e.glow('halo', lp);
e.glow('core', lp);

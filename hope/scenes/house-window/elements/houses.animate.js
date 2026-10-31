// The lit window across the street breathes a little: the design's 0.85 + 0.1 sin(0.8 t), its glow with it.
const a = 0.85 + 0.1 * Math.sin(e.t * 0.8);
e.layer('window').alpha = a;
e.glow('lit', a);

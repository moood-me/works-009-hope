// The bulb swings a hair (the design's 0.006 of the frame, sin 0.5 t, at the bulb: about its cord's top 3 m above),
// and flashes as lib.js's flicker says: its lit face and its glow with the flash.
const D = 6;
const swing = -Math.sin(e.t * 0.5) * 0.006 * D / 3;
const b = e.lib.flicker(e.t);
e.layer('hang').rotate = swing;
const lit = e.layer('lit');
lit.rotate = swing;
lit.alpha = b > 0 ? 0.3 + 0.7 * b : 0;
e.glow('glow', b);

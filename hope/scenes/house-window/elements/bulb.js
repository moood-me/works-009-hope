// The bare bulb hanging at 0.8 of the frame's width, 0.27 of its height, the design's: a cord from the ceiling, a
// small socket, the bulb (8 px of 1080 round, #1a1a20 dark) — all swinging a hair (layer `hang`, about the cord's top).
// When it flashes (lib.js's flicker) its lit face shows (layer `lit`, #ffe4b4 at 0.3 + 0.7 × the flash) and its own
// glow (60 px, #ffdca0, 0.5 × the flash) — a glow only (light "bulb": it lights nothing); the flash filling the room
// is the wall's, the floor's and the window's (their shaders), as the design laid it.
const D = 6;
const PX = D / 1080;
const TOP = -3;
const hang = c => {
  c.strokeStyle = '#050507';
  c.lineWidth = 1.5 * PX;
  c.beginPath();
  c.moveTo(0, TOP);
  c.lineTo(0, -10 * PX);
  c.stroke();
  c.fillStyle = '#0b0b0e';
  c.fillRect(-4 * PX, -12 * PX, 8 * PX, 8 * PX);
};
e.layer('hang', { pivot: [0, TOP] }, c => {
  hang(c);
  c.fillStyle = '#1a1a20';
  c.beginPath();
  c.arc(0, 0, 8 * PX, 0, Math.PI * 2);
  c.fill();
});
e.layer('lit', { pivot: [0, TOP] }, c => {
  c.fillStyle = 'rgb(255,228,180)';
  c.beginPath();
  c.arc(0, 0, 8 * PX, 0, Math.PI * 2);
  c.fill();
  e.light(0, 0, 60 * PX, '#ffdca0', 0.5, 'glow');
});
e.at(0, 0, 'bulb');

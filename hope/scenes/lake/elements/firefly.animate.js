// Her firefly's loop (the original's: 0.37 and 0.61 rad/s across and up) and its breathing glow.
const t = e.t;
const fly = e.layer('fly');
fly.x = Math.sin(t * 0.37) * 0.35;
fly.y = Math.sin(t * 0.61) * 0.18;
e.glow('glow', 0.75 + 0.25 * Math.sin(t * 1.7));
e.at(-0.35 + fly.x, -0.95 + fly.y, 'fly');

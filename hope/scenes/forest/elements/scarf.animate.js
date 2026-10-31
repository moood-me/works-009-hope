// The wind the scarf feels: slow and uneven (0..1), as the original's; the wave's phase runs faster in a
// stronger wind; the scarf rises with his breath.
const m = e.mem;
m.phase ??= 0;
const w = 0.5 + 0.5 * e.anim.noise(e.t * 0.15, 8);
m.phase = (m.phase + e.dt * (4 + 5 * w)) % (Math.PI * 2);
e.uniform('wind', w);
e.uniform('phase', m.phase);
e.uniform('bob', Math.sin(e.t * 1.2) * 0.006);

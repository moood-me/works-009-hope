// The original's wind for the snow: a slow uneven value 0..1 (noise of t·0.15); the flakes drift by (wind·2.2 − 0.5)
// px of 900 a second per unit of their pace — its sum over time goes to the shader (u_blow), so a change of the wind
// never jumps them.
const m = e.mem;
m.blow ??= 0;
const wind = 0.5 + 0.5 * e.anim.noise(e.t * 0.15, 8);
m.blow += (wind * 2.2 - 0.5) * e.dt;
e.uniform('blow', m.blow);

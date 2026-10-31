// The windows that come and go: each on while its slow noise (t · 0.25 + its phase) is up — the original's n > 0.4.
// And the window that lights up: as the key `lit` (0..1), breathing a little (0.9 + 0.1 sin 0.8 t), its glow with it.
const m = e.mem;
m.p ??= e.lib.city()[1].toggles.map(w => w.p);
for (let i = 0; i < m.p.length; i++) {
  e.layer('t' + i).alpha = 0.5 + 0.5 * e.anim.noise(e.t * 0.25 + m.p[i], 12) > 0.4 ? 1 : 0;
}
const k = e.anim.clamp(e.state.lit || 0, 0, 1);
e.layer('hope').alpha = k * (0.9 + 0.1 * Math.sin(e.t * 0.8));
e.glow('hope', k);

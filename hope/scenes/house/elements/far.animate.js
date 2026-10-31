// The windows that come and go: each on while its slow noise (t · 0.25 + its phase) is up — the original's n > 0.4.
const m = e.mem;
m.p ??= e.lib.city()[0].toggles.map(w => w.p);
for (let i = 0; i < m.p.length; i++) {
  e.layer('t' + i).alpha = 0.5 + 0.5 * e.anim.noise(e.t * 0.25 + m.p[i], 12) > 0.4 ? 1 : 0;
}

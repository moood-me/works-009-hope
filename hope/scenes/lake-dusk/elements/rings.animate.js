// A drop falls from her foot every 4 to 9 s (the design's), the first at 3 s: the shader is told when and where across
// (her near foot's swing then, 0.07 of her 1.36 m · sin 1.05 t). The last two drops are kept.
const m = e.mem;
m.next ??= 3;
m.n ??= 0;
m.d0 ??= -100;
m.d1 ??= -100;
m.x0 ??= 0;
m.x1 ??= 0;
if (e.t >= m.next) {
  m.d1 = m.d0;
  m.x1 = m.x0;
  m.d0 = e.t;
  m.x0 = Math.sin(e.t * 1.05) * 0.07 * 1.36;
  m.n += 1;
  m.next = e.t + 4 + e.anim.hash(m.n, 7) * 5;
}
e.uniform('drop0', m.d0);
e.uniform('x0', m.x0);
e.uniform('drop1', m.d1);
e.uniform('x1', m.x1);

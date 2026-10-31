// A breath in the cold every 3 to 4.5 s, the first at 2 s: one soft puff.
const m = e.mem;
m.next ??= 2;
m.n ??= 0;
if (e.t >= m.next) {
  e.burst(1);
  m.n += 1;
  m.next = e.t + 3 + e.anim.hash(m.n, 5) * 1.5;
}

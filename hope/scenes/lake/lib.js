// Shared by the paintings: the original's seeded randomness and smooth 1D value noise (0..1),
// so the far shore keeps the same outline the canvas scene had.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noise1D(seed) {
  const rnd = seeded(seed);
  const v = [];
  for (let i = 0; i < 256; i++) {
    v.push(rnd());
  }
  return x => {
    const i = Math.floor(x);
    const f = x - i;
    const k = f * f * (3 - 2 * f);
    const a = v[i & 255];
    const b = v[(i + 1) & 255];
    return a + (b - a) * k;
  };
}

// a ridge's outline across a card: f(across) gives its top (y, up negative), from `left` to `right` metres
function ridge(g, left, right, step, f) {
  g.beginPath();
  g.moveTo(left, 0);
  for (let x = left; x <= right + step; x += step) {
    g.lineTo(x, f(x));
  }
  g.lineTo(right + step, 0);
  g.closePath();
  g.fill();
}

// the stage is 16:9; a far card at distance D spans one stage height per D metres
const ASPECT = 16 / 9;

// the original measured things in the screen's width: a card's across at distance D as a share of it
function share(across, D) {
  return (across + ASPECT * D / 2) / (ASPECT * D);
}

return { seeded, noise1D, ridge, share, ASPECT };

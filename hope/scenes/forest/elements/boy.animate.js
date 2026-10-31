// His breathing: the original's bob of 0.006 of his height (1.2 rad/s) — the coat stretched from its hem, the
// head lifted with it.
const S = 0.94;
const b = Math.sin(e.t * 1.2) * 0.006;
e.layer('coat').scaleY = 1 + b / 0.43;
e.layer('head').y = -b * S;

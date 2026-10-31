// Shared: the original's room (hope/web/js/house.js) in the frame's terms — a frame 1 high and 16/9 wide, its window
// ww × wh at (wx, wy) — and how a point of the frame lands on a card standing D metres off (eye 1.7 m over the floor,
// horizon 0.5). The room is upstairs, its floor 15 m over the street: the city across stands on the street, its feet
// under the sill. The window's wall is 3.3 m off, so the floor's line falls just under the frame, as in the original
// (where the wall goes down past the frame's foot).
const A = 16 / 9;
const HORIZON = 0.5;
const EYE = 1.7;
const FLOOR = 15;
const WW = 0.64;
const WH = 0.62;
const WX = A / 2 - WW / 2;
const WY = 0.1;
const FW = WW * 0.035;
const MW = WW * 0.018;
const WALL = 3.3;

const cardX = (sx, D, across) => (sx - A / 2) * D - (across || 0);
// on a card standing on the floor (its anchor at the floor), y down
const cardY = (sy, D) => (sy - HORIZON) * D - EYE;
// on a card standing on the street (the eye 16.7 m over it)
const streetY = (sy, D) => (sy - HORIZON) * D - (EYE + FLOOR);

// the original's seeded randomness and smooth 1D value noise (0..1)
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// a row of the city across: buildings (window coordinates: x 0..WW across the window, y 0..WH down it), their grid of
// windows, which are lit (amber mostly, some cold), which of the lit come and go, and — in the near row — the dark one
// that lights up (the original's numbers; one seed for both rows so both paint and animate agree)
function city() {
  const rnd = seeded(33);
  const rows = [];
  for (const [row, top, colour] of [[0, 0.4, '#131725'], [1, 0.55, '#0a0d16']]) {
    const blocks = [];
    const lit = [];
    const toggles = [];
    const dark = [];
    let x = -WW * 0.35 - rnd() * WW * 0.05;
    while (x < WW * 1.35) {
      const bw = WW * (0.1 + rnd() * 0.14);
      const bt = WH * (top + rnd() * 0.15);
      blocks.push({ x, w: bw - WW * 0.006, top: bt });
      const cw = WW * 0.013;
      const ch = WH * 0.016;
      const gx = WW * 0.012;
      const gy = WH * 0.022;
      for (let wy = bt + gy; wy < WH - ch; wy += ch + gy) {
        for (let wx = x + gx; wx < x + bw - cw - gx; wx += cw + gx) {
          const w = { x: wx, y: wy, w: cw, h: ch, p: rnd() * 100 };
          if (rnd() < 0.12) {
            const a = (0.35 + rnd() * 0.5) * (row ? 1 : 0.55);
            w.colour = rnd() < 0.8 ? 'rgba(255,190,120,' + a + ')' : 'rgba(170,200,255,' + a + ')';
            if (rnd() < 0.15) {
              toggles.push(w);
            } else {
              lit.push(w);
            }
          } else if (row === 1) {
            dark.push(w);
          }
        }
      }
      x += bw;
    }
    const hope = row === 1 ? (dark.find(w => w.x > WW * 0.12 && w.x < WW * 0.4 && w.y < WH * 0.75) || dark[0]) : null;
    rows.push({ colour, blocks, lit, toggles, hope });
  }
  return rows;
}

return { A, HORIZON, EYE, FLOOR, WW, WH, WX, WY, FW, MW, WALL, cardX, cardY, streetY, seeded, city };

// Shared: the design's room (Hope.dc.html, draw_house) in the frame's terms — a frame 1 high and 16/9 wide, its
// window ww × wh at (wx, wy), the floor's line at fy — and how a point of the frame lands on a card standing D metres
// off on the floor (eye 1.7 m, horizon 0.5). The room is upstairs: its floor lies 10 m over the street (the houses
// across stand on the street, their feet hidden under the sill). And the bulb's flicker, the same pure function of time everywhere it is
// read (here for animate; the shaders have it written out in WGSL with the same integer hash).
const A = 16 / 9;
const HORIZON = 0.5;
const EYE = 1.7;
const WW = Math.min(0.3 * A, 0.42);
const WH = 0.52;
const WX = 0.46 * A - WW / 2;
const WY = 0.16;
const FY = 0.72;
const FT = Math.max(6 / 1080, WW * 0.035);
const WALL = EYE / (FY - HORIZON);
const FLOOR = 10;

// a point of the frame on a card D m off whose anchor is on the floor at `across` (y down, metres)
const cardX = (sx, D, across) => (sx - A / 2) * D - (across || 0);
const cardY = (sy, D, elevation) => (sy - HORIZON) * D - EYE + (elevation || 0);

// an integer hash 0..1 (PCG), the same as the shaders' `pcg`
function pcg(n) {
  const s = (Math.imul(n >>> 0, 747796405) + 2891336453) >>> 0;
  let w = Math.imul(((s >>> ((s >>> 28) + 4)) ^ s) >>> 0, 277803737) >>> 0;
  w = ((w >>> 22) ^ w) >>> 0;
  return w / 4294967296;
}

// the bulb: about every 11 s it flashes (0.5–1) and dies away (2.2 a second), stuttering (a third of the moments at
// a quarter) — the design's random flicker, made a function of time
const EVERY = 11;
function flicker(t) {
  const k = Math.floor(t / EVERY);
  let b = 0;
  for (let j = k - 1; j <= k; j++) {
    if (j < 0) {
      continue;
    }
    const at = j * EVERY + 2 + pcg(j * 3 + 1) * (EVERY * 0.6);
    const s = 0.5 + 0.5 * pcg(j * 3 + 2);
    if (t >= at) {
      b = Math.max(b, s - 2.2 * (t - at));
    }
  }
  if (b > 0 && pcg(Math.floor(t * 30) + 100000) < 0.3) {
    b *= 0.25;
  }
  return b;
}

return { A, HORIZON, EYE, WW, WH, WX, WY, FY, FT, WALL, FLOOR, cardX, cardY, pcg, flicker };

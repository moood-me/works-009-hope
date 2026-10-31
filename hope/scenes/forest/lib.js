// Shared by the paintings: the original's rows of pines (hope/web/js/forest.js) — each row's distance, its
// trees' nominal height, its colour (fog-grey far, near-black close) and the snow on its branches — and the
// mist lying among each row. tools/forest.js lays the rows out with the same numbers.
const ASPECT = 16 / 9;
const HORIZON = 0.62;
const EYE = 1.7;
const FOG = [148, 158, 172];
const DARK = [16, 20, 28];

const base = k => 0.65 + 0.022 * k;
const dist = k => EYE / (base(k) - HORIZON);
const rowHeight = k => (0.1 + 0.09 * k + 0.03 * k * k) * dist(k);
const mix = k => 'rgb(' + FOG.map((v, i) => Math.round(v + (DARK[i] - v) * k)).join(',') + ')';
const rowColour = k => mix(0.2 + 0.8 * Math.pow(k / 4, 1.3));
const rowSnow = k => (k >= 3 ? 'rgba(205,214,228,0.3)' : k === 2 ? 'rgba(190,200,215,0.18)' : null);

// the number after a prefix in an id: "pine_3_1" → 3
const rowOf = id => Number(id.split('_')[1]);

// one pine, its foot at (0, 0), h metres tall: the original's tiers, drooping, with snow along their left
function pine(g, h, rnd, colour, snow) {
  const w = h * (0.2 + rnd() * 0.08);
  g.fillStyle = colour;
  g.fillRect(-h * 0.012, -h * 0.16, h * 0.024, h * 0.16);
  const tiers = 7 + Math.floor(rnd() * 4);
  for (let i = 0; i < tiers; i++) {
    const k = i / tiers;
    const yb = -h * (0.1 + k * 0.78);
    const yt = yb - h * (0.16 + 0.06 * (1 - k));
    const wi = w * (1 - k) * (0.85 + rnd() * 0.3) + h * 0.02;
    const droop = h * (0.005 + rnd() * 0.012);
    const right = droop * (0.6 + rnd());
    g.fillStyle = colour;
    g.beginPath();
    g.moveTo(0, yt);
    g.quadraticCurveTo(-wi * 0.3, yb - (yb - yt) * 0.35, -wi, yb + droop);
    g.quadraticCurveTo(0, yb - h * 0.025, wi, yb + right);
    g.quadraticCurveTo(wi * 0.3, yb - (yb - yt) * 0.35, 0, yt);
    g.fill();
    if (snow) {
      g.strokeStyle = snow;
      g.lineWidth = h * 0.004;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(-wi * 0.85, yb);
      g.quadraticCurveTo(-wi * 0.68, yb - (yb - yt) * 0.12, -wi * 0.45, yb - (yb - yt) * 0.3);
      g.stroke();
    }
  }
}

// a pine kind of its row (its id: pine_<row>_<variant>), at the row's nominal height
function pineKind(g, e) {
  const k = rowOf(e.id);
  pine(g, rowHeight(k), e.rnd, rowColour(k), rowSnow(k));
}

// the mist among a row (its id: mist_<row>): a band of fog-grey rising from the row's foot, densest just
// above it, thinner for the nearer rows (the original's 0.5 − 0.09·row)
function mist(g, e) {
  const k = rowOf(e.id);
  const d = dist(k);
  const area = e.area;
  const top = -0.14 * d;
  const bottom = 0.02 * d;
  const a = 0.5 - k * 0.09;
  const gr = g.createLinearGradient(0, top, 0, bottom);
  gr.addColorStop(0, 'rgba(148,158,172,0)');
  gr.addColorStop(0.75, 'rgba(148,158,172,' + a + ')');
  gr.addColorStop(1, 'rgba(148,158,172,0)');
  g.fillStyle = gr;
  g.fillRect(area[0], top, area[2] - area[0], -top);
}

// smooth 1D value noise in [0, 1] (the original's)
function noise1D(seed) {
  let s = seed;
  const rnd = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const v = [];
  for (let i = 0; i < 256; i++) {
    v.push(rnd());
  }
  return x => {
    const i = Math.floor(x);
    const f = x - i;
    const q = f * f * (3 - 2 * f);
    const a = v[i & 255];
    const b = v[(i + 1) & 255];
    return a + (b - a) * q;
  };
}

return { ASPECT, HORIZON, EYE, mix, pineKind, mist, noise1D };

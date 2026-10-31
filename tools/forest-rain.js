// Generates hope/scenes/forest-rain/scene.json and the small code files of its pine kinds and grass tufts.
// The design (hope/web/hope-design/Hope.dc.html, draw_forest) drew three rows of pines across the screen on base
// lines at 0.62, 0.70 and 0.78 of its height; here each row stands at the distance its base line means (eye 1.7 m,
// horizon 0.6, focal length = the frame's height), each tree a copy of one of six painted kinds of its row, each kind
// swaying at a phase of its own (lib.js pineSway).
// Run: node tools/forest-rain.js   (from the repository's root)
const fs = require('fs');
const path = require('path');

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ASPECT = 16 / 9;
const HORIZON = 0.6;
const EYE = 1.7;
const VARIANTS = 6;
const round = (v, n) => Math.round(v * 10 ** n) / 10 ** n;
const base = i => 0.62 + 0.08 * i;
const dist = y => EYE / (y - HORIZON);
const rowHeight = i => (0.26 + 0.13 * i) * dist(base(i));

const rnd = seeded(113);
const pines = [];
for (let i = 0; i < 3; i++) {
  const kinds = [];
  for (let v = 0; v < VARIANTS; v++) {
    kinds.push([]);
  }
  const d = dist(base(i));
  for (let X = -0.45; X < ASPECT + 0.45; X += ASPECT * (0.018 + 0.022 * i) * (0.5 + rnd() * 1.3)) {
    const copy = { across: round((X - ASPECT / 2) * d, 2), distance: round(d + rnd() * 0.4, 2), scale: round(0.7 + rnd() * 0.6, 3) };
    if (rnd() < 0.5) {
      copy.flip = true;
    }
    kinds[Math.floor(rnd() * VARIANTS)].push(copy);
  }
  kinds.forEach((copies, v) => {
    const h = rowHeight(i);
    pines.push({
      id: 'pine_' + i + '_' + v,
      name: 'Pines, row ' + (i + 1) + ' from the back',
      across: 0,
      distance: round(d, 2),
      height: round(h, 2),
      box: [round(-0.3 * h, 2), round(-1.04 * h, 2), round(0.3 * h, 2), 0],
      copies,
    });
  });
}

// the grass along the bank's edge: tufts, each a copy of one of four kinds, on the bank's line (about 6.2 m)
const tufts = [];
const tuftKinds = [[], [], [], []];
for (let X = -0.45; X < ASPECT + 0.45; X += 0.025 + rnd() * 0.035) {
  const d = 6.0 + rnd() * 0.5;
  const c = { across: round((X - ASPECT / 2) * d, 2), distance: round(d, 2), scale: round(0.7 + rnd() * 0.7, 3) };
  if (rnd() < 0.5) {
    c.flip = true;
  }
  tuftKinds[Math.floor(rnd() * 4)].push(c);
}
tuftKinds.forEach((copies, v) => {
  tufts.push({ id: 'grass_' + v, name: 'Grass on the bank', across: 0, distance: 6.2, height: 0.35, box: [-0.2, -0.4, 0.2, 0], copies });
});

const rowIds = i => pines.filter(p => p.id.startsWith('pine_' + i + '_')).map(p => p.id);
// the fog among each row (the design's fog at the row's foot): nearer than the row, so its soft lower half lies
// over the row's ground before the next row
const fogDist = [21, 10.6, 6.9];
// each row's colour: what its fog lies over (its shader turns the design's screen-colour strength into linear light's)
const BG = [[0x27, 0x39, 0x3d], [0x18, 0x27, 0x2a], [0x0e, 0x18, 0x1a]];
const fogs = [0, 1, 2].map(i => ({
  id: 'fog_' + i,
  name: 'Fog at the foot of row ' + (i + 1),
  across: 0,
  distance: fogDist[i],
  height: round(0.25 * fogDist[i], 2),
  box: [round(-1.7 * fogDist[i], 1), round(-0.25 * fogDist[i], 2), round(1.7 * fogDist[i], 1), 0],
  inFront: rowIds(i),
  uniforms: { dist: fogDist[i], row: i, base: round(base(i), 3), strength: round(1.2 - 0.2 * i, 2), bgr: round(BG[i][0] / 255, 4), bgg: round(BG[i][1] / 255, 4), bgb: round(BG[i][2] / 255, 4) },
}));
// the fireflies' glows and the soft light round her are glows only: they light nothing (reach)
const FLIES = 16;
const glowsOnly = [{ id: 'aura', of: 'girl#aura', reach: 0.01 }];
for (let f = 0; f < FLIES; f++) {
  glowsOnly.push({ id: 'fly' + f, of: 'fireflies#f' + f, reach: 0.01 });
}

const scene = {
  engine: 3,
  title: 'Rain in the Forest',
  horizon: HORIZON,
  camera: { mode: 'picture' },
  light: { bounce: 0, haze: 0, vignette: 0.96, grain: 0.8, wind: [1, 0, 0.6] },
  lights: glowsOnly,
  state: { rest: 0, rainfall: 1 },
  states: { rest: { range: [0, 1], smooth: true, means: '0 — the fireflies all wander; 1 — one of them has settled on her knee (the script brings it when all is still)' }, rainfall: { range: [0, 1], means: '1 — the rain falls over the frame (as the design); 0 — none' } },
  objects: [
    { id: 'sky', name: 'The night over the forest, a hazy moon', sky: true, box: [-0.7, -0.6, 2.48, 1.3] },
    { id: 'ground', name: 'The forest floor', plane: true, across: 0, distance: 42.5, elevation: 0, width: 200, depth: 85 },
    ...pines,
    ...fogs,
    { id: 'bank', name: 'The near bank', across: 0, distance: 6.3, height: 0.3, box: [-14, -0.3, 14, 0] },
    { id: 'tree', name: 'The big tree she leans by', across: 2.28, distance: 6.4, height: 8, box: [-2.4, -8, 0.8, 0] },
    { id: 'girl', name: 'The girl hugging her knees', x: 0.672, distance: 6.2, elevation: 0.1, height: 0.8, box: [-0.6, -1.0, 0.45, 0.03] },
    { id: 'scarf', name: 'Her scarf', on: 'girl', distance: -0.03, height: 0.4, box: [-0.05, -0.62, 0.32, -0.36] },
    ...tufts,
    { id: 'fireflies', name: 'Fireflies', across: 0, distance: 7.2, height: 4, box: [-7, -4.4, 7, 0], glows: true, inFront: ['girl', 'scarf', 'tree', 'bank', ...tufts.map(t => t.id)] },
    { id: 'rainfall', name: 'The rain that is always here', insert: 'rainfall' },
  ],
};

const dir = path.join(__dirname, '..', 'hope', 'scenes', 'forest-rain');
fs.mkdirSync(path.join(dir, 'elements'), { recursive: true });
fs.writeFileSync(path.join(dir, 'scene.json'), JSON.stringify(scene, null, 2) + '\n');
for (const p of pines) {
  fs.writeFileSync(path.join(dir, 'elements', p.id + '.js'), '// one painted kind of its row (lib.js pineKind); tools/forest-rain.js lays its copies\ne.lib.pineKind(g, e);\n');
  fs.writeFileSync(path.join(dir, 'elements', p.id + '.animate.js'), '// its slow sway, the design\'s (lib.js pineSway)\ne.lib.pineSway(e);\n');
}
for (const t of tufts) {
  fs.writeFileSync(path.join(dir, 'elements', t.id + '.js'), '// one kind of grass tuft (lib.js tuft); tools/forest-rain.js lays its copies\ne.lib.tuft(g, e);\n');
}
for (const f of fogs) {
  fs.writeFileSync(path.join(dir, 'elements', f.id + '.js'), '// the fog at the foot of its row is drawn wholly by its shader (' + f.id + '.wgsl: the same text for every row)\n');
  fs.copyFileSync(path.join(__dirname, 'forest-rain-fog.wgsl'), path.join(dir, 'elements', f.id + '.wgsl'));
}
console.log(pines.map(p => p.id + ':' + p.copies.length).join(' '), tufts.map(t => t.copies.length).join(','));

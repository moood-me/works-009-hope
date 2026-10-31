// Generates hope/scenes/forest/scene.json and the small code files of its pine kinds and mist bands.
// The original (hope/web/js/forest.js) scattered pines in five rows across the screen; here each row is
// laid out at the distance its base line on screen means (eye 1.7 m, horizon 0.62, focal length = the
// frame's height), each tree a copy of one of three painted kinds of its row, scaled and flipped.
// Run: node tools/forest.js   (from the repository's root)
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
const HORIZON = 0.62;
const EYE = 1.7;
const VARIANTS = 3;
const round = (v, n) => Math.round(v * 10 ** n) / 10 ** n;

const base = k => 0.65 + 0.022 * k;
const dist = y => EYE / (y - HORIZON);
const rowHeight = k => (0.1 + 0.09 * k + 0.03 * k * k) * dist(base(k));

const rnd = seeded(21);
const pines = [];
for (let k = 0; k < 5; k++) {
  const spacing = ASPECT * (0.016 + 0.018 * k / 4);
  const clear = k >= 2 ? ASPECT * (0.04 + 0.08 * k) : 0;
  const kinds = [];
  for (let v = 0; v < VARIANTS; v++) {
    kinds.push([]);
  }
  for (let X = -0.45 + rnd() * spacing; X < ASPECT + 0.45; X += spacing * (0.6 + rnd() * 0.8)) {
    if (Math.abs(X - ASPECT / 2) < clear * (0.8 + rnd() * 0.4)) {
      continue;
    }
    const hScreen = (0.1 + 0.09 * k + 0.03 * k * k) * (0.7 + rnd() * 0.6);
    const d = dist(base(k) + rnd() * 0.01 * k);
    const copy = {
      across: round((X - ASPECT / 2) * d, 2),
      distance: round(d, 2),
      scale: round(hScreen * d / rowHeight(k), 3),
    };
    if (rnd() < 0.5) {
      copy.flip = true;
    }
    kinds[Math.floor(rnd() * VARIANTS)].push(copy);
  }
  kinds.forEach((copies, v) => {
    const h = rowHeight(k);
    pines.push({
      id: 'pine_' + k + '_' + v,
      name: 'Pines, row ' + (k + 1) + ' from the back',
      across: 0,
      distance: round(dist(base(k)), 2),
      height: round(h, 2),
      box: [round(-0.45 * h, 2), round(-1.02 * h, 2), round(0.45 * h, 2), round(0.02 * h, 2)],
      copies,
    });
  });
}

const rowIds = k => pines.filter(p => p.id.startsWith('pine_' + k + '_')).map(p => p.id);

const mists = [];
for (let k = 0; k < 4; k++) {
  const d = dist(base(k));
  const half = (ASPECT / 2 + 0.6) * d;
  mists.push({
    id: 'mist_' + k,
    name: 'Mist lying among row ' + (k + 1) + ' from the back',
    across: 0,
    distance: round(d, 2),
    height: round(0.14 * d, 2),
    box: [round(-half, 1), round(-0.14 * d, 2), round(half, 1), 0],
    inFront: rowIds(k),
  });
}

const scene = {
  engine: 3,
  title: 'The Forest',
  horizon: HORIZON,
  camera: { mode: 'picture' },
  light: { bounce: 0, haze: 0, vignette: 0.87, grain: 0.6, wind: [1, 0, 0.2] },
  state: { breath: 0 },
  states: { breath: { type: 'number', means: 'counts his breaths: each one up lets out a puff in the cold (the script breathes)' } },
  captions: [
    { text: 'The snow has covered every path back.', at: 3 },
    { text: 'But somewhere between the trees, a light is on.', at: 11 },
  ],
  objects: [
    { id: 'sky', name: 'Overcast winter sky', sky: true, box: [-0.7, -0.6, 2.48, 1.3] },
    { id: 'ground', name: 'Snow', plane: true, across: 0, distance: 2000, elevation: 0, width: 8000, depth: 4000 },
    ...pines,
    ...mists,
    {
      id: 'cabin',
      name: 'A cabin far among the trees',
      x: 0.43,
      y: 0.668,
      height: 1.4,
      box: [-1.0, -1.4, 1.0, 0.02],
      inFront: rowIds(1),
    },
    {
      id: 'cabin_light',
      name: 'The cabin window, lit',
      x: 0.43,
      y: 0.668,
      height: 1.4,
      box: [-0.4, -0.7, 0.4, 0.02],
      glows: true,
      flicker: 0.15,
      inFront: ['cabin', 'mist_1', ...rowIds(1)],
    },
    { id: 'boy', name: 'The boy', x: 0.5, y: 0.8, height: 1.0, box: [-0.3, -1.05, 0.3, 0.04] },
    { id: 'scarf', name: 'His scarf', on: 'boy', distance: -0.02, height: 0.4, box: [-0.02, -0.84, 0.46, -0.4], uniforms: { wind: 0.5, phase: 0, bob: 0 } },
    {
      id: 'breath',
      name: 'His breath in the cold',
      particles: {
        kind: 'smoke',
        at: { on: 'boy', at: [-0.05, -0.15, 0.89] },
        rate: 0,
        burst: { on: 'breath', count: 1 },
        life: [2.4, 2.4],
        size: [0.09, 0.37],
        color: '#e1e6f0',
        opacity: 0.3,
        gravity: -0.05,
        direction: [0.3, 0, 1],
        spread: 40,
        speed: [0.02, 0.06],
        wind: 0.4,
      },
    },
    { id: 'snow', name: 'Falling snow', particles: { kind: 'snow', count: 14000, size: [0.03, 0.03], speed: [0.25, 0.45] } },
  ],
};

const dir = path.join(__dirname, '..', 'hope', 'scenes', 'forest');
fs.mkdirSync(path.join(dir, 'elements'), { recursive: true });
fs.writeFileSync(path.join(dir, 'scene.json'), JSON.stringify(scene, null, 2) + '\n');
for (const p of pines) {
  fs.writeFileSync(path.join(dir, 'elements', p.id + '.js'), '// one painted kind of its row (lib.js pineKind); tools/forest.js lays its copies\ne.lib.pineKind(g, e);\n');
}
for (const m of mists) {
  fs.writeFileSync(path.join(dir, 'elements', m.id + '.js'), '// the mist band of its row (lib.js mist)\ne.lib.mist(g, e);\n');
}
console.log(pines.map(p => p.id + ':' + p.copies.length).join(' '));

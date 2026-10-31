// Shared by the paintings: the design's rows of pines (draw_forest's pine: a trunk and seven flat tiers), its
// grass — with the numbers tools/forest-rain.js lays them out by (the fog at each row's foot is a shader).
const A = 16 / 9;
const HORIZON = 0.6;
const EYE = 1.7;
const COLOURS = ['#27393d', '#18272a', '#0e181a'];
const base = i => 0.62 + 0.08 * i;
const dist = i => EYE / (base(i) - HORIZON);
const rowHeight = i => (0.26 + 0.13 * i) * dist(i);
const rowOf = id => Number(id.split('_')[1]);

// a pine kind of its row (id pine_<row>_<variant>): the design's tree at the row's nominal height, swaying in the
// wind from its foot (its whole painting a layer bending about the foot: the top sways most)
function pineKind(g, e) {
  const i = rowOf(e.id);
  const h = rowHeight(i);
  const w = h * (0.26 + e.rnd() * 0.1);
  e.layer('tree', { pivot: [0, 0], wind: { strength: 0.12 + 0.08 * i, gust: 0.3 } }, c => {
    c.fillStyle = COLOURS[i];
    c.fillRect(-w * 0.035, -h * 0.25, w * 0.07, h * 0.25);
    c.beginPath();
    for (let t = 0; t < 7; t++) {
      const k = t / 7;
      const y0 = -h * 0.12 - k * h * 0.82;
      const tw = w * 0.5 * (1 - k * 0.85);
      c.moveTo(-tw, y0);
      c.lineTo(tw, y0);
      c.lineTo(0, y0 - h * 0.2);
      c.closePath();
    }
    c.fill();
  });
}

// a tuft of the design's grass: three thin curved blades, dark, bending in the wind
function tuft(g, e) {
  e.layer('blades', { pivot: [0, 0], wind: { strength: 0.5, gust: 0.5 } }, c => {
    c.strokeStyle = '#030607';
    c.lineWidth = 0.009;
    c.lineCap = 'round';
    for (let b = 0; b < 3; b++) {
      const x = (e.rnd() - 0.5) * 0.25;
      const h = 0.1 + e.rnd() * 0.25;
      const lean = (e.rnd() - 0.3) * 0.12;
      c.beginPath();
      c.moveTo(x, 0);
      c.quadraticCurveTo(x + lean * 0.4, -h * 0.5, x + lean, -h);
      c.stroke();
    }
  });
}

return { A, HORIZON, EYE, COLOURS, base, dist, pineKind, tuft };

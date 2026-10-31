// Shared by the paintings: the design's rows of pines (draw_forest's pine: a trunk and seven flat tiers), its
// grass, and the fog at the foot of each row — with the numbers tools/forest-rain.js lays them out by.
const A = 16 / 9;
const HORIZON = 0.6;
const EYE = 1.7;
const COLOURS = ['#27393d', '#18272a', '#0e181a'];
const base = i => 0.62 + 0.08 * i;
const dist = i => EYE / (base(i) - HORIZON);
const rowHeight = i => (0.26 + 0.13 * i) * dist(i);
const FOG_DIST = [21, 10.6, 6.9];
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

// the design's drifting fog blobs on a card D metres off (its anchor on the ground): o — y (the band's middle, a
// share of the frame's height), ry (the blobs' height, a share), n, alpha (× the design's 0.05–0.13), colour
function fog(g, e, D, o) {
  const area = e.area;
  const W = area[2] - area[0];
  const toY = fy => -(EYE - (fy - HORIZON) * D);
  for (let n = 0; n < o.n; n++) {
    const x = area[0] + e.rnd() * W;
    const fy = o.y + (e.rnd() - 0.5) * 0.06;
    const rx = A * D * (0.25 + e.rnd() * 0.3);
    const ry = D * o.ry * (0.6 + e.rnd() * 0.8);
    const v = (4 + e.rnd() * 10) / 1080 * D;
    const a = (0.05 + e.rnd() * 0.08) * o.alpha;
    const y = toY(fy);
    e.layer('blob' + n, { drift: [v, 0] }, c => {
      for (const shift of [-W, 0, W]) {
        c.save();
        c.translate(x + shift, y);
        c.scale(1, ry / rx);
        const gr = c.createRadialGradient(0, 0, 0, 0, 0, rx);
        gr.addColorStop(0, 'rgba(' + o.colour + ',' + a + ')');
        gr.addColorStop(1, 'rgba(' + o.colour + ',0)');
        c.fillStyle = gr;
        c.fillRect(-rx, -rx, 2 * rx, 2 * rx);
        c.restore();
      }
    });
  }
}

// the fog at the foot of a row (id fog_<row>): the design's five blobs a little above the row's base line
function rowFog(g, e) {
  const i = rowOf(e.id);
  fog(g, e, FOG_DIST[i], { y: base(i) - 0.04, ry: 0.07, n: 5, alpha: 1.2 - 0.2 * i, colour: '120,150,155' });
}

return { A, HORIZON, EYE, COLOURS, base, dist, pineKind, tuft, rowFog };

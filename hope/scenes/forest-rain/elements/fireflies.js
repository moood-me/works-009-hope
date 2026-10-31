// Sixteen fireflies, the design's: each a tiny warm point with its glow (22 px of 1080, #ffcd78), a layer of its own
// that animate carries on its wandering and blinks; their glows light nothing (lights fly0…fly15). They stand on a
// card 7.2 m off (between the last row of pines and the bank), spread as the design spread them: across 0.2–0.9
// of the frame's width and 0.45–0.83 of its height. The first of them settles on her knee as the key `rest`
// comes to 1 (it is painted at a set place, 0.55 of the frame's width and 0.65 of its height, which its animate
// knows; the others where the seed puts them).
const D = 7.2;
const A = 16 / 9;
for (let f = 0; f < 16; f++) {
  const X = f === 0 ? A * 0.55 : A * (0.2 + e.rnd() * 0.7);
  const Yf = f === 0 ? 0.65 : 0.45 + e.rnd() * 0.38;
  const x = (X - A / 2) * D;
  const y = (Yf - 0.6) * D - 1.7;
  e.layer('f' + f, {}, c => {
    c.fillStyle = 'rgb(255,236,180)';
    c.beginPath();
    c.arc(x, y, 0.012, 0, Math.PI * 2);
    c.fill();
    e.light(x, y, 0.3, '#ffcd78', 0.75, 'f' + f);
  });
}

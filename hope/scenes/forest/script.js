// The view drifts slowly side to side, as the original's camera did (a sway of about 90 s): moved by the
// engine, so the near trees pass the far ones in true parallax.
const SWAY = 0.6;
const PERIOD = 90;
const go = () => {
  const x = scene.get('camera_x') || 0;
  const to = x > 0.01 ? -SWAY : SWAY;
  const over = Math.abs(to - x) / (2 * SWAY) * (PERIOD / 2);
  scene.move('camera_x', to, { over, ease: 'inOut' });
  return over;
};
const first = go();
scene.after(first, () => {
  go();
  scene.every(PERIOD / 2, go);
});

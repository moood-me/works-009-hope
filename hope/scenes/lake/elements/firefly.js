// The one firefly that stays: a warm point with its glow, hovering by her bowed head. It stands on the
// pier at her seat, a little before her; animate carries it on its slow loop and breathes its glow,
// and its light touches her faintly. The lake mirrors it (the other fireflies are particles, unmirrored,
// as in the original, where only this one had a reflection).
e.layer('fly', {}, c => {
  c.fillStyle = '#fff1c4';
  c.beginPath();
  c.arc(-0.35, -0.95, 0.012, 0, Math.PI * 2);
  c.fill();
  e.light(-0.35, -0.95, 0.27, '#ffd78c', 1.0, 'glow');
});

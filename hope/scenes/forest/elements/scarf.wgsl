// The scarf's two ends, the original's: each a line 0.05 wide with round ends through ten points from the knot
// (0.08, -0.75), reaching out 0.06 + 0.26 wind to the right and 0.22 - 0.16 wind down, a wave running along it
// toward its free end (0.03 at the end). In body units (the boy is 0.94 m): at / 0.94. The wind, the wave's phase
// (added up by animate, so a change of the wind never jumps it) and the breath's bob come as uniforms.
const RED = vec3f(0.392, 0.034, 0.024);
const SIZE = 0.94;
const HALF = 0.025;

fn point(i: f32, ph: f32) -> vec2f {
  let k = i / 9.0;
  let x = 0.08 + k * (0.06 + 0.26 * u_wind);
  let y = -0.75 - u_bob + k * (0.22 - 0.16 * u_wind) + sin(u_phase + ph - i * 0.9) * 0.03 * k;
  return vec2f(x, y);
}

fn reach(p: vec2f, ph: f32) -> f32 {
  var best = 10.0;
  var a = point(0.0, ph);
  for (var i = 1; i <= 9; i++) {
    let b = point(f32(i), ph);
    let ab = b - a;
    let q = clamp(dot(p - a, ab) / max(dot(ab, ab), 0.0000001), 0.0, 1.0);
    best = min(best, length(p - (a + ab * q)));
    a = b;
  }
  return best;
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = at / SIZE;
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)) / SIZE, 0.0001);
  let a1 = clamp((HALF + 0.5 * px - reach(p, 0.0)) / px, 0.0, 1.0);
  let a2 = clamp((HALF + 0.5 * px - reach(p, 1.9)) / px, 0.0, 1.0);
  let a = max(a1, a2);
  return painted + vec4f(RED * a, a) * (1.0 - painted.a);
}

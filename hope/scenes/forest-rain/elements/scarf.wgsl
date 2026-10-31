// The design's scarf end (child → scarf): a stroke 0.055 wide of #5e2629, round-ended, along a quadratic curve
// from her neck (0.01, −0.59 + breath) through (n + 0.12, n + 0.04 + wind·0.01) to (n + 0.22 + wind·0.025, n + 0.1
// + sin(2.3 t)·0.025), where wind = sin 1.7t + 0.5 sin 2.9t and breath = 0.012 sin 1.25t — in body units (she is
// 0.93 m): at / 0.93. The curve is followed through twelve points.
const RED = vec3f(0.111, 0.019, 0.021);
const SIZE = 0.93;
const HALF = 0.0275;

fn wave(k: f32) -> f32 { return sin(cycle(k / (2.0 * PI)) * 2.0 * PI); }

fn curve(q: f32) -> vec2f {
  let wind = wave(1.7) + 0.5 * wave(2.9);
  let n = vec2f(0.01, -0.59 + 0.012 * wave(1.25));
  let c = n + vec2f(0.12, 0.04 + wind * 0.01);
  let tip = n + vec2f(0.22 + wind * 0.025, 0.1 + wave(2.3) * 0.025);
  let a = mix(n, c, q);
  let b = mix(c, tip, q);
  return mix(a, b, q);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = at / SIZE;
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)) / SIZE, 0.0001);
  var best = 10.0;
  var a = curve(0.0);
  for (var i = 1; i <= 12; i++) {
    let b = curve(f32(i) / 12.0);
    let ab = b - a;
    let q = clamp(dot(p - a, ab) / max(dot(ab, ab), 0.0000001), 0.0, 1.0);
    best = min(best, length(p - (a + ab * q)));
    a = b;
  }
  let cover = clamp((HALF + 0.5 * px - best) / px, 0.0, 1.0);
  return painted + vec4f(RED * cover, cover) * (1.0 - painted.a);
}

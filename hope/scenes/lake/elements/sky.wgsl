// The stars twinkle (their layer's colour carries each one's phase and pace) and, now and then, a
// shooting star crosses the upper sky for 1.1 s: the first at 5 s, then one in each 16 s, at a moment,
// place and slant of its own.
const STAR = vec3f(0.753, 0.784, 1.0);
const SHOOT = vec3f(0.831, 0.871, 1.0);
const ASPECT = 1.7778;
const HORIZON = 0.58;
const EVERY = 16.0;
const HALF_WIDTH = 0.0009;

fn twinkle(s: vec4f) -> f32 {
  let a = max(s.a, 0.0001);
  let phase = s.r / a * 7.0;
  let hz = (0.4 + 2.0 * (s.g / a)) / (2.0 * PI);
  let w = 0.5 + 0.5 * sin(cycle(hz) * 2.0 * PI + phase);
  return 0.3 + 0.7 * w * w;
}

fn shooting(at: vec2f, px: f32) -> f32 {
  let n = floor(u_time / EVERY);
  let h1 = hash2(vec2f(n, 1.0));
  let h2 = hash2(vec2f(n, 2.0));
  let h3 = hash2(vec2f(n, 3.0));
  let h4 = hash2(vec2f(n, 4.0));
  let h5 = hash2(vec2f(n, 5.0));
  let start = select(n * EVERY + 4.0 + h1 * (EVERY - 8.0), 5.0, n < 0.5);
  let k = (u_time - start) / 1.1;
  let kk = clamp(k, 0.0, 1.0);
  let p0 = vec2f(ASPECT * (0.45 + 0.5 * h2), HORIZON * (0.05 + 0.3 * h3));
  let v = vec2f(-ASPECT * (0.25 + 0.15 * h4), 0.1 + 0.08 * h5);
  let head = p0 + v * kk;
  let tail = p0 + v * max(0.0, kk - 0.2);
  let seg = head - tail;
  let len2 = max(dot(seg, seg), 0.0000000001);
  let q = clamp(dot(at - tail, seg) / len2, 0.0, 1.0);
  let d = length(at - (tail + seg * q));
  let cover = clamp((HALF_WIDTH + 0.5 * px - d) / px, 0.0, 1.0);
  let live = select(0.0, 1.0, k > 0.0 && k < 1.0);
  return live * cover * q * 0.9 * sin(PI * kk);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let s = layer(1, at);
  let tw = twinkle(s) * s.a;
  var c = painted.rgb * (1.0 - tw) + STAR * tw;
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)), 0.00001);
  let f = shooting(at, px);
  c = mix(c, SHOOT * painted.a, f);
  return vec4f(c, painted.a);
}

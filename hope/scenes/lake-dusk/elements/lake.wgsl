// The design's water (draw_lake), drawn in the frame's terms: a point of this plane (its middle 2 km off, y toward
// the eye) is seen at (x / distance + the stage's middle, 0.56 + 1.7 / distance) of the frame. In the screen's
// colours, as the design's canvas laid them:
// - the water's own gradient from the horizon down (#978b95, #4e4b5e at 0.35, #171824 at the foot);
// - the sun's path: 26 short dashes 1.6 px tall under the sun, wider as they come nearer, their widths breathing
//   (sin(1.6 t + 1.7 i)) and shifting (5 px, sin(0.9 t + i)), #f0d7c8 at 0.4 · (1 − i/26);
// - 110 thin streaks drifting right over the water (3–15 px a second), wider and sparser toward the eye, 60 % light
//   (#e1d4da, 0.03–0.11) and the rest dark (#14141e, twice that).
// The lake also mirrors (reflect, strength u_mirror), and a mirror always holds the sky: where only sky is mirrored the
// design's water shows no sky, so this paint is what, under that much mirrored sky, gives the design's colour.
const HY = 0.56;
const ASPECT = 1.7778;
const PX = 0.000926;
const W0 = vec3f(0.592, 0.545, 0.584);
const W1 = vec3f(0.306, 0.294, 0.369);
const W2 = vec3f(0.090, 0.094, 0.141);
const S0 = vec3f(0.114, 0.125, 0.188);
const S1 = vec3f(0.333, 0.341, 0.439);
const S2 = vec3f(0.678, 0.624, 0.639);
const S3 = vec3f(0.788, 0.714, 0.675);
const GLOW = vec3f(0.922, 0.784, 0.725);
const DISC = vec3f(0.941, 0.871, 0.816);
const PATH = vec3f(0.941, 0.843, 0.784);
const LIGHT = vec3f(0.882, 0.831, 0.855);
const DARK = vec3f(0.078, 0.078, 0.118);
const SUN = vec2f(1.1378, 0.495);

fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}
fn wave(k: f32, ph: f32) -> f32 { return sin(cycle(k / 6.2832) * 6.2832 + ph); }

// the sky as the sky element shows it at a point of the frame (its gradient, the sun's glow and disc)
fn sky(p: vec2f) -> vec3f {
  let s = clamp(p.y / HY, 0.0, 1.0);
  var c = mix(S0, S1, clamp(s / 0.5, 0.0, 1.0));
  c = select(c, mix(S1, S2, (s - 0.5) / 0.4), s > 0.5);
  c = select(c, mix(S2, S3, (s - 0.9) / 0.1), s > 0.9);
  let d = length(p - SUN);
  c = mix(c, GLOW, 0.22 * clamp(1.0 - d / 0.5, 0.0, 1.0));
  c = mix(c, DISC, 0.8 * select(0.0, 1.0, d < 0.028));
  return c;
}

fn water(y: f32) -> vec3f {
  let s = clamp((y - HY) / (1.0 - HY), 0.0, 1.0);
  return select(mix(W1, W2, (s - 0.35) / 0.65), mix(W0, W1, s / 0.35), s < 0.35);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let dist = max(2000.0 - at.y, 0.5);
  let p = vec2f(at.x / dist + ASPECT * 0.5, HY + 1.7 / dist);
  var c = water(p.y);
  for (var i = 0; i < 26; i++) {
    let fi = f32(i);
    let y = HY + 2.0 * PX + pow(fi / 26.0, 1.4) * (1.0 - HY) * 0.8;
    let w = (0.018 + fi * 3.2 * PX) * (0.5 + 0.5 * wave(1.6, fi * 1.7));
    let x = SUN.x + wave(0.9, fi) * 5.0 * PX;
    let inside = select(0.0, 1.0, abs(p.y - y - 0.8 * PX) < 0.8 * PX && abs(p.x - x) < w * 0.5);
    c = mix(c, PATH, 0.4 * (1.0 - fi / 26.0) * inside);
  }
  for (var i = 0u; i < 110u; i++) {
    let r1 = hashU(i * 5u + 11u);
    let r2 = hashU(i * 5u + 12u);
    let r3 = hashU(i * 5u + 13u);
    let r4 = hashU(i * 5u + 14u);
    let r5 = hashU(i * 5u + 15u);
    let d = pow(r1, 1.5);
    let y = HY + 3.0 * PX + d * (1.0 - HY);
    let w = (15.0 + r3 * 90.0) * (0.4 + d * 1.8) * PX;
    let span = ASPECT + w;
    let x = wrap(r2 * span + u_time * (3.0 + r4 * 12.0) * PX, span) - w;
    let a = 0.03 + r5 * 0.08;
    let light = hashU(i * 5u + 16u) < 0.6;
    let inside = select(0.0, 1.0, abs(p.y - y - 0.5 * PX) < 0.5 * PX && p.x > x && p.x < x + w);
    c = mix(c, select(DARK, LIGHT, light), select(a * 2.0, a, light) * inside);
  }
  let mirrored = srgbToLinear(sky(vec2f(p.x, 2.0 * HY - p.y)));
  let want = srgbToLinear(c);
  let paint = max((want - u_mirror * mirrored) / (1.0 - u_mirror), vec3f(0.0));
  return vec4f(paint, 1.0);
}

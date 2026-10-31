// The original's rain outside (house.js: 160 streaks): thin lines of #aab9e1 at 0.16, 1 px of 900 wide, each 0.02–
// 0.055 of the window's height long, leaning left (0.12 across for each down), falling 1.1–1.9 window-heights (0.62
// of the frame) a second along their lean. In the frame's terms: this card stands 3.6 m off on the floor (eye 1.7 m
// over it, horizon 0.5): (at.x / 3.6 + the stage's middle, 0.5 + (1.7 + at.y) / 3.6). Three bands of pace on grids
// of cells falling with them, one streak to a cell. Laid in the screen's colours over the night outside (#181e31):
// its strength turned into linear light's.
const RAIN = vec3f(0.667, 0.725, 0.882);
const BACK = vec3f(0.094, 0.118, 0.192);
const ASPECT = 1.7778;
const U = 0.001111;
const WH = 0.62;
const D = 3.6;
const BANDS = 3u;
const CELL = 0.0865;
const LEAN = -0.12;

fn band(p: vec2f, k: u32, px: f32) -> f32 {
  let kf = f32(k);
  let pace = WH * (1.1 + 0.8 * (kf + 0.5) / f32(BANDS));
  let q = (p - vec2f(LEAN, 1.0) * pace * u_time) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let len = WH * (0.02 + 0.035 * hash2(seed + vec2f(1.7, 9.2))) / CELL;
  let head = vec2f(0.25 + 0.6 * hash2(seed), 0.05 + 0.5 * hash2(seed + vec2f(11.3, 5.9)));
  let ab = vec2f(LEAN, 1.0) * len;
  let t = clamp(dot(f - head, ab) / dot(ab, ab), 0.0, 1.0);
  let d = length((f - (head + ab * t)) * CELL);
  return clamp((0.5 * U + 0.5 * px - d) / px, 0.0, 1.0) * 0.16;
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.5 + (1.7 + at.y) / D);
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)) / D, 0.00001);
  var keep = 1.0;
  for (var k = 0u; k < BANDS; k++) {
    keep *= 1.0 - band(p, k, px);
  }
  let a = 1.0 - keep;
  let screen = mix(BACK, RAIN, a);
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(RAIN);
  let lin = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * lin, lin);
}

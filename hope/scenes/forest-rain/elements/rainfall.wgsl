// The design's rain (draw_forest): 312 thin streaks over the frame (520 × its weather 0.6), each a line 1 px wide of
// #aac3c8 at 0.2, 10–28 px long, leaning 0.14 to the right, falling 0.9–1.5 of the frame's height a second along
// its lean — drawn over everything, fixed to the frame, as the design drew it last. In stage heights (a design pixel
// is 1 / 1080). Four bands of pace, each on a grid of cells moving with its fall: a cell holds one streak at a place
// of its own, so every pixel looks at one cell a band. Laid over the scene in the screen's colours as the canvas
// did: its strength turned into linear light's over the scene's typical dark (#162428).
const RAIN = vec3f(0.667, 0.765, 0.784);
const BACK = vec3f(0.086, 0.141, 0.157);
const PX = 0.000926;
const BANDS = 4u;
const CELL = 0.151;
const LEAN = 0.14;

fn band(p: vec2f, k: u32, px: f32) -> f32 {
  let kf = f32(k);
  let pace = 0.9 + 0.6 * (kf + 0.5) / f32(BANDS);
  let way = vec2f(LEAN, 1.0) * pace * u_time;
  let q = (p - way) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let len = (10.0 + 18.0 * hash2(seed + vec2f(1.7, 9.2))) * PX / CELL;
  let a = vec2f(0.1 + 0.7 * hash2(seed), 0.05 + 0.7 * hash2(seed + vec2f(11.3, 5.9)));
  let ab = vec2f(LEAN, 1.0) * len;
  let t = clamp(dot(f - a, ab) / dot(ab, ab), 0.0, 1.0);
  let d = length((f - (a + ab * t)) * CELL);
  return clamp((0.5 * PX + 0.5 * px - d) / px, 0.0, 1.0) * 0.2;
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)), 0.00001);
  var keep = 1.0;
  for (var k = 0u; k < BANDS; k++) {
    keep *= 1.0 - band(at, k, px);
  }
  let a = 1.0 - keep;
  let screen = mix(BACK, RAIN, a);
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(RAIN);
  let lin = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * lin, lin);
}

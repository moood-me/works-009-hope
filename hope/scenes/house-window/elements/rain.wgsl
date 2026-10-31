// The design's rain outside (draw_house): 54 thin streaks (90 × its weather 0.6) behind the pane, each a line 1 px
// wide of #aabed7 at 0.18 from its head to 2 px left and 9 px down, falling 1–2 window-heights (0.52 of the frame) a
// second. In the frame's terms: this card stands 9 m off on the floor (eye 1.7 m over it, horizon 0.5), so a point of
// it is (at.x / 9 + the stage's middle, 0.5 + (1.7 + at.y) / 9). Three bands of pace on grids of cells falling with
// them, one streak to a cell. Laid in the screen's colours over the night outside (#2a3848): its strength turned into
// linear light's.
const RAIN = vec3f(0.667, 0.745, 0.843);
const BACK = vec3f(0.165, 0.220, 0.282);
const ASPECT = 1.7778;
const PX = 0.000926;
const D = 9.0;
const BANDS = 3u;
const CELL = 0.11;

fn band(p: vec2f, k: u32, px: f32) -> f32 {
  let kf = f32(k);
  let pace = 0.52 * (1.0 + (kf + 0.5) / f32(BANDS));
  let q = vec2f(p.x, p.y - pace * u_time) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let head = vec2f(0.15 + 0.7 * hash2(seed), 0.1 + 0.7 * hash2(seed + vec2f(11.3, 5.9)));
  let ab = vec2f(-2.0, 9.0) * PX / CELL;
  let t = clamp(dot(f - head, ab) / dot(ab, ab), 0.0, 1.0);
  let d = length((f - (head + ab * t)) * CELL);
  return clamp((0.5 * PX + 0.5 * px - d) / px, 0.0, 1.0) * 0.18;
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

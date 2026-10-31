// The design's light on the wall, laid over its paint in the screen's colours as its canvas laid it — a point of this
// card (7.727 m off on the floor; eye 1.7 m, horizon 0.5) is (at.x / 7.727 + the stage's middle, 0.5 + (1.7 + at.y) /
// 7.727) of the frame:
// - the cold glow round the window (#6e8cb4, 0.11 at (the window's middle, 0.55 of its height), none 1.3 window-widths
//   off) — on the wall, not on the frame (the design drew the frame after it);
// - the dark line where the wall meets the floor (black at 0.35, 3 px over the floor's line);
// - the bulb's warm flash filling the room (#ffc482, 0.16 × the flicker at the bulb, none 0.7 of the frame's width ×
//   16/9 off) — the bulb's flicker written out as in lib.js (the same integer hash).
const ASPECT = 1.7778;
const D = 7.727;
const WW = 0.42;
const WH = 0.52;
const WX = 0.60778;
const WY = 0.16;
const FY = 0.72;
const FT = 0.0147;
const PX = 0.000926;
const COLD = vec3f(0.431, 0.549, 0.706);
const WARM = vec3f(1.0, 0.769, 0.51);

fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}
fn pcg(n: u32) -> f32 {
  let s = n * 747796405u + 2891336453u;
  var w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u;
  w = (w >> 22u) ^ w;
  return f32(w) / 4294967296.0;
}
fn flicker(t: f32) -> f32 {
  let k = i32(floor(t / 11.0));
  var b = 0.0;
  for (var j = k - 1; j <= k; j++) {
    if (j >= 0) {
      let ju = u32(j);
      let at = f32(j) * 11.0 + 2.0 + pcg(ju * 3u + 1u) * 6.6;
      let s = 0.5 + 0.5 * pcg(ju * 3u + 2u);
      b = select(b, max(b, s - 2.2 * (t - at)), t >= at);
    }
  }
  let stutter = select(1.0, 0.25, pcg(u32(floor(t * 30.0)) + 100000u) < 0.3);
  return max(b, 0.0) * stutter;
}
fn bulb() -> vec2f { return vec2f(0.8 * ASPECT + sin(cycle(0.5 / 6.2832) * 6.2832) * 0.006, 0.27); }

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.5 + (1.7 + at.y) / D);
  var screen = toScreen(painted.rgb / max(painted.a, 0.0001));
  let frame = p.x > WX - FT && p.x < WX + WW + FT && p.y > WY - FT && p.y < WY + WH + FT;
  let g = length(p - vec2f(WX + WW * 0.5, WY + WH * 0.55)) / (WW * 1.3);
  screen = mix(screen, COLD, select(0.11 * clamp(1.0 - g, 0.0, 1.0), 0.0, frame));
  screen = mix(screen, vec3f(0.0), select(0.0, 0.35, p.y > FY - 3.0 * PX && p.y <= FY));
  let r = length(p - bulb()) / (0.7 * ASPECT);
  screen = mix(screen, WARM, 0.16 * flicker(u_time) * clamp(1.0 - r, 0.0, 1.0));
  return vec4f(srgbToLinear(screen) * painted.a, painted.a);
}

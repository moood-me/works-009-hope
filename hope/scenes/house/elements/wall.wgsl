// The original's light on the wall (house.js), laid over its paint in the screen's colours — a point of this card
// (3.3 m off on the floor; eye 1.7 m, horizon 0.5) is (at.x / 3.3 + the stage's middle, 0.5 + (1.7 + at.y) / 3.3):
// - the cold glow of the window (#465a8c, 0.16 at (the window's middle, 0.6 of its height), none 1.1 window-widths off);
// - a warm glow from a lamp out of sight at the bottom right (#ff9646, 0.2 × (0.95 + 0.05 × its slow noise) at (0.97 of
//   the width, 1.02 of the height), none 1.1 of the height off);
// - the sill's shadow on the wall under it (black from 0.3 to none over 0.08 of the frame, the sill's width).
const ASPECT = 1.7778;
const D = 3.3;
const WW = 0.64;
const WH = 0.62;
const WX = 0.56889;
const WY = 0.1;
const COLD = vec3f(0.275, 0.353, 0.549);
const WARM = vec3f(1.0, 0.588, 0.275);

fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.5 + (1.7 + at.y) / D);
  var screen = toScreen(painted.rgb / max(painted.a, 0.0001));
  let c = length(p - vec2f(WX + WW * 0.5, WY + WH * 0.6)) / (WW * 1.1);
  screen = mix(screen, COLD, 0.16 * clamp(1.0 - c, 0.0, 1.0));
  let h = length(p - vec2f(0.97 * ASPECT, 1.02)) / 1.1;
  screen = mix(screen, WARM, 0.2 * (0.95 + 0.05 * noise1(u_time * 4.0)) * clamp(1.0 - h, 0.0, 1.0));
  let top = WY + WH + 0.028;
  let under = p.x > WX - 0.07 * WW && p.x < WX + 1.07 * WW && p.y > top && p.y < top + 0.08;
  screen = mix(screen, vec3f(0.0), select(0.0, 0.3 * (1.0 - (p.y - top) / 0.08), under));
  return vec4f(srgbToLinear(screen) * painted.a, painted.a);
}

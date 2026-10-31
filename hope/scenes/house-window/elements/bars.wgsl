// The bulb's warm flash filling the room (the design's: #ffc482, 0.16 × the flicker at the bulb, none 0.7 of the
// frame's width × 16/9 off), laid over this card's paint in the screen's colours — the design drew it over the window,
// its cross, the sill and the floor, under the girl. A point of this card (u_dist metres off on the floor; eye 1.7 m,
// horizon 0.5) is (at.x / dist + the stage's middle, 0.5 + (1.7 + at.y) / dist) of the frame. The flicker is lib.js's,
// written out with the same integer hash. One text for the window's cross and the sill: u_dist tells them apart.
const ASPECT = 1.7778;
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
  let p = vec2f(at.x / u_dist + ASPECT * 0.5, 0.5 + (1.7 + at.y) / u_dist);
  var screen = toScreen(painted.rgb / max(painted.a, 0.0001));
  let r = length(p - bulb()) / (0.7 * ASPECT);
  screen = mix(screen, WARM, 0.16 * flicker(u_time) * clamp(1.0 - r, 0.0, 1.0));
  return vec4f(srgbToLinear(screen) * painted.a, painted.a);
}

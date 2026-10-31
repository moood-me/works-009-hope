// The design's drops on the pane (draw_house: 70 drops): each a small round drop (0.8–3 px of 1080, #afc3dc at 0.32)
// with a speck of light on it (1 px, #e6f0ff at 0.4), that clings, then slips down a little, gathering speed, and
// clings again, leaving a short wet trail while it slips (#aabed7 at 0.12, 0.7 of its width); one gone past the sill
// comes again at the top. Made a function of time: each drop clings a while of its own in every cycle of its own (1.5–4
// s) and slips down its own step (0.03–0.1 of the window) in half a second. Over all that is seen through the pane, the
// bulb's flash (lib.js's flicker), as the design laid it over the window. In the frame's terms: this card stands 7.71 m
// off on the floor (eye 1.7 m, horizon 0.5): (at.x / 7.71 + the stage's middle, 0.5 + (1.7 + at.y) / 7.71). Laid in the
// screen's colours over the night through the pane (#2a3848): what that adds there is added as light (emission: the
// drops and the flash lighten what is behind the pane; they hide nothing).
const ASPECT = 1.7778;
const D = 7.71;
const WW = 0.42;
const WH = 0.52;
const WX = 0.60778;
const WY = 0.16;
const PX = 0.000926;
const DROP = vec3f(0.686, 0.765, 0.863);
const SPECK = vec3f(0.902, 0.941, 1.0);
const WET = vec3f(0.667, 0.745, 0.843);
const BACK = vec3f(0.165, 0.220, 0.282);
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
  let inside = p.x > WX && p.x < WX + WW && p.y > WY && p.y < WY + WH;
  var screen = BACK;
  for (var i = 0u; i < 70u; i++) {
    let r1 = pcg(i * 9u + 7001u);
    let r2 = pcg(i * 9u + 7002u);
    let r3 = pcg(i * 9u + 7003u);
    let r4 = pcg(i * 9u + 7004u);
    let r5 = pcg(i * 9u + 7005u);
    let rad = (0.8 + r3 * 2.2) * PX;
    let cyc = 1.5 + r4 * 2.5;
    let step = (0.03 + r5 * 0.07) * WH;
    let n = floor(u_time / cyc);
    let tf = u_time - n * cyc;
    let cling = cyc - 0.5;
    let slip = clamp((tf - cling) / 0.5, 0.0, 1.0);
    let moved = step * (n + slip * slip);
    let y = WY - 4.0 * PX + wrap(r2 * WH + moved, WH + 8.0 * PX);
    let x = WX + r1 * WW;
    let dx = abs(p.x - x);
    let trail = step * 2.0 * slip * select(0.0, 1.0, slip > 0.0 && slip < 1.0);
    let onTrail = select(0.0, 0.12, dx < rad * 0.35 && p.y < y && p.y > y - trail * 0.5);
    screen = mix(screen, WET, onTrail);
    let d = length(p - vec2f(x, y));
    screen = mix(screen, DROP, 0.32 * clamp((rad - d) / PX + 0.5, 0.0, 1.0));
    let sp = vec2f(x - rad * 0.4, y - rad * 0.5);
    screen = mix(screen, SPECK, select(0.0, 0.4, abs(p.x - sp.x) < 0.5 * PX && abs(p.y - sp.y) < 0.5 * PX));
  }
  let r = length(p - bulb()) / (0.7 * ASPECT);
  screen = mix(screen, WARM, 0.16 * flicker(u_time) * clamp(1.0 - r, 0.0, 1.0));
  let bg = srgbToLinear(BACK);
  let lin = srgbToLinear(screen) - bg;
  let a = select(0.0, 1.0, inside);
  emission = max(lin, vec3f(0.0)) * a;
  return vec4f(0.0);
}

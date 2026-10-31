// What moves on the pane, the original's (house.js), in the frame's terms — this card stands 3.29 m off on the floor
// (eye 1.7 m, horizon 0.5): (at.x / 3.29 + the stage's middle, 0.5 + (1.7 + at.y) / 3.29) — in the screen's colours:
// - bokeh: 16 big soft discs of the city's lights (amber #ffb46e mostly, some #78aaff) in the window's lower half, 0.025–
//   0.075 of the window wide, 0.07–0.19 strong (breathing 0.75 + 0.25 sin(0.5 t)), flat to 0.75 of their radius, added
//   as light; a third of them drifting slowly across;
// - lightning: the first at 14 s, then 18–38 s apart: the window flares #b9c3eb at 0.22 × (a flash fading in 0.12 s and
//   another, 0.7 as strong, 0.3 s after);
// - 11 drops that cling and slide down (0.13 of the window a second) leaving trails that fade over 8 s (#afbee1 at
//   0.22, 0.6 of the drop wide); each drop a faint shadow, a pale body and a speck of light;
// - her breath fogging the glass by her face (#c8d2eb, 0.12 + 0.06 sin 1.1t, 0.28 of her size round).
// The painted drops come first. All laid over the night seen through the pane (#181e31): what that gives is what
// this pane lays over what is behind it: its darkening as alpha, the rest as light added (emission).
const ASPECT = 1.7778;
const D = 3.29;
const WW = 0.64;
const WH = 0.62;
const WX = 0.56889;
const WY = 0.1;
const BACK = vec3f(0.094, 0.118, 0.192);
const AMBER = vec3f(1.0, 0.706, 0.431);
const COLD = vec3f(0.471, 0.667, 1.0);
const FLASH = vec3f(0.725, 0.765, 0.922);
const TRAIL = vec3f(0.686, 0.745, 0.882);
const SHADOW = vec3f(0.031, 0.039, 0.071);
const BODY = vec3f(0.725, 0.776, 0.902);
const FOG = vec3f(0.784, 0.824, 0.922);

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
fn wave(k: f32, ph: f32) -> f32 { return sin(cycle(k / 6.2832) * 6.2832 + ph); }

fn flash(t: f32) -> f32 {
  var at = 14.0;
  for (var n = 0u; n < 200u; n++) {
    let next = at + 0.6 + 18.0 + 20.0 * pcg(n + 900u);
    if (next > t) {
      break;
    }
    at = next;
  }
  let ft = t - at;
  return select(0.0, max(0.0, 1.0 - ft / 0.12) + 0.7 * max(0.0, 1.0 - abs(ft - 0.3) / 0.1), ft > 0.0);
}

// a sliding drop's place down the window at time t (unwrapped)
fn slid(i: u32, t: f32) -> f32 {
  let cyc = 2.0 + 3.0 * pcg(i * 7u + 401u);
  let n = floor(t / cyc);
  let slip = clamp((t - n * cyc - (cyc - 1.0)) / 1.0, 0.0, 1.0);
  return pcg(i * 7u + 402u) * WH + 0.13 * WH * (n + slip);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.5 + (1.7 + at.y) / D);
  let w = p - vec2f(WX, WY);
  let bg = srgbToLinear(BACK);
  var keep = 1.0 - painted.a;
  var screen = toScreen(bg * keep + painted.rgb);
  for (var i = 0u; i < 16u; i++) {
    let r = WW * (0.025 + 0.05 * pcg(i * 7u + 101u));
    let drift = select(0.0, (pcg(i * 7u + 102u) - 0.5) * WW * 0.04, pcg(i * 7u + 103u) < 0.3);
    let span = WW + 2.0 * r;
    let x = wrap(pcg(i * 7u + 104u) * WW + drift * u_time, span) - r;
    let y = WH * (0.55 + 0.45 * pcg(i * 7u + 105u));
    let a = (0.07 + 0.12 * pcg(i * 7u + 106u)) * (0.75 + 0.25 * wave(0.5, pcg(i * 7u + 107u) * 7.0));
    let col = select(COLD, AMBER, pcg(i * 7u + 108u) < 0.7);
    let d = length(w - vec2f(x, y)) / r;
    let k = select(select(0.0, mix(0.8, 0.0, (d - 0.75) / 0.25), d < 1.0), mix(1.0, 0.8, d / 0.75), d < 0.75);
    screen = screen + col * a * k;
  }
  screen = mix(screen, FLASH, 0.22 * flash(u_time));
  for (var i = 0u; i < 11u; i++) {
    let r = WW * (0.004 + 0.004 * pcg(i * 7u + 403u));
    let x = pcg(i * 7u + 404u) * WW;
    let span = WH + 4.0 * r;
    let now = slid(i, u_time);
    let lap = floor((now + 2.0 * r) / span);
    let y = wrap(now + 2.0 * r, span) - 2.0 * r;
    let past = slid(i, u_time - 8.0) - lap * span;
    let along = select(0.0, clamp((w.y - past) / max(y - past, 0.0001), 0.0, 1.0), w.y > past && w.y < y);
    let onTrail = select(0.0, 0.22 * along, abs(w.x - x) < r * 0.3 && w.y > past && w.y < y);
    screen = mix(screen, TRAIL, onTrail);
    let ds = length(w - vec2f(x, y + r * 0.18)) / r;
    let sh = select(0.0, 0.35, ds < 1.0);
    screen = mix(screen, SHADOW, sh);
    keep *= 1.0 - sh;
    screen = mix(screen, BODY, select(0.0, 0.2, length(w - vec2f(x, y)) < r * 0.9));
    screen = mix(screen, vec3f(1.0), select(0.0, 0.55, length(w - vec2f(x - 0.3 * r, y - 0.35 * r)) < r * 0.25));
  }
  let s = 0.42 * WH;
  let fog = length(p - vec2f(WX + 0.8 * WW - 0.36 * s, WY + WH - 0.66 * s)) / (0.28 * s);
  screen = mix(screen, FOG, (0.12 + 0.06 * wave(1.1, 0.0)) * clamp(1.0 - fog, 0.0, 1.0));
  let inside = select(0.0, 1.0, w.x > 0.0 && w.x < WW && w.y > 0.0 && w.y < WH);
  let a = (1.0 - keep) * inside;
  emission = max(srgbToLinear(screen) - bg * (1.0 - a), vec3f(0.0)) * inside;
  return vec4f(0.0, 0.0, 0.0, a);
}

// The design's dust (draw_house: 70 motes): tiny round motes (0.4–1.6 px of 1080, #becde6) rising slowly through the
// room before the window (from 0.2 window-widths left of it to 1.4 right, from the window's top to the floor's foot),
// swaying side to side, faint (0.08) but brighter in the window's light on the floor (0.35), and brighter still while
// the bulb flashes (+ 0.3 × the flash: lib.js's flicker). Drawn over everything, fixed to the frame, as the design drew
// them last. Two bands of pace (0.9 and 1.8 px a second up; their sway the design's sp / 0.3), on grids of cells rising
// with them, one mote to a cell. Laid in the screen's colours over the room's dark (#121218): its strength turned
// into linear light's.
const ASPECT = 1.7778;
const WW = 0.42;
const WX = 0.60778;
const WY = 0.16;
const FY = 0.72;
const PX = 0.000926;
const MOTE = vec3f(0.745, 0.804, 0.902);
const BACK = vec3f(0.071, 0.071, 0.094);
const CELL = 0.127;

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

fn band(p: vec2f, k: u32, b: f32) -> f32 {
  let kf = f32(k);
  let sp = 3.0 + 3.0 * kf;
  let q = vec2f(p.x, p.y + sp * 0.3 * PX * u_time) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let ph = hash2(seed + vec2f(3.1, 7.7)) * 6.2832;
  let sway = -cos(cycle(0.3 / 6.2832) * 6.2832 + ph) * sp / 0.3 * PX / CELL;
  let centre = vec2f(0.25 + 0.5 * hash2(seed) + sway, 0.2 + 0.6 * hash2(seed + vec2f(11.3, 5.9)));
  let rad = 0.4 + hash2(seed + vec2f(1.7, 9.2)) * 1.2;
  let d = length((f - centre) * CELL) / PX;
  let pos = (cell + centre - vec2f(kf * 0.37, kf * 0.61)) * CELL - vec2f(0.0, sp * 0.3 * PX * u_time);
  let beam = select(0.08, 0.35, pos.y > FY - (1.0 - FY) * 0.1 && pos.x > WX - 0.3 * WW && pos.x < WX + 1.4 * WW);
  return clamp(rad + 0.5 - d, 0.0, 1.0) * min(beam + b * 0.3, 1.0);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let room = at.x > WX - 0.2 * WW && at.x < WX + 1.4 * WW && at.y > WY && at.y < 1.0;
  let b = flicker(u_time);
  var keep = 1.0;
  for (var k = 0u; k < 2u; k++) {
    keep *= 1.0 - band(at, k, b);
  }
  let a = select(0.0, 1.0 - keep, room);
  let screen = mix(BACK, MOTE, a);
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(MOTE);
  let lin = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * lin, lin);
}

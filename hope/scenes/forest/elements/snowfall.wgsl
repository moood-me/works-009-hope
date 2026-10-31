// The original's snow (forest.js): about 460 soft flakes over the frame at three depths and between — z from 0 (far)
// to 1 (near) — each falling (25 + 75 z) px a second of 900, carried sideways by the slow uneven wind (blow ×
// (25 + 90 z), its sum over time u_blow from animate) and swaying (12 z px a second, sin(0.8 t + its phase)); a
// radial white sprite (1, 0.8 at 0.35 of its radius, none at its rim) of radius (1.2 + 7 z²) px, (0.3 + 0.55 z)
// opaque. Drawn over everything, fixed to the frame, as the original drew it last. In stage heights (a pixel of the
// original's 900 is 1 / 900). Depth is six bands (z jittered within each), each on a grid of cells moving with its
// fall and its wind: a cell holds one flake at a place of its own, so every pixel looks at one cell a band. Laid
// over the scene in the screen's colours as the canvas did: its strength turned into linear light's over the
// scene's typical middle grey (#5a6472).
const FLAKE = vec3f(1.0, 1.0, 1.0);
const BACK = vec3f(0.353, 0.392, 0.447);
const U = 0.001111;
const BANDS = 6u;
const CELL = 0.152;

fn sprite(d: f32) -> f32 {
  return select(mix(0.8, 0.0, (d - 0.35) / 0.65), mix(1.0, 0.8, d / 0.35), d < 0.35) * step(d, 1.0);
}

fn band(p: vec2f, k: u32) -> f32 {
  let kf = f32(k);
  let z0 = (kf + 0.5) / f32(BANDS);
  let fall = (25.0 + 75.0 * z0) * U;
  let drift = u_blow * (25.0 + 90.0 * z0) * U;
  let q = vec2f(p.x - drift, p.y - fall * u_time) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let z = clamp(z0 + (hash2(seed + vec2f(4.4, 2.2)) - 0.5) / f32(BANDS), 0.0, 1.0);
  let ph = hash2(seed + vec2f(3.1, 7.7)) * 6.2832;
  let sway = -cos(cycle(0.8 / 6.2832) * 6.2832 + ph) * 12.0 * z / 0.8 * U / CELL;
  let centre = vec2f(0.2 + 0.6 * hash2(seed) + sway, 0.2 + 0.6 * hash2(seed + vec2f(11.3, 5.9)));
  let r = (1.2 + 7.0 * z * z) * U;
  let d = length((f - centre) * CELL) / r;
  return sprite(d) * (0.3 + 0.55 * z);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  var keep = 1.0;
  for (var k = 0u; k < BANDS; k++) {
    keep *= 1.0 - band(at, k);
  }
  let a = 1.0 - keep;
  let screen = mix(BACK, FLAKE, a);
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(FLAKE);
  let lin = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * lin, lin);
}

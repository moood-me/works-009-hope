// The design's low sun over the lake (draw_lake), laid over the painted gradient in the screen's colours as its canvas
// laid them: a wide glow (radius 0.5 of the frame's height, #ebc8b9, 0.22 at its middle, none at its rim), the disc
// (radius 0.028, #f0ded0 at 0.8) at (0.64 of the width, 0.065 above the horizon), and forty faint motes drifting in
// the air above the water (0.5–1.5 px of 1080, #f0e6e6, 0.15 ± 0.15 breathing, wandering 20 px across and 10 up and
// down) — one mote to a cell of a grid over the sky, so each pixel looks at one cell.
const GLOW = vec3f(0.922, 0.784, 0.725);
const DISC = vec3f(0.941, 0.871, 0.816);
const MOTE = vec3f(0.941, 0.902, 0.902);
const SUN = vec2f(1.1378, 0.495);
const PX = 0.000926;
const CELL = 0.177;

fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}

fn wave(k: f32, ph: f32) -> f32 { return sin(cycle(k / 6.2832) * 6.2832 + ph); }

fn mote(p: vec2f) -> f32 {
  let q = p / CELL;
  let cell = floor(q);
  let f = q - cell;
  let ph = hash2(cell + vec2f(5.3, 1.9)) * 6.2832;
  let wander = vec2f(wave(0.2, ph) * 20.0, wave(0.25, ph) * 10.0) * PX / CELL;
  let centre = vec2f(0.2 + 0.6 * hash2(cell), 0.2 + 0.6 * hash2(cell + vec2f(7.1, 3.3))) + wander;
  let rad = 0.5 + hash2(cell + vec2f(2.2, 8.8));
  let d = length((f - centre) * CELL) / PX;
  let a = 0.15 + 0.15 * wave(1.0, ph);
  let inSky = select(0.0, 1.0, p.y > 0.0 && p.y < 0.7);
  return clamp(rad + 0.5 - d, 0.0, 1.0) * a * inSky;
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let d = length(at - SUN);
  var screen = toScreen(painted.rgb);
  screen = mix(screen, GLOW, 0.22 * clamp(1.0 - d / 0.5, 0.0, 1.0));
  let px = max(abs(at_dx.x) + abs(at_dy.x), 0.00001);
  screen = mix(screen, DISC, 0.8 * clamp((0.028 - d) / px + 0.5, 0.0, 1.0));
  screen = mix(screen, MOTE, mote(at));
  return vec4f(srgbToLinear(screen), painted.a);
}

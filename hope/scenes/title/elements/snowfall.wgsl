// The design's snow on the title (draw_title): 140 flakes over the whole frame, each a solid round dot of #dce1eb,
// 0.5–2.1 px of 1080 in radius, (0.25 + 0.2·radius) × 0.55 opaque, falling 8–30 px a second and swaying side to
// side (6 px a second, sin(0.6 t + its phase)) — drawn over everything, fixed to the frame, as the design drew it.
// In stage heights: the frame's height is 1, so a design pixel is 1 / 1080. The flakes ride four bands of pace (the
// design's speeds drawn per flake are bands here), each on a grid of cells that falls at its pace: a cell holds one
// flake at a place of its own, so every pixel looks at one cell a band. Laid over the scene in the screen's colours
// as the design's canvas did: its strength is turned into linear light's over the scene's typical dark (#141a22).
const FLAKE = vec3f(0.863, 0.882, 0.922);
const BACK = vec3f(0.078, 0.102, 0.133);
const PX = 0.000926;
const BANDS = 4u;
const CELL = 0.225;

fn band(p: vec2f, k: u32) -> f32 {
  let kf = f32(k);
  let pace = (8.0 + 22.0 * (kf + 0.5) / f32(BANDS)) * PX;
  let q = vec2f(p.x, p.y - pace * u_time) / CELL + vec2f(kf * 0.37, kf * 0.61);
  let cell = floor(q);
  let f = q - cell;
  let seed = cell + vec2f(kf * 31.7, kf * 17.3);
  let ph = hash2(seed + vec2f(3.1, 7.7)) * 6.2832;
  let sway = -cos(cycle(0.6 / 6.2832) * 6.2832 + ph) * 6.0 / 0.6 * PX / CELL;
  let centre = vec2f(0.15 + 0.7 * hash2(seed) + sway, 0.15 + 0.7 * hash2(seed + vec2f(11.3, 5.9)));
  let rad = 0.5 + hash2(seed + vec2f(1.7, 9.2)) * 1.6;
  let d = length((f - centre) * CELL) / PX;
  let cover = clamp(rad + 0.5 - d, 0.0, 1.0);
  return cover * (0.25 + 0.2 * rad) * 0.55;
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

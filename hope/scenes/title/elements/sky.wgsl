// The design's sky effects, laid over the painted gradient in the screen's colours (as its canvas laid them, not in
// linear light):
// - the pale aura in the middle: a radial glow of #becde1 at (the stage's middle, 0.4), radius 0.55 of the
//   frame's height, its strength breathing 0.06 + 0.02 sin(0.7 t) at its middle, none at its edge;
// - the far fog (the design's f1): six soft ellipses of #96a5b9 round 0.6 of the frame's height, each drifting
//   right at its own pace (4–14 px a second at 1080) and coming round again, each 0.055–0.143 strong at its
//   middle and none at its rim. Their sizes, places, paces and strengths are the design's ranges, drawn per blob.
const AURA = vec3f(0.745, 0.804, 0.882);
const FOG = vec3f(0.588, 0.647, 0.725);
const CENTRE = vec2f(0.8889, 0.4);
const RADIUS = 0.55;
const ASPECT = 1.7778;
const LEFT = -0.7;
const SPAN = 3.1778;

// linear light back to the screen's colours (the sRGB curve: srgbToLinear's inverse)
fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}

fn blob(at: vec2f, i: u32) -> f32 {
  let h1 = hashU(i * 7u + 1u);
  let h2 = hashU(i * 7u + 2u);
  let h3 = hashU(i * 7u + 3u);
  let h4 = hashU(i * 7u + 4u);
  let h5 = hashU(i * 7u + 5u);
  let h6 = hashU(i * 7u + 6u);
  let rx = ASPECT * (0.25 + h3 * 0.3);
  let ry = 0.12 * (0.6 + h4 * 0.8);
  let pace = (4.0 + h5 * 10.0) / 1080.0;
  let strength = (0.05 + h6 * 0.08) * 1.1;
  let span = SPAN + 2.0 * rx;
  let x = LEFT - rx + wrap(h1 * span + u_time * pace, span);
  let y = 0.6 + (h2 - 0.5) * 0.06;
  let d = length(vec2f((at.x - x) / rx, (at.y - y) / ry));
  return strength * clamp(1.0 - d, 0.0, 1.0);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  var screen = toScreen(painted.rgb);
  let r = length(at - CENTRE) / RADIUS;
  let breath = 0.06 + 0.02 * sin(cycle(0.7 / (2.0 * PI)) * 2.0 * PI);
  screen = mix(screen, AURA, breath * clamp(1.0 - r, 0.0, 1.0));
  for (var i = 0u; i < 6u; i++) {
    screen = mix(screen, FOG, blob(at, i));
  }
  return vec4f(srgbToLinear(screen), painted.a);
}

// The design's hazy moon behind the rain, no disc: two radial glows at (0.27 of the stage, 0.2) laid over the painted
// gradient in the screen's colours as its canvas laid them — a wide one (radius 0.45 of the frame's height, #a0c3c8,
// 0.12 at its middle) and a small bright one (radius 0.06, #e1eeee, 0.4) — each none at its rim.
const WIDE = vec3f(0.627, 0.765, 0.784);
const CORE = vec3f(0.882, 0.933, 0.933);
const MOON = vec2f(0.48, 0.2);

fn toScreen(c: vec3f) -> vec3f {
  let k = max(c, vec3f(0.0));
  return select(1.055 * pow(k, vec3f(1.0 / 2.4)) - 0.055, k * 12.92, k <= vec3f(0.0031308));
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let d = length(at - MOON);
  var screen = toScreen(painted.rgb);
  screen = mix(screen, WIDE, 0.12 * clamp(1.0 - d / 0.45, 0.0, 1.0));
  screen = mix(screen, CORE, 0.4 * clamp(1.0 - d / 0.06, 0.0, 1.0));
  return vec4f(srgbToLinear(screen), painted.a);
}

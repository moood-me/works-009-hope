// The design's mist on the far water (draw_lake: fogs(r, 7, …, 0.03) at the horizon + 0.01): seven long soft
// ellipses of #dcd0d4 round 0.57 of the frame's height, each 0.03 · (0.6–1.4) of it tall, drifting right at its own
// pace (4–14 px a second at 1080) and coming round again, (0.05–0.13) × 1.2 strong at the middle, none at the rim — in
// the frame's terms: this card stands 30 m off on the water (eye 1.7 m, horizon 0.56), so a point of it is
// (at.x / 30 + the stage's middle, 0.56 + (1.7 + at.y) / 30) of the frame. The design laid it in the screen's colours
// over the pale water and sky by the horizon (#b0a2a6): its strength is turned into linear light's that gives the
// same colour there.
const MIST = vec3f(0.863, 0.816, 0.831);
const BACK = vec3f(0.690, 0.635, 0.651);
const ASPECT = 1.7778;
const LEFT = -0.7;
const SPAN = 3.1778;
const D = 30.0;

fn blob(p: vec2f, i: u32) -> f32 {
  let h1 = hashU(i * 7u + 501u);
  let h2 = hashU(i * 7u + 502u);
  let h3 = hashU(i * 7u + 503u);
  let h4 = hashU(i * 7u + 504u);
  let h5 = hashU(i * 7u + 505u);
  let h6 = hashU(i * 7u + 506u);
  let rx = ASPECT * (0.25 + h3 * 0.3);
  let ry = 0.03 * (0.6 + h4 * 0.8);
  let pace = (4.0 + h5 * 10.0) / 1080.0;
  let strength = (0.05 + h6 * 0.08) * 1.2;
  let span = SPAN + 2.0 * rx;
  let x = LEFT - rx + wrap(h1 * span + u_time * pace, span);
  let y = 0.57 + (h2 - 0.5) * 0.06;
  let d = length(vec2f((p.x - x) / rx, (p.y - y) / ry));
  return strength * clamp(1.0 - d, 0.0, 1.0);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.56 + (1.7 + at.y) / D);
  var screen = BACK;
  for (var i = 0u; i < 7u; i++) {
    screen = mix(screen, MIST, blob(p, i));
  }
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(MIST);
  let a = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * a, a);
}

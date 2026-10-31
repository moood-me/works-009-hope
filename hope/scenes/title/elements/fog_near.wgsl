// The design's near fog (f2): five soft ellipses of #78879b round 0.78 of the frame's height, before the hill and
// the child, each drifting right at its own pace (5.6–19.6 px a second at 1080) and coming round again, each
// 0.045–0.117 strong at its middle and none at its rim — in the frame's terms: this card stands 7 m off on the
// ground (eye 1.7 m, horizon 0.7), so a point of it is (at.x / 7 + the stage's middle, 0.7 + (1.7 + at.y) / 7) of
// the frame. The design laid it over the dark ground in the screen's colours: its strength is turned into the
// linear light's that gives the same colour over that ground (#0f1318).
const FOG = vec3f(0.471, 0.529, 0.608);
const GROUND = vec3f(0.059, 0.075, 0.094);
const ASPECT = 1.7778;
const LEFT = -0.7;
const SPAN = 3.1778;
const D = 7.0;

fn blob(p: vec2f, i: u32) -> f32 {
  let h1 = hashU(i * 7u + 101u);
  let h2 = hashU(i * 7u + 102u);
  let h3 = hashU(i * 7u + 103u);
  let h4 = hashU(i * 7u + 104u);
  let h5 = hashU(i * 7u + 105u);
  let h6 = hashU(i * 7u + 106u);
  let rx = ASPECT * (0.25 + h3 * 0.3);
  let ry = 0.08 * (0.6 + h4 * 0.8);
  let pace = (4.0 + h5 * 10.0) * 1.4 / 1080.0;
  let strength = (0.05 + h6 * 0.08) * 0.9;
  let span = SPAN + 2.0 * rx;
  let x = LEFT - rx + wrap(h1 * span + u_time * pace, span);
  let y = 0.78 + (h2 - 0.5) * 0.06;
  let d = length(vec2f((p.x - x) / rx, (p.y - y) / ry));
  return strength * clamp(1.0 - d, 0.0, 1.0);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / D + ASPECT * 0.5, 0.7 + (1.7 + at.y) / D);
  var screen = GROUND;
  for (var i = 0u; i < 5u; i++) {
    screen = mix(screen, FOG, blob(p, i));
  }
  let bg = srgbToLinear(GROUND);
  let col = srgbToLinear(FOG);
  let a = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * a, a);
}

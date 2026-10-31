// The design's fog at the foot of a row of pines (draw_forest: fogs(r, 5, …, 0.07), drawn at the row's base −
// 0.04 of the frame, #78969b, strength × (1.2 − 0.2·row)): five soft ellipses, each drifting right at its own pace
// (4–14 px a second at 1080) and coming round again, 0.05–0.13 strong at the middle, none at the rim. In the
// frame's terms: this card stands u_dist metres off on the ground (eye 1.7 m, horizon 0.6), so a point of it is
// (at.x / dist + the stage's middle, 0.6 + (1.7 + at.y) / dist) of the frame. The design laid it in the screen's
// colours over the row's own colour (u_bgr, u_bgg, u_bgb): its strength is turned into linear light's that gives
// the same colour there. One text for every row's fog: the uniforms tell them apart.
const FOG = vec3f(0.471, 0.588, 0.608);
const ASPECT = 1.7778;
const LEFT = -0.7;
const SPAN = 3.1778;

fn blob(p: vec2f, i: u32) -> f32 {
  let k = u32(u_row) * 50u + i * 7u + 300u;
  let h1 = hashU(k + 1u);
  let h2 = hashU(k + 2u);
  let h3 = hashU(k + 3u);
  let h4 = hashU(k + 4u);
  let h5 = hashU(k + 5u);
  let h6 = hashU(k + 6u);
  let rx = ASPECT * (0.25 + h3 * 0.3);
  let ry = 0.07 * (0.6 + h4 * 0.8);
  let pace = (4.0 + h5 * 10.0) / 1080.0;
  let strength = (0.05 + h6 * 0.08) * u_strength;
  let span = SPAN + 2.0 * rx;
  let x = LEFT - rx + wrap(h1 * span + u_time * pace, span);
  let y = u_base - 0.04 + (h2 - 0.5) * 0.06;
  let d = length(vec2f((p.x - x) / rx, (p.y - y) / ry));
  return strength * clamp(1.0 - d, 0.0, 1.0);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = vec2f(at.x / u_dist + ASPECT * 0.5, 0.6 + (1.7 + at.y) / u_dist);
  let ground = vec3f(u_bgr, u_bgg, u_bgb);
  var screen = ground;
  for (var i = 0u; i < 5u; i++) {
    screen = mix(screen, FOG, blob(p, i));
  }
  let bg = srgbToLinear(ground);
  let col = srgbToLinear(FOG);
  let a = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * a, a);
}

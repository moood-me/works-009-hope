// The design's rings on the water (ripple): each drop from her foot sends out three rings, 0.35 s apart, growing 26,
// 30 and 34 px a second of 1080 (at 9.71 m a pixel is 9 mm), each a line 1 px wide of #ebe1e4, 0.33 strong at the
// start and fading by half in about 1.2 s (× 0.55 a second). This plane lies on the water under her foot (its own
// metres, y toward the eye); the last two drops — when they fell (u_drop0, u_drop1) and where across from her foot
// (u_x0, u_x1) — come from animate. Water lays it in perspective, so the rings are flattened as the design drew them.
// Laid in the screen's colours over the water there (#5d586b): its strength is turned into linear light's.
const RING = vec3f(0.922, 0.882, 0.894);
const BACK = vec3f(0.365, 0.345, 0.420);
const PXM = 0.009;

fn rings(at: vec2f, t0: f32, x0: f32) -> f32 {
  let rel = at - vec2f(x0, 0.0);
  let d = length(rel);
  let n = rel / max(d, 0.0001);
  let px = max(length(vec2f(dot(n, at_dx), dot(n, at_dy))), 0.0001);
  var keep = 1.0;
  for (var i = 0; i < 3; i++) {
    let fi = f32(i);
    let age = u_time - t0 - 0.35 * fi;
    let r = (1.0 + age * (26.0 + 4.0 * fi)) * PXM;
    let a = 0.33 * pow(0.55, age) * select(0.0, 1.0, age > 0.0);
    let cover = clamp(1.0 - abs(d - r) / px, 0.0, 1.0) * clamp(1.0 * PXM / px, 0.0, 1.0);
    keep *= 1.0 - a * cover;
  }
  return 1.0 - keep;
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let a = 1.0 - (1.0 - rings(at, u_drop0, u_x0)) * (1.0 - rings(at, u_drop1, u_x1));
  let screen = mix(BACK, RING, a);
  let bg = srgbToLinear(BACK);
  let col = srgbToLinear(RING);
  let lin = clamp((srgbToLinear(screen).g - bg.g) / (col.g - bg.g), 0.0, 1.0);
  return vec4f(col * lin, lin);
}

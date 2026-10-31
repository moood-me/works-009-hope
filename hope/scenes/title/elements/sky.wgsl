// The design's pale aura in the middle of the sky: a radial glow of #becde1 at (the stage's middle, 0.4), radius
// 0.55 of the frame's height, its strength breathing 0.06 + 0.02 sin(0.7 t) at its middle and none at its edge —
// laid over the painted gradient as the design laid it (in the screen's colours, not in linear light).
const AURA = vec3f(0.745, 0.804, 0.882);
const CENTRE = vec2f(0.8889, 0.4);
const RADIUS = 0.55;

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let r = length(at - CENTRE) / RADIUS;
  let strength = 0.06 + 0.02 * sin(cycle(0.7 / (2.0 * PI)) * 2.0 * PI);
  let a = strength * clamp(1.0 - r, 0.0, 1.0);
  let screen = pow(max(painted.rgb, vec3f(0.0)), vec3f(1.0 / 2.2));
  let mixed = mix(screen, AURA, a);
  return vec4f(pow(mixed, vec3f(2.2)), painted.a);
}

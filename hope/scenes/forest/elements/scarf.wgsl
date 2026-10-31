// The scarf's two ends, the original's: each a strip 0.05 wide from the knot (0.08, -0.75), reaching out
// 0.06 + 0.26 wind to the right and 0.22 - 0.16 wind down, a wave running along it toward its free end
// (0.03 at the end). In body units (the boy is 0.94 m): at / 0.94. The wind, the wave's phase (added up by
// animate, so a change of the wind never jumps it) and the breath's bob come as uniforms.
const RED = vec3f(0.392, 0.034, 0.024);
const SIZE = 0.94;

fn reach(p: vec2f, ph: f32) -> f32 {
  let ext = 0.06 + 0.26 * u_wind;
  let fall = 0.22 - 0.16 * u_wind;
  let k = clamp((p.x - 0.08) / ext, 0.0, 1.0);
  let arg = u_phase + ph - k * 8.1;
  let y = -0.75 - u_bob + k * fall + sin(arg) * 0.03 * k;
  let dydk = fall + sin(arg) * 0.03 - cos(arg) * 8.1 * 0.03 * k;
  let slope = dydk / ext;
  let ex = p.x - (0.08 + k * ext);
  let ey = (p.y - y) / sqrt(1.0 + slope * slope);
  return sqrt(ex * ex + ey * ey);
}

fn shade(painted: vec4f, at: vec2f, uv: vec2f) -> vec4f {
  let p = at / SIZE;
  let px = max(max(abs(at_dx.x) + abs(at_dy.x), abs(at_dx.y) + abs(at_dy.y)) / SIZE, 0.0001);
  let a1 = clamp((0.025 + 0.5 * px - reach(p, 0.0)) / px, 0.0, 1.0);
  let a2 = clamp((0.025 + 0.5 * px - reach(p, 1.9)) / px, 0.0, 1.0);
  let a = max(a1, a2);
  return painted + vec4f(RED * a, a) * (1.0 - painted.a);
}

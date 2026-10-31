// The original's micro-motion: legs swinging out of step (0.7 rad/s, half a turn apart), breathing
// (1.2 % about the seat), hair stirring at its free end.
const t = e.t;
const swing = ph => Math.sin(t * 0.7 + ph) * 0.14 - 0.06;
e.layer('leg_near').rotate = -swing(0);
e.layer('leg_far').rotate = -swing(2.3);

const k = 1 + Math.sin(t * 1.3) * 0.012;
e.layer('body').scaleY = k;

// the hair scales with the body about the seat: about its own crown, and lifted as the crown is
const hair = e.layer('hair');
hair.scaleY = k;
hair.y = -0.8 * (k - 1);
const w = Math.sin(t * 1.1) * 0.025 + Math.sin(t * 2.9) * 0.008;
hair.rotate = -w / 0.52;

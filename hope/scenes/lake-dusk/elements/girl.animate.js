// The design's micro-motion: each foot swings 0.07 of her size (sin(1.05 t + phase), phases 0.9 and 0) — the shin
// turned about the knee by that much over its 0.33 — and she breathes, her shoulders rising 0.012 of her size
// (sin 1.25 t), the upper body stretched from her hips (0.5 of her size below the shoulders).
const t = e.t;
e.layer('leg_far').rotate = -Math.atan2(Math.sin(t * 1.05 + 0.9) * 0.07, 0.33);
e.layer('leg_near').rotate = -Math.atan2(Math.sin(t * 1.05) * 0.07, 0.33);
e.layer('upper').scaleY = 1 + Math.sin(t * 1.25) * 0.012 / 0.5;

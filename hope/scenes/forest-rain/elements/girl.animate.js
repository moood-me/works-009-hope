// Her breathing, the design's: shoulders rise 0.012 of her size (sin 1.25 t), the head with them — the upper body
// stretched from her hips (0.48 of her size below the shoulders).
const br = Math.sin(e.t * 1.25) * 0.012;
e.layer('upper').scaleY = 1 + br / 0.48;

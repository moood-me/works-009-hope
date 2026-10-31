// Her breath (the design's 0.012 of her size, sin 1.25 t): the body stretched from the floor (shoulders 0.58 up),
// the head lifted 1.2 times as much; the head sways 0.01 of her size (sin 0.25 t).
const S = 1.133;
const br = Math.sin(e.t * 1.25) * 0.012;
e.layer('body').scaleY = 1 + br / 0.58;
const head = e.layer('head');
head.y = -br * 1.2 * S;
head.x = Math.sin(e.t * 0.25) * 0.01 * S;

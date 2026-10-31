// The aura breathes: the design's 0.06 + 0.02 sin(0.7 t) of its brightness (painted at 0.08).
e.layer('aura').alpha = (0.06 + 0.02 * Math.sin(e.t * 0.7)) / 0.08;

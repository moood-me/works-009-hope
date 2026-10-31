// The dusk sky, the design's gradient down to the horizon (0.56 of the frame): dark blue-grey above, lilac, then the
// warm pale band at the water. The low sun, its glow and the motes in the air are the sky's shader (sky.wgsl).
const HY = 0.56;
const gr = g.createLinearGradient(0, 0, 0, HY);
gr.addColorStop(0, '#1d2030');
gr.addColorStop(0.5, '#555770');
gr.addColorStop(0.9, '#ad9fa3');
gr.addColorStop(1, '#c9b6ac');
g.fillStyle = gr;
g.fillRect(-0.7, -0.6, e.aspect + 1.4, 1.9);
e.at(0.64 * e.aspect, HY - 0.065, 'sun');

// The night over the forest, the design's gradient over the whole frame: near black at the top, a cold green-grey
// band at 0.58, dark again toward the bottom. The hazy moon's light is the sky's shader (sky.wgsl).
const gr = g.createLinearGradient(0, 0, 0, 1);
gr.addColorStop(0, '#060c0f');
gr.addColorStop(0.58, '#1c2c30');
gr.addColorStop(1, '#0a1214');
g.fillStyle = gr;
g.fillRect(-0.7, -0.6, e.aspect + 1.4, 1.9);
e.at(0.27 * e.aspect, 0.2, 'moon');

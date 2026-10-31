// The night over the hill, the design's: dark at the top, the palest band at 0.62 of the frame, dark again
// toward the bottom (the gradient runs over the whole frame, behind the hill too). The pale aura breathing in
// the middle of the sky is the sky's shader (sky.wgsl): so faint a gradient painted would show its steps.
const L = -0.7;
const T = -0.6;
const R = e.aspect + 0.7;
const B = 1.3;
const gr = g.createLinearGradient(0, 0, 0, 1);
gr.addColorStop(0, '#090c11');
gr.addColorStop(0.62, '#1a2029');
gr.addColorStop(1, '#0a0c10');
g.fillStyle = gr;
g.fillRect(L, T, R - L, B - T);


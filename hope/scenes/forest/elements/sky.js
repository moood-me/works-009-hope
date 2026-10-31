// The overcast winter sky, the original's gradient: dark at the top, pale grey toward the snow line (0.72 of
// the frame, where the original's ground began).
const gr = g.createLinearGradient(0, 0, 0, 0.72);
gr.addColorStop(0, '#161b25');
gr.addColorStop(0.5, '#36404e');
gr.addColorStop(1, '#8993a1');
g.fillStyle = gr;
g.fillRect(-0.7, -0.6, e.aspect + 1.4, 1.9);

// The night over the city, seen only through the window: the original's gradient over the window's height (0.1 →
// 0.72 of the frame): #0a0e1a, #181e31 at 0.6 of it, #2a2839 at the sill.
const L = e.lib;
const gr = g.createLinearGradient(0, L.WY, 0, L.WY + L.WH);
gr.addColorStop(0, '#0a0e1a');
gr.addColorStop(0.6, '#181e31');
gr.addColorStop(1, '#2a2839');
g.fillStyle = gr;
g.fillRect(-0.7, -0.6, e.aspect + 1.4, 1.9);

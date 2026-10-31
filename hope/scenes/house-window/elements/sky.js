// The night seen through the window, the design's: its gradient runs over the window's height (0.16 → 0.68 of the
// frame): #141d28 at the top, #2c3b4c at 0.7 of it, #3a4758 at the sill. Seen only through the window.
const L = e.lib;
const gr = g.createLinearGradient(0, L.WY, 0, L.WY + L.WH);
gr.addColorStop(0, '#141d28');
gr.addColorStop(0.7, '#2c3b4c');
gr.addColorStop(1, '#3a4758');
g.fillStyle = gr;
g.fillRect(-0.7, -0.6, e.aspect + 1.4, 1.9);

# Rain in the Forest

Engine 3 version of the forest page («I · лес») of Pavel's `hope/web/hope-design/Hope.dc.html` (`draw_forest`): a
girl hugging her knees by a big tree at night, rain always falling, three rows of pines going into the fog, a hazy
moon, fireflies — one of them settles on her knee when all is still.

`scene.json`, the pine and grass kinds' code files and the fog shaders are made by `tools/forest-rain.js` (run it
from the repository's root; the fog's shader text is `tools/forest-rain-fog.wgsl`); `lib.js` paints with its numbers.

## Layout

- Horizon 0.6, eye 1.7 m, camera `picture` (it leans with the pointer, as the design's rows shifted with the mouse).
- `sky`: the design's gradient; its shader lays the hazy moon (two radial glows at 0.27 of the width, 0.2 of the
  height) in the screen's colours, as the design's canvas did.
- Three rows of pines at the distances their base lines mean (0.62, 0.70, 0.78 of the frame → 85, 17 and 9.4 m),
  each tree a copy of one of six kinds of its row, swaying from its foot as the design's did — slowly, sin(0.5 t),
  0.012 · (row + 1) of its height at the top — each kind at a phase of its own (lib.js pineSway; the design took the
  phase from each tree's place). `ground` gives each row's
  colour from its foot to the next row (the design filled below each base with the row's colour).
- `fog_0…2`: the design's fog at each row's foot, drawn by one shader text in the frame's terms; its strength is
  turned into the linear light's that gives the design's colour over the row's colour. Painted, so faint a gradient
  showed its steps.
- `bank` (6.3 m) and `grass_0…3` (tufts swaying in the wind) — the design's black near rise and its grass.
- `tree` at 6.4 m: the big trunk past the frame's top, its roots, a branch and a twig swaying (animate).
- `girl` (0.93 m, the design's 0.15 of the frame at 6.2 m): the design's 'hug' pose; her upper body breathes; a
  soft cold glow about her that lights nothing (light `aura`). `scarf`: its end drawn by its shader, flapping as the
  design's (wind = sin 1.7t + 0.5 sin 2.9t).
- `fireflies`: sixteen, each a layer wandering by smooth noise and blinking as the design's, their glows lighting
  nothing (lights `fly0…15`), drawn over her and the bank as the design drew them last. The first goes to her knee
  as `rest` comes to 1 (the script: after 8 s, over 5 s).
- `rainfall`: the design's rain — 312 thin pale streaks leaning 0.14, falling 0.9–1.5 of the frame a second — drawn
  by an insert's shader over the whole frame, fixed to it, over everything, as the design drew it (key `rainfall`).

## Not here

The design's page also had its words (the lines, «веди светлячков за собой») and the fireflies following the pointer
and scattering on a click: the words are the game's; the pointer is not the scene's to read. Its grain and vignette
are the design's own (see the title scene's notes and the engine requests).

Post, the design's: grain as a normal-blended noise (light.grainBlend "normal", grain 0.86 — 22/255), the vignette's
shape (0.25 of the short side to 0.78 of the long, centre 0.49, black at 0.72); its glows fall off linearly, as its
canvas gradients did ('linear'). These are engine 3's newer words (moood-me/moood@engine3-hope-all until merged).

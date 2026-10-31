# The Forest

Engine 3 version of Pavel's canvas-2D scene `hope/web/forest.html` (`js/forest.js`, `js/common.js`): a boy in a
red scarf alone in a snowy clearing among pines, rows of trees fading into the fog, far away a cabin light.

`scene.json` and the pine and mist code files are made by `tools/forest.js` (run it from the repository's root
after changing the layout); `lib.js` paints them with the same numbers.

## Layout

- Horizon 0.62, eye 1.7 m, camera `picture`. The original's five rows of pines stood on base lines at 0.65 + 0.022·k
  of the frame; here each row stands at the distance its base line means (row 0: 57 m … row 4: 14 m), each tree a
  copy of one of three painted kinds of its row, scaled to the original's height on screen and flipped at random.
  Rows 2–4 leave the clearing open in the middle, as the original.
- The fog is the original's painted fog: each row painted in its own colour between the fog's grey and near black,
  the snow on the near rows' branches, and a band of mist lying among each of rows 0–3 (`mist_k`, drawn over its
  row whatever the depths). The engine's haze is not used: the original's fog does not grow with distance as air
  does (its nearest row is clear at 14 m, the next a quarter fogged at 18 m) — a painted depth, kept as painted.
- `ground`: one snow plane. Grey of the fog far off; the clearing (to about 16 m, its rim wavering) is the
  original's gradient. The footprints are the original's path, turned from screen points into metres.
- `boy` at 9.4 m (screen 0.5, 0.8), 0.94 m tall: the original `boyStanding`. Layers `coat` (breathing from its hem)
  and `head` (hat, pompom and the scarf round the neck, lifted with each breath). `scarf`: the knot painted, the
  two flying ends drawn by `scarf.wgsl` — the original's strips with a wave running to their free ends, reaching out
  and up as the wind (a slow noise, 0..1) rises; the wave's phase is added up in animate.
- `breath`: a puff of smoke particles by his head each time the key `breath` goes up (the script breathes every
  3.75 s), rising and drifting with the wind.
- `cabin` at 35 m (row 1), in the fog's grey, before its row's trees; `cabin_light` its window and warm glow,
  flickering, before the row's mist too (the original drew the light after the mist).
- `snow`: the engine's snowfall round the eye, falling slowly as the original's (0.25–0.45 m/s), carried by a
  light wind (light.wind 0.2 with its gusts).
- `script.js`: the view sways side to side (camera_x ±0.6 m, about 90 s a cycle) as the original's camera drifted,
  so the rows pass one another in parallax.

## Light

No look of night: the scene shows its paintings as painted (ambient 1), only the cabin's light warms what is near
it. Bounce 0, so the boy stays the original's dark silhouette. Vignette 0.87, grain 0.6 — the original's post.

## Not here

No state, no showcase: the original has no events.

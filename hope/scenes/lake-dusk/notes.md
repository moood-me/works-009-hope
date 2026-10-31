# The Quiet Lake

Engine 3 version of the lake page («III · озеро») of Pavel's `hope/web/hope-design/Hope.dc.html` (`draw_lake`): a girl
at the end of a pier at dusk, legs dangling, a low sun over still lilac water, a far shore of small dark trees, mist,
streaks drifting on the water, rings spreading where her foot touches it.

## Layout

- Horizon 0.56, eye 1.7 m, camera `picture`.
- `sky`: the design's gradient; its shader lays the sun's wide glow, its disc and forty faint motes in the air in the
  screen's colours, as the design's canvas did.
- `shore` 2 km off: the design's spiky trees on the horizon, open water between 0.42 and 0.83 of the frame.
- `lake`: one water plane that mirrors (strength 0.3: the design's reflections are its pier, girl and shore at 0.3–0.35,
  with no ripple). Its shader paints the design's water in the frame's terms — its gradient, the sun's path of 26
  breathing dashes and 110 drifting streaks. A mirror always holds the sky, and the design's water shows none: the
  shader can paint what under that much mirrored sky gives the design's colour (`u_mirror`), but then the reflections
  of the pier and the girl come out darker than the design's; it is 0 now (the paint is the design's own), and a
  mirror that holds no sky is asked of the engine (three) — with it, the water and the reflections are both exact.
- `mist` at 30 m: the design's seven long soft blobs on the far water, by its shader (strength turned into linear
  light's over the pale water there).
- `pier` at 9.71 m (where the water line under it, 0.735 of the frame, is): deck at 0.68, posts every 0.09 of the
  width, its top edge faintly light.
- `girl` (1.36 m, the design's 0.14 of the frame at 9.71 m): the design's 'dangle' pose; her shins swing from the knee
  out of step, her upper body breathes. `scarf`: its end blown back, drawn by its shader.
- `rings`: a plane on the water under her foot; its animate lets a drop fall every 4–9 s, its shader draws three rings
  per drop growing and fading as the design's.

## Not here

The design's words, «нажми на воду» and rings where the player clicks: the game's. Its grain and vignette: see the
title scene's notes and the engine requests. The mirror's image is capped in sharpness (an engine request).

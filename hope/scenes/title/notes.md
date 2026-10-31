# Hope (the title)

Engine 3 version of the title page of Pavel's `hope/web/hope-design/Hope.dc.html` (`draw_title` and its markup):
a child alone on a dark hill at night holding a little warm light, fog drifting before and behind, a few flakes of
snow, and the name «hope» over it all.

## Layout

- Horizon 0.7, eye 1.7 m, camera `picture` (it leans toward the pointer, as the design's hill and child shifted with
  the mouse — here with true parallax).
- `sky`: the design's gradient over the whole frame (its palest band at 0.62). Its shader lays over it, in the
  screen's colours as the design's canvas did, the pale aura breathing 0.06 ± 0.02 and the far fog (the design's
  f1: six soft ellipses drifting round 0.6 of the frame). Painted, gradients this faint showed their steps; laid
  in linear light, faint fog came out far lighter than the design's.
- `hill` at 19 m: the design's quadratic crest (0.79 → 0.7275 → 0.8 of the frame) in metres, on `ground` (a plane
  of the same colour from our feet to the hill): together the design's one dark silhouette.
- `child` on the crest (1.1 m tall, the design's 0.055 of the frame at 19 m): the design's `stand` pose, a girl.
  Two glows at her hand — a wide faint halo and a bright core — breathing 0.75 + 0.25 sin 1.4t (+ 0.05 sin 9t).
  They light nothing (lights `halo`, `core`: reach 0.01): in the design they are glows only, and as lights they
  lit the hill and the ground round her in a wide warm patch.
- `fog_near` at 7 m: the design's f2 — five soft ellipses round 0.78 of the frame before the hill — drawn by its
  shader in the frame's terms, its strength turned into linear light's that gives the design's colour over the
  dark ground.
- `snowfall`: the design's snow — 140 small solid flakes falling 8–30 px a second and swaying — drawn by the
  insert's shader over the whole frame, fixed to it, over everything, as the design drew it (key `snowfall`: 1).
- Widget `name`: «hope» in Cormorant light italic with its pale glow, and «надежда» under it in IBM Plex Mono (the faces
  carried inside the widget, made by tools/title-name.js: the page takes fonts only from itself) — the
  design's own two words (the Russian word is part of the design, the same in every language).

## Not here

The design's page is also an interface — «нажми на hope», the list of its three scenes, a fade from black as it
opens. Those are the game's and the page's, not the scene's. Its grain is a normal-blended noise (it shows in the
blacks); the engine's grain is an overlay, which hardly shows in so dark a picture.

Post, the design's: grain as a normal-blended noise (light.grainBlend "normal", grain 0.86 — 22/255), the vignette's
shape (0.25 of the short side to 0.78 of the long, centre 0.49, black at 0.72); its glows fall off linearly, as its
canvas gradients did ('linear'). These are engine 3's newer words (moood-me/moood@engine3-hope-all until merged).

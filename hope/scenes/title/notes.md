# Hope (the title)

Engine 3 version of the title page of Pavel's `hope/web/hope-design/Hope.dc.html` (`draw_title` and its markup):
a child alone on a dark hill at night holding a little warm light, fog drifting before and behind, a few flakes of
snow, and the name «hope» over it all.

## Layout

- Horizon 0.7, eye 1.7 m, camera `picture` (it leans toward the pointer, as the design's hill and child shifted with
  the mouse — here with true parallax).
- `sky`: the design's gradient over the whole frame (its palest band at 0.62); the pale aura in the middle,
  breathing 0.06 ± 0.02, is its shader (painted, so faint a gradient showed its steps).
- `hill` at 19 m: the design's quadratic crest (0.79 → 0.7275 → 0.8 of the frame) in metres, on `ground` (a plane
  of the same colour from our feet to the hill): together the design's one dark silhouette.
- `child` on the crest (1.1 m tall, the design's 0.055 of the frame at 19 m): the design's `stand` pose, a girl.
  Two glows at her hand — a wide faint halo and a bright core — breathing 0.75 + 0.25 sin 1.4t (+ 0.05 sin 9t).
- `fog_far` (21 m, just behind the hill) and `fog_near` (7 m, before it): the design's fog blobs, each a layer
  drifting at its own pace. Whatever is under the ground is not seen, so each stands where its lower edge meets
  the ground low enough in the frame (behind the hill's sides; near the frame's foot).
- `snow`: a few small flakes falling slowly.
- Widget `name`: «hope» in Cormorant light italic with its pale glow, and «надежда» under it in IBM Plex Mono — the
  design's own two words (the Russian word is part of the design, the same in every language).

## Not here

The design's page is also an interface — «нажми на hope», the list of its three scenes, a fade from black as it
opens. Those are the game's and the page's, not the scene's. Its grain is a normal-blended noise (it shows in the
blacks); the engine's grain is an overlay, which hardly shows in so dark a picture.

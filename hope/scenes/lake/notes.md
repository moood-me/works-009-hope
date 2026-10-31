# The Lake

Engine 3 version of Pavel's canvas-2D scene `hope/web/lake.html` (+ `js/lake.js`, `js/common.js`): a girl at the
end of a pier at night, a low moon, still water, fog, fireflies. Kept as close to the original as the engine allows.

## Layout

- Horizon 0.58, camera `picture`. The original measured in the screen; here the stage is 16:9 and the lens's focal
  length is the frame's height, so the pier's water line at screen y 0.818 is 7.14 m away and one stage height there
  is 7.14 m: the original's body unit `s` (0.14 of the height) is 1.0 m.
- `sky` (stage heights): the original gradient, the moon at (0.3·aspect, 0.28), r 0.045, with its craters; its halo
  is the moon's glow (`e.light`, point `sky#moon`).
  Stars on layer 1; their colour carries each star's twinkle (red: phase, green: pace) and `sky.wgsl` shows them in
  #e2e5ff, twinkling as the original (0.3 + 0.7·(½ + ½ sin)²). The shader also draws the shooting star: first at 5 s,
  then one in each 16 s at its own moment, place and slant, 1.1 s long, the original's streak.
- `ridge_far` (3 km) and `ridge_near` (1.5 km): the original outlines (same seeded noise, `lib.js`), heights as shares
  of the frame turned into metres; the far one carries the pale valley mist band at its foot.
- `fog`: seven elliptical bands, each a layer drifting right at its own pace (4–12 m/s at 900 m = the original's
  4–12 px/s at 900 px), resting on the water; the lake mirrors them.
- `lake`: one water plane 16 × 6 km, `reflect` with ripple (the original's trembling rows) and a little roughness
  (kept low: more smears the whole reflection, where the original's is crisp). `fade` 0: the hills are mirrored whole.
  Asked of the engine (three): the ripple's pace (the original's water hardly moves) and a sharper image for a
  mirror that fills half the frame (the image is capped at 512 px, so the moon's reflection is soft).
- `pier`: side-on card, deck 0.62–0.69 m over the water, posts every 0.95 m, the top board's edge pale (the thin
  light line of the original).
- `girl`: the original silhouette `girlOnEdge`, painted in metres, anchor 0.45 m below the seat. Layers: `leg_near`,
  `leg_far` (shin + foot about the knee, swinging out of step), `body` (breathing about the seat), `hair` (breathes
  with the body, stirs at its free end). Points: her head (unnamed and `girl#head`).
- `firefly`: the one that stays, on its slow loop by her head, glow breathing; its light touches her faintly; the lake
  mirrors it. `fireflies`: the other six as particles (about 6 alive), not mirrored — as in the original.

## Light

Night by the engine's light: ambient 0.5 of #c0c8ff, the moon (`from: sky#moon`), bounce 0 (stark silhouettes), no
haze (the moon's shafts in a haze lit the whole sky grey; its halo is its glow). The paintings' colours are chosen so that, after that light, they come out at the original's night colours
(ink #05060c for pier and girl, #1a1d34 / #0d0f1b for the ridges). Vignette 0.87 and grain 0.6 match the original's
post (black 0.65 at the corners from 0.35·min to 0.6·diagonal; 6 % overlay grain).

## Not here

No state, no showcase: the original scene has no events — only its ambient life, which runs by itself. The faint
light line the original drew exactly at the horizon (2 px, 10 %) is left to the mirror's own edge.

With the engine's newer words (moood-me/moood@engine3-hope-all until merged): the ripple's pace 0.2 (the original's water
hardly moves), a sharper mirror, and the moon's halo as its glow falling off linearly.

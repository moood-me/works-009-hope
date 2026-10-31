# The House

Engine 3 version of Pavel's `hope/web/house.html` (`js/house.js`): a girl on a windowsill in a dark room, rain on the
glass, a sleeping city outside; after a while one window across the street lights up.

## Layout

- Horizon 0.5, eye 1.7 m over the floor, camera `picture`. The room is upstairs (its floor a walk plane 15 m over the
  street), its window wall 3.3 m off, so the floor's line falls just under the frame, as in the original. `lib.js`:
  the original's frame numbers and how a frame point lands on a card; `city()` — the city's blocks and windows from
  the original's seed, shared by the paintings and their animates.
- `sky`: the night through the window. `far` (90 m) and `near` (60 m): the original's two rows of blocks with their
  grids of windows; the windows that come and go are layers (animate, by their slow noise); in the near row the dark
  window that lights up as the key `lit` rises (the script: 7 s in, over 3 s), its glow a glow only (light `hope`).
- `rain` (3.6 m, outside): the original's 160 streaks, by its shader.
- `wall`: near-black, the window cut through it; its shader lays the window's cold glow, the warm glow of a lamp out of
  sight at the bottom right (its slow noise) and the sill's shadow, in the screen's colours.
- `glass`: the 320 drops that sit on it, painted; its shader adds the city's bokeh, the drops sliding with their trails,
  the lightning (14 s, then 18–38 s apart) and her breath fogging the glass.
- `frame`, `sill`, `curtain` (its folds and wavering edge), and `floor` (out of the frame).
- `girl` (0.86 m, the original's 0.42 of the window's height at 3.25 m): `childHuggingKnees` on the sill, breathing.

## Not here

Nothing of the picture is left out. The fade from black and the page's links are the page's.

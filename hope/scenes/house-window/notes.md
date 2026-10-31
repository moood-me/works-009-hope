# The Quiet House

Engine 3 version of the house page («II · дом») of Pavel's `hope/web/hope-design/Hope.dc.html` (`draw_house`): a
girl sitting on the floor of a dark room before a tall window, her back to us; rain outside and drops on the pane;
houses across the street with one lit window; a bare bulb that now and then flashes and dies; dust in the window's
light.

## Layout

- Horizon 0.5, eye 1.7 m over the floor, camera `picture`. The room is upstairs: its floor is a walk plane 10 m over
  the street, so the houses across (40 m off, on the street) show above the sill with their feet hidden.
- `lib.js`: the design's frame numbers (window ww × wh at (wx, wy), floor line fy, frame ft) and how a frame point
  lands on a card; the bulb's flicker as a pure function of time (an integer hash), written out the same in the
  shaders that read it.
- `sky`: the night through the window (the design's gradient over the window's height).
- `houses`: the design's blocks, one lit window breathing (animate) with its glow (light `lit`: a glow only).
- `rain` (9 m, outside): the design's thin streaks, by its shader.
- `wall` (7.727 m): its gradient, the window cut through it, the frame; its shader lays the cold glow round the
  window, the dark line at the floor and the bulb's flash, in the screen's colours.
- `glass`: the design's drops clinging and slipping down the pane, and the flash over what is seen through it.
- `bars` (the cross) and `sill`, with the flash (one shader text).
- `floor`: its gradient, the window's cold light on it, the cross's shadow in it, the flash — by its shader.
- `bulb` (6 m): cord, socket, bulb swinging a hair; its lit face and glow with the flash (light `bulb`: a glow only).
- `girl` (1.133 m, the design's 0.24 of the frame at 4.72 m): the design's 'back' pose, breathing, her head swaying a
  hair; `scarf`: its end over her shoulder, by its shader.
- `dust`: an insert's shader — motes over the frame, brighter in the window's light and while the bulb flashes.

## Not here

The design's words and «нажми — лампочка вспыхнет» (a click making it flash): the game's — the flicker is the
scene's own. Its grain and vignette: see the title scene's notes and the engine requests.

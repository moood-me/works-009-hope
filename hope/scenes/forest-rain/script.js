// When all is still a while, one of the fireflies settles on her knee (the design: after 3.5 s without a move of the
// pointer it is drawn to her knee). Here: eight seconds after the scene opens, over five seconds; a game may set
// `rest` itself.
if ((scene.get('rest') || 0) < 1) {
  scene.after(8, () => {
    scene.move('rest', 1, { over: 5, ease: 'inOut' });
  });
}

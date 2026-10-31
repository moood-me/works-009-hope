// After a while, across the street one dark window lights up (the original: from 7 s, over 3 s). A game may set
// `lit` itself.
if ((scene.get('lit') || 0) < 1) {
  scene.after(7, () => {
    scene.move('lit', 1, { over: 3, ease: 'linear' });
  });
}

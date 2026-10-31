// Builds hope/scenes/title/widgets/name.html: the design's name «hope» (Cormorant light italic) and «надежда» (IBM
// Plex Mono), with the two faces carried inside the widget. The scene's page takes fonts only from itself (its
// font-src is 'self' and data:) and the render machine goes to no network, so the faces are declared on the page
// from data (FontFace, document.fonts): a @font-face inside the widget's shadow root is not used by browsers.
// The faces (tools/fonts, SIL Open Font License — OFL-*.txt there) are Google Fonts' woff2 subsets: latin,
// latin-ext and cyrillic, each with its unicode range.
// Run: node tools/title-name.js   (from the repository's root)
const fs = require('fs');
const path = require('path');

const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const LATIN_EXT = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF';
const CYRILLIC = 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116';
const fonts = path.join(__dirname, 'fonts');
const data = file => 'data:font/woff2;base64,' + fs.readFileSync(path.join(fonts, file)).toString('base64');
const faces = [
  ['Cormorant', 'italic', '300', 'cormorant-300italic-latin.woff2', LATIN],
  ['Cormorant', 'italic', '300', 'cormorant-300italic-latin-ext.woff2', LATIN_EXT],
  ['Cormorant', 'italic', '300', 'cormorant-300italic-cyrillic.woff2', CYRILLIC],
  ['IBM Plex Mono', 'normal', '400', 'plexmono-400-latin.woff2', LATIN],
  ['IBM Plex Mono', 'normal', '400', 'plexmono-400-latin-ext.woff2', LATIN_EXT],
  ['IBM Plex Mono', 'normal', '400', 'plexmono-400-cyrillic.woff2', CYRILLIC],
];
const list = faces.map(f => `    ['${f[0]}', '${f[1]}', '${f[2]}', '${data(f[3])}', '${f[4]}']`).join(',\n');

const html = `<style>
  :host { display: block; }
  .name {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    pointer-events: none;
  }
  .hope {
    font-family: 'Cormorant', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 220px;
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: #e6e1d7;
    text-shadow: 0 0 50px rgba(190, 205, 225, 0.22);
    padding: 0 0.12em;
  }
  .sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.7em;
    padding-left: 0.7em;
    color: #8a919b;
  }
</style>
<div class="name">
  <div class="hope">hope</div>
  <div class="sub">надежда</div>
</div>
<script>
  // the design's two faces, declared once on the page from the data carried here (tools/title-name.js)
  if (!window.hopeFaces) {
    window.hopeFaces = true;
    const faces = [
${list}
    ];
    for (const f of faces) {
      const face = new FontFace(f[0], 'url(' + f[3] + ')', { style: f[1], weight: f[2], unicodeRange: f[4] });
      document.fonts.add(face);
      face.load();
    }
  }
</script>
`;
fs.writeFileSync(path.join(__dirname, '..', 'hope', 'scenes', 'title', 'widgets', 'name.html'), html);
console.log('name.html', html.length, 'bytes');

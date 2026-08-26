/* Verifies every foreground/background pair the design actually uses.
 * The site is light only — see the note at the top of app/globals.css.
 * Run with: npm run check:contrast */
const LIGHT = {
  paper: '#F4F7FA', surface: '#FFFFFF', raised: '#E7EFF7',
  ink: '#101B2E', muted: '#465A72', faint: '#57697F',
  brand: '#123A83', brandInk: '#0D2C66', brandTint: '#DCE6F5',
  brandSurface: '#123A83', onBrandSurface: '#FFFFFF',
  warm: '#AC4A08', warmTint: '#FAEADC',
  fresh: '#166E1E', freshTint: '#DEEFE0',
  teal: '#0A626D', tealTint: '#D9ECEF',
  plum: '#65457F', plumTint: '#ECE5F2',
  onBrand: '#FFFFFF',
  onWarm: '#FFFFFF', white: '#FFFFFF', onWhite: '#0D2C66',
  bandMid: '#0D2C66', bandDeep: '#071B41', onBand: '#FFFFFF',
}

const lin = (c) => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const lum = (h) => {
  h = h.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/* [foreground, background, minimum, description] */
const pairs = (t) => [
  ['ink', 'paper', 4.5, 'body text'],
  ['ink', 'surface', 4.5, 'body text on cards'],
  ['ink', 'raised', 4.5, 'body text on tinted band'],
  ['muted', 'paper', 4.5, 'secondary text'],
  ['muted', 'surface', 4.5, 'secondary text on cards'],
  ['muted', 'raised', 4.5, 'secondary text on band'],
  ['faint', 'paper', 4.5, 'small labels'],
  ['faint', 'surface', 4.5, 'small labels on cards'],
  ['brand', 'paper', 4.5, 'links'],
  ['brand', 'surface', 4.5, 'links on cards'],
  ['brand', 'brandTint', 4.5, 'brand text on brand tint'],
  ['onBrand', 'brand', 4.5, 'button label on brand fill'],
  ['onBrandSurface', 'brandSurface', 4.5, 'text on hero/footer band'],
  ['onBand', 'bandMid', 4.5, 'text on the lighter CTA panel'],
  ['onBand', 'bandDeep', 4.5, 'text on the deeper CTA panel'],
  ['onWarm', 'warm', 4.5, 'label on the amber action button'],
  ['onWhite', 'white', 4.5, 'label on the fixed-white button over a dark band'],
  ['warm', 'paper', 4.5, 'warm category text'],
  ['warm', 'surface', 4.5, 'warm category on card'],
  ['warm', 'warmTint', 4.5, 'warm text on warm tint'],
  ['fresh', 'paper', 4.5, 'fresh category text'],
  ['fresh', 'surface', 4.5, 'fresh category on card'],
  ['fresh', 'freshTint', 4.5, 'fresh text on fresh tint'],
  ['teal', 'paper', 4.5, 'teal category text'],
  ['teal', 'surface', 4.5, 'teal category on card'],
  ['teal', 'tealTint', 4.5, 'teal text on teal tint'],
  ['plum', 'paper', 4.5, 'plum category text'],
  ['plum', 'surface', 4.5, 'plum category on card'],
  ['plum', 'plumTint', 4.5, 'plum text on plum tint'],
]

let failures = 0
for (const [name, t] of [['LIGHT', LIGHT]]) {
  console.log(`\n  ${name}`)
  for (const [fg, bg, min, desc] of pairs(t)) {
    const r = ratio(t[fg], t[bg])
    const ok = r >= min
    if (!ok) failures++
    console.log(
      `    ${ok ? ' ' : '✗'} ${(fg + ' on ' + bg).padEnd(26)} ${r.toFixed(2).padStart(5)}  ${ok ? 'pass' : 'FAIL (need ' + min + ')'}  ${desc}`,
    )
  }
}
console.log(
  failures === 0
    ? '\n  All pairs meet WCAG AA for normal text.\n'
    : `\n  ${failures} pair(s) FAIL.\n`,
)
process.exit(failures === 0 ? 0 : 1)

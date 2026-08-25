#!/usr/bin/env python3
"""Derives the site's images from the source artwork in design/.

Inputs                              Outputs
  design/logo-source.png              public/logo-mark.png      emblem alone
                                      public/logo-wordmark.png  emblem + DIRA
                                      public/logo-full.png      + tagline
                                      app/icon.png              favicon
  design/dr-deshpande-source.png      public/dr-deshpande.jpg   portrait

The logo arrives on a white background. It is cut out by flood-filling inward
from the image border, so white *inside* the artwork — the knee joint, the
letterforms — survives. A plain "make white transparent" pass would punch holes
straight through those.

Outputs are sized to roughly 2x their largest display size, not to the source
resolution. Shipping the 2172px master to every visitor would cost over a
megabyte for something drawn at 200px.

Requires Pillow:  pip3 install Pillow
Run from the project root:  npm run build:assets
"""
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / 'design'
PUBLIC = ROOT / 'public'

# --- Crop boxes, measured from the 2172x724 logo master ----------------------
# Ink bounds in the source:
#     emblem    x  68..684   y  48..658
#     wordmark  x 760..2048  y 134..540
#     tagline   x 764..2064  y 566..638
#
# Note the emblem extends to y=658, well BELOW the wordmark's baseline at 540.
# So the header variant cannot be a single rectangular crop: cropping above the
# tagline to drop it would slice the bottom off the emblem. The header lockup is
# composed from two crops instead — see build_logo().
EMBLEM_BOX = (58, 38, 700, 668)          # full emblem, nothing clipped
WORDMARK_TEXT_BOX = (740, 124, 2062, 552)  # the word DIRA only, no tagline
FULL_BOX = (58, 38, 2074, 666)           # everything, tagline included

# Gap between emblem and wordmark in the composed header lockup, as a fraction
# of the emblem's width. The source spacing is (760-684)/616 = 0.123.
COMPOSE_GAP = 0.123

# --- Output widths (2x the largest place each is displayed) -----------------
MARK_W = 192
WORDMARK_W = 560
FULL_W = 640
ICON_W = 256
PALETTE_COLORS = 200

PORTRAIT_MAX_W = 720
PORTRAIT_QUALITY = 84


def strip_background(im: Image.Image) -> Image.Image:
    """Flood-fill the white surround from the border and make it transparent."""
    w, h = im.size
    p = im.load()

    def is_bg(x: int, y: int) -> bool:
        r, g, b = p[x, y]
        # Bright and near-neutral: the white paper and the grey drop shadow,
        # but not the saturated blues and greens of the artwork itself.
        return min(r, g, b) > 196 and (max(r, g, b) - min(r, g, b)) < 26

    seen = bytearray(w * h)
    q: deque = deque()

    def push(x: int, y: int) -> None:
        if not seen[y * w + x] and is_bg(x, y):
            seen[y * w + x] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                push(nx, ny)

    alpha = Image.new('L', (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                ap[x, y] = 0

    out = im.convert('RGBA')
    out.putalpha(alpha.filter(ImageFilter.GaussianBlur(0.6)))
    return out


def save_png(im: Image.Image, path: Path, width: int) -> None:
    """Resize, quantise and write. 200 colours is visually indistinguishable
    from full RGBA at these sizes and roughly a tenth of the bytes."""
    height = round(width * im.size[1] / im.size[0])
    small = im.resize((width, height), Image.LANCZOS)
    small.quantize(colors=PALETTE_COLORS, method=Image.FASTOCTREE).save(
        path, 'PNG', optimize=True
    )
    print(f'  {path.relative_to(ROOT)}  {width}x{height}  {path.stat().st_size // 1024} KB')


def compose_wordmark(emblem: Image.Image, word: Image.Image) -> Image.Image:
    """Places the full emblem beside the word DIRA on a fresh canvas.

    Needed because the emblem hangs lower than the wordmark, so no single
    rectangle contains both without either clipping the emblem or including
    the tagline. Centres are aligned vertically, which is how they sit in the
    source artwork.
    """
    gap = round(emblem.size[0] * COMPOSE_GAP)
    height = max(emblem.size[1], word.size[1])
    canvas = Image.new('RGBA', (emblem.size[0] + gap + word.size[0], height), (0, 0, 0, 0))
    canvas.alpha_composite(emblem, (0, (height - emblem.size[1]) // 2))
    canvas.alpha_composite(word, (emblem.size[0] + gap, (height - word.size[1]) // 2))
    return canvas


def build_logo() -> None:
    src_path = DESIGN / 'logo-source.png'
    if not src_path.exists():
        print(f'  skipped logo: {src_path.relative_to(ROOT)} not found')
        return
    src = Image.open(src_path).convert('RGB')

    emblem = strip_background(src.crop(EMBLEM_BOX))
    word = strip_background(src.crop(WORDMARK_TEXT_BOX))

    save_png(emblem, PUBLIC / 'logo-mark.png', MARK_W)
    save_png(compose_wordmark(emblem, word), PUBLIC / 'logo-wordmark.png', WORDMARK_W)
    save_png(strip_background(src.crop(FULL_BOX)), PUBLIC / 'logo-full.png', FULL_W)

    # Favicon on white: the artwork's bevels and drop shadow were drawn for a
    # white ground and fringe visibly on any other colour.
    size = ICON_W
    pad = round(size * 0.055)
    inner = size - pad * 2
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=round(size * 0.1875), fill=255
    )
    icon.paste(Image.new('RGBA', (size, size), (255, 255, 255, 255)), (0, 0), mask)
    scaled = emblem.resize((inner, round(inner * emblem.size[1] / emblem.size[0])), Image.LANCZOS)
    icon.alpha_composite(scaled, (pad, (size - scaled.size[1]) // 2))
    icon.putalpha(Image.composite(icon.getchannel('A'), Image.new('L', (size, size), 0), mask))
    icon.quantize(colors=PALETTE_COLORS, method=Image.FASTOCTREE).save(
        ROOT / 'app' / 'icon.png', 'PNG', optimize=True
    )
    print(f'  app/icon.png  {size}x{size}  {(ROOT / "app" / "icon.png").stat().st_size // 1024} KB')


def build_portrait() -> None:
    src_path = DESIGN / 'dr-deshpande-source.png'
    if not src_path.exists():
        print(f'  skipped portrait: {src_path.relative_to(ROOT)} not found')
        return
    im = Image.open(src_path).convert('RGB')
    # Never upscale — enlarging a small original just makes a soft, heavier file.
    width = min(PORTRAIT_MAX_W, im.size[0])
    height = round(width * im.size[1] / im.size[0])
    out = PUBLIC / 'dr-deshpande.jpg'
    im.resize((width, height), Image.LANCZOS).save(
        out, 'JPEG', quality=PORTRAIT_QUALITY, optimize=True, progressive=True
    )
    print(f'  {out.relative_to(ROOT)}  {width}x{height}  {out.stat().st_size // 1024} KB')
    if im.size[0] < 900:
        print(
            f'  NOTE: portrait source is only {im.size[0]}x{im.size[1]}. It will look\n'
            f'        soft on high-density screens in the large card on the doctor page.\n'
            f'        Ask for the original at 1200px wide or more.'
        )


def main() -> None:
    print('logo:')
    build_logo()
    print('portrait:')
    build_portrait()


if __name__ == '__main__':
    main()

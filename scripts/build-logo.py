#!/usr/bin/env python3
"""Derives the site's logo assets from the supplied artwork.

Input:  public/logo.jpeg        the artwork as delivered (white background)
Output: public/logo-mark.png    circular emblem alone, background removed
        public/logo-full.png    full lockup: emblem, wordmark, tagline
        app/icon.png            favicon, emblem on a white rounded square

The background is removed by flood-filling inward from the image border, so
white *inside* the artwork (the knee joint, the letterforms) is preserved. A
naive "make white transparent" pass would punch holes straight through those.

Requires Pillow:  pip3 install Pillow
Run from the project root:  python3 scripts/build-logo.py

If a vector or transparent-PNG master ever arrives from the designer, use it
directly and delete this script — it will render more crisply at small sizes.
"""
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'public' / 'logo.jpeg'

# Crop boxes measured from the 1254x1254 original. If the artwork is replaced,
# re-measure these: the emblem must stop above the wordmark.
EMBLEM_BOX = (216, 26, 1044, 850)
FULL_BOX = (170, 26, 1104, 1198)

# Output sizes are 2x the largest place each asset is displayed, not the source
# resolution. The emblem shows at most 64px, the lockup at most ~208px. Emitting
# the full 1254px original would ship ~1.4MB of logo to every visitor, which is
# real money on Indian mobile data.
MARK_W = 192
FULL_W = 480
ICON_W = 256
PALETTE_COLORS = 200


def strip_background(im: Image.Image) -> Image.Image:
    """Flood-fill the surrounding white from the border and make it transparent."""
    w, h = im.size
    p = im.load()

    def is_bg(x: int, y: int) -> bool:
        r, g, b = p[x, y]
        # Bright and near-neutral: white paper and the grey drop shadow, but not
        # the saturated blues and greens of the artwork itself.
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


def save_small(im: Image.Image, path: Path, width: int) -> None:
    """Resize, quantise and write. 200 colours is visually indistinguishable
    from full RGBA at these sizes and roughly a tenth of the bytes."""
    height = round(width * im.size[1] / im.size[0])
    small = im.resize((width, height), Image.LANCZOS)
    small.quantize(colors=PALETTE_COLORS, method=Image.FASTOCTREE).save(
        path, 'PNG', optimize=True
    )
    print(f'  {path.relative_to(ROOT)}  {width}x{height}  {path.stat().st_size // 1024} KB')


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f'missing {SRC}')
    src = Image.open(SRC).convert('RGB')

    emblem = strip_background(src.crop(EMBLEM_BOX))
    save_small(emblem, ROOT / 'public' / 'logo-mark.png', MARK_W)

    full = strip_background(src.crop(FULL_BOX))
    save_small(full, ROOT / 'public' / 'logo-full.png', FULL_W)

    # Favicon on white: the artwork's bevels and shadow were drawn for a white
    # ground and fringe visibly on any other colour.
    size = ICON_W
    pad = round(size * 0.055)
    inner = size - pad * 2
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=round(size * 0.1875), fill=255
    )
    icon.paste(Image.new('RGBA', (size, size), (255, 255, 255, 255)), (0, 0), mask)
    icon.alpha_composite(
        emblem.resize((inner, round(inner * emblem.size[1] / emblem.size[0])), Image.LANCZOS),
        (pad, pad),
    )
    icon.putalpha(Image.composite(icon.getchannel('A'), Image.new('L', (size, size), 0), mask))
    icon.quantize(colors=PALETTE_COLORS, method=Image.FASTOCTREE).save(
        ROOT / 'app' / 'icon.png', 'PNG', optimize=True
    )
    print(f'  app/icon.png  {size}x{size}  {(ROOT / "app" / "icon.png").stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()

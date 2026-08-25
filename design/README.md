# Source artwork

Build inputs, not served assets. Nothing here is deployed — `public/` is copied
verbatim into the build output, so originals live here instead to keep a 1.2 MB
logo master off the page.

    logo-source.png            the supplied horizontal lockup
    dr-deshpande-source.png    the supplied portrait

Run `npm run build:assets` after replacing either. It writes the optimised,
correctly sized files into `public/` and `app/`. Do not hand-edit those — they
are overwritten.

If the logo composition changes, re-measure the crop boxes at the top of
`scripts/build-assets.py`.

# MediConnect brand assets

**Source of truth** for the logo mark, the feature icons and the brand photography. The apps copy these files into their own asset folders:

| App | Folder |
|---|---|
| web | `public/assets/brand/` |
| admin | `public/assets/brand/` |
| mobile | `assets/brand/` |

Change them here first, then copy them across.

**Status: provisional, pending owner sign-off.** The files were redrawn on 2026-11-19 from the brand sheet the product owner supplied (`mediconnect_brand_assets.webp`).

That sheet is raster artwork. Its icons are soft-edged and its wordmark is blurred, so it cannot be cropped. Instead, every shape here is a clean vector redraw that follows the sheet's shapes and its blue-to-teal palette. The whole sheet is never used.

| File | Use |
|---|---|
| `logo-mark.svg` | Heart-and-cross mark, gradient. Pair it with the live-text wordmark "MediConnect" in the UI, so the name stays crisp and accessible. |
| `logo-mark-mono.svg` | Single-colour mark, for Android themed icons and print. |
| `app-icon.svg` | The mark on a blue tile. App store and favicon PNGs are rendered from it. |
| `icons/*.svg` | 16 feature icons, 48×48, two-tone, transparent background. Each has a `<title>`. Use `alt=""` when a text label sits next to the icon. |
| `illustrations/hospital-exterior*.webp` | Decorative photo-illustration: 1600 px wide (171 KB) and 800 px wide (63 KB). It is a generic building, not a real or partner facility. |

## Rules

- **UI colour.** The brand gradient is for the mark only. UI colour comes from `tokens.ts`, where the primary is teal `#0B6E6E`.
- **No distortion.** Every SVG has a square `viewBox`. Scale it evenly and never stretch it.
- **Regenerating.** `python3 scripts/make-brand.py brand` rewrites the SVGs. The illustrations were made with `cwebp -q 78 -resize 1600 0` and `cwebp -q 75 -resize 800 0`.

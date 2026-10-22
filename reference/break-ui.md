# Break the UI

<!-- TODO(port): CATALOG.md from Emil's `break-ui` skill (MIT). -->

Render worst-case data and record what breaks. Default catalogue:

- Names: `Maximiliana Wolfeschlegelsteinhausen-Bergerdorff`, a single 40-char word without spaces, a 1-character name, emoji and RTL text (`عبد الرحمن`).
- Text blocks: 3× the expected length; one line; empty string.
- Lists: 0 items, 1 item, 500 items.
- Numbers: 0, negative, 9,999,999, very long decimals.
- Media: missing image, tiny image, extreme aspect ratios.
- Network: slow (3s), failed request, partial data.
- Viewport: 320px wide, 200% browser zoom, landscape phone.

# brand

Identity for a product: brand boards to choose from, then real SVG logos and tokens. Everything is drawn in code; no image generator is needed.

1. **Brief.** Product name, what it does, audience, three words for how it should feel, and anything that must stay (an existing mark, colour, or name treatment). Read existing logos and assets in the repo first.
2. **Round 1: divergent boards.** Pick 3–4 directions that differ in kind, using [reference/directions/index.json](../reference/directions/index.json) for range. For each, one brand board on the decision page ([templates/decision-page.html](../templates/decision-page.html)):
   - the mark (inline SVG): one of wordmark, monogram, symbol, emblem/seal, mascot, chosen to suit the direction
   - the mark at small size (32px) and on dark and light grounds
   - palette (4–6 swatches with roles), type pairing (display + body, from Google Fonts or system), one or two mockups drawn in HTML (app icon, a card, a hero strip, a business card)
   - one line naming the idea behind it
   Round 1 must not look generic: four tasteful-but-similar marks fails this step.
3. **Iterate.** Read the user's keep / kill / more-like-this marks and notes. Next round pushes the kept ideas further (variations of the mark's construction, weight, spacing, lockups), drops the kills, and may cross two keeps. Repeat until one board is locked.
4. **Finalise.** From the locked board produce, in `brand/`:
   - `logo.svg`, `logo-mono.svg`, `logo-inverse.svg`, `mark.svg` (symbol alone, square), all clean hand-written SVG with a `viewBox`, no embedded rasters
   - `favicon.svg` and the PNG/ICO sizes the framework needs (render from the SVG with Playwright)
   - a brand page `brand/index.html` showing usage, clear space, minimum size, palette, type
   - the palette and type written into DESIGN.md tokens
5. **Optional image prompts.** Only if the user asks: write prompts for a photographic brand board for an external image tool, matching the locked board.

Done when the user has locked a board, every file in step 4 exists and renders, the mark reads at 16px, and DESIGN.md carries the brand tokens.

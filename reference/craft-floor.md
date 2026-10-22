# Craft floor

The minimum every UI edit meets. Read before any change.

## Layout
- Text stays inside its container at every width: long words wrap (`overflow-wrap: anywhere` on user content, `text-wrap: balance` on headings), flex children that hold text get `min-width: 0`.
- No horizontal scroll at 390px. Use `100dvh`, not `100vh`.
- One primary action per view. Alignment is shared: elements line up with something.

## Type
- At most two families plus an optional mono. A clear scale: adjacent sizes differ by at least ~20%.
- Body 16px+ on the web, measure 45–75 characters, tabular figures for numbers that change.

## Colour and contrast
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large). Colour is never the only signal.
- Every colour comes from DESIGN.md tokens.

## Interaction
- Every interactive element: hover (pointer devices only, via `@media (hover: hover)`), press, `:focus-visible`, disabled, each with the motion its row in the interaction floor ([commands/motion.md](../commands/motion.md#interaction-floor)) asks for. Touch targets ≥ 44px.
- Buttons say what they do. Errors say what happened and what to do.

## Motion
- Content is visible by default; animation enhances, it never gates reading.
- Exits are faster than entrances. Nothing scales from 0 (start ≥ 0.9 with opacity). UI feedback under 300ms.
- `prefers-reduced-motion` gets a gentler equivalent, and feedback stays.
- Animate `transform` and `opacity`; anything else needs a reason ([motion/performance.md](motion/performance.md)).

## Content
- Real, specific copy and data. Imagery drawn in code or real media; never a grey placeholder.

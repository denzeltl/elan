# Motion recipes

<!-- TODO(port): RECIPES.md from Emil's `animate` skill (MIT), adapted to DESIGN.md tokens. Add one recipe per signature interaction once projects define them. -->

Patterns to implement from `motion` (React) unless noted. Pull the one you need.

- **Shared highlight / tab indicator**: `layoutId` on the indicator; spring stiffness ~500, damping ~40.
- **List item enter/exit**: `AnimatePresence` + `layout` on the list; enter y 8px + opacity, exit opacity only.
- **Modal / sheet**: overlay fade 160ms; panel from `scale(0.96)` + opacity (modal) or translateY 100% (sheet, spring); exit 120ms.
- **Toast**: Sonner, or translateY from the screen edge, stacked with `layout`.
- **Number change**: tabular figures, digits roll vertically 200ms.
- **Stamp / slap** (impact personality): scale 1.15 → 1 with a short overshoot spring, rotation −4° → 0, plus a 1-frame shadow offset.
- **Typing reveal** (dialogue): characters or words fade in at 12–20ms each, skippable on click.

# improve

Change an existing layout or component. Always prototype-first through [explore](explore.md).

## Flags

Each flag narrows what the variants are allowed to change:

| Flag | Pushes toward |
|---|---|
| `--bolder` | Bigger type contrast, stronger colour, one dominant element per view, more confident motion |
| `--quieter` | Fewer colours, more whitespace, smaller type range, motion only where it informs |
| `--simpler` | Remove before adding: cut elements, merge sections, shorten copy until each part earns its place |
| `--color` | Palette and colour roles only; layout fixed |
| `--type` | Type scale, families, rhythm, measure only |
| `--layout` | Grid, spacing, hierarchy, alignment only |

No flag: diagnose first (step 1) and pick the dimension yourself.

## Steps

1. **Diagnose.** Screenshot the target at 1440 and 390px. List what is weak, each item tied to DESIGN.md or [reference/craft-floor.md](../reference/craft-floor.md) (e.g. "three type sizes within 2px of each other", "CTA has no hover or press state", "section heading doesn't say what the section is for").
2. **Explore.** Run [explore](explore.md) with the diagnosis as the brief for the variants.
3. **Apply** the locked variant properly in source: tokens from DESIGN.md, no hard-coded one-off values, existing behaviour and tests intact. Remove the picker and variant files.
4. **Verify** per the router's *Done* list, comparing before/after screenshots side by side for the user.
5. **Update DESIGN.md** if the change introduced or retired a token or component.

Done when the chosen variant is in source, the prototype scaffolding is gone, every diagnosed weakness is fixed or explicitly left with a reason, and the *Done* checks pass.

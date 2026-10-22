# explore

Show the user other ways something could look, before anything changes. Also the gate that [improve](improve.md) and [brand](brand.md) run through.

1. **Scope.** Name the target (a page, a section, a component) and what is fixed (content, tokens, behaviour) versus open (layout, type scale, density, motion). Default count: 3 variants.
2. **Spread.** Each variant takes a different *idea*, not a different shade: e.g. editorial stack vs. split hero vs. full-bleed scene. Write one line per variant stating its idea before building any of them. If two lines describe the same idea, replace one.
3. **Render.**
   - New work, or a surface not yet built → [templates/decision-page.html](../templates/decision-page.html). Each option is a self-contained HTML fragment using DESIGN.md tokens; serve the page (`npx serve .elan/explore` or the project's dev server) and give the user the URL.
   - Existing component in a running app → [templates/InAppPicker.tsx](../templates/InAppPicker.tsx): each variant is a sibling component rendered in place with the real props and data, the picker floating on top in dev only.
4. **Decide.** Wait for the user's marks (keep / kill / more like this, plus notes). Next round: drop kills, push "more like this" further, combine keeps if asked. Repeat until the user locks one.
5. **Hand off.** Record the chosen variant and the user's notes in `.elan/decisions.md` (date, target, chosen idea, rejected ideas and why). Then return to the calling command, or, when explore ran alone, ask whether to apply it via [improve](improve.md).

Done when the user has locked a variant and the decision is recorded. Prototype files stay out of `src/` and are removed after the hand-off.

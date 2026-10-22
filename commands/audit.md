# audit

Review only. Changes nothing; produces a ranked list of findings the user can hand to [improve](improve.md), [motion](motion.md) or [polish](polish.md).

Run every lens below over the target (a page, a flow, or the whole app). For each finding record: severity (blocker / major / minor), where (file:line or screen + element), what is wrong, and the fix in one line.

1. **Direction**: does the surface look like the world in DESIGN.md, or like a default? Hierarchy, type, colour, imagery against the tokens. Does each section say what it is for? Is any standard part missing from a section or screen (see [reference/components/blocks.md](../reference/components/blocks.md))?
2. **Accessibility**: contrast (AA minimum), focus visible on every interactive element, keyboard reachability and order, semantic roles and labels, target sizes ≥ 44px on touch, reduced-motion handling.
3. **Motion quality**: against [reference/motion/principles.md](../reference/motion/principles.md): purposeless motion, too-slow durations, non-interruptible animations, exits slower than entrances, generic motion where the signature belongs, jank (see [reference/motion/performance.md](../reference/motion/performance.md)).
4. **Edge cases**: render worst-case data and record what breaks: very long names and words, empty lists, one item vs. hundreds, missing images, slow and failed network, error states, RTL-length strings. Use [reference/break-ui.md](../reference/break-ui.md).
5. **Responsive**: 1440, 768, 390px: overflow, horizontal scroll, cramped or orphaned elements, tap targets.
6. **Performance**: largest images and fonts, layout shift, heavy scroll handlers, bundle weight of animation libraries actually used.

Write the report to `.elan/audits/<date>-<target>.md` and summarise the top findings in chat. Done when every lens has been applied (a lens with no findings says so) and every finding has a location and a one-line fix.

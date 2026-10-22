# motion

Micro-interactions, transitions and state feedback that carry the direction's **motion personality**, built to Emil Kowalski's quality bar.

Read before starting: DESIGN.md `motion:` block, [reference/motion/principles.md](../reference/motion/principles.md). Pull [reference/motion/recipes.md](../reference/motion/recipes.md) for the specific patterns you implement and [reference/motion/performance.md](../reference/motion/performance.md) when anything animates layout, blur, or many elements at once.

1. **Inventory.** Walk the target surface and list every interactive element and state change: buttons, links, inputs, list selection, tabs, toggles, modals and sheets, toasts, loading, empty and error states, route changes, data arriving. For each, note what it does now.
2. **Decide per item**, in this order, and write the decision into a table (element → purpose → property → duration/easing or spring → exit):
   - Should it animate at all? Frequent, keyboard-driven, or high-speed actions get instant or near-instant feedback.
   - What purpose: feedback, state change, spatial continuity, or attention.
   - How does it express the motion personality? A default (generic fade, generic spring press, generic sliding highlight) needs a reason it fits *this* world, or a replacement that does.
   - Interruptible? Anything the user can re-trigger mid-flight uses springs or transitions that retarget, never keyframes that restart.
   - Check the result against the **interaction floor** below: every control type present on the surface gets every row that applies to it.
3. **Signature.** Build or refine the direction's signature interaction on this surface if it belongs here. It must be the most memorable moment of the surface. [reference/components/effects.md](../reference/components/effects.md) lists expressive patterns and app micro-interactions to start from.
4. **Implement**: CSS transitions first, `motion` for component and layout animation, GSAP only for timelines. Every animation respects `prefers-reduced-motion` with a gentler equivalent (fade or instant), never by removing feedback.
5. **Demo.** Always, for site and app work alike: a demo page in `.elan/` (or a short "hover X, drag Y, click Z" list against the running app) so the user can feel each interaction. Stop for their notes before calling the work done.

Done when every inventoried item has a decision in the table, every control meets the interaction floor, each implemented motion matches its row, nothing animates on the main thread that drops frames (check with the performance reference), reduced motion is handled, and the user has tried the demo.

## Interaction floor

A colour swap alone is a state, not an interaction. Every control below gets motion on each row that applies, at UI speeds (100–200ms, `--ease-out`, transitions so it retargets), shaped by the direction's personality: a print world might press a hard shadow flat, a paper world might lift a sheet, an instrument might click a detent. Hover rows apply only under `(hover: hover) and (pointer: fine)`; reduced motion keeps the change and drops the movement.

| Control | Hover | Press / drag | Focus | Value or state change |
|---|---|---|---|---|
| Primary / secondary button | a movement, not only colour: lift 1–2px, fill wipe, underline draw, shadow grow | scale 0.97 or shadow collapse, 100–160ms | visible ring that animates in | loading: label swaps with a short crossfade; success/error: icon morph or shake (error) |
| Text link (incl. logo, "Back to top") | underline draws in from the reading side | press settles | ring | scroll-to-top glides via Lenis; instant under reduced motion |
| Icon button | icon nudges or rotates a few degrees in the direction it acts | scale 0.92 | ring | toggled icons morph or crossfade |
| Text input / textarea | border darkens | — | border or underline grows, label/hint shifts | error: one short shake (≤ 300ms) + message fades in |
| Slider / range | thumb grows ~1.15× | thumb presses (0.92) while dragged; track fill follows; value label or ticks follow with a spring | ring on thumb | snapping to a step lands with a small settle; value text rolls or crossfades |
| Toggle / checkbox / radio | track or box tints | thumb or mark squashes slightly | ring | thumb slides with a spring; tick draws in (stroke-dashoffset) |
| Tabs / segmented control | label shifts colour and nudges | — | ring | indicator moves to the new tab (layout animation or transform), content crossfades |
| Selectable card / list row | lift or edge highlight | press settles | ring | selected state animates in (border, tab, offset), never just appears |
| Counter / badge | — | — | — | number ticks or pops (scale 1.1 → 1) when it changes |
| Tooltip / popover / menu | — | — | — | recipes 2–3 in [motion/recipes.md](../reference/motion/recipes.md) |

Frequency decides size: a pointer control used constantly gets the smallest version of its row (a 120ms tint and 1px lift) rather than nothing. Keyboard-initiated actions still get no animation, per [principles.md](../reference/motion/principles.md).

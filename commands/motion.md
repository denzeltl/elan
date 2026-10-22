# motion

Micro-interactions, transitions and state feedback that carry the direction's **motion personality**, built to Emil Kowalski's quality bar.

Read before starting: DESIGN.md `motion:` block, [reference/motion/principles.md](../reference/motion/principles.md). Pull [reference/motion/recipes.md](../reference/motion/recipes.md) for the specific patterns you implement and [reference/motion/performance.md](../reference/motion/performance.md) when anything animates layout, blur, or many elements at once.

1. **Inventory.** Walk the target surface and list every interactive element and state change: buttons, links, inputs, list selection, tabs, toggles, modals and sheets, toasts, loading, empty and error states, route changes, data arriving. For each, note what it does now.
2. **Decide per item**, in this order, and write the decision into a table (element → purpose → property → duration/easing or spring → exit):
   - Should it animate at all? Frequent, keyboard-driven, or high-speed actions get instant or near-instant feedback.
   - What purpose: feedback, state change, spatial continuity, or attention.
   - How does it express the motion personality? A default (generic fade, generic spring press, generic sliding highlight) needs a reason it fits *this* world, or a replacement that does.
   - Interruptible? Anything the user can re-trigger mid-flight uses springs or transitions that retarget, never keyframes that restart.
3. **Signature.** Build or refine the direction's signature interaction on this surface if it belongs here. It must be the most memorable moment of the surface. [reference/components/effects.md](../reference/components/effects.md) lists expressive patterns and app micro-interactions to start from.
4. **Implement**: CSS transitions first, `motion` for component and layout animation, GSAP only for timelines. Every animation respects `prefers-reduced-motion` with a gentler equivalent (fade or instant), never by removing feedback.
5. **Demo.** For changes to an existing app, show a demo page or a short list of "click X, then Y" steps so the user can feel each change, and adjust on their notes.

Done when every inventoried item has a decision in the table, each implemented motion matches its row, nothing animates on the main thread that drops frames (check with the performance reference), reduced motion is handled, and the user has tried the demo.

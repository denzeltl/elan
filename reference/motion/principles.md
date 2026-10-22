# Motion principles

<!-- TODO(port): full port of emil-design-eng + animate (Emil Kowalski, MIT): decision framework, easing table, spring settings, interruption, exits. This is the working core until then. -->

## Decide in order
1. **Should it animate?** High-frequency or keyboard-driven actions: instant or ≤100ms. First-time and meaningful moments: the most motion.
2. **Purpose**: feedback, state change, spatial continuity, or attention. No purpose, no animation.
3. **Property**: `transform` and `opacity`. Layout animation through `motion` `layout`/`layoutId`, not width/height tweens.
4. **Curve and duration**
   - Enter / respond: ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; move on screen: ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)`. Never ease-in for UI.
   - Feedback 100–160ms · small UI 160–240ms · larger moves 240–400ms · scene moments 500–800ms.
   - Springs for anything gestural or interruptible: start around stiffness 400 / damping 30, no visible bounce unless the personality calls for it.
5. **Interruption**: re-triggerable motion retargets from where it is (springs, CSS transitions), never restarts keyframes.
6. **Exit**: faster than the entrance (~70–80% of its duration), and simpler.

## Rules of thumb
- Press feedback: `scale(0.97)` on `:active`, ~100ms.
- Enter from `scale(0.95)` + opacity, never from `scale(0)`.
- Origin-aware: popovers grow from their trigger (`transform-origin`).
- Stagger 30–60ms per item, capped so the last item lands under ~400ms.
- Hover effects only under `@media (hover: hover) and (pointer: fine)`.

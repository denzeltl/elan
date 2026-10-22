# polish

The last pass before shipping a surface. Small, careful fixes; no redesign (that is [improve](improve.md)).

1. **Overflow and alignment.** Run `node <elan>/scripts/shoot.mjs <url> --stress` (long strings injected) at 1440, 768 and 390px. Fix every clipped, overflowing or misaligned element; check optical alignment of icons with text and of headings with their columns.
2. **Copy.** Every heading says what its section is for; buttons say what they do ("Start the case", not "Submit"); error and empty states say what happened and what to do next. Cut filler.
3. **States.** Every interactive element has hover, press, focus-visible and disabled states, styled from DESIGN.md. Loading, empty and error states exist for every data surface.
4. **Motion details.** Exits faster than entrances, nothing animates from `scale(0)`, stagger only where it reads as a sequence, reduced motion verified.
5. **Responsive details.** Type scale steps down sensibly, tap targets ≥ 44px, sticky elements don't cover content, `100dvh` instead of `100vh`, safe areas on mobile.
6. **Consistency.** Any one-off value (colour, radius, spacing, duration) not in DESIGN.md is replaced by a token or added to DESIGN.md with a reason.

Done when the stress screenshots at all three widths are clean, each of steps 2–6 has been walked across the whole surface, and the build passes.

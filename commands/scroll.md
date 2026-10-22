# scroll

Scroll scenes: the page as a sequence the visitor plays by scrolling. Site mode mainly; app mode only for onboarding or showcase surfaces.

Read: [reference/scroll/scenes.md](../reference/scroll/scenes.md) (scene types and the effect-mixing rules) and [reference/scroll/recipes.md](../reference/scroll/recipes.md) for the scene types you pick. Stack: CSS scroll-driven animations for simple linked effects → `motion` `useScroll`/`useTransform` for component-level scenes → GSAP ScrollTrigger + Lenis for pinning, scrubbed timelines and sequences.

1. **Journey.** Write the page as 4–7 beats: what the visitor feels and learns at each, and where the peak is. Each beat maps to a section from the brief and keeps that section's job.
2. **Score.** Assign one scene type per beat. Mixing rules: at least 4 different scene types on a page, never the same type twice in a row, at most 2 scrubbed scenes, and the peak beat gets the signature scene. Parallax-on-everything is the default to beat, not the goal.
3. **Assets.** Imagery for scenes comes from code (SVG, canvas, WebGL, CSS 3D), the user's own photos or footage, or the free sources in [reference/scroll/assets.md](../reference/scroll/assets.md). Video scrub and image sequences need the user's footage or frames rendered from code.
4. **Build** each scene with content visible by default: if JavaScript or motion fails, the text is still readable in order. Pinned sections release cleanly; no dead scroll (a stretch where scrolling changes nothing visible).
5. **Check** on a real scroll at 1440 and 390px and with reduced motion (scenes collapse to static, ordered content). Note scroll length per beat; trim any beat that overstays.

Done when every beat has its scene, the mixing rules hold, there is no dead scroll, reduced motion shows all content in order, and the *Done* checks in the router pass.

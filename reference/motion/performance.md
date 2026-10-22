# Motion performance

Making every frame land. Ported and condensed from Emil Kowalski's `animation-performance` skill (MIT). The bar is a mid-range phone on a 120Hz screen, not the laptop it was built on.

## Rules

1. `transform` and `opacity` by default; anything else needs a reason.
2. Name the cause before changing code. "Added `will-change`, seems smoother" is not a diagnosis.
3. A fast machine proves nothing: say which findings are from code and which need a device recording.
4. Never `transition: all`.

## Symptom → fix

| Symptom | Fix |
|---|---|
| Animation stutters | Animate `transform`/`opacity`, not `width`/`height`/`top`/`margin` |
| Shadow animation is choppy | `filter: drop-shadow()` instead of `box-shadow` |
| Jank only during navigation or loading | Move it to CSS or WAAPI, off the main thread |
| `motion` `x`/`y` drops frames | Animate the full `transform` string |
| Hand-rolled animation janks in React | Write to `ref.current.style` or a motion value, not state |
| Drag gets laggier as the list grows | Stop animating an inherited CSS variable; set `transform` directly |
| Blur transition lags (Safari especially) | Animated `blur()` under 20px; 2–5px is enough |
| Unexpected properties animate | Replace `transition: all` with explicit properties |
| Element shifts 1px at start/end | `will-change: transform` on that element, only once seen |

## Budget

16.7ms per frame at 60Hz, **8ms at 120Hz**: design against 8. One layout recalculation on a complex page can exceed 100ms.

## Property cost

| Tier | Properties |
|---|---|
| Composite only (cheapest) | `transform`, `opacity`; in current Chrome/Firefox also `filter`, `clip-path`, `background-color` |
| Paint + composite | `box-shadow`, `border-radius`, `color` |
| Layout + paint + composite | `width`, `height`, `padding`, `margin`, `top`, `left`, `border-width` |

Swap down: size → `scale()`, position → `translate()`, `display`/`visibility` → `opacity`, `box-shadow` → `filter: drop-shadow()`. A layout property also pushes neighbours: a sidebar animating `margin-left` re-lays-out the whole dashboard every frame.

## Where it runs

| Driver | Thread |
|---|---|
| `requestAnimationFrame` loops (GSAP, `motion/react` components) | Main thread, always |
| WAAPI (`element.animate()`, `motion`'s `animate()`) | Can be off the main thread |
| CSS transitions and animations | Can be off the main thread |

Watch motion that plays while the page is busy (route changes, fetching, hydration): Vercel's tab indicator dropped frames as a `layoutId` animation during navigation and was fixed by moving it to CSS. Acceleration is progressive enhancement: keep `translateY(100%)` for elements of unknown size even where a browser declines to accelerate percentages.

Working split: CSS for simple motion and anything that plays while the page is busy; `motion` for springs, shared layout, exits and gestures; GSAP for scroll timelines.

## Scroll-linked work

- CSS scroll-driven animations (`animation-timeline: scroll()/view()`) run off the main thread where supported.
- `motion` `useScroll`/`useTransform` motion values update without React renders; never `setState` in a scroll handler.
- GSAP ScrollTrigger: `scrub` with a small number (0.3–1) smooths; batch reveals with `ScrollTrigger.batch`.
- Video scrub: seek a pre-decoded blob with a smoothed playhead; image sequences draw to one `<canvas>`.

## `will-change`

Only after you see a 1px shift or measure dropped frames, only on the element that animates, never on `*` or big containers. It earns its place on an expensive paint (a large blurred element): promote it and keep the layer small.

## Diagnosis order

1. Which properties animate? (expand `transition: all` and `motion` shorthands)
2. Does the jank coincide with the page being busy?
3. Is React re-rendering per frame?
4. Does it worsen as content grows? (inherited CSS variable, too many animated nodes)
5. Is a CSS variable animated at all?
6. Animated `blur()` over 20px?
7. Still shifting? Now `will-change`.

Confirm with the DevTools Performance panel (dropped frames, long tasks) and on a real phone over remote debugging; CPU throttling models a slow CPU, not a weak GPU.

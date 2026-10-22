# Motion performance

<!-- TODO(port): Emil's `animation-performance` skill (MIT): symptom → fix table, 120Hz budget, React ref writes. -->

- Budget: ~8ms per frame at 120Hz, ~16ms at 60Hz. Animate `transform`/`opacity` only; they stay on the compositor.
- `will-change: transform` only on elements about to animate, removed after.
- Blur: radius under ~20px, and never animate `backdrop-filter` on large areas.
- Scroll-linked work: CSS scroll timelines or `useScroll` motion values (no React state per frame); GSAP ScrollTrigger with `scrub`.
- Many elements: animate a container, or use FLIP via `layout`; avoid per-item JS animation over ~50 items.
- Check: Chrome Performance panel with 4× CPU throttle; no long frames during the animation.

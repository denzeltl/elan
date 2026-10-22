# Scroll recipes

<!-- TODO(port): one tested snippet per scene type in scenes.md (GSAP ScrollTrigger + Lenis, motion useScroll, CSS scroll-driven), plus scroll-craft's video scrub (smoothed playhead, lerp ~0.18, dense-GOP encode) and canvas image-sequence technique. -->

## Lenis + ScrollTrigger setup (Next.js client component)
```ts
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ lerp: 0.1 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
// skip Lenis entirely when prefers-reduced-motion: reduce
```

## Pin with steps
```ts
gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=200%", pin: true, scrub: 0.5 } })
  .to(stepA, { autoAlpha: 0 }).from(stepB, { autoAlpha: 0, y: 24 });
```

# Scroll recipes

Working starting points for each scene type in [scenes.md](scenes.md), for Next.js/React with `motion`, GSAP and Lenis. Values come from scroll-craft's engine (Nate Herk, MIT), re-expressed for these libraries. All scroll components are client components (`"use client"`).

Pick the lightest layer that works: CSS scroll-driven animation → `motion` `useScroll` → GSAP ScrollTrigger.

## Setup: Lenis

Default on `immersive` site pages. Install `lenis` and check the installed version's README for option names before writing code.

**Without GSAP** (pages built on `motion` `useScroll`): mount once around the marketing page, not the app routes.

```tsx
"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>{children}</ReactLenis>;
}
```

Lenis drives the window's own scroll position, so `useScroll`, `position: sticky` and `scrollIntoView` keep working. In-page anchor jumps should go through `useLenis()?.scrollTo(target)` so they ease the same way. Touch scrolling stays native by default; leave it that way.

**With GSAP ScrollTrigger**: once, in a client provider at the root layout:

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

Use `@gsap/react`'s `useGSAP(() => {...}, { scope: ref })` in components so triggers are cleaned up on unmount and route change.

## flow: reveal once on entry

CSS-only where supported:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .rise { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; }
  }
}
@keyframes rise { from { opacity: 0; transform: translateY(14px); } }
```

With `motion`, fired once, staggered in reading order:

```tsx
const parent = { show: { transition: { staggerChildren: 0.06 } } };
const child = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] } },
};
<motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
  <motion.h2 variants={child}>…</motion.h2>
  <motion.p variants={child}>…</motion.p>
</motion.div>
```

Content must stay readable if JS never runs: render visible on the server and only hide once hydrated if you need to.

## pin: hold the frame, cross the lines

```tsx
useGSAP(() => {
  const lines = gsap.utils.toArray<HTMLElement>(".pin-line");
  const tl = gsap.timeline({
    scrollTrigger: { trigger: stage.current, start: "top top", end: "+=250%", pin: true, scrub: 0.5 },
  });
  // first line greets (already visible), each next line overlaps the last by ~15%
  lines.forEach((line, i) => {
    if (i > 0) tl.fromTo(line, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, i - 0.15);
    if (i < lines.length - 1) tl.to(line, { autoAlpha: 0, y: -20, duration: 0.3 }, i + 0.7);
  });
}, { scope: stage });
```

Give the stage a ground (image or colour) so it isn't empty while it slides in. Only the page's final scene lets its last line hold; middle scenes fade their last line out before the pin releases.

## scrub: a timeline under the hand

```tsx
gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=200%", pin: true, scrub: 0.6 } })
  .fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none" })
  .to(model, { rotate: 25, scale: 1.1, ease: "none" }, 0);
```

`scrub` takes a number (0.3–1s of catch-up) for smoothing; `true` is 1:1 and feels mechanical.

## scrub: video under the hand

Fetch the clip as a Blob (seeks without range requests), map it over the stage's whole visible life, lerp the playhead:

```tsx
useEffect(() => {
  const video = ref.current!;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; // poster only
  let target = 0, raf = 0, seeking = false;
  fetch(src).then(r => r.blob()).then(b => { video.src = URL.createObjectURL(b); });
  video.addEventListener("seeked", () => { seeking = false; });
  const st = ScrollTrigger.create({
    trigger: stage.current, start: "top bottom", end: "bottom top", // whole visible life, not pin travel
    onUpdate: (self) => { target = self.progress * (video.duration || 0); },
  });
  const deadband = matchMedia("(pointer: coarse)").matches ? 0.02 : 0.008;
  const loop = () => {
    const next = video.currentTime + (target - video.currentTime) * 0.18;
    if (!seeking && Math.abs(next - video.currentTime) > deadband) { seeking = true; video.currentTime = next; }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); st.kill(); };
}, [src]);
```

Keep a poster `<img>` over the video until a real frame has painted (iOS leaves a seeked, never-played muted video blank). Encode for scrubbing with dense keyframes: see [assets.md](assets.md).

## sequence: frames on a canvas

```tsx
const frames = Array.from({ length: N }, (_, i) => `/seq/${String(i + 1).padStart(4, "0")}.webp`);
const images = frames.map(src => Object.assign(new Image(), { src }));
const state = { frame: 0 };
gsap.to(state, {
  frame: N - 1, snap: "frame", ease: "none",
  scrollTrigger: { trigger: stage.current, start: "top top", end: "+=250%", pin: true, scrub: 0.5 },
  onUpdate: () => draw(images[state.frame]),
});
function draw(img: HTMLImageElement) {
  const c = canvas.current!, ctx = c.getContext("2d")!;
  const s = Math.max(c.width / img.width, c.height / img.height); // cover
  ctx.drawImage(img, (c.width - img.width * s) / 2, (c.height - img.height * s) / 2, img.width * s, img.height * s);
}
```

60–150 frames, WebP around 1600px wide (~1000px on phones). Draw frame 1 immediately; preload the rest progressively. Frames can come from the user's footage (`ffmpeg -i in.mp4 -vf fps=30,scale=1600:-2 seq/%04d.webp`) or be rendered from a canvas/three.js scene.

## pan: vertical scroll, sideways travel

```tsx
useGSAP(() => {
  const distance = () => rail.current!.scrollWidth - window.innerWidth;
  gsap.to(rail.current, {
    x: () => -distance(), ease: "none",
    scrollTrigger: { trigger: stage.current, start: "top top", end: () => "+=" + distance(), pin: true, scrub: 0.5, invalidateOnRefresh: true },
  });
}, { scope: stage });
```

Check `rail.scrollWidth - innerWidth` is at least half a viewport at every breakpoint. Under reduced motion, skip the tween and give the rail `overflow-x: auto; scroll-snap-type: x proximity`.

## reveal: a wipe as a change of state

```tsx
gsap.fromTo(figure, { clipPath: "inset(100% 0 0 0)" }, {
  clipPath: "inset(0% 0 0 0)", ease: "none",
  scrollTrigger: { trigger: figure, start: "top 85%", end: "top 35%", scrub: 0.4 },
});
```

Directions: `inset(0 0 100% 0)` from top, `inset(0 100% 0 0)` from left, `circle(0% at 50% 50%)` → `circle(75% …)` for iris (once per page).

## kinetic: type that assembles

```tsx
// after document.fonts.ready
const split = new SplitText(heading, { type: "lines", mask: "lines" }); // GSAP SplitText (free)
gsap.from(split.lines, { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.08,
  scrollTrigger: { trigger: heading, start: "top 80%", once: true } });
```

Give the mask room for descenders (`padding-bottom: 0.12em` on line wrappers). Revert the split on resize.

## parallax: layers at different rates

```tsx
const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
const far = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
const mid = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
<motion.img style={{ y: far }} className="max-w-none" />
```

Total travel under ~200px; adjacent layers 10–30% apart; copy never moves. Disable under reduced motion (`useReducedMotion()` → static values).

## count: a real number lands

```tsx
const ref = useRef<HTMLSpanElement>(null);
const inView = useInView(ref, { once: true, amount: 0.5 });
useEffect(() => {
  if (!inView) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { ref.current!.textContent = fmt(to); return; }
  const c = animate(0, to, { duration: 1.5, ease: [0.23, 1, 0.32, 1], onUpdate: v => { ref.current!.textContent = fmt(v); } });
  return () => c.stop();
}, [inView]);
// <span ref={ref} className="tabular-nums">{fmt(to)}</span>
```

`fmt` = `new Intl.NumberFormat(locale, { maximumFractionDigits: decimals }).format`. Only real figures.

## drift: the ground moves with you

```tsx
const { scrollYProgress } = useScroll();
const bg = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["#0A0806", "#161210", "#0E1412", "#0A0806"]);
<motion.div style={{ backgroundColor: bg }} className="fixed inset-0 -z-10" />
```

Stops within one theme family. For many short sections, set a solid background per section instead.

## pointer: tilt, magnet, spotlight

```tsx
const x = useSpring(0, { stiffness: 150, damping: 15 }), y = useSpring(0, { stiffness: 150, damping: 15 });
const onMove = (e: React.PointerEvent) => {
  const r = e.currentTarget.getBoundingClientRect();
  x.set(((e.clientX - r.left) / r.width - 0.5) * 2);
  y.set(((e.clientY - r.top) / r.height - 0.5) * 2);
};
const rotateY = useTransform(x, v => v * 7), rotateX = useTransform(y, v => v * -7);  // tilt 5–9°
// magnet: translate the CTA by (pointer - centre) * 0.28; spotlight: set --mx/--my on the surface
```

Only under `(hover: hover) and (pointer: fine)`, never under reduced motion, never sharing an element with another transform writer.

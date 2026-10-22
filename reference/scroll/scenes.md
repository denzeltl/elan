# Scroll scenes

Scene types for [commands/scroll.md](../../commands/scroll.md), and the rules for mixing them. Effect-mixing rules adapted from scroll-craft (MIT).

## Scene types

| Type | What happens | Tool |
|---|---|---|
| **reveal** | Content enters once as it reaches the viewport (fade/slide/clip) | CSS `animation-timeline: view()` or `motion` `whileInView` |
| **parallax** | Layers move at different speeds | `useScroll` + `useTransform`, CSS scroll timelines |
| **pin** | Section sticks while its inner content changes (steps, captions, counters) | `position: sticky` or ScrollTrigger `pin` |
| **scrub** | A timeline plays forward/back with scroll position (SVG drawing, morph, 3D rotation) | ScrollTrigger `scrub` |
| **sequence** | Video or image frames advance with scroll | `<canvas>` frames or `video.currentTime`, ScrollTrigger |
| **pan** | Vertical scroll drives a horizontal gallery | ScrollTrigger pin + `x` tween |
| **kinetic type** | Lines/words/chars split and move with scroll | SplitText / manual spans + scrub |
| **mask** | Clip-path or mask expands to reveal the next scene | `clip-path` animated by scroll |
| **drift** | Background colour or light shifts across sections | CSS custom property driven by scroll |
| **count** | Numbers tick to their value on entry | `motion` `animate` on entry |

## Mixing rules

- At least 4 different types on a page; never the same type in two consecutive beats.
- At most 2 **scrub** or **sequence** scenes per page; they are expensive to scroll through.
- The peak beat gets the signature scene; nothing before it outdoes it.
- **Parallax** alone is the default to beat: use it as seasoning inside another scene, not as a scene.
- No dead scroll: every 100vh of scroll changes something visible.
- Reduced motion: every scene collapses to static content in reading order.

<!-- TODO(port): add one worked example per type, and scroll-craft's fingerprint check (each build must differ from previous builds on ≥4 of 6 dimensions). -->

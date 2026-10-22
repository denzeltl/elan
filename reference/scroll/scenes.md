# Scroll scenes

Scene types for [commands/scroll.md](../../commands/scroll.md), the rules for mixing them, and the traps that make each one look broken. Adapted from scroll-craft's device kit and uniqueness gate (Nate Herk, MIT). Implementations are in [recipes.md](recipes.md).

Each scene answers "what is the visitor's hand doing here?". Pick per beat, never per page.

## Scene types

| Type | Use it when the beat is… | Hand does |
|---|---|---|
| **scrub** | the open, the thing people screenshot | plays a camera move or timeline frame by frame |
| **sequence** | a product turning, an object assembling | advances image frames on a canvas |
| **pin** | an argument: lines replacing each other over a held frame | holds the frame, advances the content |
| **pan** | breadth: a range, a lineup, a timeline (never a hierarchy) | travels sideways |
| **reveal** | a change of state: something becomes something else | wipes a clip-path edge to edge |
| **kinetic** | one headline that must land | assembles type line by line |
| **parallax** | depth inside another scene (seasoning, not a scene) | separates layers |
| **count** | a real, verified number | lands a figure |
| **flow** | ordinary sections between the big moments | reveals once on entry |
| **pointer** | presence: tilt, magnet, spotlight | moves the mouse, not the wheel |
| **drift** | (a property of scenes) one continuous place | shifts the ground colour |

## Mixing rules

- At least 4 scene families on a page; never the same one in two consecutive beats.
- At most **2 scrub/sequence** scenes: the third is no longer a surprise, and they are the heaviest thing on the page.
- One kinetic headline per scene at most; every heading assembling the same way is the templated rhythm to avoid.
- The peak beat gets the signature; nothing before it outdoes it.
- Flow sections between pinned scenes: the contrast is what makes the pinned ones land.
- One thing is the reason each scene exists. If you can't say its moment in one sentence, it doesn't have one.
- No dead scroll: every viewport of scroll changes something visible.

## Lengths

| Scene | Scroll length |
|---|---|
| scrub (hero) | 2.2–3.0 viewports. Under 1.8 it flies past; over 3.5 the page feels broken |
| pin | 1.2 viewports minimum (below that, progress jumps 0→1 in two notches and everything snaps); 2–3 typical |
| pan | ~1 viewport per item, plus 1 |
| flow | natural height; reduced top padding straight after a pinned scene |

## Traps

**Clip time is not cue time (scrub).** A pinned stage is visible for a viewport *before* its pinned travel starts and a viewport *after* it ends. A clip mapped to pin progress sits frozen on its first frame while sliding in and its last while sliding out: the reader's film stops and a still photo slides past. Map the clip across the stage's whole visible life (ScrollTrigger `start: "top bottom", end: "bottom top"`), keep cues on the pin. Every single frame looks correct, so only scrolling through catches it.

**Lerp the playhead (scrub).** Wheel events arrive unevenly; writing `currentTime` 1:1 reproduces every gap as stutter. Write a target and walk toward it at ~0.18 per frame, skip seeks under 8ms (20ms on mobile), and never queue a seek while one is pending.

**Cue windows (pin).** Crossing lines overlap by ~15% of the scene so the stage is never empty. Each cue has a plateau at full opacity, not a triangle. The hero's first line is already visible on load ("greet"). Only the last scene's last line holds to the end; a held line in a middle scene rides up over the next section. A pinned scene needs a ground (image, colour doing work) or a greeting first line, or it shows an empty stage while sliding in.

**Measure the overflow (pan).** Travel is `scrollWidth − viewport`. Three cards narrower than the viewport travel **zero**, and two viewports of scrolling do nothing, often only at desktop widths. Check `rail.scrollWidth - innerWidth` at every breakpoint; aim for ≥ half a viewport. Fix with *more rail* (heading as the first item, a closing note as the last), not wider cards. Stagger items' settle from progress (first item exempt, opacity floor ~0.55). Keep card headings to one or two short words: they are read half-cropped. Reduced motion turns the rail into a native `overflow-x: auto` scroller with snapping, never a frozen first screen.

**clip-path is the border box (reveal).** On type set below `line-height: 1`, a wipe shears ascenders and descenders. Reveal a padded wrapper. Use reveal big (full-bleed); on small elements it's a fidget. `iris` once per page at most.

**Masks shear descenders (kinetic).** Line masks reserve room for g, y, p, j. Split lines after `document.fonts.ready`. Lines almost always; words for a short punch; characters almost never.

**Parallax stays subtle.** Past ~200px total travel it reads as a bug. Three layers is plenty. Body copy never parallaxes. Layered heroes: plan planes back to front with adjacent rates 10–30% apart, copy at 1×; the foreground overtakes the product; each plane solid below its silhouette; fade the section floor; planes carry `max-width: none`; parallaxed elements transition opacity only (a `transition: transform` lags a second behind the thumb).

**Counters are truth claims.** Only real, verified numbers; a fictional or pre-launch product has none. Ease-out hard over 1.2–1.8s, fire once at half visibility, reduced motion writes the final value.

**Flow reveals.** Opacity from 0 plus a ~14px rise over ~620ms ease-out, children staggered 30–80ms in reading order, triggered slightly inside the viewport (~−12% bottom margin), once. No rise reads as a glitch; over 24px reads as a slide.

**Pointer effects** interpolate toward the pointer (no direct tracking), gated to `(hover: hover) and (pointer: fine)`, off under reduced motion. Tilt 5–9°; magnet 0.2–0.35 on the primary CTA only. Magnet, parallax and reveal-rise all write `transform`: never two on one element; drive an inner wrapper instead.

**Drift** stays within one theme family, 3–5 stops, invisible frame to frame and obvious top to bottom. When several short scenes can be mid-progress at once, paint a solid ground per section instead.

## Fingerprints

Pages built by the same hand converge. Before building a scroll page, read `FINGERPRINTS.md` at the elan root and compare the plan with every row on six dimensions: (1) page grammar, (2) nav treatment, (3) hero scene, (4) scene sequence (types, count, total length), (5) close pattern, (6) signature move. **The new page must differ from every row on at least 4 of 6.** The signature is unique by definition, so that means 3 of the other 5. If the plan fails, change the plan, never the log. After shipping, append a row.

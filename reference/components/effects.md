# Effect patterns

Expressive patterns studied from React Bits (reactbits.dev, MIT + Commons Clause), described as techniques so elan can write its own. Names are React Bits' own, so the live demo is at `reactbits.dev/<category>/<kebab-name>`.

**Cost key**: CSS = no JS · M = `motion` · G = GSAP · C = canvas 2D · W = WebGL (three/ogl/shader). **Fit** names direction families from [directions/index.json](../directions/index.json).

Use one expressive effect per view, two at most. A page where everything shimmers, follows the cursor and scrambles has no signature.

## Text

| Pattern | Technique | Fit | Cost |
|---|---|---|---|
| Split Text | Split into lines/words/chars inside masks, stagger a rise from below the mask | any; lines for most | G or M |
| Blur Text / Scroll Reveal | Words start `blur(8px)` + transparent, resolve in order on entry or with scroll | cinema, editorial | M / CSS |
| Text Type | Typewriter: reveal chars at 25–60ms with a blinking caret; click completes the line | terminal, noir, retro-ui | M |
| Decrypted / Shuffle / Scrambled | Cycle random glyphs per character until each locks to its real letter, left to right | instrument, terminal, security | JS |
| Split Flap Text | Each char flips through a glyph sequence on a split-flap card (two halves, rotateX) | instrument, transit, travel | CSS + JS |
| Rotating Text | Swap a word through a 3D flip (rotateX on a masked line), width animating with `layout` | any hero with a changing noun | M |
| Count Up / Counter | Ease-out count over 1.2–1.8s, or odometer digits rolling per column; tabular figures | data, finance | M |
| Gradient / Shiny Text | `background-clip: text` with a moving gradient or a single sheen band sweeping across | chrome, theatrical, prism | CSS |
| Stroke Text | SVG text with `stroke-dasharray` drawing on, then fill floods in | print, manuscript | CSS / G |
| Variable Proximity / Text Pressure | Variable-font axes (wght, wdth) mapped to pointer distance per letter | swiss, loud | JS |
| Scroll Velocity | Marquee whose speed and skew follow scroll velocity | loud, editorial | M |
| Glitch Text | RGB-split pseudo-elements with stepped clip-path jitter | terminal, y2k, game | CSS |
| Masked Heading | Image or drifting mesh visible through the letterforms, revealed word by word | editorial, fashion | CSS + M |
| Warp / ASCII / Particle Text | Text rendered into a shader, ASCII grid or particle field that reacts to the pointer | webgl, game | W / C |

## Cursor and hover

| Pattern | Technique | Fit | Cost |
|---|---|---|---|
| Magnet | Element translates toward the pointer by 0.2–0.35 of the offset, spring back on leave | any primary CTA | M |
| Tilted Card / Profile Card | rotateX/Y from pointer position (5–9°) via springs, glare layer follows, inner layers at different Z | 3d-object, commerce | M |
| Spotlight Card / Border Glow | Radial gradient at `--mx/--my` on the card surface or its border | dark, glass, instrument | CSS + JS |
| Glare Hover | A diagonal light band sweeps across in the pointer's direction | chrome, glass | CSS |
| Click Spark | Short sparks burst from the click point (canvas or SVG lines), 300–400ms | playful, game | C |
| Target / Crosshair Cursor | Custom cursor whose brackets snap around hovered targets, measuring them | instrument, security | M |
| Image Trail | Images stamp along the pointer path and fade | fashion, portfolio | M |
| Halftone Reveal / Dither Veil | A print or dithered version of an image resolves to full colour under the pointer | print, risograph | C / W |
| Star Border / Electric Border | A light travels the outline of a button or card (offset-path or conic mask) | theatrical, neon | CSS |

Pointer effects run only under `(hover: hover) and (pointer: fine)` and never under reduced motion.

## Signature components

| Pattern | Technique | Fit | Cost |
|---|---|---|---|
| Scroll Stack | Cards pin and stack while scrolling, earlier ones scaling down and dimming | process steps, case studies | G |
| Card Swap / Stack | A 3D stack where the front card is flung or timed to the back | testimonials, decks | M |
| Bounce Cards | A fan of photos that bounce in, spread on hover, and straighten the hovered one | portfolio, playful | G |
| Folder | A folder whose flap opens to reveal pickable pages | dossier, noir, files | M |
| Holo Card | Holographic foil and glitter layers driven by tilt angle | collectibles, game, brand | CSS + M |
| Lanyard | A badge on a physics band you can drag and flip | events, conference | W |
| Dock | macOS-style magnification by pointer distance, launch bounce | app launchers, tools | M |
| Gooey Nav / Pill Nav | Active pill flows between items (SVG goo filter or layoutId) or a fill rises behind the label | nav in playful or soft-ui | M |
| Magic Bento | Bento grid with edge light following the pointer and live artwork per cell | features sections | CSS + M |
| Chroma Grid | Grayscale grid where a spotlight restores colour under the pointer | team, gallery | CSS |
| Circular / Dome / Infinite gallery | Images on a ring, dome or sphere; drag with momentum, snap to nearest | showcase, portfolio | W or CSS 3D |
| Masonry | Spring-in masonry that reflows on resize and opens a lightbox | galleries | M |
| Stepper | Multi-step flow with a gliding indicator and spring transitions | onboarding, checkout | M |
| Animated List | Rows spring into view; selection glides; arrow keys move it | app lists | M |
| Elastic Slider | Slider that stretches past its ends like rubber and springs back | settings, playful | M |

## Micro-interactions

App-mode feedback with character. Each one is a state change made legible.

| Pattern | Technique | Fit |
|---|---|---|
| Hold Button | Hold-to-confirm: fill rises while pressed (2s linear), snaps back on release (200ms) | destructive actions |
| Slide Commit | Slide-to-confirm handle that spins while running and unfurls into a done pill | payments, deploys |
| Fuse Button | Done state carries an undo on a burning fuse that shrinks over the undo window | any reversible action |
| Spring Check | One spring fills the box, draws the tick, then strikes the label | todo, checklists, evidence |
| Squish Switch | Thumb stretches with flick velocity and squashes against the end | toggles in playful worlds |
| Rubber Segment | Segmented-control thumb stretches across the gap and squashes into place | tabs, filters |
| Jelly Radio | Chosen chip swells and nudges neighbours outward | option pickers |
| Code Slots | OTP digits spring into slots, with paste and SMS autofill | auth |
| Pulse Heart | Like button contracts to a dot, flips colour, pulses back while the count ticks | social |
| Peek Rating | Stars lift in a wave up to the pointer; pop on commit | reviews |
| Status Mark | Glyph morphs idle ring → progress arc → check (or shake + red) | async tasks, agents |
| Lattice Loader / Thought Line | A live status row with a timer that folds into one line when done | AI and long tasks |
| Swipe Row / Swipe Toast | Rows swipe to reveal actions; toasts swipe to dismiss with a time fuse | mobile lists, toasts |
| Warm Tooltip | First tooltip waits; siblings then open instantly while "warm" | toolbars |
| Scrub Field | Drag a number chip to scrub its value, rubber-band at limits, click to type | design tools, settings |
| Tear Ticket / Shredder | Perforated stub tears off; dragged rows shred into strips | delete, redeem, playful worlds |

## Backgrounds

Atmosphere, never content. One per page, behind the hero or a single section, paused when off-screen (`IntersectionObserver`) and replaced by a static image or gradient under reduced motion and on low-power devices.

| Feel | Patterns | Cost |
|---|---|---|
| Soft, calm light | Aurora, Soft Aurora, Dark Veil, Grainient, Light Rays, Side Rays | W (some CSS-able with blurred gradients) |
| Silk and liquid | Silk, Plasma, Liquid Chrome, Iridescence, Ferrofluid, Gradient Waves | W |
| Lines and threads | Threads, Floating Lines, Line Waves, Topography, Magnet Lines, Waves | W / C |
| Grids and dots | Dot Grid, Ripple Grid, Dot Field, Shape Grid, Grid Motion, Grid Scan | C / W |
| Retro and pixel | Dither, Pixel Blast, Pixel Snow, CRT Warp, Faulty Terminal, Letter Glitch, Gradient ASCII | W / C |
| Space and speed | Galaxy, Particles, Hyperspeed, Light Tunnel, Lightfall | W |
| Playful physics | Ballpit, Antigravity, Shape Waves | W |
| Instrument | Radar, Scanner | C / W |

A cheap first try for most "soft light" looks: two or three large blurred radial gradients animated slowly with CSS transforms, plus an SVG noise overlay at 4–8% opacity.

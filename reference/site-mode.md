# Site mode

Landing pages, marketing, portfolios, showcases. The job is to make a visitor feel the product's world and leave knowing one thing.

- **One committed direction.** A named world (risograph print, pulp magazine, dark cinema, instrument panel) kept up from the first viewport to the footer. The category-standard look is an option you offer, never the default you drift into.
- **The hero is a set piece.** Huge, tight display type sized to the viewport, imagery drawn in code, and often a live toy (something the visitor can touch: a slider, a mini-game, a working control) that demonstrates the product.
- **Sections have jobs.** 6–12 sections, each heading saying what it tells the visitor. Rhythm alternates density: a dense section is followed by a breathing one; a dark section rises out of light ones at most once or twice.
- **Imagery from code.** SVG generated from seeded randomness, canvas, CSS 3D, WebGL, grain and halftone filters, or the user's own media. Stock photography only when the subject is real and specific.
- **Colour.** A small token set with one accent. Warm off-whites and near-blacks read richer than pure #fff/#000.
- **Type.** One expressive display face, one body face, optionally a mono for labels. Display at −0.03 to −0.06em tracking at large sizes.
- **Motion.** Intensity `immersive` by default: a scroll journey ([commands/scroll.md](../commands/scroll.md)), a kinetic headline on the hero only, and the signature interaction at the page's peak.
- **Getting around.** Pick the nav behaviour that suits the direction; none is required. It can stay sticky at the top, change as you scroll (solid or compact once you leave the hero, sliding in after the hero), or hide on scroll down and return on scroll up. If it ever hides, it must show while the footer is in view. The logo (or wordmark) scrolls back to the top, and the footer carries a quiet "Back to top" link; both go through Lenis when it's on and jump instantly under reduced motion. No floating back-to-top button: it covers content on phones and duplicates what the nav already does.
- **Smooth scroll.** `immersive` site pages use Lenis by default (setup in [scroll/recipes.md](scroll/recipes.md#setup-lenis)): it evens out wheel input so scrubbed and pinned scenes move without stutter. Off under reduced motion, never in app mode, never on a page that scrolls inside a container. Say in the report that it was added; drop it if the user prefers native scrolling.
- **Every section arrives.** Each section that isn't itself a pinned, scrubbed or wiped scene gets a flow reveal on entry: label, heading, lede, then content, staggered in reading order ([scroll/scenes.md](scroll/scenes.md) *Flow reveals*). A section that is simply there when you scroll to it reads as unfinished on an immersive page.
- **Copy.** A concrete product with real-sounding numbers and specifics. No lorem, no "Unlock the power of".

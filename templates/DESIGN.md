---
# Tokens are binding. Follows the Google Stitch DESIGN.md frontmatter shape (as used by impeccable),
# plus elan's `motion` and `direction` blocks.
name: "<Product name>"
direction:
  name: "<direction name, e.g. Pulp detective magazine>"
  thesis: "<one sentence: the world this product lives in>"
  signature: "<the one interaction people remember, e.g. evidence tags stamp onto the board with a slap>"
colors:
  background: "#"
  surface: "#"
  ink: "#"
  muted: "#"
  accent: "#"
  accent-ink: "#"
  danger: "#"
  success: "#"
typography:
  display: { family: "", weight: 800, tracking: "-0.03em" }
  body: { family: "", weight: 400, size: "16px", leading: 1.55 }
  mono: { family: "" }
  scale: ["12px", "14px", "16px", "20px", "28px", "40px", "64px", "96px"]
rounded: { sm: "4px", md: "8px", lg: "16px", full: "999px" }
spacing: { unit: "4px", section: "120px", gutter: "24px" }
motion:
  intensity: crisp          # subtle | crisp | immersive (site mode defaults to immersive)
  personality: "<how this world moves, e.g. snaps and stamps, never floats>"
  durations: { instant: "100ms", fast: "160ms", base: "240ms", slow: "400ms", scene: "700ms" }
  easing:
    out: "cubic-bezier(0.23, 1, 0.32, 1)"
    in-out: "cubic-bezier(0.77, 0, 0.175, 1)"
  spring: { stiffness: 400, damping: 30 }
  reduced: "fade or instant; feedback stays"
components: {}
---

# <Product name>

## Direction
What world this is and why it fits the product. What it is not.

## Colour
Roles and where each colour may appear.

## Type
How display and body are used; the measure; what never happens.

## Layout
Grid, section rhythm, density per mode.

## Imagery
How pictures are made (SVG, canvas, photography) and their treatment.

## Motion
The personality in practice: what gets the signature, what stays instant, how scroll scenes behave.

## Components
Notes on each component in the frontmatter.

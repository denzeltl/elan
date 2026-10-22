# Motion principles

The quality bar for every animation elan writes. Ported and condensed from Emil Kowalski's `emil-design-eng` and `animate` skills (MIT). DESIGN.md's `motion:` block supplies the project's own tokens; where it defines a curve or duration, use it instead of the defaults here.

## The build sequence

Run in order. Steps 1 and 2 gate everything: sometimes the right output is no animation, and that counts as success.

### 1. Should it animate at all?

| How often the user sees it | Decision |
|---|---|
| 100+ times a day (keyboard shortcuts, command palette) | No animation. Keyboard-initiated actions never animate. |
| Tens of times a day (hover, list navigation) | Near-imperceptible: fast and subtle, or nothing |
| Occasionally (modals, drawers, toasts) | Standard animation |
| Rarely or first time (onboarding, success, a case opening) | The delight budget lives here; the signature goes here |

### 2. Name the purpose

One of: **feedback**, **spatial consistency** (where it came from / went), **state indication**, **preventing a jarring change**, **explanation** (marketing and onboarding), **delight** (rare tier only). No name, no animation. Data the user is reading or acting on doesn't move for style.

### 3. Cheapest tool that works

| Need | Tool |
|---|---|
| Hover, press, colour, class/attribute toggles | CSS transition |
| Entry on mount, no JS state | CSS `@starting-style` |
| Predetermined motion that must stay smooth while the page is busy | CSS animation (off the main thread) |
| Programmatic control, CSS performance, no library | WAAPI `element.animate()` |
| Springs, layout and shared-element animation, exit of unmounted elements, gestures | `motion` |
| Scroll timelines, pinning, scrubbing | GSAP ScrollTrigger (see [scroll/recipes.md](../scroll/recipes.md)) |

A toast, drawer, dropdown or command menu is a *component* problem first: use an accessible primitive (Base UI, Radix, Sonner, Vaul, cmdk) and animate it, rather than hand-rolling a `<div>`.

### 4. Properties

- `transform` and `opacity`. `clip-path` is the sanctioned third. `height` only for accordions.
- Never enter from `scale(0)`: start at `scale(0.9–0.97)` with `opacity: 0`.
- `transform-origin` at the trigger for popovers, menus, tooltips (`var(--transform-origin)` in Base UI). Modals stay centred.
- `translate()` percentages are relative to the element itself: `translateY(100%)` moves it by its own height.
- In `motion`, the `x`/`y`/`scale` shorthands run on the main thread; use the full `transform` string for anything that plays while the page is busy.
- Set `transform` on the moving element; never drive it from a CSS variable on a parent (restyles every child).

### 5. Easing and duration, or a spring

| Situation | Easing |
|---|---|
| Entering or exiting | ease-out |
| Moving or morphing on screen | ease-in-out |
| Hover / colour change | ease |
| Constant motion (marquee, progress) | linear |

Never ease-in on UI: it delays the moment the user is watching. Built-in CSS curves are too weak; use:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* UI enter/respond */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like sheet */
```

Need another curve? Take it from easing.dev or easings.co; don't invent one.

| Element | Duration |
|---|---|
| Press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing, scenes, signature moments | longer, set by the scene |

UI stays under 300ms. Intensity shifts this within the range: `subtle` takes the low end and drops optional motion; `crisp` sits mid-range; `immersive` uses the upper end for occasional and rare-tier motion only, never for feedback.

**Springs** for drag with momentum, things that should feel alive, interruptible gestures, and decorative pointer tracking:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }           // Apple-style, easiest to reason about
{ type: "spring", mass: 1, stiffness: 100, damping: 10 } // physics form, more control
```

Bounce 0.1–0.3 at most, and only where the personality is playful or physical (drag-to-dismiss, a stamp landing).

### 6. Interruption and exit

- Transitions, not keyframes, for anything the user can trigger twice in a second: transitions retarget, keyframes restart.
- Springs for gestures: they carry velocity through an interruption.
- Exit the way it entered (a toast from the bottom leaves through the bottom). Exits are faster and simpler than entrances.
- Asymmetric timing where the user is deciding: slow on the deliberate phase (hold-to-confirm, 2s linear), snappy on the system's response (release, 200ms ease-out).
- Stagger 30–80ms between items; it never blocks interaction.

### 7. Reduced motion and hover gating

Ship with the animation, never as a follow-up.

```css
@media (prefers-reduced-motion: reduce) {
  .el { animation: fade 0.2s ease; }   /* keep opacity/colour, drop movement */
}
@media (hover: hover) and (pointer: fine) {
  .el:hover { transform: translateY(-2px); }   /* touch fires false hovers */
}
```

```jsx
const reduce = useReducedMotion();
```

Reduced motion means fewer and gentler, never zero feedback.

## Personality

Emil's rule that motion should fit the component's mood is where elan's direction comes in. The values above are the floor; DESIGN.md's `personality` decides the character within it: a pulp world stamps (short overshoot, a small rotation settling to 0), a cinema world fades and drifts (ease, the long end of each range), an instrument ticks (linear steps, tabular numbers rolling). Every motion should be explainable as "the default, bent toward this world".

## Never ship

| Never | Instead |
|---|---|
| `transition: all` | Name the properties |
| `scale(0)` entrance | `scale(0.95)` + `opacity: 0` |
| ease-in on UI, or the built-in `ease-out` on a deliberate move | `--ease-out` / `--ease-in-out` |
| Animation on a keyboard shortcut or 100+/day action | None |
| UI duration over 300ms without a reason | 150–250ms |
| `transform-origin: center` on a trigger-anchored popover | The trigger's origin (modals exempt) |
| Keyframes on toasts, toggles, rapid triggers | Transitions |
| Animating `width`/`height`/`margin`/`padding`/`top`/`left` | `transform` / `opacity` |
| Ungated `:hover` motion | `(hover: hover) and (pointer: fine)` |
| Missing reduced-motion handling | A gentler variant |
| Everything entering at once | 30–80ms stagger |
| Same speed in and out | Exit faster |

## Feel-checking

Some things can't be settled from code: a crossfade, a spring's bounce, opacity against height in an entering list. Play them at 2–5× duration or in the DevTools Animations panel, step frame by frame, test gestures on a real phone, and look again the next day. If two states visibly overlap in a crossfade, a 2px blur during the transition blends them into one.

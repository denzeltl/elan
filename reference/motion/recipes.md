# Motion recipes

Starting points for the common cases. Pull the recipe you need, then bend it toward DESIGN.md's personality. Recipes 1–12 are ported from Emil Kowalski's `animate` RECIPES (MIT); curves are the tokens in [principles.md](principles.md).

## 1. Button press

```css
.button { transition: transform 160ms var(--ease-out); }
.button:active { transform: scale(0.97); }
```
`scale()` scales the label and icon too, which reads as a physical press. `:active` works on touch; gate `:hover` separately.

## 2. Dropdown, popover, menu, select

```css
.popover {
  transform-origin: var(--transform-origin);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.popover[data-starting-style], .popover[data-ending-style] { opacity: 0; transform: scale(0.95); }
```

## 3. Tooltip

As the popover at 125ms from `scale(0.97)`, plus: once one tooltip is open, neighbours open with no delay and no animation (`[data-instant] { transition-duration: 0ms }`).

## 4. Modal

```css
.modal {
  transform-origin: center;
  transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out);
}
.modal[data-starting-style], .modal[data-ending-style] { opacity: 0; transform: scale(0.96); }
.backdrop { transition: opacity 250ms var(--ease-out); }
```

## 5. Drawer / sheet

```css
.drawer { transform: translateY(0); transition: transform 500ms var(--ease-drawer); }
.drawer[data-closed] { transform: translateY(100%); }
```
Add drag and it becomes recipe 12. Vaul does both.

## 6. Toast

```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```
`ease` and slightly slow on purpose: a toast's motion is tuned to its personality. When toasts stack and reflow, tune opacity against height by eye. Prefer Sonner.

## 7. Accordion

```css
.content { overflow: hidden; transition: height 200ms var(--ease-out), opacity 200ms var(--ease-out); }
```
Measure the height (or use a primitive that supplies it); keep it short, it costs layout every frame.

## 8. Staggered group entrance

```css
.item { opacity: 0; transform: translateY(8px); animation: fadeIn 300ms var(--ease-out) forwards; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
```
For groups seen occasionally, never for lists scrolled past all day. Never blocks interaction.

## 9. Hold to confirm

```css
.overlay { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); }
.button:active .overlay { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
.button:active { transform: scale(0.97); }
```
Linear because the fill is progress.

## 10. Tab indicator with a colour change

Duplicate the tab list, style the copy as active, clip the copy to the active tab, and animate the clip:
```css
.tabs-active-copy { clip-path: inset(0 60% 0 20%); transition: clip-path 250ms var(--ease-in-out); }
```
Text and background change in perfect sync because one element is revealed instead of two colours interpolating. (The `motion` alternative, a `layoutId` pill, is the generic default: use it only when it fits the personality.)

## 11. Scroll reveal (marketing only)

```css
.reveal { clip-path: inset(0 0 100% 0); transition: clip-path 600ms var(--ease-in-out); }
.reveal[data-visible] { clip-path: inset(0 0 0 0); }
```
Trigger once with `IntersectionObserver` or `useInView(ref, { once: true, margin: "-100px" })`. Never on functional UI visited daily. For anything beyond a one-time reveal, see [scroll/scenes.md](../scroll/scenes.md).

## 12. Drag to dismiss

```js
const velocity = Math.abs(swipeAmount) / (Date.now() - dragStart);
if (Math.abs(swipeAmount) >= THRESHOLD || velocity > 0.11) dismiss();
element.style.transform = `translateY(${distance}px)`; // directly, not via a parent CSS variable
```
Pointer capture once dragging starts; ignore extra touch points mid-drag; damp movement past the boundary (friction, not a wall); settle with `{ type: "spring", duration: 0.5, bounce: 0.2 }`.

## Utility moves

- **Crossfade that won't settle**: `filter: blur(2px); opacity: .7` on the transitioning content, 200ms ease.
- **No-library programmatic motion**: `el.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' })`.

## Personality recipes (elan)

Starting points for signature interactions. Each must still pass [principles.md](principles.md).

- **Stamp** (impact, print, pulp): enter from `scale(1.15) rotate(-4deg)` + opacity 0 to rest, spring `{ duration: 0.35, bounce: 0.3 }`; a hard offset shadow appears on landing; optional 2px page nudge on the container.
- **Typewriter dialogue** (noir, terminal): reveal words at 18–30ms each with a caret; clicking completes the line instantly; reduced motion shows the full line.
- **Develop** (photo, cinema): image goes from `filter: contrast(.6) brightness(1.4) blur(4px)` to normal over 700ms ease-out, once, on entry.
- **Ticker** (instrument, data): digits roll vertically 200ms ease-out per change, tabular figures, no bounce.
- **Paper slide** (dossier, editorial): sheets enter from `translateY(12px) rotate(0.6deg)` and settle to 0 with `--ease-out` 280ms; stacked sheets offset by 2px each.

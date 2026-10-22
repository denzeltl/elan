---
name: elan
description: "Front-end design, motion and scroll system. Use when the user names elan (/elan, \"use elan\"), or when the project's CLAUDE.md says its UI work uses elan. Commands: build, explore, improve, motion, scroll, audit, polish, brand."
---

# elan

One design system for sites and apps: a committed art direction, motion with a signature, and scroll scenes, carried from the landing page into the product. Every visual change is seen as a **prototype** before it touches the codebase.

## Start of every run

1. Read `DESIGN.md` at the project root if it exists. It is the **source of truth**: tokens are binding, prose explains them. If it is missing and the command will change UI, run the setup in [commands/build.md](commands/build.md#setup) first.
2. Decide the **mode** of the surface being touched (a page can mix: a marketing page inside an app is site mode):
   - **site**: landing pages, marketing, portfolios. Leads with art direction and scroll scenes. Default motion intensity `immersive`. Read [reference/site-mode.md](reference/site-mode.md).
   - **app**: product screens, dashboards, games, tools. Leads with micro-interactions, state changes, clarity. Default intensity `crisp`. Read [reference/app-mode.md](reference/app-mode.md).
3. Read [reference/craft-floor.md](reference/craft-floor.md) before any UI edit.
4. **Scratch space.** Every working file elan makes goes under `.elan/` at the project root: briefs, decision pages, screenshots, fixtures, notes. Make sure `.elan/` is listed in the project's `.gitignore` (add it if not). Anything that has to sit elsewhere to work (a seed page in `public/`, a launch config entry for a prototype server) is written down in `.elan/cleanup.md` the moment it's created.
5. Route to the command.

## Commands

| Command | Use when | File |
|---|---|---|
| `build` | New page, screen, or project; also sets up DESIGN.md in an existing codebase | [commands/build.md](commands/build.md) |
| `explore` | "Show me other ways this could look": N variants of a page, section or component | [commands/explore.md](commands/explore.md) |
| `improve` | Change an existing layout or component; flags `--bolder --quieter --simpler --color --type --layout` | [commands/improve.md](commands/improve.md) |
| `motion` | Micro-interactions, transitions, hover/press/state feedback | [commands/motion.md](commands/motion.md) |
| `scroll` | Scroll scenes: pinning, scrubbing, sequences, horizontal galleries | [commands/scroll.md](commands/scroll.md) |
| `audit` | Review only: design, a11y, performance, edge cases, motion quality. Changes nothing | [commands/audit.md](commands/audit.md) |
| `polish` | Final pass before shipping: copy, responsive, alignment, overflow | [commands/polish.md](commands/polish.md) |
| `brand` | Logo, identity, palette and type for a product | [commands/brand.md](commands/brand.md) |

With no command (`/elan` alone or a plain request): look at the project (DESIGN.md present? which surfaces exist? recent changes?), name the 2–3 commands that fit, with one line each on why, and wait for the user to pick. Run one directly only when the request maps unambiguously to it.

## The prototype gate

Layout, component, visual-style and brand changes are shown as a **prototype** first, and source changes only after the user picks:

- **New work** → a standalone decision page from [templates/decision-page.html](templates/decision-page.html), served locally.
- **Existing component** → the in-app picker from [templates/InAppPicker.tsx](templates/InAppPicker.tsx), variants rendered in place with real data.
- **Motion changes** → a small demo page where each motion can be triggered and replayed.
- **Audit fixes** that change no visual design (contrast, focus rings, aria, overflow) skip the gate and show the diff.

The gate is passed when the user has chosen (or asked for a mix); a picked variant is then built properly, never shipped as prototype code. Once the choice lands, delete the decision page and any in-app picker code from the source.

## Signature over defaults

Untreated, every design converges on the same motion: a sliding `layoutId` highlight, springy button presses, parallax on scroll. Those are the floor. Each direction in DESIGN.md names one **signature interaction** and a **motion personality** (how this world moves: a pulp magazine stamps and slaps, a dark cinema fades and drifts, an instrument ticks), and every motion choice is checked against them. [reference/motion/](reference/motion/) holds the rules that make motion *good* (timing, easing, interruption, performance); the direction decides what makes it *ours*.

## Done

A command is done when its file's completion criteria hold and, for any UI change:

- `node ~/.claude/skills/elan/scripts/shoot.mjs <url>` (add `--stress` for long strings) screenshots pass at 1440, 768 and 390px and with reduced motion: no text overflowing its container, no horizontal scroll at 390px, nothing hidden behind motion.
- Every section answers "what is this section telling the user?" in its heading and first line.
- Every control meets the interaction floor in [commands/motion.md](commands/motion.md#interaction-floor) (both modes, landing pages included), and the user has tried the motion demo.
- Site mode, `immersive`: every non-scene section reveals on entry, and Lenis is on unless the user declined it.
- The build passes.

Then **clean up** before reporting: delete everything under `.elan/` and every path listed in `.elan/cleanup.md` (seed pages, fixtures in `public/`, prototype servers in launch configs), and stop any servers elan started. The only durable artifacts are `DESIGN.md`, the source changes, and the CLAUDE.md line if the user opted in. Keep a file only when the user asks for it.

Report what changed, the direction it serves, what was cleaned up, and anything left undone.

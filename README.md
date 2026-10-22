# elan

A personal all-in-one front-end skill for coding agents (Claude Code, Antigravity, Codex, Gemini CLI and others): art direction, motion, scroll scenes and brand, with every visual change prototyped before it lands. It carries one design world from the landing page into the product.

## Install

Once, in any harness: run `npm install` in this folder. It installs the screenshot checker's browser driver, which drives your installed Chrome.

elan is plain Markdown plus one Node script. In its files, `<elan>` means this folder, and the "rules file" is whichever project instructions file your harness reads (see *Harness notes* in [SKILL.md](SKILL.md)).

**Claude Code**
1. Link this folder as a skill (Windows junction shown; a symlink works elsewhere):
   ```
   mklink /J "%USERPROFILE%\.claude\skills\elan" "C:\Users\Denzel\Desktop\Vibe code\elan"
   ```
2. Copy `agents/elan-reviewer.md` to `~/.claude/agents/` so reviews run as a separate agent.
3. Start a new session; `/elan` is now available in every project.

**Harnesses that load skill folders** (a `SKILL.md` with front matter): link or copy this folder into that harness's skills folder, per its docs. If it can start separate agents, give it `agents/elan-reviewer.md`; if not, elan runs the review itself.

**Any other harness:** point the project's rules file (`AGENTS.md`, `GEMINI.md`, or the harness's own) at elan:

```
For all UI, design and motion work, read and follow <absolute path to this folder>/SKILL.md.
DESIGN.md is the source of truth.
```

Edits to this folder take effect in the next session.

## Quick start

In a project, ask for UI work and name elan:

```
/elan build Redesign the landing page and the settings screen. Make it feel immersive.
```

Without slash commands, say it in words: "Use elan to build …". Or ask elan alone ("use elan") and it suggests the 2–3 commands that fit the project.

## What a run looks like

A first `build` in a project without a `DESIGN.md` goes like this. elan stops at each **you decide** step and waits for you.

1. **Brief.** elan reads the codebase and writes a brief per surface: every section with its job (what it tells the user), the signature moment, and the pitfalls. It asks only what the code can't answer.
2. **Directions (you decide).** It serves a local decision page (the URL is in its message) with 3–4 genuinely different art directions plus the "category standard" look. Each shows a hero and one real section, with a replay button for its signature move.
   - Mark each option **Keep**, **More like this** or **Kill**, add notes, press **Copy decision** and paste the result into chat. Plain words work too ("B's colours with D's type").
   - Two keeps or a mix leads to another round. It iterates until one direction is locked.
3. **DESIGN.md.** The locked direction becomes `DESIGN.md` at the project root: tokens, type, motion personality and the signature interaction. From then on it is the source of truth.
4. **Rules-file opt-in (you decide).** elan offers to add a line to the project's rules file (`CLAUDE.md`, `AGENTS.md`…) so the project always uses it. Say yes or no.
5. **Build.** Section by section against the brief, with imagery drawn in code and real copy. Site pages get scroll scenes, section reveals and Lenis smooth scrolling. Every control gets hover, press and focus motion (the *interaction floor* in `commands/motion.md`).
6. **Checks.** `shoot.mjs` screenshots at 1440, 768 and 390px and with reduced motion, with and without stress text. The build must pass. A reviewer (a separate agent where the harness allows, otherwise elan in a fresh pass) judges the screenshots (at most two fix rounds).
7. **Demo (you decide).** elan gives you a "hover this, drag that" list against the running app, or a demo page. It isn't done until you've tried it.
8. **Cleanup and report.** Scratch files are deleted, and the report covers what changed, the direction, what was cleaned up and what didn't pass.

Later runs in the same project skip steps 2–4 and build on `DESIGN.md`.

## Commands

| Command | Use it for | Example |
|---|---|---|
| `build` | A new page, screen or project; also sets up `DESIGN.md` | `/elan build the pricing page` |
| `explore` | See N variants of a page, section or component | `/elan explore 3 versions of the hero` |
| `improve` | Change an existing layout or component. Flags: `--bolder --quieter --simpler --color --type --layout` | `/elan improve --quieter the dashboard header` |
| `motion` | Micro-interactions, transitions, hover/press/state feedback | `/elan motion the checkout form` |
| `scroll` | Scroll scenes: pinning, scrubbing, sequences, galleries | `/elan scroll the features section` |
| `audit` | Review only (design, a11y, performance, edge cases, motion); changes nothing | `/elan audit /settings` |
| `polish` | Final pass before shipping: copy, responsive, alignment, overflow | `/elan polish` |
| `brand` | Logo, identity, palette and type | `/elan brand for a bike-repair app` |

Visual changes always go through a prototype first: a decision page for new work, an in-app picker for existing components, a demo page for motion. Audit fixes that change no visual design (contrast, focus, aria, overflow) skip it.

## What elan leaves in your project

- **Kept:** `DESIGN.md`, the source changes, and the rules-file line if you opted in:
  > All UI, design, and motion work in this project uses the elan skill; DESIGN.md is its source of truth.
- **Scratch:** briefs, decision pages, screenshots and test fixtures live in `.elan/`, which elan adds to `.gitignore`. Anything it had to put elsewhere (a seed page in `public/`, say) is listed in `.elan/cleanup.md`. All of it is deleted at the end unless you ask to keep something.
- **Nothing is committed.** You review and commit.

## Tips

- **Apps that call paid or rate-limited APIs:** say so in the request. elan tests with a seeded fixture plus a few real calls rather than looping on your keys.
- **Run the checker yourself:** `node <elan>/scripts/shoot.mjs http://localhost:3000/ --stress` (screenshots go to `.elan/shots`). It catches text overflow and horizontal scroll, but not panes squeezed inside clipped containers, which is what the reviewer is for.
- **Don't run `next build` while `next dev` is running** in the same project; dev may keep serving stale CSS until restarted.
- **Fingerprints:** after a scroll page is merged, elan offers to log it in your personal `~/.elan/fingerprints.md` so the next page doesn't repeat it. The log never lives in this repo (format and rules in [FINGERPRINTS.md](FINGERPRINTS.md)).

## Layout

```
SKILL.md        router: modes, commands, prototype gate, done checks, cleanup
commands/       one file per command
reference/      loaded on demand: site and app modes, craft floor, motion, scroll, components, directions
templates/      decision page, in-app picker, DESIGN.md, brief
scripts/        shoot.mjs screenshot + overflow check
agents/         elan-reviewer brief (a subagent in Claude Code; an inline review elsewhere)
```
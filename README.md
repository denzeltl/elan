# elan

A personal all-in-one front-end skill for Claude Code: art direction, motion, scroll scenes and brand, with every visual change prototyped before it lands.

Installed by a junction: `~/.claude/skills/elan` → this folder. Edits here take effect in the next session.

## Use

`/elan` alone suggests what to do next. Or name a command: `/elan build`, `explore`, `improve [--bolder|--quieter|--simpler|--color|--type|--layout]`, `motion`, `scroll`, `audit`, `polish`, `brand`.

To make a project use elan automatically, add this to its `CLAUDE.md` (`build` offers to):

> All UI, design, and motion work in this project uses the elan skill; DESIGN.md is its source of truth.

## Layout

```
SKILL.md        router: modes, commands, prototype gate, done checks
commands/       one file per command
reference/      loaded on demand (motion, scroll, modes, craft floor, directions)
templates/      decision page, in-app picker, DESIGN.md, brief
scripts/        shoot.mjs screenshot + overflow check
agents/         elan-reviewer (copy to ~/.claude/agents to enable)
```

## Status

Skeleton. Files marked `TODO(port)` still need their full content ported from the sources in [CREDITS.md](CREDITS.md).

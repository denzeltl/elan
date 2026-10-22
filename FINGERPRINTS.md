# Fingerprints

The anti-sameness check for scroll pages (see [reference/scroll/scenes.md](reference/scroll/scenes.md#fingerprints)). A new page must differ from **every** logged page on at least 4 of the 6 dimensions below.

The log itself is personal and never lives in this repo: it is `~/.elan/fingerprints.md` in the user's home folder (create it with the header below if missing). Keeping it outside the skill means the skill can be shared or published without carrying anyone's project history, and one person's log still spans all their projects.

Rules:
- Append a row only after the user says the page has landed (merged or shipped). An unmerged branch or a discarded experiment is never logged.
- Ask before writing the row; show it first.
- Keep the newest 20 rows; drop the oldest when adding the 21st. Old pages stop mattering for sameness.
- Record what exists; never edit a row to make a new plan fit.

Header for a new log:

```md
| Project · page (date) | World | 1 Grammar | 2 Nav | 3 Hero scene | 4 Scene sequence | 5 Close | 6 Signature |
|---|---|---|---|---|---|---|---|
```

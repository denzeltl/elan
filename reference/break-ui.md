# Break the UI

Feed a surface the data real users produce and record what breaks. Used by [audit](../commands/audit.md) step 4 and before any [polish](../commands/polish.md). Ported and condensed from Emil Kowalski's `break-ui` skill and catalogue (MIT).

Demo data was chosen, usually without anyone noticing, to make the design look good. Undo that, one field at a time.

## Rules

- **Plausible or schema-backed.** Every value is something a real user could produce, or the actual limit from the Zod schema, DB column, or API contract. `aaaaaaaa…` proves nothing. No limit found is itself a finding: "unbounded".
- **Change the data, not the component.** Worst cases enter through the same boundary demo data does: fixture, mock, props, API stub. (The `--stress` mode of `shoot.mjs` is a quick screen-level smoke test; this reference is the real one.)
- **One dataset, many failures.** Spread the breaks across the first rows (row 1 long name, row 2 long email, row 3 one-letter name), as real data does.
- **Dev-only toggle.** A `?data=worst` URL param read where the fixture is chosen, or a prototype route. Positions: Demo / Worst / Empty / One / Huge. Never ships.
- **Report before fixing.** Some breaks are design decisions.

## Steps

1. **Map** every rendered value: field, source, type, limit (or "unbounded"), optional? Include counts in headers, relative times, badge text, data-driven button labels, avatars, and the list length itself.
2. **Build** one worst-case fixture from the catalogue below, plus Empty (0 items), One (every count at 1), Huge (the realistic upper bound; 1,000+ if unpaginated).
3. **Break** it at the real container width, at 320px, at the widest layout, at 200% zoom, and in dark mode / RTL if supported. Screenshot each.
4. **Report**: Broken (unreadable, unreachable, wrong data) / Ugly (visibly wrong) / Fragile (one step from breaking), each with field, value, what happens, fix, file:line. Then decisions for the user (truncate vs wrap, empty-field treatment, paginate vs virtualise), then what held up.

## Catalogue

**Names**: `Aleksandra Wiśniewska-Kowalczyk` (long, hyphen, diacritics) · `Christopher Alexander Montgomery III` (naive initials → `CI`) · `Jo` / `J` (short; tiny click target) · `Đặng Thị Ngọc Hân` (stacked diacritics clipped by tight line-height) · `王秀英` (CJK, no spaces) · `نور الهدى عبد الرحمن` (RTL; needs `dir="auto"`) · `Seán O'Brien-Ó Súilleabháin` (escaping) · `María José de la Cruz y Fernández` (particles) · `🦊 Fox`, `👩🏽‍💻 Priya` (emoji first; `.charAt(0)` gives `�`) · `  Sam   Lee ` (stray spaces) · missing name.

**Unbreakable strings**: `bartholomew.fitzgerald@northwind-industries-holdings.example.com` · long URL with query string · UUID · `Q3 Board Deck — FINAL (revised) v12 [approved by legal].pdf` · `IMG_20250914_183022_HDR_portrait_edited_edited.HEIC` · `@thisisaverylongusernamethatisallowed`. Use `example.com`/`.test` domains.

**Labels and copy**: `Senior Product Design Engineer, Platform Infrastructure` · `Invitation expired 12 days ago` (long badge) · `Benachrichtigungseinstellungen` (30-char German compound) · French/German expansion (~30% longer) · twelve tags on one item · one 45-char tag · `Untitled` / empty / whitespace title · `<script>alert(1)</script>`, `&amp;`, `**bold**` (must render literally) · newline in a single-line field · 2,000-character description.

**Numbers**: `0` (empty bars, divide by zero) · `1` ("1 members") · `1284` (separator) · `1000000` (badge width; compact `1M`?) · `12345678.9` as currency · `-42.5` · `0.1 + 0.2` raw · `142%` / `-3%` (meters past bounds) · `null`/`undefined`/`NaN` · locale separators · a live value 99 → 100 (width jitter).

**Collections**: 0 · 1 (lonely grid) · exactly page size and page size + 1 · 1,000+ · one item 10× the size of the rest · identical names.

**Time**: now ("0 seconds ago") · 12 days / 11 months / 3 years ago · a future date · `1970-01-01` · a time that's a different day in UTC · `1,284 hours`. Use `Intl.RelativeTimeFormat` / `Intl.DateTimeFormat`.

**Media**: 404 avatar · no avatar · 4000×200 and 200×4000 images · transparent or dark logo on dark mode · slow image (layout shift).

**States**: loading · API error (raw `TypeError` leaking) · partial data · every enum status at once · no permission · the current user in the list.

**Environment**: 320px container · a 280px sidebar placement · 2560px wide · 200% zoom · dark mode · `dir="rtl"` · touch (hover-only actions unreachable).

## Failure signatures

| You see | Cause | Fix |
|---|---|---|
| Avatar/icon squished into a pill | Flex child shrinking | `flex-shrink: 0` on fixed-size boxes |
| Text overflows instead of wrapping | Flex/grid child `min-width: auto` | `min-width: 0` (`minmax(0, 1fr)` in grid) |
| Email/URL runs past the edge | No break points | `overflow-wrap: anywhere` |
| Trailing action pushed off-screen | Middle took all the space | `min-width: 0` on middle, `flex-shrink: 0` on the action |
| Badge wraps to two lines | Badge can shrink | `white-space: nowrap; flex-shrink: 0`; decide what yields |
| Avatar adrift next to a 3-line name | `align-items: center` | `align-items: flex-start` once text can wrap |
| Last row cut mid-glyph | Fixed height, no affordance | Scrollbar or fade mask |
| Heading word broken mid-word | `word-break: break-all` | `overflow-wrap: anywhere` |
| Wrong initials | `split(' ')[0][0]` | `Intl.Segmenter` graphemes, first + last word, icon fallback |
| Orphaned `—` for a missing field | Placeholder for optional data | Omit the line, or reserve height on purpose |
| "1 members" | Hard-coded plural | `Intl.PluralRules` |
| Numbers jitter, columns misalign | Proportional figures | `font-variant-numeric: tabular-nums` |
| `1284`, `NaN`, `undefined` | Raw number | `Intl.NumberFormat`, null guard |
| Translated button overflows | Fixed width | Content width with `min-width` |
| Diacritics clipped | Tight line-height + `overflow: hidden` | Looser line-height, no clipping on text |
| Broken-image icon | No `onError` | Initials fallback, `object-fit: cover` |
| Ellipsis with no way to read the rest | Truncation only | `title`/tooltip and the full value elsewhere |
| 1,000 rows stutter | Everything rendered | Virtualise or paginate |
| Raw `<b>` or `&amp;` | Wrong escaping layer | Escape once at render |

**Truncate, wrap, or clamp**, per field: *wrap* what identifies a thing (names, titles in detail views); *end-truncate* secondary metadata, with a way to see it all; *middle-truncate* when items differ at the end (file names, paths, hashes); *clamp* multi-line card previews; *never truncate* numbers, money, dates, anything compared.

Done when every applicable catalogue row has been tried at every width and environment above, and every break has a signature, a cause, and a fix.

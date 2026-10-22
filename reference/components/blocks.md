# Block patterns

What a complete version of each standard section or screen contains, distilled from shadcn studio's block catalogue (shadcnstudio.com/blocks, MIT + Commons Clause for free items). Use these as checklists: build each block in the project's direction, but don't ship one missing a part listed here without a reason. Live examples: `shadcnstudio.com/blocks/<group>/<name>`.

Primitives come from shadcn/ui (Radix or Base UI) for accessibility: dialogs, menus, popovers, tabs, selects, tooltips. Restyle them to DESIGN.md; never hand-roll their behaviour.

## Marketing (site mode)

| Block | Must have | Often worth adding |
|---|---|---|
| **Navbar** (`navbar-component`) | Logo that links home (on a one-page site: scrolls to top), 3–6 links, one primary CTA, mobile menu with focus trap and `aria-expanded`, current-page state | A scroll behaviour chosen for the direction: always sticky, solid or compact once past the hero, or hide on scroll down / return on scroll up (if it hides, it shows whenever the footer is in view); dropdown for products |
| **Hero** (`hero-section`) | One-sentence promise, a supporting line, primary + secondary CTA, a visual that *shows* the product | Social proof strip, a live demo or toy, "no credit card" style friction remover |
| **Logo cloud / social proof** | Recognisable logos at even optical size, monochrome | Marquee with pause on hover; a single metric |
| **Features** (`features-section`) | 3–6 features, each a benefit headline + one line + visual; scannable | Tabbed or scroll-linked feature demos |
| **Bento** (`bento-grid`) | One dominant cell, varied cell sizes, each cell a live or illustrated detail | Edge light following the pointer |
| **Integrations** (`app-integration`) | Grid of logos with names, a category filter if many | "Request an integration" |
| **Testimonials** | Quote, name, role, company, photo; real-sounding specifics | Video testimonials, a metric per quote |
| **Pricing** (`pricing-component`) | 2–4 plans, one highlighted, monthly/yearly toggle with saving shown, feature list, CTA per plan | Comparison table (`compare`), FAQ beneath, enterprise contact |
| **Compare** | Rows of features, columns of plans or competitors, clear ✓/✗, sticky header | Highlight the recommended column |
| **FAQ** | 5–10 real objections in accordions, keyboard accessible | Contact link for anything missing |
| **CTA section** | One action, one sentence on why now | Repeat of the hero's visual motif |
| **Team / About** | Photos, names, roles; a story paragraph | Values, timeline (`timeline-component`) |
| **Blog / Portfolio / Gallery** | Cards with image, title, date or tag, excerpt; filter by tag | Featured first item larger |
| **Contact** | Form (name, email, message), response time, alternative channels | Map, office hours |
| **Waitlist** | Email field, position or count, what happens next | Referral link to move up |
| **Footer** (`footer-component`, `mega-footer`) | Nav groups, legal, social, newsletter, language/theme; a "Back to top" link on long pages | Status link, a giant wordmark |
| **Cookie consent** | Accept / reject equally prominent, settings link | Per-category toggles |
| **Error page** | What happened, a way home, search | A small on-brand illustration |

## Auth

`login-page`, `register`, `forgot-password`, `reset-password`, `verify-email`, `two-factor-authentication`: one column, labelled inputs with `autocomplete` attributes, password visibility toggle, inline validation after blur, error summary on submit, SSO buttons if any, link between login and register, OTP inputs that accept paste.

## App (app mode)

| Block | Must have | Often worth adding |
|---|---|---|
| **Application / dashboard shell** | Sidebar or top nav, page header with title + primary action, content area with max width, user menu | Collapsible sidebar to an icon rail with tooltips, command palette (⌘K), breadcrumbs |
| **Sidebar** | Grouped nav with icons and labels, active state, collapse, keyboard reachable | Badges with counts, workspace switcher |
| **Header** | Search, notifications, user menu, theme toggle | Global "create" button |
| **Statistics / widgets** | Metric, label, change vs. period with direction and colour, time range | Sparkline, tooltip with exact values |
| **Charts** | Title, unit, legend, tooltip, empty state, accessible table fallback | Range selector, comparison series (the `dataviz` skill has the chart rules) |
| **Data table** | Sort, filter, search, pagination or infinite scroll, column visibility, row selection with bulk actions, empty and loading states, sticky header | Inline editing, grouping, expansion rows, drag-to-reorder, export |
| **Forms / multi-step form** | Labels above fields, help text, inline validation, required markers, a clear primary action, progress for multi-step | Autosave, review step before submit |
| **Account settings** | Sections (profile, security, notifications, billing), save per section, destructive zone separated | Session list, connected accounts |
| **Empty state** | What this is, why it's empty, the one action that fills it | Sample data, a short illustration in the direction's style |
| **Dialog / dropdown** | Focus trap, Esc closes, returns focus, labelled title | Confirm step for destructive actions |
| **File upload** | Drop zone + button, type/size limits shown, progress per file, retry on failure | Paste from clipboard, preview |
| **Calendar / Gantt / Kanban** | Keyboard navigation, today marker, drag with a visible drop target, overflow handling ("+3 more") | Filters, swimlanes, zoom levels |
| **Inbox** | List + reading pane, unread state, selection, keyboard shortcuts | Snooze, labels |
| **Onboarding** | Steps with progress, skip, the first real action within the first screen | Checklist that persists on the dashboard |
| **Workflow builder** | Canvas with pan/zoom, nodes with ports, edge drawing, minimap, undo | Validation markers on nodes |

## Commerce

Product list and category filter (facets with counts, active filter chips, sort), product overview (gallery with zoom, variant pickers with availability, price, add to cart, delivery info, reviews summary), quick view, cart (quantity steppers, line totals, remove with undo, subtotal, shipping estimate), checkout (guest option, address autocomplete, order summary always visible, payment last), order summary, reviews (distribution bars, filters, verified badges), announcement banner (dismissible), offer modal (easy to close, never on first paint).

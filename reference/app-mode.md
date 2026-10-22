# App mode

Product screens, dashboards, games, tools. The job is to make repeated use feel fast, clear and alive.

- **Carry the direction in.** The app is the same world as the landing page, translated for use: the same type, palette and signature, at working density. A landing page in one world and an app in generic dark UI fails.
- **Every interaction answers back.** Hover, press, focus-visible, selected, disabled, loading, success and error states exist for every control, and each one *moves*, per the interaction floor in [commands/motion.md](../commands/motion.md#interaction-floor); a colour swap alone does not count. Feedback is near-instant (100–160ms); state changes show where things went (shared-element and layout transitions).
- **Interruptible.** Anything the user can repeat quickly (tabs, list selection, toggles, sheets) uses springs or retargeting transitions.
- **Frequency decides motion.** Actions done hundreds of times a day get little or no animation; first-time moments (onboarding, a case opening, a win) get the most.
- **Density and clarity.** Clear hierarchy per screen: one primary action, labels that say what things are, numbers aligned (tabular figures). Empty, loading and error states are designed, not defaulted.
- **Data edges.** Long names, many items, missing values and slow responses are the normal case; design with them from the start ([break-ui.md](break-ui.md)).
- **Motion intensity** `crisp` by default: fast, precise, personality in the details (how a card lands, how a stamp hits), not in scale or duration.

# build

New page, screen, or project. Also the setup path for any project without a DESIGN.md.

## Setup

Runs when DESIGN.md is missing.

1. **Read the product.** README, routes, existing components, current styles and fonts, package.json (framework, Tailwind, motion libraries). Note what the product is, who uses it, and which surfaces are site vs app mode.
2. **Existing UI worth keeping?** If the codebase already has a visual identity the user likes, extract it into DESIGN.md (tokens from the CSS/Tailwind config, components as built) instead of inventing one. Ask once if unclear.
3. **Otherwise, choose a direction** with the decision page (step 2 of the build below).
4. **Write DESIGN.md** from [templates/DESIGN.md](../templates/DESIGN.md). Every token filled, the `motion:` block included, the signature interaction named.
5. **Offer the opt-in line** for the project's CLAUDE.md (create the file if absent), and add it only on a yes:
   `All UI, design, and motion work in this project uses the elan skill; DESIGN.md is its source of truth.`

Setup is done when DESIGN.md exists with no placeholder left and the user has answered the CLAUDE.md offer.

## Build

1. **Brief.** Write the brief from [templates/brief.md](../templates/brief.md) into `.elan/briefs/<surface>.md`: stack, tokens, numbered sections each with its *job* (what it tells the user), the signature moment, pitfalls. Ask the user only what the codebase and DESIGN.md cannot answer (audience, the one thing a visitor must leave knowing, real content to use).
2. **Directions** (only for a new project or a surface the user wants to look different): pick 3–4 *divergent* directions from [reference/directions/index.json](../reference/directions/index.json) (follow its `_dealing` rule) plus one "category standard" option. Once one is locked, fetch its `source.prompt` for the full tokens, sections and pitfalls, and adapt them to this product rather than copying the page. Divergent means they differ in at least type, palette, and imagery approach; four variations of one safe idea fails this step. Render each as a hero + one representative section on the decision page ([templates/decision-page.html](../templates/decision-page.html)), serve it, and wait for the user's keep / kill / more-like-this marks. Iterate until one is locked.
3. **Build** section by section against the brief, checking each standard section or screen against [reference/components/blocks.md](../reference/components/blocks.md) so nothing expected is missing. Imagery is drawn in code (SVG, canvas, CSS, WebGL) or uses the user's media; never a placeholder box. Copy is concrete and specific to the product, written for the section's job.
4. **Motion pass**: run [motion.md](motion.md) steps 2–4 over the new surface. Site mode also runs [scroll.md](scroll.md) for the hero and at least one mid-page scene.
5. **Verify** per the router's *Done* list, then dispatch the `elan-reviewer` agent ([agents/elan-reviewer.md](../agents/elan-reviewer.md)) with the screenshots, the brief and DESIGN.md. Apply its *fix* items; at most two rounds.

Done when every brief section is built with its job visible, the signature interaction works, the reviewer returns *ship*, and the *Done* checks pass.

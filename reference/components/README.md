# Component patterns

What good interactive components are made of, so elan can write its own in the project's direction. Two files:

- [effects.md](effects.md): **expressive** patterns (text animations, cursor and hover effects, signature components, micro-interactions, backgrounds), studied from React Bits. Reach for these when building a signature interaction or a site-mode hero.
- [blocks.md](blocks.md): **structural** patterns (what a complete hero, pricing table, dashboard shell, data table, form or empty state contains), studied from shadcn studio's block catalogue. Reach for these when building or auditing a section or app screen so nothing standard is missing.

## How to use them

1. Find the pattern by what the moment needs, not by name.
2. Check its fit: the **personality** column says which directions it suits; the **cost** says what it loads (CSS only, `motion`, GSAP, canvas, WebGL).
3. Write it yourself in the project's stack and DESIGN.md tokens, passing [motion/principles.md](../motion/principles.md) and [craft-floor.md](../craft-floor.md). Every pattern needs a reduced-motion version and a touch version (pointer effects do nothing on touch, so the element must still make sense without them).
4. To see a live reference, open the source page: `https://reactbits.dev/<category>/<kebab-name>` or `https://shadcnstudio.com/blocks/<group>/<name>`. Catalogues for agents: `https://reactbits.dev/llms.txt`, `https://shadcnstudio.com/llms.txt`.

## Licence

React Bits (free tier) and shadcn studio free items are MIT + Commons Clause: using them in products is fine, reselling the components is not. elan treats both as reference: it studies the technique and writes its own implementation, and never vendors their code into this skill. If the user explicitly wants the original component, install it with the shadcn CLI (`npx shadcn@latest add https://reactbits.dev/r/<Name>-TS-TW`), then restyle it to DESIGN.md.

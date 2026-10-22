# Free assets for scenes

<!-- TODO(port): taste v2's assets.mjs approach (Openverse, Wikimedia Commons, Art Institute of Chicago, The Met open access; no keys, credits recorded). -->

- Prefer imagery drawn in code: seeded SVG (patterns, maps, diagrams), canvas 2D, CSS 3D, three.js/OGL.
- The user's own photos and footage. Encode video for scrubbing with frequent keyframes: `ffmpeg -i in.mp4 -c:v libx264 -g 5 -crf 23 -an out.mp4`.
- Open-licence sources (record the credit in `CREDITS` on the page): Openverse, Wikimedia Commons, Art Institute of Chicago API, The Met Open Access.

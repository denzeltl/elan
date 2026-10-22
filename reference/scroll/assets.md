# Assets for scenes

Where scene imagery comes from, free and without API keys. Encoding values from scroll-craft (Nate Herk, MIT); open-licence sources as used by taste v2.

## Order of preference

1. **Drawn in code.** Seeded SVG (patterns, maps, diagrams, generated charts, wafer and circuit motifs), canvas 2D, CSS 3D, three.js / OGL, grain and halftone via SVG filters. Seed the randomness so renders are stable.
2. **The user's own photos and footage.** Ask for them in the brief.
3. **Open-licence collections.** Openverse (api.openverse.org), Wikimedia Commons, Art Institute of Chicago API (`api.artic.edu`, public-domain works flagged `is_public_domain`), The Met Open Access (`collectionapi.metmuseum.org`). Record title, author, licence and source URL in a credits line on the page.

## Video for scrubbing

Dense keyframes make seeks land instantly; they cost file size and buy responsiveness.

```bash
# desktop master: 1080p, keyframe every 8 frames
ffmpeg -i in.mp4 -an -vf scale=-2:1080 -c:v libx264 -profile:v high -preset slow -crf 20 -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart -pix_fmt yuv420p out.mp4
# phone variant: 720p, keyframe every 4 frames
ffmpeg -i in.mp4 -an -vf scale=-2:720 -c:v libx264 -profile:v high -preset slow -crf 24 -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart -pix_fmt yuv420p out-m.mp4
# poster = the clip's first frame, never a separate image
ffmpeg -y -i out.mp4 -frames:v 1 -vf scale=1600:-2 -c:v libwebp -quality 82 poster.webp
```

Use a full ffmpeg build (some toolchains put a stripped one on PATH that silently lacks filters; on Windows, the winget `Gyan.FFmpeg` full build). Joining clips end to end: take the last frame of clip 1 (`ffmpeg -sseof -0.05 -i a.mp4 -frames:v 1 seam.png`) as the first frame of clip 2 so there's no visible cut.

## Image sequences

`ffmpeg -i in.mp4 -vf fps=30,scale=1600:-2 seq/%04d.webp` (and a ~1000px set for phones). 60–150 frames per scene.

## Layered hero planes

Transparent PNG/WebP planes, each solid below its silhouette, exported at a fixed pixel width. New art gets a new filename (phones cache the old bytes).

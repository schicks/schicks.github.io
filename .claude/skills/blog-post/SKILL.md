---
name: blog-post
description: Use when starting a new blog post on this site, turning an idea into a post, or continuing a draft in packages/website/src/routes/posts. The workflow deliberately caps how much prose gets written and spends the effort on an interactive visualization instead.
---

Posts on this site work because a visualization does the explaining and the
prose does the framing, not the other way around. "Visualizing Voting
Systems" makes the spoiler effect obvious by letting you drag a candidate
around a Yee diagram; "Pi By Hand" makes a binary-search algorithm legible by
animating it column by column. In both cases the surrounding text is short —
it sets up a question, points at the diagram, and interprets what happened.
Take that away and the post has nothing left to say. That's the target: if
you deleted the visualization, would the post collapse? If not, the
visualization isn't doing enough work yet.

The failure mode this skill exists to prevent is writing the whole essay
first and bolting a chart on afterward. Once a paragraph fully explains an
idea in words, there's no pressure left to build something that shows it,
and the visualization becomes decoration. Build the visualization while the
idea still needs it.

## Workflow

**1. State the idea in one or two sentences.** What's the actual claim, and
where is the moment a reader needs to *see* something rather than be told
it? If you can't name that moment, you don't have a post yet, you have a
topic.

**2. Write an outline, not a draft.** Headers and, once it exists, the
visualization's own caption — nothing else. No prose, and no explanatory
one-liners under the headers either: if a header seems to need a sentence
to make sense before its visualization exists, that's a sign to go build
the visualization, not to write a placeholder sentence to tide it over. The
header names the beat; the caption explains it once there's something to
caption. If you catch yourself writing a real sentence of connective prose
during outlining, stop — that sentence belongs in step 6, not here.

**3. For each outline beat, ask what a reader could manipulate, not what
chart would depict it.** "What parameter, if the reader dragged or toggled
it, would make the idea click?" beats "what static chart summarizes this
fact?" Look at existing components for the shape of an answer:
- `packages/website/src/lib/voting/Simulation.svelte` +
  `YeeDiagram.svelte` — drag candidates, click to re-simulate, watch the
  outcome region change live.
- `packages/website/src/lib/circles/{Darts,Sequential,BinarySearch}.svelte`
  — the same problem solved three ways, each one a step in an argument
  about algorithm design.
- `packages/website/src/lib/VegaLite.svelte` — a thin Vega-Lite wrapper for
  when the point really is a static chart and interactivity would be noise.
  Don't reach for this by default; the site's strongest posts are bespoke
  Svelte components, not spec-driven charts.

If a beat in the outline has no visualization and needs more than a
paragraph or two of prose to land, that's usually a sign it wants a diagram
instead of more words — reconsider before writing your way through it.

**4. Prototype the outline in an Artifact before touching Svelte.** Build a
single self-contained HTML file — headers, a working reimplementation of
each visualization (inline JS/SVG/Canvas; the Artifact CSP blocks CDNs and
external requests, so port the actual logic in rather than linking d3 or
similar), and captions, matching the outline exactly and nothing more.
Publish it with the Artifact tool, and redeploy to the *same* URL
(`url:` param) on every subsequent round so it stays one stable link to
iterate against. Also send the file directly (`SendUserFile`) alongside it
— the hosted artifact viewer isn't always reachable, and the raw HTML
opens in any browser as a fallback. This loop is much cheaper than editing
real Svelte components and running a dev server for every small change,
and it's a shared surface: the user can react to structure and interaction
choices before any of it is real. Keep outlining and reshaping the
visualizations here until both are settled — this is where disagreements
about the idea itself should surface and get resolved, before step 5 makes
them expensive to change.

**5. Port the settled prototype into the real components.** Once the
outline and the interactions in the artifact are agreed, build the actual
component(s) under `packages/website/src/lib/<topic>/`, scoped tightly to
what this post needs (2-4 small components, not a generic charting
library), and wire them into the draft `.mdx`. Verify in a real browser
against a real dev server, not just by reading the code:

```bash
npm run dev   # or: nx dev website
```

then visit `/posts/<slug>`, and drive the interaction (drag, click,
slider) the way the artifact prototype did, confirming it behaves the same
way now that it's real.

**6. Only after the visualization works, fill in the minimal prose.** Each
paragraph's job is to set up context before a visualization or interpret
what the reader just did after one. If a paragraph could be deleted without
losing the argument, delete it.

**7. Lazy-load anything expensive.** Wrap heavier interactive components in
`<IntersectionObserver initialHeight={N}>` (see
`static-rendering-in-sveltekit.mdx`-era posts or `visualizing-voting-systems.mdx`
for the pattern) so they don't run until scrolled into view.

## File conventions

- Location: `packages/website/src/routes/posts/<kebab-case-slug>.mdx` — the
  filename (minus extension) is the slug.
- Frontmatter:
  ```
  ---
  title: 'Human-readable title'
  date: YYYY-MM-DD HH:MM:SS
  status: draft
  blurb: One or two sentences used as the teaser on the index page.
  ---
  ```
  `status` must be exactly `published` for a post to appear in the index
  (see `packages/website/src/lib/getPosts.ts`); leave it as `draft` for
  anything still in progress. Write `blurb` deliberately rather than
  relying on the first-paragraph fallback — with prose kept minimal, the
  first paragraph is often too thin to stand alone as a teaser.
- Svelte components (including data prep helpers like `elections.ts`) are
  imported in an mdx `<script>` block using `$lib/...` paths, then used as
  JSX-like tags in the body — see the top of `visualizing-voting-systems.mdx`
  for the pattern.

## Anti-patterns

- Writing a full draft before any visualization exists.
- Writing outline one-liners or connective sentences "just to hold the
  place" — the outline stage is headers and captions, full stop; anything
  more is step 6 arriving early.
- Jumping straight into editing Svelte components (and a dev server
  restart per tweak) for a visualization idea that hasn't been settled yet
  — prototype it in an Artifact first, where iteration is nearly free.
- A visualization that only restates a sentence already in the prose above
  it, instead of showing something the prose can't.
- Building a reusable/generic charting abstraction when the post only needs
  one specific interaction.
- Padding a section with explanation because building the visualization
  felt harder than writing around it.

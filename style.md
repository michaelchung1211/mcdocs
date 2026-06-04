# Parchment Explorer Style — Spec

A warm, refined aesthetic. Think: explorer's journal meets editorial magazine. Earthy tones on cream paper, distinctive serifs paired with clean sans, generous spacing, subtle ornament. Optimized for long-form reading.

**Avoid:** purple gradients, glassmorphism, neon, pixel-art Minecraft cliché, generic Inter/Roboto, dark mode default, emoji-heavy decoration.

## Aesthetic Direction

* Mood: scholarly, warm, deliberate. Like a well-printed paperback or a hand-lettered field guide.
* Hierarchy through typography and space, not through boxes/cards-everywhere.
* Italic serif as accent for labels, eyebrows, ornaments — never for body.
* Decorative elements are sparse and meaningful (one divider, one ornament per page max).
* Light theme only. The warmth of the paper is the point.

## Color Tokens

```css
:root {
  --paper:        #f3ead5;  /* main background, warm cream */
  --paper-warm:   #ebe0c6;  /* slightly darker paper */
  --paper-dark:   #d9cba3;  /* deepest paper tone */
  --ink:          #2a1f14;  /* primary text, deep warm brown */
  --ink-soft:     #4a3a26;  /* body prose */
  --ink-mute:     #7a684e;  /* captions, footers */
  --forest:       #2d5a3d;  /* primary accent, links */
  --forest-deep:  #1c3a26;  /* h3, code-block accents */
  --terra:        #a8472d;  /* secondary accent, italics, numbers */
  --terra-soft:   #c46a4a;
  --gold:         #b8893a;  /* dividers, list markers, ornaments */
  --sky:          #4a6b7d;  /* tertiary, info callouts */
  --rule:         #c4b48a;  /* hairlines, dotted borders */
  --shadow:       rgba(60, 40, 20, 0.12);
}
```

**Usage rules:**

* One dominant color per section. Forest = primary CTA/links, terra = accent/numbers, gold = decoration only.
* Body text is `--ink-soft`, not pure `--ink`. Reserve `--ink` for headings and `<strong>`.
* Never mix terra and forest in the same component as equal partners — pick one as primary.

## Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Noto+Serif+TC:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Stack:

* **Body** : `"Noto Sans TC", "Fraunces", serif` — clean sans for CJK readability
* **Headings** : `"Noto Serif TC", "Fraunces", serif` — warm serif, weight 600
* **Italic accents** : `"Fraunces", "Noto Serif TC", serif` — italic, weight 300-400
* **Monospace** : `"JetBrains Mono", "Consolas", monospace`

Sizes:

* Base: `17px` (16px on mobile), line-height `1.75`
* h1 hero: `clamp(40px, 6vw, 64px)`, weight 600, line-height 1.1, letter-spacing `-0.01em`
* h2: `36px`, weight 600
* h3: `22px`, weight 600, color `--forest-deep`
* h4: `16px` sans, weight 600
* Lead paragraph: `21px`, weight 300, italic Fraunces

**Letter-spacing tricks:**

* Eyebrows / labels: `0.3em` to `0.35em`, uppercase, `13-14px`, italic Fraunces, color `--terra` or `--ink-mute`
* Headings: slightly negative (`-0.005em` to `-0.01em`) to feel tighter and more authored

**Italic is a feature, not decoration.** Use Fraunces italic for: eyebrows, section markers, callout labels, ornaments, in-body `<em>` accents (always colored `--terra`).

## Layout

* Container: `max-width: 880px`, centered, padding `0 28px`
* Section spacing: `margin: 100px 0` (70px on mobile)
* Hero: `padding: 100px 0 60px`
* Paragraphs: `margin-bottom: 16px`
* No multi-column. Linear reading flow.

## Background Treatment

Layered: two radial gradients (gold + forest tint) + SVG noise filter on cream base.

```css
body {
  background: var(--paper);
  background-image:
    radial-gradient(circle at 20% 10%, rgba(184, 137, 58, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(45, 90, 61, 0.06) 0%, transparent 50%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.08 0'/></filter><rect width='400' height='400' filter='url(%23n)'/></svg>");
}
```

The noise is critical — it makes the cream feel like paper, not flat color. Don't omit.

## Signature Components

### Eyebrow + Section Marker

Numbered, italic, with leading rule:

```html
<div class="section-marker">01 · The Basics</div>
```

```css
.section-marker {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 13px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--terra);
  display: flex;
  align-items: center;
  gap: 14px;
}
.section-marker::before {
  content: "";
  width: 40px;
  height: 1px;
  background: var(--terra);
}
```

Use one per section. Number with leading zero (`01`, `02`).

### Lead Paragraph

Large, italic, with gold left rule. One per section max — the section's thesis.

```css
.lead {
  font-family: "Fraunces", "Noto Serif TC", serif;
  font-weight: 300;
  font-size: 21px;
  line-height: 1.65;
  color: var(--ink-soft);
  padding-left: 24px;
  border-left: 2px solid var(--gold);
}
```

### Callouts

Three flavors, distinguished only by left-border color + label color. No icons, no big backgrounds.

```css
.callout {
  padding: 24px 28px;
  background: rgba(255, 250, 235, 0.5);
  border-radius: 2px;
}
.callout-warn { border-left: 3px solid var(--terra);  background: rgba(168, 71, 45, 0.04); }
.callout-info { border-left: 3px solid var(--sky);    background: rgba(74, 107, 125, 0.04); }
.callout-tip  { border-left: 3px solid var(--forest); background: rgba(45, 90, 61, 0.04); }

.callout-label {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
}
```

Label format: `<span class="callout-label">Warning · 注意</span>` — bilingual English + native, separated by `·`.

### Step List

Italic Roman numerals as numbers, forest left border.

```css
.step {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 24px;
  padding: 24px;
  background: rgba(255, 250, 235, 0.5);
  border-left: 3px solid var(--forest);
}
.step-num {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 44px;
  font-weight: 300;
  color: var(--forest);
  line-height: 1;
}
```

Number with lowercase italic Roman: `i`, `ii`, `iii`. Not `1`, `2`, `3`.

### Reference List (two-column item rows)

For commands, definitions, keybindings — anything that's `term → description`. Dotted hairline separators, two columns on desktop, stack on mobile.

```css
.cmd-list { display: grid; gap: 10px; }
.cmd-item {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 2fr;
  gap: 24px;
  padding: 10px 0;
  border-bottom: 1px dotted rgba(196, 180, 138, 0.5);
}
@media (max-width: 640px) {
  .cmd-item { grid-template-columns: 1fr; gap: 4px; }
}
```

Group these under an italic small-caps subheading:

```css
.cmd-group-title {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terra);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule);
}
```

### Table of Contents

Boxed, max-width narrower than main column, italic header, counter-driven numbering, dotted-line list items.

```css
nav.toc {
  padding: 32px 40px;
  background: rgba(255, 250, 235, 0.6);
  border: 1px solid var(--rule);
  border-radius: 2px;
  max-width: 560px;
  backdrop-filter: blur(4px);
}
nav.toc ol { list-style: none; counter-reset: toc-counter; }
nav.toc li { counter-increment: toc-counter; }
nav.toc li::before {
  content: counter(toc-counter, decimal-leading-zero);
  font-family: "Fraunces", serif;
  font-size: 13px;
  color: var(--terra);
}
```

### Tables

Hairline borders, gold-tinted header background, hover state.

```css
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15.5px;
}
.compare-table th {
  font-family: "Noto Serif TC", serif;
  font-weight: 600;
  background: rgba(184, 137, 58, 0.06);
  border-bottom: 2px solid var(--gold);
}
.compare-table td { border-bottom: 1px solid var(--rule); }
.compare-table tr:hover td { background: rgba(255, 250, 235, 0.5); }
```

### Details / Collapsible

Custom `+`/`−` marker in italic Fraunces, no default triangle.

```css
details summary::-webkit-details-marker { display: none; }
details summary::after {
  content: "+";
  font-family: "Fraunces", serif;
  font-size: 24px;
  color: var(--terra);
  font-weight: 300;
}
details[open] summary::after { content: "−"; }
```

### Inline Code

Subtle, brown-tinted background. No bright syntax-highlight colors.

```css
code {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.92em;
  background: rgba(74, 58, 38, 0.08);
  color: var(--forest-deep);
  padding: 2px 8px;
  border-radius: 2px;
  border: 1px solid rgba(74, 58, 38, 0.1);
}
```

### Code Block

Dark on cream — high contrast island, gold left border.

```css
.cmd-block {
  background: var(--ink);
  color: var(--paper);
  padding: 16px 20px;
  border-left: 3px solid var(--gold);
  border-radius: 2px;
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
}
```

### List Markers

Color-coded by list type:

```css
ul li::marker { color: var(--gold); }
ol li::marker { color: var(--terra); font-family: "Fraunces", serif; font-style: italic; }
```

## Ornament Vocabulary

Used sparingly. Each character below is meaningful:

* `❦` floral heart — section dividers, hero
* `⁂` asterism — major divider, footer
* `·` middle dot — separator in eyebrows and labels (`01 · The Basics`, `Warning · 注意`)
* `—` em dash — for asides in prose

Avoid: emoji, icons, sparkle/star symbols, decorative SVGs. The ornament IS the typography.

## Animation

Subtle and one-shot, never looping. Page-load staggered reveal only.

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero > * { animation: fade-up 0.8s ease-out backwards; }
.hero-eyebrow  { animation-delay: 0.10s; }
.hero-title    { animation-delay: 0.25s; }
.hero-subtitle { animation-delay: 0.40s; }
.hero-divider  { animation-delay: 0.55s; }
```

No hover scale, no parallax, no scroll-triggered fancy stuff. The only "motion" beyond load is link underline color transitions and details expand.

## Responsive

Single breakpoint at `640px`. Above: comfortable two-column reference rows, large hero. Below: stack everything, reduce hero padding, shrink heading sizes, single-column step grid.

```css
@media (max-width: 640px) {
  body { font-size: 16px; }
  header.hero { padding: 60px 0 40px; }
  section { margin: 70px 0; }
  h2 { font-size: 28px; }
  h3 { font-size: 19px; }
  .lead { font-size: 18px; padding-left: 16px; }
  .cmd-item, .step { grid-template-columns: 1fr; }
}
```

## Voice Cues for Content

If writing content to fit this style, match the tone:

* Body prose: warm, second-person ("you"), occasional contractions, never breathless. Confident but not pushy.
* Eyebrows: short, English (`The Basics`, `Getting Started`, `For Admins`) — feels like chapter labels.
* Callout labels: bilingual where the audience supports it (`Tip · 小技巧`, `Warning · 注意`).
* Lead paragraphs: full sentence, italic, sets the section's thesis in one breath.
* FAQ summaries: natural questions, not corporate ("我朋友走進我的領地，但他不能蓋東西，怎麼辦？" not "如何授權成員建造權限？").

## Section Pattern

A typical content section follows this rhythm:

```html
<section id="...">
  <div class="section-marker">01 · Section Name</div>
  <h2>段落標題</h2>
  <p class="lead">本段一句話的主旨，斜體，左側金色線條。</p>
  <p>正文段落。</p>
  <h3>子標題</h3>
  <p>更多正文。</p>
  <div class="callout callout-tip">
    <div class="callout-label">Tip · 提示</div>
    <p>補充資訊。</p>
  </div>
</section>
```

## Anti-Patterns

Do not:

* Add box shadows beyond hairline borders. Depth here comes from paper texture, not floating cards.
* Use full-width hero images or large illustrations. The page is text-first.
* Center body paragraphs. Only the hero is centered.
* Introduce a fourth accent color. Forest + terra + gold + sky (for info) is the full set.
* Replace italic Fraunces with another italic font. The Fraunces italic IS the personality.
* Add `border-radius` above `2px`. Sharp corners feel printed.
* Use `Inter`, `Roboto`, `Space Grotesk`, or any geometric sans. The serif is essential.

## Quick Sanity Check

If a finished page looks like:

* A Notion doc → too clean, add more italic accents and ornaments
* A WordPress theme → too generic, tighten typography and remove decorative gradients
* A Minecraft fan site → wrong direction, this isn't pixel-themed
* An exhibition catalog or literary journal → ✓ on target

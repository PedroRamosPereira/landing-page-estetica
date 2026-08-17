# Count-Up Experiment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate only the `+4.000 procedimentos` metric once when it enters the viewport, while preserving the final value for SSR, accessibility, reduced motion, and API fallbacks.

**Architecture:** Keep `Numeros` as a Server Component and add one focused Client Component for observation and frame scheduling. Put deterministic easing and formatting in a separate tested module so browser integration remains thin and the existing Node test runner can verify the animation math.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 7, Node test runner through `tsx`, Tailwind CSS 4.

---

### Task 1: Count progression and formatting

**Files:**
- Create: `components/count-up.test.ts`
- Create: `components/count-up.ts`

- [ ] **Step 1: Write the failing helper tests**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { countUpValue, formatCountUpValue } from "./count-up";

test("count-up starts at zero and clamps at the target", () => {
  assert.equal(countUpValue({ elapsed: -10, duration: 1200, target: 4000 }), 0);
  assert.equal(countUpValue({ elapsed: 1200, duration: 1200, target: 4000 }), 4000);
  assert.equal(countUpValue({ elapsed: 1600, duration: 1200, target: 4000 }), 4000);
});

test("count-up uses the existing cubic ease-out curve", () => {
  assert.equal(countUpValue({ elapsed: 600, duration: 1200, target: 4000 }), 3500);
});

test("count-up remains monotonic", () => {
  const values = [0, 200, 400, 600, 800, 1000, 1200].map((elapsed) =>
    countUpValue({ elapsed, duration: 1200, target: 4000 }),
  );
  assert.deepEqual(values, values.toSorted((a, b) => a - b));
});

test("count-up formats the metric in pt-BR", () => {
  assert.equal(formatCountUpValue(4000), "+4.000");
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx tsx --test components/count-up.test.ts`

Expected: FAIL because `./count-up` does not exist.

- [ ] **Step 3: Implement the deterministic helpers**

```ts
type CountUpValueOptions = {
  elapsed: number;
  duration: number;
  target: number;
};

const ptBrIntegerFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

export function countUpValue({ elapsed, duration, target }: CountUpValueOptions) {
  if (duration <= 0) return target;

  const progress = Math.min(Math.max(elapsed / duration, 0), 1);
  const easedProgress = 1 - (1 - progress) ** 3;
  return Math.floor(target * easedProgress);
}

export function formatCountUpValue(value: number) {
  return `+${ptBrIntegerFormatter.format(value)}`;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npx tsx --test components/count-up.test.ts`

Expected: all four count-up helper tests PASS.

### Task 2: Accessible client boundary

**Files:**
- Create: `components/CountUpNumber.test.ts`
- Create: `components/CountUpNumber.tsx`

- [ ] **Step 1: Write the failing server-markup test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CountUpNumber } from "./CountUpNumber";

test("renders the final metric for SSR and hides intermediate updates from assistive technology", () => {
  const html = renderToStaticMarkup(createElement(CountUpNumber, { target: 4000, duration: 1200 }));

  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /class="sr-only">\+4\.000<\/span>/);
  assert.match(html, />\+4\.000<\/span>/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx tsx --test components/CountUpNumber.test.ts`

Expected: FAIL because `./CountUpNumber` does not exist.

- [ ] **Step 3: Implement viewport-triggered animation**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { countUpValue, formatCountUpValue } from "./count-up";

type CountUpNumberProps = {
  target: number;
  duration?: number;
};

export function CountUpNumber({ target, duration = 1200 }: CountUpNumberProps) {
  const [value, setValue] = useState(target);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!element || reducedMotion || !("IntersectionObserver" in window)) return;

    let frame: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        const startedAt = performance.now();
        setValue(0);

        const animate = (now: number) => {
          const elapsed = now - startedAt;
          setValue(countUpValue({ elapsed, duration, target }));

          if (elapsed < duration) {
            frame = requestAnimationFrame(animate);
          } else {
            frame = null;
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [duration, target]);

  const formattedTarget = formatCountUpValue(target);

  return (
    <>
      <span ref={elementRef} aria-hidden="true" className="inline-block min-w-[6ch] tabular-nums">
        {formatCountUpValue(value)}
      </span>
      <span className="sr-only">{formattedTarget}</span>
    </>
  );
}
```

- [ ] **Step 4: Run component and helper tests**

Run: `npx tsx --test components/CountUpNumber.test.ts components/count-up.test.ts`

Expected: all focused tests PASS without warnings.

### Task 3: Connect the experiment to the procedures metric

**Files:**
- Create: `components/Numeros.test.ts`
- Modify: `config/clinica.ts:41-45`
- Modify: `components/Numeros.tsx:1-18`

- [ ] **Step 1: Write the failing integration test**

Render `Numeros` with `renderToStaticMarkup` and assert that exactly one
`aria-hidden` animated value and its `sr-only` `+4.000` counterpart appear in
the block labelled `procedimentos`.

- [ ] **Step 2: Mark only the selected metric as countable**

Change the procedures entry to:

```ts
{ contagemAte: 4000, rotulo: "procedimentos" },
```

`contagemAte` is the single source of truth; do not retain a duplicate
formatted `valor` for this metric.

- [ ] **Step 3: Render the client component only for the marked metric**

Add the import and replace the number paragraph contents:

```tsx
import { CountUpNumber } from "@/components/CountUpNumber";

<p className="font-serif text-[32px] leading-none font-normal">
  {"contagemAte" in n ? <CountUpNumber target={n.contagemAte} duration={1200} /> : n.valor}
</p>
```

- [ ] **Step 4: Run the full automated suite**

Run: `npm test`

Expected: all existing carousel, WhatsApp, count-up helper, and SSR markup tests PASS.

- [ ] **Step 5: Build the production application**

Run: `npm run build`

Expected: Next.js production build completes with no TypeScript or prerender errors.

### Task 4: Browser verification

**Files:**
- No source changes expected.

- [ ] **Step 1: Start the development server**

Run: `npm run dev`

Expected: Next.js reports a local URL and serves `/` successfully.

- [ ] **Step 2: Verify desktop and mobile behavior**

At desktop and 375px viewport widths, confirm `+4.000` counts once over 1.200 ms when the metrics strip enters the viewport, finishes exactly at `+4.000`, does not shift surrounding layout, and does not restart after scrolling away and back.

- [ ] **Step 3: Verify reduced motion and fallback behavior**

Emulate `prefers-reduced-motion: reduce` and confirm the metric remains static at `+4.000`. Disable `IntersectionObserver` in a browser test context and confirm the final value remains visible without console errors.

- [ ] **Step 4: Inspect the final worktree diff**

Run: `git diff -- components/count-up.ts components/count-up.test.ts components/CountUpNumber.tsx components/CountUpNumber.test.ts components/Numeros.tsx components/Numeros.test.ts config/clinica.ts docs/superpowers/specs/2026-08-17-count-up-experiment-design.md docs/superpowers/plans/2026-08-17-count-up-experiment.md`

Expected: only the approved experiment, its tests, and documentation are present. Commit steps are intentionally omitted because the user did not request a commit.

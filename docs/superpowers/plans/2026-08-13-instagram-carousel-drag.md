# Instagram Carousel Drag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make desktop mouse dragging follow the pointer continuously, carry bounded momentum on release, and settle on a post without regressing other carousel inputs.

**Architecture:** Integrate the pending carousel component from `feat/desktop-carousel`, then keep gesture physics in a small pure TypeScript module. The Client Component owns DOM measurement, pointer capture, cancellation, loop recentering, and animation frames while React state only drives visible UI.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Pointer Events, Node's built-in test runner through `tsx`.

---

### Task 1: Integrate The Pending Carousel

**Files:**
- Modify: `components/Bastidores.tsx`

- [ ] **Step 1: Copy only the carousel implementation**

Copy `.worktrees/desktop-carousel/components/Bastidores.tsx` to `components/Bastidores.tsx`. Do not copy `README.md` or `components/WhatsappFloat.tsx` from that worktree.

- [ ] **Step 2: Confirm the integration scope**

Run: `git diff --stat -- components/Bastidores.tsx README.md components/WhatsappFloat.tsx`

Expected: only `components/Bastidores.tsx` has a source-code diff.

### Task 2: Add Gesture Physics With TDD

**Files:**
- Create: `components/carousel-physics.ts`
- Create: `components/carousel-physics.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Add the test runner**

Run: `npm install --save-dev tsx`

Add this script to `package.json`:

```json
"test": "tsx --test components/carousel-physics.test.ts"
```

- [ ] **Step 2: Write failing target-selection tests**

Test a slow release settling to the nearest target, left and right flick projection, the projection cap, and physical edge clamping. Import `selectInertialTarget` from `./carousel-physics` so the first run fails because the module does not exist.

- [ ] **Step 3: Verify the tests fail for the expected reason**

Run: `npm test`

Expected: FAIL because `components/carousel-physics.ts` cannot be resolved.

- [ ] **Step 4: Implement the pure calculation**

Create `selectInertialTarget` with these inputs:

```ts
type SelectInertialTargetOptions = {
  currentScrollLeft: number;
  velocity: number;
  targets: readonly number[];
  projectionMs?: number;
  maxProjection?: number;
};
```

Clamp `velocity * projectionMs`, add it to the current position, and return the index of the closest physical target. Use defaults of `240ms` and one-and-a-half card strides supplied by the caller.

- [ ] **Step 5: Verify the tests pass**

Run: `npm test`

Expected: all carousel physics tests PASS.

### Task 3: Apply Continuous Drag And Inertial Settle

**Files:**
- Modify: `components/Bastidores.tsx`

- [ ] **Step 1: Track recent pointer samples in refs**

Extend `dragRef` with recent `{ x, time }` samples. Reset them on pointer down and retain only a short window during pointer move. Do not put continuous coordinates in React state.

- [ ] **Step 2: Disable snap only after drag activation**

When movement crosses six pixels, set `rail.style.scrollSnapType = "none"`, set the grabbing cursor state, and keep assigning `scrollLeft = startScrollLeft - distance`. Pointer capture belongs to `event.currentTarget`.

- [ ] **Step 3: Settle after release**

Calculate velocity from the recent sample window, convert pointer velocity to scroll velocity, call `selectInertialTarget`, and pass that physical index to `scrollToPhysicalPoint`. For reduced motion, the existing function uses immediate scrolling.

- [ ] **Step 4: Preserve cancellation and loop recentering**

Keep wheel, touch, pointer, resize, controls, and keyboard cancellation. When loop recentering changes `startScrollLeft`, leave pointer samples in client coordinates because their velocity remains valid.

- [ ] **Step 5: Run focused tests and type/build verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: Next.js production build exits with code 0.

### Task 4: Browser Verification

**Files:**
- Modify only if verification reveals a reproducible defect: `components/Bastidores.tsx`, `components/carousel-physics.ts`, or `components/carousel-physics.test.ts`

- [ ] **Step 1: Verify desktop pointer behavior**

At desktop width, test a slow drag, quick flick in both directions, release between cards, interrupted settling, loop boundaries, buttons, indicators, keyboard arrows, and post-link click suppression.

- [ ] **Step 2: Verify native inputs and responsive behavior**

At mobile width, confirm native touch scrolling and vertical page pan. On desktop, confirm trackpad and wheel scrolling remain native and can interrupt settling.

- [ ] **Step 3: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`. Drag must remain direct while release settles without inertial animation.

- [ ] **Step 4: Run final checks**

Run: `npm test && npm run build && git diff --check`

Expected: tests pass, build exits with code 0, and diff check prints no errors.

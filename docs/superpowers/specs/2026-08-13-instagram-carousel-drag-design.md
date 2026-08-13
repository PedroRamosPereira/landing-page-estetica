# Instagram Carousel Drag Design

## Context

The pending `feat/desktop-carousel` worktree adds an infinite Instagram carousel to `components/Bastidores.tsx`. Trackpad, wheel, keyboard, indicators, and arrow controls navigate the rail. Mouse drag writes directly to `scrollLeft` while mandatory CSS snap remains enabled, which can force card alignment during the gesture. Releasing the pointer stops immediately because the implementation does not preserve gesture velocity.

This change uses redesign-preserve mode. It keeps the page layout, typography, palette, card shape, carousel controls, and content intact.

## Design Read

This is a landing-page interaction fix for pointer and trackpad users. It preserves the existing premium clinic language and uses native browser scrolling with restrained physical motion.

- `DESIGN_VARIANCE: 7`, unchanged
- `MOTION_INTENSITY: 6`, because drag feedback and inertial settling communicate direct manipulation
- `VISUAL_DENSITY: 4`, unchanged
- Foundation: existing Next.js 16, React 19, Tailwind CSS 4, and Pointer Events. No animation dependency.

## Integration Scope

Copy only the pending `components/Bastidores.tsx` implementation from `.worktrees/desktop-carousel` into the main worktree before applying the fix. Do not copy the unrelated pending `README.md` or `components/WhatsappFloat.tsx` changes.

## Interaction

Mouse drag follows the pointer continuously at a 1:1 distance. The rail disables CSS snap after the drag threshold is crossed, preventing the browser from pulling the rail toward a card while the pointer is down.

The drag session records recent pointer positions and timestamps outside React state. On release, the carousel derives horizontal velocity from a short recent sample window, projects a bounded travel distance, and chooses the nearest physical card target in that direction. A slow release settles on the nearest card. A quick flick may advance farther, subject to a bounded projection so one noisy event cannot skip an unreasonable number of posts.

The existing animation loop settles the rail at the selected target with an ease-out curve. Native wheel, trackpad, touch, keyboard, indicator, and arrow interactions can interrupt that animation. Infinite-loop recentering continues to adjust the drag origin when the rail crosses a cloned sequence boundary.

## State And Events

Transient pointer coordinates, velocity samples, animation frame IDs, and navigation targets stay in refs. React state remains limited to values that affect rendered output: initialization, active indicator, copy count, and cursor state.

Pointer capture remains on the rail rather than the original child target so the interaction has one owner. The six-pixel threshold continues to distinguish a click from a drag. A completed drag suppresses the following click, preserving future post links.

## Accessibility

Keyboard navigation, focus treatment, ARIA region labels, control labels, and active indicator semantics remain unchanged. Touch keeps native horizontal scrolling and vertical page panning.

When `prefers-reduced-motion: reduce` is active, release snaps directly to the selected card without inertial animation. The gesture still tracks the pointer while held because that motion is direct feedback.

## Edge Cases

- Zero posts render no rail or controls.
- One post renders without looping controls.
- Resize cancels active settling, recalculates targets, and preserves the logical active post.
- Lost pointer capture, pointer cancellation, or a released mouse button ends the session safely.
- A new wheel, touch, pointer, keyboard, indicator, or arrow action cancels the current animation.
- Clone recentering must not produce a visible jump or corrupt velocity sampling.

## Testing

Extract pure target-selection math only if needed to test behavior without a browser. Tests cover slow nearest-card settling, positive and negative flicks, projection bounds, and edge targets. The project currently has no test runner, so adding tests requires the smallest suitable development dependency and script.

Run the focused tests, `npm run build`, and browser checks at desktop and mobile widths. Browser verification covers slow drag, fast flick in both directions, interruption, trackpad scrolling, buttons, indicators, keyboard, loop boundaries, click suppression, and reduced motion.

## Success Criteria

- Cards remain attached to the pointer during mouse drag.
- No card snap occurs while the pointer is held.
- Release carries momentum and settles smoothly on a card.
- Trackpad, wheel, touch, buttons, indicators, keyboard, and infinite looping keep working.
- Reduced-motion users receive immediate settling.
- The change introduces no visual redesign or unrelated worktree changes.

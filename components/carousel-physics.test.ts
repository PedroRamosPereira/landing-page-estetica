import assert from "node:assert/strict";
import test from "node:test";
import { selectInertialTarget } from "./carousel-physics";

const targets = [0, 280, 560, 840, 1120];

test("a slow release settles on the nearest card", () => {
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 430,
      velocity: 0,
      targets,
      maxProjection: 420,
    }),
    2,
  );
});

test("a forward flick projects toward a later card", () => {
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 300,
      velocity: 1.8,
      targets,
      maxProjection: 420,
    }),
    3,
  );
});

test("a backward flick projects toward an earlier card", () => {
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 820,
      velocity: -1.8,
      targets,
      maxProjection: 420,
    }),
    1,
  );
});

test("projection is capped so noisy velocity cannot skip the rail", () => {
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 280,
      velocity: 20,
      targets,
      maxProjection: 420,
    }),
    2,
  );
});

test("the selected target remains within the available physical cards", () => {
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 10,
      velocity: -10,
      targets,
      maxProjection: 420,
    }),
    0,
  );
  assert.equal(
    selectInertialTarget({
      currentScrollLeft: 1110,
      velocity: 10,
      targets,
      maxProjection: 420,
    }),
    4,
  );
});

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

test("count-up reaches the target only at the full duration", () => {
  assert.ok(countUpValue({ elapsed: 1199, duration: 1200, target: 4000 }) < 4000);
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

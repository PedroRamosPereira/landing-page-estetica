import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

describe("clinicPhotos", () => {
  it("defines ten local clinic image outputs", async () => {
    const module = await import("./photos").catch(() => null);
    assert.ok(module, "config/photos.ts must export clinicPhotos");

    const { clinicPhotos } = module;
    const sources = [
      clinicPhotos.hero.src,
      clinicPhotos.professional.src,
      clinicPhotos.comparison.before.src,
      clinicPhotos.comparison.after.src,
      ...clinicPhotos.posts.map((photo) => photo.src),
    ];

    assert.equal(sources.length, 10);
    assert.equal(new Set(sources).size, 10);
    for (const source of sources) {
      assert.match(source, /^\/images\/clinic\/[a-z-]+\.webp$/);
    }

    for (const source of sources) {
      assert.ok(existsSync(join(process.cwd(), "public", source)), `${source} must exist`);
    }
  });
});

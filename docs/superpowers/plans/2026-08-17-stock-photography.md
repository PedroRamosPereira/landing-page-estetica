# Stock Photography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every rendered image placeholder with optimized local Pexels photography and build a pixel-aligned demonstrative before/after comparison.

**Architecture:** Store image paths, focal positions, alt text, and credit metadata in `config/photos.ts`. Render those local files through Next.js 16 `Image`, using `fill`, accurate `sizes`, and `preload` only for the hero. Generate both comparison layers from one normalized 1600 x 1100 source crop so the slider changes only visibility, never geometry.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript 7, Tailwind CSS 4, Node test runner through `tsx`, Pexels API, ImageMagick.

**Repository note:** Do not create commits unless the user explicitly requests them. Existing unrelated untracked files must remain untouched.

---

## File Map

- Create `config/photos.ts`: one typed catalog for paths, focal positions, alt text, and Pexels credits.
- Create `config/photos.test.ts`: contract and local-file checks for all ten image outputs.
- Create `public/images/clinic/*.webp`: ten optimized local image files.
- Create `docs/image-credits.md`: human-readable Pexels source and author record.
- Modify `components/Hero.tsx`: render and preload the 4:5 hero image.
- Modify `components/Sobre.tsx`: render the 3:4 professional portrait.
- Modify `components/Resultados.tsx`: render two aligned 16:11 layers and disclose the simulation.
- Modify `components/Bastidores.tsx`: render six square post images without changing carousel physics.
- Modify `README.md`: replace the missing-photo table with the local asset and credit locations.

### Task 1: Define the photo catalog with TDD

**Files:**
- Create: `config/photos.test.ts`
- Create: `config/photos.ts`

- [ ] **Step 1: Write the failing catalog contract test**

Create `config/photos.test.ts`:

```ts
import assert from "node:assert/strict";
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
  });
});
```

- [ ] **Step 2: Run the test and verify the expected red state**

Run: `npx tsx --test config/photos.test.ts`

Expected: FAIL at `config/photos.ts must export clinicPhotos` because the catalog does not exist.

- [ ] **Step 3: Add the minimal typed catalog**

Create `config/photos.ts`:

```ts
type Credit = {
  photographer: string;
  photographerUrl: string;
  sourceUrl: string;
  pexelsId: number;
};

type ClinicPhoto = {
  src: `/images/clinic/${string}.webp`;
  alt: string;
  objectPosition: string;
  credit: Credit;
};

const credit = (
  pexelsId: number,
  photographer: string,
  photographerUrl: string,
  sourceUrl: string,
): Credit => ({ pexelsId, photographer, photographerUrl, sourceUrl });

export const clinicPhotos = {
  hero: {
    src: "/images/clinic/hero.webp",
    alt: "Retrato editorial de mulher com a mão apoiada no rosto",
    objectPosition: "50% 42%",
    credit: credit(3762764, "Shiny Diamond", "https://www.pexels.com/@shiny-diamond", "https://www.pexels.com/photo/woman-with-flawless-skin-3762764/"),
  },
  professional: {
    src: "/images/clinic/professional.webp",
    alt: "Profissional de saúde em uma clínica de estética",
    objectPosition: "50% 38%",
    credit: credit(33756693, "Jessica Keli Alves", "https://www.pexels.com/@jessica-keli-alves-2148649709", "https://www.pexels.com/photo/female-doctor-holding-medical-instrument-in-clinic-33756693/"),
  },
  comparison: {
    alt: "Simulação visual de tratamento usando duas versões da mesma fotografia",
    objectPosition: "50% 50%",
    before: { src: "/images/clinic/result-before.webp", alt: "" },
    after: { src: "/images/clinic/result-after.webp", alt: "" },
    credit: credit(13295348, "Büşranur Aydın", "https://www.pexels.com/@busranur-aydin-3800407", "https://www.pexels.com/photo/woman-s-face-in-close-up-photography-13295348/"),
  },
  posts: [
    {
      src: "/images/clinic/instagram-treatment.webp",
      alt: "Mulher recebendo uma massagem facial em um espaço de estética",
      objectPosition: "50% 50%",
      credit: credit(8460603, "Ornella Delfino", "https://www.pexels.com/@ornella-delfino-58862914", "https://www.pexels.com/photo/young-woman-at-beauticians-8460603/"),
    },
    {
      src: "/images/clinic/instagram-clinic.webp",
      alt: "Prateleiras de produtos em um ambiente contemporâneo de beleza",
      objectPosition: "50% 50%",
      credit: credit(27781696, "Ela De Pure", "https://www.pexels.com/@ela-de-pure-1402904686", "https://www.pexels.com/photo/ela-de-pure-skin-store-27781696/"),
    },
    {
      src: "/images/clinic/instagram-patient.webp",
      alt: "Retrato editorial de mulher com cabelo afro e sardas",
      objectPosition: "50% 45%",
      credit: credit(5253959, "Antonius Ferret", "https://www.pexels.com/@antonius-ferret", "https://www.pexels.com/photo/portrait-of-a-young-natural-woman-with-afro-and-freckles-5253959/"),
    },
    {
      src: "/images/clinic/instagram-result.webp",
      alt: "Retrato em close de mulher sob luz natural",
      objectPosition: "50% 50%",
      credit: credit(16069404, "Ran Lu", "https://www.pexels.com/@ran-lu-499464116", "https://www.pexels.com/photo/a-woman-with-her-eyes-closed-16069404/"),
    },
    {
      src: "/images/clinic/instagram-team.webp",
      alt: "Três mulheres reunidas em um ambiente profissional",
      objectPosition: "50% 50%",
      credit: credit(8837170, "Yan Krukau", "https://www.pexels.com/@yankrukov", "https://www.pexels.com/photo/woman-wearing-eyeglasses-extending-her-hand-8837170/"),
    },
    {
      src: "/images/clinic/instagram-detail.webp",
      alt: "Produtos de skincare organizados sobre tecido claro",
      objectPosition: "50% 50%",
      credit: credit(28482020, "Yana Romanovich", "https://www.pexels.com/@yana-romanovich-506648879", "https://www.pexels.com/photo/elegant-skincare-product-arrangement-on-fabric-28482020/"),
    },
  ] satisfies readonly ClinicPhoto[],
} as const;
```

- [ ] **Step 4: Run the catalog test**

Run: `npx tsx --test config/photos.test.ts`

Expected: PASS with one passing test.

### Task 2: Download and optimize the ten local assets

**Files:**
- Modify: `config/photos.test.ts`
- Create: `public/images/clinic/hero.webp`
- Create: `public/images/clinic/professional.webp`
- Create: `public/images/clinic/result-before.webp`
- Create: `public/images/clinic/result-after.webp`
- Create: `public/images/clinic/instagram-treatment.webp`
- Create: `public/images/clinic/instagram-clinic.webp`
- Create: `public/images/clinic/instagram-patient.webp`
- Create: `public/images/clinic/instagram-result.webp`
- Create: `public/images/clinic/instagram-team.webp`
- Create: `public/images/clinic/instagram-detail.webp`

- [ ] **Step 1: Extend the test to require every local file**

Add these imports to `config/photos.test.ts`:

```ts
import { existsSync } from "node:fs";
import { join } from "node:path";
```

After the local-path assertion loop, add:

```ts
for (const source of sources) {
  assert.ok(existsSync(join(process.cwd(), "public", source)), `${source} must exist`);
}
```

- [ ] **Step 2: Run the test and verify it fails for the missing hero**

Run: `npx tsx --test config/photos.test.ts`

Expected: FAIL with `/images/clinic/hero.webp must exist`.

- [ ] **Step 3: Verify the destination parents and create working directories**

Run `ls -ld "/tmp/opencode" "."`, then create `/tmp/opencode/clinic-stock` and `public/images/clinic`.

- [ ] **Step 4: Download the nine approved Pexels originals**

Use `curl -sL --max-time 30 --fail` for these HTTPS sources and store them only under `/tmp/opencode/clinic-stock/`:

```text
https://images.pexels.com/photos/3762764/pexels-photo-3762764.jpeg
https://images.pexels.com/photos/33756693/pexels-photo-33756693.png
https://images.pexels.com/photos/13295348/pexels-photo-13295348.jpeg
https://images.pexels.com/photos/8460603/pexels-photo-8460603.jpeg
https://images.pexels.com/photos/27781696/pexels-photo-27781696.jpeg
https://images.pexels.com/photos/5253959/pexels-photo-5253959.jpeg
https://images.pexels.com/photos/16069404/pexels-photo-16069404.jpeg
https://images.pexels.com/photos/8837170/pexels-photo-8837170.jpeg
https://images.pexels.com/photos/28482020/pexels-photo-28482020.jpeg
```

Run `ls -lh /tmp/opencode/clinic-stock/` and reject any original above 10 MB.

- [ ] **Step 5: Generate the hero, portrait, and six square posts**

For each source, run ImageMagick with `-auto-orient`, a cover resize, centered extent, sRGB colorspace, and WebP quality 84:

```bash
magick SOURCE -auto-orient -resize 1200x1500^ -gravity center -extent 1200x1500 -colorspace sRGB -quality 84 public/images/clinic/hero.webp
magick SOURCE -auto-orient -resize 1200x1600^ -gravity center -extent 1200x1600 -colorspace sRGB -quality 84 public/images/clinic/professional.webp
magick SOURCE -auto-orient -resize 900x900^ -gravity center -extent 900x900 -colorspace sRGB -quality 84 public/images/clinic/instagram-NAME.webp
```

Use the source-to-output mapping from the file map. Adjust gravity only if browser inspection shows a face clipped; keep output dimensions fixed.

- [ ] **Step 6: Produce both comparison layers from one normalized crop**

Create the natural layer first:

```bash
magick /tmp/opencode/clinic-stock/result-source.jpeg -auto-orient -resize 1600x1100^ -gravity center -extent 1600x1100 -colorspace sRGB -quality 86 public/images/clinic/result-before.webp
```

Create the edited layer from `result-before.webp`, not from the original:

```bash
magick public/images/clinic/result-before.webp -bilateral-blur 0x1.5 -modulate 103,96,100 -brightness-contrast 2x1 -quality 86 public/images/clinic/result-after.webp
```

If this edit looks artificial, reduce bilateral blur to `0x1` and modulation to `102,98,100`. Never crop or resize the second layer independently.

- [ ] **Step 7: Verify dimensions and size**

Run:

```bash
magick identify -format '%f %wx%h %b\n' public/images/clinic/*.webp
```

Expected: one 1200 x 1500 file, one 1200 x 1600 file, two 1600 x 1100 files, and six 900 x 900 files. Every output must be below 10 MB.

- [ ] **Step 8: Run the asset test**

Run: `npx tsx --test config/photos.test.ts`

Expected: PASS.

### Task 3: Integrate the hero and professional portrait

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Sobre.tsx`

- [ ] **Step 1: Replace the hero placeholder with Next.js 16 Image**

In `components/Hero.tsx`, remove the `Placeholder` import and add:

```ts
import Image from "next/image";
import { clinicPhotos } from "@/config/photos";
```

Replace the placeholder node with:

```tsx
<div className="relative aspect-4/5 max-h-[560px] w-full overflow-hidden rounded-[3px] shadow-[0_30px_70px_-40px_rgba(33,28,25,.5)]">
  <Image
    src={clinicPhotos.hero.src}
    alt={clinicPhotos.hero.alt}
    fill
    preload
    sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1280px) 47vw, 604px"
    className="object-cover"
    style={{ objectPosition: clinicPhotos.hero.objectPosition }}
  />
</div>
```

Use `preload`, not deprecated `priority`, per `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`.

- [ ] **Step 2: Replace the professional placeholder**

In `components/Sobre.tsx`, remove the `Placeholder` import, import `Image` and `clinicPhotos`, then render:

```tsx
<div className="relative aspect-3/4 max-h-[560px] w-full overflow-hidden rounded-[3px]">
  <Image
    src={clinicPhotos.professional.src}
    alt={clinicPhotos.professional.alt}
    fill
    sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1280px) 47vw, 600px"
    className="object-cover"
    style={{ objectPosition: clinicPhotos.professional.objectPosition }}
  />
</div>
```

- [ ] **Step 3: Run tests and type/build validation**

Run: `npm test && npm run build`

Expected: all Node tests pass and Next completes a production build without deprecated image-property warnings.

### Task 4: Integrate the aligned comparison

**Files:**
- Modify: `components/Resultados.tsx`

- [ ] **Step 1: Replace placeholder imports and disclosure copy**

Remove the `Placeholder` import. Add:

```ts
import Image from "next/image";
import { clinicPhotos } from "@/config/photos";
```

Replace the existing paragraph with:

```tsx
<p className="mt-5 text-base leading-[1.75] font-light text-muted">
  Simulação visual criada a partir da mesma fotografia para demonstrar o comparador. Não
  representa resultado clínico.
</p>
```

- [ ] **Step 2: Render fixed, coincident image layers**

Replace both placeholder layers with:

```tsx
<div className="absolute inset-0" role="img" aria-label={clinicPhotos.comparison.alt}>
  <Image
    src={clinicPhotos.comparison.after.src}
    alt={clinicPhotos.comparison.after.alt}
    fill
    draggable={false}
    sizes="(max-width: 1080px) calc(100vw - 36px), 1080px"
    className="pointer-events-none object-cover"
    style={{ objectPosition: clinicPhotos.comparison.objectPosition }}
  />
</div>
<div
  className="absolute inset-0"
  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
  aria-hidden="true"
>
  <Image
    src={clinicPhotos.comparison.before.src}
    alt={clinicPhotos.comparison.before.alt}
    fill
    draggable={false}
    sizes="(max-width: 1080px) calc(100vw - 36px), 1080px"
    className="pointer-events-none object-cover"
    style={{ objectPosition: clinicPhotos.comparison.objectPosition }}
  />
</div>
```

Keep the slider line, button, pointer handlers, touch behavior, and keyboard increments unchanged.

- [ ] **Step 3: Run tests and build**

Run: `npm test && npm run build`

Expected: PASS. The build must not report an invalid `Image` prop or missing local source.

### Task 5: Integrate the Instagram carousel images

**Files:**
- Modify: `components/Bastidores.tsx`

- [ ] **Step 1: Update imports and the post model**

Remove the `Placeholder` import. Add:

```ts
import Image from "next/image";
import { clinicPhotos } from "@/config/photos";
```

Change `Post` to:

```ts
type Post = {
  image: (typeof clinicPhotos.posts)[number];
  likes: string;
  cap: string;
  url?: string;
};
```

Replace the six `ph` values with the matching catalog entry:

```ts
const posts: Post[] = [
  { image: clinicPhotos.posts[0], likes: "128", cap: "Antes da sessão", url: undefined },
  { image: clinicPhotos.posts[1], likes: "214", cap: "Consultório", url: undefined },
  { image: clinicPhotos.posts[2], likes: "341", cap: "Depoimento", url: undefined },
  { image: clinicPhotos.posts[3], likes: "502", cap: "Resultado", url: undefined },
  { image: clinicPhotos.posts[4], likes: "176", cap: "Equipe", url: undefined },
  { image: clinicPhotos.posts[5], likes: "193", cap: "Bastidor", url: undefined },
];
```

- [ ] **Step 2: Render each square image**

Replace the square `Placeholder` in `PostContent` with:

```tsx
<div className="relative aspect-square w-full overflow-hidden">
  <Image
    src={post.image.src}
    alt={post.image.alt}
    fill
    draggable={false}
    sizes="(max-width: 768px) 74vw, 260px"
    className="pointer-events-none object-cover"
    style={{ objectPosition: post.image.objectPosition }}
  />
</div>
```

Do not modify scroll measurement, clone count, drag inertia, controls, or captions.

- [ ] **Step 3: Run the complete automated suite**

Run: `npm test && npm run build`

Expected: all tests and build pass.

### Task 6: Record credits and verify the rendered page

**Files:**
- Create: `docs/image-credits.md`
- Modify: `README.md`

- [ ] **Step 1: Create the source record**

Create `docs/image-credits.md` with a table containing placement, Pexels ID, photographer linked to their profile, source photo link, and local output path for all nine originals. The comparison row must list both derivative outputs and state: `Duas derivações demonstrativas do mesmo recorte; não representa resultado clínico.`

- [ ] **Step 2: Update README asset guidance**

Replace the `Fotos que faltam` section with `Fotografias de demonstração`. State that assets live in `public/images/clinic/`, metadata lives in `config/photos.ts`, credits live in `docs/image-credits.md`, and all photos must be replaced before adapting the demo to a real client.

- [ ] **Step 3: Run final static verification**

Run:

```bash
npm test
npm run build
magick identify -format '%f %wx%h %b\n' public/images/clinic/*.webp
git diff --check
```

Expected: tests pass, build passes, dimensions match the specification, all outputs stay below 10 MB, and `git diff --check` prints nothing.

- [ ] **Step 4: Verify desktop in a real browser**

Start `npm run dev`, open the home page at 1440 x 900, and confirm:

- hero image appears with no layout shift and the badge remains legible;
- professional portrait keeps the face inside the 3:4 crop;
- all six carousel posts render and dragging remains inertial;
- the comparison disclosure is visible;
- at 0%, 50%, and 100%, eyes and facial contours remain fixed while only treatment appearance changes.

- [ ] **Step 5: Verify mobile and accessibility**

At 375 x 812, confirm all crops remain intentional, vertical touch scrolling works over the comparison, horizontal carousel drag still works, and no content overflows. Focus the comparison handle, press left and right arrows, and confirm `aria-valuenow` changes by 4. Emulate `prefers-reduced-motion: reduce` and verify that every image and interaction remains available.

- [ ] **Step 6: Inspect the final diff**

Run `git status --short` and `git diff --` for the intended text files. Confirm no API key, temporary original, `.superpowers/` artifact, or unrelated user file appears in the diff.

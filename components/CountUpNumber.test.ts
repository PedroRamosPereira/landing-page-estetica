import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CountUpNumber } from "./CountUpNumber";

test("renders the final metric for SSR and hides intermediate updates from assistive technology", () => {
  const html = renderToStaticMarkup(
    createElement(CountUpNumber, { target: 4000, duration: 1200 }),
  );

  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /class="sr-only">\+4\.000<\/span>/);
  assert.match(
    html,
    /<span aria-hidden="true"[^>]*>\+4\.000<\/span>/,
  );
});

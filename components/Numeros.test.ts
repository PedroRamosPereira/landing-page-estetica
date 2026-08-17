import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { clinica } from "@/config/clinica";
import { Numeros } from "./Numeros";

test("uses only the count-up target as the procedures value", () => {
  const procedures = clinica.numeros.find(
    (metric) => metric.rotulo === "procedimentos",
  );

  assert.ok(procedures);
  assert.equal("valor" in procedures, false);
});

test("renders the procedures metric with an accessible animated value", () => {
  const html = renderToStaticMarkup(createElement(Numeros));
  const proceduresBlock = html.match(
    /<div><p[^>]*>.*?<\/p><p[^>]*>procedimentos<\/p><\/div>/,
  )?.[0];

  assert.equal(html.match(/aria-hidden="true"/g)?.length, 1);
  assert.ok(proceduresBlock);
  assert.match(
    proceduresBlock,
    /<p[^>]*><span aria-hidden="true"[^>]*>\+4\.000<\/span><span class="sr-only">\+4\.000<\/span><\/p><p[^>]*>procedimentos<\/p>/,
  );
  assert.match(proceduresBlock, /class="sr-only">\+4\.000<\/span>/);
});

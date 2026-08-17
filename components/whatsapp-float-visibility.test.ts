import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isWhatsappFloatVisible } from "./whatsapp-float-visibility";

describe("isWhatsappFloatVisible", () => {
  it("mantém o CTA oculto até 560px", () => {
    assert.equal(isWhatsappFloatVisible(0), false);
    assert.equal(isWhatsappFloatVisible(560), false);
  });

  it("exibe o CTA depois de 560px", () => {
    assert.equal(isWhatsappFloatVisible(561), true);
  });
});

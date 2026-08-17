import { clinica } from "@/config/clinica";
import { CountUpNumber } from "@/components/CountUpNumber";
import { Reveal } from "@/components/Reveal";

/**
 * Faixa de números logo abaixo do hero. Fica fora do hero de propósito: o
 * hero carrega uma mensagem e um CTA, a prova social vem em seguida.
 */
export function Numeros() {
  return (
    <section className="border-y border-line-mid bg-cream px-[clamp(18px,5vw,48px)] py-[clamp(28px,3.4vw,44px)]">
      <Reveal className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-x-[clamp(28px,6vw,88px)] gap-y-6">
        {clinica.numeros.map((n) => (
          <div key={n.rotulo}>
            <p className="font-serif text-[32px] leading-none font-normal">
              {"contagemAte" in n ? (
                <CountUpNumber target={n.contagemAte} duration={1200} />
              ) : (
                n.valor
              )}
            </p>
            <p className="mt-[6px] text-[12px] tracking-[0.14em] text-faint uppercase">{n.rotulo}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

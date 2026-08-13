import { clinica, waLink } from "@/config/clinica";
import { Reveal } from "@/components/Reveal";

/**
 * Único bloco escuro da página. É um corte de cor deliberado para marcar o
 * momento de conversão, não uma alternância de tema.
 */
export function Agendar() {
  return (
    <section
      id="agendar"
      className="bg-ink px-[clamp(18px,5vw,48px)] py-[clamp(64px,9vw,132px)] text-cream"
    >
      <Reveal className="mx-auto w-full max-w-[820px] text-center">
        <p className="mb-[18px] text-[12px] tracking-[0.28em] text-gold-light uppercase">
          Agende sua avaliação
        </p>
        <h2 className="font-serif text-[clamp(34px,5.2vw,62px)] leading-[1.1] font-light">
          O primeiro passo é uma conversa
        </h2>
        <p className="mx-auto mt-[22px] max-w-[56ch] text-base leading-[1.8] font-light text-dark-muted">
          Na avaliação analisamos proporções faciais, histórico e expectativas para desenhar um
          plano realista, sem compromisso de realizar procedimentos no mesmo dia.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-light px-[38px] py-[18px] text-[13px] tracking-[0.12em] whitespace-nowrap text-ink uppercase transition-colors duration-300 hover:bg-cream active:translate-y-px"
          >
            Falar no WhatsApp
          </a>
          <a
            href={clinica.endereco.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/30 px-[38px] py-[18px] text-[13px] tracking-[0.12em] whitespace-nowrap text-cream uppercase transition-colors duration-300 hover:border-gold-light hover:text-gold-light active:translate-y-px"
          >
            Ver localização
          </a>
        </div>
      </Reveal>
    </section>
  );
}

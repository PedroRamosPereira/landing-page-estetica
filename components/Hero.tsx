import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="topo"
      className="bg-linear-to-b from-cream to-cream-deep px-[clamp(18px,5vw,48px)] pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,7vw,96px)]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1.05fr_1fr]">
        <Reveal immediate>
          <p className="eyebrow mb-5">Harmonização facial e estética avançada</p>
          <h1 className="font-serif text-[clamp(36px,4.2vw,56px)] leading-[1.08] font-light tracking-[-0.01em]">
            Sua beleza natural, revelada com precisão médica.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(15px,1.5vw,18px)] leading-[1.75] font-light text-muted">
            Protocolos individualizados de harmonização e rejuvenescimento, conduzidos com técnica,
            segurança e um olhar estético que respeita a sua identidade.
          </p>
          <div className="mt-9 flex flex-wrap gap-[14px]">
            <a
              href="#agendar"
              className="rounded-full bg-gold-dark px-[34px] py-[17px] text-[13px] tracking-[0.12em] text-white uppercase transition-colors duration-300 hover:bg-gold-deep active:translate-y-px"
            >
              Agendar avaliação
            </a>
            <a
              href="#procedimentos"
              className="rounded-full border border-line-strong px-[34px] py-[17px] text-[13px] tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:border-gold hover:text-gold-deep active:translate-y-px"
            >
              Ver procedimentos
            </a>
          </div>
        </Reveal>

        <Reveal immediate delay={0.12} className="relative">
          <Placeholder
            label="imagem principal"
            className="aspect-4/5 max-h-[560px] w-full rounded-[3px] shadow-[0_30px_70px_-40px_rgba(33,28,25,.5)]"
          />
          <div className="absolute bottom-5 left-5 max-w-[min(224px,64%)] rounded-[3px] border border-line bg-cream px-5 py-4 shadow-[0_18px_40px_-28px_rgba(33,28,25,.6)] md:-left-6">
            <p className="font-serif text-xl leading-[1.3] font-normal">Avaliação facial completa</p>
            <p className="mt-[6px] text-[12px] tracking-[0.1em] text-gold-deep uppercase">
              Sem compromisso
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

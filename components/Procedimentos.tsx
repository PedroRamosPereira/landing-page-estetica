import { Atom, Drop, DropHalf, FlowArrow, Sparkle, Waves } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";

const procedimentos = [
  {
    icon: Sparkle,
    titulo: "Toxina Botulínica",
    texto: "Suavização de linhas de expressão preservando a naturalidade dos movimentos.",
  },
  {
    icon: Drop,
    titulo: "Preenchimentos",
    texto: "Ácido hialurônico para contorno, volume e projeção em pontos estratégicos da face.",
  },
  {
    icon: Atom,
    titulo: "Bioestimuladores",
    texto: "Estímulo de colágeno para firmeza e qualidade de pele com resultado progressivo.",
  },
  {
    icon: DropHalf,
    titulo: "Skinbooster",
    texto: "Hidratação profunda e viço para peles desidratadas ou com sinais iniciais de idade.",
  },
  {
    icon: FlowArrow,
    titulo: "Fios de sustentação",
    texto: "Reposicionamento suave dos tecidos para redefinir o contorno facial.",
  },
  {
    icon: Waves,
    titulo: "Protocolos de pele",
    texto: "Peelings, lasers e microagulhamento para textura, manchas e cicatrizes.",
  },
];

export function Procedimentos() {
  return (
    <section id="procedimentos" className="px-[clamp(18px,5vw,48px)] py-[clamp(64px,9vw,132px)]">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            Tratamentos desenhados para o seu rosto
          </h2>
          <p className="mt-5 text-base leading-[1.75] font-light text-muted">
            Cada protocolo é definido após avaliação presencial, considerando anatomia, expressão e
            objetivos estéticos.
          </p>
        </Reveal>

        <div className="mt-[clamp(36px,5vw,64px)] grid gap-[clamp(16px,2vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
          {procedimentos.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.titulo} delay={i * 0.05}>
                <article className="h-full rounded-[3px] border border-line-soft bg-white p-[clamp(24px,3vw,36px)] transition duration-400 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_28px_50px_-36px_rgba(33,28,25,.45)]">
                  <div className="grid size-12 place-items-center rounded-full bg-blush">
                    <Icon size={20} weight="light" className="text-rose" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-serif text-[26px] font-medium">{p.titulo}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] font-light text-muted">{p.texto}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

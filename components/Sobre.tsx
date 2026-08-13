import { Check } from "@phosphor-icons/react/dist/ssr";
import { clinica } from "@/config/clinica";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";

const pilares = [
  "Avaliação individualizada com plano de tratamento por etapas",
  "Produtos registrados e protocolos com respaldo científico",
  "Acompanhamento de retorno incluído em todos os procedimentos",
];

export function Sobre() {
  return (
    <section
      id="sobre"
      className="bg-cream-alt px-[clamp(18px,5vw,48px)] py-[clamp(64px,9vw,132px)]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-[clamp(32px,5vw,80px)] md:grid-cols-2">
        <Reveal>
          <Placeholder
            label="foto perfil"
            className="aspect-3/4 max-h-[560px] w-full rounded-[3px]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">Sobre a clínica</p>
          <h2 className="font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            Técnica apurada, olhar estético e escuta atenta
          </h2>
          <p className="mt-6 text-base leading-[1.8] font-light text-muted-deep">
            Espaço para a biografia da profissional: formação, especializações, filosofia de
            trabalho e a forma como cada atendimento é conduzido. Este texto vem do briefing do
            cliente.
          </p>

          <ul className="mt-7 grid gap-[14px]">
            {pilares.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] font-light text-muted-deep">
                <Check size={16} weight="light" className="mt-1 shrink-0 text-gold" aria-hidden />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[12px] tracking-[0.16em] text-faint uppercase">
            {clinica.responsavelTecnica} · {clinica.registroProfissional}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

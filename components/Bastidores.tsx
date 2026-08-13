import { ChatCircle, Heart } from "@phosphor-icons/react/dist/ssr";
import { clinica } from "@/config/clinica";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";

// Conteúdo de demonstração. Substituir por posts reais ou por um feed.
const posts = [
  { ph: "limpeza de pele", likes: "128", cap: "Antes da sessão" },
  { ph: "ambiente da clínica", likes: "214", cap: "Consultório" },
  { ph: "retrato paciente", likes: "341", cap: "Depoimento" },
  { ph: "antes e depois", likes: "502", cap: "Resultado" },
  { ph: "equipe da clínica", likes: "176", cap: "Equipe" },
  { ph: "detalhe do atendimento", likes: "193", cap: "Bastidor" },
];

export function Bastidores() {
  return (
    <section className="overflow-hidden bg-cream-alt py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(18px,5vw,48px)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="max-w-[560px] font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            O dia a dia da clínica no Instagram
          </h2>
          <a
            href={clinica.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-line-strong pb-[6px] text-[13px] tracking-[0.12em] text-gold-deep uppercase transition-colors duration-300 hover:border-gold hover:text-ink"
          >
            {clinica.instagram.handle}
          </a>
        </Reveal>
      </div>

      <div className="no-scrollbar mx-auto mt-[clamp(28px,4vw,48px)] flex w-full max-w-[1280px] snap-x snap-mandatory gap-[clamp(14px,2vw,26px)] overflow-x-auto px-[clamp(18px,5vw,48px)] pt-[14px] pb-[22px]">
        {posts.map((p) => (
          <figure
            key={p.ph}
            className="m-0 w-[min(74vw,260px)] shrink-0 snap-start overflow-hidden rounded-[3px] border border-line bg-white shadow-[0_14px_30px_-24px_rgba(33,28,25,.5)] transition duration-400 hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(33,28,25,.5)]"
          >
            <div className="flex items-center gap-[10px] px-[14px] py-3">
              <span className="size-[30px] shrink-0 rounded-full border border-line-soft bg-radial-[at_30%_30%] from-blush-deep to-gold-light" />
              <span className="truncate text-[12px] tracking-[0.08em] text-ink">
                {clinica.instagram.handle.replace("@", "")}
              </span>
            </div>

            <Placeholder label={p.ph} className="aspect-square w-full" />

            <figcaption className="grid gap-[6px] px-[14px] pt-3 pb-4">
              <div className="flex items-center gap-3 text-ink">
                <Heart size={15} weight="light" aria-hidden />
                <ChatCircle size={15} weight="light" aria-hidden />
                <span className="ml-auto text-[11px] tracking-[0.14em] text-faint uppercase">
                  {p.likes} curtidas
                </span>
              </div>
              <span className="truncate text-[13px] font-light text-muted-deep">{p.cap}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

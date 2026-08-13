import { clinica, waLink } from "@/config/clinica";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-cream px-[clamp(18px,5vw,48px)] pt-[clamp(48px,6vw,80px)] pb-[104px]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-[clamp(28px,4vw,56px)] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-[34ch] text-sm leading-[1.8] font-light text-muted">
            {clinica.descricaoCurta}
          </p>
        </div>

        <div>
          <p className="mb-[14px] text-[12px] tracking-[0.18em] text-gold-deep uppercase">Endereço</p>
          <address className="text-sm leading-[1.9] font-light text-muted not-italic">
            {clinica.endereco.linhas.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>

        <div>
          <p className="mb-[14px] text-[12px] tracking-[0.18em] text-gold-deep uppercase">Atendimento</p>
          <p className="text-sm leading-[1.9] font-light text-muted">
            {clinica.atendimento.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>

        <div>
          <p className="mb-[14px] text-[12px] tracking-[0.18em] text-gold-deep uppercase">Contato</p>
          <div className="grid gap-2 text-sm font-light">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-deep transition-colors duration-300 hover:text-ink"
            >
              WhatsApp
            </a>
            <a
              href={clinica.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-deep transition-colors duration-300 hover:text-ink"
            >
              Instagram
            </a>
            <a
              href={`mailto:${clinica.email}`}
              className="text-gold-deep transition-colors duration-300 hover:text-ink"
            >
              E-mail
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(36px,5vw,60px)] flex w-full max-w-[1280px] flex-wrap justify-between gap-3 border-t border-line-mid pt-6 text-[12px] tracking-[0.08em] text-faint">
        <span>
          {clinica.nome} · Responsável técnica {clinica.responsavelTecnica}
        </span>
        <span>Resultados variam de acordo com cada paciente</span>
      </div>
    </footer>
  );
}

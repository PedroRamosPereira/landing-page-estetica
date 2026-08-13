import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { clinica, waLink } from "@/config/clinica";

/** Botão fixo de WhatsApp. Mesmo link do CTA final. */
export function WhatsappFloat() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-[clamp(16px,2.5vw,28px)] bottom-[clamp(16px,2.5vw,28px)] z-50 flex items-center gap-3 rounded-full bg-whats px-[18px] py-[15px] text-[13px] tracking-[0.1em] text-white uppercase shadow-[0_14px_34px_rgba(18,140,70,.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-whats-dark hover:shadow-[0_18px_40px_rgba(18,140,70,.4)]"
    >
      <WhatsappLogo size={24} weight="fill" aria-hidden />
      <span className="hidden nav:inline">{clinica.whatsappLabel}</span>
    </a>
  );
}

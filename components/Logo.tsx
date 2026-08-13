import { clinica } from "@/config/clinica";

/**
 * Wordmark da clínica. Serifa para a marca, sans em caixa alta para o
 * descritor. Trocar o texto em `config/clinica.ts`; se o cliente tiver um
 * símbolo próprio, substituir este componente inteiro por um `next/image`.
 */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-serif text-[26px] font-normal tracking-[0.01em] ${
          onDark ? "text-cream" : "text-ink"
        }`}
      >
        {clinica.logo.marca}
      </span>
      <span
        className={`mt-[6px] text-[9px] tracking-[0.34em] uppercase ${
          onDark ? "text-gold-light" : "text-gold-deep"
        }`}
      >
        {clinica.logo.descritor}
      </span>
    </span>
  );
}

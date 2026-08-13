import type { CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Escalona a entrada em grupos (cards, colunas). Em segundos. */
  delay?: number;
  /** Anima no load em vez de na entrada por scroll. Para acima da dobra. */
  immediate?: boolean;
};

/**
 * Entrada suave de seção. Comunica hierarquia de leitura: o conteúdo aparece
 * na ordem em que deve ser lido.
 *
 * Implementado só com CSS (`animation-timeline: view()`), sem biblioteca de
 * animação e sem JavaScript. Isso importa aqui: o estado inicial escondido
 * vive dentro de `@media (prefers-reduced-motion: no-preference)`, então
 * quem pede menos movimento, quem está em navegador sem suporte a
 * scroll-driven animations e qualquer crawler recebem o conteúdo já visível.
 * Com a versão anterior em Motion o HTML do servidor saía com `opacity: 0`.
 */
export function Reveal({ children, className = "", delay = 0, immediate = false }: RevealProps) {
  const style = delay
    ? ({
        "--reveal-delay": `${delay}s`,
        "--reveal-end": `${Math.round(26 + delay * 60)}%`,
      } as CSSProperties)
    : undefined;

  return (
    <div className={`${immediate ? "reveal-load" : "reveal"} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

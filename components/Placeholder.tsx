import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

type PlaceholderProps = {
  /**
   * O que deve entrar neste espaço quando houver foto real. Omitir quando
   * algo fora do bloco já identifica o slot (é o caso do comparador
   * antes/depois, onde uma legenda interna seria cortada pela divisória).
   */
  label?: string;
  tone?: "blush" | "stone";
  /**
   * Metade em que a legenda fica. Usado no comparador antes/depois, onde
   * cada camada é recortada ao meio e uma legenda centralizada sairia
   * cortada pela divisória.
   */
  half?: "left" | "right";
  className?: string;
};

const halves = {
  left: "w-1/2 justify-self-start",
  right: "w-1/2 justify-self-end",
} as const;

const tones = {
  blush: {
    fill: "linear-gradient(152deg, #fce7f3 0%, #f7d9e8 52%, #eddfe2 100%)",
    highlight: "radial-gradient(88% 62% at 20% 12%, rgba(255,255,255,.5) 0%, rgba(255,255,255,0) 58%)",
    text: "text-rose",
  },
  stone: {
    fill: "linear-gradient(152deg, #ece5dc 0%, #ddd4c9 55%, #d3c9bd 100%)",
    highlight: "radial-gradient(88% 62% at 20% 12%, rgba(255,255,255,.42) 0%, rgba(255,255,255,0) 58%)",
    text: "text-faint",
  },
} as const;

/**
 * Espaço reservado para foto real da clínica. Tratado como peça de design
 * (tom da marca + ícone fino + legenda) e não como bloco "em falta", para que
 * o layout continue legível enquanto os assets não chegam.
 *
 * Ao integrar: trocar por `next/image` mantendo o mesmo aspect-ratio.
 */
export function Placeholder({ label, tone = "blush", half, className = "" }: PlaceholderProps) {
  const t = tones[tone];

  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: t.fill }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: t.highlight }} />
      {label && (
        <div
          className={`relative flex flex-col items-center gap-3 px-6 text-center ${half ? halves[half] : ""}`}
        >
          <ImageSquare size={26} weight="thin" className={t.text} aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-deep uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { clinicPhotos } from "@/config/photos";
import { Reveal } from "@/components/Reveal";

/**
 * Comparador antes/depois. O arraste é feedback direto de uma ação do
 * usuário, por isso a posição é estado local e não animação decorativa.
 * Acessível por teclado: setas movem 4% e o handle expõe role="slider".
 */
export function Resultados() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    }
  };

  return (
    <section id="resultados" className="px-[clamp(18px,5vw,48px)] py-[clamp(64px,9vw,132px)]">
      <div className="mx-auto w-full max-w-[1080px]">
        <Reveal className="max-w-[620px]">
          <h2 className="font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            Arraste e veja a transformação
          </h2>
          <p className="mt-5 text-base leading-[1.75] font-light text-muted">
            Simulação visual criada a partir da mesma fotografia para demonstrar o comparador. Não
            representa resultado clínico.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={boxRef}
            onPointerDown={(e) => {
              setDragging(true);
              e.currentTarget.setPointerCapture?.(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            className="relative mt-[clamp(32px,4vw,56px)] aspect-16/11 max-h-[620px] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-[3px] shadow-[0_34px_70px_-50px_rgba(33,28,25,.6)] select-none"
          >
            {/* Slots de foto: camada "depois" cheia, camada "antes" recortada
                pela posição da divisória. As pílulas abaixo é que rotulam. */}
            <div className="absolute inset-0" role="img" aria-label={clinicPhotos.comparison.alt}>
              <Image
                src={clinicPhotos.comparison.after.src}
                alt={clinicPhotos.comparison.after.alt}
                fill
                draggable={false}
                sizes="(max-width: 1080px) calc(100vw - 36px), 1080px"
                className="pointer-events-none object-cover"
                style={{ objectPosition: clinicPhotos.comparison.objectPosition }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              aria-hidden="true"
            >
              <Image
                src={clinicPhotos.comparison.before.src}
                alt={clinicPhotos.comparison.before.alt}
                fill
                draggable={false}
                sizes="(max-width: 1080px) calc(100vw - 36px), 1080px"
                className="pointer-events-none object-cover"
                style={{ objectPosition: clinicPhotos.comparison.objectPosition }}
              />
            </div>

            <span className="absolute top-[18px] left-[18px] rounded-full bg-cream/90 px-[14px] py-[7px] text-[11px] tracking-[0.16em] text-ink uppercase">
              Antes
            </span>
            <span className="absolute top-[18px] right-[18px] rounded-full bg-ink/85 px-[14px] py-[7px] text-[11px] tracking-[0.16em] text-cream uppercase">
              Depois
            </span>

            <div
              className="absolute inset-y-0 w-[2px] -translate-x-px bg-cream shadow-[0_0_18px_rgba(0,0,0,.25)]"
              style={{ left: `${pos}%` }}
            />

            <button
              type="button"
              role="slider"
              aria-label="Comparar antes e depois"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% do antes visível`}
              onKeyDown={onKeyDown}
              className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-line bg-cream shadow-[0_10px_26px_-12px_rgba(33,28,25,.6)]"
              style={{ left: `${pos}%` }}
            >
              <span className="flex items-center text-gold">
                <CaretLeft size={13} weight="light" aria-hidden />
                <CaretRight size={13} weight="light" aria-hidden />
              </span>
            </button>
          </div>

          <p className="mt-[18px] text-center text-[13px] tracking-[0.1em] text-faint uppercase">
            Deslize a barra para comparar
          </p>
        </Reveal>
      </div>
    </section>
  );
}

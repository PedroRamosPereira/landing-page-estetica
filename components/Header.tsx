"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/Logo";

const links = [
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#resultados", label: "Resultados" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o painel mobile ao chegar no breakpoint desktop, para o menu não
  // ficar aberto por baixo da nav horizontal.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-[14px]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-[clamp(18px,5vw,48px)] py-[14px]">
        <a href="#topo" aria-label="Início" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-[clamp(14px,2.4vw,32px)] text-sm tracking-[0.06em] nav:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-muted transition-colors duration-300 hover:text-gold-deep"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#agendar"
          className="hidden shrink-0 rounded-full bg-ink px-[22px] py-3 text-[13px] tracking-[0.1em] whitespace-nowrap text-cream uppercase transition-colors duration-300 hover:bg-gold nav:inline-block"
        >
          Agendar avaliação
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-gold-light nav:hidden"
        >
          {menuOpen ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="menu-mobile"
          className="grid gap-[2px] border-t border-line px-[18px] pt-2 pb-5 text-base tracking-[0.04em] nav:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line-soft px-[2px] py-[14px] text-muted"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#agendar"
            onClick={() => setMenuOpen(false)}
            className="mt-[14px] rounded-full bg-ink px-[22px] py-4 text-center text-[13px] tracking-[0.1em] text-cream uppercase"
          >
            Agendar avaliação
          </a>
        </nav>
      )}
    </header>
  );
}

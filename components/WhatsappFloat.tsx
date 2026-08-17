"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/csr/WhatsappLogo";
import { clinica, waLink } from "@/config/clinica";
import { isWhatsappFloatVisible } from "@/components/whatsapp-float-visibility";

/** CTA global exibido somente depois que o usuário passa da dobra. */
export function WhatsappFloat() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      const nextVisible = isWhatsappFloatVisible(window.scrollY);

      if (nextVisible === visibleRef.current) return;

      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`whatsapp-float fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-[100] inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-whats px-[22px] text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_16px_34px_-14px_rgba(9,28,48,.6)] hover:bg-whats-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:opacity-90 sm:right-7 sm:bottom-[max(28px,env(safe-area-inset-bottom))] ${
        visible
          ? "pointer-events-auto opacity-100 [transform:translateY(0)_scale(1)]"
          : "pointer-events-none opacity-0 [transform:translateY(16px)_scale(.96)]"
      }`}
    >
      <WhatsappLogo size={20} weight="fill" aria-hidden />
      <span>{clinica.whatsappLabel}</span>
    </a>
  );
}

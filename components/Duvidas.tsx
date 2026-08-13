"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "O procedimento dói?",
    a: "Utilizamos anestésicos tópicos e técnicas de aplicação que tornam o desconforto mínimo. A maioria das pacientes descreve apenas uma leve sensação de pressão.",
  },
  {
    q: "Quanto tempo dura o resultado?",
    a: "Depende do produto e do metabolismo individual. Toxina botulínica costuma durar de quatro a seis meses; preenchimentos e bioestimuladores têm duração mais longa, avaliada em cada retorno.",
  },
  {
    q: "Vou ficar com aparência artificial?",
    a: "Não. O planejamento parte das suas proporções naturais, com aplicação gradual e reavaliação antes de qualquer complemento.",
  },
  {
    q: "Preciso de afastamento das atividades?",
    a: "Na maior parte dos casos é possível retomar a rotina no mesmo dia, seguindo orientações simples de pós-procedimento.",
  },
  {
    q: "Como funciona a primeira consulta?",
    a: "É uma avaliação facial completa, com análise de proporções, histórico de saúde e definição de um plano por etapas, sem obrigação de realizar o procedimento no mesmo dia.",
  },
];

export function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="duvidas" className="px-[clamp(18px,5vw,48px)] py-[clamp(64px,9vw,132px)]">
      <div className="mx-auto w-full max-w-[960px]">
        <Reveal>
          <h2 className="mb-[clamp(28px,4vw,48px)] font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            Dúvidas antes de agendar
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-line-mid">
            {faqs.map((item, i) => {
              const aberto = aberta === i;
              return (
                <div key={item.q} className="border-b border-line-mid">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(aberto ? null : i)}
                      aria-expanded={aberto}
                      aria-controls={`faq-${i}`}
                      className="flex w-full cursor-pointer items-center justify-between gap-5 py-[clamp(20px,2.6vw,28px)] text-left font-serif text-[clamp(19px,2.2vw,25px)] text-ink transition-colors duration-300 hover:text-gold-deep"
                    >
                      <span>{item.q}</span>
                      <span className="relative block size-[26px] shrink-0" aria-hidden>
                        <span className="absolute top-1/2 left-1 h-px w-[18px] bg-gold" />
                        <span
                          className={`absolute top-1/2 left-1 h-px w-[18px] bg-gold transition-transform duration-300 ${
                            aberto ? "rotate-0" : "rotate-90"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  {aberto && (
                    <p
                      id={`faq-${i}`}
                      className="max-w-[70ch] pb-[clamp(22px,2.6vw,30px)] text-[15px] leading-[1.8] font-light text-muted"
                    >
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

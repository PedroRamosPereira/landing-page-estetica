# Experimento de contagem crescente

## Objetivo

Testar uma contagem crescente somente na métrica `+4.000 procedimentos` da
faixa `Numeros`. O experimento não altera as outras métricas e não representa
uma recomendação permanente da auditoria de movimento.

## Arquitetura

`Numeros` continua sendo Server Component e delega apenas o valor animado a um
Client Component pequeno. O HTML inicial contém `+4.000`, preservando o dado
correto para SEO, crawlers, navegação sem JavaScript e falhas das APIs do
navegador.

O componente observa sua entrada no viewport com `IntersectionObserver`. No
primeiro cruzamento, inicia a contagem e deixa de observar o elemento. A
progressão usa `requestAnimationFrame`; frames pendentes são cancelados ao
desmontar.

## Movimento

A contagem parte visualmente de `+0`, termina exatamente em `+4.000` e dura
1.200 ms. A interpolação usa a desaceleração cúbica já presente no carrossel:
`1 - (1 - progresso)^3`.

O experimento roda uma única vez. Com `prefers-reduced-motion: reduce`, o valor
permanece estático em `+4.000`. Se `IntersectionObserver` não estiver
disponível, o fallback também é o valor final estático.

## Acessibilidade

As atualizações intermediárias não são anunciadas. O número visual animado é
ocultado de tecnologias assistivas, enquanto uma cópia somente para leitores
de tela expõe `+4.000`. Não será usado `aria-live`.

## Testes

A lógica pura será implementada por TDD e cobrirá:

- valor inicial zero;
- progressão monotônica dentro do intervalo;
- desaceleração cúbica;
- limite exato no valor final;
- formatação pt-BR como `+4.000`.

A integração será verificada com `npm test`, `npm run build` e inspeção no
navegador em desktop e mobile. A inspeção confirmará disparo único, ausência de
salto de layout, valor final correto e comportamento com movimento reduzido.

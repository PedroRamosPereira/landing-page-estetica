# Landing page - Clínica de estética (whitelabel)

Landing page de clínica de estética / harmonização facial, construída a partir
do protótipo de alta fidelidade gerado no Claude Design
(`design_handoff_landing_clinica/`).

É um **site de exemplo do portfólio**: nome da clínica, fotos, endereço,
números e registro profissional são dados de demonstração. Todo o conteúdo
trocável vive em `config/clinica.ts`.

## Stack

- Next.js 16 (App Router, componentes de servidor por padrão)
- TypeScript
- Tailwind CSS v4 (tokens em `app/globals.css`)
- `@phosphor-icons/react` para ícones
- Fontes via `next/font`: Cormorant Garamond (títulos) e Jost (texto)

Sem biblioteca de animação: a entrada das seções é CSS puro
(`animation-timeline: view()`). Ver "Motion" abaixo.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Adaptar para outra clínica

Editar apenas `config/clinica.ts`: nome, wordmark, telefone e mensagem do
WhatsApp, Instagram, e-mail, endereço, horários, responsável técnica,
registro profissional e os três números exibidos abaixo do hero.

O link do WhatsApp (`waLink`) é montado a partir desse arquivo e alimenta o
CTA final, o botão flutuante e o link do rodapé.

Textos de seção (procedimentos, FAQ, posts) ficam nos respectivos componentes
em `components/`.

## Fotos que faltam

A página usa blocos `<Placeholder>` no lugar das fotos. Ao integrar, trocar
cada um por `next/image` mantendo o mesmo `aspect-ratio`:

| Onde | Componente | Proporção |
| --- | --- | --- |
| Hero, imagem principal | `Hero.tsx` | 4:5 |
| Sobre, foto da profissional | `Sobre.tsx` | 3:4 |
| Resultados, foto "antes" | `Resultados.tsx` | preenche o box 16:11 |
| Resultados, foto "depois" | `Resultados.tsx` | preenche o box 16:11 |
| Bastidores, 6 posts | `Bastidores.tsx` | 1:1 |

## Decisões que se afastam do protótipo

O protótipo foi seguido em estrutura, tipografia, espaçamento e interações.
Estes pontos mudaram, com o motivo:

- **Contraste.** O dourado `#a9865b` do design dá 3.2:1 sobre o creme e falha
  WCAG AA como texto. A página mantém o accent, mas com papéis fixos por
  contraste: `#a9865b` só em traço e ícone, `#8d6d47` como fundo de botão com
  texto branco, `#7d6440` em texto pequeno, `#c0a077` sobre a seção escura.
  Mesmo motivo para escurecer o texto terciário e o verde do WhatsApp.
- **Números fora do hero.** O hero carrega uma mensagem e um CTA; os três
  números viraram uma faixa logo abaixo, para o hero caber na primeira tela.
- **Menos eyebrows.** O protótipo repetia o label em caixa alta acima de quase
  toda seção. Restaram três (hero, sobre, agendar); nos demais o próprio
  título resolve.
- **Ícones de biblioteca.** Os ícones geométricos feitos com `div` viraram
  Phosphor em peso fino, mais legíveis no mesmo espírito de traço.
- **Wordmark real** no lugar do bloco rosa de "logo".
- **Um só raio de canto** por papel: pill em interativo, 3px em superfície.
  Os cards do Instagram, que tinham 22px, seguem os 3px do resto.

## Motion

`components/Reveal.tsx` faz a entrada das seções só com CSS. O estado inicial
escondido vive dentro de `@media (prefers-reduced-motion: no-preference)`, e a
animação por scroll dentro de `@supports (animation-timeline: view())`. O
padrão do documento é conteúdo visível: quem pede menos movimento, quem usa
navegador sem suporte e qualquer crawler recebem a página completa.

## Tema

Página em tema claro fixo (`color-scheme: light`), que é a identidade da
marca. A seção de agendamento em fundo escuro é um corte de cor deliberado,
não uma alternância de tema.

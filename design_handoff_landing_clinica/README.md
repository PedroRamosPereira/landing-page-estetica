# Handoff: Landing Page — Clínica de Estética (Whitelabel)

## Sobre os arquivos
O arquivo `Clinica Estetica Landing.dc.html` é uma **referência de design em HTML** (protótipo de alta fidelidade), não código de produção para copiar literalmente. A tarefa é **recriar este design** no ambiente/stack do seu projeto (React, Vue, HTML/CSS puro, etc.), usando os padrões já estabelecidos no seu código — ou, se não houver stack ainda, escolher a mais adequada (ex.: Next.js + Tailwind é uma boa opção padrão para uma landing page whitelabel).

Fidelidade: **alta (hifi)** — cores, tipografia, espaçamentos e interações finais definidos. Recrie pixel a pixel.

---

## PROMPT PRONTO PARA O CLAUDE CODE

Copie o bloco abaixo e cole no Claude Code dentro do seu repositório:

```
Preciso que você implemente uma landing page de clínica de estética a partir de um protótipo HTML de referência (anexo: Clinica Estetica Landing.dc.html). É um design whitelabel (nome da clínica, endereço, fotos e CRM são placeholders a substituir depois).

Stack: [SUBSTITUA — ex: Next.js 14 + TypeScript + Tailwind CSS] (se o projeto ainda não tiver stack definida, use Next.js + Tailwind).

Requisitos:
1. Recrie fielmente a estrutura, cores, tipografia e espaçamentos do arquivo de referência (ver seção "Design Tokens" no README).
2. Fontes: Google Fonts "Cormorant Garamond" (títulos, serif, peso 300/400/500) e "Jost" (corpo, sans-serif, peso 300/400/500).
3. Header sticky com blur, nav desktop e menu hambúrguer mobile (breakpoint 900px) com painel dropdown.
4. Hero com imagem de destaque, badge flutuante "Avaliação facial completa" e 3 estatísticas (+12 anos, +4.000 procedimentos, 5.0 avaliação).
5. Grid de 6 cards de procedimentos (ícones simples geométricos, não SVGs complexos).
6. Seção "Sobre" com foto + bio + lista de 3 bullets + registro profissional.
7. Comparador "antes/depois" interativo por arraste (pointer events, teclado com setas esquerda/direita, clip-path), responsivo e acessível.
8. Carrossel horizontal de posts do Instagram (scroll-snap, número de cards adaptado à largura da tela).
9. FAQ em acordeão (uma pergunta aberta por vez, ícone + que rotaciona para x).
10. CTA final em fundo escuro (#211c19) com botão para WhatsApp (link wa.me com número e mensagem pré-preenchida configuráveis) e botão secundário "Ver localização".
11. Footer com logo, endereço, horário de atendimento e contatos.
12. Botão flutuante fixo de WhatsApp (canto inferior direito), com o mesmo link wa.me do CTA — ver whatsapp-float-button.html anexo para essa peça isolada.
13. Todas as imagens devem ser placeholders visuais claros (ex.: bloco listrado com texto indicando o que deve entrar ali: "imagem principal", "foto perfil", "foto antes/depois", "post do Instagram") — troque por assets reais depois.
14. Configurável: telefone do WhatsApp, mensagem padrão e rótulo do botão devem ser variáveis/props fáceis de trocar (é whitelabel — outras clínicas vão reusar).
15. Responsivo mobile-first, sem quebras de layout entre 320px e 1920px.
16. Sem dependências externas de JS além de ícones se necessário (o protótipo não usa nenhuma lib de ícones — use divs/CSS ou SVGs simples).

Use os tokens de design e o mapeamento de seções no README.md anexo como fonte de verdade para cores, fontes, medidas e cópia (texto).
```

---

## Design Tokens

**Cores**
- Fundo base: `#faf8f6`
- Fundo alternado (seções pares): `#f3ede7`
- Texto principal: `#211c19`
- Texto secundário: `#6d635c` / `#5d544d`
- Texto terciário/legendas: `#8a8078`
- Accent (dourado): `#a9865b` (hover `#8d6d47` / `#7d6440`)
- Accent claro (CTA escuro): `#c0a077`
- Bordas: `#e8e0d8` / `#ece4db` / `#e5dcd2` / `#d6cabc`
- Placeholder rosa (imagens "antes"/retratos): `#fce7f3` / `#f8dcec`
- Placeholder neutro (imagens "depois"): `#e6dfd6` / `#ddd4c9`
- Ícone rosa: `#b06a90`
- Seção escura (CTA final): fundo `#211c19`, texto `#faf8f6`, texto secundário `#c8bfb7`
- WhatsApp: `#25d366` (hover `#128c46`)

**Tipografia**
- Títulos: `Cormorant Garamond`, serif, peso 300–500, tracking normal, `line-height` 1.04–1.3
- Corpo/labels/nav: `Jost`, sans-serif, peso 300–500
- Eyebrows (labels acima dos títulos): 12px, uppercase, `letter-spacing: .28em`, cor accent
- H1: `clamp(40px, 6.4vw, 76px)`; H2: `clamp(32px, 4.4vw, 54px)`
- Corpo: 15–18px, `line-height` 1.7–1.8, peso 300

**Espaçamento / forma**
- Container máximo: 1280px (seções largas), 960–1080px (FAQ/resultados)
- Border-radius: 2–3px em cards/imagens, 999px em botões (pill), 22px nos cards do Instagram
- Sombras: suaves, `rgba(33,28,25,.4–.6)`, blur alto, offset baixo

## Seções (ordem no mapa da página)
1. **Header** — logo + nav (Procedimentos, Sobre, Resultados, Dúvidas) + CTA "Agendar avaliação"; hambúrguer < 900px
2. **Hero** — headline, subtexto, 2 CTAs, 3 estatísticas, imagem + badge flutuante
3. **Procedimentos** (`#procedimentos`) — 6 cards: Toxina Botulínica, Preenchimentos, Bioestimuladores, Skinbooster, Fios de sustentação, Protocolos de pele
4. **Sobre** (`#sobre`) — foto + bio + 3 bullets + registro profissional
5. **Resultados** (`#resultados`) — slider antes/depois interativo (drag + teclado)
6. **Bastidores/Instagram** — carrossel horizontal com scroll-snap, 4–6 posts
7. **Dúvidas** (`#duvidas`) — acordeão FAQ com 5 perguntas
8. **Agendar** (`#agendar`) — CTA final em fundo escuro, WhatsApp + localização
9. **Footer** — logo, endereço, horário, contatos, aviso legal
10. **Botão flutuante WhatsApp** — fixo, sempre visível

## Interações
- Slider antes/depois: `pointerdown/move/up`, clip-path controla a divisão, alça arrastável, setas do teclado movem 4% por toque, `touch-action: pan-y` para não travar scroll mobile
- FAQ: clique alterna item aberto (apenas um por vez), seta rotaciona 90°→0°
- Carrossel Instagram: `scroll-snap-type: x mandatory`, sem scrollbar visível, hover eleva o card
- Menu mobile: toggle de estado, fecha ao clicar em um link ou ao redimensionar para desktop
- Todos os botões primários com hover de cor (ver tokens)

## Configuração whitelabel
Três valores devem ser fáceis de trocar por clínica: `whatsappPhone`, `whatsappMessage`, `whatsappLabel` — usados para montar o link `https://wa.me/<dígitos>?text=<mensagem>`, tanto no CTA quanto no botão flutuante.

## Conteúdo de exemplo (textos reais usados no protótipo)
Ver diretamente o arquivo `Clinica Estetica Landing.dc.html` — todos os textos de FAQ, cards de procedimento e posts do Instagram estão no bloco de script (`faqData`, `postData`) e no HTML.

## Assets
Nenhuma imagem real — todos os espaços de imagem são placeholders (fundo listrado + texto indicando o conteúdo esperado). Substituir por fotos reais da clínica ao integrar.

## Arquivos deste pacote
- `Clinica Estetica Landing.dc.html` — protótipo completo da landing page
- `whatsapp-float-button.html` — botão flutuante de WhatsApp isolado (mesma lógica de link)

# Auditoria e correcoes de responsividade mobile

Data: 2026-08-13
Status: aprovado para planejamento

## Objetivo

Garantir que a landing page funcione entre 320px e telas desktop, incluindo
celulares em orientacao retrato e paisagem. As correcoes devem preservar a
identidade visual atual e podem reorganizar elementos quando a usabilidade em
telas pequenas exigir.

O trabalho cobre layout e fluxos interativos: menu, navegacao por ancoras,
comparador antes/depois, carrossel, FAQ e links de conversao.

## Estado atual

A auditoria inicial testou as larguras 320px, 360px, 390px, 768px, 899px e
900px, alem da orientacao 667x375. Nenhuma dessas larguras apresentou overflow
horizontal no documento. O grid, a tipografia fluida e a troca do menu no
breakpoint de 900px funcionam.

O comparador respondeu ao arraste e ao teclado. O carrossel respondeu ao
arraste, ao teclado e atualizou o indicador ativo. O FAQ manteve apenas um item
aberto. O teste automatizado WCAG 2 A/AA nao encontrou violacoes; sete itens de
contraste ficaram inconclusivos porque usam fundos em gradiente.

A auditoria encontrou estes problemas:

- O menu mobile aberto mede mais que a viewport em 667x375 e depende da rolagem
  do documento. Ele nao possui limite baseado em `dvh` nem rolagem interna.
- O menu nao fecha com `Escape`, nao devolve o foco ao botao de abertura e nao
  limita a navegacao por teclado enquanto permanece aberto.
- O botao flutuante de WhatsApp fica no mesmo nivel visual do header e cobre a
  area do CTA do menu em orientacao horizontal.
- Posicoes fixas e espacamentos inferiores nao consideram `safe-area-inset-*`.
- O viewport atual nao solicita `viewport-fit=cover`, necessario para aplicar
  safe areas em dispositivos compativeis.

## Abordagem

Aplicar correcoes cirurgicas nos componentes existentes. O projeto mantem a
estrutura de secoes, os breakpoints, os tokens visuais e os comportamentos que
ja passaram nos testes.

Esta abordagem evita um segundo layout mobile e reduz o risco de divergencia
entre dispositivos. CSS resolve geometria, safe areas e rolagem. React controla
somente estado, foco e eventos do menu.

## Navegacao mobile

O header continua sticky e o breakpoint permanece em 900px.

Quando o usuario abrir o menu:

- o painel deve caber na altura visivel, usando unidades dinamicas de viewport;
- a lista deve rolar dentro do painel quando a altura for curta;
- o painel deve ficar acima do botao flutuante;
- `Escape` deve fechar o painel;
- o foco deve permanecer no botao de abertura, e `Tab` deve seguir para o
  primeiro link;
- `Tab` e `Shift+Tab` devem seguir a ordem natural do documento;
- ao fechar, o foco deve voltar ao botao que abriu o painel;
- clicar em um link deve fechar o painel antes da navegacao por ancora;
- cruzar o breakpoint de 900px deve fechar o painel e limpar seu estado.

O menu usara o padrao de disclosure e a semantica de navegacao existente. Ele
nao prendera o foco nem sera convertido em dialogo de tela cheia, pois permanece
visualmente ligado ao header e nao bloqueia o restante da pagina.

## Safe areas e elementos fixos

O viewport deve usar `viewportFit: "cover"` pela API de viewport do Next.js.

O header deve somar `env(safe-area-inset-top)` ao seu espacamento superior. Os
containers de pagina devem respeitar as safe areas laterais sem remover o
padding responsivo existente.

O botao flutuante deve calcular `right` e `bottom` com `max()` entre o
espacamento de design e as safe areas correspondentes. O rodape deve manter
espaco inferior suficiente para que o botao nao cubra o ultimo conteudo.

Com o menu aberto, o botao flutuante deve ficar abaixo da camada do painel ou
ser ocultado enquanto houver conflito. A escolha de implementacao deve manter o
link disponivel no restante da pagina e evitar dois CTAs sobrepostos.

## Conteudo e layout

O projeto preserva os layouts atuais:

- hero em uma coluna no celular e duas colunas a partir de tablet;
- cards de procedimentos em uma, duas e tres colunas;
- secoes Sobre e Resultados empilhadas em telas estreitas;
- CTAs finais empilhados quando a largura nao comportar os dois;
- rodape em uma, duas e quatro colunas.

As correcoes podem reduzir paddings, larguras de botoes ou espacamentos em
320px quando um teste mostrar colisao. Nenhuma secao sera redesenhada apenas por
preferencia visual.

Textos e controles devem aceitar quebra de linha sem corte. Alvos interativos
devem medir pelo menos 44x44px.

## Interacoes preservadas

### Comparador

O comparador deve continuar aceitando Pointer Events e teclado. O gesto
horizontal move a divisoria; `touch-action: pan-y` mantem a rolagem vertical da
pagina. As setas esquerda e direita devem alterar o valor sem deslocar a pagina.

### Carrossel

O carrossel deve continuar aceitando rolagem nativa por toque, arraste por mouse,
setas do teclado e selecao pelos indicadores. A logica de loop e inercia atual
nao muda sem uma falha reproduzida durante a verificacao final.

### FAQ e CTAs

O FAQ deve continuar permitindo um item aberto por vez. Os botoes do WhatsApp,
Instagram, e-mail e localizacao devem manter URLs corretas, area de toque e
estado de foco visivel.

## Movimento e acessibilidade

As correcoes devem respeitar `prefers-reduced-motion`. O menu nao deve depender
de animacao para ficar utilizavel. Rolagem suave continua desativada quando o
usuario pede movimento reduzido.

O foco visivel atual deve permanecer. O menu deve oferecer uma ordem de foco
previsivel e anunciar seu estado com `aria-expanded` e `aria-controls`.

## Tratamento de erros e casos limite

- Se a viewport mudar enquanto o menu estiver aberto, o componente deve fechar
  o menu ao entrar no modo desktop.
- Se a altura diminuir por rotacao ou teclado virtual, o painel deve continuar
  rolavel e manter o CTA acessivel.
- Eventos de ponteiro cancelados devem encerrar o arraste do comparador e do
  carrossel sem deixar estado visual preso.
- Navegadores sem suporte a safe areas devem usar os espacamentos atuais, pois
  `env()` retorna zero nesse caso.
- Navegadores sem suporte a animacoes de scroll devem exibir todo o conteudo.

## Verificacao

### Viewports

- 320x700: menor largura suportada.
- 360x800 e 390x844: celulares comuns.
- 667x375: celular em orientacao horizontal e altura curta.
- 768x1024: tablet.
- 899x900 e 900x900: limites do breakpoint do menu.
- 1280x800 e 1920x1080: desktop e largura maxima do requisito original.

### Fluxos

- Abrir e fechar o menu por toque, clique e `Escape`.
- Percorrer o menu com `Tab` e `Shift+Tab`; confirmar a ordem natural e o
  retorno de foco ao fechar com `Escape`.
- Abrir o menu em paisagem e acessar todos os links e o CTA por rolagem interna.
- Navegar por todas as ancoras e conferir compensacao do header sticky.
- Arrastar o comparador ate ambos os extremos e usar as setas.
- Arrastar o carrossel, usar setas e indicadores e conferir o item ativo.
- Alternar todas as perguntas do FAQ.
- Conferir hrefs de WhatsApp, Instagram, e-mail e localizacao.
- Simular `prefers-reduced-motion: reduce`.
- Confirmar `scrollWidth === innerWidth` em todas as larguras.
- Executar teste unitario, build de producao e auditoria automatizada de
  acessibilidade.

## Criterios de aceite

- O documento nao apresenta overflow horizontal entre 320px e 1920px.
- Nenhum controle essencial fica encoberto pelo WhatsApp ou pelo header.
- O menu permanece utilizavel em 667x375 e pode ser operado sem mouse.
- Safe areas protegem conteudo e controles fixos em dispositivos compativeis.
- Comparador, carrossel, FAQ, ancoras e links mantem seu comportamento atual.
- O build, os testes e a auditoria de acessibilidade terminam sem novas falhas.

## Fora de escopo

- Trocar placeholders por imagens reais.
- Alterar textos, identidade visual ou configuracao whitelabel.
- Reescrever a fisica do carrossel sem uma regressao reproduzida.
- Criar uma navegacao mobile distinta da estrutura atual.
- Fazer mudancas de backend, analytics ou integracoes externas.

# Fotografias de banco para a landing page

## Objetivo

Substituir os dez usos visuais de `Placeholder` por fotografias locais do
Pexels, mantendo o layout atual, a direção editorial de pele aprovada e o bom
desempenho da página. O comparador deve usar duas derivações do mesmo retrato
para que olhos, nariz, boca e contorno permaneçam no mesmo pixel durante o
arraste.

O projeto continua sendo uma demonstração de portfólio. As fotografias são
assets de demonstração e devem ser substituídas ao adaptar a página para uma
clínica real. O comparador, por simular uma transformação, precisa informar
isso também na própria interface.

## Direção visual

- Linguagem: editorial de pele, com planos fechados, textura visível e luz
  controlada.
- Casting: mulheres adultas com diferentes tons de pele.
- Paleta: branco, creme, rosa suave e tons naturais de pele, em continuidade
  com o design atual.
- Tratamento: correções discretas. Não alterar anatomia facial.
- Recortes: cada arquivo final deve nascer na proporção do componente para
  evitar enquadramentos diferentes entre desktop e mobile.

## Mapa de fotografias

| Uso | ID Pexels | Fotógrafo | Página da foto | Arquivo final | Dimensões |
| --- | ---: | --- | --- | --- | ---: |
| Hero | 3762764 | Shiny Diamond | [Fonte](https://www.pexels.com/photo/woman-with-flawless-skin-3762764/) | `public/images/clinic/hero.webp` | 1200 x 1500 |
| Perfil profissional | 33756693 | Jessica Keli Alves | [Fonte](https://www.pexels.com/photo/female-doctor-holding-medical-instrument-in-clinic-33756693/) | `public/images/clinic/professional.webp` | 1200 x 1600 |
| Base do comparador | 13295348 | Büşranur Aydın | [Fonte](https://www.pexels.com/photo/woman-s-face-in-close-up-photography-13295348/) | `public/images/clinic/result-before.webp` e `public/images/clinic/result-after.webp` | 1600 x 1100 cada |
| Post: sessão facial | 8460603 | Ornella Delfino | [Fonte](https://www.pexels.com/photo/young-woman-at-beauticians-8460603/) | `public/images/clinic/instagram-treatment.webp` | 900 x 900 |
| Post: ambiente | 27781696 | Ela De Pure | [Fonte](https://www.pexels.com/photo/ela-de-pure-skin-store-27781696/) | `public/images/clinic/instagram-clinic.webp` | 900 x 900 |
| Post: retrato | 5253959 | Antonius Ferret | [Fonte](https://www.pexels.com/photo/portrait-of-a-young-natural-woman-with-afro-and-freckles-5253959/) | `public/images/clinic/instagram-patient.webp` | 900 x 900 |
| Post: resultado editorial | 16069404 | Ran Lu | [Fonte](https://www.pexels.com/photo/a-woman-with-her-eyes-closed-16069404/) | `public/images/clinic/instagram-result.webp` | 900 x 900 |
| Post: equipe | 8837170 | Yan Krukau | [Fonte](https://www.pexels.com/photo/woman-wearing-eyeglasses-extending-her-hand-8837170/) | `public/images/clinic/instagram-team.webp` | 900 x 900 |
| Post: detalhe | 28482020 | Yana Romanovich | [Fonte](https://www.pexels.com/photo/elegant-skincare-product-arrangement-on-fabric-28482020/) | `public/images/clinic/instagram-detail.webp` | 900 x 900 |

Os originais serão baixados para uma área temporária, não para o repositório.
Cada download deve vir do domínio permitido `images.pexels.com`, usar HTTPS e
ser recusado se exceder 10 MB. Os WebP finais entram no repositório.

## Organização dos dados

Criar `config/photos.ts` como fonte única dos caminhos, textos alternativos,
posição focal, fotógrafo e URL da fonte. A estrutura deve expor quatro grupos:

- `hero`;
- `professional`;
- `comparison.before` e `comparison.after`;
- `posts`, com os seis itens na ordem atual do carrossel.

Os componentes não devem repetir caminhos ou créditos. Um novo
`docs/image-credits.md` deve registrar as mesmas fontes em formato legível para
manutenção e atribuição.

## Integração nos componentes

### Hero

Substituir o `Placeholder` por `next/image`, preservando o contêiner `4:5`, o
raio de 3 px, a sombra e o badge existente. A imagem deve preencher o
contêiner, usar o ponto focal configurado e ser pré-carregada conforme a API
documentada do Next 16. O atributo `sizes` deve refletir uma coluna próxima de
metade do viewport no desktop e largura total no mobile.

### Sobre

Substituir o `Placeholder` pelo retrato profissional. Preservar o contêiner
`3:4`, o limite de altura e o layout em duas colunas. A imagem deve carregar
sob demanda e manter o rosto dentro do recorte em telas estreitas.

### Resultados

Manter uma camada "depois" em tela cheia e uma camada "antes" recortada por
`clip-path`. Ambas devem usar arquivos de 1600 x 1100 produzidos a partir do
mesmo recorte e ocupar o mesmo retângulo com `position: absolute`, `inset: 0`,
`width: 100%`, `height: 100%` e o mesmo `object-position`.

A barra altera somente o `clip-path` da camada "antes". Não animar largura,
posição ou escala das fotos. O movimento deve continuar direto, sem easing,
para acompanhar o ponteiro. Preservar toque, captura de ponteiro, teclado,
`role="slider"` e incrementos de 4% nas setas.

### Bastidores

Trocar `ph` por dados reais de imagem nos seis posts e renderizar cada foto
com `next/image`. Preservar o carrossel, clones, inércia, links, legendas,
contadores e proporção quadrada. Clones devem continuar fora da árvore de
acessibilidade por meio do contêiner que já usa `aria-hidden`.

O componente `Placeholder` continuará no projeto como fallback para futuras
adaptações whitelabel, mas não será usado pela página atual.

## Produção do antes e depois

1. Baixar uma vez o original do Pexels ID 13295348.
2. Definir um único recorte central de 1600 x 1100 e gerar a versão "antes".
3. Gerar a versão "depois" a partir desse arquivo já recortado, nunca a partir
   de um segundo recorte do original.
4. Aplicar na versão "depois" apenas aumento discreto de luminosidade,
   uniformização de tonalidade e suavização leve de textura.
5. Não usar transformação geométrica, reposicionamento, redimensionamento
   independente ou edição que altere os traços da pessoa.
6. Exportar os dois arquivos WebP com os mesmos metadados de dimensão.

O ImageMagick disponível no ambiente fará recorte, correção e exportação. Uma
comparação em 0%, 50% e 100% deve confirmar que os pontos anatômicos não se
deslocam.

## Transparência do conteúdo

Substituir o texto atual:

> Registros reais, mesma iluminação e mesmo enquadramento. Resultados variam
> conforme indicação e resposta individual.

Por:

> Simulação visual criada a partir da mesma fotografia para demonstrar o
> comparador. Não representa resultado clínico.

Manter os rótulos "Antes" e "Depois" porque descrevem os estados da simulação.
O aviso deve permanecer visível, sem depender de tooltip ou texto somente para
leitor de tela.

## Desempenho e acessibilidade

- Usar arquivos locais para evitar dependência de host remoto em produção.
- Usar `next/image` em todos os espaços e declarar `sizes` por contexto.
- Pré-carregar somente o hero. As demais imagens ficam com carregamento tardio.
- Reservar espaço por meio das proporções existentes para manter CLS abaixo de
  0,1.
- Escrever textos alternativos que descrevam a cena sem chamar modelos de
  pacientes reais.
- Tratar as duas camadas do comparador como uma única experiência acessível,
  evitando leitura duplicada das fotos.
- Preservar o foco visível, a operação por teclado e `touch-action: pan-y`.

## Estratégia de teste

Seguir TDD para a presença dos assets:

1. Criar primeiro um teste que declare os dez caminhos esperados, confirme que
   cada um aponta para `public/images/clinic/` e falhe enquanto os arquivos não
   existirem.
2. Executar o teste e confirmar a falha pela ausência dos assets.
3. Baixar, tratar e integrar as imagens até o teste passar.
4. Manter os testes existentes verdes.

Verificações adicionais:

- `magick identify` confirma 1200 x 1500, 1200 x 1600, dois arquivos 1600 x
  1100 e seis arquivos 900 x 900;
- nenhum arquivo final excede 10 MB;
- `npm test` passa sem avisos;
- `npm run build` passa sem erro;
- desktop e mobile exibem todos os recortes sem distorção ou CLS visível;
- o comparador funciona por mouse, toque e setas;
- a passagem da barra não desloca olhos, nariz, boca, cabelo ou contorno;
- a versão com movimento reduzido continua plenamente utilizável.

## Fora de escopo

- Trocar textos, cores, tipografia ou estrutura das seções fora do aviso do
  comparador.
- Alterar a física do carrossel.
- Transformar a simulação em alegação de resultado médico.
- Buscar fotos de uma clínica ou profissional real.
- Remover o componente genérico `Placeholder`.

## Critérios de aceite

- Nenhum `Placeholder` aparece na página renderizada.
- Os dez espaços usam os arquivos e créditos definidos neste documento.
- O conjunto mantém a direção editorial de pele e casting adulto diverso.
- O comparador usa duas derivações do mesmo recorte de 1600 x 1100.
- A transformação é perceptível, sutil e não altera anatomia.
- O aviso de simulação aparece acima do comparador.
- Todos os testes, a validação de dimensões e o build passam.
- A página funciona sem regressão visual em desktop e mobile.

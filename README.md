# Calculadora do Eletricista

## Demonstração

### Veja o site: [Clique aqui](https://cledsonb.github.io/portal-eletrica/)

## Propósito

Agilize seu serviço com a nossa calculadora e fique somente com o serviço manual.

O projeto reúne, em uma única página web, as contas mais comuns do dia a dia da instalação elétrica (dimensionamento de condutores, iluminação, consumo, motores, pontos residenciais e energia solar), com base nas normas **NBR 5410**, **NBR 14039** e **ABNT NBR ISO/CIE 8995-1**.

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem build, sem framework)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Lucide](https://lucide.dev/) para os ícones
- Fontes Inter e JetBrains Mono (Google Fonts)

## Como executar

Não há instalação. Basta manter a estrutura de pastas e abrir o `index.html` no navegador (é necessária conexão com a internet para carregar Tailwind, Lucide e as fontes).

## Estrutura de arquivos

```
portal-calculos/
├── index.html        # estrutura de todas as páginas (home + ferramentas)
├── css/
│   └── style.css     # estilos próprios (navegação entre páginas, página de consumo)
└── js/
    └── script.js     # navegação e fórmulas de cada calculadora
```

A navegação é feita dentro do próprio `index.html`: cada ferramenta é uma `<div class="page">` e a função `navigateTo(id)` alterna qual delas fica visível.

## Mapa do site

### Home (`index.html`)

Quadrados com cores destacadas e ícones para cada tipo de cálculo.

### Energia solar (`#solar`)

Calcula a quantidade de placas solares necessárias para cobrir o consumo mensal, considerando:

- energia mensal desejada (kWh);
- potência de cada placa (kW);
- horas de sol por dia e número de dias;
- fator de desempenho global (rendimento do sistema).

Fórmula: `n = ⌈ energia mensal / (horas de sol × dias × desempenho × potência da placa) ⌉`

### Partida de motores (`#motores`)

Dimensiona os equipamentos de um motor mono ou trifásico a partir da potência em cv, da tensão da rede e da relação Ip/In:

- corrente nominal (In) e corrente de partida (Ip);
- disjuntor, contator, fusível e relé térmico.

### Residencial (`#residenciais`)

Cálculo de pontos mínimos por ambiente a partir da área e do perímetro:

- pontos de iluminação;
- pontos de tomada (TUG).

### Método dos Lúmens (`#luminotecnico`)

Projeto luminotécnico por cômodo, com base em comprimento, largura, pé-direito, lúmens da luminária, nível de iluminância exigido e fator de manutenção.

- Mostra o **índice do recinto (K)**.
- O **fator de utilização é opcional**: com o K em mãos, o usuário consulta a tabela, informa o fator e então recebe a quantidade de luminárias.

### Dimensionamento de condutores (`#condutores`)

Seção mínima do condutor de cobre por queda de tensão, a partir da corrente de projeto, tensão, distância e queda máxima admitida.

### Consumo elétrico mensal (`#consumomes`)

Lista de aparelhos (potência, dias de uso e horas por dia) com o consumo total em kWh e o custo estimado do mês a partir da tarifa informada.

## Situação do projeto

| Item do plano original | Situação |
| --- | --- |
| Home com quadrados coloridos e ícones | Feito |
| Energia solar: quantidade de placas | Feito (a taxa de irradiação entra como "horas de sol por dia", digitada pelo usuário) |
| Energia solar: banco de baterias (off-grid) | **Não implementado** |
| Partida de motor: disjuntor, relé, fusível e contator | Feito, mas dimensionado a partir da corrente nominal (In) com fatores fixos; a corrente de partida (Ip) é apenas exibida |
| Residencial: lâmpadas por cômodo (área, pé-direito e lúmens) | Feito, em página própria (Método dos Lúmens) |
| Residencial: tomadas por cômodo conforme o uso | **Parcial** (hoje usa apenas o perímetro, sem diferenciar o tipo de cômodo) |
| Tipo de onda: conversões CA-CC | **Não implementado** |
| Dimensionamento de condutores | Feito (não estava no plano original) |
| Consumo elétrico mensal | Feito (não estava no plano original) |

## O que falta adicionar

### Funcionalidades previstas e ainda não feitas

- [ ] **Banco de baterias para sistemas off-grid**, na página de energia solar (autonomia em dias, profundidade de descarga, tensão do banco e capacidade em Ah).
- [ ] **Página "Tipo de onda"** com as conversões CA-CC (valor de pico, RMS, médio e pico a pico para onda senoidal, e valores equivalentes em corrente contínua).
- [ ] **Tomadas por cômodo conforme o uso:** diferenciar cozinha, copa, banheiro, área de serviço, varanda, sala e dormitório, além de TUEs (tomadas de uso específico), seguindo as regras da NBR 5410.
- [ ] **Iluminação residencial por área:** revisar a regra atual (`área / 6`) e comparar com o critério de carga mínima da NBR 5410 por faixa de área.
- [ ] **Partida de motores:** dimensionar os componentes também a partir da corrente de partida (Ip) e permitir escolher o tipo de partida (direta, estrela-triângulo, soft-starter).

### Sugestões de melhoria

- [ ] Tabela de iluminância por tipo de ambiente (lux), para preencher o campo automaticamente.
- [ ] Tabela de fator de utilização consultada pelo K, para o usuário não precisar procurar fora da página.
- [ ] Tabela de irradiação solar (horas de sol pleno) por cidade ou estado.
- [ ] Condutores: sugerir a **seção comercial** (1,5; 2,5; 4; 6; 10 mm²...) e verificar a ampacidade, não só a queda de tensão. Hoje o resultado é apenas a seção calculada.
- [ ] Condutores: opção de escolher entre monofásico e trifásico, e entre cobre e alumínio.
- [ ] Mostrar a fórmula usada e a norma de referência abaixo de cada resultado.
- [ ] Validação de campos com mensagens na própria página, em vez de `alert()`.
- [ ] Botão para limpar os campos de cada calculadora.
- [ ] Exportar ou imprimir o resultado (PDF) para anexar a orçamentos.
- [ ] Tornar o site instalável e utilizável offline (PWA), útil para trabalho em obra.
- [ ] Testes automatizados das fórmulas.
- [ ] Adicionar uma licença ao repositório.

## Aviso

Os resultados são auxiliares de cálculo e não substituem o projeto elétrico nem a verificação nas normas vigentes. Confira sempre as tabelas e exigências da NBR 5410 antes de executar a instalação.

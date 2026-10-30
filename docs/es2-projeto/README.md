# ES2 — Projeto de Sistema (2026/2)

Disciplina: **Engenharia de Software II (INF 16160)**, Prof. Vítor E. Silva Souza — UFES.
Equipe: Bernardo Vargens Broedel, Eduardo Capobiango Ferraz, Mateus Biancardi da Silva,
Miguel Zon Murad e Victor Augusto Fernandes Rangel.

O documento de projeto é escrito em LaTeX (template `engsoft-documento-projeto`, do
professor) e editado no Overleaf; esta pasta guarda a **cópia versionada** das fontes,
dos diagramas editáveis e do protótipo.

## Conteúdo

| Pasta | O que tem |
|---|---|
| [`documento-de-projeto/`](documento-de-projeto/) | Fontes LaTeX completas: `main.tex`, `capitulos/` e `figuras/`. |
| [`diagramas/`](diagramas/) | Diagramas editáveis em [diagrams.net](https://app.diagrams.net): `ln-*.drawio` (lógica de negócio, T2) e `ciu-*.drawio` (interface com o usuário e sequência, T3). |
| [`prototipo/`](prototipo/) | Protótipo de alta fidelidade do T3: 14 telas em SVG (uma por página do pacote `cih`), as folhas em PNG usadas no documento e um `index.html` que mostra todas offline. |
| [`exercicio-05/`](exercicio-05/) | Exercício 05 (Projeto da Interface com o Usuário), entregue à parte: PDF e os 6 diagramas em `.drawio`/`.png`. |
| [`.project/`](.project/) | Notas de trabalho: contexto atual, decisões de projeto com a justificativa e histórico de alterações. |

## Etapas da disciplina

| Trabalho | Conteúdo | Onde está no documento | Situação |
|---|---|---|---|
| T1 | Descrição geral, plataforma, atributos de qualidade e arquitetura | Capítulos 1 a 4 | entregue |
| T2 | Projeto da lógica de domínio (CDP e CGT dos três subsistemas) | Capítulo 5 (`ch6-business-logic.tex`) | entregue |
| T3 | Projeto da lógica de aplicação e da interação humano-computador (CIU) + protótipo de alta fidelidade | Capítulo 6 (`ch7-human-computer-interaction.tex` + `prototipo.tex`) | **a entregar em 26/10/2026** |
| T4 | Projeto da gerência de dados (CGD + modelo relacional) | a escrever | não iniciado |
| T5 | Lista de exercícios de padrões de projeto (Jupyter Notebook) | repositório próprio | não iniciado |

> Os números de capítulo acima são os do documento compilado hoje. O arquivo
> `capitulos/ch5-componentes.tex` continua na pasta mas **não é compilado**: ele
> duplicava o capítulo de lógica de negócio (mesmas figuras, texto antigo e valores de
> enumeração divergentes). A linha correspondente está comentada no `main.tex`.

## Arquitetura, em uma olhada

Três subsistemas — **Gestão de Perfis**, **Serviços** e **Suporte** — cada um em três
camadas (Apresentação, Negócio e Acesso a Dados). Na camada de Negócio, cada subsistema
tem os pacotes `cdp` (domínio do problema) e `cgt` (gerência de tarefas, classes `Apl*`,
padrão Camada de Serviço). Na camada de Apresentação, os pacotes `cih` (páginas) e `cci`
(controladores, implementados como Server Actions e Route Handlers do Next.js), no
padrão MVC. Plataforma escolhida: Next.js 16, TypeScript, PostgreSQL 18, Drizzle ORM,
Better Auth, Tailwind CSS e shadcn/ui.

## Protótipo

O protótipo navegável de ES1 continua no ar em <https://happypawss.lovable.app>. As
telas desta pasta são a revisão de alta fidelidade feita no T3: usam os nomes de página
e as rotas das tabelas do Capítulo 6, acrescentam as telas do perfil Atendente (fila de
chamados e análise de validação) e aplicam as táticas de usabilidade registradas no
documento.

Para ver todas as telas na Web (é o endereço citado no documento):
<https://eduardo-ferraz.github.io/happy-paws-go/es2-projeto/prototipo/>.
Offline, basta abrir [`prototipo/index.html`](prototipo/index.html) no navegador.

## Como compilar o documento

As fontes de `documento-de-projeto/` são as mesmas do projeto no Overleaf. Para
recompilar lá, basta subir os arquivos alterados e usar *Recompile* (duas vezes, para o
BibTeX rodar). Localmente, qualquer distribuição LaTeX com `abntex2` resolve:

```sh
cd docs/es2-projeto/documento-de-projeto
pdflatex main && bibtex main && pdflatex main && pdflatex main
```

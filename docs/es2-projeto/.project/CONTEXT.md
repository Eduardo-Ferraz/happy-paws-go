# CONTEXT — ES2 2026/2 (UFES) · atualizado em 09/11/2026

## Onde estamos (09/11/2026)

Duas frentes abertas:

1. **Exercício 06 — Projeto da Gerência de Dados.** Resolvido e pronto para enviar
   em `exercicio-06/` (PDF de 11 páginas + 5 diagramas). Enunciado da clínica
   odontológica; é ensaio do que o T4 pedirá sobre o Happy Paws.
2. **Seminário — Teste de aspectos e teste apoiado por aspectos** (cap. 7 de
   *Introdução ao Teste de Software*). Deck de 34 slides pronto em `seminario/`,
   com roteiro de fala e divisão por integrante. **Apresentação em 10/12/2026**,
   25 a 35 minutos, todos apresentam e o professor pergunta individualmente.

O T3 foi prorrogado pelo professor para 30/10/2026 e **entregue nesse dia**: o
Mateus subiu em 30/10 seis commits com os ajustes finais do Capítulo 6, os
diagramas CIU redesenhados pela equipe (com ícones de *boundary*/*control* e as
operações das classes `Apl`), as folhas do protótipo em PNG e o link do protótipo
apontando para o GitHub Pages. A versão 3.0 do documento está datada de
30/10/2026. O T4 ainda não foi iniciado.

## O que falta decidir ou fazer

- Confirmar com o time a divisão de quem apresenta cada bloco do seminário
  (a do roteiro é sugestão) e substituir o esqueleto do Google Slides
  ("Seminario EngSoft2") pelo deck novo.
- Enviar o exercício 06 no AVA.
- Começar o T4 aproveitando o que o exercício 06 ensaiou: hierarquia de DAOs,
  mapeamento objeto-relacional e diagrama relacional, agora sobre o Happy Paws.

---

## Histórico — 21/10/2026

Disciplina Engenharia de Software II (INF 16160), Prof. Vítor E. Silva Souza.
Projeto do time: **Happy Paws** (plataforma de passeio com cães).
Documento de Projeto de Sistema no Overleaf: `ES2-2026-2-HappyPaws`
(`overleaf.com/project/6a999ca0e5d8e04a23a065c3`), template LaTeX obrigatório
`vitorsouza/latex-templates/engsoft-documento-projeto` (abntex2).

O fonte LaTeX foi exportado do Overleaf pelo usuário em 21/10 e está em
`t3/overleaf-atualizado/` **já com as correções do T3 aplicadas**. O zip original
ficou no scratchpad da sessão; o diff antes × depois está em `t3/ALTERACOES.diff`.

Estrutura compilada hoje: `main.tex` + `capitulos/ch1` a `ch4`, `ch6-business-logic`
(T2) e `ch7-human-computer-interaction` (T3, que inclui `capitulos/prototipo.tex`).
`ch5-componentes.tex` e `ch5-frameweb.tex` existem na pasta mas **não são
compilados**.

## Entregas preparadas nesta sessão

1. `exercicio-05/` — resolução completa da Questão 1 (PDF de 11 páginas + 6
   diagramas). Prazo 22/10 13:00. Não vale nota, mas habilita recuperação de nota
   do T3.
2. `t3/` — as 4 figuras que faltavam, o protótipo de alta fidelidade (14 telas), a
   seção LaTeX do protótipo e as correções do documento (ver CHANGELOG). Prazo 26/10.

## Estado do Overleaf (conferido em 21/10, às 12h)

Os arquivos foram subidos pelo usuário e o documento **compila limpo**: 0 erros,
10 avisos (todos benignos: `h`→`ht` de float e underfull hbox em tabelas), **nenhuma
referência ou citação indefinida** (ou seja, nenhum `??` no PDF), **20 figuras**
numeradas de 1 a 20 e **nenhuma caixa "[Diagrama pendente]"**. O diagrama de
sequência (Figura 19) saiu em página própria, girado, legível. Com o Capítulo 5 fora
da compilação, a lógica de negócio virou o Capítulo 5 e a IHC o Capítulo 6.

Detalhe: na primeira tentativa o `bibliografia.bib` foi o único arquivo que não
subiu (os outros 5 e as 11 figuras foram). A entrada `falbo:notas18` foi digitada
direto no editor do Overleaf, em uma linha só — o conteúdo é o mesmo da cópia local,
só a formatação difere.

## Bloqueios / pendências

- **O T3 ainda não foi entregue no Classroom.** Falta preencher as datas do T1 e do T2
  no histórico de alterações da capa, baixar o PDF e anexar na atividade (prazo 26/10).
- **Não dá para compilar LaTeX nesta máquina** (sem distribuição local; só Overleaf).
  A conferência estática está automatizada em `ferramentas/t3_check_latex.py`
  (refs, cites, figuras, ambientes e chaves).
- **Upload no Overleaf pelo painel embutido não funciona** (CSP bloqueia `fetch` e
  `iframe` para servidor local; `Ctrl+V` sintético não lê a área de transferência).
  Editar texto no editor e recompilar, isso funciona.
- **Capítulo 5 fora da compilação** (duplicava o Capítulo 6). Se o time quiser
  mantê-lo, é descomentar no `main.tex` e desfazer o item 7 do `ALTERACOES.diff` —
  mas as enumerações dos dois capítulos voltam a se contradizer.
- **Tipos de documento da validação**: o texto e o protótipo seguem agora a Tabela de
  tipos enumerados do Capítulo 6 (RG, CNH, comprovante de residência, antecedentes
  criminais). Se o documento de requisitos (CA04) citar *selfie*, trocar no texto do
  `ch7` e regerar as telas 04 e 14 do protótipo.
- T4 (Projeto da Gerência de Dados) ainda não começou: vai precisar dos CGDs e do
  modelo relacional, partindo dos CDPs do Capítulo 6.

## O que não mexer agora

- Os arquivos `ln-*.drawio` originais do time (CDP/CGT do T2) — os diagramas novos
  são arquivos separados (`ciu-*.drawio`), no mesmo padrão visual.
- `ch5-componentes.tex` continua na pasta de propósito, como histórico.

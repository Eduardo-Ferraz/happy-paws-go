# CONTEXT — ES2 2026/2 (UFES) · entregas de 21/10/2026

## Onde estamos

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

## Bloqueios / pendências

- **O T3 não está entregue.** Falta subir os 6 arquivos e as 11 figuras no Overleaf,
  compilar, preencher as datas do T1 e do T2 no histórico de alterações da capa e
  anexar o PDF no Classroom (passo a passo em `t3/COMO-ATUALIZAR-O-DOCUMENTO.md`).
- **Não dá para compilar LaTeX nesta máquina** (sem distribuição local; só Overleaf).
  A conferência possível sem compilar está automatizada em
  `ferramentas/t3_check_latex.py` (refs, cites, figuras, ambientes e chaves) e passou
  sem problemas.
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

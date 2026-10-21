# DECISIONS — ES2 2026/2

Formato: data · decisão · alternativas · porquê · consequências.

---

## 2026-10-21 · Exercício 05: trocar a generalização de papéis pelo padrão Papel

**Decisão.** No CDP do sistema de submissão de trabalhos, `Autor`,
`MembroComitePrograma` e `Coordenador` deixam de ser especializações de `Membro` e
passam a ser especializações de uma classe abstrata `Papel`, que liga um `Membro` a um
`Evento`.

**Alternativas consideradas.** (a) Manter a generalização do modelo de análise;
(b) uma única classe `Papel` com atributo enumerado `tipoPapel`.

**Porquê.** O enunciado diz que o mesmo membro exerce papéis diferentes em eventos
diferentes e até no mesmo evento, e que não pode haver duplicidade de informações do
membro. Com generalização, seria preciso um objeto de `Membro` por papel (duplicidade)
ou herança múltipla dinâmica, que Java não tem. A alternativa (b) foi descartada
porque cada papel tem comportamento próprio (`podeExcluirEvento()`,
`possuiConflitoInteresse()`) e porque `Autor` pertence a outra partição.

**Consequências.** `Membro` é único no sistema; papéis são criados por evento;
as restrições RI02 (só avalia quem é do comitê) passam a ser estruturais e a RI03/RI04
viram operações que navegam `Papel → Membro → Instituicao`. `Papel` fica em
`gerenciaevento::cdp` e `Autor` em `submissaoavaliacaoartigo::cdp`, preservando o
sentido único de dependência entre pacotes da Figura 1 do enunciado.

## 2026-10-21 · Exercício 05: prefixo `Pag` para as classes de visão

**Decisão.** As classes de visão da CIU usam o prefixo `Pag` (página), e não `Jan`
(janela).

**Porquê.** O sistema do enunciado roda na Web; o padrão do prof. Falbo manda usar
"um prefixo que indique o tipo de interface" e cita `Jan` e `Painel` como exemplos.

**Consequências.** A decisão está registrada explicitamente na Seção 1 do PDF
entregue, para o professor não interpretar como desvio de nomenclatura.

## 2026-10-21 · Exercício 05: uma classe controladora por partição

**Decisão.** `CtrlGerenciaMembro`, `CtrlGerenciaEvento` e
`CtrlSubmissaoAvaliacaoArtigo` — uma controladora de interação por partição, não uma
por caso de uso.

**Porquê.** A regra de nomenclatura do Falbo pede que o complemento do nome indique a
extensão do controle exercido, e o exemplo dele (`CtrlControleAcervo`) é por
subsistema. Mantém o diagrama legível com 4 a 6 páginas por partição.

## 2026-10-21 · T3: protótipo desenhado como SVG vetorial, não em Figma

**Decisão.** As 14 telas do protótipo foram desenhadas programaticamente (SVG → PDF),
com um pequeno sistema de design (paleta, tipografia, componentes).

**Alternativas.** Figma/Moqups (a especificação deixa a ferramenta livre); reaproveitar
as telas de baixa fidelidade do documento de requisitos.

**Porquê.** O protótipo precisava ficar pronto junto das figuras e ser vetorial para
entrar no LaTeX sem pixelizar; e precisava usar exatamente os nomes de páginas e rotas
das Tabelas 14 a 16 do documento, para atender ao "o protótipo deve ser consistente
com a documentação elaborada".

**Consequências.** As telas são imagens (protótipo não funcional, como pedido), sem
navegação clicável. Para editar, mexe-se no gerador, não em uma ferramenta de design.
Se o time preferir Figma depois, as telas servem de referência visual.

## 2026-10-21 · T3: diagramas da CIU organizados por controlador

**Decisão.** Nos três diagramas `ciu-*`, as páginas foram agrupadas em linhas, uma por
controlador, com as classes `Apl` correspondentes à direita.

**Porquê.** São 12 páginas só em Gestão de Perfis; organizar por controlador deixa
visível a regra do Capítulo 7 ("toda chamada da interface à lógica de negócio passa
por um controlador") e evita um emaranhado de associações.

**Consequências.** Links entre páginas e redirecionamentos aparecem só nos casos
mais importantes (login e os fluxos principais), com o restante descrito nas tabelas de
páginas — registrado na legenda de cada diagrama.

# CHANGELOG — ES2 2026/2

## 2026-10-21 — Exercício 05 e insumos do T3

### Exercício 05 (Questão 1) — entrega pronta
- `ES2-2026-2-Exercicio05-HappyPaws.pdf` (11 páginas): premissas, item (a) com os
  3 diagramas do CDP e as decisões de projeto, item (b) com os 3 diagramas de
  CGT + CIU, e tabela de rastreabilidade caso de uso → `Apl` → páginas.
- 6 diagramas em `.drawio`, `.pdf`, `.png` e `.svg`:
  `ex05-cdp-gerenciamembro`, `ex05-cdp-gerenciaevento`,
  `ex05-cdp-submissaoavaliacaoartigo`, `ex05-cgt-ciu-gerenciamembro`,
  `ex05-cgt-ciu-gerenciaevento`, `ex05-cgt-ciu-submissaoavaliacaoartigo`.

### T3 — o que faltava no documento
- 4 figuras que estavam como `[Diagrama pendente]`: `ciu-perfis`, `ciu-servicos`,
  `ciu-suporte` e `ciu-servicos-seq-acompanhar` (diagrama de sequência do
  acompanhamento em tempo real, com o fragmento `loop` e as notas do RNF-2 e RNF-3).
- Protótipo de alta fidelidade com 14 telas (12 de celular 375x812 e 2 de navegador
  1180x740), uma por arquivo, nomeadas pela página do pacote `cih`.
- `capitulos/prototipo.tex`: seção pronta com 7 figuras e as decisões de projeto da
  interface registradas (erro junto ao campo, comando desabilitado pela RI-4, entrada
  por seleção, resumo antes do compromisso, estado do sistema visível, emergência no
  topo da fila, motivo obrigatório na reprovação).
- `prototipo/index.html`: visualizador offline de todas as telas.
- `bibliografia-adicional.bib`: entradas para resolver as 8 citações `(??)`
  (Falbo, Bass et al., GoF e Cohn).
- `COMO-ATUALIZAR-O-DOCUMENTO.md`: passo a passo no Overleaf + lista de
  inconsistências do documento atual.

### Simplificações assumidas (e o que fica pendente)
- **Protótipo sem navegação clicável.** A especificação pede protótipo *não
  funcional*, então as telas são imagens. Fica pendente, se o time quiser: refazer em
  Figma com protótipo navegável e publicar o endereço no documento.
- **Telas cobertas: 14 das ~17 user stories.** Ficaram de fora telas secundárias
  (mural de fotos e conquistas, convites de compartilhamento, solicitações pendentes
  do passeador, detalhe/atendimento de chamado). As páginas existem nas Tabelas 14 a
  16 e nos diagramas da CIU; só não têm imagem no protótipo.
- **Nenhum arquivo do Overleaf foi alterado.** Não havia acesso ao fonte `.tex`
  (só ao PDF compilado), então a entrega traz arquivos novos + instruções de
  substituição em vez de um diff. O `prototipo.tex` referencia rótulos
  (`tab:paginas-perfis`, `sec:perfis-usuario` etc.) que podem não existir ainda.
  — *Superado na segunda parte desta mesma data: o fonte chegou e os arquivos
  foram editados de fato.*
- **Exercício em draw.io, não em Astah.** O professor distribuiu o modelo em `.asta`;
  o Astah não está instalado. Os diagramas foram redesenhados em draw.io e vão junto
  em `.drawio` editável.

## 2026-10-21 (segunda parte) — fonte LaTeX recebido: correções aplicadas direto

O usuário exportou o projeto do Overleaf (`ES2_2026_2_HappyPaws.zip`), o que permitiu
editar os `.tex` em vez de só dar instruções. Resultado em `t3/overleaf-atualizado/`
(+ zip) e diff em `t3/ALTERACOES.diff`.

- **As 4 figuras pendentes** entraram em `figuras/`. Descoberta: o Capítulo 7 define o
  macro `\figciu`, que desenha a caixa "[Diagrama pendente]" quando o arquivo não
  existe — bastou colocar os arquivos para as caixas sumirem, sem tocar no texto.
- **`falbo:notas18`** foi acrescentada ao `bibliografia.bib`: a chave já era citada 8
  vezes no texto, mas não existia no `.bib`. Era a causa de todos os `(??)`.
- **`ch5-componentes` saiu da compilação** (comentado no `main.tex`): duplicava o
  Capítulo 6, usando as mesmas 8 imagens `ln-*.png`. As 6 referências do Capítulo 7
  que apontavam para lá foram remapeadas para as equivalentes do Capítulo 6.
- **Capa**: tabela de histórico de alterações (T1, T2, T3), com as datas do T1 e do T2
  por preencher.
- **`ch1`**: o parágrafo de organização do documento passou a citar os capítulos de
  lógica de negócio e de IHC.
- **`ch6`**: "via Socket.IO" → "por Server-Sent Events (SSE), conforme o RNF-3".
- **`ch7`**: `\input{capitulos/prototipo}` depois das táticas de usabilidade; tipos de
  documento alinhados com a Tabela de tipos enumerados; diagrama de sequência em
  página própria e girado 90° (7 linhas de vida não cabiam legíveis em retrato).
- **Protótipo**: telas 04 e 14 regeradas com os tipos de documento da Tabela 6
  (comprovante de residência no lugar de selfie).
- **Conferência sem compilar**: `ferramentas/t3_check_latex.py` verifica arquivos
  incluídos, `\label`/`\ref`, `\cite` × `.bib`, existência das figuras, ambientes e
  chaves. Passou limpo (66 labels, 3 entradas no `.bib`).

### Limites desta parte
- **Nada foi compilado.** Não há LaTeX nesta máquina; a verificação é estática.
- **Nada foi subido no Overleaf.** Não tenho acesso ao projeto; a transferência dos
  arquivos é manual.
- Os `\ref` do `prototipo.tex` foram ajustados para os rótulos reais do projeto
  (`tabela-ciu-perfis`, `tabela-enumerados`, `sec-ihc-usabilidade` etc.), que só
  ficaram conhecidos com o fonte em mãos.

## 2026-10-21 (terceira parte) — documento de requisitos de ES1: 5 correções a mais

O usuário forneceu o Documento de Especificação de Requisitos (ES1, 33 páginas),
o protótipo navegável (`https://happypawss.lovable.app`) e o repositório
`github.com/Eduardo-Ferraz/happy-paws-go`. Isso fechou os três pontos em aberto e
revelou um problema maior:

- **A Tabela de tipos enumerados do Capítulo 6 divergia dos requisitos E das próprias
  figuras do projeto** em 6 dos 16 tipos (`TipoDocumento`, `StatusValidacao`,
  `StatusConvite`, `TipoAgendamento`, `StatusPagamento`, `TipoChamado`). As figuras
  `ln-perfis-cdp.png`, `ln-servicos-cdp.png` e `ln-suporte-cdp.png` já estavam certas;
  só a tabela estava errada. Corrigida.
- **A correção que eu tinha feito antes (item 8 da 2ª parte) estava invertida**: eu
  alinhei o texto do Capítulo 7 à tabela, quando era a tabela que estava errada.
  Desfeita: os tipos de documento voltaram a ser RG, CNH, Selfie e CPF.
- **Matriz user story × perfil**: títulos trocados pelos das user stories de ES1
  (o próprio arquivo tinha um `% VERIFICAR` dizendo que tinham sido deduzidos das
  classes de aplicação); US10 ficou só com o Tutor e US12 só com o Passeador.
- **Faixas de figuras do documento de requisitos**: Gestão de Perfis é Figuras 1 a 7
  (não 1 a 6) e Serviços é 8 a 24 (não 7 a 24).
- **Protótipo**: a seção agora cita o protótipo navegável de ES1 e diz o que esta
  versão acrescenta. Telas 04, 06 e 14 regeradas — documentos RG/CNH/Selfie e busca
  por bairro, faixa de preço e porte do cão (CA07.1).

### Sobre subir no Overleaf pelo navegador
Três caminhos automáticos foram testados no painel embutido e **nenhum funciona**:
`fetch` e `iframe` para um servidor local são bloqueados pela CSP do Overleaf, e
`Ctrl+V` sintético não aciona a área de transferência real do sistema. O painel
embutido também não tem ferramenta de anexar arquivo (a extensão do Chrome tem).
A transferência dos arquivos fica manual (arrastar); a recompilação e a conferência
do PDF, essas sim, dá para fazer pelo painel.

## 2026-10-21 (quarta parte) — subido no Overleaf e compilado

O usuário subiu os arquivos; a verificação foi feita pelo painel do navegador.

- **`bibliografia.bib` foi o único que não subiu** na primeira tentativa (conferido
  baixando cada documento pelo endpoint `/project/:id/doc/:doc_id/download`, que é a
  forma confiável de ler o conteúdo de um arquivo no Overleaf — o editor virtualiza as
  linhas e engana a leitura pelo DOM). A entrada `falbo:notas18` foi digitada direto
  no editor, em uma linha só.
- **Compilação limpa:** 0 erros e 10 avisos benignos (`h`→`ht` de float e underfull
  hbox em tabelas). O primeiro passe ainda acusava as 8 citações indefinidas; depois de
  *Clear cached files* + *Recompile* (para o BibTeX rodar), zeraram.
- **Conferência do PDF:** 20 figuras (1 a 20), **nenhuma caixa "[Diagrama pendente]"**,
  protótipo nas Figuras 10 a 16, CIU nas 17, 18 e 20, diagrama de sequência na 19 em
  página própria e girado. Capa com o histórico de alterações.
- Numeração final: Capítulo 5 = lógica de negócio, Capítulo 6 = interação
  humano-computador (o antigo Capítulo 5 saiu da compilação).

## 2026-10-30 — correções da T3 antes da entrega

Revisão do Capítulo 6 contra a especificação, os diagramas e o protótipo.

### Diagramas
- **CIU dos três subsistemas refeitos** (`ciu-*.drawio`/`.png`), mesmo estilo, com
  rotas ortogonais. Gestão de Perfis: links Login → CadastroPasseador e
  MeusCachorros → Convites, EnvioDocumentos → ModoTrabalho e os redirecionamentos
  depois de cadastro, de salvar o cão, de aceitar convite e de decidir a validação.
  Serviços: `consultarTrajeto` no `ExecucaoPasseioController` (usado no diagrama de
  sequência), operações do `AgendamentoController` com os mesmos nomes da Apl,
  `listarFotosMural` em `AplConquistas`, `PagamentoController` volta para
  MeusAgendamentos, links de MeusAgendamentos para Pagamento, Execução,
  Acompanhamento e Avaliação, `RastreadorGps` como composição da página; saiu o
  "(Figura 15)" errado da nota. Suporte: o notificador é chamado pela
  `AplAtendimento` (não pelo controlador) e entrou o `EventosSuporteHandler` (SSE).
- **CGT** (`ln-*-cgt`): operações de consulta usadas pela CIU (`consultarPerfil`,
  `listarConvites`, `consultarValidacao`, `consultarModoTrabalho`,
  `consultarAgendamento`, `listarFotosMural`, `consultarChamado`);
  `AplAgendamento` alargada (texto cortado) e dependência para o notificador sem
  cruzar o `GatewayPagamento`.

### Documento
- Capítulo 5: Tabela 4 com `AplModoTrabalho`; Tabelas 6, 7 e 8 com as operações
  que faltavam; `buscarPasseadores` com os filtros do CA07.1.
- Capítulo 6: texto alinhado aos diagramas; notação com dependência, composição e
  links de menu; busca pelos filtros do CA07.1; chat do propósito registrado como
  fora do projeto; "Esqueci minha senha" ligado ao Better Auth.
- `main.tex`: `placeins` com `\FloatBarrier` só no Capítulo 6 (as figuras do
  protótipo caíam no meio da seção 6.4, porque o `\clearpage` estava desativado no
  grupo dos capítulos) e o `\endgroup` que faltava. Histórico 3.0 registra a
  atualização do CGT.
- Protótipo: o link principal passa a ser o das telas desta revisão (raw.githack
  sobre `prototipo/index.html`); o Lovable fica citado como versão de ES1.

### Protótipo
- Tela 05: sem "Especialidades" (não está na US06). Tela 09: "Falar com o
  passeador" virou "Relatar um problema ao suporte" (chat não tem user story).
  Tela 12: descrição e anexo sem chat. Telas 13 e 14: sem o item "Indicadores".
  Tela 14: documentos iguais aos da tela 04 (RG, CNH, Selfie).
- Folhas regeradas em PNG (2,5x) pelo navegador, por falta de conversor SVG → PDF;
  os PDFs antigos das folhas foram removidos.

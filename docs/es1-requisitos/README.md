# ES1 — Especificação e Análise de Requisitos (2025/2)

Disciplina: **Engenharia de Software I**, Profa. Monalessa Perini Barcellos — UFES.
Grupo 7: Eduardo Capobiango Ferraz, Mateus Biancardi da Silva, Miguel Zon Murad,
Rafaela Fernanda Pereira Sousa e Sofia Morais Sarcinelli.

## Conteúdo

- [`requisitos.md`](requisitos.md) — documentação de requisitos em Markdown: propósito
  do sistema, visão geral do minimundo, as 17 user stories com seus critérios de
  aceitação, os 5 requisitos não funcionais e a modelagem conceitual (subsistemas,
  casos de uso e diagramas de classes).

O documento oficial entregue na disciplina (com as 30 telas do protótipo e os
diagramas de classes, Figuras 31 a 37) é o arquivo
`TrabalhoESI-2025-2-Grupo7.pdf`, mantido fora deste repositório por conter dados de
contato dos integrantes.

## Protótipo navegável

O protótipo construído nesta fase é a própria aplicação deste repositório:

- no ar: <https://happypawss.lovable.app>
- código: [`../../src`](../../src) (React + Vite + shadcn/ui, gerado no Lovable)

As telas do protótipo aparecem no documento oficial como **Figuras 1 a 30**, assim
distribuídas:

| Figuras | Assunto | User stories |
|---|---|---|
| 1 a 7 | Cadastros (tutor, pet, passeador), perfil validado, compartilhamento de pet e modo de trabalho | US01 a US06 |
| 8 a 24 | Busca, agendamento, monitoramento por GPS, fotos, conquistas, pagamento e avaliação | US07 a US15 |
| 25 a 30 | Suporte (chamados) e central de atendimento | US16 e US17 |

Essa numeração é usada pelo documento de projeto de ES2 quando ele se refere às telas
de origem de cada subsistema.

## Tipos de domínio definidos em ES1

Estes valores são a referência para os tipos enumerados do projeto de ES2
(seção 5.3 do documento de requisitos):

- `PorteCachorro`: Pequeno, Médio, Grande
- `StatusValidacao`: Em Análise, Validado, Reprovado
- `TipoDocumento`: RG, CNH, Selfie, CPF
- `StatusAgendamento`: Confirmado, Pendente, Concluído, Cancelado
- `StatusPagamento`: Pago, Recusado, Processando
- `TipoAgendamento`: Avulso, Recorrente
- `StatusPasseio`: Realizado, Em_Andamento
- `DiasSemana`: Segunda a Domingo
- `FormaPagamento`: Cartão, Pix
- `TipoChamado`: Financeiro, Técnico, Emergência, Denúncia (o CA16.1 acrescenta Outros)

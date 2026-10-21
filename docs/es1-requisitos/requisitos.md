# Documentação do Sistema: Happy Paws

**Grupo 7**
* **Curso:** Ciência da Computação / Engenharia da Computação - UFES
* **Disciplina:** Engenharia de Software I (2025/2)
* **Profa.:** Monalessa Perini Barcellos
* **Alunos:**
    * Eduardo Capobiango Ferraz
    * Mateus Biancardi da Silva
    * Miguel Zon Murad
    * Rafaela Fernanda Pereira Sousa
    * Sofia Morais Sarcinelli

---

## 1. Introdução
Este documento apresenta os resultados da fase de Especificação e Análise de Requisitos do sistema **Happy Paws**. O documento abrange o propósito do sistema, visão geral do minimundo, requisitos de usuário (User Stories), requisitos não funcionais e a modelagem conceitual.

## 2. Propósito do Sistema
O sistema tem como propósito gerenciar o ciclo completo de intermediação e contratação de serviços de passeio para cães.

**Principais Funcionalidades:**
* Cadastro e validação de perfis (tutores, animais e passeadores).
* Buscas filtradas por geolocalização e especialidade.
* Agendamento de passeios (avulsos ou recorrentes).
* Monitoramento em tempo real via GPS.
* Comunicação direta (chat) e mural de atividades (fotos).
* Gestão de pagamentos e avaliações.

## 3. Visão Geral do Minimundo
O **Happy Paws** atua na intermediação entre tutores e *Dog Walkers*. O sistema visa resolver a falta de confiança e dificuldade de monitoramento enfrentada pelos tutores.

* **Tutores:** Podem cadastrar um ou mais cães (com informações de alergias, medos, etc.). Um cão pode ser compartilhado entre múltiplos tutores.
* **Passeadores:** Passam por validação rigorosa de identidade, definem precificação própria e limite de cães simultâneos.
* **Fluxo:** O tutor busca passeadores -> Agenda passeio -> Passeador aceita/recusa -> Execução com rastreamento GPS -> Pagamento -> Avaliação.
* **Gamificação:** O sistema atribui conquistas ao pet baseadas no histórico de atividades.

---

## 4. Requisitos de Usuário (User Stories)

### US01: Cadastro de Tutor
**Como:** Tutor
**Quero:** Cadastrar meus dados pessoais e meu perfil
**Prioridade:** Alta

* **Critérios de Aceitação:**
    * [CA01.1] Devem ser informados: nome completo, e-mail, telefone, endereço e CPF.
    * [CA01.2] Sucesso exibe mensagem: "Perfil criado com sucesso".
    * [CA01.3] Bloquear registro duplicado de CPF ou e-mail.
    * [CA01.4] Campos obrigatórios não preenchidos devem ser destacados em vermelho.

### US02: Cadastro de Pet
**Como:** Tutor
**Quero:** Cadastrar o perfil do meu cão
**Prioridade:** Alta
**Dependência:** US01

* **Critérios de Aceitação:**
    * [CA02.1] Campos: nome, tipo (raça), tamanho (pequeno, médio, grande), idade, restrições (alergias, medos).
    * [CA02.2] Sucesso exibe: "Perfil de cachorro criado com sucesso".
    * [CA02.3] Validar campos obrigatórios.

### US03: Cadastro de Passeador
**Como:** Passeador
**Quero:** Cadastrar meus dados profissionais
**Prioridade:** Alta

* **Critérios de Aceitação:**
    * [CA03.1] Campos: nome completo, CPF, endereço, telefone, e-mail, biografia/experiência.
    * [CA03.2] Informar preço/hora e limite máximo de cães simultâneos.
    * [CA03.3] Sucesso exibe mensagem de confirmação.
    * [CA03.4] Bloquear duplicidade de CPF/e-mail.
    * [CA03.6] Acesso liberado apenas após validação de documentos (ver US04).

### US04: Validação de Documentos
**Como:** Passeador
**Quero:** Enviar documentos para validar meu perfil
**Prioridade:** Alta
**Dependência:** US03

* **Critérios de Aceitação:**
    * [CA04.1] Enviar: Foto do documento (RG/CNH), CPF e selfie (prova de vida).
    * [CA04.2] Envio altera status para "em análise".
    * [CA04.3] Aprovação altera status para "validado" (visível nas buscas).
    * [CA04.4] Reprovação envia mensagem com motivo.
    * [CA04.5] Processamento do upload em até 10 segundos.

### US05: Compartilhamento de Perfil de Pet
**Como:** Tutor
**Quero:** Compartilhar o perfil do cão com outro usuário
**Prioridade:** Baixa

* **Critérios de Aceitação:**
    * [CA05.1] Informar e-mail do tutor convidado.
    * [CA05.2] Status inicial "pendente".
    * [CA05.3] Aceite muda status para "ativo" (cão aparece para ambos).
    * [CA05.4] Agendamentos notificam ambos os tutores.

### US06: Definição de Modo de Trabalho
**Como:** Passeador
**Quero:** Definir preço e capacidade
**Prioridade:** Alta

* **Critérios de Aceitação:**
    * [CA06.1] Obrigatório: Valor (R$/h) e Qtd. Máxima de animais.
    * [CA06.2] Validar valores negativos ou zero.
    * [CA06.3] Limite atingido = Status "indisponível" para o horário.
    * [CA06.4] Alterações não afetam agendamentos já confirmados.

### US07: Pesquisa de Passeadores
**Como:** Tutor
**Quero:** Pesquisar passeadores
**Prioridade:** Alta

* **Critérios de Aceitação:**
    * [CA07.1] Filtros: Bairro, Faixa de Preço, Porte do Cão.
    * [CA07.2] Exibir apenas quem atende *todos* os filtros.
    * [CA07.3] Mensagem caso nenhum seja encontrado.
    * [CA07.4] Tempo de resposta da busca: até 3 segundos.

### US08: Agendamento de Passeio
**Como:** Tutor
**Quero:** Agendar um passeio único
**Prioridade:** Alta

* **Critérios de Aceitação:**
    * [CA08.1] Informar: Cão, Passeio, Data, Horário Início, Duração.
    * [CA08.2] Status inicial "pendente".
    * [CA08.3] Validar disponibilidade (conflito de agenda/limite de cães).
    * [CA08.4] Aceite do passeador notifica tutor em até 5s.

---

## 5. Modelagem do Sistema

### 5.3.3 Subsistema Suporte

Abaixo está a representação das classes e tipos de dados identificados para o subsistema de suporte.

#### Entidade: Chamado
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `tipo` | `TipoChamado` | Categoria do chamado |
| `descricao` | `String` | Detalhamento da solicitação |
| `status` | `String` | Estado atual do chamado |
| `protocolo` | `int` | Número único de identificação |
| `data` | `timestamp` | Data e hora de abertura |

#### Enumeração: TipoChamado
Valores permitidos para o atributo `tipo` na classe Chamado:
* `FINANCEIRO`
* `TECNICO`
* `EMERGENCIA`
* `DENUNCIA`

```mermaid
classDiagram
    class Chamado {
        +TipoChamado tipo
        +String descricao
        +String status
        +int protocolo
        +timestamp data
    }

    class TipoChamado {
        <<enumeration>>
        FINANCEIRO
        TECNICO
        EMERGENCIA
        DENUNCIA
    }

    Chamado ..> TipoChamado
# Código da IA sob inspeção: Controle de Irrigação Automatizada

**Dupla:** João Paulo e Francisco  
**Disciplina:** Teste e Qualidade de Software — ADS, IFCE Campus Boa Viagem  
**Ferramentas de IA utilizadas:** Gemini e ChatGPT

## Estrutura do repositório

| Arquivo | Conteúdo |
|---|---|
| `requisitos.md` | Especificação do sistema, fornecida para a atividade |
| `src/irrigacao.js` | Código gerado pela IA e eventuais correções, quando realizadas |
| `test/irrigacao.test.js` | Casos de teste da dupla |
| `evidencias/` | Testes da Parte 2.6 e outras evidências |
| `depoimento.md` | Depoimento oficial do professor para a Parte 3, quando disponibilizado |
| `prompts.md` | Registro das interações e do uso de IA |
| `README.md` | Relatório da atividade |

Para executar os testes da dupla, utilizar `npm test` com Node.js 18 ou superior.

---

## Parte 1: o código gerado pela IA

- **Link do commit com o código original:** [Código original gerado pela IA — commit `893018e`](https://github.com/JoaoPaulo-dev20/inspecao-ia-cenario-joao-paulo-francisco/commit/893018e02c493ba291270ee5a9568793d5da2ab5).
- **A IA fez alguma pergunta ou apontou alguma ambiguidade antes de implementar?** Pendente de confirmação pela dupla, com base no histórico da conversa utilizada na geração.
- **Que decisões a IA tomou sozinha, sem perguntar?** Pendente de confirmação pelo histórico dos prompts. O código implementado contém decisões de tratamento de entradas, como rejeitar leituras que não sejam objetos válidos, verificar tipos numéricos e valores `NaN`, e retornar `null` quando a entrada de `mediaUmidade` não é um array. A dupla precisa identificar quais dessas decisões foram ou não discutidas no momento da geração.

**Conferência do código:** o conteúdo de `src/irrigacao.js` na branch `testes-francisco`, consultado no GitHub em 20/10/2026, corresponde ao conteúdo do commit original identificado acima. A cópia local deve continuar sem alterações nesse arquivo até o encerramento da inspeção do código original.

## Parte 2: verificação

A verificação busca responder: **“O código faz o que a especificação determina?”**

### 2.1 Divisão dos testes

| Integrante | Funções sob sua responsabilidade |
|---|---|
| Francisco | `validarLeitura` e `mediaUmidade` |
| João Paulo | `decidirBomba` e `verificarAlertas` |

**Observação:** a divisão deve ser confirmada pela dupla. Francisco executou também um teste preliminar de `decidirBomba` (`AUT03`), mas a função permanece na parte destinada ao João Paulo.

### 2.2 Casos de teste

A atividade exige **pelo menos 24 casos no total e pelo menos cinco por função**, contemplando limites, entradas inválidas, arredondamento e combinações de regras. Os resultados abaixo correspondem às execuções informadas em 20/10/2026.

#### Resultados da parte de Francisco

| ID | Função | Requisito | Entrada | Resultado esperado | Resultado obtido | Passou? |
|---|---|---|---|---|---|---|
| EX01 | `validarLeitura` | RF01–RF02 | Umidade 35%; temperatura 28 °C | `true` | `true` | Sim |
| V01 | `validarLeitura` | RF02 | Umidade 101%; temperatura 28 °C | `false` | `false` | Sim |
| V02 | `validarLeitura` | RF02 | Umidade 0%; temperatura 28 °C | `true` | `true` | Sim |
| V03 | `validarLeitura` | RF02 | Umidade 100%; temperatura 28 °C | `true` | `true` | Sim |
| V04 | `validarLeitura` | RF02 | Umidade -1%; temperatura 28 °C | `false` | `false` | Sim |
| V05 | `validarLeitura` | RF02 | Umidade 35%; temperatura -10 °C | `true` | `true` | Sim |
| V06 | `validarLeitura` | RF02 | Umidade 35%; temperatura 60 °C | `true` | `true` | Sim |
| V07 | `validarLeitura` | RF03 | Umidade 35%; temperatura -127 °C | `false` | `false` | Sim |
| V08 | `validarLeitura` | RF03 | Umidade `NaN`; temperatura 28 °C | `false` | `false` | Sim |
| M01 | `mediaUmidade` | RF05–RF06 | Umidades 20, 30 e 40%; temperaturas 28 °C | `30` | `30` | Sim |
| M02 | `mediaUmidade` | RF06 | Apenas duas leituras válidas: 20 e 40% | `null` | `null` | Sim |
| M03 | `mediaUmidade` | RF04–RF05 | Umidades 100, 10, 20, 30, 40 e 50%; todas válidas | `30` | `30` | Sim |
| M04 | `mediaUmidade` | RF05 | Umidades 20, 100, 40, -1 e 60%; a de 100% tem temperatura -127 °C e a de -1% é inválida | `40` | `40` | Sim |
| M05 | `mediaUmidade` | RF05 | Umidades 20, 20 e 21%; temperaturas 28 °C | `20.3` | `20.3` | Sim |
| M06 | `mediaUmidade` | RF04–RF06 | Seis leituras; somente duas válidas entre as últimas cinco | `null` | `null` | Sim |
| AUT01 | `validarLeitura` | RF01–RF02 | Umidade 90%; temperatura 30 °C | `true` | `true` | Sim |
| AUT02 | `validarLeitura` | RF02 | Umidade 90%; temperatura 61 °C | `false` | `false` | Sim |

**Resultado parcial de Francisco:** 17 casos executados, 17 aprovados e nenhuma falha nesses casos.

O caso `EX01` já fazia parte do template. Os casos `V01`–`V08` e `M01`–`M06` foram preparados com apoio de IA. Os casos `AUT01` e `AUT02` foram construídos durante a atividade com orientação da IA. O uso desse apoio deve permanecer documentado em `prompts.md`.

**Comando de execução da parte de Francisco:**

```powershell
node --test --test-name-pattern="^(EX01|V0[1-8]|M0[1-6]|AUT0[12]):" .\test\irrigacao.test.js
```

**Saída registrada:** `tests 17`, `pass 17`, `fail 0`.

#### Testes preliminares relacionados à parte de João Paulo

| ID | Função | Requisito | Entrada | Resultado esperado | Resultado obtido | Passou? |
|---|---|---|---|---|---|---|
| EX02 | `decidirBomba` | RF10 e RF12 | (desligada, 25%, 0 min) e (ligada, 35%, 20 min) | `LIGAR` e `MANTER` | `LIGAR` e `MANTER` | Sim |
| AUT03 | `decidirBomba` | RF08 | Bomba ligada; umidade 20%; 60 min ligada | `DESLIGAR` | `DESLIGAR` | Sim |

O caso `EX02` já fazia parte do template. O caso `AUT03` foi acrescentado e executado por Francisco com orientação da IA. Esses dois casos **não substituem** a elaboração e a revisão dos casos sob responsabilidade de João Paulo.

**Execução geral registrada:** `npm test` apresentou `tests 19`, `pass 19`, `fail 0`.

**Distribuição atual:**

| Função | Casos existentes | Mínimo exigido | Situação |
|---|---:|---:|---|
| `validarLeitura` | 11 | 5 | Mínimo atingido |
| `mediaUmidade` | 6 | 5 | Mínimo atingido |
| `decidirBomba` | 2 | 5 | Faltam 3 casos |
| `verificarAlertas` | 0 | 5 | Faltam 5 casos |
| **Total** | **19** | **24** | **Faltam pelo menos 8 casos para respeitar também o mínimo por função** |

**Resultado geral no código original:** pendente de consolidação após os testes restantes, a revisão cruzada e a confirmação de que o arquivo local `src/irrigacao.js` permaneceu igual ao commit original. Os resultados apresentados até agora não comprovam ausência de outros defeitos.

### 2.3 Revisão cruzada dos testes

A revisão cruzada ainda não foi concluída. Os testes apresentados acima foram executados antes dessa revisão, que deverá verificar resultados esperados, casos repetidos, limites e cobertura dos requisitos.

| Revisor | O que encontrou nos testes do colega | O que mudou |
|---|---|---|
| João Paulo (revisão dos testes de Francisco) | Pendente | Pendente |
| Francisco (revisão dos testes de João Paulo) | Pendente | Pendente |

### 2.4 Defeitos encontrados

Até esta etapa, **nenhum defeito foi identificado pelos casos já executados**. A inspeção continua em andamento; eventuais defeitos deverão ser registrados com causa no código, sintoma observado e requisito violado.

| # | Função | Defeito (causa no código) | Falha (sintoma) | Requisito violado |
|---|---|---|---|---|
| — | — | Pendente de identificação | — | — |

### 2.5 Correções

**Situação:** nenhuma correção decorrente dos testes acima foi registrada nesta etapa. A dupla deverá primeiro concluir os testes, a revisão cruzada e a identificação dos defeitos. Caso haja defeitos, as correções deverão ser explicadas e registradas em commits separados, preferencialmente um por defeito, sem perder a referência ao código original.

### 2.6 Os testes da IA

**Situação: pendente.** Esta etapa é diferente dos testes da dupla que foram preparados com apoio de IA. Será necessário solicitar à IA testes para o código que ela mesma escreveu, registrar o prompt em `prompts.md`, salvar os casos em `evidencias/testes-gerados-pela-ia.js` e executá-los contra a versão original do código.

**Comando previsto:**

```powershell
node --test evidencias/testes-gerados-pela-ia.js
```

- **Quantos testes a IA gerou especificamente para esta etapa?** Pendente.
- **Quantos dos defeitos encontrados pela dupla esses testes detectaram?** Pendente.
- **Por que isso aconteceu?** Pendente de análise comparativa entre os testes da dupla e os testes gerados pela IA, considerando como a IA determinou os resultados esperados.

## Parte 3: validação

**Situação: não concluída.** A validação responde à pergunta: **“O código resolve o problema real?”** A dupla deve utilizar o depoimento **oficial publicado pelo professor no Classroom**. Um depoimento simulado para estudo não substitui esse material.

### 3.1 Divergências

| # | Necessidade real (depoimento) | O que a especificação diz | O código atende? | Característica da ISO/IEC 25010 envolvida |
|---|---|---|---|---|
| 1 | Pendente | Pendente | Pendente | Pendente |
| 2 | Pendente | Pendente | Pendente | Pendente |
| 3 | Pendente | Pendente | Pendente | Pendente |
| 4 | Pendente | Pendente | Pendente | Pendente |
| 5 | Pendente | Pendente | Pendente | Pendente |

### 3.2 Requisitos revisados

**Pendente:** após a leitura do depoimento oficial, reescrever os requisitos que precisarem mudar e propor novos requisitos, com identificação e justificativa. Não é necessário implementar essas mudanças nesta parte.

### 3.3 Reflexão

**Pendente:** discutir se as divergências encontradas estão no código, na especificação ou na relação entre os dois, e por que os testes de verificação da Parte 2 poderiam ou não identificá-las.

## Parte 4: o código à luz da ISO/IEC 25010

**Situação: avaliação pendente.** A dupla deverá avaliar o código **original** da IA com evidências concretas extraídas do código e dos resultados dos testes, sem atribuir defeitos ainda não demonstrados.

| Característica | Subcaracterística | Avaliação | Evidência |
|---|---|---|---|
| Adequação funcional | Pendente | Pendente | Pendente |
| Confiabilidade | Pendente | Pendente | Pendente |
| Manutenibilidade | Pendente | Pendente | Pendente |
| Capacidade de interação (2023) | Pendente | Pendente | Pendente |
| Segurança (*security*) ou *safety* (2023) | Pendente | Pendente | Pendente |

## Parte 5: garantia da qualidade (QA)

**Situação: pendente.** Propor três práticas de processo para uma equipe que utiliza IA na geração de código, relacionando cada prática a um defeito ou divergência efetivamente identificado na atividade.

1. **Prática 1:** pendente de identificação e justificativa.
2. **Prática 2:** pendente de identificação e justificativa.
3. **Prática 3:** pendente de identificação e justificativa.

## Parte 6: o que a IA errou

**Situação: pendente.** Registrar afirmações, suposições ou defeitos observados, com classificação e evidência, sem presumir que todo resultado produzido pela IA esteja errado.

| # | O que a IA fez ou afirmou | Classificação | Evidência |
|---|---|---|---|
| 1 | Pendente | Pendente | Pendente |
| 2 | Pendente | Pendente | Pendente |
| 3 | Pendente | Pendente | Pendente |

**Reflexão final (um parágrafo por integrante):**

- **Francisco:** pendente — como passaria a usar IA para gerar código depois desta atividade?
- **João Paulo:** pendente — como passaria a usar IA para gerar código depois desta atividade?

## Parte 7: divisão do trabalho

| Parte | Responsável principal | Participação do outro integrante |
|---|---|---|
| Parte 1 | A confirmar pela dupla | A confirmar |
| Parte 2 | Francisco: `validarLeitura` e `mediaUmidade`; João Paulo: `decidirBomba` e `verificarAlertas` | Revisão cruzada pendente |
| Parte 3 | A definir pela dupla | A definir |
| Partes 4 a 6 | A definir pela dupla | A definir |

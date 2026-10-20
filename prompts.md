# Registro do uso da IA

**Dupla:** [nomes]
**Atividade:** Código da IA sob inspeção: Controle de Irrigação Automatizada
**Ferramenta(s) usada(s):** [ex.: ChatGPT, Claude, Gemini, Copilot; indique a versão ou o plano, se souber]

> Registre todos os prompts relevantes, na ordem em que foram usados. Obrigatórios: o prompt que gerou o código (Parte 1) e o prompt que gerou os testes da IA (Parte 2.6). Não é preciso colar a resposta inteira da IA: resuma o que ela respondeu e diga o que você fez com isso.

---

## Prompt 1

**Data:** [dd/mm/aaaa]

**Prompt:**

```
[cole aqui o texto exato que você enviou]
```

**Resumo da resposta:** [o que a IA respondeu, em 2 ou 3 linhas]

**O que fiz com isso:** [usei o código? testei? corrigi? descartei por quê?]

---

## Prompt 2

**Data:** [dd/mm/aaaa]

**Prompt:**

```
[cole aqui]
```

**Resumo da resposta:** [ ]

**O que fiz com isso:** [ ]

---

*(copie o bloco acima para cada novo prompt)*

---

## Exemplo de depoimento fictício para estudo

**Data:** 20/10/2026.

**Ferramenta:** ChatGPT.

**Prompt do usuário:**

```text
Não tem outro anexo, da pra você criar um depoimento?
```

**Resumo da resposta:** criação de um exemplo fictício de relato sobre irrigação, explicitamente identificado como simulação. O texto não corresponde a entrevista real nem ao depoimento fornecido pelo professor.

**Continuação do usuário:**

```text
Confio em você, pode ser esse
```

**Uso da resposta:** exemplo escolhido pelo usuário e salvo em `depoimento-simulado.md` como material de estudo. A aceitação desse texto pelo professor não foi confirmada. A publicação deste exemplo não conclui a Parte 3, que depende do material exigido pelo professor ou de uma substituição aceita por ele.

---

## Preparação assistida das propostas de testes

**Data:** 20/10/2026.

**Ferramenta:** ChatGPT.

**Solicitação do usuário (resumo):** preparar testes para as quatro funções, com explicações claras, linguagem natural e organização conforme a sequência da atividade.

**Trecho do prompt:**

> deixe tudo bem humanizado e explicado de forma humana, siga tudo de acordo e em ordem que o professor pediu

**Resumo da resposta:** criação de 48 propostas a partir de `requisitos.md`, com 12 casos por função. Foram incluídos valores de fronteira, falhas de sensores, arredondamento, janela das cinco leituras recentes, prioridade da segurança e combinações de alertas. As propostas e o roteiro foram identificados como material criado com apoio de IA, separado dos testes próprios da dupla e dos 28 testes da IA publicados anteriormente.

**Uso da resposta:** material de estudo salvo em `evidencias/casos-propostos-ia.js`, `evidencias/propostas-de-testes-ia.js` e `evidencias/roteiro-de-verificacao.md`. A dupla ainda precisa elaborar seus testes próprios, definir a divisão e realizar a revisão cruzada. Nenhuma atividade de autoria ou revisão foi atribuída aos integrantes pelo assistente.

**Validação realizada nesta preparação:** verificação de sintaxe dos dois arquivos JavaScript, conferência de 48 IDs únicos e de 12 casos por função, sem importar o módulo de irrigação. Estas propostas não foram executadas contra o código; os resultados obtidos e a tabela de defeitos continuam pendentes de revisão e execução.

Este registro complementar não preenche os prompts obrigatórios das Partes 1 e 2.6 que permanecem pendentes acima.

---

## Revisão simulada para estudo e execução técnica da IA

**Data:** 20/10/2026.

**Ferramenta:** ChatGPT.

**Solicitação do usuário (resumo):** elaborar o material técnico e uma revisão simulada para pesquisa ou estudo.

**Resumo da resposta:** a mesma IA examinou os casos por duas perspectivas didáticas, uma voltada aos requisitos e outra à estrutura e à cobertura dos testes. As perspectivas foram identificadas como simulação, sem atribuição de ações a estudantes ou alegação de revisão humana independente.

**Execução realizada:** 48 de 48 casos de apoio e 28 de 28 testes anteriores da IA passaram contra o código original. A saída real, a versão do Node e a identificação do código estão em `evidencias/resultados-execucao-apoio-ia.txt`. Nenhuma correção no módulo foi necessária para essas execuções.

**Uso da resposta:** revisão registrada em `evidencias/revisao-simulada-ia.md` e roteiro atualizado com os resultados comprovados pelas asserções. Os dois conjuntos têm casos sobrepostos e a execução não comprova ausência de defeitos. Os testes próprios, a revisão humana e as análises exigidas dos integrantes continuam pendentes.

---

## Balanço final

- **Total de prompts registrados:** [número]
- **Prompt que mais ajudou e por quê:** [ ]
- **Prompt que gerou a resposta mais problemática e por quê:** [ ]
- **Se eu fizesse de novo, perguntaria à IA de outra forma assim:** [ ]

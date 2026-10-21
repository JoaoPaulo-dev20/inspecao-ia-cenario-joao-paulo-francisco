# Registro do uso da inteligência artificial

**Dupla:** Francisco de Assis Vieira Filho e João Paulo
**Atividade:** Código da IA sob inspeção — Controle de Irrigação Automatizada
**Disciplina:** Teste e Qualidade de Software — ADS, IFCE Campus Boa Viagem
**Ferramentas utilizadas ao longo do trabalho:** ChatGPT e Gemini (a ferramenta específica de cada interação deve ser confirmada quando não houver registro).

> **Critério de registro:** os textos apresentados como *prompt literal* foram preservados conforme os registros disponíveis. Pedidos descritos apenas em resumo não são transcrições literais. Não atribuímos aos estudantes revisões ou decisões realizadas apenas pela IA.

## 1. Prompt que gerou o código original — Parte 1

**Data do commit:** 20/10/2026.
**Ferramenta utilizada nessa geração:** a confirmar com quem enviou o pedido.
**Prompt exato enviado à IA:** **PENDENTE — localizar e copiar da conversa em que o código foi originalmente gerado.**

**Resumo da resposta:** a IA produziu uma implementação em JavaScript das funções `validarLeitura`, `mediaUmidade`, `decidirBomba` e `verificarAlertas`, a partir da especificação `requisitos.md`.

**O que foi feito:** o código foi registrado no commit [Código original gerado pela IA](https://github.com/JoaoPaulo-dev20/inspecao-ia-cenario-joao-paulo-francisco/commit/893018e02c493ba291270ee5a9568793d5da2ab5). Essa implementação foi preservada como referência para os testes da atividade.

**Atenção:** a descrição acima **não substitui o prompt literal**, exigido pelo professor.

## 2. Prompt que gerou os testes da própria IA — Parte 2.6

**Data de criação dos arquivos:** 20/10/2026.
**Ferramenta e prompt exato:** **PENDENTES — recuperar a conversa em que foram solicitados os testes da IA.**

**Resumo da resposta:** foi criado o conjunto `evidencias/testes-gerados-pela-ia.js`, com 28 testes referentes às quatro funções.

**O que foi feito:** Francisco executou, em 21/10/2026, o comando:

```powershell
node --test .\evidencias\testes-gerados-pela-ia.js
```

**Resultado informado pelo terminal:** 28 testes executados, 28 aprovados e nenhuma falha. Esse conjunto é diferente dos testes da dupla e das 48 propostas complementares elaboradas com apoio de IA.

**Atenção:** o prompt literal que solicitou esse conjunto continua sendo um item obrigatório não preenchido.

## 3. Exemplo de depoimento fictício usado para estudo

**Data:** 20/10/2026.
**Ferramenta:** ChatGPT.

**Prompt literal:**

```text
Não tem outro anexo, da pra você criar um depoimento?
```

**Continuação literal:**

```text
Confio em você, pode ser esse
```

**Resumo da resposta:** a IA produziu um depoimento fictício, identificado como simulação de estudo.

**O que foi feito:** o exemplo ficou em `depoimento-simulado.md`. Posteriormente, a dupla recebeu o depoimento atribuído ao professor e o colocou em `depoimento.md` para a Parte 3. A simulação não foi apresentada como depoimento oficial.

## 4. Preparação de propostas adicionais de testes

**Data:** 20/10/2026.
**Ferramenta:** ChatGPT.
**Solicitação, conforme o registro anterior:** preparar testes para as quatro funções, com explicações e organização segundo a atividade.

**Trecho literal disponível do pedido:**

```text
deixe tudo bem humanizado e explicado de forma humana, siga tudo de acordo e em ordem que o professor pediu
```

**Resumo da resposta:** foram criadas 48 propostas, 12 para cada função, incluindo valores de fronteira, falhas de sensores, arredondamento, seleção das cinco leituras recentes e combinações de alertas.

**O que foi feito:** os materiais de apoio foram armazenados em `evidencias/casos-propostos-ia.js`, `evidencias/propostas-de-testes-ia.js` e `evidencias/roteiro-de-verificacao.md`. Essas propostas **não foram apresentadas como casos produzidos independentemente pelos estudantes**.

## 5. Revisão simulada pela IA e execução técnica de material de apoio

**Data:** 20/10/2026.
**Ferramenta:** ChatGPT.
**Solicitação registrada em resumo:** produzir material técnico e uma revisão simulada para estudo.

**Resumo da resposta:** a IA realizou uma revisão didática sob duas perspectivas. Essa revisão não equivale à revisão cruzada feita por Francisco e João Paulo.

**Resultados documentados em `evidencias/resultados-execucao-apoio-ia.txt`:** 48 de 48 propostas de apoio e 28 de 28 testes da IA passaram contra o código original, conforme os registros de execução salvos nesse arquivo.

**O que foi feito:** a revisão simulada foi registrada em `evidencias/revisao-simulada-ia.md`. Os casos têm sobreposições, e os resultados não provam que o software não possui defeitos.

## 6. Apoio na elaboração dos testes de Francisco

**Data:** 20/10/2026.
**Ferramenta:** ChatGPT.
**Solicitação registrada em resumo:** orientação passo a passo para elaborar testes de `validarLeitura` e `mediaUmidade`.

**Participação registrada:** Francisco escolheu a umidade `101` para um caso inicial. A IA sugeriu os demais cenários e escreveu os testes `V01` a `V08` e `M01` a `M06`, posteriormente executados e analisados pelo estudante.

**Execução posterior:** Francisco executou os casos de suas duas funções junto com `EX01`, `AUT01` e `AUT02`. O terminal mostrou **17 testes executados, 17 aprovados e 0 falhas**.

**Origem dos casos:** `EX01` já fazia parte do template. `V01`–`V08`, `M01`–`M06`, `AUT01` e `AUT02` tiveram apoio da IA. O apoio não deve ser ocultado.

## 7. Explicação sobre uma leitura de umidade 90 e temperatura 30

**Data:** 20/10/2026.
**Ferramenta:** ChatGPT.
**Valores escolhidos por Francisco:** umidade `90` e temperatura `30`.

**Prompt literal:**

```text
não sei o que botar, coloque o idela para mim, isso vai apenas me ajudar, estou aprendendo, então faça para eu aprender
```

**Autorização literal do registro:**

```text
certo, registre para eu aprender
```

**Resumo da resposta:** a IA explicou que os dois valores estão dentro dos limites de RF01/RF02 e que o resultado esperado de `validarLeitura` é `true`.

**O que foi feito:** o aprendizado foi inicialmente registrado para estudo. Posteriormente, o caso foi acrescentado como `AUT01`, executado e aprovado. Esta atualização substitui a anotação antiga de que o caso ainda não havia sido executado.

## 8. Apoio aos testes de João Paulo e revisão cruzada

**Período:** 20–21/10/2026.
**Prompts efetivamente enviados por João Paulo à IA:** **PENDENTES — incluir os pedidos originais ou o registro correspondente, caso ele tenha utilizado IA.**

**Trabalho verificado no repositório:** João Paulo acrescentou quatro testes de `decidirBomba` (`DB01`–`DB04`) e cinco de `verificarAlertas` (`VA01`–`VA05`) na branch `testes-joao-paulo`, por meio do Pull Request #3.

**Revisão humana realizada:** Francisco revisou esses testes e publicou no Pull Request #3 comentários sobre `DB01` e `DB04`. Ambos utilizavam a string `'DESLIGADA'` no lugar do booleano `false` especificado para o estado da bomba. Os comentários foram enviados, mas os casos permaneceram sem alteração por decisão de continuidade da dupla.

**Execução integrada em 21/10/2026:** `npm test` apresentou **28 testes, 27 aprovados e 1 falha**. No `DB01`, o resultado esperado foi `LIGAR`, mas o obtido foi `MANTER`. Como a entrada usada não respeita o tipo definido na especificação, a falha **não comprova um defeito no código original**. O `DB04` passou, embora também tenha utilizado uma string inadequada.

**Situação:** os testes de João Paulo foram integrados à branch `testes-francisco`. A revisão de João Paulo sobre os testes de Francisco só deve ser considerada concluída se houver registro ou confirmação de que ocorreu.

## 9. Apoio à documentação e validação

**Período:** 20–21/10/2026.
**Ferramenta:** ChatGPT.

**Solicitação registrada em resumo:** orientar, passo a passo, a organização do `README.md`, o registro dos resultados, a análise do depoimento, a ISO/IEC 25010, as práticas de QA e a divisão do trabalho.

**O que foi feito:** Francisco seguiu as orientações para estruturar as Partes 2 a 7 do relatório. A análise da Parte 3 usou o texto recebido para o projeto e armazenado em `depoimento.md`. Os textos do relatório foram produzidos com apoio da IA e exigem conferência da dupla antes da entrega.

**Reflexões pessoais:** Francisco e João Paulo forneceram textos individuais para a seção de reflexão do README.

## 10. Balanço final — preenchimento pela dupla

- **Total de prompts registrados:** contagem final pendente. Há transcrições literais e solicitações documentadas apenas em resumo; recuperar os prompts obrigatórios antes de estabelecer o total.
- **Prompt que mais ajudou e por quê:** pendente de avaliação pessoal da dupla.
- **Prompt que gerou a resposta mais problemática e por quê:** pendente de avaliação pessoal da dupla.
- **Se fizéssemos de novo, perguntaríamos à IA desta forma:** pendente de proposta da dupla.

### Pendências para a entrega

1. Recuperar **literalmente** o prompt que gerou o código original (Parte 1).
2. Recuperar **literalmente** o prompt que gerou os 28 testes da própria IA (Parte 2.6).
3. Complementar as interações de João Paulo com a IA, caso tenham ocorrido e ainda não estejam documentadas.
4. Preencher o balanço final com as avaliações reais dos estudantes.
5. Conferir que o README e os registros deste arquivo descrevem corretamente os resultados e a revisão cruzada, sem dar como corrigida a falha conhecida do teste `DB01`.

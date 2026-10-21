# Revisão técnica simulada para estudo

**Data:** 20/10/2026.

**Autoria:** ChatGPT. As duas perspectivas abaixo foram elaboradas pela mesma IA. São uma simulação didática, sem participação atribuída a estudantes ou revisão humana independente. Este arquivo não comprova a revisão cruzada exigida na atividade.

**Objeto da revisão:** os 48 casos de `casos-propostos-ia.js`, o executor `propostas-de-testes-ia.js`, `requisitos.md` e o código original de `src/irrigacao.js`.

## Perspectiva A — conferir o resultado esperado pela especificação

1. **Leituras válidas:** os casos V02 a V05 incluem exatamente 0%, 100%, -10°C e 60°C. Isso está de acordo com RF02, que inclui os limites. V06 a V09 verificam valores um pouco além deles. V10 e V11 tratam os sinais de falha descritos em RF03.
2. **Média:** M01 usa exatamente três leituras válidas, enquanto M02 fica abaixo desse mínimo. Em M06, as cinco posições recentes contêm apenas duas leituras válidas; o esperado é `null`. Não seria correto buscar leituras antigas para completar a quantidade.
3. **Arredondamento:** M08 e M09 verificam arredondamento para uma casa decimal nos dois sentidos, sem depender de uma decisão sobre desempate em valores exatamente intermediários.
4. **Bomba:** B02 exige `MANTER` em 30%, porque RF10 diz inferior a 30%. B04 exige `DESLIGAR` em 40%, porque RF11 inclui o limite. B08, B09 e B12 verificam a prioridade das condições de segurança.
5. **Alertas:** A11 confere a ordem de solo crítico antes de temperatura alta. Em A12, as três leituras recentes inválidas impedem média confiável: sobram no máximo duas válidas entre as cinco. Assim, o esperado contém falha de sensor e temperatura alta, sem solo crítico.

**Conclusão desta leitura:** os resultados esperados dos 48 casos são compatíveis com os requisitos citados. Isso é uma avaliação da IA sobre os casos e não representa uma revisão feita por duas pessoas.

## Perspectiva B — conferir a estrutura e as limitações dos casos

1. Há 48 identificadores distintos, com 12 casos para cada função. Cada caso tem requisito, entrada, resultado esperado e explicação.
2. O executor usa `assert.deepEqual`, que também detecta diferenças na ordem dos alertas. Os resultados esperados são declarados nos casos; não são calculados chamando a função sob teste.
3. Os casos usam listas em ordem cronológica, com a leitura mais recente na última posição. Em M05 e M06, essa ordem faz diferença para o resultado.
4. V08 e V10 exercitam rejeição de temperatura, mas têm objetivos distintos: um testa a fronteira de RF02 e o outro o sinal de desconexão de RF03.
5. Existem oportunidades de ampliar a cobertura: testar uma leitura quente seguida de uma válida fria, e testar uma média que arredonde de um valor abaixo de 15 para exatamente 15. A ausência desses casos limita o conjunto; não comprova defeito na implementação.
6. Entradas da bomba como `NaN`, texto e tempo negativo não têm tratamento definido explicitamente. Antes de classificá-las como erro do código, seria necessário documentar a lacuna e uma decisão de comportamento.

**Conclusão desta leitura:** não foi identificado um erro confirmado nos resultados esperados ou no executor durante esta inspeção estática. A amostra não cobre todas as entradas possíveis. Não houve alteração do código original nem correção baseada em defeito inventado.

## Execução técnica posterior a esta inspeção

Os resultados reais estão em `resultados-execucao-apoio-ia.txt`. A execução técnica de apoio da IA é diferente da revisão cruzada dos integrantes, que permanece sem comprovação neste material.

| Conjunto | Executados | Passaram | Falharam |
|---|---|---|---|
| Propostas de apoio da IA | 48 | 48 | 0 |
| Testes anteriores gerados pela IA | 28 | 28 | 0 |

Ambiente: Node v24.19.0. Código original identificado pelo blob `9feb09169819abc2db826fe2dffff0047e56936b`. A referência usada foi o snapshot `b72a8e29aa3dd38000de9f72b9fdb4df4a20d5f9`. Nenhuma alteração foi feita em src/irrigacao.js para fazer os testes passarem.

Os dois conjuntos executaram 76 testes no total, todos com sucesso, mas têm casos sobrepostos. Esse resultado não significa cobertura completa nem avaliação por revisores independentes. As sugestões de ampliar os casos permanecem como sugestões, sem resultados de execução atribuídos a elas.

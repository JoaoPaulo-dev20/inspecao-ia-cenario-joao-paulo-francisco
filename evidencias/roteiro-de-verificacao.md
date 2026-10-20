# Preparação da verificação — material de apoio da IA

Data da preparação: 20/10/2026.

Este material reúne 48 propostas de casos, com 12 para cada função, criadas pela IA a partir de requisitos.md. Cada resultado esperado vem acompanhado de uma explicação. Elas são material de estudo e não contam como testes próprios escritos independentemente pela dupla. Os 28 testes da IA publicados anteriormente continuam separados.

O arquivo test/irrigacao.test.js mantém os dois exemplos do template. A revisão cruzada dos integrantes e a execução destas novas propostas contra o módulo ainda estão pendentes. Nenhuma autoria, revisão, falha ou correção foi atribuída aos estudantes nesta preparação.

## Como seguir a ordem da Parte 2

1. Cada integrante escolhe duas funções e escreve seus casos a partir de requisitos.md. Para a entrega, são necessários pelo menos 24 casos próprios no total, com pelo menos 5 por função. Os exemplos abaixo ajudam a entender o raciocínio; registrem o uso da IA.
2. Antes de executar, cada integrante revisa os casos do outro. Confiram a entrada, o requisito e o resultado esperado. Anotem o que realmente foi encontrado e alterado.
3. Depois da revisão, rodem os testes próprios contra o código original da IA. Preencham o resultado obtido e a situação de cada caso, incluindo eventuais falhas.
4. Para cada falha, confiram primeiro se o resultado esperado está correto. Um teste com expectativa errada não comprova defeito no código. Um comportamento que a especificação não definiu também precisa de discussão e decisão.
5. Registrem os defeitos confirmados e façam as correções em commits separados, explicando cada alteração. Guardem os resultados da execução contra o original para a comparação.
6. Rodem os testes da IA e comparem com os casos próprios. Expliquem quais defeitos cada conjunto detectou. Só depois avancem à validação com o depoimento exigido pelo professor.

## Divisão e revisão a preencher pelos integrantes

| Integrante | Duas funções escolhidas | Quem revisou os casos | O que a revisão encontrou | O que foi alterado antes da execução |
|---|---|---|---|---|
| Francisco | A definir pela dupla | Pendente | Pendente | Pendente |
| João Paulo | A definir pela dupla | Pendente | Pendente | Pendente |

## Dois detalhes que merecem atenção

No caso IA-P-M06, a janela é formada pelas cinco posições mais recentes antes de retirar as leituras inválidas. Não se deve buscar leituras mais antigas só para completar três válidas.

No caso IA-P-A12, as três últimas leituras inválidas deixam no máximo duas válidas entre as cinco recentes. RF06 exige null nessa situação. Portanto, SENSOR_COM_FALHA e SOLO_CRITICO não coexistem nessas condições. TEMPERATURA_ALTA ainda pode aparecer por usar a leitura válida mais recente, conforme RF13.

## Casos propostos para discutir

Os campos de resultado obtido e situação estão pendentes porque estas propostas ainda não foram executadas contra o módulo. O resultado esperado deve ser conferido por quem revisar.

### validarLeitura

| ID | Requisito | Entrada: argumentos na ordem da função | Esperado | Por que esperamos isso | Obtido | Situação |
|---|---|---|---|---|---|---|
| IA-P-V01 | RF01/RF02 | `[ { umidade: 35, temperatura: 28 } ]` | `true` | 35% e 28°C estão dentro dos intervalos permitidos. | Pendente | Aguardando revisão e execução |
| IA-P-V02 | RF02 | `[ { umidade: 0, temperatura: 28 } ]` | `true` | O limite inferior de umidade é incluído; zero não invalida a leitura. | Pendente | Aguardando revisão e execução |
| IA-P-V03 | RF02 | `[ { umidade: 100, temperatura: 28 } ]` | `true` | O limite superior de umidade também é incluído. | Pendente | Aguardando revisão e execução |
| IA-P-V04 | RF02 | `[ { umidade: 35, temperatura: -10 } ]` | `true` | A temperatura mínima permitida é -10°C, incluindo esse valor. | Pendente | Aguardando revisão e execução |
| IA-P-V05 | RF02 | `[ { umidade: 35, temperatura: 60 } ]` | `true` | 60°C é permitido; o problema começa acima desse limite. | Pendente | Aguardando revisão e execução |
| IA-P-V06 | RF02 | `[ { umidade: -0.1, temperatura: 28 } ]` | `false` | -0,1% está fora do intervalo, mesmo com uma diferença pequena. | Pendente | Aguardando revisão e execução |
| IA-P-V07 | RF02 | `[ { umidade: 100.1, temperatura: 28 } ]` | `false` | 100,1% ultrapassa o limite superior. | Pendente | Aguardando revisão e execução |
| IA-P-V08 | RF02 | `[ { umidade: 35, temperatura: -10.1 } ]` | `false` | -10,1°C está fora do intervalo permitido. | Pendente | Aguardando revisão e execução |
| IA-P-V09 | RF02 | `[ { umidade: 35, temperatura: 60.1 } ]` | `false` | 60,1°C ultrapassa o limite superior. | Pendente | Aguardando revisão e execução |
| IA-P-V10 | RF03 | `[ { umidade: 35, temperatura: -127 } ]` | `false` | -127°C é o sinal de sensor desconectado definido na especificação. | Pendente | Aguardando revisão e execução |
| IA-P-V11 | RF03 | `[ { umidade: NaN, temperatura: 28 } ]` | `false` | NaN representa falha na leitura de umidade. | Pendente | Aguardando revisão e execução |
| IA-P-V12 | RF02 | `[ { umidade: '35', temperatura: 28 } ]` | `false` | O texto 35 não deve ser convertido silenciosamente em número. | Pendente | Aguardando revisão e execução |

### mediaUmidade

| ID | Requisito | Entrada: argumentos na ordem da função | Esperado | Por que esperamos isso | Obtido | Situação |
|---|---|---|---|---|---|---|
| IA-P-M01 | RF05/RF06 | `[ [ { umidade: 10, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 30, temperatura: 28 } ] ]` | `20` | A soma é 60 e existem três leituras válidas: 60 dividido por 3 é 20. | Pendente | Aguardando revisão e execução |
| IA-P-M02 | RF06 | `[ [ { umidade: 10, temperatura: 28 }, { umidade: 20, temperatura: 28 } ] ]` | `null` | O requisito exige pelo menos três leituras válidas. | Pendente | Aguardando revisão e execução |
| IA-P-M03 | RF06 | `[ [] ]` | `null` | Sem leituras válidas, o resultado deve indicar ausência de dados confiáveis. | Pendente | Aguardando revisão e execução |
| IA-P-M04 | RF04/RF05 | `[ [ { umidade: 10, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 30, temperatura: 28 }, { umidade: 40, temperatura: 28 }, { umidade: 50, temperatura: 28 } ] ]` | `30` | 150 dividido pelas cinco leituras resulta em 30. | Pendente | Aguardando revisão e execução |
| IA-P-M05 | RF04/RF05 | `[ [ { umidade: 0, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 30, temperatura: 28 }, { umidade: 40, temperatura: 28 }, { umidade: 50, temperatura: 28 }, { umidade: 60, temperatura: 28 } ] ]` | `40` | A leitura de 0% é antiga; as cinco recentes somam 200 e a média é 40. | Pendente | Aguardando revisão e execução |
| IA-P-M06 | RF04/RF06 | `[ [ { umidade: 10, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 30, temperatura: 28 }, { umidade: 40, temperatura: 28 }, { umidade: 50, temperatura: 28 }, { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 101, temperatura: 28 } ] ]` | `null` | Nas cinco posições mais recentes só duas leituras são válidas. Buscar dados anteriores mudaria a janela de RF04. | Pendente | Aguardando revisão e execução |
| IA-P-M07 | RF03/RF05/RF06 | `[ [ { umidade: 10, temperatura: 28 }, { umidade: NaN, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 30, temperatura: 28 } ] ]` | `20` | Restam as umidades 10, 20 e 30; as inválidas não entram na soma nem na quantidade da divisão. | Pendente | Aguardando revisão e execução |
| IA-P-M08 | RF05 | `[ [ { umidade: 20, temperatura: 28 }, { umidade: 20, temperatura: 28 }, { umidade: 21, temperatura: 28 } ] ]` | `20.3` | 61 dividido por 3 é aproximadamente 20,333; com uma casa decimal, fica 20,3. | Pendente | Aguardando revisão e execução |
| IA-P-M09 | RF05 | `[ [ { umidade: 20, temperatura: 28 }, { umidade: 21, temperatura: 28 }, { umidade: 21, temperatura: 28 } ] ]` | `20.7` | 62 dividido por 3 é aproximadamente 20,667; com uma casa decimal, fica 20,7. | Pendente | Aguardando revisão e execução |
| IA-P-M10 | RF02/RF05/RF06 | `[ [ { umidade: 0, temperatura: 28 }, { umidade: 0, temperatura: 28 }, { umidade: 0, temperatura: 28 } ] ]` | `0` | Zero é uma umidade válida; média zero é diferente de ausência de média. | Pendente | Aguardando revisão e execução |
| IA-P-M11 | RF03/RF06 | `[ [ { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 101, temperatura: 28 } ] ]` | `null` | Nenhuma das três leituras é válida. | Pendente | Aguardando revisão e execução |
| IA-P-M12 | RF02/RF05 | `[ [ { umidade: 0.2, temperatura: 28 }, { umidade: 0.3, temperatura: 28 }, { umidade: 0.4, temperatura: 28 } ] ]` | `0.3` | A soma é 0,9; dividindo por três, a média com uma casa decimal é 0,3. | Pendente | Aguardando revisão e execução |

### decidirBomba

| ID | Requisito | Entrada: argumentos na ordem da função | Esperado | Por que esperamos isso | Obtido | Situação |
|---|---|---|---|---|---|---|
| IA-P-B01 | RF10 | `[ false, 29.9, 0 ]` | `'LIGAR'` | 29,9% é inferior a 30% e a bomba está desligada. | Pendente | Aguardando revisão e execução |
| IA-P-B02 | RF10/RF12 | `[ false, 30, 0 ]` | `'MANTER'` | RF10 usa inferior a 30%; o valor 30 fica fora dessa condição. | Pendente | Aguardando revisão e execução |
| IA-P-B03 | RF11/RF12 | `[ true, 39.9, 20 ]` | `'MANTER'` | 39,9% ainda não atinge o limite de desligamento por umidade. | Pendente | Aguardando revisão e execução |
| IA-P-B04 | RF11 | `[ true, 40, 20 ]` | `'DESLIGAR'` | O limite de desligamento inclui 40%. | Pendente | Aguardando revisão e execução |
| IA-P-B05 | RF10/RF12 | `[ true, 20, 20 ]` | `'MANTER'` | A regra de ligar só se aplica quando a bomba está desligada. | Pendente | Aguardando revisão e execução |
| IA-P-B06 | RF10/RF12 | `[ false, 40, 0 ]` | `'MANTER'` | Não há motivo para ligar; MANTER preserva o estado desligado. | Pendente | Aguardando revisão e execução |
| IA-P-B07 | RF08/RF12 | `[ true, 20, 59.9 ]` | `'MANTER'` | 59,9 é menor que 60 e a umidade está abaixo de 40%; nenhuma regra manda desligar. | Pendente | Aguardando revisão e execução |
| IA-P-B08 | RF08/RF12 | `[ true, 20, 60 ]` | `'DESLIGAR'` | O limite de segurança tem prioridade sobre continuar irrigando. | Pendente | Aguardando revisão e execução |
| IA-P-B09 | RF08 | `[ true, 20, 61 ]` | `'DESLIGAR'` | O requisito diz 60 minutos ou mais. | Pendente | Aguardando revisão e execução |
| IA-P-B10 | RF09 | `[ true, null, 20 ]` | `'DESLIGAR'` | Com null não há informação confiável para continuar irrigando. | Pendente | Aguardando revisão e execução |
| IA-P-B11 | RF09 | `[ false, null, 0 ]` | `'MANTER'` | O estado seguro já é o estado atual: bomba desligada. | Pendente | Aguardando revisão e execução |
| IA-P-B12 | RF08/RF09 | `[ true, null, 60 ]` | `'DESLIGAR'` | As duas regras de segurança se aplicam e ambas exigem desligamento. | Pendente | Aguardando revisão e execução |

### verificarAlertas

| ID | Requisito | Entrada: argumentos na ordem da função | Esperado | Por que esperamos isso | Obtido | Situação |
|---|---|---|---|---|---|---|
| IA-P-A01 | RF13 | `[ [ { umidade: 20, temperatura: 28 }, { umidade: 25, temperatura: 28 }, { umidade: 30, temperatura: 28 } ] ]` | `[]` | A média é 25%, a temperatura recente é 28°C e as leituras são válidas. | Pendente | Aguardando revisão e execução |
| IA-P-A02 | RF06/RF13 | `[ [] ]` | `[]` | Não existe média crítica, leitura válida quente ou sequência de três leituras inválidas. | Pendente | Aguardando revisão e execução |
| IA-P-A03 | RF03/RF13 | `[ [ { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 101, temperatura: 28 } ] ]` | `[ 'SENSOR_COM_FALHA' ]` | As três leituras são inválidas; não há média confiável ou leitura válida para o alerta de temperatura. | Pendente | Aguardando revisão e execução |
| IA-P-A04 | RF13 | `[ [ { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 } ] ]` | `[]` | O requisito exige três leituras recentes inválidas; aqui só existem duas. | Pendente | Aguardando revisão e execução |
| IA-P-A05 | RF13 | `[ [ { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 101, temperatura: 28 }, { umidade: 20, temperatura: 28 } ] ]` | `[]` | As três últimas posições contêm uma leitura válida; não existe mais a sequência exigida para falha de sensor. | Pendente | Aguardando revisão e execução |
| IA-P-A06 | RF05/RF13 | `[ [ { umidade: 14.9, temperatura: 28 }, { umidade: 14.9, temperatura: 28 }, { umidade: 14.9, temperatura: 28 } ] ]` | `[ 'SOLO_CRITICO' ]` | A média arredondada é 14,9%, inferior a 15%. | Pendente | Aguardando revisão e execução |
| IA-P-A07 | RF13 | `[ [ { umidade: 15, temperatura: 28 }, { umidade: 15, temperatura: 28 }, { umidade: 15, temperatura: 28 } ] ]` | `[]` | RF13 exige média inferior a 15%, sem incluir o limite. | Pendente | Aguardando revisão e execução |
| IA-P-A08 | RF13 | `[ [ { umidade: 20, temperatura: 39.9 } ] ]` | `[]` | 39,9°C é menor que 40°C; também não há média confiável ou três falhas. | Pendente | Aguardando revisão e execução |
| IA-P-A09 | RF13 | `[ [ { umidade: 20, temperatura: 40 } ] ]` | `[ 'TEMPERATURA_ALTA' ]` | O limite inclui 40°C; não exige três leituras para o alerta de temperatura. | Pendente | Aguardando revisão e execução |
| IA-P-A10 | RF03/RF13 | `[ [ { umidade: 20, temperatura: 40 }, { umidade: 35, temperatura: -127 } ] ]` | `[ 'TEMPERATURA_ALTA' ]` | RF13 usa a leitura válida mais recente; a falha posterior não substitui a leitura válida de 40°C. | Pendente | Aguardando revisão e execução |
| IA-P-A11 | RF13 | `[ [ { umidade: 10, temperatura: 40 }, { umidade: 10, temperatura: 28 }, { umidade: 10, temperatura: 40 } ] ]` | `[ 'SOLO_CRITICO', 'TEMPERATURA_ALTA' ]` | A média é 10% e a última leitura válida tem 40°C. A ordem da lista faz parte do resultado esperado. | Pendente | Aguardando revisão e execução |
| IA-P-A12 | RF04/RF06/RF13 | `[ [ { umidade: 10, temperatura: 40 }, { umidade: 10, temperatura: 40 }, { umidade: 10, temperatura: 40 }, { umidade: NaN, temperatura: 28 }, { umidade: 35, temperatura: -127 }, { umidade: 101, temperatura: 28 } ] ]` | `[ 'SENSOR_COM_FALHA', 'TEMPERATURA_ALTA' ]` | As três últimas leituras são inválidas. Nas cinco recentes só duas são válidas, então não há média para SOLO_CRITICO. A última válida ainda tem 40°C. | Pendente | Aguardando revisão e execução |

## Entradas que exigem uma decisão antes de virar teste de aprovação

RF07 descreve os tipos dos parâmetros da bomba, mas não define o tratamento de NaN, texto, valores ausentes ou tempo negativo. A interface também não especifica o resultado para uma lista recebida em um formato diferente de array. RF05 não detalha a regra de desempate quando a média fica exatamente entre duas casas decimais.

Esses pontos podem ser investigados, mas o esperado não deve ser inventado para forçar uma falha. Identifiquem a lacuna, discutam a decisão e registrem a justificativa separadamente de uma violação de requisito já definido. Os 48 casos deste material não dependem dessas escolhas.

## Registro de defeitos após a execução

Nenhum defeito foi confirmado por esta preparação. A quantidade ainda não foi apurada; isso não equivale a dizer que o código foi aprovado.

| ID | Caso que falhou | Resultado observado | Causa confirmada no código | Requisito violado | Correção e commit |
|---|---|---|---|---|---|
| A preencher após a execução | Pendente | Pendente | Pendente | Pendente | Pendente |

## Comandos, quando a revisão estiver concluída

Testes próprios da dupla:

~~~bash
npm test
~~~

Testes da IA publicados anteriormente:

~~~bash
node --test evidencias/testes-gerados-pela-ia.js
~~~

Estas novas propostas de apoio da IA:

~~~bash
node --test evidencias/propostas-de-testes-ia.js
~~~

Validar sintaxe não executa as regras de irrigação:

~~~bash
node --check evidencias/casos-propostos-ia.js
node --check evidencias/propostas-de-testes-ia.js
~~~

Na preparação, os dois arquivos passaram na verificação de sintaxe. Também foram conferidos os 48 IDs únicos e a distribuição de 12 casos por função sem importar src/irrigacao.js. Não há resultado funcional destas propostas para transcrever no relatório.

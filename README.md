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


#### Resultados dos testes de João Paulo

| ID | Função | Requisito | Esperado | Obtido | Passou? |
|---|---|---|---|---|---|
| DB01 | decidirBomba | RF10 | LIGAR | MANTER | Não |
| DB02 | decidirBomba | RF11 | DESLIGAR | DESLIGAR | Sim |
| DB03 | decidirBomba | RF09 | DESLIGAR | DESLIGAR | Sim |
| DB04 | decidirBomba | RF12 | MANTER | MANTER | Sim |
| VA01 | verificarAlertas | RF13 | TEMPERATURA_ALTA | TEMPERATURA_ALTA | Sim |
| VA02 | verificarAlertas | RF13 | SOLO_CRITICO | SOLO_CRITICO | Sim |
| VA03 | verificarAlertas | RF13 | SENSOR_COM_FALHA | SENSOR_COM_FALHA | Sim |
| VA04 | verificarAlertas | RF13 | SOLO_CRITICO e TEMPERATURA_ALTA | SOLO_CRITICO e TEMPERATURA_ALTA | Sim |
| VA05 | verificarAlertas | RF13 | Lista vazia | Lista vazia | Sim |

**Resultado geral relatado por João Paulo:**
28 testes executados, 27 aprovados e 1 falha.

A falha de DB01 está relacionada ao uso de uma
entrada incompatível com o tipo booleano exigido
pela especificação, não constituindo um defeito
comprovado na implementação.

A revisão de Francisco foi registrada no PR #3.


### 2.3 Revisão cruzada dos testes


| Revisor | O que encontrou nos testes do colega | O que mudou |
|---|---|---|
| Francisco | Identificou nos testes DB01 e DB04 o uso da string 'DESLIGADA' em vez do booleano false, conforme a especificação da função decidirBomba. | Foram enviados dois comentários de revisão no Pull Request #3. Os testes permanecem sem correção nesta etapa. |
| João Paulo | Revisão dos testes de Francisco ainda não confirmada. | Pendente. |


### 2.4 Defeitos encontrados


### 2.4 Defeitos encontrados

Durante a execução dos testes, não foram confirmados
defeitos na implementação original do sistema.

Na execução dos testes de João Paulo, foi registrada
uma falha no caso DB01.

Após a revisão cruzada, Francisco identificou que
o teste utilizou a string 'DESLIGADA' no lugar
do valor booleano false, exigido pela especificação.

O teste DB04 apresentou o mesmo problema na entrada,
embora tenha passado na execução relatada.

Esses problemas foram registrados nos comentários
do Pull Request #3 e não comprovam defeitos
no código original.

| # | Função | Defeito | Falha observada | Requisito |
|---|---|---|---|---|
| — | — | Nenhum defeito confirmado na implementação | — | — |

**Resultado da inspeção até esta etapa:**
Nenhum defeito de implementação confirmado nos
casos analisados. A revisão identificou problemas
na construção dos testes DB01 e DB04.


### 2.5 Correções


### 2.5 Correções

Durante a verificação do sistema de irrigação
automatizada, não foram confirmados defeitos
na implementação original das quatro funções.

Os testes de Francisco passaram integralmente,
assim como os 28 testes gerados pela IA.

Na execução relatada por João Paulo, 27 dos
28 testes passaram. A falha no teste DB01 foi
associada ao uso de uma string no lugar de um
valor booleano, em desacordo com a interface
definida nos requisitos.

A revisão cruzada também identificou o mesmo
problema de entrada no teste DB04.

A dupla decidiu manter esses testes sem alterações
nesta etapa, deixando os problemas documentados
no Pull Request #3.

Nenhuma modificação foi realizada no arquivo
src/irrigacao.js, preservando o código original
gerado pela IA.

**Situação:** nenhuma correção de implementação
realizada. Os problemas identificados nos testes
permanecem registrados e sem correção.


### 2.6 Os testes da IA


### 2.6 Os testes da IA

Foram executados os testes gerados pela IA, salvos em
`evidencias/testes-gerados-pela-ia.js`.

**Comando utilizado:**
`node --test evidencias/testes-gerados-pela-ia.js`

**Resultados:**
- Testes gerados pela IA: 28
- Testes aprovados: 28
- Testes que falharam: 0
- Defeitos confirmados no código original: 0 até o momento

**Comparação com os testes da dupla:**

A execução dos testes da IA não identificou defeitos
na implementação. Na execução relatada por João Paulo,
houve uma falha no teste DB01, relacionada ao uso de
uma string no lugar de um valor booleano.

Essa falha não comprova um defeito no código original.

**Por que isso aconteceu?**

Quando a IA gera testes para um código que ela mesma
produziu, pode repetir suas próprias interpretações
e deixar de identificar determinados problemas.
Por isso, a revisão humana e os testes elaborados
a partir dos requisitos são importantes.

**Situação:** Execução dos 28 testes concluída.
O registro do prompt original utilizado para gerar
esses testes deve ser conferido em `prompts.md`.


## Parte 3: validação

**Situação: não concluída.** A validação responde à pergunta: **“O código resolve o problema real?”** A dupla deve utilizar o depoimento **oficial publicado pelo professor no Classroom**. Um depoimento simulado para estudo não substitui esse material.

### 3.1 Divergências


### 3.1 Divergências

Após analisar o depoimento do agricultor Seu Francisco,
identificamos cinco necessidades que não estão
completamente atendidas pela especificação original.

| # | Necessidade real (depoimento) | O que a especificação diz | O código atende? | Característica da ISO/IEC 25010 envolvida |
|---|---|---|---|---|
| 1 | A irrigação deve funcionar somente das 18h às 6h. | RF07 a RF12 definem as decisões da bomba, mas não estabelecem restrições de horário. | Não | Adequação funcional |
| 2 | Após uma falta de energia, o sistema deve considerar o tempo de funcionamento anterior e evitar religamento automático inseguro. | RF08 determina desligamento após 60 minutos, mas não prevê a recuperação do tempo acumulado após reinicialização. | Não | Confiabilidade e segurança operacional (safety) |
| 3 | A bomba não pode funcionar quando o nível da água do poço estiver baixo. | Os requisitos não incluem um sensor de nível de água nem uma regra para impedir o funcionamento com poço baixo. | Não | Segurança operacional (safety) |
| 4 | Os alertas precisam chegar imediatamente ao celular do agricultor. | RF13 define os tipos de alertas, mas não determina o envio de mensagens ao celular nem o tempo de notificação. | Não | Adequação funcional e capacidade de interação |
| 5 | Cada canteiro precisa de limites de umidade adequados à sua cultura. | RF10 e RF11 utilizam limites fixos de 30% e 40%, sem diferenciação entre culturas ou canteiros. | Não | Adequação funcional |

**Conclusão:**

As cinco divergências mostram que o sistema implementa
as regras descritas na especificação original, mas
não contempla todas as necessidades apresentadas
pelo agricultor.

Portanto, mesmo que os testes de verificação sejam
aprovados, isso não significa que o sistema esteja
adequado para utilização nas condições reais
descritas no depoimento.

### 3.2 Requisitos revisados


### 3.2 Requisitos revisados

Com base no depoimento do agricultor, identificamos
a necessidade de revisar alguns requisitos e
acrescentar novas funcionalidades ao sistema.

**RF08 (revisado) — Tempo máximo da bomba**

O sistema deve desligar a bomba quando o tempo
acumulado de funcionamento atingir 60 minutos,
considerando também o tempo anterior a eventuais
reinicializações por falta de energia.

**RF10 (revisado) — Acionamento da bomba**

A bomba deve ligar quando a umidade estiver abaixo
do limite mínimo configurado para o canteiro,
desde que o horário seja permitido e todas as
condições de segurança estejam atendidas.

**RF11 (revisado) — Desligamento por umidade**

A bomba deve desligar quando a umidade atingir
o limite máximo configurado para o canteiro.

**RF13 (revisado) — Alertas**

O sistema deve identificar falhas nos sensores,
umidade crítica e temperatura elevada, além de
permitir o envio dos alertas ao celular do agricultor.

O aviso de falha no sensor deve ser emitido assim
que a falha for detectada, sem depender de três
leituras inválidas consecutivas.

**RF14 (novo) — Horário de irrigação**

O sistema deve permitir a irrigação somente
das 18h às 6h, impedindo o acionamento da bomba
fora desse período.

**RF15 (novo) — Recuperação após falta de energia**

Após uma interrupção de energia, o sistema deve
recuperar o tempo acumulado de funcionamento da
bomba e verificar as condições de segurança antes
de permitir um novo acionamento automático.

Caso não consiga recuperar os dados, a bomba
deve permanecer desligada.

**RF16 (novo) — Verificação do nível do poço**

O sistema deve utilizar um sensor para verificar
o nível de água do poço.

Quando o nível estiver abaixo do mínimo seguro,
a bomba não poderá ligar. Se já estiver funcionando,
deverá ser desligada para evitar danos.

**RF17 (novo) — Notificações no celular**

O sistema deve enviar notificações ao celular
do agricultor quando detectar situações de alerta,
permitindo que ele acompanhe os problemas
mesmo estando longe da plantação.

**RF18 (novo) — Configuração por canteiro**

O sistema deve permitir configurar limites de
umidade diferentes para cada canteiro ou cultura,
respeitando as necessidades de irrigação
de cada plantação.

**Justificativa:**

As alterações propostas procuram aproximar o
sistema das necessidades reais apresentadas pelo
agricultor, aumentando a adequação funcional,
a confiabilidade e a segurança operacional.

Os requisitos acima são propostas da dupla a
partir do depoimento e ainda não foram implementados.


### 3.3 Reflexão


### 3.3 Reflexão

Ao comparar o código original com os requisitos e o
depoimento do agricultor, percebemos que o principal
problema estava na especificação, que não considerava
todas as necessidades reais do usuário.

O código gerado pela IA apresentou resultados
compatíveis com os requisitos nos testes realizados.
Porém, a especificação não incluía situações
importantes, como a irrigação apenas durante a noite,
o controle após quedas de energia, a proteção contra
o nível baixo de água no poço, as notificações no
celular e os limites diferentes para cada canteiro.

Os testes da Parte 2 não identificariam diretamente
essas divergências, pois foram elaborados para
verificar se o código cumpria os requisitos
existentes, e não para descobrir necessidades que
não haviam sido documentadas.

Com essa atividade, entendemos que um programa
pode passar nos testes de verificação e ainda
não atender completamente às necessidades do usuário.

Por isso, consideramos importante realizar tanto
a verificação quanto a validação, além de conversar
com os usuários antes de definir os requisitos.

**Conclusão:** os testes não confirmaram defeitos
na implementação original, mas a validação revelou
lacunas na especificação que precisam ser corrigidas
antes de utilizar o sistema nas condições reais
relatadas pelo agricultor.


## Parte 4: o código à luz da ISO/IEC 25010


## Parte 4: o código à luz da ISO/IEC 25010

Nesta etapa, avaliamos a qualidade do código original
gerado pela IA, considerando as características da
ISO/IEC 25010, os requisitos funcionais e os
resultados dos testes realizados.

| Característica | Subcaracterística | Avaliação | Evidência |
|---|---|---|---|
| Adequação funcional | Correção funcional e completude funcional | O código apresentou resultados corretos nos testes válidos realizados. Entretanto, a validação revelou funcionalidades necessárias ao agricultor que não estavam previstas na especificação. | Os 17 testes de Francisco e os 28 testes gerados pela IA passaram. O depoimento revelou necessidades relacionadas ao horário, poço e canteiros. |
| Confiabilidade | Tolerância a falhas e recuperabilidade | O sistema possui mecanismos básicos para lidar com sensores inválidos e ausência de dados confiáveis. Porém, não possui recuperação do tempo acumulado após falta de energia. | A função mediaUmidade retorna null quando existem menos de três leituras válidas. A função decidirBomba desliga a bomba quando está ligada e recebe umidade média null. |
| Manutenibilidade | Modularidade e analisabilidade | O código apresenta boa organização inicial, com funções separadas, responsabilidades definidas e comentários explicativos. Isso facilita sua compreensão e manutenção. | O arquivo src/irrigacao.js contém as funções validarLeitura, mediaUmidade, decidirBomba e verificarAlertas, com documentação dos parâmetros e retornos. |
| Capacidade de interação (2023) | Operabilidade | O módulo analisado retorna decisões e alertas, mas não implementa diretamente a comunicação desses alertas com o agricultor. A interface completa precisaria de avaliação separada. | A função verificarAlertas retorna uma lista de alertas. Não há envio de notificações ao celular nessa função. |
| Segurança operacional (safety) | Operação segura | O código possui regras para reduzir riscos, como desligar a bomba após 60 minutos e evitar funcionamento com dados insuficientes. Entretanto, não verifica o nível de água do poço nem controla a recuperação após falta de energia. | RF08 e RF09 estão implementados em decidirBomba. O teste AUT03 passou, confirmando o desligamento aos 60 minutos no cenário testado. |

### Conclusão da avaliação

A análise mostrou que o código original possui
aspectos positivos, principalmente na organização
das funções, na validação das leituras e nas
regras básicas de segurança da bomba.

Os testes executados não confirmaram defeitos
na implementação para as entradas válidas
avaliadas.

Entretanto, o depoimento do agricultor revelou
limitações importantes que não estavam previstas
nos requisitos originais.

Assim, a qualidade do sistema não depende apenas
de o código funcionar corretamente nos testes,
mas também de atender às necessidades reais
do usuário e oferecer segurança durante a operação.

As avaliações apresentadas são baseadas nas
evidências disponíveis e não representam uma
certificação formal de conformidade à norma.


## Parte 5: garantia da qualidade (QA)

## Parte 5: garantia da qualidade (QA)

A partir da inspeção do código gerado pela IA e da
análise do depoimento do agricultor, propomos três
práticas de garantia da qualidade para equipes
que utilizam inteligência artificial no
desenvolvimento de software.

### Prática 1 — Levantamento e validação dos requisitos

Antes de solicitar a implementação do sistema à IA,
a equipe deve conversar com o usuário e confirmar
se todos os requisitos representam suas
necessidades reais.

Essa prática poderia ter evitado a ausência de
regras importantes, como a irrigação somente
durante a noite e a configuração de umidade
diferente para cada canteiro.

### Prática 2 — Análise de riscos e segurança

Antes da implementação, a equipe deve identificar
situações que possam causar prejuízos ou acidentes
e definir requisitos de segurança para elas.

No nosso projeto, essa prática poderia ter evitado
as lacunas relacionadas à falta de energia e ao
funcionamento da bomba com o poço seco.

Essas situações foram mencionadas pelo agricultor,
mas não estavam previstas na especificação inicial.

### Prática 3 — Revisão humana e testes independentes

Todo código e teste produzido com apoio de IA deve
ser revisado por outra pessoa e comparado com os
requisitos do projeto antes de ser aprovado.

Durante nossa revisão cruzada, identificamos
que os testes DB01 e DB04 utilizavam a string
'DESLIGADA' em vez de um valor booleano.

Essa situação demonstra a importância de conferir
os tipos das entradas e os resultados esperados,
pois um teste mal elaborado pode indicar uma falha
que não representa um defeito real no programa.

### Conclusão

Com a atividade, percebemos que utilizar IA pode
ajudar no desenvolvimento e na criação de testes,
mas não elimina a necessidade de planejamento,
revisão humana e validação com os usuários.

Essas três práticas poderiam reduzir problemas
de especificação, segurança e elaboração de testes,
melhorando a qualidade do software desenvolvido.

## Parte 6: o que a IA errou


## Parte 6: o que a IA errou

Durante a inspeção, analisamos decisões tomadas
pela IA na implementação original e comparamos
seus comportamentos com os requisitos.

| # | O que a IA fez ou afirmou | Classificação | Evidência |
|---|---|---|---|
| 1 | A função validarLeitura retorna false quando recebe null ou um valor que não seja objeto. A especificação define a estrutura de uma leitura, mas não detalha o comportamento para esses tipos de entrada. | Suposição não declarada | A função validarLeitura verifica se a entrada é null ou se seu tipo é diferente de object antes de validar os sensores. |
| 2 | A função mediaUmidade retorna null quando recebe uma entrada que não é um array. A especificação exige null quando existem menos de três leituras válidas, mas não define explicitamente esse comportamento para outros tipos de entrada. | Suposição não declarada | O código possui a condição !Array.isArray(leituras), que retorna null antes de calcular a média. |
| 3 | A função decidirBomba desliga a bomba quando ela está funcionando há 60 minutos ou mais, independentemente da umidade. | Correto | O requisito RF08 estabelece essa regra, e o teste AUT03 foi executado e aprovado. |

### Análise dos resultados

Os testes realizados não comprovaram defeitos
na implementação original para os casos avaliados.

Entretanto, identificamos decisões sobre entradas
não especificadas explicitamente nos requisitos.

Essas decisões não são necessariamente erros, mas
mostram a importância de esclarecer comportamentos
não definidos antes da implementação.

Também percebemos que o sistema pode atender aos
requisitos originais e ainda apresentar limitações
em relação às necessidades reais do agricultor,
conforme identificado na Parte 3.

### Reflexão final dos integrantes

**Francisco:**

[Escrever reflexão pessoal sobre como pretende
utilizar a IA na geração de código após a atividade.]

**João Paulo:**

[Pendente de reflexão pessoal de João Paulo.]

### Balanço

A atividade demonstrou a importância de verificar
o código gerado por IA, conferir os requisitos,
executar testes e realizar revisões humanas.

A IA pode auxiliar no desenvolvimento, mas suas
respostas precisam ser analisadas criticamente,
principalmente quando existem situações que não
foram definidas claramente na especificação.

## Parte 7: divisão do trabalho


## Parte 7: divisão do trabalho

A atividade foi desenvolvida em dupla, com divisão
das funções para elaboração e execução dos testes.

| Parte | Responsável principal | Participação do outro integrante |
|---|---|---|
| Parte 1 — Código original | Francisco realizou o commit do código original gerado pela IA. | Participação inicial de João Paulo a confirmar pela dupla. |
| Parte 2 — Verificação | Francisco: validarLeitura e mediaUmidade. João Paulo: decidirBomba e verificarAlertas. | Francisco revisou os testes DB01 e DB04 de João Paulo e registrou comentários no Pull Request #3. A revisão de João Paulo sobre os testes de Francisco ainda precisa ser confirmada. |
| Parte 3 — Validação | Francisco preparou a análise das divergências, os requisitos revisados e a reflexão, com apoio de IA. | Revisão e participação de João Paulo ainda pendentes. |
| Partes 4 a 6 — ISO 25010, QA e análise da IA | Francisco preparou os textos e as avaliações iniciais com apoio de IA. | João Paulo deverá conferir as análises, contribuir com sua avaliação e escrever sua reflexão individual. |

### Organização da dupla

Francisco ficou responsável pelos testes das funções
validarLeitura e mediaUmidade, além da preparação
inicial da documentação da atividade.

João Paulo ficou responsável pelos testes das funções
decidirBomba e verificarAlertas, desenvolvidos em
uma branch separada no GitHub.

A revisão cruzada permitiu identificar problemas
nas entradas dos testes DB01 e DB04, registrados
nos comentários do Pull Request #3.

As análises e os textos ainda deverão ser
conferidos pela dupla antes da entrega final.

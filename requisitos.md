# Especificação de requisitos: controle de irrigação automatizada

**Sistema:** Irriga Sertão, controlador de irrigação para pequenas propriedades (fictício)
**Módulo:** validação de leituras de sensores, decisão da bomba e alertas
**Versão:** 1.0

## Contexto

Um microcontrolador lê, a cada 5 minutos, um sensor de umidade do solo e um sensor de temperatura instalados na plantação. Este módulo decide quando ligar e desligar a bomba de irrigação e quando emitir alertas.

## Interface

Implementar em JavaScript puro (Node.js), no arquivo `src/irrigacao.js`, exportando as quatro funções no formato CommonJS:

```js
module.exports = { validarLeitura, mediaUmidade, decidirBomba, verificarAlertas };
```

Uma **leitura** é um objeto `{ umidade, temperatura }`, com umidade do solo em percentual e temperatura em graus Celsius. Uma **lista de leituras** está em ordem cronológica: a última posição é a leitura mais recente.

## Requisitos funcionais

### Função 1: `validarLeitura(leitura)`

**RF01.** Retorna `true` se a leitura for válida e `false` caso contrário.

**RF02.** Uma leitura é válida se a umidade for um número entre 0 e 100 e a temperatura for um número entre -10 e 60, com os limites incluídos.

**RF03.** O sensor de temperatura retorna `-127` quando está desconectado, e o sensor de umidade retorna `NaN` quando falha a leitura. Nos dois casos, a leitura é inválida.

### Função 2: `mediaUmidade(leituras)`

**RF04.** Considera apenas as 5 leituras mais recentes da lista.

**RF05.** Retorna a média da umidade das leituras válidas entre essas 5, arredondada para uma casa decimal.

**RF06.** Se houver menos de 3 leituras válidas entre as 5 mais recentes, retorna `null`, indicando que não há dados confiáveis.

### Função 3: `decidirBomba(bombaLigada, umidadeMedia, minutosLigada)`

**RF07.** Retorna `"LIGAR"`, `"DESLIGAR"` ou `"MANTER"`. Os parâmetros são: se a bomba está ligada (`true` ou `false`), a umidade média (número ou `null`) e há quantos minutos a bomba está ligada.

**RF08.** Segurança: se a bomba estiver ligada há 60 minutos ou mais, retorna `"DESLIGAR"`, qualquer que seja a umidade.

**RF09.** Falha segura: se a umidade média for `null`, a bomba deve ficar desligada (retorna `"DESLIGAR"` se estiver ligada, ou `"MANTER"` se estiver desligada).

**RF10.** Se a bomba estiver desligada e a umidade média for inferior a 30%, retorna `"LIGAR"`.

**RF11.** Se a bomba estiver ligada e a umidade média for maior ou igual a 40%, retorna `"DESLIGAR"`.

**RF12.** Nos demais casos, retorna `"MANTER"`. A faixa entre 30% e 40% evita que a bomba fique ligando e desligando sem parar.

### Função 4: `verificarAlertas(leituras)`

**RF13.** Retorna uma lista de alertas, na ordem abaixo, ou uma lista vazia se não houver alertas:
- `"SENSOR_COM_FALHA"`: as 3 leituras mais recentes são todas inválidas;
- `"SOLO_CRITICO"`: a umidade média (Função 2) é inferior a 15%;
- `"TEMPERATURA_ALTA"`: a temperatura da leitura válida mais recente é maior ou igual a 40 °C.

## Exemplo

```js
decidirBomba(false, 25.0, 0)   // "LIGAR"
decidirBomba(true, 35.0, 20)   // "MANTER"
```

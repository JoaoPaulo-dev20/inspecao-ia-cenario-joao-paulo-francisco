// Parte 2: casos de teste escritos pela DUPLA, a partir de requisitos.md.
// Para rodar: npm test   (Node.js 18 ou superior; nenhuma biblioteca externa)

const test = require("node:test");
const assert = require("node:assert/strict");
const { validarLeitura, mediaUmidade, decidirBomba, verificarAlertas } = require("../src/irrigacao.js");

// Exemplos (podem ser mantidos e contam no total):

test("EX01: leitura normal é válida", () => {
  assert.equal(validarLeitura({ umidade: 35, temperatura: 28 }), true);
});

test("EX02: exemplo da especificação", () => {
  assert.equal(decidirBomba(false, 25.0, 0), "LIGAR");
  assert.equal(decidirBomba(true, 35.0, 20), "MANTER");
});

// ===== Testes de validarLeitura (mínimo de 5) =====

// ===== Testes de mediaUmidade (mínimo de 5) =====

// ===== Testes de decidirBomba (mínimo de 5) =====

// ===== Testes de verificarAlertas (mínimo de 5) =====

// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.

// Montado com apoio de IA; revisão da dupla pendente.
test("V01: rejeita umidade acima de 100", () => {
  const leitura = { umidade: 101, temperatura: 28 };

  assert.equal(validarLeitura(leitura), false);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("V02: aceita umidade no limite de zero", () => {
  const leitura = { umidade: 0, temperatura: 28 };

  assert.equal(validarLeitura(leitura), true);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("V03: aceita umidade no limite de 100", () => {
  const leitura = { umidade: 100, temperatura: 28 };

  assert.equal(validarLeitura(leitura), true);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("V04: rejeita umidade negativa", () => {
  const leitura = { umidade: -1, temperatura: 28 };

  assert.equal(validarLeitura(leitura), false);
});

// Casos sugeridos por IA; revisão da dupla pendente.
test("V05: aceita temperatura de -10 graus", () => {
  const leitura = { umidade: 35, temperatura: -10 };

  assert.equal(validarLeitura(leitura), true);
});

test("V06: aceita temperatura de 60 graus", () => {
  const leitura = { umidade: 35, temperatura: 60 };

  assert.equal(validarLeitura(leitura), true);
});

// Casos sugeridos por IA; revisão da dupla pendente.
test("V07: rejeita sensor desconectado", () => {
  const leitura = { umidade: 35, temperatura: -127 };

  assert.equal(validarLeitura(leitura), false);
});

test("V08: rejeita umidade com falha de leitura", () => {
  const leitura = { umidade: NaN, temperatura: 28 };

  assert.equal(validarLeitura(leitura), false);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M01: calcula a média de três leituras válidas", () => {
  const leituras = [
    { umidade: 20, temperatura: 28 },
    { umidade: 30, temperatura: 28 },
    { umidade: 40, temperatura: 28 }
  ];

  assert.equal(mediaUmidade(leituras), 30);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M02: retorna null quando há apenas duas leituras válidas", () => {
  const leituras = [
    { umidade: 20, temperatura: 28 },
    { umidade: 40, temperatura: 28 }
  ];

  assert.equal(mediaUmidade(leituras), null);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M03: usa somente as cinco leituras mais recentes", () => {
  const leituras = [
    { umidade: 100, temperatura: 28 },
    { umidade: 10, temperatura: 28 },
    { umidade: 20, temperatura: 28 },
    { umidade: 30, temperatura: 28 },
    { umidade: 40, temperatura: 28 },
    { umidade: 50, temperatura: 28 }
  ];

  assert.equal(mediaUmidade(leituras), 30);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M04: ignora leituras inválidas ao calcular a média", () => {
  const leituras = [
    { umidade: 20, temperatura: 28 },
    { umidade: 100, temperatura: -127 },
    { umidade: 40, temperatura: 28 },
    { umidade: -1, temperatura: 28 },
    { umidade: 60, temperatura: 28 }
  ];

  assert.equal(mediaUmidade(leituras), 40);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M05: arredonda a média para uma casa decimal", () => {
  const leituras = [
    { umidade: 20, temperatura: 28 },
    { umidade: 20, temperatura: 28 },
    { umidade: 21, temperatura: 28 }
  ];

  assert.equal(mediaUmidade(leituras), 20.3);
});

// Caso sugerido por IA; revisão da dupla pendente.
test("M06: retorna null com apenas duas válidas nas últimas cinco", () => {
  const leituras = [
    { umidade: 10, temperatura: 28 },
    { umidade: 20, temperatura: 28 },
    { umidade: 30, temperatura: 28 },
    { umidade: 40, temperatura: -127 },
    { umidade: 50, temperatura: -127 },
    { umidade: 60, temperatura: -127 }
  ];

  assert.equal(mediaUmidade(leituras), null);
});


test("AUT01: verifica leitura com umidade 90 e temperatura 30", () => {
  const leitura = { umidade: 90, temperatura: 30 };

  assert.equal(validarLeitura(leitura), true);
});


test("AUT02: rejeita temperatura acima do limite", () => {
  const leitura = { umidade: 90, temperatura: 61 };

  assert.equal(validarLeitura(leitura), false);
});


test("AUT03: desliga bomba ao completar 60 minutos", () => {
  const resultado = decidirBomba(true, 20, 60);

  assert.equal(resultado, "DESLIGAR");
});

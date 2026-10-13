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

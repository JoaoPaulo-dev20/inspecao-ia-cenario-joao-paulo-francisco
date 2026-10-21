// PARTE 2.6 — Testes gerados pela IA para o código original da IA.
// NÃO são os testes da dupla. Estes devem ser escritos em test/irrigacao.test.js.
// Execute contra o código ORIGINAL: node --test evidencias/testes-gerados-pela-ia.js
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  validarLeitura,
  mediaUmidade,
  decidirBomba,
  verificarAlertas,
} = require('../src/irrigacao.js');

const leitura = (umidade, temperatura = 25) => ({ umidade, temperatura });

// Função 1: validarLeitura — RF01, RF02, RF03

test('IA-V01 [RF01/RF02] leitura normal é válida', () => {
  assert.equal(validarLeitura(leitura(35, 28)), true);
});

test('IA-V02 [RF02] aceita limites mínimos: 0% e -10°C', () => {
  assert.equal(validarLeitura(leitura(0, -10)), true);
});

test('IA-V03 [RF02] aceita limites máximos: 100% e 60°C', () => {
  assert.equal(validarLeitura(leitura(100, 60)), true);
});

test('IA-V04 [RF02] rejeita umidade superior a 100%', () => {
  assert.equal(validarLeitura(leitura(101, 25)), false);
});

test('IA-V05 [RF03] rejeita sensor de temperatura desconectado (-127°C)', () => {
  assert.equal(validarLeitura(leitura(30, -127)), false);
});

test('IA-V06 [RF03] rejeita falha de leitura de umidade (NaN)', () => {
  assert.equal(validarLeitura(leitura(Number.NaN, 25)), false);
});

test('IA-V07 [RF01] rejeita leitura nula', () => {
  assert.equal(validarLeitura(null), false);
});

// Função 2: mediaUmidade — RF04, RF05, RF06

test('IA-M01 [RF05/RF06] média com três leituras válidas', () => {
  assert.equal(mediaUmidade([leitura(10), leitura(20), leitura(30)]), 20);
});

test('IA-M02 [RF04/RF05] média com cinco leituras válidas', () => {
  assert.equal(mediaUmidade([10, 20, 30, 40, 50].map(u => leitura(u))), 30);
});

test('IA-M03 [RF04] ignora leituras anteriores às cinco mais recentes', () => {
  assert.equal(mediaUmidade([90, 90, 10, 20, 30, 40, 50].map(u => leitura(u))), 30);
});

test('IA-M04 [RF05/RF06] ignora duas leituras inválidas entre as cinco recentes', () => {
  assert.equal(mediaUmidade([
    leitura(10), leitura(20), leitura(30), leitura(40, -127), leitura(NaN),
  ]), 20);
});

test('IA-M05 [RF06] retorna null quando só existem duas leituras válidas', () => {
  assert.equal(mediaUmidade([leitura(10), leitura(20), leitura(NaN)]), null);
});

test('IA-M06 [RF05] arredonda a média para uma casa decimal', () => {
  assert.equal(mediaUmidade([leitura(22.14), leitura(22.15), leitura(22.17)]), 22.2);
});

test('IA-M07 [RF06] retorna null para lista vazia', () => {
  assert.equal(mediaUmidade([]), null);
});

// Função 3: decidirBomba — RF07 a RF12

test('IA-B01 [RF10] bomba desligada e solo com 25% de umidade: LIGAR', () => {
  assert.equal(decidirBomba(false, 25, 0), 'LIGAR');
});

test('IA-B02 [RF10/RF12] exatamente 30% com bomba desligada: MANTER', () => {
  assert.equal(decidirBomba(false, 30, 0), 'MANTER');
});

test('IA-B03 [RF11/RF12] bomba ligada com umidade 39.9%: MANTER', () => {
  assert.equal(decidirBomba(true, 39.9, 20), 'MANTER');
});

test('IA-B04 [RF11] bomba ligada com umidade de 40%: DESLIGAR', () => {
  assert.equal(decidirBomba(true, 40, 20), 'DESLIGAR');
});

test('IA-B05 [RF08] segurança: 60 minutos ligada força DESLIGAR mesmo com solo seco', () => {
  assert.equal(decidirBomba(true, 5, 60), 'DESLIGAR');
});

test('IA-B06 [RF09] bomba ligada sem média confiável: DESLIGAR', () => {
  assert.equal(decidirBomba(true, null, 10), 'DESLIGAR');
});

test('IA-B07 [RF09] bomba desligada sem média confiável: MANTER', () => {
  assert.equal(decidirBomba(false, null, 0), 'MANTER');
});

// Função 4: verificarAlertas — RF13

test('IA-A01 [RF13] sem condições de alerta: lista vazia', () => {
  assert.deepEqual(verificarAlertas([leitura(30), leitura(35), leitura(40)]), []);
});

test('IA-A02 [RF13] três leituras recentes inválidas geram SENSOR_COM_FALHA', () => {
  assert.deepEqual(verificarAlertas([
    leitura(NaN), leitura(40, -127), leitura(105),
  ]), ['SENSOR_COM_FALHA']);
});

test('IA-A03 [RF13] umidade média abaixo de 15 gera SOLO_CRITICO', () => {
  assert.deepEqual(verificarAlertas([leitura(12), leitura(13), leitura(14)]), ['SOLO_CRITICO']);
});

test('IA-A04 [RF13] média exatamente 15 não gera SOLO_CRITICO', () => {
  assert.deepEqual(verificarAlertas([leitura(15), leitura(15), leitura(15)]), []);
});

test('IA-A05 [RF13] temperatura da leitura válida mais recente igual a 40 gera alerta', () => {
  assert.deepEqual(verificarAlertas([leitura(35, 25), leitura(35, 30), leitura(35, 40)]), ['TEMPERATURA_ALTA']);
});

test('IA-A06 [RF13] leitura inválida mais recente não oculta temperatura alta da última válida', () => {
  assert.deepEqual(verificarAlertas([
    leitura(30, 26), leitura(30, 41), leitura(30, -127), leitura(NaN, 20),
  ]), ['TEMPERATURA_ALTA']);
});

test('IA-A07 [RF13] dois alertas simultâneos obedecem à ordem exigida', () => {
  assert.deepEqual(verificarAlertas([
    leitura(10, 20), leitura(11, 22), leitura(12, 40),
  ]), ['SOLO_CRITICO', 'TEMPERATURA_ALTA']);
});

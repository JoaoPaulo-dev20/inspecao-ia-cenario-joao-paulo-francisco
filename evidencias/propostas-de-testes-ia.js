// Propostas criadas com apoio de IA — Parte 2.
// Revise as entradas e os resultados esperados antes de executar.
// Após a revisão: node --test evidencias/propostas-de-testes-ia.js
// Os testes próprios do template permanecem em test/irrigacao.test.js.

const test = require('node:test');
const assert = require('node:assert/strict');
const funcoes = require('../src/irrigacao.js');
const { casos } = require('./casos-propostos-ia.js');

for (const caso of casos) {
  test(`${caso.id}: ${caso.descricao}`, () => {
    const resultado = funcoes[caso.funcao](...caso.entrada);
    assert.deepEqual(resultado, caso.esperado, caso.explicacao);
  });
}

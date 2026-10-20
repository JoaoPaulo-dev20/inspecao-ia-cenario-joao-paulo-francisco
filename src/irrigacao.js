/**
 * Verifica se uma leitura possui umidade e temperatura dentro dos limites.
 * @param {{ umidade: number, temperatura: number }} leitura
 * @returns {boolean}
 */
function validarLeitura(leitura) {
  if (leitura === null || typeof leitura !== 'object') {
    return false;
  }

  const { umidade, temperatura } = leitura;

  return (
    typeof umidade === 'number' &&
    !Number.isNaN(umidade) &&
    umidade >= 0 &&
    umidade <= 100 &&
    typeof temperatura === 'number' &&
    !Number.isNaN(temperatura) &&
    temperatura >= -10 &&
    temperatura <= 60
  );
}

/**
 * Calcula a umidade média das leituras válidas entre as cinco mais recentes.
 * @param {Array<{ umidade: number, temperatura: number }>} leituras
 * @returns {number|null}
 */
function mediaUmidade(leituras) {
  if (!Array.isArray(leituras)) {
    return null;
  }

  const recentes = leituras.slice(-5);
  const validas = recentes.filter(validarLeitura);

  if (validas.length < 3) {
    return null;
  }

  const soma = validas.reduce((total, leitura) => total + leitura.umidade, 0);
  const media = soma / validas.length;

  return Math.round(media * 10) / 10;
}

/**
 * Determina a próxima ação da bomba de irrigação.
 * @param {boolean} bombaLigada
 * @param {number|null} umidadeMedia
 * @param {number} minutosLigada
 * @returns {'LIGAR'|'DESLIGAR'|'MANTER'}
 */
function decidirBomba(bombaLigada, umidadeMedia, minutosLigada) {
  if (bombaLigada && minutosLigada >= 60) {
    return 'DESLIGAR';
  }

  if (umidadeMedia === null) {
    return bombaLigada ? 'DESLIGAR' : 'MANTER';
  }

  if (!bombaLigada && umidadeMedia < 30) {
    return 'LIGAR';
  }

  if (bombaLigada && umidadeMedia >= 40) {
    return 'DESLIGAR';
  }

  return 'MANTER';
}

/**
 * Lista os alertas ativos na ordem definida pelos requisitos.
 * @param {Array<{ umidade: number, temperatura: number }>} leituras
 * @returns {string[]}
 */
function verificarAlertas(leituras) {
  const alertas = [];
  const lista = Array.isArray(leituras) ? leituras : [];
  const ultimasTres = lista.slice(-3);

  if (ultimasTres.length === 3 && ultimasTres.every(leitura => !validarLeitura(leitura))) {
    alertas.push('SENSOR_COM_FALHA');
  }

  const umidade = mediaUmidade(lista);
  if (umidade !== null && umidade < 15) {
    alertas.push('SOLO_CRITICO');
  }

  const leituraValidaMaisRecente = [...lista].reverse().find(validarLeitura);
  if (leituraValidaMaisRecente && leituraValidaMaisRecente.temperatura >= 40) {
    alertas.push('TEMPERATURA_ALTA');
  }

  return alertas;
}

module.exports = { validarLeitura, mediaUmidade, decidirBomba, verificarAlertas };

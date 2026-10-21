(() => {
  'use strict';

  const logic = window.IrrigaFrontendModule?.exports;
  const $ = id => document.getElementById(id);
  if (!logic || ['validarLeitura', 'mediaUmidade', 'decidirBomba', 'verificarAlertas'].some(name => typeof logic[name] !== 'function')) {
    $('load-error').hidden = false;
    document.querySelectorAll('main button, main input, main select').forEach(element => { element.disabled = true; });
    return;
  }
  delete window.module;

  const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  const format = value => Number.isFinite(value) ? number.format(value) : '—';
  const makeReading = (umidade, temperatura = 27) => ({ umidade, temperatura });
  const scenarios = {
    dry: { readings: [31, 28, 26, 22, 19].map(value => makeReading(value)), pump: false, minutes: 0, label: 'Solo seco' },
    balanced: { readings: [38, 37, 35, 34, 33].map(value => makeReading(value, 25)), pump: false, minutes: 0, label: 'Solo equilibrado' },
    heat: { readings: [makeReading(14, 37), makeReading(12, 39), makeReading(11, 40), makeReading(9, 42), makeReading(8, 44)], pump: false, minutes: 0, label: 'Calor intenso' },
    failure: { readings: [makeReading(31, 26), makeReading(33, 27), makeReading(NaN), makeReading(35, -127), makeReading(105)], pump: true, minutes: 15, label: 'Falha no sensor' },
  };
  const alertContent = {
    SENSOR_COM_FALHA: { title: 'Falha no sensor', description: 'As 3 leituras mais recentes são inválidas. Confira as condições simuladas dos sensores.' },
    SOLO_CRITICO: { title: 'Solo em condição crítica', description: 'A umidade média está abaixo de 15%. O solo precisa de atenção.' },
    TEMPERATURA_ALTA: { title: 'Temperatura alta', description: 'A última leitura válida está em 40 °C ou mais.' },
  };
  const state = { readings: [], pump: false, minutes: 0, scenario: 'dry' };
  let toastTimer;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function svgNode(tag, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  }

  function icon(kind) {
    const element = svgNode('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' });
    if (kind === 'ok') {
      element.append(svgNode('circle', { cx: 12, cy: 12, r: 9 }), svgNode('path', { d: 'm8 12 3 3 5-6' }));
    } else {
      element.append(svgNode('path', { d: 'm12 3 10 17H2L12 3Z' }), svgNode('path', { d: 'M12 9v4M12 16h.01' }));
    }
    return element;
  }

  function feedback(message) {
    window.clearTimeout(toastTimer);
    $('feedback').textContent = message;
    $('feedback').hidden = false;
    toastTimer = window.setTimeout(() => { $('feedback').hidden = true; }, 4800);
  }

  function selectScenario(key, announce = true) {
    const scenario = scenarios[key];
    state.readings = scenario.readings.map(reading => ({ ...reading }));
    state.pump = scenario.pump;
    state.minutes = scenario.minutes;
    state.scenario = key;
    const latestValid = [...state.readings].reverse().find(logic.validarLeitura);
    $('humidity-input').value = latestValid?.umidade ?? 25;
    $('humidity-range').value = Math.min(100, Math.max(0, latestValid?.umidade ?? 25));
    $('temperature-input').value = latestValid?.temperatura ?? 27;
    $('sensor-input').value = 'normal';
    updateSensorFields();
    render();
    if (announce) feedback(`Cenário carregado: ${scenario.label.toLowerCase()}.`);
  }

  function updateSensorFields() {
    const mode = $('sensor-input').value;
    $('humidity-input').disabled = mode === 'humidity-failure';
    $('humidity-range').disabled = mode === 'humidity-failure';
    $('temperature-input').disabled = mode === 'disconnected';
  }

  function decisionExplanation(action, average) {
    if (state.pump && state.minutes >= 60) return 'A bomba atingiu o limite de 60 minutos ligada. O desligamento tem prioridade por segurança.';
    if (average === null) return state.pump
      ? 'Não há pelo menos 3 leituras válidas entre as 5 mais recentes. A bomba deve desligar por segurança.'
      : 'Não há pelo menos 3 leituras válidas entre as 5 mais recentes. A bomba deve continuar desligada.';
    if (action === 'LIGAR') return `A média está em ${format(average)}%, abaixo de 30%. É hora de iniciar a irrigação.`;
    if (action === 'DESLIGAR') return `A média está em ${format(average)}%, a partir de 40%. A irrigação pode ser interrompida.`;
    return `Com média de ${format(average)}%, a bomba deve continuar ${state.pump ? 'ligada' : 'desligada'}. Não é necessária uma mudança.`;
  }

  function render() {
    // Toda decisão e validação vêm do módulo original exigido na atividade.
    const average = logic.mediaUmidade(state.readings);
    const action = logic.decidirBomba(state.pump, average, state.minutes);
    const alerts = logic.verificarAlertas(state.readings);
    const recent = state.readings.slice(-5);
    const valid = recent.filter(logic.validarLeitura);
    const latestValid = [...state.readings].reverse().find(logic.validarLeitura);

    $('humidity-value').textContent = average === null ? '—' : format(average);
    $('humidity-unit').hidden = average === null;
    $('humidity-description').textContent = average === null ? 'Média indisponível' : 'Média das leituras recentes';
    $('humidity-progress').style.width = `${average === null ? 0 : Math.min(100, Math.max(0, average))}%`;
    $('temperature-value').textContent = latestValid ? format(latestValid.temperatura) : '—';
    $('temperature-unit').hidden = !latestValid;
    $('temperature-description').textContent = latestValid ? 'Última leitura válida' : 'Nenhuma leitura válida';
    $('pump-value').textContent = state.pump ? 'Ligada' : 'Desligada';
    $('pump-description').textContent = state.pump ? `Há ${format(state.minutes)} minutos` : 'Sem irrigação em andamento';
    $('pump-dot').style.background = state.pump ? '#80b56d' : '#b5c3ab';
    $('valid-value').textContent = String(valid.length);
    $('valid-total').textContent = `/ ${recent.length}`;
    $('valid-description').textContent = valid.length >= 3 ? 'Dados suficientes para a média' : 'Mínimo de 3 para calcular a média';

    const title = { LIGAR: 'Ligar a bomba', DESLIGAR: 'Desligar a bomba', MANTER: 'Manter o estado' }[action];
    $('decision-title').textContent = title;
    $('decision-badge').textContent = action === 'MANTER' ? 'MANTER' : action;
    $('decision-badge').classList.toggle('warn', action === 'DESLIGAR');
    $('decision-reason').textContent = decisionExplanation(action, average);
    $('apply-button').disabled = action === 'MANTER';
    $('apply-button').textContent = action === 'MANTER' ? 'Estado mantido' : `Aplicar: ${title.toLowerCase()}`;
    $('pump-toggle').checked = state.pump;
    $('minutes-input').disabled = !state.pump;
    $('minutes-input').value = String(state.minutes);
    document.querySelectorAll('[data-scenario]').forEach(button => {
      const selected = state.scenario === button.dataset.scenario;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    renderChart();
    renderHistory();
    renderAlerts(alerts);
  }

  function renderChart() {
    const chart = $('humidity-chart');
    chart.replaceChildren();
    const width = Math.max(280, Math.round(chart.getBoundingClientRect().width || 650));
    const height = width < 440 ? 230 : 245;
    chart.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const left = 35, right = width - 13, top = 17, bottom = height - 29;
    const samples = state.readings.slice(-12);
    const start = state.readings.length - samples.length;
    const y = value => bottom - (value / 100) * (bottom - top);
    const x = index => samples.length === 1 ? (left + right) / 2 : left + (index / Math.max(1, samples.length - 1)) * (right - left);

    [0, 15, 30, 40, 60, 80, 100].forEach(value => {
      const threshold = value === 30 || value === 40;
      chart.append(svgNode('line', { x1: left, y1: y(value), x2: right, y2: y(value), stroke: threshold ? '#c1d0b4' : '#edf1e7', 'stroke-width': 1, 'stroke-dasharray': threshold ? '4 5' : '0' }));
      const label = svgNode('text', { x: left - 9, y: y(value) + 3, 'text-anchor': 'end', fill: threshold ? '#8ba475' : '#a1ae96', 'font-size': 9, 'font-family': 'Segoe UI, Arial, sans-serif' });
      label.textContent = String(value);
      chart.append(label);
    });
    if (!samples.length) {
      const text = svgNode('text', { x: (left + right) / 2, y: (top + bottom) / 2, 'text-anchor': 'middle', fill: '#8d9e7c', 'font-size': 11, 'font-family': 'Segoe UI, Arial, sans-serif' });
      text.textContent = 'Registre uma leitura para começar.';
      chart.append(text);
      $('chart-description').textContent = 'Nenhuma leitura registrada.';
      return;
    }
    let segment = [];
    function drawSegment() {
      if (segment.length >= 2) {
        const points = segment.map(point => `${point.x},${point.y}`).join(' ');
        chart.append(svgNode('polygon', { points: `${segment[0].x},${bottom} ${points} ${segment[segment.length - 1].x},${bottom}`, fill: '#8ec888', opacity: '.10' }));
        chart.append(svgNode('polyline', { points, fill: 'none', stroke: '#579767', 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      }
      segment = [];
    }
    samples.forEach((reading, index) => {
      if (logic.validarLeitura(reading)) segment.push({ x: x(index), y: y(reading.umidade) });
      else drawSegment();
    });
    drawSegment();
    samples.forEach((reading, index) => {
      const valid = logic.validarLeitura(reading);
      const point = valid
        ? svgNode('circle', { cx: x(index), cy: y(reading.umidade), r: 4, fill: '#fff', stroke: '#579767', 'stroke-width': 2 })
        : svgNode('path', { d: `M${x(index) - 3},${bottom - 7}l6,6m0,-6l-6,6`, fill: 'none', stroke: '#bf945d', 'stroke-width': 1.8, 'stroke-linecap': 'round' });
      const title = svgNode('title');
      title.textContent = `Leitura ${start + index + 1}: ${valid ? format(reading.umidade) + '% de umidade' : 'inválida'}`;
      point.append(title);
      chart.append(point);
      if (width >= 440 || samples.length <= 6 || index % 2 === 0 || index === samples.length - 1) {
        const label = svgNode('text', { x: x(index), y: bottom + 20, 'text-anchor': 'middle', fill: '#a1ae96', 'font-size': 9, 'font-family': 'Segoe UI, Arial, sans-serif' });
        label.textContent = `L${String(start + index + 1).padStart(2, '0')}`;
        chart.append(label);
      }
    });
    $('chart-description').textContent = samples.map((reading, index) => `Leitura ${start + index + 1}: ${logic.validarLeitura(reading) ? format(reading.umidade) + '% de umidade' : 'inválida'}`).join('. ');
  }

  function renderHistory() {
    const body = $('history-body');
    body.replaceChildren();
    const visible = state.readings.slice(-8);
    const start = state.readings.length - visible.length;
    visible.forEach((reading, index) => {
      const row = node('tr');
      row.append(node('td', '', `L${String(start + index + 1).padStart(2, '0')}`));
      row.append(node('td', '', Number.isNaN(reading.umidade) ? 'Falha' : `${format(reading.umidade)}%`));
      row.append(node('td', '', `${format(reading.temperatura)} °C`));
      const valid = logic.validarLeitura(reading);
      const status = node('td');
      status.append(node('span', `validation-pill${valid ? '' : ' invalid'}`, valid ? 'Válida' : 'Inválida'));
      row.append(status);
      body.prepend(row);
    });
    if (!visible.length) {
      const row = node('tr');
      const cell = node('td', 'empty-row', 'Nenhuma leitura por enquanto. Adicione a primeira acima.');
      cell.colSpan = 4;
      row.append(cell);
      body.append(row);
    }
    $('history-description').textContent = state.readings.length > 8 ? 'As 8 mais recentes, da mais nova para a mais antiga.' : 'Da mais recente para a mais antiga.';
    $('history-footer').textContent = `${state.readings.length} ${state.readings.length === 1 ? 'leitura registrada' : 'leituras registradas'} · ${Math.min(5, state.readings.length)} na janela atual do cálculo`;
    $('clear-button').disabled = !state.readings.length;
  }

  function renderAlerts(alerts) {
    $('alert-count').textContent = String(alerts.length);
    $('alert-count').classList.toggle('has-alerts', alerts.length > 0);
    const list = $('alerts-list');
    list.replaceChildren();
    if (!alerts.length) {
      const empty = node('div', 'alert-empty');
      empty.append(icon('ok'), node('strong', '', state.readings.length ? 'Nenhum alerta ativo' : 'Aguardando leituras'));
      empty.append(node('p', '', state.readings.length ? 'Nenhuma condição de alerta foi identificada nas leituras registradas.' : 'Registre uma leitura para começar a análise dos sensores.'));
      list.append(empty);
      return;
    }
    // A sequência é a devolvida pela função original, sem reordenar alertas.
    alerts.forEach(code => {
      const item = node('div', 'alert-item');
      const text = node('div');
      text.append(node('h3', '', alertContent[code]?.title ?? code));
      text.append(node('p', '', alertContent[code]?.description ?? 'Condição de alerta identificada.'));
      item.append(icon('warning'), text);
      list.append(item);
    });
  }

  $('reading-form').addEventListener('submit', event => {
    event.preventDefault();
    const mode = $('sensor-input').value;
    const humidity = mode === 'humidity-failure' ? NaN : $('humidity-input').valueAsNumber;
    const temperature = mode === 'disconnected' ? -127 : $('temperature-input').valueAsNumber;
    if ((mode !== 'humidity-failure' && !Number.isFinite(humidity)) || !Number.isFinite(temperature)) {
      feedback('Preencha a umidade e a temperatura com números.');
      return;
    }
    const reading = makeReading(humidity, temperature);
    state.readings.push(reading);
    state.scenario = null;
    render();
    feedback(logic.validarLeitura(reading) ? 'Leitura registrada. A decisão e os alertas foram atualizados.' : 'Leitura registrada como inválida. Ela não entra na média de umidade.');
  });
  $('humidity-range').addEventListener('input', () => { $('humidity-input').value = $('humidity-range').value; });
  $('humidity-input').addEventListener('input', () => {
    const value = $('humidity-input').valueAsNumber;
    if (Number.isFinite(value)) $('humidity-range').value = Math.min(100, Math.max(0, value));
  });
  $('sensor-input').addEventListener('change', updateSensorFields);
  $('pump-toggle').addEventListener('change', () => {
    state.pump = $('pump-toggle').checked;
    state.minutes = 0;
    state.scenario = null;
    render();
    feedback(`Estado simulado: bomba ${state.pump ? 'ligada' : 'desligada'}.`);
  });
  $('minutes-input').addEventListener('change', () => {
    const value = $('minutes-input').valueAsNumber;
    if (!Number.isFinite(value) || value < 0) {
      $('minutes-input').value = String(state.minutes);
      feedback('Informe um tempo igual ou maior que zero.');
      return;
    }
    state.minutes = value;
    state.scenario = null;
    render();
  });
  $('apply-button').addEventListener('click', () => {
    const action = logic.decidirBomba(state.pump, logic.mediaUmidade(state.readings), state.minutes);
    if (action === 'MANTER') return;
    state.pump = action === 'LIGAR';
    state.minutes = 0;
    state.scenario = null;
    render();
    feedback(`Decisão aplicada: bomba ${state.pump ? 'ligada' : 'desligada'} no simulador.`);
  });
  $('clear-button').addEventListener('click', () => {
    state.readings = [];
    state.scenario = null;
    render();
    feedback('Histórico limpo. Você pode restaurar o exemplo a qualquer momento.');
  });
  $('reset-button').addEventListener('click', () => selectScenario('dry'));
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => selectScenario(button.dataset.scenario)));
  document.querySelectorAll('.navigation a').forEach(link => link.addEventListener('click', () => {
    document.querySelectorAll('.navigation a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  }));
  const dialog = $('about-dialog');
  $('about-button').addEventListener('click', () => dialog.showModal());
  $('close-about').addEventListener('click', () => dialog.close());
  $('understood-button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  window.addEventListener('resize', renderChart);
  selectScenario('dry', false);
})();

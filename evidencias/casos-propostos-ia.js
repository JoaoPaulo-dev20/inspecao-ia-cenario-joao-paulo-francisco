// Propostas criadas com apoio de IA em 20/10/2026.
// Material de estudo: não atribuir estes casos à dupla como autoria independente.
// Resultados esperados derivados de requisitos.md; revisão humana pendente.
// Este arquivo só descreve os casos. Ele não importa nem executa o módulo.

const casos = [];
const leitura = (umidade, temperatura = 28) => ({ umidade, temperatura });

function adicionar(funcao, id, descricao, requisito, entrada, esperado, explicacao) {
  casos.push({ id: `IA-P-${id}`, funcao, descricao, requisito, entrada, esperado, explicacao });
}

// Validar leituras: limites incluídos, valores fora da faixa e falhas de sensores.
const validar = (...dados) => adicionar('validarLeitura', ...dados);

validar('V01', 'Uma leitura comum deve ser aceita', 'RF01/RF02',
  [leitura(35, 28)], true, '35% e 28°C estão dentro dos intervalos permitidos.');
validar('V02', 'Umidade igual a zero ainda está no intervalo', 'RF02',
  [leitura(0)], true, 'O limite inferior de umidade é incluído; zero não invalida a leitura.');
validar('V03', 'Umidade igual a cem ainda está no intervalo', 'RF02',
  [leitura(100)], true, 'O limite superior de umidade também é incluído.');
validar('V04', 'Temperatura de menos dez graus é aceita', 'RF02',
  [leitura(35, -10)], true, 'A temperatura mínima permitida é -10°C, incluindo esse valor.');
validar('V05', 'Temperatura de sessenta graus é aceita', 'RF02',
  [leitura(35, 60)], true, '60°C é permitido; o problema começa acima desse limite.');
validar('V06', 'Umidade um pouco abaixo de zero é rejeitada', 'RF02',
  [leitura(-0.1)], false, '-0,1% está fora do intervalo, mesmo com uma diferença pequena.');
validar('V07', 'Umidade um pouco acima de cem é rejeitada', 'RF02',
  [leitura(100.1)], false, '100,1% ultrapassa o limite superior.');
validar('V08', 'Temperatura abaixo de menos dez é rejeitada', 'RF02',
  [leitura(35, -10.1)], false, '-10,1°C está fora do intervalo permitido.');
validar('V09', 'Temperatura acima de sessenta é rejeitada', 'RF02',
  [leitura(35, 60.1)], false, '60,1°C ultrapassa o limite superior.');
validar('V10', 'Sensor desconectado torna a leitura inválida', 'RF03',
  [leitura(35, -127)], false, '-127°C é o sinal de sensor desconectado definido na especificação.');
validar('V11', 'Falha de umidade com NaN é rejeitada', 'RF03',
  [leitura(NaN)], false, 'NaN representa falha na leitura de umidade.');
validar('V12', 'Umidade escrita como texto não é um número válido', 'RF02',
  [{ umidade: '35', temperatura: 28 }], false, 'O texto 35 não deve ser convertido silenciosamente em número.');

// Média: primeiro separam-se as cinco posições recentes; depois as inválidas saem do cálculo.
const media = (...dados) => adicionar('mediaUmidade', ...dados);

media('M01', 'Três leituras válidas já permitem calcular a média', 'RF05/RF06',
  [[leitura(10), leitura(20), leitura(30)]], 20, 'A soma é 60 e existem três leituras válidas: 60 dividido por 3 é 20.');
media('M02', 'Duas leituras válidas ainda não são suficientes', 'RF06',
  [[leitura(10), leitura(20)]], null, 'O requisito exige pelo menos três leituras válidas.');
media('M03', 'Uma lista vazia não oferece dados confiáveis', 'RF06',
  [[]], null, 'Sem leituras válidas, o resultado deve indicar ausência de dados confiáveis.');
media('M04', 'Cinco leituras válidas entram no cálculo', 'RF04/RF05',
  [[leitura(10), leitura(20), leitura(30), leitura(40), leitura(50)]], 30, '150 dividido pelas cinco leituras resulta em 30.');
media('M05', 'A sexta leitura mais antiga fica fora da média', 'RF04/RF05',
  [[leitura(0), leitura(20), leitura(30), leitura(40), leitura(50), leitura(60)]], 40, 'A leitura de 0% é antiga; as cinco recentes somam 200 e a média é 40.');
media('M06', 'Leituras antigas não completam a quantidade mínima', 'RF04/RF06',
  [[leitura(10), leitura(20), leitura(30), leitura(40), leitura(50), leitura(NaN), leitura(35, -127), leitura(101)]], null,
  'Nas cinco posições mais recentes só duas leituras são válidas. Buscar dados anteriores mudaria a janela de RF04.');
media('M07', 'As leituras inválidas da janela são ignoradas', 'RF03/RF05/RF06',
  [[leitura(10), leitura(NaN), leitura(20), leitura(35, -127), leitura(30)]], 20,
  'Restam as umidades 10, 20 e 30; as inválidas não entram na soma nem na quantidade da divisão.');
media('M08', 'Uma média de vinte e um terço vira vinte vírgula três', 'RF05',
  [[leitura(20), leitura(20), leitura(21)]], 20.3, '61 dividido por 3 é aproximadamente 20,333; com uma casa decimal, fica 20,3.');
media('M09', 'Uma média de vinte e dois terços vira vinte vírgula sete', 'RF05',
  [[leitura(20), leitura(21), leitura(21)]], 20.7, '62 dividido por 3 é aproximadamente 20,667; com uma casa decimal, fica 20,7.');
media('M10', 'Três umidades iguais a zero produzem média zero', 'RF02/RF05/RF06',
  [[leitura(0), leitura(0), leitura(0)]], 0, 'Zero é uma umidade válida; média zero é diferente de ausência de média.');
media('M11', 'Uma janela só com falhas não produz média', 'RF03/RF06',
  [[leitura(NaN), leitura(35, -127), leitura(101)]], null, 'Nenhuma das três leituras é válida.');
media('M12', 'Valores decimais de umidade também entram na média', 'RF02/RF05',
  [[leitura(0.2), leitura(0.3), leitura(0.4)]], 0.3, 'A soma é 0,9; dividindo por três, a média com uma casa decimal é 0,3.');

// Bomba: testar os dois lados dos limites e as prioridades de segurança.
const bomba = (...dados) => adicionar('decidirBomba', ...dados);

bomba('B01', 'Bomba desligada liga abaixo de trinta por cento', 'RF10',
  [false, 29.9, 0], 'LIGAR', '29,9% é inferior a 30% e a bomba está desligada.');
bomba('B02', 'Exatamente trinta por cento não faz a bomba ligar', 'RF10/RF12',
  [false, 30, 0], 'MANTER', 'RF10 usa inferior a 30%; o valor 30 fica fora dessa condição.');
bomba('B03', 'Bomba ligada continua ligada um pouco abaixo de quarenta', 'RF11/RF12',
  [true, 39.9, 20], 'MANTER', '39,9% ainda não atinge o limite de desligamento por umidade.');
bomba('B04', 'Exatamente quarenta por cento desliga a bomba ligada', 'RF11',
  [true, 40, 20], 'DESLIGAR', 'O limite de desligamento inclui 40%.');
bomba('B05', 'Umidade baixa não muda uma bomba que já está ligada', 'RF10/RF12',
  [true, 20, 20], 'MANTER', 'A regra de ligar só se aplica quando a bomba está desligada.');
bomba('B06', 'Uma bomba desligada continua desligada com solo úmido', 'RF10/RF12',
  [false, 40, 0], 'MANTER', 'Não há motivo para ligar; MANTER preserva o estado desligado.');
bomba('B07', 'Antes de sessenta minutos o limite de tempo não atua', 'RF08/RF12',
  [true, 20, 59.9], 'MANTER', '59,9 é menor que 60 e a umidade está abaixo de 40%; nenhuma regra manda desligar.');
bomba('B08', 'Sessenta minutos desligam a bomba mesmo com solo seco', 'RF08/RF12',
  [true, 20, 60], 'DESLIGAR', 'O limite de segurança tem prioridade sobre continuar irrigando.');
bomba('B09', 'Acima de sessenta minutos a segurança continua valendo', 'RF08',
  [true, 20, 61], 'DESLIGAR', 'O requisito diz 60 minutos ou mais.');
bomba('B10', 'Sem média confiável uma bomba ligada precisa desligar', 'RF09',
  [true, null, 20], 'DESLIGAR', 'Com null não há informação confiável para continuar irrigando.');
bomba('B11', 'Sem média confiável uma bomba desligada permanece desligada', 'RF09',
  [false, null, 0], 'MANTER', 'O estado seguro já é o estado atual: bomba desligada.');
bomba('B12', 'Ausência de média e limite de tempo levam à decisão segura', 'RF08/RF09',
  [true, null, 60], 'DESLIGAR', 'As duas regras de segurança se aplicam e ambas exigem desligamento.');

// Alertas: conferir presença, ausência, ordem e combinações possíveis.
const alerta = (...dados) => adicionar('verificarAlertas', ...dados);

alerta('A01', 'Condições normais não geram alertas', 'RF13',
  [[leitura(20), leitura(25), leitura(30)]], [], 'A média é 25%, a temperatura recente é 28°C e as leituras são válidas.');
alerta('A02', 'Uma lista vazia não inventa um alerta', 'RF06/RF13',
  [[]], [], 'Não existe média crítica, leitura válida quente ou sequência de três leituras inválidas.');
alerta('A03', 'Três falhas seguidas geram alerta de sensor', 'RF03/RF13',
  [[leitura(NaN), leitura(35, -127), leitura(101)]], ['SENSOR_COM_FALHA'],
  'As três leituras são inválidas; não há média confiável ou leitura válida para o alerta de temperatura.');
alerta('A04', 'Duas leituras inválidas ainda não formam três falhas', 'RF13',
  [[leitura(NaN), leitura(35, -127)]], [], 'O requisito exige três leituras recentes inválidas; aqui só existem duas.');
alerta('A05', 'Uma leitura válida recente interrompe a sequência de falhas', 'RF13',
  [[leitura(NaN), leitura(35, -127), leitura(101), leitura(20)]], [],
  'As três últimas posições contêm uma leitura válida; não existe mais a sequência exigida para falha de sensor.');
alerta('A06', 'Média de quatorze vírgula nove gera solo crítico', 'RF05/RF13',
  [[leitura(14.9), leitura(14.9), leitura(14.9)]], ['SOLO_CRITICO'], 'A média arredondada é 14,9%, inferior a 15%.');
alerta('A07', 'Média exatamente quinze não gera solo crítico', 'RF13',
  [[leitura(15), leitura(15), leitura(15)]], [], 'RF13 exige média inferior a 15%, sem incluir o limite.');
alerta('A08', 'Temperatura abaixo de quarenta não gera alerta de calor', 'RF13',
  [[leitura(20, 39.9)]], [], '39,9°C é menor que 40°C; também não há média confiável ou três falhas.');
alerta('A09', 'Temperatura exatamente quarenta gera alerta de calor', 'RF13',
  [[leitura(20, 40)]], ['TEMPERATURA_ALTA'], 'O limite inclui 40°C; não exige três leituras para o alerta de temperatura.');
alerta('A10', 'Uma leitura inválida recente não apaga a última temperatura válida', 'RF03/RF13',
  [[leitura(20, 40), leitura(35, -127)]], ['TEMPERATURA_ALTA'],
  'RF13 usa a leitura válida mais recente; a falha posterior não substitui a leitura válida de 40°C.');
alerta('A11', 'Solo crítico e calor aparecem na ordem exigida', 'RF13',
  [[leitura(10, 40), leitura(10, 28), leitura(10, 40)]], ['SOLO_CRITICO', 'TEMPERATURA_ALTA'],
  'A média é 10% e a última leitura válida tem 40°C. A ordem da lista faz parte do resultado esperado.');
alerta('A12', 'Falha de sensor pode coexistir com calor sem criar solo crítico', 'RF04/RF06/RF13',
  [[leitura(10, 40), leitura(10, 40), leitura(10, 40), leitura(NaN), leitura(35, -127), leitura(101)]], ['SENSOR_COM_FALHA', 'TEMPERATURA_ALTA'],
  'As três últimas leituras são inválidas. Nas cinco recentes só duas são válidas, então não há média para SOLO_CRITICO. A última válida ainda tem 40°C.');

module.exports = { casos };

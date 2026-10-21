# Interface complementar — Irriga Sertão

## Como abrir

1. Baixe ou clone o repositório completo.
2. Dentro de `frontend`, abra `index.html` com dois cliques.
3. Use um navegador atual, como Chrome, Edge ou Firefox.

Não é preciso instalar bibliotecas, iniciar um servidor ou ter conexão com a internet. Mantenha a pasta `frontend` ao lado de `src`, pois a interface carrega diretamente `../src/irrigacao.js`.

## O que a tela permite

- Visualizar a média das leituras válidas entre as cinco mais recentes.
- Registrar umidade, temperatura e falhas simuladas dos sensores.
- Alterar o estado da bomba e o tempo ligado para observar a decisão.
- Aplicar a decisão apenas na simulação.
- Acompanhar leituras, gráfico e os alertas na ordem definida pelo módulo.
- Carregar exemplos de solo seco, solo equilibrado, calor intenso e falha no sensor.

Os dados da demonstração ficam apenas na memória da página. Recarregar a página restaura o exemplo de solo seco. Esta interface não controla equipamento real.

## Relação com a atividade

Esta pasta é um complemento visual opcional. As quatro funções continuam no arquivo `src/irrigacao.js`, com as mesmas exportações CommonJS e o mesmo conteúdo. A adaptação `commonjs-bridge.js` permite que esse arquivo seja executado pelo navegador; `app.js` usa suas funções para validar leituras, calcular a média, decidir a bomba e gerar os alertas.

Os requisitos, o relatório do professor, o registro de prompts original, o `package.json`, os testes da dupla e os testes gerados pela IA foram preservados. A interface não preenche os relatórios, não substitui os testes e não antecipa a validação da Parte 3.

Os comandos da atividade continuam sendo executados na raiz do projeto:

```bash
npm test
node --test evidencias/testes-gerados-pela-ia.js
```

A interface é publicada em um commit próprio: `Adiciona interface visual complementar`. O código original e os testes gerados pela IA permanecem em commits separados.

## Registro desta adição com IA

**Data:** 13/10/2026.

**Ferramenta:** ChatGPT.

**Prompt do usuário:**

> Certo, sem mudar o que o professor exigiu, você consegue criar um front end bonito? Só para ficar melhorzin

**Resultado:** interface local em HTML, CSS e JavaScript, sem dependências externas, que utiliza o código original. Este registro descreve apenas a criação do complemento visual; o registro obrigatório das Partes 1 e 2 permanece no arquivo `prompts.md` da atividade.

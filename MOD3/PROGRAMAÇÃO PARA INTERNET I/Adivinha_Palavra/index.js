const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TOTAL_RODADAS = 4;
const TOTAL_COLUNAS = 5;

let rodadaAtual = 0;
let tabelaAtual = criarTabelaInicial();
let historico = [];

const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const etapaEl = document.getElementById("etapa");
const historicoEl = document.getElementById("historico");
const resultadoEl = document.getElementById("resultado");
const reiniciarBtn = document.getElementById("reiniciar");

function criarTabelaInicial() {
  return distribuirEmColunas(ALFABETO);
}

function distribuirEmColunas(letras) {
  const colunas = Array.from({ length: TOTAL_COLUNAS }, () => []);

  letras.forEach((letra, indice) => {
    colunas[indice % TOTAL_COLUNAS].push(letra);
  });

  return colunas;
}

function renderizarTabela() {
  grid.innerHTML = "";
  statusEl.textContent = `Tabela ${rodadaAtual + 1} de ${TOTAL_RODADAS}`;
  etapaEl.textContent = `Rodada ${rodadaAtual + 1} de ${TOTAL_RODADAS}`;

  tabelaAtual.forEach((coluna, indiceColuna) => {
    const botaoColuna = document.createElement("button");
    botaoColuna.type = "button";
    botaoColuna.className = "coluna";

    const titulo = document.createElement("div");
    titulo.className = "titulo-coluna";
    titulo.textContent = `Coluna ${indiceColuna + 1}`;

    botaoColuna.appendChild(titulo);

    coluna.forEach((letra) => {
      const item = document.createElement("div");
      item.className = "letra";
      item.textContent = letra;
      botaoColuna.appendChild(item);
    });

    botaoColuna.addEventListener("click", () => selecionarColuna(indiceColuna));
    grid.appendChild(botaoColuna);
  });
}

function selecionarColuna(indiceSelecionado) {
  if (rodadaAtual >= TOTAL_RODADAS) return;

  const colunaEscolhida = tabelaAtual[indiceSelecionado];
  const letrasColuna = colunaEscolhida.join("");

  historico.push({
    rodada: rodadaAtual + 1,
    coluna: indiceSelecionado + 1,
    letras: letrasColuna
  });

  atualizarHistorico();

  rodadaAtual += 1;

  if (rodadaAtual >= TOTAL_RODADAS) {
    finalizar();
    return;
  }

  tabelaAtual = gerarProximaTabela(tabelaAtual, indiceSelecionado);
  renderizarTabela();
}

function gerarProximaTabela(colunasAtuais, indiceEscolhido) {
  const colunaEscolhida = colunasAtuais[indiceEscolhido];
  const restantes = colunasAtuais.filter((_, indice) => indice !== indiceEscolhido);

  const novaSequencia = [...colunaEscolhida, ...restantes.flat()];
  return distribuirEmColunas(novaSequencia);
}

function atualizarHistorico() {
  const texto = historico
    .map((item) => `Rodada ${item.rodada}: coluna ${item.coluna} (${item.letras})`)
    .join(" | ");

  historicoEl.textContent = texto || "Nenhuma escolha ainda.";
}

function finalizar() {
  grid.innerHTML = "";
  statusEl.textContent = "Processo concluído";
  etapaEl.textContent = "Fim das 4 rodadas";

  const colunasEscolhidas = historico.map((item) => item.coluna).join(" - ");
  const letrasEscolhidas = historico.map((item) => item.letras[0] || "").join("");

  resultadoEl.textContent =
    `Seleções registradas: ${colunasEscolhidas}. Base do resultado: ${letrasEscolhidas}.`;

  const mensagemFinal = document.createElement("p");
  mensagemFinal.style.marginTop = "12px";
  mensagemFinal.textContent =
    "As 4 rodadas foram concluídas. O histórico foi salvo.";
  resultadoEl.appendChild(mensagemFinal);
}

function reiniciar() {
  rodadaAtual = 0;
  tabelaAtual = criarTabelaInicial();
  historico = [];

  historicoEl.textContent = "Nenhuma escolha ainda.";
  resultadoEl.textContent = "Faça 4 seleções para concluir.";
  renderizarTabela();
}

reiniciarBtn.addEventListener("click", reiniciar);

renderizarTabela();
const socket: WebSocket = new WebSocket('ws://localhost:7001');
const log: HTMLPreElement = document.getElementById('log')! as HTMLPreElement;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function appendLog(text: string): void {
  log.innerText += text + '\n';
  log.scrollTop = log.scrollHeight;
}

/**
 * Parseia a resposta multi-linha do servidor:
 *   RESULT: 9
 *   STATUS: OK
 *   MESSAGE: Operação concluída com sucesso
 */
function parseServerResponse(raw: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const line of raw.trim().split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key   = line.slice(0, colonIdx).trim().toUpperCase();
      const value = line.slice(colonIdx + 1).trim();
      fields[key] = value;
    }
  }
  return fields;
}

// ─── Eventos do WebSocket ─────────────────────────────────────────────────────

socket.onopen = () => {
  appendLog('✅ Conectado ao servidor.');
  updateStatus(true);
};

socket.onmessage = (event: MessageEvent) => {
  const raw: string = event.data as string;
  appendLog(`\n── Resposta do Servidor ──\n${raw}`);

  const fields = parseServerResponse(raw);

  if (fields['STATUS'] === 'OK') {
    appendLog(`➜  Resultado: ${fields['RESULT']}`);
  } else {
    appendLog(`⚠️  Erro: ${fields['MESSAGE'] ?? 'Erro desconhecido'}`);
  }
};

socket.onclose = () => {
  appendLog('\n🔌 Desconectado do servidor.');
  updateStatus(false);
};

socket.onerror = () => {
  appendLog('❌ Erro na conexão WebSocket.');
  updateStatus(false);
};

// ─── Status badge ─────────────────────────────────────────────────────────────

function updateStatus(connected: boolean): void {
  const dot  = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  if (connected) {
    dot.classList.add('connected');
    text.textContent = 'Conectado · ws://localhost:7001';
  } else {
    dot.classList.remove('connected');
    text.textContent = 'Desconectado';
  }
}

// ─── Lógica de envio ──────────────────────────────────────────────────────────

function enviar(operacao: string): void {
  if (socket.readyState !== WebSocket.OPEN) {
    appendLog('⚠️  Conexão não está aberta. Recarregue a página.');
    return;
  }

  const op1El = document.getElementById('operador1') as HTMLInputElement;
  const op2El = document.getElementById('operador2') as HTMLInputElement;

  const valor1 = parseFloat(op1El.value);
  const valor2 = parseFloat(op2El.value);

  if (isNaN(valor1) || isNaN(valor2)) {
    appendLog('⚠️  Digite números válidos nos dois campos.');
    return;
  }

  // Formato do mini-protocolo (baseado em linhas de texto)
  const mensagem = [
    `OPERATION: ${operacao}`,
    `OPERAND1: ${valor1}`,
    `OPERAND2: ${valor2}`,
  ].join('\n');

  socket.send(mensagem);
  appendLog(`\n── Enviado ──\n${mensagem}`);
}

function encerrar(): void {
  if (socket.readyState !== WebSocket.OPEN) {
    appendLog('⚠️  Conexão já está fechada.');
    return;
  }
  socket.send('');  // string vazia = sinal de encerramento conforme o protocolo
  appendLog('\n📤 Sinal de encerramento enviado...');
}

// ─── Attachar listeners nos botões via JS (corrige escopo de ES module) ────────
//
// Scripts type="module" são isolados: funções definidas aqui NÃO ficam em
// window.*, então onclick="enviar(...)" no HTML nunca as acha.
// A solução é nunca usar onclick inline — registrar tudo via addEventListener.

document.addEventListener('DOMContentLoaded', () => {
  // Botões de operação: lê data-op para saber a operação (ADD, SUB, MUL, DIV)
  document.querySelectorAll<HTMLButtonElement>('[data-op]').forEach((btn) => {
    btn.addEventListener('click', () => enviar(btn.dataset.op!));
  });

  // Botão de encerrar conexão
  document.getElementById('btn-encerrar')
    ?.addEventListener('click', encerrar);

  // Botão de limpar log
  document.getElementById('btn-clear')
    ?.addEventListener('click', () => { log.innerText = ''; });
});
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Operation = 'ADD' | 'SUB' | 'MUL' | 'DIV';

interface ParsedRequest {
  operation: Operation;
  operand1: number;
  operand2: number;
}

interface CalcResponse {
  result: number | null;
  status: 'OK' | 'ERROR';
  message: string;
}

// ─── Parser do mini-protocolo ────────────────────────────────────────────────

/**
 * Parseia uma mensagem multi-linha no formato:
 *   OPERATION: ADD
 *   OPERAND1: 5.2
 *   OPERAND2: 3.8
 */
function parseRequest(raw: string): ParsedRequest {
  const lines = raw.trim().split('\n');
  const fields: Record<string, string> = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      throw new Error(`Linha mal-formatada (sem ":"): "${line}"`);
    }
    const key = line.slice(0, colonIdx).trim().toUpperCase();
    const value = line.slice(colonIdx + 1).trim();
    fields[key] = value;
  }

  // Validar campos obrigatórios
  if (!fields['OPERATION']) throw new Error('Campo OPERATION ausente');
  if (!fields['OPERAND1'])  throw new Error('Campo OPERAND1 ausente');
  if (!fields['OPERAND2'])  throw new Error('Campo OPERAND2 ausente');

  const operation = fields['OPERATION'] as Operation;
  if (!['ADD', 'SUB', 'MUL', 'DIV'].includes(operation)) {
    throw new Error(`Operação inválida: "${operation}". Use ADD, SUB, MUL ou DIV.`);
  }

  const operand1 = parseFloat(fields['OPERAND1']);
  const operand2 = parseFloat(fields['OPERAND2']);

  if (isNaN(operand1)) throw new Error(`OPERAND1 não é um número válido: "${fields['OPERAND1']}"`);
  if (isNaN(operand2)) throw new Error(`OPERAND2 não é um número válido: "${fields['OPERAND2']}"`);

  return { operation, operand1, operand2 };
}

// ─── Lógica de cálculo ───────────────────────────────────────────────────────

function calculate({ operation, operand1, operand2 }: ParsedRequest): CalcResponse {
  switch (operation) {
    case 'ADD':
      return { result: operand1 + operand2, status: 'OK', message: 'Operação concluída com sucesso' };

    case 'SUB':
      return { result: operand1 - operand2, status: 'OK', message: 'Operação concluída com sucesso' };

    case 'MUL':
      return { result: operand1 * operand2, status: 'OK', message: 'Operação concluída com sucesso' };

    case 'DIV':
      if (operand2 === 0) {
        return { result: null, status: 'ERROR', message: 'Divisão por zero não é permitida' };
      }
      return { result: operand1 / operand2, status: 'OK', message: 'Operação concluída com sucesso' };
  }
}

// ─── Serialização da resposta ────────────────────────────────────────────────

/**
 * Monta a resposta multi-linha:
 *   RESULT: 9
 *   STATUS: OK
 *   MESSAGE: Operação concluída com sucesso
 */
function formatResponse(response: CalcResponse): string {
  const resultLine = response.result !== null
    ? `RESULT: ${response.result}`
    : 'RESULT: N/A';

  return [
    resultLine,
    `STATUS: ${response.status}`,
    `MESSAGE: ${response.message}`,
  ].join('\n');
}

// ─── Servidor ────────────────────────────────────────────────────────────────

const httpServer: http.Server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Calculator Server is running');
});

const wss: WebSocketServer = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws: WebSocket) => {
  console.log('✅ Novo cliente conectado');

  ws.on('message', (data) => {
    const msg: string = data.toString();

    // String vazia → encerrar conexão
    if (msg.trim() === '') {
      console.log('📤 Cliente sinalizou encerramento. Fechando conexão...');
      ws.close(1000, 'Encerramento solicitado pelo cliente');
      return;
    }

    console.log(`📨 Mensagem recebida:\n${msg}`);

    let reply: string;

    try {
      const request = parseRequest(msg);
      const response = calculate(request);
      reply = formatResponse(response);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      reply = formatResponse({ result: null, status: 'ERROR', message: errorMsg });
    }

    console.log(`📤 Resposta enviada:\n${reply}\n`);
    ws.send(reply);
  });

  ws.on('close', (code, reason) => {
    console.log(`❌ Cliente desconectado (código: ${code}, motivo: ${reason.toString() || 'N/A'})`);
  });

  ws.on('error', (err) => {
    console.error(`⚠️  Erro no WebSocket: ${err.message}`);
  });
});

const PORT: number = 7001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket ouvindo na porta ${PORT}`);
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const httpServer = http_1.default.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');
    // Recebe mensagens do cliente
    ws.on('message', (data) => {
        const msg = data.toString();
        console.log(`Mensagem recebida do cliente: ${msg}`);
        let response = msg.toUpperCase();
        // Envia resposta
        const reply = `Servidor ecoa: ${response}`;
        ws.send(reply);
    });
    ws.on('close', () => console.log('Cliente desconectado'));
});
const PORT = 7001;
httpServer.listen(PORT, () => console.log(`Servidor WebSocket ouvindo na porta ${PORT}`));

const e=new WebSocket("ws://localhost:7001"),n=document.getElementById("log");e.onopen=()=>{n.innerText+="Conectado ao servidor.\n"},e.onmessage=e=>{n.innerText+=`Servidor: ${e.data}
`},e.onclose=()=>{n.innerText+="Desconectado do servidor.\n"},window.enviar=()=>{let o=document.getElementById("mensagem"),t=o.value;e.send(t),n.innerText+=`Cliente: ${t}
`,o.value=""};
//# sourceMappingURL=index.27cfdcda.js.map

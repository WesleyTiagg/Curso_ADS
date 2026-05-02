"use strict";
function calcular() {
    const input = document.getElementById("valor");
    const resultado = document.getElementById("resultado");
    let valor = parseFloat(input.value);
    if (isNaN(valor)) {
        resultado.innerText = "Digite um valor válido.";
        return;
    }
    // Convertendo para centavos (evita erro de float)
    let centavos = Math.round(valor * 100);
    const notas = [10000, 5000, 2000, 1000, 500, 200];
    const moedas = [100, 50, 25, 10, 5, 1];
    let saida = "NOTAS:\n";
    for (let nota of notas) {
        let qtd = Math.floor(centavos / nota);
        centavos %= nota;
        saida += `${qtd} nota(s) de R$ ${(nota / 100).toFixed(2)}\n`;
    }
    saida += "MOEDAS:\n";
    for (let moeda of moedas) {
        let qtd = Math.floor(centavos / moeda);
        centavos %= moeda;
        saida += `${qtd} moeda(s) de R$ ${(moeda / 100).toFixed(2)}\n`;
    }
    resultado.innerText = saida;
}

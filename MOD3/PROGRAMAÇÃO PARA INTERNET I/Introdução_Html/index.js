// 1. Selecionando os elementos
        const input = document.getElementById('input');
        const botao = document.getElementById('button');
        const listaEL = document.getElementById('list');

        // 2. O ESTADO (A fonte da verdade)
        let tarefas = [];

        // 3. A FUNÇÃO DE RENDERIZAÇÃO
        // Ela limpa a lista visual e reconstrói baseada no array 'tarefas'
        function renderizarTarefas() {
            // Limpa o que existe para não duplicar
            listaEL.innerHTML = "";
            // Percorre o array e cria os elementos
            tarefas.forEach((tarefa, index) => {
                const li = document.createElement('li');
                li.innerText = tarefa;
                // Evento para remover: altera o dado e manda renderizar de novo
                li.addEventListener('click', () => {
                    removerTarefa(index);
                });
                listaEL.appendChild(li);
            });
        }

        function adicionarTarefa() {
            const texto = input.value.trim();
            if (texto !== "") {
                tarefas.push(texto); // Adiciona ao array
                input.value = "";    // Limpa o input
                renderizarTarefas(); // Atualiza a tela
            }
        }

        function removerTarefa(posicao) {
            tarefas.splice(posicao, 1); // Remove do array pela posição
            renderizarTarefas();        // Atualiza a tela
        }

        botao.addEventListener('click', adicionarTarefa);

        // Dica extra: Adicionar tarefa ao apertar "Enter"
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarTarefa();
        });

document.addEventListener('DOMContentLoaded', () => {

    const inputPesquisar  = document.getElementById('input-pesquisar');
    const btnPesquisar    = document.getElementById('btn-pesquisar');
    const btnAnterior     = document.getElementById('btn-anterior');
    const btnProximo      = document.getElementById('btn-proximo');
    const btnsNavegacao   = document.querySelector('.btns-navegacao');
    const mensagemErro    = document.getElementById('mensagem-erro');
    const mensagemLoading = document.getElementById('mensagem-loading');
    const listaCards      = document.getElementById('lista-cards');
    const infoPagina      = document.getElementById('info-pagina');
    const modal           = document.getElementById('modal');
    const modalFechar     = document.getElementById('modal-fechar');
    const modalImagem     = document.getElementById('modal-imagem');
    const modalNome       = document.getElementById('modal-nome');
    const modalDescricao  = document.getElementById('modal-descricao');

    const POR_PAGINA = 20;
    let paginaAtual  = 1;
    let totalPokemon = 0;


    const exibirLoading = () => {
        mensagemLoading.classList.remove('hidden');
        mensagemErro.classList.add('hidden');
        listaCards.innerHTML = '';
        listaCards.classList.remove('resultado-pesquisa');
        btnsNavegacao.classList.add('hidden');
    };

    const ocultarLoading = () => {
        mensagemLoading.classList.add('hidden');
    };

    const exibirErro = () => {
        mensagemErro.classList.remove('hidden');
        mensagemLoading.classList.add('hidden');
        listaCards.innerHTML = '';
        listaCards.classList.remove('resultado-pesquisa');
        btnsNavegacao.classList.add('hidden');
    };

    const limparMensagens = () => {
        mensagemLoading.classList.add('hidden');
        mensagemErro.classList.add('hidden');
    };

    const obterSprite = (pokemon) =>
        pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default
        || pokemon.sprites?.front_default
        || '';

    // ── Criar card clicável ───────────────────────────────────────
    const criarCard = (pokemon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${obterSprite(pokemon)}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <span>#${String(pokemon.id).padStart(3, '0')}</span>
        `;
        card.addEventListener('click', () => abrirModal(pokemon));
        return card;
    };

    // ── Modal ─────────────────────────────────────────────────────
    const abrirModal = (pokemon) => {
        modalImagem.src = obterSprite(pokemon);
        modalNome.textContent = `${pokemon.name} (#${pokemon.id})`;
        modalDescricao.innerHTML = `
            <strong>Altura:</strong> ${pokemon.height / 10}m<br>
            <strong>Peso:</strong> ${pokemon.weight / 10}kg<br>
            <strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}
        `;
        modal.classList.remove('hidden');
    };

    modalFechar.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // ── Paginação ─────────────────────────────────────────────────
    const atualizarNavegacao = () => {
        const totalPaginas = Math.ceil(totalPokemon / POR_PAGINA);
        btnsNavegacao.classList.remove('hidden');
        btnAnterior.disabled = paginaAtual <= 1;
        btnProximo.disabled  = paginaAtual >= totalPaginas;
        infoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
    };

    btnAnterior.addEventListener('click', () => {
        if (paginaAtual > 1) carregarPagina(paginaAtual - 1);
    });
    btnProximo.addEventListener('click', () => carregarPagina(paginaAtual + 1));

    // ── Ponto 1 e 2: carregar página de 20 cards ──────────────────
    const carregarPagina = async (pagina) => {
        exibirLoading();
        try {
            const offset = (pagina - 1) * POR_PAGINA;
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${POR_PAGINA}&offset=${offset}`
            );
            if (!res.ok) throw new Error('Erro ao buscar lista');

            const data = await res.json();
            totalPokemon = data.count;

            const detalhes = await Promise.all(
                data.results.map(p => fetch(p.url).then(r => r.json()))
            );

            limparMensagens();                         
            listaCards.innerHTML = '';
            detalhes.forEach(p => listaCards.appendChild(criarCard(p)));
            paginaAtual = pagina;
            atualizarNavegacao();

        } catch {
            exibirErro();
        } finally {
            ocultarLoading();                           
        }
    };

    // ── Ponto 4: pesquisa individual ──────────────────────────────
    const pesquisarPokemon = async () => {
        const query = inputPesquisar.value.trim().toLowerCase();
        if (!query) return;

        exibirLoading();
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('Pokémon não encontrado');

            const pokemon = await res.json();

            limparMensagens();                          
            listaCards.innerHTML = '';
            listaCards.classList.add('resultado-pesquisa');
            listaCards.appendChild(criarCard(pokemon));
            btnsNavegacao.classList.add('hidden');

            // Botão voltar
            const btnVoltar = document.createElement('button');
            btnVoltar.textContent = '← Voltar para lista';
            btnVoltar.id = 'btn-voltar';
            btnVoltar.addEventListener('click', () => {
                inputPesquisar.value = '';
                atualizarBotaoPesquisar();
                carregarPagina(paginaAtual);
            });
            listaCards.appendChild(btnVoltar);

        } catch {
            exibirErro();
        } finally {
            ocultarLoading();                           
        }
    };

    // ── Input pesquisa ────────────────────────────────────────────
    const atualizarBotaoPesquisar = () => {
        btnPesquisar.disabled = !inputPesquisar.value.trim();
    };

    btnPesquisar.addEventListener('click', pesquisarPokemon);
    inputPesquisar.addEventListener('input', atualizarBotaoPesquisar);
    inputPesquisar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btnPesquisar.click();
    });

    // ── Init ──────────────────────────────────────────────────────
    carregarPagina(1);
    atualizarBotaoPesquisar();
});
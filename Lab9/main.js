const inicializarArmazenamentoCesto = () => {
    if (!window.localStorage.getItem('cart-items')) {
        window.localStorage.setItem('cart-items', JSON.stringify([]));
    }
};

const renderizadorProdutos = (listaProdutos) => {
    const containerProdutos = document.querySelector('.lista-produtos');
    containerProdutos.innerHTML = '';

    listaProdutos.forEach(item => {
        const elementoProduto = montarCartaoProduto(item);
        containerProdutos.appendChild(elementoProduto);
    });
};

const montarCartaoProduto = (produto) => {
    const cartao = document.createElement('article');
    
    const elementosTitulo = document.createElement('h3');
    elementosTitulo.textContent = produto.title;

    const elementoImagem = document.createElement('img');
    elementoImagem.src = produto.image;
    elementoImagem.alt = produto.title;

    const elementoDescricao = document.createElement('p');
    elementoDescricao.textContent = produto.description;

    const elementoPreco = document.createElement('p');
    elementoPreco.textContent = `${produto.price.toFixed(2)} €`;

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao Cesto';
    botaoAdicionar.addEventListener('click', () => gerenciadorCesto.adicionar(produto));

    cartao.append(elementosTitulo, elementoImagem, elementoDescricao, elementoPreco, botaoAdicionar);
    return cartao;
};

const gerenciadorCesto = {
    adicionar(produto) {
        const CestoAtual = JSON.parse(localStorage.getItem('cart-items') || '[]');
        const produtoComIdentificador = { 
            ...produto, 
            identificadorUnico: crypto.randomUUID() 
        };
        
        CestoAtual.push(produtoComIdentificador);
        localStorage.setItem('cart-items', JSON.stringify(CestoAtual));
        this.atualizar();
    },

    atualizar() {
        const itensCesto = JSON.parse(localStorage.getItem('cart-items') || '[]');
        const secaoCesto = document.querySelector('.Cesto');
        secaoCesto.innerHTML = '<p class="total">Custo total: 0€</p>';

        let totalCompra = 0;
        itensCesto.forEach(item => {
            const elementoItem = this.criarElementoCesto(item);
            secaoCesto.appendChild(elementoItem);
            totalCompra += item.price;
        });

        document.querySelector('.total').textContent = `Custo total: ${totalCompra.toFixed(2)}€`;
    },

    criarElementoCesto(produto) {
        const cartaoCesto = document.createElement('article');

        const titulo = document.createElement('produto');
        titulo.textContent = produto.title;

        const imagem = document.createElement('img');
        imagem.src = produto.image;
        imagem.alt = produto.title;

        const preco = document.createElement('preco');
        preco.textContent = `${produto.price.toFixed(2)} €`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '- Remover do Cesto';
        botaoRemover.addEventListener('click', () => this.remover(produto));

        cartaoCesto.append(titulo, imagem, preco, botaoRemover);
        return cartaoCesto;
    },

    remover(produto) {
        const CestoAtual = JSON.parse(localStorage.getItem('cart-items') || '[]');
        const CestoAtualizado = CestoAtual.filter(
            item => item.identificadorUnico !== produto.identificadorUnico
        );
        
        localStorage.setItem('cart-items', JSON.stringify(CestoAtualizado));
        this.atualizar();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    inicializarArmazenamentoCesto();
    renderizadorProdutos(produtos);
    gerenciadorCesto.atualizar();
});
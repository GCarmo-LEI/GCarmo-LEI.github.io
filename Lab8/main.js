// A. Estado e variáveis

const API_URL = "https://deisishop.pw.deisi.ulusofona.pt";

const listaProdutos = document.querySelector("#lista-produtos");
const listaCesto = document.querySelector("#produtos-selecionados");
const totalCesto = document.querySelector("#total-cesto");

const filtroCategoria = document.querySelector("#filtro-categoria");
const ordenarPreco = document.querySelector("#ordenar-preco");
const pesquisa = document.querySelector("#pesquisa");

const checkboxEstudante = document.querySelector("#estudante");
const inputCupao = document.querySelector("#cupao");
const inputNome = document.querySelector("#nome");
const botaoComprar = document.querySelector("#botao-comprar");
const resultadoCompra = document.querySelector("#resultado-compra");

let todosProdutos = [];

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}


// B. Funções utilitárias

function criarProduto(produto) {
  const article = document.createElement("article");
  article.setAttribute("class", "produto");

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.image);
  imagem.setAttribute("alt", produto.title);

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const categoria = document.createElement("p");
  categoria.setAttribute("class", "categoria");
  categoria.textContent = nomeCategoria(produto.category);

  const descricao = document.createElement("p");
  descricao.setAttribute("class", "descricao");
  descricao.textContent = produto.description;

  const avaliacao = document.createElement("p");
  avaliacao.setAttribute("class", "avaliacao");
  avaliacao.textContent = `★ ${produto.rating.rate}/5 (${produto.rating.count} avaliações)`;

  const preco = document.createElement("p");
  preco.setAttribute("class", "preco");
  preco.textContent = `${produto.price} €`;

  const botao = document.createElement("button");
  botao.setAttribute("type", "button");
  botao.textContent = "+ Adicionar ao cesto";

  botao.addEventListener("click", () => {
    adicionarAoCesto(produto);
  });

  article.append(imagem, titulo, categoria, descricao, avaliacao, preco, botao);

  return article;
}

function criaProdutoCesto(produto, indice) {
  const article = document.createElement("article");
  article.setAttribute("class", "produto");

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.image);
  imagem.setAttribute("alt", produto.title);

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.setAttribute("class", "preco");
  preco.textContent = `${produto.price} €`;

  const botao = document.createElement("button");
  botao.setAttribute("type", "button");
  botao.setAttribute("class", "botao-remover");
  botao.textContent = "− Remover do cesto";

  botao.addEventListener("click", () => {
    removerDoCesto(indice);
  });

  article.append(imagem, titulo, preco, botao);

  return article;
}

function nomeCategoria(categoria) {
  if (typeof categoria === "object" && categoria !== null) {
    return categoria.name;
  }
  return categoria;
}

function mostrarMensagem(elemento, texto, classe) {
  elemento.innerHTML = "";

  const p = document.createElement("p");
  p.setAttribute("class", classe);
  p.textContent = texto;

  elemento.append(p);
}


// C. Pedidos à API

function carregarProdutos() {
  fetch(`${API_URL}/products`)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(produtos => {
      todosProdutos = produtos;
      aplicarFiltros();
    })
    .catch(erro => {
      console.error(erro);
      mostrarMensagem(listaProdutos, "Não foi possível carregar os produtos.", "mensagem erro");
    });
}

function carregarCategorias() {
  fetch(`${API_URL}/categories`)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(categorias => {
      categorias.forEach(categoria => {
        const opcao = document.createElement("option");
        opcao.value = nomeCategoria(categoria);
        opcao.textContent = nomeCategoria(categoria);
        filtroCategoria.append(opcao);
      });
    })
    .catch(erro => {
      console.error(erro);
    });
}

function comprar() {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  if (cesto.length === 0) {
    mostrarMensagem(resultadoCompra, "O cesto está vazio.", "mensagem erro");
    return;
  }

  const dados = {
    products: cesto.map(produto => produto.id),
    student: checkboxEstudante.checked
  };

  const cupao = inputCupao.value.trim();
  if (cupao !== "") {
    dados.coupon = cupao;
  }

  const nome = inputNome.value.trim();
  if (nome !== "") {
    dados.name = nome;
  }

  botaoComprar.disabled = true;

  fetch(`${API_URL}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(resposta => resposta.json().then(resultado => ({ ok: resposta.ok, resultado })))
    .then(({ ok, resultado }) => {
      if (!ok || resultado.error) {
        const texto = resultado.error || resultado.detail || "Não foi possível concluir a compra.";
        mostrarMensagem(resultadoCompra, String(texto), "mensagem erro");
        return;
      }

      resultadoCompra.innerHTML = "";

      const total = document.createElement("p");
      total.textContent = `Valor final a pagar (com eventuais descontos): ${resultado.totalCost} €`;

      const referencia = document.createElement("p");
      referencia.textContent = `Referência de pagamento: ${resultado.reference}`;

      resultadoCompra.append(total, referencia);

      if (resultado.message) {
        const mensagem = document.createElement("p");
        mensagem.textContent = resultado.message;
        resultadoCompra.append(mensagem);
      }

      localStorage.setItem("produtos-selecionados", JSON.stringify([]));
      atualizaCesto();
    })
    .catch(erro => {
      console.error(erro);
      mostrarMensagem(resultadoCompra, "Erro ao efetuar a compra. Tenta novamente.", "mensagem erro");
    })
    .finally(() => {
      botaoComprar.disabled = false;
    });
}


// D. Renderização e cesto

function renderizarProdutos(produtos) {
  listaProdutos.innerHTML = "";

  if (produtos.length === 0) {
    mostrarMensagem(listaProdutos, "Nenhum produto encontrado.", "mensagem");
    return;
  }

  produtos.forEach(produto => {
    listaProdutos.append(criarProduto(produto));
  });
}

function aplicarFiltros() {
  const categoria = filtroCategoria.value;
  const ordem = ordenarPreco.value;
  const termo = pesquisa.value.trim().toLowerCase();

  const resultado = todosProdutos
    .filter(produto => categoria === "" || nomeCategoria(produto.category) === categoria)
    .filter(produto => produto.title.toLowerCase().includes(termo));

  if (ordem === "asc") {
    resultado.sort((a, b) => a.price - b.price);
  } else if (ordem === "desc") {
    resultado.sort((a, b) => b.price - a.price);
  }

  renderizarProdutos(resultado);
}

function adicionarAoCesto(produto) {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  cesto.push(produto);

  localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));

  atualizaCesto();
}

function removerDoCesto(indice) {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  cesto.splice(indice, 1);

  localStorage.setItem("produtos-selecionados", JSON.stringify(cesto));

  atualizaCesto();
}

function atualizaCesto() {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados"));

  listaCesto.innerHTML = "";

  let totalMilesimos = 0;

  if (cesto.length === 0) {
    mostrarMensagem(listaCesto, "O teu cesto está vazio.", "cesto-vazio");
  }

  cesto.forEach((produto, indice) => {
    listaCesto.append(criaProdutoCesto(produto, indice));
    totalMilesimos = totalMilesimos + produto.price * 1000;
  });

  totalCesto.textContent = `Total: ${totalMilesimos / 1000} €`;
}


// E. Event listeners

filtroCategoria.addEventListener("change", aplicarFiltros);
ordenarPreco.addEventListener("change", aplicarFiltros);
pesquisa.addEventListener("input", aplicarFiltros);
botaoComprar.addEventListener("click", comprar);


// F. Inicialização

carregarProdutos();
carregarCategorias();
atualizaCesto();

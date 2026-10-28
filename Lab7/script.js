// A. Estado e variáveis

const listaProdutos = document.querySelector("#lista-produtos");
const listaCesto = document.querySelector("#produtos-selecionados");
const totalCesto = document.querySelector("#total-cesto");

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
  categoria.textContent = produto.category;

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

  article.append(imagem);
  article.append(titulo);
  article.append(categoria);
  article.append(descricao);
  article.append(avaliacao);
  article.append(preco);
  article.append(botao);

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

  article.append(imagem);
  article.append(titulo);
  article.append(preco);
  article.append(botao);

  return article;
}


// C. Event handlers

function renderizarProdutos(produtos) {
  listaProdutos.innerHTML = "";

  produtos.forEach(produto => {
    const article = criarProduto(produto);
    listaProdutos.append(article);
  });
}

function adicionarAoCesto(produto) {
  const cesto = JSON.parse(
    localStorage.getItem("produtos-selecionados")
  );

  cesto.push(produto);

  localStorage.setItem(
    "produtos-selecionados",
    JSON.stringify(cesto)
  );

  atualizaCesto();
}

function removerDoCesto(indice) {
  const cesto = JSON.parse(
    localStorage.getItem("produtos-selecionados")
  );

  // Remove apenas uma unidade, mesmo que haja produtos repetidos.
  cesto.splice(indice, 1);

  localStorage.setItem(
    "produtos-selecionados",
    JSON.stringify(cesto)
  );

  atualizaCesto();
}

function atualizaCesto() {
  const cesto = JSON.parse(
    localStorage.getItem("produtos-selecionados")
  );

  listaCesto.innerHTML = "";

  let totalMilesimos = 0;

  if (cesto.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.setAttribute("class", "cesto-vazio");
    mensagem.textContent = "O teu cesto está vazio.";

    listaCesto.append(mensagem);
  }

  cesto.forEach((produto, indice) => {
    const article = criaProdutoCesto(produto, indice);
    listaCesto.append(article);

    totalMilesimos = totalMilesimos + produto.price * 1000;
  });

  totalCesto.textContent = `Total: ${totalMilesimos / 1000} €`;
}


// D. Event Listeners são associados aos botões nas funções
// criarProduto() e criaProdutoCesto().


// E. Inicialização

renderizarProdutos(produtos);
atualizaCesto();

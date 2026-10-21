// A. Declaração de variáveis

const nodeInputNumero = document.querySelector(
  '#colecao + section input[type="number"]'
);

const nodeInputSubmit = document.querySelector(
  '#colecao + section input[type="submit"]'
);

const nodeForm = document.querySelector("#colecao + section form");

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotalColecao = document.querySelector("#colecao span");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos span");

const colecao = [];
const repetidos = [];


// B. Event handlers e funções auxiliares

function guardaCarta() {
  // Converte o valor do input de texto para número.
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
  }

  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos);

  guardaDados();

  // Limpa o campo depois de registar o cromo.
  nodeInputNumero.value = "";
}

function atualizaLista(lista, nodeLista) {
  // Limpa a lista apresentada na página.
  nodeLista.innerHTML = "";

  lista.forEach((numero, indice) => {
    if (nodeLista === nodeUlRepetidos) {
      // Cada botão guarda a posição do cromo na lista.
      nodeLista.innerHTML += `
        <li>
          ${numero}
          <button type="button" data-indice="${indice}">
            Eliminar
          </button>
        </li>
      `;
    } else {
      nodeLista.innerHTML += `<li>${numero}</li>`;
    }
  });

  // Atualiza os totais apresentados.
  nodeTotalColecao.textContent = colecao.length;
  nodeTotalRepetidos.textContent = repetidos.length;

  // Associa os eventos depois de criar todos os botões.
  if (nodeLista === nodeUlRepetidos) {
    associaEventosEliminar();
  }
}

function eliminaRepetido(indice) {
  // Remove apenas um cromo na posição indicada.
  repetidos.splice(indice, 1);

  atualizaLista(repetidos, nodeUlRepetidos);

  guardaDados();
}

function guardaDados() {
  // Converte as listas em texto para as guardar.
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

function carregaDados() {
  if (localStorage.getItem("colecao")) {
    const colecaoGuardada = JSON.parse(
      localStorage.getItem("colecao")
    );

    colecaoGuardada.forEach((numero) => {
      colecao.push(numero);
    });
  }

  if (localStorage.getItem("repetidos")) {
    const repetidosGuardados = JSON.parse(
      localStorage.getItem("repetidos")
    );

    repetidosGuardados.forEach((numero) => {
      repetidos.push(numero);
    });
  }

  colecao.sort((a, b) => a - b);
  repetidos.sort((a, b) => a - b);

  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos);
}


// C. Event listeners

nodeForm.onsubmit = (event) => {
  // Impede que a submissão recarregue a página.
  event.preventDefault();

  guardaCarta();
};

function associaEventosEliminar() {
  document.querySelectorAll("#repetidos button").forEach((botao) => {
    botao.onclick = () => {
      const indice = Number(botao.dataset.indice);

      eliminaRepetido(indice);
    };
  });
}


// D. Carregar os dados ao abrir a página

carregaDados();

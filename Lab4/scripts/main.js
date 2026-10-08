let contador = 0;
let imagemColorida = false;

const textoRato = document.querySelector("#texto-rato");
const textoCor = document.querySelector("#texto-cor");
const fotografia = document.querySelector("#fotografia");
const legenda = document.querySelector("#legenda");
const area = document.querySelector("#area");
const posicao = document.querySelector("#posicao");
const numero = document.querySelector("#contador");

function passarRato() {
  textoRato.textContent = "O rato chegou! Bem-vindo!";
  textoRato.style.color = "white";
  textoRato.style.backgroundColor = "#2e7d32";
}

function retirarRato() {
  textoRato.textContent = "Passa o rato sobre este texto.";
  textoRato.style.color = "#222";
  textoRato.style.backgroundColor = "transparent";
}

function pintarTexto(cor, nomeCor) {
  textoCor.style.color = cor;
  textoCor.textContent = `Agora estou ${nomeCor}!`;
}

function alterarImagem() {
  imagemColorida = !imagemColorida;

  if (imagemColorida) {
    fotografia.style.filter = "grayscale(0%)";
    legenda.textContent = "A imagem ganhou cor!";
  } else {
    fotografia.style.filter = "grayscale(100%)";
    legenda.textContent = "A imagem está a preto e branco.";
  }
}

function moverRato(evento) {
  const limites = area.getBoundingClientRect();

  const x = Math.round(evento.clientX - limites.left);
  const y = Math.round(evento.clientY - limites.top);

  posicao.textContent = `Posição do rato: X = ${x}px | Y = ${y}px`;

  if (x < limites.width / 2) {
    area.style.backgroundColor = "#e4eddf";
    area.textContent = "Estás no lado verde!";
  } else {
    area.style.backgroundColor = "#dceaf3";
    area.textContent = "Estás no lado azul!";
  }
}

function restaurarArea() {
  area.style.backgroundColor = "#e4eddf";
  area.textContent = "Move o rato aqui!";
  posicao.textContent = "Posição do rato: —";
}

function contar() {
  contador++;
  numero.textContent = contador;

  if (contador >= 10) {
    numero.style.color = "#2e7d32";
  } else {
    numero.style.color = "#222";
  }
}

function reiniciar() {
  contador = 0;
  numero.textContent = contador;
  numero.style.color = "#222";
}

document.addEventListener('DOMContentLoaded', () => {

    const passar = document.querySelector('#passar');
    const pintar = document.querySelector('#pintar');
    const escrever = document.querySelector('#escrever');
    const corFundo = document.querySelector('#cor-fundo');

    const contador = document.querySelector('#contador');
    const incrementar = document.querySelector('#incrementar');
    const decrementar = document.querySelector('#decrementar');
    const reset = document.querySelector('#reset');

    const formulario = document.querySelector('#formulario');
    const nome = document.querySelector('#nome');
    const idade = document.querySelector('#idade');
    const mensagem = document.querySelector('#mensagem');

    const contadorAutomatico =
        document.querySelector('#contador-automatico');

    const direcao = document.querySelector('#direcao');
    const containerFlex = document.querySelector('#container-flex');

    const cores = ['lightblue', 'lightgreen', 'lightpink', 'khaki'];

    let indiceCor = 0;
    let textoAnterior = '';
    let numeroAutomatico = 0;

    if (localStorage.getItem('contador') === null) {
        localStorage.setItem('contador', 0);
    }

    let numero = Number(localStorage.getItem('contador'));

    contador.textContent = numero;


    const agradecer = () => {
        passar.textContent = 'Obrigado por Passar';
    };

    const restaurarFrase = () => {
        passar.textContent = 'Passa por Aqui!';
    };


    function mudarCorCampo() {
        if (this.value !== textoAnterior) {
            this.style.backgroundColor = cores[indiceCor];

            indiceCor++;

            if (indiceCor === cores.length) {
                indiceCor = 0;
            }

            textoAnterior = this.value;
        }
    }


    function mudarCorFundo() {
        document.querySelector('body').style.backgroundColor =
            this.value;
    }


    const guardarContador = () => {
        contador.textContent = numero;
        localStorage.setItem('contador', numero);
    };

    const incrementarContador = () => {
        numero++;
        guardarContador();
    };

    const decrementarContador = () => {
        numero--;
        guardarContador();
    };

    const reiniciarContador = () => {
        numero = 0;
        guardarContador();
    };


    const apresentarMensagem = (e) => {
        e.preventDefault();

        mensagem.textContent =
            `Olá, o ${nome.value} tem ${idade.value}!`;
    };


    const contarAutomaticamente = () => {
        numeroAutomatico++;
        contadorAutomatico.textContent = numeroAutomatico;
    };


    function mudarDirecao() {
        containerFlex.style.flexDirection = this.value;
    }


    passar.addEventListener('mouseover', agradecer);
    passar.addEventListener('mouseout', restaurarFrase);


    document.querySelectorAll('button.color').forEach((button) => {
        button.addEventListener('click', () => {
            pintar.style.color = button.dataset.color;
        });
    });


    escrever.onkeyup = mudarCorCampo;

    corFundo.addEventListener('change', mudarCorFundo);

    incrementar.addEventListener('click', incrementarContador);
    decrementar.addEventListener('click', decrementarContador);
    reset.addEventListener('click', reiniciarContador);

    formulario.onsubmit = apresentarMensagem;

    direcao.addEventListener('change', mudarDirecao);

    setInterval(contarAutomaticamente, 1000);

});

document.addEventListener('DOMContentLoaded', () => {

    const hoverText = document.querySelector('#hoverText');
    const colorText = document.querySelector('#colorText');

    const colorChangingInput =
        document.querySelector('#colorChangingInput');

    const colorForm = document.querySelector('#colorForm');
    const colorInput = document.querySelector('#colorInput');

    const counter = document.querySelector('#counter');
    const incrementButton = document.querySelector('#incrementCounter');

    let count = 0;


    const agradecer = () => {
        hoverText.textContent = 'Obrigado por passares!';
    };

    const restaurarFrase = () => {
        hoverText.textContent = 'Passa por aqui!';
    };


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    };

    const randomizeInputColor = () => {
        colorChangingInput.style.backgroundColor = getRandomColor();
    };


    const changeBackgroundColor = (e) => {
        e.preventDefault();

        const color = colorInput.value.trim().toLowerCase();

        if (color === '' || !CSS.supports('background-color', color)) {
            colorInput.setCustomValidity(
                'Introduz uma cor válida em inglês, como red, green ou blue.'
            );

            colorInput.reportValidity();
            return;
        }

        colorInput.setCustomValidity('');
        document.body.style.backgroundColor = color;
    };

    const limparErroCor = () => {
        colorInput.setCustomValidity('');
    };


    const incrementCounter = () => {
        count++;
        counter.textContent = count;
    };


    hoverText.addEventListener('mouseover', agradecer);
    hoverText.addEventListener('mouseout', restaurarFrase);


    document.querySelectorAll('button.color').forEach((button) => {
        button.addEventListener('click', () => {
            colorText.style.color = button.dataset.color;
        });
    });


    colorChangingInput.addEventListener('input', randomizeInputColor);


    colorForm.onsubmit = changeBackgroundColor;
    colorInput.addEventListener('input', limparErroCor);


    incrementButton.addEventListener('click', incrementCounter);

});

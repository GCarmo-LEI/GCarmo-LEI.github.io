document.addEventListener('DOMContentLoaded', () => {

    const hoverText = document.querySelector('#hoverText');
    const colorText = document.querySelector('#colorText');

    const colorChangingInput =
        document.querySelector('#colorChangingInput');

    const colorInput = document.querySelector('#colorInput');
    const submitColor = document.querySelector('#submitColor');

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


    const changeBackgroundColor = () => {
        document.body.style.backgroundColor =
            colorInput.value.toLowerCase();
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


    colorInput.addEventListener('input', changeBackgroundColor);
    submitColor.addEventListener('click', changeBackgroundColor);


    incrementButton.addEventListener('click', incrementCounter);

});


document.getElementById("hoverText").addEventListener("mouseover", function() {
    this.textContent = "Obrigado por passares!";
});
document.getElementById("hoverText").addEventListener("mouseout", function() {
    this.textContent = "Passa por aqui!";
});

const corCSS = {
    vermelho: "red",
    verde: "green",
    azul: "blue"
};

document.querySelectorAll("button[data-color]").forEach(button => {
    button.addEventListener("click", () => {
        const cor = button.dataset.color; 
        const corEmCSS = corCSS[cor];
        document.getElementById("colorText").style.color = corEmCSS; 
    });
});

const randomizeInputColor = () => {
    const colorChangingInput = document.getElementById("colorChangingInput");
    colorChangingInput.style.backgroundColor = getRandomColor();
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor(element) {
    const selectedColor = element.value.toLowerCase();
    document.body.style.backgroundColor = selectedColor;
}

let count = 0;
function incrementCounter() {
    count++;
    document.getElementById("counter").textContent = count;
}

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    
    const message = document.querySelector('#message');
    message.textContent = `Olá, o ${name} tem ${age}!`;
};

let autoCounterValue = 0;

function updateAutoCounter() {
    autoCounterValue++;
    document.getElementById("autoCounter").textContent = autoCounterValue;
}

// Inicia o incremento automático
setInterval(updateAutoCounter, 1000);

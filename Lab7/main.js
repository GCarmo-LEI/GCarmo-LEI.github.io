
document.getElementById("hoverText").addEventListener("mouseover", function() {
    this.textContent = "Obrigado por passares!";
});
document.getElementById("hoverText").addEventListener("mouseout", function() {
    this.textContent = "Passa por aqui!";
});

function changeColor(color) {
    document.getElementById("colorText").style.color = color;
}

function randomizeInputColor() {
    const colorChangingInput = document.getElementById("colorChangingInput");
    colorChangingInput.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor() {
    const colorInput = document.getElementById("colorInput").value.toLowerCase();
    document.body.style.backgroundColor = colorInput;
}

let count = 0;
function incrementCounter() {
    count++;
    document.getElementById("counter").textContent = count;
}
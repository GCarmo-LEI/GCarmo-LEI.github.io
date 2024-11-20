document.getElementById('show-text').addEventListener('click', function() {
    const inputText = document.getElementById('text-input').value;
    document.getElementById('output').textContent = `Você digitou: ${inputText}`;
});

const eventBox = document.getElementById('event-info');
eventBox.addEventListener('mouseover', function() {
    eventBox.classList.add('highlight');
    eventBox.textContent = 'Você passou o rato aqui!';
});
eventBox.addEventListener('mouseout', function() {
    eventBox.classList.remove('highlight');
    eventBox.textContent = 'Passe o rato sobre esta caixa para ver um efeito especial!';
});

document.body.addEventListener('dblclick', function() {
    alert('Você clicou duas vezes na página!');
});

const textInput = document.getElementById('text-input');
textInput.addEventListener('keydown', function() {
    textInput.style.backgroundColor = '#c8e6c9';
});
textInput.addEventListener('keyup', function() {
    textInput.style.backgroundColor = '';
});

textInput.addEventListener('change', function() {
    alert('O campo de texto foi alterado!');
});
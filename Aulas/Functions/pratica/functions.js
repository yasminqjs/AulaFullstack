// 1. Mostrar nome
let nome = 'Usuário';

function mostrarNome() {
    if(nome == 'Usuário') {
        alert('Insira o seu nome.');
    } else {
        console.log(`Olá, ${nome}!`);
    }
}

// 2. Receber nome
function getReceberNome() {
    const novoNome = document.getElementById('inputNome').value;
    receberNome(novoNome);
}

function receberNome(novoNome) {
    nome = novoNome;
}

// 3. Calcular área do retângulo
function getCalcularArea() {
    const base = Number(document.getElementById('inputBase').value);
    const altura = Number(document.getElementById('inputAltura').value);
    calcularArea(base, altura);
}

function calcularArea(base, altura) {
    const area = base * altura;
    console.log('Área do retângulo: ' + area);
}

// 4. Verificar aprovação
function getVerificarAprovacao() {
    const media = Number(document.getElementById('inputMedia').value);
    verificarAprovacao(media);
}

function verificarAprovacao(media) {
    const resultado = media >= 7 ? 'aprovado' : 'reprovado';
    console.log(`Você está ${resultado}!`);
}

// 5. Converter Fahrenheit em Celsius
function getConverterCelsius() {
    const fahrenheit = Number(document.getElementById('inputFahrenheit').value);
    converterCelsius(fahrenheit);
}

function converterCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    console.log(`${fahrenheit}°F é igual a ${celsius.toFixed(2)}°C`);
}

// 6. Mudar cor de fundo
function mudarCor(cor) {
    document.body.style.backgroundColor = cor;
}
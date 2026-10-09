// 1. Calcular IMC
function getCalcularIMC() {
    const peso = Number(document.getElementById('inputPeso').value);
    const altura = Number(document.getElementById('inputAltura').value);
    calcularIMC(peso, altura);
}

function calcularIMC(peso, altura) {
    const imc = peso / (altura ** 2);
    console.log(`Seu IMC é: ${imc.toFixed(2)}`);
}

// 2. Calcular Conta
function getCalcularConta() {
    const consumo = Number(document.getElementById('inputConsumo').value);
    const tarifa = Number(document.getElementById('inputTarifa').value);
    calcularConta(consumo, tarifa);
}

function calcularConta(consumo, tarifa) {
    const valorConta = consumo * tarifa;
    console.log(`O valor da conta é: R$ ${valorConta.toFixed(2)}`);
}

// 3. Contar Pares
function getContarPares() {
    const numeros = Number(document.getElementById('inputNumeros').value);
    contarPares(numeros);
}

function contarPares(numeros) {
    let contador = 0;

    for (let i = 0; i < numeros; i++) {
        if (i % 2 === 0) {
            contador++;
        }
    }

    console.log(`Existem ${contador} números pares entre 1 e ${numeros}.`);
}

// 4. Cadastrar Aluno
function getCadastrarAluno() {
    const nome = document.getElementById('inputNome').value;
    const curso = document.getElementById('inputCurso').value;
    const nota1 = Number(document.getElementById('inputNota1').value);
    const nota2 = Number(document.getElementById('inputNota2').value);
    const nota3 = Number(document.getElementById('inputNota3').value);
    cadastrarAluno(nome, curso, nota1, nota2, nota3);
}

function cadastrarAluno(nome, curso, nota1, nota2, nota3) {
    const media = (nota1 + nota2 + nota3) / 3;
    console.log(`Aluno cadastrado: Nome: ${nome}, Curso: ${curso}, Média: ${media.toFixed(2)}`);
}

// 5. Calcular Operação
function getCalcularOperacao() {
    const n1 = Number(document.getElementById('inputN1').value);
    const n2 = Number(document.getElementById('inputN2').value);
    const operacao = document.getElementById('inputOperacao').value;
    calcularOperacao(n1, n2, operacao);
}

function calcularOperacao(n1, n2, operacao) {
    if(operacao === 'soma') {
        const resultado = n1 + n2;
        console.log(`Resultado da soma: ${resultado}`);
    }
    else if(operacao === 'subtracao') {
        const resultado = n1 - n2;
        console.log(`Resultado da subtração: ${resultado}`);
    }
    else if(operacao === 'multiplicacao') {
        const resultado = n1 * n2;
        console.log(`Resultado da multiplicação: ${resultado}`);
    }
    else if(operacao === 'divisao') {
        const resultado = n1 / n2;
        console.log(`Resultado da divisão: ${resultado}`);
    }
}
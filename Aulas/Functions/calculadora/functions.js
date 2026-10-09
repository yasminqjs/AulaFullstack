function calcularSoma() {
    const n1 = Number(document.getElementById("n1").value);
    const n2 = Number(document.getElementById("n2").value);

    const soma = n1 + n2;

    document.getElementById("resultado").innerText = soma;
}

function calcularSubtracao() {
    const n1 = Number(document.getElementById("n1").value);
    const n2 = Number(document.getElementById("n2").value);

    const subtracao = n1 - n2;

    document.getElementById("resultado").innerText = subtracao;
}

function calcularMultiplicacao() {
    const n1 = Number(document.getElementById("n1").value);
    const n2 = Number(document.getElementById("n2").value);

    const multiplicacao = n1 * n2;

    document.getElementById("resultado").innerText = multiplicacao;
}

function calcularDivisao() {
    const n1 = Number(document.getElementById("n1").value);
    const n2 = Number(document.getElementById("n2").value);

    const divisao = n1 / n2;

    document.getElementById("resultado").innerText = divisao;
}
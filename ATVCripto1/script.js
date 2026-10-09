"use strict";

/* ---------- Elementos da página ---------- */
const entrada = document.getElementById("entrada");
const contador = document.getElementById("contador");
const saidaOriginal = document.getElementById("saida-original");
const saidaHash = document.getElementById("saida-hash");
const detalhesHash = document.getElementById("detalhes-hash");
const statusGeral = document.getElementById("status-geral");

const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");
const botaoLimpar = document.getElementById("limpar");

const avisoReferencia = document.getElementById("aviso-referencia");
const novaEntrada = document.getElementById("nova-entrada");
const botaoVerificar = document.getElementById("verificar");
const statusVerificacao = document.getElementById("status-verificacao");
const painelVerificacao = document.getElementById("painel-verificacao");
const resultadoVerificacao = document.getElementById("resultado-verificacao");
const verifReferencia = document.getElementById("verif-referencia");
const verifNovo = document.getElementById("verif-novo");
const detalhesVerificacao = document.getElementById("detalhes-verificacao");

const dado1 = document.getElementById("dado1");
const dado2 = document.getElementById("dado2");
const botaoComparar = document.getElementById("comparar");
const resultadoComparacao = document.getElementById("resultado-comparacao");

const tabelaExperimento = document.getElementById("tabela-experimento");
const listaAvalanche = document.getElementById("avalanche");

const ENTRADAS_EXPERIMENTO = [
  "Celso",
  "celso",
  "Celso1",
  "Celso2",
  "Professor",
  "Professor Celso"
];

const SEM_VALOR = "—";
const encoder = new TextEncoder();

// Hash gerado na seção 1, usado como referência na seção 2.
let hashReferencia = null;

/* ---------- Núcleo: texto -> hash ---------- */

function bufferParaHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function textoParaHash(texto) {
  const dados = encoder.encode(texto);                              // string -> bytes (UTF-8)
  const resultado = await crypto.subtle.digest("SHA-256", dados);   // Promise -> ArrayBuffer
  return bufferParaHex(resultado);                                  // bytes -> hexadecimal
}

function tamanhoEmBytes(texto) {
  return encoder.encode(texto).length;
}

function criptografiaDisponivel() {
  return Boolean(window.crypto && window.crypto.subtle);
}

/* ---------- Utilidades de interface ---------- */

function mostrarMensagem(elemento, mensagem, tipo = "") {
  elemento.textContent = mensagem;
  elemento.className = tipo ? `mensagem ${tipo}` : "mensagem";
}

function campoVazio(texto) {
  return texto.trim().length === 0;
}

function atualizarContador() {
  const total = entrada.value.length;
  contador.textContent = `${total} ${total === 1 ? "caractere" : "caracteres"}`;
}

async function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(texto);
    return;
  }
  // Alternativa para contextos sem a API moderna de área de transferência.
  const area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const copiou = document.execCommand("copy");
  document.body.removeChild(area);
  if (!copiou) {
    throw new Error("Não foi possível copiar.");
  }
}

/* ---------- Comparação de hashes ---------- */

function caracteresDiferentes(hexA, hexB) {
  let total = 0;
  for (let i = 0; i < hexA.length; i++) {
    if (hexA[i] !== hexB[i]) total++;
  }
  return total;
}

function bitsDiferentes(hexA, hexB) {
  let total = 0;
  for (let i = 0; i < hexA.length; i++) {
    let xor = parseInt(hexA[i], 16) ^ parseInt(hexB[i], 16);
    while (xor) {
      total += xor & 1;
      xor >>= 1;
    }
  }
  return total;
}

function descreverDiferenca(hexA, hexB) {
  const bits = bitsDiferentes(hexA, hexB);
  const porcentagem = Math.round((bits / (hexA.length * 4)) * 100);
  const chars = caracteresDiferentes(hexA, hexB);
  return `${chars} de ${hexA.length} caracteres e ${bits} de ${hexA.length * 4} bits diferem (${porcentagem}%).`;
}

// Mostra o hash destacando os caracteres que diferem do hash de comparação.
function desenharHash(elemento, hex, hexComparacao) {
  elemento.textContent = "";
  for (let i = 0; i < hex.length; i++) {
    if (hex[i] === hexComparacao[i]) {
      elemento.appendChild(document.createTextNode(hex[i]));
    } else {
      const destaque = document.createElement("span");
      destaque.className = "dif";
      destaque.textContent = hex[i];
      elemento.appendChild(destaque);
    }
  }
}

/* ---------- Seção 1: gerar, copiar e limpar ---------- */

async function gerarHash() {
  const texto = entrada.value;

  if (campoVazio(texto)) {
    mostrarMensagem(statusGeral, "Digite uma informação antes de gerar o hash.", "erro");
    entrada.focus();
    return;
  }

  try {
    const resultado = await textoParaHash(texto);
    saidaOriginal.textContent = texto;
    saidaHash.textContent = resultado;
    detalhesHash.textContent =
      `${resultado.length} caracteres hexadecimais (${resultado.length / 2} bytes). ` +
      `Entrada com ${tamanhoEmBytes(texto)} bytes em UTF-8.`;

    hashReferencia = resultado;
    atualizarEstadoVerificacao();
    mostrarMensagem(statusGeral, `SHA-256 gerado com sucesso: ${resultado.length} caracteres hexadecimais.`, "sucesso");
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(
      statusGeral,
      "Não foi possível gerar o hash. Use um navegador moderno e abra a página por localhost ou HTTPS.",
      "erro"
    );
  }
}

async function copiarHash() {
  const hash = saidaHash.textContent;

  if (hash === SEM_VALOR) {
    mostrarMensagem(statusGeral, "Gere um hash antes de copiar.", "erro");
    return;
  }

  try {
    await copiarTexto(hash);
    mostrarMensagem(statusGeral, "Hash copiado para a área de transferência.", "sucesso");
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(statusGeral, "Não foi possível copiar automaticamente. Selecione o hash e copie manualmente.", "erro");
  }
}

function limparLaboratorio() {
  entrada.value = "";
  saidaOriginal.textContent = SEM_VALOR;
  saidaHash.textContent = SEM_VALOR;
  detalhesHash.textContent = "";
  hashReferencia = null;

  novaEntrada.value = "";
  painelVerificacao.hidden = true;
  mostrarMensagem(statusVerificacao, "");
  atualizarEstadoVerificacao();

  atualizarContador();
  mostrarMensagem(statusGeral, "");
  entrada.focus();
}

/* ---------- Seção 2: verificação de integridade ---------- */

function atualizarEstadoVerificacao() {
  avisoReferencia.textContent = hashReferencia
    ? "Hash de referência pronto. Informe o dado novamente para comparar."
    : "Ainda não há hash de referência. Gere um hash na seção 1.";
}

async function verificarIntegridade() {
  mostrarMensagem(statusVerificacao, "");

  if (!hashReferencia) {
    painelVerificacao.hidden = true;
    mostrarMensagem(statusVerificacao, "Gere primeiro um hash de referência na seção 1.", "erro");
    entrada.focus();
    return;
  }

  const texto = novaEntrada.value;
  if (campoVazio(texto)) {
    painelVerificacao.hidden = true;
    mostrarMensagem(statusVerificacao, "Informe o dado novamente para gerar o novo hash.", "erro");
    novaEntrada.focus();
    return;
  }

  try {
    const novoHash = await textoParaHash(texto);
    const iguais = novoHash === hashReferencia;

    desenharHash(verifReferencia, hashReferencia, novoHash);
    desenharHash(verifNovo, novoHash, hashReferencia);

    painelVerificacao.hidden = false;
    resultadoVerificacao.className = iguais ? "veredito igual" : "veredito alterado";
    resultadoVerificacao.textContent = iguais
      ? "Os dados permanecem iguais: os hashes são idênticos."
      : "Os dados foram alterados: os hashes são diferentes.";
    detalhesVerificacao.textContent = iguais
      ? "Nenhum caractere diferente entre os dois hashes."
      : descreverDiferenca(hashReferencia, novoHash);
  } catch (erro) {
    console.error(erro);
    painelVerificacao.hidden = true;
    mostrarMensagem(statusVerificacao, "Erro técnico ao gerar o novo hash. Tente novamente.", "erro");
  }
}

/* ---------- Seção 3: comparar dois dados ---------- */

async function compararDados() {
  const textoUm = dado1.value;
  const textoDois = dado2.value;

  if (campoVazio(textoUm) || campoVazio(textoDois)) {
    mostrarMensagem(resultadoComparacao, "Preencha os dois campos para comparar.", "erro");
    return;
  }

  try {
    const hashUm = await textoParaHash(textoUm);
    const hashDois = await textoParaHash(textoDois);
    if (hashUm === hashDois) {
      mostrarMensagem(resultadoComparacao, "HASHES IGUAIS: os dados geraram a mesma impressão digital.", "sucesso");
    } else {
      mostrarMensagem(resultadoComparacao, "HASHES DIFERENTES: os dados não são idênticos.", "erro");
    }
  } catch (erro) {
    console.error(erro);
    mostrarMensagem(resultadoComparacao, "Erro técnico ao comparar. Tente novamente.", "erro");
  }
}

/* ---------- Seção 4: experimento e efeito avalanche ---------- */

function testarEntrada(texto) {
  entrada.value = texto;
  atualizarContador();
  gerarHash();
  entrada.focus();
}

function criarLinhaExperimento(texto) {
  const linha = document.createElement("tr");

  const celulaTexto = document.createElement("td");
  celulaTexto.textContent = texto;

  const celulaHash = document.createElement("td");
  celulaHash.className = "mono";
  celulaHash.textContent = "calculando…";

  const celulaAcao = document.createElement("td");
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Testar";
  botao.setAttribute("aria-label", `Testar a entrada ${texto}`);
  botao.addEventListener("click", () => testarEntrada(texto));
  celulaAcao.appendChild(botao);

  linha.append(celulaTexto, celulaHash, celulaAcao);
  tabelaExperimento.appendChild(linha);
  return celulaHash;
}

function adicionarItemAvalanche(textoA, textoB, hashes) {
  const item = document.createElement("li");
  item.textContent = `"${textoA}" e "${textoB}": ${descreverDiferenca(hashes[textoA], hashes[textoB])}`;
  listaAvalanche.appendChild(item);
}

async function montarExperimento() {
  const celulas = ENTRADAS_EXPERIMENTO.map(criarLinhaExperimento);
  const hashes = {};

  try {
    for (let i = 0; i < ENTRADAS_EXPERIMENTO.length; i++) {
      const texto = ENTRADAS_EXPERIMENTO[i];
      hashes[texto] = await textoParaHash(texto);
      celulas[i].textContent = hashes[texto];
    }
    adicionarItemAvalanche("Celso", "celso", hashes);
    adicionarItemAvalanche("Celso1", "Celso2", hashes);
    adicionarItemAvalanche("Professor", "Professor Celso", hashes);
  } catch (erro) {
    console.error(erro);
    celulas.forEach(celula => { celula.textContent = "erro ao calcular"; });
  }
}

/* ---------- Inicialização ---------- */

function desativarPorFaltaDeSuporte() {
  [botaoGerar, botaoVerificar, botaoComparar].forEach(botao => { botao.disabled = true; });
  mostrarMensagem(
    statusGeral,
    "Este navegador ou contexto não oferece a Web Crypto API. Abra por localhost ou HTTPS em um navegador moderno.",
    "erro"
  );
}

entrada.addEventListener("input", atualizarContador);
entrada.addEventListener("keydown", evento => {
  if (evento.key === "Enter") gerarHash();
});
novaEntrada.addEventListener("keydown", evento => {
  if (evento.key === "Enter") verificarIntegridade();
});

botaoGerar.addEventListener("click", gerarHash);
botaoCopiar.addEventListener("click", copiarHash);
botaoLimpar.addEventListener("click", limparLaboratorio);
botaoVerificar.addEventListener("click", verificarIntegridade);
botaoComparar.addEventListener("click", compararDados);

atualizarContador();
atualizarEstadoVerificacao();

if (criptografiaDisponivel()) {
  montarExperimento();
} else {
  desativarPorFaltaDeSuporte();
}
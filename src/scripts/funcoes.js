const partida = document.getElementById('partida');
const pontuacao = document.getElementById('pontuacao');
const contagemDePreparacao = document.getElementById('contagemPreparacao');
const preparacao = document.getElementById('preparacao');
const calculoInfo = document.getElementById('calculo__info');
const calculo = document.getElementById('calculo');
const tempo = document.getElementById('tempo');
const menuDisplay = document.getElementById('menu');
const questao = document.getElementById('questao');
const resposta = document.getElementById('resposta');
const botaoConfirmarResposta = document.getElementById('confirmar');
const popupTexto = document.getElementById('popup__texto');
const fecharPopupBotao = document.getElementById('fechar-popup');
const popupTitulo = document.getElementById('popup__titulo');
const popupWrapper = document.getElementById('popup__wrapper');

let respostaCorreta = 0;
let acertos = 0;
let erros = 0;
let taxaAcertos = 0;
let questoesTotais = 0;
let condicao;

export function abrirPopup(condicao) {
    switch (condicao) {
        case 'nomeIndefinido':
            popupTitulo.textContent = 'ATENÇÃO'
            popupTexto.textContent = 'Insira seu nome de usuário para prosseguir';
            break;
        case 'fimDeJogo':
            popupTitulo.textContent = 'FIM DE JOGO'
            popupTexto.textContent = 'Tempo esgotado!'
    };
    popupWrapper.style.setProperty('display', 'flex');
    fecharPopupBotao.addEventListener('click', function() {
        popupWrapper.style.setProperty('display', 'none');
    });
};

function contagemRegressivaPreparacao() {
    return new Promise (resolve => {
        let segundos = 5;
        preparacao.textContent = segundos;
        contagemDePreparacao.style.setProperty('display', 'block');
        const contador = setInterval(() => {
            if (segundos > 0) {
                preparacao.textContent = segundos;
                segundos--;
            } else {
                clearInterval(contador);
                contagemDePreparacao.style.setProperty('display', 'none');
                resolve();
            }
        }, 1000);
    });
};

function contagemRegressivaJogo() {
    return new Promise (resolve => {
        let segundos = 60;
        const contador = setInterval(() => {
            if (segundos >= 0) {
                tempo.textContent = segundos;
                segundos--;
            } else {
                abrirPopup('fimDeJogo');
                clearInterval(contador);
                resolve();
                partida.style.setProperty('display', 'none');
                calculoInfo.style.setProperty('display', 'none');
                calculo.style.setProperty('display', 'none');
                pontuacao.style.setProperty('display', 'flex');
                menuDisplay.style.setProperty('display', 'block');
                atualizarInformacoes(acertos, erros, taxaAcertos, questoesTotais);
            }
        }, 1000);
    });
};

function gerarCalculo(operacao) {
    let num1;
    let num2;
    let simboloOperacao;

    if (operacao === 'multiplicar') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } else {
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
    };

    switch (operacao) {
        case 'adicionar':
            condicao = 'adicionar';
            respostaCorreta = num1 + num2;
            simboloOperacao = '+';
            break;
        case 'subtrair':
            condicao = 'subtrair';
            respostaCorreta = num1 - num2;
            simboloOperacao = '-';
            break;
        case 'multiplicar':
            condicao = 'multiplicar';
            respostaCorreta = num1 * num2;
            simboloOperacao = 'x';
            break;
    };
    questao.textContent = `${num1} ${simboloOperacao} ${num2}`;
};

function atualizarInformacoes(acertos, erros, taxaAcertos, questoesTotais) {
    taxaAcertos = (acertos / (acertos + erros)) * 100;
    document.getElementById('info-1').textContent = acertos;
    document.getElementById('info-2').textContent = erros;
    document.getElementById('info-3').textContent = `${taxaAcertos.toFixed(1)}%`;
    document.getElementById('info-4').textContent = questoesTotais;
};

function verificarResposta(condicao) {
    botaoConfirmarResposta.addEventListener('click', function () {
        if (resposta.value == respostaCorreta) {
            acertos++;
            questoesTotais++;
            resposta.style.setProperty('background', 'var(--green)');
            setTimeout(function () {
                resposta.style.setProperty('background', '');
                resposta.value = '';
              }, 500);
        } else {
            erros++;
            questoesTotais++;
            resposta.style.setProperty('background', 'red');
            setTimeout(function () {
                resposta.style.setProperty('background', '');
                resposta.value = '';
              }, 500);
        };
        atualizarInformacoes();
        gerarCalculo(condicao);
    });
};

function iniciarJogo(operacao) {
    pontuacao.style.setProperty('display', 'none');
    partida.style.setProperty('display', 'block');
    contagemRegressivaPreparacao().then(() => {
        calculoInfo.style.setProperty('display', 'flex');
        calculo.style.setProperty('display', 'block');
        contagemRegressivaJogo();
        gerarCalculo(operacao);
        verificarResposta(condicao);
    });
};


export function adicionar() {
    iniciarJogo('adicionar');
};

export function subtrair() {
    iniciarJogo('subtrair');
};

export function multiplicar() {
    iniciarJogo('multiplicar');
};

const partida = document.getElementById('partida');
const pontuacao = document.getElementById('pontuacao');
const contagemDePreparacao = document.getElementById('contagemPreparacao');
const calculoInfo = document.getElementById('calculo__info');
const calculo = document.getElementById('calculo');
const tempo = document.getElementById('tempo');
const menuDisplay = document.getElementById('menu');
let respostaCorreta = 0;

function contagemRegressivaPreparacao() {
    return new Promise (resolve => {
        let segundos = 5;
        const preparacao = document.getElementById('preparacao');
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
        const tempo = document.getElementById('tempo');
        const contador = setInterval(() => {
            if (segundos >= 0) {
                tempo.textContent = segundos;
                segundos--;
            } else {
                clearInterval(contador);
                resolve();
                alert('acabou o tempo!');
                partida.style.setProperty('display', 'none');
                calculoInfo.style.setProperty('display', 'none');
                calculo.style.setProperty('display', 'none');
                pontuacao.style.setProperty('display', 'flex');
                menuDisplay.style.setProperty('display', 'block');
                atualizarInformacoes(acertos, erros, taxaAcertos, maiorSequencia);
            }
        }, 1000);
    });
};

const questao = document.getElementById('questao');

let resposta = document.getElementById('resposta');
const botaoConfirmarResposta = document.getElementById('confirmar');

let acertos = 0;
let erros = 0;
let taxaAcertos = 0;
let maiorSequencia = 0;
let sequenciaAtual = 0;
let condicao;

function gerarCalculo(operacao) {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;

    let simboloOperacao;

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

function atualizarInformacoes(acertos, erros, taxaAcertos, maiorSequencia) {
    taxaAcertos = (acertos / (acertos + erros)) * 100;
    document.getElementById('info-1').textContent = acertos;
    document.getElementById('info-2').textContent = erros;
    document.getElementById('info-3').textContent = `${taxaAcertos.toFixed(1)}%`;
    document.getElementById('info-4').textContent = maiorSequencia;
};

function verificarResposta() {
    botaoConfirmarResposta.addEventListener('click', function() {
        if(resposta.value == respostaCorreta) {
            acertos++;
            sequenciaAtual++;
            if(sequenciaAtual > maiorSequencia) {
                maiorSequencia = sequenciaAtual;
            };
        } else {
            erros++;
            sequenciaAtual = 0;
        };
        gerarCalculo(condicao);
    });
};



export function adicionar() {
    pontuacao.style.setProperty('display', 'none');
    partida.style.setProperty('display', 'block');
    contagemRegressivaPreparacao().then(() => {
        calculoInfo.style.setProperty('display', 'flex');
        calculo.style.setProperty('display', 'block');
        contagemRegressivaJogo();
        gerarCalculo('adicionar');
        verificarResposta(condicao);
    });
};

export function subtrair() {
    pontuacao.style.setProperty('display', 'none');
    partida.style.setProperty('display', 'block');
    contagemRegressivaPreparacao().then(() => {
        calculoInfo.style.setProperty('display', 'flex');
        calculo.style.setProperty('display', 'block');
        contagemRegressivaJogo();
        gerarCalculo('subtrair');
        verificarResposta(condicao);
        });
    };

export function multiplicar() {
    pontuacao.style.setProperty('display', 'none');
    partida.style.setProperty('display', 'block');
    contagemRegressivaPreparacao().then(() => {
        calculoInfo.style.setProperty('display', 'flex');
        calculo.style.setProperty('display', 'block');
        contagemRegressivaJogo();
        gerarCalculo('multiplicar');
        verificarResposta(condicao);
    });
};
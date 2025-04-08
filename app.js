import { adicionar, subtrair, multiplicar, abrirPopup } from './src/scripts/funcoes.js';

const inputNome = document.getElementById('nome');
const botaoConfirmarNome = document.getElementById('concluido');
const nomeJogador = document.getElementById('jogador');
const pontuacao = document.getElementById('pontuacao');
const saudacao = document.getElementById('saudacao');
const menuDisplay = document.getElementById('menu');
const cadastro = document.querySelector('.cadastro');
const popupWrapper = document.getElementById('popup__wrapper');

botaoConfirmarNome.addEventListener('click', function() {
    if(inputNome.value == '') {
        abrirPopup('nomeIndefinido');
    } else {
        const nomeEscolhido = inputNome.value;
        nomeJogador.textContent = nomeEscolhido;
        cadastro.style.setProperty('display', 'none');
        popupWrapper.style.display = 'none';
        pontuacao.style.setProperty('display', 'flex');
        saudacao.textContent = `Olá, ${nomeEscolhido}!`;
    };
});

const links = document.querySelectorAll('.lista__link');
let operacao;

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
        event.preventDefault();
        if (saudacao.textContent == '') {
            abrirPopup('nomeIndefinido');
        } else {
            if (links[i].id === 'link-1') {
                adicionar(operacao);
            } else if (links[i].id === 'link-2') {
                subtrair(operacao);
            } else if (links[i].id === 'link-3') {
                multiplicar(operacao);
            } else if (links[i].id === 'link-4') {
                dividir(operacao);
            };
            menuDisplay.style.setProperty('display', 'none');
        };
    });
};

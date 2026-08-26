/* ===========================================================
   DANCE INSPIRE - JAVASCRIPT
   Recursos implementados:
   1. Menu de navegação: destaca automaticamente o link da página atual
   2. Efeito interativo: borda vermelha nos cards ao passar o mouse
   3. Validação do formulário de contato
=========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------------------
       1. MENU ATIVO
       Compara a URL atual com o href de cada link do menu
       e adiciona a classe "ativo" no link correspondente.
    ----------------------------------------------------- */
    function marcarLinkAtivo() {
        const linksMenu = document.querySelectorAll('nav a');
        const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

        linksMenu.forEach(function (link) {
            const hrefLink = link.getAttribute('href');

            if (hrefLink === paginaAtual) {
                link.classList.add('ativo');
            }
        });
    }

    marcarLinkAtivo();


    /* -----------------------------------------------------
       2. EFEITO HOVER NOS CARDS (borda vermelha)
       Adiciona/remove uma classe ao passar/tirar o mouse.
       O estilo da classe "card-hover" fica no CSS.
    ----------------------------------------------------- */
    function ativarHoverCards() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                card.classList.add('card-hover');
            });

            card.addEventListener('mouseleave', function () {
                card.classList.remove('card-hover');
            });
        });
    }

    ativarHoverCards();


    /* -----------------------------------------------------
       3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       Verifica se os campos foram preenchidos corretamente
       antes de "enviar" a mensagem.
    ----------------------------------------------------- */
    function validarFormulario() {
        const formulario = document.getElementById('formContato');

        if (!formulario) return; // Só executa na página de contato

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            let formularioValido = true;
            let mensagensErro = [];

            // Limpa erros visuais anteriores
            [nome, email, mensagem].forEach(function (campo) {
                campo.classList.remove('campo-erro');
            });

            // Validação do nome (mínimo 3 letras)
            if (nome.value.trim().length < 3) {
                formularioValido = false;
                nome.classList.add('campo-erro');
                mensagensErro.push('O nome deve ter pelo menos 3 caracteres.');
            }

            // Validação do e-mail (formato básico)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email.value.trim())) {
                formularioValido = false;
                email.classList.add('campo-erro');
                mensagensErro.push('Digite um e-mail válido.');
            }

            // Validação da mensagem (mínimo 10 caracteres)
            if (mensagem.value.trim().length < 10) {
                formularioValido = false;
                mensagem.classList.add('campo-erro');
                mensagensErro.push('A mensagem deve ter pelo menos 10 caracteres.');
            }

            const areaFeedback = document.getElementById('feedbackFormulario');

            if (!formularioValido) {
                areaFeedback.textContent = mensagensErro.join(' ');
                areaFeedback.className = 'feedback-formulario erro';
            } else {
                areaFeedback.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                areaFeedback.className = 'feedback-formulario sucesso';
                formulario.reset();
            }
        });
    }

    validarFormulario();

});
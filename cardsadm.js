// Formata automaticamente o campo de validade (MM/AAAA)
document.getElementById('validity').addEventListener('input', function (event) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 2) {
        input = input.substring(0, 2) + '/' + input.substring(2);
    }
    if (input.length > 7) {
        input = input.substring(0, 7);
    }
    event.target.value = input;
});

// Limita o campo CVV a apenas números
document.getElementById('cvv').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/\D/g, '').substring(0, 3);
});

// Função para identificar a bandeira do cartão
function identificarBandeira(numeroCartao) {
    const numero = numeroCartao.toString();

    // Verifica se é Elo
    if (['4011', '4312', '4389'].some(prefix => numero.startsWith(prefix))) {
        return 'elo';
    }

    // Verifica se é Visa
    if (numero.startsWith('4')) {
        return 'visa';
    }

    // Verifica se é MasterCard
    if (/^5[1-5]/.test(numero) || (parseInt(numero.substring(0, 4)) >= 2221 && parseInt(numero.substring(0, 4)) <= 2720)) {
        return 'mastercard';
    }

    // Verifica se é American Express
    if (numero.startsWith('34') || numero.startsWith('37')) {
        return 'amex';
    }

    // Verifica se é Discover
    if (numero.startsWith('6011') || numero.startsWith('65') || (parseInt(numero.substring(0, 3)) >= 644 && parseInt(numero.substring(0, 3)) <= 649)) {
        return 'discover';
    }

    // Verifica se é Hipercard
    if (numero.startsWith('6062')) {
        return 'hipercard';
    }

    // Verifica se é JCB
    if (parseInt(numero.substring(0, 4)) >= 3528 && parseInt(numero.substring(0, 4)) <= 3590) {
        return 'jcb';
    }

    // Retorna desconhecido se nenhuma regra for atendida
    return 'unknown';
}

// Atualiza o ícone do cartão com base na bandeira identificada
function atualizarIconeBandeira(bandeira) {
    const cardIcon = document.getElementById('cardIcon');

    if (bandeira !== 'unknown') {
        // Se a bandeira for válida, exibe o ícone com a animação de entrada
        cardIcon.className = 'card-icon'; // Remove todas as classes anteriores
        cardIcon.classList.add(bandeira, 'show'); // Adiciona a classe da bandeira e exibe o ícone
    } else {
        // Se a bandeira for desconhecida, aplica a animação de saída
        cardIcon.classList.add('hide'); // Adiciona a classe de saída
        setTimeout(() => {
            cardIcon.className = 'card-icon'; // Remove todas as classes após a animação
        }, 300); // Tempo correspondente à duração da animação (0.3s)
    }
}

// Conexão com o campo de número do cartão
document.getElementById('cardNumber').addEventListener('input', function (event) {
    // Remove caracteres não numéricos
    let input = event.target.value.replace(/\D/g, '');
    // Limita a 16 caracteres
    if (input.length > 16) {
        input = input.substring(0, 16);
    }
    // Adiciona espaçamento automático a cada 4 dígitos
    input = input.replace(/(.{4})/g, '$1 ').trim();
    event.target.value = input;

    // Identifica a bandeira do cartão
    const bandeira = identificarBandeira(input.replace(/\s/g, '')); // Remove espaços para validação
    // Atualiza o ícone do cartão
    atualizarIconeBandeira(bandeira);
});
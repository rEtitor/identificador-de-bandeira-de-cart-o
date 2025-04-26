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

document.getElementById('cvv').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/\D/g, '').substring(0, 3);
});

function identificarBandeira(numeroCartao) {
    const numero = numeroCartao.toString();
    if (['4011', '4312', '4389'].some(prefix => numero.startsWith(prefix))) {
        return 'elo';
    }
    if (numero.startsWith('4')) {
        return 'visa';
    }
    if (/^5[1-5]/.test(numero) || (parseInt(numero.substring(0, 4)) >= 2221 && parseInt(numero.substring(0, 4)) <= 2720)) {
        return 'mastercard';
    }
    if (numero.startsWith('34') || numero.startsWith('37')) {
        return 'amex';
    }
    if (numero.startsWith('6011') || numero.startsWith('65') || (parseInt(numero.substring(0, 3)) >= 644 && parseInt(numero.substring(0, 3)) <= 649)) {
        return 'discover';
    }
    if (numero.startsWith('6062')) {
        return 'hipercard';
    }
    if (parseInt(numero.substring(0, 4)) >= 3528 && parseInt(numero.substring(0, 4)) <= 3590) {
        return 'jcb';
    }
    return 'unknown';
}

function atualizarIconeBandeira(bandeira) {
    const cardIcon = document.getElementById('cardIcon');
    if (bandeira !== 'unknown') {
        cardIcon.className = 'card-icon';
        cardIcon.classList.add(bandeira, 'show');
    } else {
        cardIcon.classList.add('hide');
        setTimeout(() => {
            cardIcon.className = 'card-icon';
        }, 300);
    }
}

document.getElementById('cardNumber').addEventListener('input', function (event) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 16) {
        input = input.substring(0, 16);
    }
    input = input.replace(/(.{4})/g, '$1 ').trim();
    event.target.value = input;
    const bandeira = identificarBandeira(input.replace(/\s/g, ''));
    atualizarIconeBandeira(bandeira);
});
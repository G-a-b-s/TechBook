var contadorFavoritos = 0;
var contadorLikes = 0;
var contleram = 0;
var contlendo = 0;
var contqueremler = 0;

var estadoBotoes = {
    leram1: false,
    lendo1: false,
    queremler1: false,
    favoriteButton: false,
    likeButton: false
};

document.getElementById('leram1').addEventListener('click', function () {
    if (estadoBotoes.leram1) {
        contleram--;
        estadoBotoes.leram1 = false;
    } else {
        contleram++;
        estadoBotoes.leram1 = true;
    }
    document.getElementById('leramcontador').innerText = contleram;
});

document.getElementById('lendo1').addEventListener('click', function () {
    if (estadoBotoes.lendo1) {
        contlendo--;
        estadoBotoes.lendo1 = false;
    } else {
        contlendo++;
        estadoBotoes.lendo1 = true;
    }
    document.getElementById('lendocontador').innerText = contlendo;
});

document.getElementById('queremler1').addEventListener('click', function () {
    if (estadoBotoes.queremler1) {
        contqueremler--;
        estadoBotoes.queremler1 = false;
    } else {
        contqueremler++;
        estadoBotoes.queremler1 = true;
    }
    document.getElementById('queremlercontador').innerText = contqueremler;
});

document.getElementById('favoriteButton').addEventListener('click', function () {
    if (estadoBotoes.favoriteButton) {
        contadorFavoritos--;
        estadoBotoes.favoriteButton = false;
    } else {
        contadorFavoritos++;
        estadoBotoes.favoriteButton = true;
    }
    document.getElementById('favoritecontador').innerText = contadorFavoritos;
});

document.getElementById('likeButton').addEventListener('click', function () {
    if (estadoBotoes.likeButton) {
        contadorLikes--;
        estadoBotoes.likeButton = false;
    } else {
        contadorLikes++;
        estadoBotoes.likeButton = true;
    }
    document.getElementById('likecontador').innerText = contadorLikes;
});

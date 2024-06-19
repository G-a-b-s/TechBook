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

/*document.getElementById('leram1').addEventListener('click', function () {
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
*/

document.getElementById('favorito').addEventListener('click', function () {
    if (estadoBotoes.favorito) {
        contadorFavoritos--;
        estadoBotoes.favorito = false;
    } else {
        contadorFavoritos++;
        estadoBotoes.favorito = true;
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

function init() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    searchBooks(id);
}

function searchBooks(id) {
    Promise.all([
        fetch('/categorias').then(response => response.json()),
        fetch('/livros').then(response => response.json()),
        fetch('/historico').then(response => response.json())
    ])
        .then(([categorias, livros, historico]) => {

            const livro = livros.find(x => x.id == id);
            const categoria = categorias.find(x => x.id == livro.categoriaId).nome;

            //const user = "ec37c83d-4b7f-458d-9e10-3fda7d37cd3e";
            //const userLikes = historico.find(x => x.usuarioId == user && x.livroId == id);

            document.getElementById('autor').innerText = livro.autor;
            document.getElementById('headerTitulo').innerText = livro.titulo;
            document.getElementById('categoriaId').innerText = livro.categoriaId;
            document.getElementById('paginas').innerText = livro.paginas;
            document.getElementById('idioma').innerText = livro.idioma;
            document.getElementById('editora').innerText = livro.editora;
            document.getElementById('descricao').innerText = livro.descricao;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

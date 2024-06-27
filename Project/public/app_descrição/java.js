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

document.getElementById('favorito').addEventListener('click', function () {
    if (estadoBotoes.favoriteButton) {
        contadorFavoritos--;
        estadoBotoes.favoriteButton = false;
    } else {
        contadorFavoritos++;
        estadoBotoes.favoriteButton = true;
    }
    updateBookInHistory()
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
    updateBookInHistory();
    document.getElementById('likecontador').innerText = contadorLikes;
});

function updateBookInHistory(){
    fetch('/historico')
        .then(response => response.json())
        .then(data => { 
            
            let params = new URLSearchParams(window.location.search);
            let livroId = params.get('id');
            let userId = JSON.parse(sessionStorage.getItem('users'))[0].id;

            const book = data.find(x => x.livroId == livroId && x.usuarioId==userId);
            const fav = document.getElementById('favoritecontador').innerText;
            const like = document.getElementById('likecontador').innerText;


            let historico = { 
                id: book == undefined ? generateUUID() : book.id, 
                livroId: livroId, 
                ultimaPagina: 0, 
                lido: like == 1 ? true : false, 
                favorito: fav == 1 ? true : false,
                usuarioId: userId};

            let livro = { 
                id: livroId,
                titulo: document.getElementById('headerTitulo').innerText ,
                descricao: document.getElementById('descricao').innerText,
                livro: document.getElementById('livro').src,
                paginas: 0,
                idioma: document.getElementById('idioma').innerText ,
                editora: document.getElementById('editora').innerText,
                autor: document.getElementById('autor').innerText,
                autorimagem: "",
                autorbiografia: "",
                categoriaId: 1,
                data_cadastro: ""   
            };
                debugger
            if(book == undefined){
                setBook(livro);
                setHistory(historico);
            }
            else{
                updateHistory(historico);
            }

        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}
function setBook (book){
    fetch("/livros", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Você curtiu o livro com sucesso");
        })
        .catch(error => {
            console.log('Erro ao inserir historico via API JSONServer:', error);
        });
}
function setHistory(historico){
    fetch("/historico", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(historico),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Você curtiu o livro com sucesso");
        })
        .catch(error => {
            console.log('Erro ao inserir historico via API JSONServer:', error);
        });
}

function updateHistory(historico){
    fetch("/historico/"+historico.id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(historico),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Você curtiu o livro com sucesso");
        })
        .catch(error => {
            console.log('Erro ao inserir historico via API JSONServer:', error);
        });
}
function getLikeAndFav(){
    fetch('/historico')
    .then(response => response.json())
    .then(data => { 
        
        let params = new URLSearchParams(window.location.search);
        let livroId = params.get('id');
        let userId = JSON.parse(sessionStorage.getItem('users'))[0].id;

        const book = data.find(x => x.livroId == livroId && x.usuarioId==userId);
        const like = document.getElementById('likecontador');
        const fav = document.getElementById('favoritecontador');
        
        if(book != undefined){
            if(book.lido)
                like.innerText = 1;
            if(book.favorito)
                fav.innerText = 1;
        }

    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
}
function apiGoogleBooks(id) {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(response => response.json())
    .then(response => {
          
        if (response.volumeInfo) {
            document.getElementById('autor').innerText = response.volumeInfo.authors ? response.volumeInfo.authors.join(", ") : "Autor não encontrado";
            document.getElementById('headerTitulo').innerText = response.volumeInfo.title || "Título não encontrado";
            document.getElementById('livro').src = response.volumeInfo.imageLinks && response.volumeInfo.imageLinks.thumbnail ? response.volumeInfo.imageLinks.thumbnail : "../assets/img/notFind.png";
            document.getElementById('categoriaId').innerText = response.volumeInfo.categories ? response.volumeInfo.categories.join(", ") : "Categoria não encontrada";
            document.getElementById('paginas').innerText = response.volumeInfo.pageCount || "Número de páginas não encontrado";
            document.getElementById('idioma').innerText = response.volumeInfo.language || "Idioma não encontrado";
            document.getElementById('editora').innerText = response.volumeInfo.publisher || "Editora não encontrada";
            document.getElementById('descricao').innerText = response.volumeInfo.description || "Descrição não encontrada";
            getLikeAndFav();
        } else {
            console.log("Dados do livro não encontrados.");
        }
    })
    .catch(error => {
        console.log("Erro:", error);
    });
}

function init() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    //searchBooks(id);
    apiGoogleBooks(id);

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

            document.getElementById('autor').innerText = livro.autor;
            document.getElementById('headerTitulo').innerText = livro.titulo;
            document.getElementById('livro').src = livro.livro;
            document.getElementById('categoriaId').innerText = categoria;
            document.getElementById('paginas').innerText = livro.paginas;
            document.getElementById('idioma').innerText = livro.idioma;
            document.getElementById('editora').innerText = livro.editora;
            document.getElementById('descricao').innerText = livro.descricao;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function generateUUID() { 
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
async function fetchJson(url) {
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error fetching the JSON data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Carregar livros na página inicial
    if (document.getElementById('book-list')) {
        fetch('/livros')
            .then(response => response.json())
            .then(data => {
                const sortedBooks = data.sort((a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro));
                const latestBooks = sortedBooks.slice(0, 10);

                const bookList = document.getElementById('book-list');
                bookList.innerHTML = ''; // Limpar a lista antes de adicionar os novos livros
                latestBooks.forEach(book => {
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('col-md-2', 'mb-4');

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = book.livro;
                    img.alt = `Capa do ${book.titulo}`;
                    cardDiv.appendChild(img);

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
                    const link = document.createElement('a');
                    link.href = `../app_descrição/index.html?id=${book.id}`; // Constrói o link para a página de descrição
                    link.classList.add('card-title');
                    link.textContent = book.titulo;
                    cardBody.appendChild(link);
    


                    cardDiv.appendChild(cardBody);
                    colDiv.appendChild(cardDiv);
                    bookList.appendChild(colDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar os livros:', error));
    }

    // Carregar livros mais favoritados
    if (document.getElementById('fav-book-list')) {
        // Fazendo duas requisições fetch, uma para o histórico e outra para os livros
        Promise.all([
            fetch('/historico').then(response => response.json()),
            fetch('/livros').then(response => response.json())
        ])
        .then(([historico, livros]) => {
            const user = JSON.parse(sessionStorage.getItem('users'))[0].id;
            //const user = 'ec37c83d-4b7f-458d-9e10-3fda7d37cd3e';
            const books = livros;
            const history = historico.filter(x => x.usuarioId == user);

            if(history.length !=0){
                // Filtra os livros favoritos corretamente considerando verdadeiro booleano
                const favBooks = history.filter(item => item.favorito).map(item => item.livroId);
                            
                // Filtra os livros que estão na lista de favoritos
                const favBookElements = books.filter(book => favBooks.includes(book.id));

                const favBookList = document.getElementById('fav-book-list');

                // Limpa a lista de livros favoritos antes de adicionar novos elementos
                favBookList.innerHTML = '';

                favBookElements.forEach(book => {
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('col-md-2', 'mb-4');

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = book.livro;
                    img.alt = `Capa do ${book.titulo}`;
                    cardDiv.appendChild(img);

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const link = document.createElement('a');
                    link.href = `../app_descrição/index.html?id=${book.id}`; // Constrói o link para a página de descrição
                    link.classList.add('card-title');
                    link.textContent = book.titulo;
                    cardBody.appendChild(link);
 

                    cardDiv.appendChild(cardBody);
                    colDiv.appendChild(cardDiv);
                    favBookList.appendChild(colDiv);
                });
            }
        })
        
        .catch(error => console.error('Erro ao carregar os livros favoritados:', error));
    }    
});



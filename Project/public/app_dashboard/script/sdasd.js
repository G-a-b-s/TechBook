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
                const latestBooks = sortedBooks.slice(0, 5);

                const bookList = document.getElementById('book-list');
                bookList.innerHTML = ''; // Limpar a lista antes de adicionar os novos livros
                latestBooks.forEach(book => {
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('col-md-3', 'mb-4');

                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = book.livro;
                    img.alt = `Capa do ${book.titulo}`;
                    cardDiv.appendChild(img);

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = book.titulo;
                    cardBody.appendChild(cardTitle);

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.textContent = `Autor: ${book.autor}`;
                    cardBody.appendChild(cardText);

                    const cardDescription = document.createElement('p');
                    cardDescription.classList.add('card-text');
                    cardDescription.textContent = book.descricao;
                    cardBody.appendChild(cardDescription);

                    cardDiv.appendChild(cardBody);
                    colDiv.appendChild(cardDiv);
                    bookList.appendChild(colDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar os livros:', error));
    }

    // Carregar livros mais favoritados
 if (document.getElementById('fav-book-list')) {
    let livros;
    fetchJson("/livros")
    .then(data => {
        livros = data;
        console.log('JSON Data:', jsonData);
    })
    .catch(error => console.error('Error:', error));

    fetch('/historico')
        .then(response => response.json())
        .then(data => {
            const books = livros;
            //const books = data.livros;
            const history = data;

            const favBooks = history.filter(item => item.favorito === "true").map(item => item.livroId);
            const favBookElements = books.filter(book => favBooks.includes(book.id));
            
            const favBookList = document.getElementById('fav-book-list');
            debugger
            favBookElements.forEach(book => {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-md-3', 'mb-4');

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = book.livro;
                img.alt = `Capa do ${book.titulo}`;
                cardDiv.appendChild(img);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = book.titulo;
                cardBody.appendChild(cardTitle);

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = `Autor: ${book.autor}`;
                cardBody.appendChild(cardText);

                const cardDescription = document.createElement('p');
                cardDescription.classList.add('card-text');
                cardDescription.textContent = book.descricao;
                cardBody.appendChild(cardDescription);

                cardDiv.appendChild(cardBody);
                colDiv.appendChild(cardDiv);
                favBookList.appendChild(colDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar os livros favoritados:', error));
}
// Event listener para o botão de início
document.getElementById('inicio-button').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
});

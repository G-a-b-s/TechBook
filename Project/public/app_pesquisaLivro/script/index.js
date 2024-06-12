const apiUrl = '/categorias';

function getCategories(processaDados) {
    fetch("/categorias")
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler Categorias via API JSONServer:', error);
            displayMessage("Erro ao ler Categorias");
        });
}
function searchBooks(title,author,category) {
    fetch('/livros')
        .then(response => response.json())
        .then(data => {
            debugger
            const resultsTableBody = document.querySelector('#resultsTable tbody');
            resultsTableBody.innerHTML = '';
            data.forEach(item => {
                if (item.titulo.toLowerCase().includes(title)
                    && item.autor.toLowerCase().includes(author)
                    && (item.categoriaId == category || category == 0)) 
                {
                    debugger
                    const row = document.createElement('tr');
                    const imageCell = document.createElement('td');
                    const titleCell = document.createElement('td');
                    const autorCell = document.createElement('td');
                    const descriptionCell = document.createElement('td');

                    const img = document.createElement('img');
                    img.src = item.livro;
                    img.alt = item.titulo;
                    img.style.width = '50px';

                    imageCell.appendChild(img);
                    titleCell.textContent = item.titulo;
                    descriptionCell.textContent = item.descricao;
                    autorCell.textContent = item.autor;


                    row.appendChild(imageCell);
                    row.appendChild(titleCell);
                    row.appendChild(autorCell);
                    row.appendChild(descriptionCell);
                    resultsTableBody.appendChild(row);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
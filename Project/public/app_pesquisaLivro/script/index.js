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
    Promise.all([
        fetch('/categorias').then(response => response.json()),
        fetch('/livros').then(response => response.json())
    ])
    .then(([categorias, livros]) => {
            const resultsTableBody = document.querySelector('#resultsTable tbody');
            resultsTableBody.innerHTML = '';
            livros.sort((a, b) => (a.titulo.toLowerCase() > b.titulo.toLowerCase() ? 1 : -1))
            .forEach(item => {
                if (item.titulo.toLowerCase().includes(title)
                    && item.autor.toLowerCase().includes(author)
                    && (item.categoriaId == category || category == 0)) 
                {
                    const categoria = categorias.find(x => x.id == item.categoriaId).nome;

                    const row = document.createElement('tr');
                    const imageCell = document.createElement('td');
                    const titleCell = document.createElement('td');
                    const autorCell = document.createElement('td');
                    const categoriaCell = document.createElement('td');
                    const descriptionCell = document.createElement('td');
                    
                    const link = '../app_descrição/index.html?id='+item.id;

                    const linkImg = document.createElement('a');
                    const img = document.createElement('img');
                    img.src = item.livro;
                    img.alt = item.titulo;
                    img.style.width = '50px';
                    linkImg.appendChild(img);
                    linkImg.setAttribute('href', link );

                    const linkTitle = document.createElement('a');
                    linkTitle.setAttribute('href', link );
                    linkTitle.textContent = item.titulo;

                    imageCell.appendChild(linkImg);
                    titleCell.appendChild(linkTitle);
                    descriptionCell.textContent = item.descricao;
                    categoriaCell.textContent = categoria;
                    autorCell.textContent = item.autor;

                    row.appendChild(imageCell);
                    row.appendChild(titleCell);
                    row.appendChild(autorCell);
                    row.appendChild(categoriaCell);
                    row.appendChild(descriptionCell);
                    resultsTableBody.appendChild(row);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
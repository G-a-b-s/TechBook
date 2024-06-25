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


function apiGoogleBooks(){
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var bookUrlById = "https://www.googleapis.com/books/v1/volumes/";
    var bookUrlByAuthor = "https://www.googleapis.com/books/v1/volumes?q=inauthor:";

    var titleSearch = document.getElementById("titulo").value;
    var authorSearch = document.getElementById("autor").value;
    var search = titleSearch != "" ? bookUrl+titleSearch : authorSearch != "" ? bookUrlByAuthor+authorSearch : "";

    loader(true);

    if(search != "" || search == null){
        const resultsTableBody = document.querySelector('#resultsTable tbody');
        resultsTableBody.innerHTML = '';
        fetch(search+"&maxResults=40")
        .then(a=>a.json())
        .then(response =>{
            response.items
            .sort((a, b) => (a.volumeInfo.title.toLowerCase() > b.volumeInfo.title.toLowerCase() ? 1 : -1))
            .forEach(item=>{
                var validAuthor = authorIsValid(authorSearch,item.volumeInfo.authors);
                var validTitle = titleIsValid(titleSearch,item.volumeInfo.title);
                
                if(validTitle && validAuthor){

                    const title = item.volumeInfo.title;
                    const author = item.volumeInfo.authors;
                    const imgRef= item.volumeInfo.imageLinks != undefined ? item.volumeInfo.imageLinks.thumbnail : "../assets/img/notFind.png";
                    const categorie = item.volumeInfo.categories;
                    const description = item.volumeInfo.description;
                    
                    const row = document.createElement('tr');
                    const imageCell = document.createElement('td');
                    const titleCell = document.createElement('td');
                    const authorCell = document.createElement('td');
                    const categorieCell = document.createElement('td');
                    const descriptionCell = document.createElement('td');

                    const link = '../app_descrição/index.html?id='+item.id;

                    const linkImg = document.createElement('a');
                    const img = document.createElement('img');
                    img.src = imgRef;
                    img.style.width = '50px';
                    linkImg.appendChild(img);
                    linkImg.setAttribute('href', link );

                    const linkTitle = document.createElement('a');
                    linkTitle.setAttribute('href', link );
                    linkTitle.textContent = title;

                
                    imageCell.appendChild(linkImg);
                    titleCell.appendChild(linkTitle);
                    authorCell.textContent = author;
                    categorieCell.textContent = categorie;
                    descriptionCell.textContent = description;
                
                    row.appendChild(imageCell);
                    row.appendChild(titleCell);
                    row.appendChild(authorCell);
                    row.appendChild(categorieCell);
                    row.appendChild(descriptionCell);
                    resultsTableBody.appendChild(row);
                }
            })
            loader(false);
        })
        .catch(error=>{
            console.log(error);
            loader(false);
        })
    }
}
function authorIsValid(fieldSearch,itemField){
    if(fieldSearch != ""){
        if(itemField != undefined){
            if(itemField.join('~').toLowerCase().includes(fieldSearch.toString().toLowerCase()))
                return true
            else
                return false;
            }
        else
            return false;
    }
    else
        return true;
}
function titleIsValid(fieldSearch,itemField){
    if(fieldSearch != ""){
        if(itemField != undefined){
            if(itemField.toLowerCase().includes(fieldSearch.toString().toLowerCase()))
                return true
            else
                return false;
            }
        else
            return false;
    }
    else
        return true;
}
function loader(val) {
    if(val)
        $("#content *").attr("disabled", "disabled").off('click');
    else
        $("#content *").attr("disabled", false).off('click');
}
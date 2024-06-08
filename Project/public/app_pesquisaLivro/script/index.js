const apiUrl = '/categorias';

function getCategories(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler Categorias via API JSONServer:', error);
            displayMessage("Erro ao ler Categorias");
        });
}